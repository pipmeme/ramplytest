import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Database, BarChart3, Megaphone, CheckCircle2, ArrowRight, Sparkles, Layers } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export const metadata: Metadata = {
  title: "Ramply Connect - Customer Intelligence Ecosystem | Ramply Work",
  description:
    "Helping small and medium businesses collect, understand, and engage their customers effectively with Ramply Sense, Insight, and Engage.",
  keywords: "customer intelligence, customer data, analytics, customer engagement, loyalty programs, business insights",
  openGraph: {
    title: "Ramply Connect - Customer Intelligence Ecosystem",
    description: "Collect, understand, and engage your customers effectively",
    type: "website",
  },
}

const products = [
  {
    icon: Database,
    name: "Ramply Sense",
    tagline: "Capture Customer Data Effortlessly",
    description:
      "Track visits, repeat customers, and basic preferences using simple digital check-ins, QR codes, or forms. This is the foundation for understanding your business and your customers.",
    features: [
      "Digital check-in systems",
      "QR code tracking",
      "Customer preference forms",
      "Visit frequency monitoring",
      "Automated data collection",
    ],
    gradient: "from-teal-500/20 to-emerald-500/20",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600",
    step: "01",
  },
  {
    icon: BarChart3,
    name: "Ramply Insight",
    tagline: "Turn Data Into Actionable Insights",
    description:
      "Visual dashboards and analytics make it easy to see trends, customer behavior, and key metrics — without needing technical expertise.",
    features: [
      "Visual dashboards",
      "Customer behavior analytics",
      "Trend identification",
      "Key performance metrics",
      "No technical expertise required",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    step: "02",
  },
  {
    icon: Megaphone,
    name: "Ramply Engage",
    tagline: "Grow Your Business With Smarter Engagement",
    description:
      "Personalize offers, promotions, and loyalty programs based on real customer insights. Increase customer retention and drive growth.",
    features: [
      "Personalized offers",
      "Targeted promotions",
      "Loyalty program management",
      "Customer retention tools",
      "Growth-driven campaigns",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    step: "03",
  },
]

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Layers className="h-3.5 w-3.5" />
                Product Ecosystem
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-5 leading-tight">
                Ramply <span className="text-primary">Connect</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 font-medium">The Customer Intelligence Ecosystem</p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Helping small and medium businesses collect, understand, and engage their customers effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <Sparkles className="h-3 w-3" />
                Three Products, One Ecosystem
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything Works <span className="text-primary">Together</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Each product works independently or together to create a complete customer intelligence solution
              </p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {products.map((product, index) => (
                <Card
                  key={product.name}
                  className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none`} />
                  <CardContent className="p-7 sm:p-8 md:p-10 relative">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Left: icon + step */}
                      <div className="flex items-start gap-4 md:w-80 shrink-0">
                        <div className="relative">
                          <span className="absolute -top-2 -left-2 text-[10px] font-bold text-primary/40">{product.step}</span>
                          <div className={`${product.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                            <product.icon className={`h-7 w-7 ${product.iconColor}`} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm font-medium text-primary">{product.tagline}</p>
                        </div>
                      </div>

                      {/* Right: description + features */}
                      <div className="flex-1">
                        <p className="text-muted-foreground leading-relaxed mb-5">{product.description}</p>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {product.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
              <div className="relative p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Transform Your Customer Intelligence?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join businesses that are already using Ramply Connect to understand and engage their customers better.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
