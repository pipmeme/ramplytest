import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, ClipboardCheck, FileText, TrendingUp, ArrowRight, QrCode } from "lucide-react"
import { Header } from "@/components/header"
import { CookieBanner } from "@/components/cookie-banner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Free Business Tools - Ramply Work",
  description:
    "Access powerful free tools to grow your business. Business health assessment, growth calculator, break-even calculator, and professional invoice generator.",
  keywords:
    "free business tools, business calculator, invoice generator, business assessment, growth tools, break-even calculator, small business resources",
  openGraph: {
    title: "Free Business Tools - Ramply Work",
    description:
      "Access powerful free tools to grow your business. Business health assessment, growth calculator, break-even calculator, and professional invoice generator.",
    type: "website",
  },
}

const tools = [
  {
    title: "Business Health Score",
    description:
      "Get a comprehensive assessment of your business health in 2 minutes. Discover opportunities and receive personalized recommendations.",
    icon: ClipboardCheck,
    href: "/health-score",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    features: ["8 key metrics analyzed", "Personalized insights", "Downloadable PDF report"],
  },
  {
    title: "Growth Calculator",
    description:
      "Calculate your customer lifetime value, revenue potential, and growth opportunities. See exactly how much your business could grow.",
    icon: Calculator,
    href: "/growth-calculator",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    features: ["CLV calculation", "Revenue projections", "Interactive scenarios"],
  },
  {
    title: "Break-Even Calculator",
    description:
      "Discover when your business will be profitable. Calculate your break-even point and see the exact path to profitability with actionable insights.",
    icon: TrendingUp,
    href: "/tools/break-even",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    features: ["Break-even analysis", "Profit projections", "Interactive scenarios"],
  },
  {
    title: "QR Code Generator",
    description:
      "Create custom QR codes with advanced features. Multiple types, full customization, add logos, and high-resolution downloads - premium features worth $12/month.",
    icon: QrCode,
    href: "/tools/qr-generator",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    features: ["10+ QR code types", "Custom colors & logos", "High-res PNG & SVG"],
  },
  {
    title: "Invoice Generator",
    description:
      "Create professional invoices in minutes. Beautiful templates, automatic calculations, and instant PDF download - completely free.",
    icon: FileText,
    href: "/tools/invoice-generator",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    features: ["Professional templates", "Auto calculations", "Instant PDF download"],
  },
]

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <span className="text-lg">🎁</span>
                100% Free Forever • No Ads
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Free Business Tools
              </h1>
              <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl">
                Premium tools worth $50+/month - completely free. No credit card, no hidden fees, no ads.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <Card
                    key={tool.title}
                    className="group relative overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl"
                  >
                    <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      FREE
                    </div>
                    <CardHeader>
                      <div className={`mb-4 inline-flex rounded-lg ${tool.bgColor} p-3`}>
                        <Icon className={`h-8 w-8 ${tool.color}`} />
                      </div>
                      <CardTitle className="text-2xl">{tool.title}</CardTitle>
                      <CardDescription className="text-base">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-6 space-y-2">
                        {tool.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-muted-foreground">
                            <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={tool.href}>
                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          Use Tool
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Need More Than Tools?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our tools give you insights. Our services implement the solutions. Let's grow your business together.
              </p>
              <Link href="/contact">
                <Button size="lg" className="text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
