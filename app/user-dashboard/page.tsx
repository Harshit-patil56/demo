"use client"

import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts'

type Investment = {
  id: string
  planName: string
  principalAmount: number
  interestRate: number
  interestType: "simple" | "compound"
  startDate: string
  maturityDate: string
  status: "active" | "closed"
}

type PortfolioDataPoint = {
  date: string
  value: number
  volume: number
}

export default function UserDashboard() {
  const [investments] = useState<Investment[]>([
    {
      id: "1",
      planName: "Premium Growth",
      principalAmount: 250000,
      interestRate: 12,
      interestType: "compound",
      startDate: "2024-06-01",
      maturityDate: "2025-06-01",
      status: "active"
    },
    {
      id: "2",
      planName: "Standard Plan",
      principalAmount: 150000,
      interestRate: 8.5,
      interestType: "simple",
      startDate: "2024-08-15",
      maturityDate: "2025-08-15",
      status: "active"
    },
    {
      id: "3",
      planName: "Premium Growth",
      principalAmount: 90000,
      interestRate: 12,
      interestType: "compound",
      startDate: "2024-09-01",
      maturityDate: "2025-09-01",
      status: "active"
    }
  ])

  const calculateCurrentValue = (investment: Investment) => {
    const start = new Date(investment.startDate)
    const now = new Date()
    const daysElapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const yearsElapsed = daysElapsed / 365

    if (investment.interestType === "simple") {
      const interest = investment.principalAmount * (investment.interestRate / 100) * yearsElapsed
      return investment.principalAmount + interest
    } else {
      return investment.principalAmount * Math.pow(1 + investment.interestRate / 100, yearsElapsed)
    }
  }

  const activeInvestments = investments.filter(inv => inv.status === "active")
  const totalPrincipal = activeInvestments.reduce((sum, inv) => sum + inv.principalAmount, 0)
  const totalCurrentValue = activeInvestments.reduce((sum, inv) => sum + calculateCurrentValue(inv), 0)
  const totalProfit = totalCurrentValue - totalPrincipal
  const profitPercentage = ((totalProfit / totalPrincipal) * 100).toFixed(1)

  const getDaysRemaining = (maturityDate: string) => {
    const maturity = new Date(maturityDate)
    const now = new Date()
    const diffTime = maturity.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const generatePortfolioData = (): PortfolioDataPoint[] => {
    const data: PortfolioDataPoint[] = []
    const today = new Date()
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      let totalValue = 0
      activeInvestments.forEach(inv => {
        const start = new Date(inv.startDate)
        if (date >= start) {
          const daysElapsed = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          const yearsElapsed = daysElapsed / 365
          
          let value: number
          if (inv.interestType === "simple") {
            const interest = inv.principalAmount * (inv.interestRate / 100) * yearsElapsed
            value = inv.principalAmount + interest
          } else {
            value = inv.principalAmount * Math.pow(1 + inv.interestRate / 100, yearsElapsed)
          }
          totalValue += value
        }
      })
      
      data.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        value: Math.round(totalValue),
        volume: Math.round(totalPrincipal * 0.05)
      })
    }
    
    return data
  }

  const portfolioData = generatePortfolioData()
  const todayValue = portfolioData[portfolioData.length - 1]?.value || 0
  const startValue = portfolioData[0]?.value || 0
  const monthlyChange = todayValue - startValue
  const monthlyChangePercent = startValue > 0 ? ((monthlyChange / startValue) * 100).toFixed(2) : "0.00"
  const isPositiveChange = monthlyChange >= 0

  const upcomingMaturity = activeInvestments
    .map(inv => ({ ...inv, daysRemaining: getDaysRemaining(inv.maturityDate) }))
    .filter(inv => inv.daysRemaining > 0 && inv.daysRemaining <= 90)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 3)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg border border-[rgb(233,233,235)]">
          <p className="text-sm text-gray-600 mb-1">{payload[0].payload.date}</p>
          <p className="text-xl font-semibold text-gray-900">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 w-full p-4 bg-white border-b border-[rgb(233,233,235)]">
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="max-w-full">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/user-dashboard" className="px-4 py-2 relative text-lg">
                      <span className="font-medium text-gray-900">Dashboard</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/my-investments" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      My Investments
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/transactions" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Transactions
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/profile" className="px-4 py-2 relative text-[rgb(124,126,140)] hover:text-gray-900 transition-colors text-lg">
                      Profile
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Badge className="px-4 py-2 text-base bg-gray-900 text-white hover:bg-gray-800 font-medium">User</Badge>
          </div>
        </div>
      </nav>

      <div className="p-2 md:p-4" style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div className="mb-6" style={{height: '40px'}}></div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Total Invested</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                ₹{totalPrincipal.toLocaleString('en-IN')}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +8%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Current Value</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                ₹{Math.round(totalCurrentValue).toLocaleString('en-IN')}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +{profitPercentage}%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>

          <Card className="@container/card border-[rgb(233,233,235)]">
            <CardHeader>
              <CardDescription className="text-lg font-semibold text-gray-800">Total Profit</CardDescription>
              <CardTitle className="text-4xl font-semibold text-gray-600 tabular-nums @[250px]/card:text-5xl">
                ₹{Math.round(totalProfit).toLocaleString('en-IN')}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +{profitPercentage}%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="border-[rgb(233,233,235)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Portfolio Growth</CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-1">
                    Last 30 days performance
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-gray-900">
                    ₹{todayValue.toLocaleString('en-IN')}
                  </div>
                  <div className={`text-sm font-medium ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositiveChange ? '+' : ''}₹{Math.abs(monthlyChange).toLocaleString('en-IN')} ({isPositiveChange ? '+' : ''}{monthlyChangePercent}%)
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={portfolioData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="url(#colorValue)" 
                    />
                    <Bar dataKey="volume" fill="#94a3b8" opacity={0.3} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Maturities</h2>
          <div className="grid gap-4">
            {upcomingMaturity.length > 0 ? (
              upcomingMaturity.map((inv) => (
                <Card key={inv.id} className="border-[rgb(233,233,235)]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">{inv.planName}</CardTitle>
                        <CardDescription className="text-base text-gray-600 mt-1">
                          Principal: ₹{inv.principalAmount.toLocaleString('en-IN')} • Rate: {inv.interestRate}%
                        </CardDescription>
                      </div>
                      <Badge variant={inv.daysRemaining <= 30 ? "default" : "secondary"}>
                        {inv.daysRemaining} days left
                      </Badge>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-base">
                        <span className="text-gray-600">Maturity Date:</span>
                        <span className="font-semibold text-gray-900">{inv.maturityDate}</span>
                      </div>
                      <div className="flex justify-between text-base mt-2">
                        <span className="text-gray-600">Expected Value:</span>
                        <span className="font-semibold text-green-600">
                          ₹{Math.round(calculateCurrentValue(inv)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Card className="border-[rgb(233,233,235)]">
                <CardHeader>
                  <CardDescription className="text-center text-base text-gray-600">
                    No maturities in the next 90 days
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Investment Breakdown</h2>
          <div className="grid gap-4">
            {activeInvestments.map((inv) => {
              const currentValue = calculateCurrentValue(inv)
              const profit = currentValue - inv.principalAmount
              const profitPercent = ((profit / inv.principalAmount) * 100).toFixed(2)
              
              return (
                <Card key={inv.id} className="border-[rgb(233,233,235)]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">{inv.planName}</CardTitle>
                        <CardDescription className="text-base text-gray-600 mt-1">
                          {inv.interestRate}% {inv.interestType} interest
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-gray-600">Principal Amount</div>
                        <div className="text-xl font-semibold text-gray-900">
                          ₹{inv.principalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Current Value</div>
                        <div className="text-xl font-semibold text-gray-900">
                          ₹{Math.round(currentValue).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Profit/Loss</div>
                        <div className="text-xl font-semibold text-green-600">
                          +₹{Math.round(profit).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Return</div>
                        <div className="text-xl font-semibold text-green-600">
                          +{profitPercent}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-base">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="text-gray-900">{inv.startDate}</span>
                      </div>
                      <div className="flex justify-between text-base mt-2">
                        <span className="text-gray-600">Maturity Date:</span>
                        <span className="text-gray-900">{inv.maturityDate}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
