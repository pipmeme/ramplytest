import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, BarChart3, Megaphone, CheckCircle2, ArrowRight } from "lucide-react"
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

export default function ProductsPage() {
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
      color: "from-teal-500 to-emerald-500",
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
      color: "from-blue-500 to-cyan-500",
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
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl text-center animate-fade-in">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Ramply Connect
              </h1>
              <p className="mb-4 text-xl text-primary md:text-2xl font-semibold">The Customer Intelligence Ecosystem</p>
              <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Helping small and medium businesses collect, understand, and engage their customers effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center animate-fade-in">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Three Powerful Products, One Ecosystem
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Each product works independently or together to create a complete customer intelligence solution
              </p>
            </div>

            <div className="grid gap-8 md:gap-12 lg:gap-16">
              {products.map((product, index) => (
                <Card
                  key={product.name}
                  className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="space-y-4">
                    <div className={`inline-flex w-fit rounded-lg bg-gradient-to-r ${product.color} p-3`}>
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl mb-2">{product.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">
                        {product.tagline}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-20 md:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                Ready to Transform Your Customer Intelligence?
              </h2>
              <p className="mb-10 text-lg text-muted-foreground">
                Join businesses that are already using Ramply Connect to understand and engage their customers better.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
