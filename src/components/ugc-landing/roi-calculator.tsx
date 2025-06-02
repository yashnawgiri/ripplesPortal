import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";

interface CalculatorState {
  monthlyOrders: number;
  avgOrderValue: number;
  cashbackPercent: number;
}

const STORAGE_KEY = "ripples-calculator-state";

export function ROICalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }
    }

    return {
      monthlyOrders: 1000,
      avgOrderValue: 100,
      cashbackPercent: 5,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const calculateMetrics = () => {
    const participationRate = 0.15;
    const baseConversionLift = 0.1; // 10% base conversion lift
    const monthlyParticipants = state.monthlyOrders * participationRate;
    const monthlyUGCPieces = monthlyParticipants;

    // Calculate dynamic conversion lift based on UGC volume
    // Add 5% for every 100 pieces, starting at 10%, capped at 30%
    const additionalLift = (monthlyUGCPieces / 100) * 0.05;
    const totalConversionLift = Math.min(
      baseConversionLift + additionalLift,
      0.3,
    );

    const cashbackCost =
      state.avgOrderValue * (state.cashbackPercent / 100) * monthlyParticipants;
    const additionalSales =
      state.monthlyOrders * totalConversionLift * state.avgOrderValue;
    const roi = ((additionalSales - cashbackCost) / cashbackCost) * 100;

    return {
      monthlyUGCPieces: Math.round(monthlyUGCPieces),
      cashbackCost: Math.round(cashbackCost),
      additionalSales: Math.round(additionalSales),
      roi: Math.round(roi),
      conversionLift: Math.round(totalConversionLift * 100), // Added to show the dynamic lift percentage
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
              <Label htmlFor="monthlyOrders">Monthly Orders</Label>
              <Input
                id="monthlyOrders"
                type="number"
                className="bg-white/5 border-white/10 text-white"
                value={state.monthlyOrders}
                onChange={(e) =>
                  handleInputChange("monthlyOrders", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avgOrderValue">Average Order Value ($)</Label>
              <Input
                id="avgOrderValue"
                type="number"
                className="bg-white/5 border-white/10 text-white"
                value={state.avgOrderValue}
                onChange={(e) =>
                  handleInputChange("avgOrderValue", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cashbackPercent">Cashback Percentage (%)</Label>
              <Input
                id="cashbackPercent"
                type="number"
                className="bg-white/5 border-white/10 text-white"
                value={state.cashbackPercent}
                onChange={(e) =>
                  handleInputChange("cashbackPercent", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white break-words">
                  {metrics.monthlyUGCPieces.toLocaleString()}
                </div>
                <p className="text-xs text-white/60">Monthly UGC Pieces</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white break-words">
                  ${metrics.cashbackCost.toLocaleString()}
                </div>
                <p className="text-xs text-white/60">Monthly Cashback Cost</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white break-words">
                  ${metrics.additionalSales.toLocaleString()}
                </div>
                <p className="text-xs text-white/60">Additional Monthly Sales</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white break-words">
                  {metrics.roi}%
                </div>
                <p className="text-xs text-white/60">Return on Investment</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white break-words">
                  {metrics.conversionLift}%
                </div>
                <p className="text-xs text-white/60">Conversion Lift</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
