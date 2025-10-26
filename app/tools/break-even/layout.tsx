import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Break-Even Calculator - Free Business Tool | Ramply Work",
  description:
    "Calculate when your business will be profitable. Free break-even calculator with interactive scenarios, profit projections, and actionable recommendations.",
  keywords:
    "break-even calculator, profitability calculator, business calculator, break-even analysis, profit calculator, business planning tool",
  openGraph: {
    title: "Break-Even Calculator - Free Business Tool | Ramply Work",
    description:
      "Calculate when your business will be profitable. Free break-even calculator with interactive scenarios and profit projections.",
    type: "website",
  },
}

export default function BreakEvenLayout({ children }: { children: React.ReactNode }) {
  return children
}
