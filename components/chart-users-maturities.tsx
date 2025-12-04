"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"

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
  { month: "Sep", users: 186, maturities: 12 },
  { month: "Oct", users: 305, maturities: 18 },
  { month: "Nov", users: 237, maturities: 15 },
  { month: "Dec", users: 273, maturities: 23 },
]

const chartConfig = {
  users: {
    label: "New Users",
    color: "#3b82f6",
  },
  maturities: {
    label: "Maturities",
    color: "#f59e0b",
  },
} satisfies ChartConfig

export function ChartUsersMaturities() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("users")

  const total = React.useMemo(
    () => ({
      users: chartData.reduce((acc, curr) => acc + curr.users, 0),
      maturities: chartData.reduce((acc, curr) => acc + curr.maturities, 0),
    }),
    []
  )

  return (
    <Card className="border-[rgb(233,233,235)]">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          <CardTitle className="text-xl font-semibold text-gray-900">Users & Maturities</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Monthly overview of new users and upcoming maturities
          </CardDescription>
        </div>
        <div className="flex">
          {["users", "maturities"].map((key) => {
            const chart = key as keyof typeof chartConfig
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
                  {total[key as keyof typeof total].toLocaleString()}
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
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[8, 8, 0, 0]}
            >
              <LabelList
                dataKey={activeChart}
                position="top"
                offset={8}
                className="fill-gray-900"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
