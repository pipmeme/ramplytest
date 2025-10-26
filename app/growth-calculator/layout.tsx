import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Growth Calculator - Calculate CLV & Revenue Potential | Ramply Work",
  description:
    "Free business growth calculator. Calculate Customer Lifetime Value (CLV), identify lost revenue, and discover your growth potential with our interactive ROI simulator. Get personalized recommendations to increase revenue.",
  keywords:
    "business growth calculator, customer lifetime value calculator, CLV calculator, revenue calculator, retention rate calculator, ROI calculator, business metrics, customer retention, revenue growth, profit calculator",
  openGraph: {
    title: "Business Growth Calculator - See Your Revenue Potential",
    description:
      "Calculate your Customer Lifetime Value, identify lost revenue, and see exactly how much your business could grow. Free interactive calculator with personalized recommendations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Growth Calculator - Calculate Your Revenue Potential",
    description:
      "Free tool to calculate CLV, identify lost revenue, and discover growth opportunities. Get instant insights and personalized recommendations.",
  },
}

export default function GrowthCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
