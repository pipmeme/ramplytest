import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profit Margin Calculator - Free Business Tool | Ramply Work",
  description:
    "Calculate profit margins, markup, and optimal pricing for your products. Compare multiple items, get pricing recommendations, and maximize profitability with our free premium calculator.",
  keywords:
    "profit margin calculator, markup calculator, pricing tool, profit calculator, business profitability, pricing strategy, margin analysis",
}

export default function ProfitMarginLayout({ children }: { children: React.ReactNode }) {
  return children
}
