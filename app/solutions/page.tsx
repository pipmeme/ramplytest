import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Sparkles, Zap, TrendingUp, BarChart3 } from "lucide-react"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import Link from "next/link"

export const metadata = {
  title: "Solutions - Ramply Work",
  description: "Comprehensive automation, strategy, and data tracking solutions to scale your business efficiently.",
  keywords: ["business automation", "workflow automation", "business strategy", "data analytics", "business growth"],
}

const solutions = [
  {
    icon: Zap,
    title: "Automation Services",
    description: "Streamline your business operations with intelligent automation",
    features: [
      "Automated customer follow-ups and reminders",
      "Smart voucher and promotion systems",
      "Automated data collection and processing",
      "Workflow automation for repetitive tasks",
      "Email and SMS automation sequences",
    ],
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: TrendingUp,
    title: "Business Development & Strategy",
    description: "Strategic guidance to accelerate your business growth",
    features: [
      "Custom growth strategies tailored to your business",
      "Customer re-engagement campaigns",
      "Workflow optimization and process improvement",
      "Revenue growth planning and execution",
      "Market positioning and competitive analysis",
    ],
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: BarChart3,
    title: "Data Tracking & Insights",
    description: "Make informed decisions with powerful analytics and reporting",
    features: [
      "Custom dashboards for real-time insights",
      "Performance tracking and KPI monitoring",
      "Automated reporting and analytics",
      "Customer behavior analysis",
      "Data-driven recommendations for growth",
    ],
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
]

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
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
                <Sparkles className="h-3.5 w-3.5" />
                Tailored Solutions
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-5 leading-tight">
                Solutions That <span className="text-primary">Scale</span> Your Business
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Comprehensive solutions to automate your workflows, optimize your processes, and accelerate your business growth through data-driven insights.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                >
                  Discuss Your Needs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
              {solutions.map((solution) => (
                <Card
                  key={solution.title}
                  className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none`} />
                  <CardContent className="p-7 sm:p-8 relative">
                    <div className={`${solution.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                      <solution.icon className={`h-6 w-6 ${solution.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{solution.description}</p>
                    <div className="space-y-3">
                      {solution.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
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
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              <div className="relative p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Not Sure Which Solution Fits?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Take our free Business Health Score to get personalized recommendations for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/health-score">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                    >
                      Free Health Score
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      Talk to Us
                    </Button>
                  </Link>
                </div>
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
