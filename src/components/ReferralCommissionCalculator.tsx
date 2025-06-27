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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateProfitMargin = useCallback((value: string): string | undefined => {
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
  }, []);

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
    <Card className="bg-transparent border-none text-white">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="flex justify-between items-center w-full mb-4" />
        <h2 className="text-3xl md:text-5xl font-bold text-center text-secondary">
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
              checked={currency === "INR"}
              size="sm"
              onCheckedChange={handleCurrencyToggle}
            />
            <span className={currency === "INR" ? "font-bold" : ""}>INR</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Business Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white">
                    Average Order Value (AOV)
                  </span>
                  <Tooltip
                    className="bg-gray-800 text-white"
                    content="The average spend per order"
                    position="right"
                  >
                    <HelpCircle className="h-4 w-4 text-white cursor-help" />
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    required
                    className="bg-white pl-8 text-black"
                    id="aov"
                    name="aov"
                    placeholder={`Enter AOV (${currency})`}
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
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white">
                    Customer Lifetime Value (LTV)
                  </span>
                  <Tooltip
                    className="bg-gray-800 text-white"
                    content="The total expected revenue from a single customer"
                    position="right"
                  >
                    <HelpCircle className="h-4 w-4 text-white cursor-help" />
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    required
                    className="bg-white pl-8 text-black"
                    id="ltv"
                    name="ltv"
                    placeholder={`Enter LTV (${currency})`}
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
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white">
                    Gross Profit Margin (%)
                  </span>
                  <Tooltip
                    className="bg-gray-800 text-white"
                    content="Percentage of revenue left after deducting costs of goods sold"
                    position="right"
                  >
                    <HelpCircle className="h-4 w-4 text-white cursor-help" />
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    required
                    className={`bg-white pr-8 text-black ${
                      validationErrors.profitMargin ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    id="profitMargin"
                    name="profitMargin"
                    placeholder="Enter profit margin (%)"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.profitMargin}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                    %
                  </span>
                </div>
                {validationErrors.profitMargin && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{validationErrors.profitMargin}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white">
                    Target Customer Acquisition Cost (CAC)
                  </span>
                  <Tooltip
                    className="bg-gray-800 text-white"
                    content="Target amount willing to spend to acquire a new customer"
                    position="right"
                  >
                    <HelpCircle className="h-4 w-4 text-white cursor-help" />
                  </Tooltip>
                </div>
                <div className="relative">
                  <Input
                    required
                    className="bg-white pl-8 text-black"
                    id="cac"
                    name="cac"
                    placeholder={`Enter target CAC (${currency})`}
                    type="number"
                    value={formData.cac}
                    onChange={handleInputChange}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                    {currencySymbol}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-lg text-white">Referral Discount</span>
              <Tabs aria-label="Discount Type" className="w-full">
                <div className="flex border-b border-gray-600">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-t-lg ${
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
                    Percentage (%)
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-t-lg ${
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
                    Fixed Amount
                  </button>
                </div>
                <div className="pt-2">
                  {formData.discountType === "percentage" ? (
                    <div className="relative">
                      <Input
                        required
                        className="bg-white pr-8 text-black"
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
                    <div className="relative">
                      <Input
                        required
                        className="bg-white pl-8 text-black"
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

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-white">Optimize for</span>
                <Tooltip
                  className="bg-gray-800 text-white"
                  content="Balance between profitability and scaling customer acquisition"
                  position="right"
                >
                  <HelpCircle className="h-4 w-4 text-white cursor-help" />
                </Tooltip>
              </div>
              <div className="space-y-4">
                <Slider
                  aria-label="Optimize slider"
                  className="max-w-full"
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
                    <TrendingUp className="h-3 w-3" />
                    Profitability
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Scaling
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
            <Calculator className="h-5 w-5" />
            Calculate Recommended Rate
            <ArrowRight className="h-5 w-5" />
          </Button>

          {/* Enhanced Results Display */}
          {calculationResult.recommendedRate !== null && (
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-lg space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Your Recommended Commission Rate
                </h3>
                <p className="text-green-600">
                  Optimized for your business metrics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Percentage Commission
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-green-600">
                      {calculationResult.recommendedRate}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Commission per sale:{" "}
                      <span className="font-semibold text-green-700">
                        {formatCurrency(
                          calculationResult.commissionPerSale || 0
                        )}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Effective profit margin:{" "}
                      <span className="font-semibold text-green-700">
                        {calculationResult.effectiveProfitMargin?.toFixed(1)}%
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {currencySymbol === "$" ? (
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      ) : (
                        <FaRupeeSign className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      Fixed Commission
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-blue-600">
                      {formatCurrencyWhole(
                        calculationResult.fixedCommission || 0
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fixed amount per sale
                    </p>
                    <p className="text-sm text-gray-600">
                      Projected net profit:{" "}
                      <span className="font-semibold text-blue-700">
                        {formatCurrency(
                          calculationResult.projectedNetProfit || 0
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calculation Methodology */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-secondary" />
              How the Calculation Works
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">
                    Step 1: Calculate Gross Profit
                  </h4>
                  <p className="text-sm">
                    Gross Profit = AOV × (Profit Margin ÷ 100)
                  </p>
                  <p className="text-xs text-gray-400">
                    This represents your profit before any referral costs
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">
                    Step 2: Apply Referral Discount
                  </h4>
                  <p className="text-sm">
                    Discount Amount = AOV × (Discount % ÷ 100) or Fixed Amount
                  </p>
                  <p className="text-xs text-gray-400">
                    The cost of offering discounts to referred customers
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">
                    Step 3: Calculate Net Profit
                  </h4>
                  <p className="text-sm">
                    Net Profit = Gross Profit - Discount - CAC
                  </p>
                  <p className="text-xs text-gray-400">
                    Your actual profit after all referral program costs
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">
                    Step 4: Determine Commission Rate
                  </h4>
                  <p className="text-sm">
                    Commission Rate = min((Gross Profit × Scale Factor) ÷ AOV,
                    Profit Margin ÷ 2)
                  </p>
                  <p className="text-xs text-gray-400">
                    Balanced rate that motivates referrers while maintaining
                    profitability
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-white mb-2">
                  Key Factors Considered:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <strong>AOV:</strong> Higher values allow for larger
                    commission rates
                  </li>
                  <li>
                    • <strong>Profit Margin:</strong> Sets the upper limit for
                    sustainable commissions
                  </li>
                  <li>
                    • <strong>LTV:</strong> Accounts for long-term customer
                    value
                  </li>
                  <li>
                    • <strong>CAC:</strong> Helps balance acquisition costs with
                    commission rates
                  </li>
                  <li>
                    • <strong>Optimization Slider:</strong> Balances
                    profitability vs. scaling priorities
                  </li>
                  <li>
                    • <strong>Referral Discounts:</strong> Factored into
                    effective profit margin calculations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
