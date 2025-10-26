import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Get Started with Ramply Work",
  description:
    "Contact Ramply Work to discuss how we can help scale your business through automation, strategy, and data-driven insights. Get a response within 24 hours.",
  keywords: [
    "contact ramply work",
    "business automation consultation",
    "get started",
    "business growth consultation",
    "workflow automation inquiry",
  ],
  openGraph: {
    title: "Contact Ramply Work - Let's Accelerate Your Business Growth",
    description: "Fill out our contact form and we'll get back to you within 24 hours to discuss your business needs.",
    url: "https://ramplywork.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://ramplywork.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
