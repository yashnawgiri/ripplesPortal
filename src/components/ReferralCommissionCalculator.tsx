import type React from "react";

import { useState, useCallback, useMemo } from "react";
import {
  HelpCircle,
  ArrowRight,
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  AlertCircle,
} from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Tabs } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/Tooltip";
import { FaRupeeSign } from "react-icons/fa";

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

interface ValidationErrors {
  profitMargin?: string;
}

const DEFAULT_FORM_DATA: FormData = {
  aov: "",
  profitMargin: "",
  cac: "",
  optimizeValue: 50,
  discountType: "percentage",
  discountValue: "10",
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
    DEFAULT_CALCULATION_RESULT
  );
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const validateProfitMargin = useCallback(
    (value: string): string | undefined => {
      const numValue = Number.parseFloat(value);

      if (!value.trim()) {
        return "Profit margin is required";
      }

      if (isNaN(numValue)) {
        return "Profit margin must be a valid number";
      }

      if (numValue <= 0) {
        return "Profit margin must be greater than 0";
      }

      if (numValue > 100) {
        return "Profit margin cannot exceed 100%";
      }

      return undefined;
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear validation error when user starts typing
      if (name === "profitMargin" || name === "discountValue") {
        setValidationErrors((prev) => ({
          ...prev,
          profitMargin: undefined,
        }));
      }
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "profitMargin" || name === "discountValue") {
        const error = validateProfitMargin(value);
        setValidationErrors((prev) => ({
          ...prev,
          profitMargin: error,
        }));
      }
    },
    [validateProfitMargin]
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
    [currency]
  );

  const formatCurrencyWhole = useCallback(
    (amount: number): string => {
      return currency === "USD"
        ? `$${amount.toFixed(0)}`
        : `₹${amount.toFixed(0)}`;
    },
    [currency]
  );

  const calculateResults = useCallback(
    (
      aov: number,
      profitMargin: number,
      cac: number,
      discountValue: number,
      discountType: string,
      optimizeValue: number
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
        profitMargin / 2
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
    []
  );

  const isFormValid = useMemo(() => {
    const profitMarginError = validateProfitMargin(formData.profitMargin);
    return !profitMarginError;
  }, [formData.profitMargin, validateProfitMargin]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate profit margin before proceeding
      const profitMarginError = validateProfitMargin(formData.profitMargin);
      if (profitMarginError) {
        setValidationErrors((prev) => ({
          ...prev,
          profitMargin: profitMarginError,
        }));
        return;
      }

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
        formData.optimizeValue
      );

      setCalculationResult(results);
    },
    [formData, calculateResults, validateProfitMargin]
  );

  const currencySymbol = useMemo(
    () => (currency === "USD" ? "$" : "₹"),
    [currency]
  );

  return (
    <Card className="bg-transparent border-none text-white w-full max-w-full overflow-hidden">
      <CardHeader className="flex flex-col items-center gap-2 px-4 sm:px-6">
        <div className="flex justify-between items-center w-full mb-4" />
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-secondary break-words">
          Referral Reward Calculator
        </h2>
        <p className="text-sm md:text-xl text-center text-white px-2 break-words">
          Calculate the optimal referral reward rate for your referral program
          based on your business metrics and referral reward offerings.
        </p>
        <div className="flex items-center gap-2 text-white flex-wrap justify-center">
          <span className="text-sm md:text-xl">Currency:</span>
          <div className="flex items-center gap-2">
            <span className={currency === "USD" ? "font-bold" : ""}>USD</span>
            <Switch
              checked={currency === "INR"}
              size="sm"
              onCheckedChange={handleCurrencyToggle}
            />
            <span className={currency === "INR" ? "font-bold" : ""}>INR</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-base sm:text-lg text-white break-words">
                  Average Order Value (AOV)
                </span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="The average spend per order"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0 mt-0.5" />
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  required
                  className="bg-white pl-8 text-black w-full"
                  id="aov"
                  name="aov"
                  placeholder={`Enter average order value (${currency})`}
                  type="number"
                  value={formData.aov}
                  onChange={handleInputChange}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                  {currencySymbol}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-base sm:text-lg text-white break-words">
                  Customer Lifetime Value (LTV)
                </span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="The total expected revenue from a single customer"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0 mt-0.5" />
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  required
                  className="bg-white pl-8 text-black w-full"
                  id="ltv"
                  name="ltv"
                  placeholder={`Enter customer lifetime value (${currency})`}
                  type="number"
                  value={formData.ltv}
                  onChange={handleInputChange}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                  {currencySymbol}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-base sm:text-lg text-white break-words">
                  Gross Profit Margin (%)
                </span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="Percentage of revenue left after deducting costs of goods sold"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0 mt-0.5" />
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  required
                  className="bg-white pr-8 text-black w-full"
                  id="profitMargin"
                  name="profitMargin"
                  placeholder="Enter gross profit margin (%)"
                  type="number"
                  value={formData.profitMargin}
                  onChange={handleInputChange}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-base sm:text-lg text-white break-words">
                  Target Customer Acquisition Cost (CAC)
                </span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="Target amount willing to spend to acquire a new customer"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0 mt-0.5" />
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  required
                  className="bg-white pl-8 text-black w-full"
                  id="cac"
                  name="cac"
                  placeholder={`Enter target customer acquisition cost (${currency})`}
                  type="number"
                  value={formData.cac}
                  onChange={handleInputChange}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                  {currencySymbol}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <span className="text-base sm:text-lg text-white break-words">
                  Optimize for
                </span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="Balance between profitability and scaling customer acquisition"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0 mt-0.5" />
                </Tooltip>
              </div>
              <div className="space-y-4">
                <Slider
                  aria-label="Optimize slider"
                  className="w-full"
                  defaultValue={50}
                  max={100}
                  min={0}
                  step={1}
                  value={formData.optimizeValue}
                  onChange={(value: number | number[]) =>
                    handleSliderChange(Array.isArray(value) ? value[0] : value)
                  }
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-base sm:text-lg text-white mr-2 break-words">
                Referral Discount
              </span>
              <Tabs aria-label="Discount Type" className="w-full">
                <div className="flex border-b border-gray-200 w-full">
                  <button
                    type="button"
                    className={`px-2 sm:px-4 py-2 text-sm sm:text-base flex-1 min-w-0 ${
                      formData.discountType === "percentage"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-white hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        discountType: "percentage",
                      }))
                    }
                  >
                    <span className="truncate">Percentage (%)</span>
                  </button>
                  <button
                    type="button"
                    className={`px-2 sm:px-4 py-2 text-sm sm:text-base flex-1 min-w-0 ${
                      formData.discountType === "fixed"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-white hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        discountType: "fixed",
                      }))
                    }
                  >
                    <span className="truncate">Fixed Amount</span>
                  </button>
                </div>
                <div className="pt-2 w-full">
                  {formData.discountType === "percentage" ? (
                    <div className="relative w-full">
                      <Input
                        required
                        className="bg-white pr-8 text-black w-full"
                        name="discountValue"
                        placeholder="Enter discount percentage"
                        type="number"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                        %
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <Input
                        required
                        className="bg-white pl-8 text-black w-full"
                        name="discountValue"
                        placeholder={`Enter fixed discount (${currency})`}
                        type="number"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                        {currencySymbol}
                      </span>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>

            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg text-white">Optimize for</span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="Balance between profitability and scaling customer acquisition"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help flex-shrink-0" />
                </Tooltip>
              </div>
              <div className="space-y-4 w-full">
                <Slider
                  aria-label="Optimize slider"
                  className="w-full"
                  defaultValue={50}
                  max={100}
                  min={0}
                  step={1}
                  value={formData.optimizeValue}
                  onChange={(value: number | number[]) =>
                    handleSliderChange(Array.isArray(value) ? value[0] : value)
                  }
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">Profitability</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">Scaling</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Calculate Button */}
          <Button
            className={`w-full text-lg font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all duration-200 flex items-center justify-center gap-3 ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            <Calculator className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">Calculate Rate</span>
            <ArrowRight className="h-5 w-5 flex-shrink-0" />
          </Button>

          {/* Enhanced Results Display */}
          {calculationResult.recommendedRate !== null && (
            <div className="p-4 sm:p-6 bg-green-50 rounded-lg space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm text-gray-600">Percentage Commission</h3>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-4xl font-bold text-green-600 break-words">
                    {calculationResult.recommendedRate}%
                  </p>
                  <p className="text-sm text-gray-600 break-words">
                    Commission per sale:{" "}
                    {formatCurrency(calculationResult.commissionPerSale || 0)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 break-words">
                  Effective profit margin after discount:{" "}
                  {calculationResult.effectiveProfitMargin?.toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-gray-600">Fixed Commission</h3>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-4xl font-bold text-green-600 break-words">
                    {formatCurrencyWhole(
                      calculationResult.fixedCommission || 0
                    )}
                  </p>
                  <p className="text-sm text-gray-600 break-words">
                    Fixed amount per sale
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 text-base sm:text-lg text-white">
            <p className="font-semibold break-words">How it works:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li className="break-words">
                We analyze your AOV and profit margin to ensure sustainable
                commissions
              </li>
              <li className="break-words">
                LTV is considered to account for long-term customer value
              </li>
              <li className="break-words">
                Target CAC helps balance acquisition costs with commission rates
              </li>
              <li className="break-words">
                Referral discounts are factored into the effective profit margin
              </li>
              <li className="break-words">
                We calculate projected net profit per referred order accounting
                for all factors
              </li>
              <li className="break-words">
                The suggested rate aims to motivate referrers while maintaining
                profitability
              </li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
