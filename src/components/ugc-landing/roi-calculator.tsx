import { useState, useEffect } from "react";
import { Calculator, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import { Tooltip, TooltipProvider } from "../ui/Tooltip";

interface CalculatorState {
  monthlyOrders: number;
  avgOrderValue: number;
  cashbackPercent: number;
}

const STORAGE_KEY = "ripples-calculator-state";

const TooltipIcon = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip content={text}>
      <Info className="w-4 h-4 ml-1 text-white/60 cursor-pointer" />
    </Tooltip>
  </TooltipProvider>
);

export function ROICalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return { monthlyOrders: 1000, avgOrderValue: 100, cashbackPercent: 5 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const calculateMetrics = () => {
    const participationRate = 0.15;
    const baseConversionLift = 0.1;
    const monthlyParticipants = state.monthlyOrders * participationRate;
    const monthlyUGCPieces = monthlyParticipants;

    const additionalLift = (monthlyUGCPieces / 100) * 0.05;
    const totalConversionLift = Math.min(
      baseConversionLift + additionalLift,
      0.3
    );

    const cashbackCost =
      state.avgOrderValue * (state.cashbackPercent / 100) * monthlyParticipants;
    const additionalSales =
      state.monthlyOrders * totalConversionLift * state.avgOrderValue;

    const roi =
      cashbackCost === 0
        ? 0
        : ((additionalSales - cashbackCost) / cashbackCost) * 100;

    return {
      monthlyUGCPieces: Math.round(monthlyUGCPieces),
      cashbackCost: Math.round(cashbackCost),
      additionalSales: Math.round(additionalSales),
      roi: Math.round(roi),
      conversionLift: Math.round(totalConversionLift * 100),
    };
  };

  const metrics = calculateMetrics();

  const handleInputChange = (key: keyof CalculatorState, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-sm transform transition-transform duration-300 md:w-[50%] w-full hover:scale-[1.01]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calculator className="h-6 w-6" />
          ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="monthlyOrders" className="flex items-center">
                Monthly Orders
                <TooltipIcon text="Total number of orders your store receives per month." />
              </Label>
              <Input
                className="bg-white/5 border-white/10 text-white"
                id="monthlyOrders"
                type="number"
                value={state.monthlyOrders}
                onChange={(e) =>
                  handleInputChange("monthlyOrders", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avgOrderValue" className="flex items-center">
                Avg. Order Value ($)
                <TooltipIcon text="Average value of a single order on your store." />
              </Label>
              <Input
                className="bg-white/5 border-white/10 text-white"
                id="avgOrderValue"
                type="number"
                value={state.avgOrderValue}
                onChange={(e) =>
                  handleInputChange("avgOrderValue", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cashbackPercent" className="flex items-center">
                Cashback Rate (%)
                <TooltipIcon text="Percentage of cashback you offer to customers participating in UGC." />
              </Label>
              <Input
                className="bg-white/5 border-white/10 text-white"
                id="cashbackPercent"
                type="number"
                value={state.cashbackPercent}
                onChange={(e) =>
                  handleInputChange("cashbackPercent", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              value={metrics.monthlyUGCPieces.toLocaleString()}
              label="Monthly UGC Pieces"
              tooltip="Estimated user-generated content pieces created monthly."
            />
            <MetricCard
              value={`$${metrics.cashbackCost.toLocaleString()}`}
              label="Cashback Cost"
              tooltip="Monthly spend on cashback rewards to participants."
            />
            <MetricCard
              value={`$${metrics.additionalSales.toLocaleString()}`}
              label="Additional Sales"
              tooltip="Additional monthly sales are estimated by multiplying Monthly Orders, Conversion Lift, and Average Order Value"
            />
            <MetricCard
              value={`${metrics.roi}%`}
              label="ROI"
              tooltip="How is ROI calculated? ROI = ((Additional Sales - Cashback Cost) / Cashback Cost) × 100."
            />
            <MetricCard
              value={`${metrics.conversionLift}%`}
              label="Conversion Lift"
              tooltip="Expected conversion rate uplift due to UGC participation."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  value,
  label,
  tooltip,
}: {
  value: string;
  label: string;
  tooltip: string;
}) {
  return (
    <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
      <CardContent className="pt-6">
        <div className="text-2xl font-bold text-white break-words">{value}</div>
        <p className="text-xs text-white/60 flex items-center justify-center">
          {label}
          <TooltipIcon text={tooltip} />
        </p>
      </CardContent>
    </Card>
  );
}
