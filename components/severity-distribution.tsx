"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SeverityDistributionProps {
  critical: number
  high: number
  medium: number
  low: number
}

export function SeverityDistribution({ critical = 0, high = 0, medium = 0, low = 0 }: SeverityDistributionProps) {
  // Ensure all values are numbers
  const safeValues = {
    critical: typeof critical === "number" ? critical : 0,
    high: typeof high === "number" ? high : 0,
    medium: typeof medium === "number" ? medium : 0,
    low: typeof low === "number" ? low : 0,
  }

  const data = [
    { name: "Critical", value: safeValues.critical, color: "#ef4444" },
    { name: "High", value: safeValues.high, color: "#f97316" },
    { name: "Medium", value: safeValues.medium, color: "#eab308" },
    { name: "Low", value: safeValues.low, color: "#22c55e" },
  ].filter((item) => item.value > 0)

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No vulnerabilities found</p>
      </div>
    )
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <ChartTooltip>
                    <ChartTooltipContent>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{data.name} Vulnerabilities</p>
                        <p className="text-2xl font-bold">{data.value}</p>
                      </div>
                    </ChartTooltipContent>
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

