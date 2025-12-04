"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-09-01", revenue: 12000, profit: 3500 },
  { date: "2024-09-05", revenue: 15000, profit: 4200 },
  { date: "2024-09-10", revenue: 18000, profit: 5100 },
  { date: "2024-09-15", revenue: 22000, profit: 6800 },
  { date: "2024-09-20", revenue: 19000, profit: 5600 },
  { date: "2024-09-25", revenue: 25000, profit: 7800 },
  { date: "2024-09-30", revenue: 28000, profit: 9200 },
  { date: "2024-10-05", revenue: 32000, profit: 10500 },
  { date: "2024-10-10", revenue: 30000, profit: 9800 },
  { date: "2024-10-15", revenue: 35000, profit: 11800 },
  { date: "2024-10-20", revenue: 38000, profit: 13200 },
  { date: "2024-10-25", revenue: 42000, profit: 15100 },
  { date: "2024-10-30", revenue: 45000, profit: 16800 },
  { date: "2024-11-04", revenue: 48000, profit: 18200 },
  { date: "2024-11-09", revenue: 52000, profit: 20500 },
  { date: "2024-11-14", revenue: 55000, profit: 22300 },
  { date: "2024-11-19", revenue: 58000, profit: 24100 },
  { date: "2024-11-24", revenue: 62000, profit: 26800 },
  { date: "2024-11-29", revenue: 65000, profit: 28500 },
  { date: "2024-12-04", revenue: 68000, profit: 30200 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#8b5cf6",
  },
  profit: {
    label: "Profit",
    color: "#10b981",
  },
} satisfies ChartConfig

export function ChartAdminMetrics() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("revenue")

  const latestData = chartData[chartData.length - 1]

  return (
    <Card className="border-[rgb(233,233,235)]">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Revenue & Profit Analysis</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Track daily revenue and profit trends
          </CardDescription>
        </div>
        <div className="flex">
          {["revenue", "profit"].map((key) => {
            const chart = key as keyof typeof chartConfig
            const value = latestData[chart]
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-gray-50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors hover:bg-gray-50"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-gray-600 text-xs font-medium">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-2xl text-gray-900">
                  ₹{value.toLocaleString('en-IN')}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value) => {
                    return `₹${Number(value).toLocaleString('en-IN')}`
                  }}
                />
              }
            />
            <Area
              dataKey={activeChart}
              type="monotone"
              fill={`url(#fill${activeChart.charAt(0).toUpperCase() + activeChart.slice(1)})`}
              stroke={chartConfig[activeChart].color}
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
