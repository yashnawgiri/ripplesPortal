import type React from "react";

import { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Slider,
  Switch,
  Tabs,
  Tab,
  Tooltip,
} from "@nextui-org/react";
import { HelpCircle } from "lucide-react";

interface CalculationResult {
  recommendedRate: number | null;
  projectedNetProfit: number | null;
  effectiveProfitMargin: number | null;
  commissionPerSale: number | null;
  fixedCommission: number | null;
}

interface FormData {
  aov: string;
  profitMargin: string;
  cac: string;
  optimizeValue: number;
  discountType: "percentage" | "fixed";
  discountValue: string;
  ltv: string;
}

const DEFAULT_FORM_DATA: FormData = {
  aov: "",
  profitMargin: "",
  cac: "",
  optimizeValue: 50,
  discountType: "percentage",
  discountValue: "",
  ltv: "",
};

const DEFAULT_CALCULATION_RESULT: CalculationResult = {
  recommendedRate: null,
  projectedNetProfit: null,
  effectiveProfitMargin: null,
  commissionPerSale: null,
  fixedCommission: null,
};

export default function ReferralCommissionCalculator() {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    DEFAULT_CALCULATION_RESULT,
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSliderChange = useCallback((value: number) => {
    setFormData((prev) => ({
      ...prev,
      optimizeValue: value,
    }));
  }, []);

  const handleCurrencyToggle = useCallback(() => {
    setCurrency((prev) => (prev === "USD" ? "INR" : "USD"));
  }, []);

  const formatCurrency = useCallback(
    (amount: number): string => {
      return currency === "USD"
        ? `$${amount.toFixed(2)}`
        : `₹${amount.toFixed(0)}`;
    },
    [currency],
  );

  const formatCurrencyWhole = useCallback(
    (amount: number): string => {
      return currency === "USD"
        ? `$${amount.toFixed(0)}`
        : `₹${amount.toFixed(0)}`;
    },
    [currency],
  );

  const calculateResults = useCallback(
    (
      aov: number,
      profitMargin: number,
      cac: number,
      discountValue: number,
      discountType: string,
      optimizeValue: number,
    ) => {
      const grossProfit = aov * (profitMargin / 100);
      const discountAmount =
        discountType === "percentage"
          ? aov * (discountValue / 100)
          : discountValue;

      const discountPercentage =
        discountType === "percentage"
          ? discountValue
          : (discountAmount / aov) * 100;

      const projectedNetProfit = grossProfit - discountAmount - cac;
      const scaleFactor = optimizeValue / 100;
      const recommendedRate = Math.min(
        ((grossProfit * scaleFactor) / aov) * 100,
        profitMargin / 2,
      );

      const effectiveProfitMargin =
        profitMargin - recommendedRate - discountPercentage;
      const commissionPerSale = (recommendedRate / 100) * aov;

      return {
        recommendedRate: Number(recommendedRate.toFixed(2)),
        projectedNetProfit,
        effectiveProfitMargin,
        commissionPerSale,
        fixedCommission: Math.round(commissionPerSale),
      };
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const aov = Number.parseFloat(formData.aov) || 0;
      const profitMargin = Number.parseFloat(formData.profitMargin) || 0;
      const cac = Number.parseFloat(formData.cac) || 0;
      const discountValue = Number.parseFloat(formData.discountValue) || 0;

      const results = calculateResults(
        aov,
        profitMargin,
        cac,
        discountValue,
        formData.discountType,
        formData.optimizeValue,
      );

      setCalculationResult(results);
    },
    [formData, calculateResults],
  );

  const currencySymbol = useMemo(
    () => (currency === "USD" ? "$" : "₹"),
    [currency],
  );

  return (
    <Card className="bg-transparent text-white" shadow="none">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="flex justify-between items-center w-full mb-4" />
        <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-300">
          Referral Reward Calculator
        </h2>
        <p className="text-sm md:text-xl text-center text-white">
          Calculate the optimal referral reward rate for your referral program
          based on your business metrics and referral reward offerings.
        </p>
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm md:text-xl">Currency:</span>
          <div className="flex items-center gap-2">
            <span className={currency === "USD" ? "font-bold" : ""}>USD</span>
            <Switch
              color="secondary"
              isSelected={currency === "INR"}
              size="sm"
              onValueChange={handleCurrencyToggle}
            />
            <span className={currency === "INR" ? "font-bold" : ""}>INR</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">
                  Average Order Value (AOV)
                </span>
                <Tooltip content="The average spend per order">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                required
                color="default"
                id="aov"
                name="aov"
                placeholder={`Enter average order value (${currency})`}
                startContent={
                  <span className="text-secondary">{currencySymbol}</span>
                }
                type="number"
                value={formData.aov}
                variant="flat"
                classNames={{
                  input: "bg-white",
                }}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">
                  Customer Lifetime Value (LTV)
                </span>
                <Tooltip content="The total expected revenue from a single customer">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                required
                color="default"
                id="ltv"
                name="ltv"
                placeholder={`Enter customer lifetime value (${currency})`}
                startContent={
                  <span className="text-secondary">{currencySymbol}</span>
                }
                type="number"
                value={formData.ltv}
                variant="flat"
                classNames={{
                  input: "bg-white",
                }}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">
                  Gross Profit Margin (%)
                </span>
                <Tooltip content="Percentage of revenue left after deducting costs of goods sold">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                required
                color="default"
                endContent={<span className="text-secondary">%</span>}
                id="profitMargin"
                name="profitMargin"
                placeholder="Enter gross profit margin (%)"
                type="number"
                value={formData.profitMargin}
                variant="flat"
                classNames={{
                  input: "bg-white",
                }}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">
                  Target Customer Acquisition Cost (CAC)
                </span>
                <Tooltip content="Target amount willing to spend to acquire a new customer">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                required
                color="default"
                id="cac"
                name="cac"
                placeholder={`Enter target customer acquisition cost (${currency})`}
                startContent={
                  <span className="text-secondary">{currencySymbol}</span>
                }
                type="number"
                value={formData.cac}
                variant="flat"
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">Optimize for</span>
                <Tooltip content="Balance between profitability and scaling customer acquisition">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <div className="space-y-4">
                <Slider
                  aria-label="Optimize slider"
                  className="max-w-full"
                  color="secondary"
                  defaultValue={50}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 100, label: "100" },
                  ]}
                  maxValue={100}
                  minValue={0}
                  step={1}
                  value={formData.optimizeValue}
                  onChange={(value: number | number[]) =>
                    handleSliderChange(Array.isArray(value) ? value[0] : value)
                  }
                />
                <div className="flex justify-between text-lg text-white">
                  <span>Profit</span>
                  <span>Scale</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-lg text-white mr-2">Referral Discount</span>
              <Tabs
                aria-label="Discount Type"
                color="secondary"
                variant="solid"
              >
                <Tab key="percentage" title="Percentage (%)">
                  <div className="pt-2">
                    <Input
                      required
                      color="default"
                      endContent={<span className="text-secondary">%</span>}
                      name="discountValue"
                      placeholder="Enter referral discount percentage"
                      value={formData.discountValue}
                      variant="flat"
                      onChange={handleInputChange}
                    />
                  </div>
                </Tab>
                <Tab key="fixed" title="Fixed Amount">
                  <div className="pt-2">
                    <Input
                      required
                      color="default"
                      name="discountValue"
                      placeholder={`Enter fixed discount amount (${currency})`}
                      startContent={
                        <span className="text-secondary">{currencySymbol}</span>
                      }
                      type="number"
                      value={formData.discountValue}
                      variant="flat"
                      onChange={handleInputChange}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>

          <Button
            className="w-full text-lg font-bold"
            color="secondary"
            type="submit"
          >
            Calculate Recommended Rate
          </Button>

          {calculationResult.recommendedRate !== null && (
            <div className="p-6 bg-green-50 rounded-lg space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm text-gray-600">Percentage Commission</h3>
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-green-600">
                    {calculationResult.recommendedRate}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Commission per sale:{" "}
                    {formatCurrency(calculationResult.commissionPerSale || 0)}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Effective profit margin after discount:{" "}
                  {calculationResult.effectiveProfitMargin?.toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-gray-600">Fixed Commission</h3>
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-green-600">
                    {formatCurrencyWhole(
                      calculationResult.fixedCommission || 0,
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Fixed amount per sale</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 text-lg text-white">
            <p className="font-semibold">How it works:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                We analyze your AOV and profit margin to ensure sustainable
                commissions
              </li>
              <li>LTV is considered to account for long-term customer value</li>
              <li>
                Target CAC helps balance acquisition costs with commission rates
              </li>
              <li>
                Referral discounts are factored into the effective profit margin
              </li>
              <li>
                We calculate projected net profit per referred order accounting
                for all factors
              </li>
              <li>
                The suggested rate aims to motivate referrers while maintaining
                profitability
              </li>
            </ul>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
