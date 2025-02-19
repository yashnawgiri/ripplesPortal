import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ugc-landing/ui/card"
import { Label } from "@/components/ugc-landing/ui/label"
import { Slider } from "@/components/ugc-landing/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ugc-landing/ui/tabs"
import { Switch } from "@/components/ugc-landing/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ugc-landing/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ugc-landing/ui/table"
import { Gift, CreditCard, Wallet, Trophy, TrendingUp, Info, DollarSign, IndianRupee } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ugc-landing/ui/tooltip"

interface SimulationState {
  contentQuality: "basic" | "premium" | "viral"
  followerCount: number
  engagementRate: number
  purchaseAmount: number
  showCashRewards: boolean
  showStoreCredit: boolean
  showProductRewards: boolean
  currency: "USD" | "INR"
}

const CURRENCY_CONVERSION = {
  USD: 1,
  INR: 80,
}

const formatCurrency = (amount: number, currency: "USD" | "INR") => {
  const value = amount * CURRENCY_CONVERSION[currency]
  return currency === "USD" ? `$${value.toLocaleString()}` : `₹${value.toLocaleString()}`
}

const CASHBACK_TIERS = [
  { min: 0, max: 4999, percentage: 5 },
  { min: 5000, max: 9999, percentage: 10 },
  { min: 10000, max: 24999, percentage: 20 },
  { min: 25000, max: 49999, percentage: 30 },
  { min: 50000, max: 99999, percentage: 50 },
  { min: 100000, max: Number.POSITIVE_INFINITY, percentage: 80 },
]

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
  })

  const calculateRewards = () => {
    const baseRewards = {
      basic: { cash: 2.5, credit: 3.5, product: 5 },
      premium: { cash: 6, credit: 8.5, product: 10 },
      viral: { cash: 12.5, credit: 17.5, product: 20 },
    }

    const cashbackTier =
      CASHBACK_TIERS.find((tier) => state.followerCount >= tier.min && state.followerCount <= tier.max) ||
      CASHBACK_TIERS[0]
    const cashbackAmount = (state.purchaseAmount * cashbackTier.percentage) / 100

    const followerMultiplier = Math.min(Math.max((state.followerCount - 5000) / 5000 + 1, 1), 8)
    const engagementMultiplier = Math.min(Math.max(state.engagementRate / 2, 1), 3)
    const totalMultiplier = Math.min(followerMultiplier * engagementMultiplier, 15)

    const rewards = baseRewards[state.contentQuality]
    return {
      cashback: cashbackAmount,
      cashbackPercentage: cashbackTier.percentage,
      cash: Math.round(rewards.cash * totalMultiplier),
      credit: Math.round(rewards.credit * totalMultiplier),
      product: Math.round(rewards.product * totalMultiplier),
    }
  }

  const rewards = calculateRewards()

  return (
    <TooltipProvider>
      <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white text-xl sm:text-2xl">Discover your rewards strategy</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-white/60" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <p>
                    Simulate different reward strategies based on content quality, audience size, and engagement rates
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-white whitespace-nowrap">Currency:</Label>
              <div className="flex border border-white/10 rounded-lg">
                <button
                  onClick={() => setState((prev) => ({ ...prev, currency: "USD" }))}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-l-md transition-colors ${state.currency === "USD" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span className="inline">USD</span>
                </button>
                <button
                  onClick={() => setState((prev) => ({ ...prev, currency: "INR" }))}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-r-md transition-colors ${state.currency === "INR" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  <IndianRupee className="h-4 w-4" />
                  <span className="inline">INR</span>
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="settings" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 bg-transparent">
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border-white/20 hover:bg-white/5 transition-all px-2 py-2 sm:py-3 rounded-lg border border-white/10 hover:border-white/20 text-sm"
              >
                Type of creators you wish to engage
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border-white/20 hover:bg-white/5 transition-all px-2 py-2 sm:py-3 rounded-lg border border-white/10 hover:border-white/20 text-sm"
              >
                Rewards Strategy
              </TabsTrigger>
            </TabsList>
            <br/>
            <br/>
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Content Quality</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-white/60" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px]">
                        <p>Basic: Simple photos or short reviews</p>
                        <p>Premium: High-quality photos or detailed reviews</p>
                        <p>Viral: Professional content with high share potential</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={state.contentQuality}
                    onValueChange={(value: "basic" | "premium" | "viral") =>
                      setState((prev) => ({ ...prev, contentQuality: value }))
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-full">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Content</SelectItem>
                      <SelectItem value="premium">Premium Content</SelectItem>
                      <SelectItem value="viral">Viral Potential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Follower Count</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-white/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Average number of followers per creator. Higher follower counts lead to increased cashback
                          percentages
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={[state.followerCount]}
                      min={1000}
                      max={100000}
                      step={100}
                      onValueChange={([value]) => setState((prev) => ({ ...prev, followerCount: value }))}
                      className="py-4"
                    />
                  </div>
                  <p className="text-sm text-white/60">{state.followerCount.toLocaleString()} followers</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Purchase Amount</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-white/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average purchase amount for calculating cashback rewards</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={[state.purchaseAmount]}
                      min={6.25}
                      max={1000}
                      step={1}
                      onValueChange={([value]) => setState((prev) => ({ ...prev, purchaseAmount: value }))}
                      className="py-4"
                    />
                  </div>
                  <p className="text-sm text-white/60">{formatCurrency(state.purchaseAmount, state.currency)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white">Average Engagement Rate (%)</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-white/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Percentage of followers who interact with content. Industry average is 1-3%. Higher rates
                          indicate more active audiences
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={[state.engagementRate]}
                      min={1}
                      max={10}
                      step={0.5}
                      onValueChange={([value]) => setState((prev) => ({ ...prev, engagementRate: value }))}
                      className="py-4"
                    />
                  </div>
                  <p className="text-sm text-white/60">{state.engagementRate}% engagement</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="space-y-6">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">Reward Strategy Breakdown</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-white/60" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle different reward types and see their estimated values</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="cash-rewards"
                        checked={state.showCashRewards}
                        onCheckedChange={(checked) => setState((prev) => ({ ...prev, showCashRewards: checked }))}
                      />
                      <Label htmlFor="cash-rewards" className="text-white whitespace-nowrap">
                        Cash Rewards
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="store-credit"
                        checked={state.showStoreCredit}
                        onCheckedChange={(checked) => setState((prev) => ({ ...prev, showStoreCredit: checked }))}
                      />
                      <Label htmlFor="store-credit" className="text-white whitespace-nowrap">
                        Store Credit
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="product-rewards"
                        checked={state.showProductRewards}
                        onCheckedChange={(checked) => setState((prev) => ({ ...prev, showProductRewards: checked }))}
                      />
                      <Label htmlFor="product-rewards" className="text-white whitespace-nowrap">
                        Product Rewards
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto -mx-6 px-6">
                  <div className="min-w-full sm:min-w-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-white">Reward Type</TableHead>
                          <TableHead className="text-right text-white">Value</TableHead>
                          <TableHead className="text-right text-white">Benefits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-white">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-400" />
                              <span>Cashback ({rewards.cashbackPercentage}%)</span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Percentage-based cashback that scales with follower count</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-white">
                            {formatCurrency(rewards.cashback, state.currency)}
                          </TableCell>
                          <TableCell className="text-right text-white/60">Scales with purchase value</TableCell>
                        </TableRow>
                        {state.showCashRewards && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-blue-400" />
                                <span>Cash Rewards</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Direct cash payments to creators</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.cash, state.currency)}
                            </TableCell>
                            <TableCell className="text-right text-white/60">Instant gratification</TableCell>
                          </TableRow>
                        )}
                        {state.showStoreCredit && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-purple-400" />
                                <span>Store Credit</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Store credit offers higher value than cash and encourages repeat purchases</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.credit, state.currency)}
                            </TableCell>
                            <TableCell className="text-right text-white/60">Higher value, drives retention</TableCell>
                          </TableRow>
                        )}
                        {state.showProductRewards && (
                          <TableRow>
                            <TableCell className="font-medium text-white">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-pink-400" />
                                <span>Product Rewards</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-white/40 hover:text-white/60 transition-colors cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Physical products can create authentic brand advocates</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {formatCurrency(rewards.product, state.currency)} value
                            </TableCell>
                            <TableCell className="text-right text-white/60">Creates product advocates</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
                    <CardContent className="pt-6">
                      <Trophy className="h-8 w-8 mb-2 text-blue-400" />
                      <h3 className="font-semibold text-white mb-1">Recommended Strategy</h3>
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
                    <CardContent className="pt-6">
                      <DollarSign className="h-8 w-8 mb-2 text-purple-400" />
                      <h3 className="font-semibold text-white mb-1">Cashback Tier</h3>
                      <p className="text-sm text-white/60">
                        {rewards.cashbackPercentage}% cashback for {state.followerCount.toLocaleString()} followers
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
                    <CardContent className="pt-6">
                      <TrendingUp className="h-8 w-8 mb-2 text-pink-400" />
                      <h3 className="font-semibold text-white mb-1">Expected ROI</h3>
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
  )
}

