import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HealthScoreCTA } from "@/components/health-score-cta"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ramply Work - Business Automation & Growth Solutions",
  description:
    "Transform your small business with workflow automation, data-driven insights, and strategic growth planning. Founded by Numan Ashraf, we provide hands-on implementation of automation systems and dashboards to accelerate your business growth.",
  openGraph: {
    title: "Ramply Work - Business Automation & Growth Solutions",
    description:
      "Transform your small business with workflow automation, data-driven insights, and strategic growth planning.",
    url: "https://ramplywork.com",
  },
  alternates: {
    canonical: "https://ramplywork.com",
  },
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HealthScoreCTA />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
