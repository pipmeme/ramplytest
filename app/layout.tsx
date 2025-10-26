import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { StructuredData } from "@/components/structured-data"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://ramplywork.com"),
  title: {
    default: "Ramply Work - Accelerating Business Growth Through Automation",
    template: "%s | Ramply Work",
  },
  description:
    "Ramply Work helps small businesses scale efficiently through workflow automation, business strategy, and data-driven insights. Founded by Numan Ashraf, we provide hands-on implementation of automation systems, dashboards, and growth strategies.",
  keywords: [
    "business automation",
    "workflow optimization",
    "business growth",
    "data tracking",
    "small business solutions",
    "scalability",
    "customer engagement",
    "business intelligence",
    "process automation",
    "Ramply Work",
    "Numan Ashraf",
    "business strategy",
    "data analytics",
    "CRM automation",
    "business dashboards",
  ],
  authors: [{ name: "Numan Ashraf", url: "https://ramplywork.com/about" }],
  creator: "Numan Ashraf",
  publisher: "Ramply Work",
  openGraph: {
    title: "Ramply Work - Accelerating Business Growth Through Automation",
    description:
      "We help small businesses scale efficiently through workflow automation, business strategy, and data-driven insights. Not a marketing agency - we focus on process, automation, and measurable growth.",
    url: "https://ramplywork.com",
    siteName: "Ramply Work",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/ramply-logo.png",
        width: 1200,
        height: 630,
        alt: "Ramply Work - Accelerating Business Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramply Work - Accelerating Business Growth",
    description: "Workflow automation, business strategy, and data-driven insights for small businesses",
    images: ["/ramply-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ramplywork.com",
  },
  category: "Business Services",
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
        <meta name="application-name" content="Ramply Work" />
        <meta name="apple-mobile-web-app-title" content="Ramply Work" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3DB89A" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
