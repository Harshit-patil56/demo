"use client"

import * as React from "react"
import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts"

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
  { date: "2024-09-01", principal: 450000, currentValue: 451500 },
  { date: "2024-09-05", principal: 450000, currentValue: 454200 },
  { date: "2024-09-10", principal: 450000, currentValue: 457800 },
  { date: "2024-09-15", principal: 450000, currentValue: 461500 },
  { date: "2024-09-20", principal: 450000, currentValue: 465300 },
  { date: "2024-09-25", principal: 450000, currentValue: 469200 },
  { date: "2024-09-30", principal: 450000, currentValue: 473100 },
  { date: "2024-10-05", principal: 450000, currentValue: 477200 },
  { date: "2024-10-10", principal: 450000, currentValue: 481400 },
  { date: "2024-10-15", principal: 450000, currentValue: 485700 },
  { date: "2024-10-20", principal: 450000, currentValue: 490100 },
  { date: "2024-10-25", principal: 450000, currentValue: 494600 },
  { date: "2024-10-30", principal: 450000, currentValue: 499200 },
  { date: "2024-11-04", principal: 450000, currentValue: 503900 },
  { date: "2024-11-09", principal: 450000, currentValue: 508700 },
  { date: "2024-11-14", principal: 450000, currentValue: 513600 },
  { date: "2024-11-19", principal: 450000, currentValue: 518600 },
  { date: "2024-11-24", principal: 450000, currentValue: 523700 },
  { date: "2024-11-29", principal: 450000, currentValue: 528900 },
  { date: "2024-12-04", principal: 450000, currentValue: 534200 },
]

const chartConfig = {
  principal: {
    label: "Principal Amount",
    color: "#3b82f6",
  },
  currentValue: {
    label: "Current Value",
    color: "#10b981",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("currentValue")

  const latestData = chartData[chartData.length - 1]
  const principal = latestData.principal
  const currentValue = latestData.currentValue
  const profit = currentValue - principal

  return (
    <Card className="py-4 sm:py-0 border-[rgb(233,233,235)]">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Portfolio Growth</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Last 3 months performance
          </CardDescription>
        </div>
        <div className="flex">
          {["principal", "currentValue"].map((key) => {
            const chart = key as keyof typeof chartConfig
            const value = key === "principal" ? principal : currentValue
            const isCurrentValue = key === "currentValue"
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
                {isCurrentValue && (
                  <span className="text-xs text-green-600 font-medium">
                    +₹{profit.toLocaleString('en-IN')} profit
                  </span>
                )}
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
          <ComposedChart
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
              <linearGradient id="fillPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="fillCurrentValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
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
              stroke="transparent"
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={chartConfig[activeChart].color}
              strokeWidth={3}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
