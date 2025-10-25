import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { StructuredData } from "@/components/structured-data"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ramply Work - Accelerating Business Growth",
  description:
    "We set up workflows and dashboards to accelerate your business growth through automation, strategy, and data tracking.",
  keywords: [
    "business automation",
    "workflow optimization",
    "business growth",
    "data tracking",
    "small business",
    "scalability",
  ],
  authors: [{ name: "Ramply Work" }],
  openGraph: {
    title: "Ramply Work - Accelerating Business Growth",
    description: "Smart automation and data-driven insights for growing businesses",
    url: "https://ramplywork.com",
    siteName: "Ramply Work",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramply Work - Accelerating Business Growth",
    description: "Smart automation and data-driven insights for growing businesses",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
