import { useState } from "react";
import {
  Gift,
  CreditCard,
  Wallet,
  Trophy,
  TrendingUp,
  Info,
  DollarSign,
  IndianRupee,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/Slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Tooltip, TooltipProvider } from "@/components/ui/Tooltip";

interface SimulationState {
  contentQuality: "basic" | "premium" | "viral";
  followerCount: number;
  engagementRate: number;
  purchaseAmount: number;
  showCashRewards: boolean;
  showStoreCredit: boolean;
  showProductRewards: boolean;
  currency: "USD" | "INR";
}

const CURRENCY_CONVERSION = {
  USD: 1,
  INR: 80,
};

const formatCurrency = (amount: number, currency: "USD" | "INR") => {
  const value = amount * CURRENCY_CONVERSION[currency];

  return currency === "USD"
    ? `$${value.toLocaleString()}`
    : `₹${value.toLocaleString()}`;
};

const CASHBACK_TIERS = [
  { min: 0, max: 4999, percentage: 5 },
  { min: 5000, max: 9999, percentage: 10 },
  { min: 10000, max: 24999, percentage: 20 },
  { min: 25000, max: 49999, percentage: 30 },
  { min: 50000, max: 99999, percentage: 50 },
  { min: 100000, max: Number.POSITIVE_INFINITY, percentage: 80 },
];

const responsiveStyles = `
  @media (max-width: 400px) {
    .xs\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export function RewardsSimulator() {
  const [state, setState] = useState<SimulationState>({
    contentQuality: "basic",
    followerCount: 5000,
    engagementRate: 3,
    purchaseAmount: 6.25,
    showCashRewards: false,
    showStoreCredit: false,
    showProductRewards: false,
    currency: "INR",
  });

  const calculateRewards = () => {
    const baseRewards = {
      basic: { cash: 2.5, credit: 3.5, product: 5 },
      premium: { cash: 6, credit: 8.5, product: 10 },
      viral: { cash: 12.5, credit: 17.5, product: 20 },
    };

    const cashbackTier =
      CASHBACK_TIERS.find(
        (tier) =>
          state.followerCount >= tier.min && state.followerCount <= tier.max
      ) || CASHBACK_TIERS[0];
    const cashbackAmount =
      (state.purchaseAmount * cashbackTier.percentage) / 100;

    const followerMultiplier = Math.min(
      Math.max((state.followerCount - 5000) / 5000 + 1, 1),
      8
    );
    const engagementMultiplier = Math.min(
      Math.max(state.engagementRate / 2, 1),
      3
    );
    const totalMultiplier = Math.min(
      followerMultiplier * engagementMultiplier,
      15
    );

    const rewards = baseRewards[state.contentQuality];

    return {
      cashback: cashbackAmount,
      cashbackPercentage: cashbackTier.percentage,
      cash: Math.round(rewards.cash * totalMultiplier),
      credit: Math.round(rewards.credit * totalMultiplier),
      product: Math.round(rewards.product * totalMultiplier),
    };
  };

  const rewards = calculateRewards();

  return (
    <TooltipProvider>
      <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
      <Card className="bg-black/50 border-white/10 backdrop-blur-sm w-full md:w-[800px] p-0">
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white text-xl sm:text-2xl">
                Discover your rewards strategy
              </CardTitle>
              <Tooltip content="Simulate different reward strategies based on content quality, audience size, and engagement rates">
                <Info className="h-4 w-4 text-white/60" />
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Label className="text-white whitespace-nowrap">Currency:</Label>
              <div className="flex border border-white/10 rounded-lg flex-1 sm:flex-initial">
                <button
                  className={`flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-l-md transition-colors flex-1 sm:flex-initial ${
                    state.currency === "USD"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  onClick={() =>
                    setState((prev) => ({ ...prev, currency: "USD" }))
                  }
                >
                  <DollarSign className="h-4 w-4" />
                  <span className="inline">USD</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 rounded-r-md transition-colors flex-1 sm:flex-initial ${
                    state.currency === "INR"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  onClick={() =>
                    setState((prev) => ({ ...prev, currency: "INR" }))
                  }
                >
                  <IndianRupee className="h-4 w-4" />
                  <span className="inline">INR</span>
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pb-6 w-[90vw] md:w-auto">
          <Tabs className="space-y-4" defaultValue="settings">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 bg-transparent">
              <TabsTrigger
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border-white/20 transition-all px-2 py-2 sm:py-3 rounded-lg border border-white/10 hover:border-white/20 text-sm"
                value="settings"
              >
                Type of creators you wish to engage
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border-white/20 transition-all px-2 py-2 sm:py-3 rounded-lg border border-white/10 hover:border-white/20 text-sm"
                value="comparison"
              >
                Rewards Strategy
              </TabsTrigger>
            </TabsList>
            <br />
            <br />
            <TabsContent className="space-y-6" value="settings">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Content Quality</Label>
                    <Tooltip
                      content={
                        <>
                          <p>Basic: Simple photos or short reviews</p>
                          <p>
                            Premium: High-quality photos or detailed reviews
                          </p>
                          <p>
                            Viral: Professional content with high share
                            potential
                          </p>
                        </>
                      }
                    >
                      <Info className="h-4 w-4 text-white/60" />
                    </Tooltip>
                  </div>
                  <Select
                    value={state.contentQuality}
                    options={[
                      { value: "basic", label: "Basic Content" },
                      { value: "premium", label: "Premium Content" },
                      { value: "viral", label: "Viral Potential" },
                    ]}
                    placeholder="Select quality"
                    onChange={(e) => {
                      const value = e.target.value as
                        | "basic"
                        | "premium"
                        | "viral";
                      setState((prev) => ({
                        ...prev,
                        contentQuality: value,
                      }));
                    }}
                    className="bg-white/5 border-white/10 text-white w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Follower Count</Label>
                    <Tooltip content="Average number of followers per creator. Higher follower counts lead to increased cashback percentages">
                      <Info className="h-4 w-4 text-white/60" />
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      className="py-4"
                      max={100000}
                      min={1000}
                      step={100}
                      value={state.followerCount}
                      onChange={(value: number) =>
                        setState((prev) => ({ ...prev, followerCount: value }))
                      }
                    />
                  </div>
                  <p className="text-sm text-white/60">
                    {state.followerCount.toLocaleString()} followers
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Purchase Amount</Label>
                    <Tooltip content="Average purchase amount for calculating cashback rewards">
                      <Info className="h-4 w-4 text-white/60" />
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      className="py-4"
                      max={1000}
                      min={6.25}
                      step={1}
                      value={state.purchaseAmount}
                      onChange={(value: number) =>
                        setState((prev) => ({ ...prev, purchaseAmount: value }))
                      }
                    />
                  </div>
                  <p className="text-sm text-white/60">
                    {formatCurrency(state.purchaseAmount, state.currency)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">
                      Average Engagement Rate (%)
                    </Label>
                    <Tooltip content="Percentage of followers who interact with content. Industry average is 1-3%. Higher rates indicate more active audiences">
                      <Info className="h-4 w-4 text-white/60" />
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      className="py-4"
                      max={10}
                      min={1}
                      step={0.5}
                      value={state.engagementRate}
                      onChange={(value: number) =>
                        setState((prev) => ({ ...prev, engagementRate: value }))
                      }
                    />
                  </div>
                  <p className="text-sm text-white/60">
                    {state.engagementRate}% engagement
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="space-y-6">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">
                      Reward Strategy Breakdown
                    </h3>
                    <Tooltip content="Toggle different reward types and see their estimated values">
                      <Info className="h-4 w-4 text-white/60" />
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={state.showCashRewards}
                        onCheckedChange={(checked: boolean) =>
                          setState((prev) => ({
                            ...prev,
                            showCashRewards: checked,
                          }))
                        }
                      />
                      <Label
                        className="text-white whitespace-nowrap"
                        htmlFor={`cash-rewards-${state.showCashRewards}`}
                      >
                        Cash Rewards
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={state.showStoreCredit}
                        key={`store-credit-${state.showStoreCredit}`}
                        onCheckedChange={(checked: boolean) =>
                          setState((prev) => ({
                            ...prev,
                            showStoreCredit: checked,
                          }))
                        }
                      />
                      <Label
                        className="text-white whitespace-nowrap"
                        htmlFor={`store-credit-${state.showStoreCredit}`}
                      >
                        Store Credit
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={state.showProductRewards}
                        key={`product-rewards-${state.showProductRewards}`}
                        onCheckedChange={(checked: boolean) =>
                          setState((prev) => ({
                            ...prev,
                            showProductRewards: checked,
                          }))
                        }
                      />
                      <Label
                        className="text-white whitespace-nowrap"
                        htmlFor={`product-rewards-${state.showProductRewards}`}
                      >
                        Product Rewards
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <div className="min-w-[500px] sm:min-w-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-white">
                            Reward Type
                          </TableHead>
                          <TableHead className="text-right text-white">
                            Value
                          </TableHead>
                          <TableHead className="text-right text-white">
                            Benefits
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-white">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-400" />
                              <span>
                                Cashback ({rewards.cashbackPercentage}%)
                              </span>
                              <Tooltip content="Percentage-based cashback that scales with follower count">
                                <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                              </Tooltip>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-white">
                            {formatCurrency(rewards.cashback, state.currency)}
                          </TableCell>
                          <TableCell className="text-right text-white/60">
                            Scales with purchase value
                          </TableCell>
                        </TableRow>
                        {state.showCashRewards && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-blue-400" />
                                <span>Cash Rewards</span>
                                <Tooltip content="Direct cash payments to creators">
                                  <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.cash, state.currency)}
                            </TableCell>
                            <TableCell className="text-right text-white/60">
                              Instant gratification
                            </TableCell>
                          </TableRow>
                        )}
                        {state.showStoreCredit && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-purple-400" />
                                <span>Store Credit</span>
                                <Tooltip content="Store credit offers higher value than cash and encourages repeat purchases">
                                  <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.credit, state.currency)}
                            </TableCell>
                            <TableCell className="text-right text-white/60">
                              Higher value, drives retention
                            </TableCell>
                          </TableRow>
                        )}
                        {state.showProductRewards && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-pink-400" />
                                <span>Product Rewards</span>
                                <Tooltip content="Physical products can create authentic brand advocates">
                                  <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.product, state.currency)}{" "}
                              value
                            </TableCell>
                            <TableCell className="text-right text-white/60">
                              Creates product advocates
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
                    <CardContent className="pt-6 flex flex-col items-center">
                      <Trophy className="h-8 w-8 mb-2 text-blue-400" />
                      <h3 className="font-semibold text-white mb-1">
                        Recommended Strategy
                      </h3>
                      <p className="text-sm text-white/60">
                        {state.followerCount >= 50000
                          ? "High cashback for maximum impact"
                          : state.followerCount >= 25000
                            ? "Mixed cashback and product strategy"
                            : "Start with lower cashback tiers"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
                    <CardContent className="pt-6 flex flex-col items-center">
                      <DollarSign className="h-8 w-8 mb-2 text-purple-400" />
                      <h3 className="font-semibold text-white mb-1">
                        Cashback Tier
                      </h3>
                      <p className="text-sm text-white/60">
                        {rewards.cashbackPercentage}% cashback for{" "}
                        {state.followerCount.toLocaleString()} followers
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
                    <CardContent className="pt-6 flex flex-col items-center">
                      <TrendingUp className="h-8 w-8 mb-2 text-pink-400" />
                      <h3 className="font-semibold text-white mb-1">
                        Expected ROI
                      </h3>
                      <p className="text-sm text-white/60">High ROI</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
