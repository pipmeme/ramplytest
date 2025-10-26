import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Business Health Score Assessment | Ramply Work",
  description:
    "Discover your business automation readiness score in 2 minutes. Get personalized recommendations to accelerate growth and eliminate repetitive tasks. 100% free assessment.",
  keywords:
    "business health score, automation assessment, business growth tool, free business assessment, customer tracking, business automation",
  openGraph: {
    title: "Free Business Health Score Assessment | Ramply Work",
    description:
      "Discover your business automation readiness score in 2 minutes. Get personalized recommendations to accelerate growth.",
    type: "website",
  },
}

export default function HealthScoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
