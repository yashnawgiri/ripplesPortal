import type React from "react";
import { useState } from "react";
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

export default function ReferralCommissionCalculator() {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [formData, setFormData] = useState({
    aov: "",
    profitMargin: "",
    cac: "",
    optimizeValue: 50,
    discountType: "percentage",
    discountValue: "",
    ltv: "",
  });
  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    {
      recommendedRate: null,
      projectedNetProfit: null,
      effectiveProfitMargin: null,
      commissionPerSale: null,
      fixedCommission: null,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      optimizeValue: value,
    }));
  };

  const handleCurrencyToggle = () => {
    setCurrency((prev) => (prev === "USD" ? "INR" : "USD"));
  };

  const formatCurrency = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(2)}`
      : `₹${amount.toFixed(0)}`;
  };

  const formatCurrencyWhole = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(0)}`
      : `₹${amount.toFixed(0)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const aov = Number.parseFloat(formData.aov) || 0;
    const profitMargin = Number.parseFloat(formData.profitMargin) || 0;
    const cac = Number.parseFloat(formData.cac) || 0;
    const discountValue = Number.parseFloat(formData.discountValue) || 0;

    const grossProfit = aov * (profitMargin / 100);

    let discountAmount = 0;
    if (formData.discountType === "percentage") {
      discountAmount = aov * (discountValue / 100);
    } else {
      discountAmount = discountValue;
    }

    const discountPercentage =
      formData.discountType === "percentage"
        ? discountValue
        : (discountAmount / aov) * 100;
    const projectedNetProfit = grossProfit - discountAmount - cac;

    const scaleFactor = formData.optimizeValue / 100;
    const recommendedRate = Math.min(
      ((grossProfit * scaleFactor) / aov) * 100,
      profitMargin / 2
    );

    const effectiveProfitMargin =
      profitMargin - recommendedRate - discountPercentage;
    const commissionPerSale = (recommendedRate / 100) * aov;
    const fixedCommission = Math.round(commissionPerSale);

    setCalculationResult({
      recommendedRate: Number.parseFloat(recommendedRate.toFixed(2)),
      projectedNetProfit: projectedNetProfit,
      effectiveProfitMargin: effectiveProfitMargin,
      commissionPerSale: commissionPerSale,
      fixedCommission: fixedCommission,
    });
  };

  return (
    <Card className="bg-transparent text-white" shadow="none">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="flex justify-between items-center w-full mb-4"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-300">
          Referral Commission Calculator
        </h2>
        <p className="text-sm md:text-lg text-center text-white">
          Calculate the optimal commission rate for your referral program based
          on your business metrics and referral discount offerings.
        </p>
        <div className=" flex items-center gap-2 text-white">
          <span className="text-sm md:text-lg">Currency:</span>
          <div className="flex items-center gap-2">
            <span className={currency === "USD" ? "font-bold" : ""}>USD</span>
            <Switch
              isSelected={currency === "INR"}
              color="secondary"
              onValueChange={handleCurrencyToggle}
              size="sm"
            />
            <span className={currency === "INR" ? "font-bold" : ""}>INR</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">
                  Average Order Value (AOV)
                </span>
                <Tooltip content="The average spend per order">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                id="aov"
                name="aov"
                color="primary"
                placeholder={`Enter average order value (${currency})`}
                value={formData.aov}
                variant="flat"
                required
                onChange={handleInputChange}
                startContent={
                  <span className="text-secondary">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Customer Lifetime Value (LTV)</span>
                <Tooltip content="The total expected revenue from a single customer">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                id="ltv"
                name="ltv"
                placeholder={`Enter customer lifetime value (${currency})`}
                value={formData.ltv}
                color="primary"
                variant="flat"
                required
                onChange={handleInputChange}
                startContent={
                  <span className="text-secondary">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Gross Profit Margin (%)</span>
                <Tooltip content="Percentage of revenue left after deducting costs of goods sold">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                id="profitMargin"
                name="profitMargin"
                placeholder="Enter gross profit margin (%)"
                value={formData.profitMargin}
                onChange={handleInputChange}
                color="primary"
                variant="flat"
                required
                endContent={<span className="text-secondary">%</span>}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Target Customer Acquisition Cost (CAC)
                </span>
                <Tooltip content="Target amount willing to spend to acquire a new customer">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <Input
                id="cac"
                name="cac"
                placeholder={`Enter target customer acquisition cost (${currency})`}
                value={formData.cac}
                onChange={handleInputChange}
                color="primary"
                variant="flat"
                required
                startContent={
                  <span className="text-secondary">
                    {currency === "USD" ? "$" : "₹"}
                  </span>
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Optimize for</span>
                <Tooltip content="Balance between profitability and scaling customer acquisition">
                  <HelpCircle className="h-4 w-4 text-white" />
                </Tooltip>
              </div>
              <div className="space-y-4">
                <Slider
                  value={formData.optimizeValue}
                  color="secondary"
                  onChange={(e: any) => handleSliderChange(e.target.value)}
                  minValue={0}
                  maxValue={100}
                  step={1}
                  className="max-w-full"
                  aria-label="Optimize slider"
                />
                <div className="flex justify-between text-sm text-default-500">
                  <span>Profit</span>
                  <span>Scale</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-white mr-2">Referral Discount</span>
              <Tabs
                aria-label="Discount Type"
                color="secondary"
                variant="light"
              >
                <Tab key="percentage" title="Percentage (%)">
                  <div className="pt-2">
                    <Input
                      name="discountValue"
                      placeholder="Enter referral discount percentage"
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      color="primary"
                      variant="flat"
                      required
                      endContent={<span className="text-secondary">%</span>}
                    />
                  </div>
                </Tab>
                <Tab key="fixed" title="Fixed Amount">
                  <div className="pt-2">
                    <Input
                      name="discountValue"
                      placeholder={`Enter fixed discount amount (${currency})`}
                      value={formData.discountValue}
                      onChange={handleInputChange}
                      color="primary"
                      required
                      variant="flat"
                      startContent={
                        <span className="text-secondary">
                          {currency === "USD" ? "$" : "₹"}
                        </span>
                      }
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>

            {/* Tiered commission structure feature - commented out for future implementation
              <div className="flex items-center gap-2">
                <Switch 
                  isSelected={formData.generateTiered}
                  onValueChange={(checked) => setFormData((prev) => ({ ...prev, generateTiered: checked }))}
                />
                <span className="text-sm">Generate tiered commission structure</span>
              </div>
              */}
          </div>

          <Button type="submit" color="secondary" className="w-full">
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
                      calculationResult.fixedCommission || 0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Fixed amount per sale</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 text-sm text-white">
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
