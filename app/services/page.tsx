import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, BarChart3, Users, Target, Workflow, ClipboardCheck, ArrowRight, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export const metadata = {
  title: "Services - Ramply Work",
  description:
    "Workflow automation, customer engagement, growth strategy, analytics, and process optimization services for growing businesses.",
  keywords: [
    "workflow automation",
    "customer engagement",
    "business analytics",
    "process optimization",
    "growth strategy",
  ],
}

const services = [
  {
    icon: ClipboardCheck,
    title: "Business Health Score",
    description:
      "Get a free comprehensive assessment of your business performance and receive personalized recommendations.",
    details: [
      "8 key business metrics analysis",
      "Instant performance scoring",
      "Personalized improvement recommendations",
      "Identify growth opportunities",
    ],
    featured: true,
    link: "/health-score",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Eliminate manual tasks and save hours every week with intelligent automation systems.",
    details: [
      "Custom workflow design and implementation",
      "Integration with your existing tools",
      "Automated customer communications",
      "Process optimization and efficiency gains",
    ],
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    icon: Users,
    title: "Customer Engagement",
    description: "Keep your customers engaged with automated follow-ups, reminders, and personalized campaigns.",
    details: [
      "Automated follow-up sequences",
      "Customer re-engagement strategies",
      "Personalized voucher and promotion systems",
      "Retention and loyalty programs",
    ],
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Develop and execute data-driven strategies to scale your business sustainably.",
    details: [
      "Business growth planning",
      "Revenue optimization strategies",
      "Market analysis and positioning",
      "Scalable process development",
    ],
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Dashboards",
    description: "Track your business performance with custom dashboards and real-time reporting.",
    details: [
      "Custom dashboard creation",
      "Real-time performance tracking",
      "Automated reporting systems",
      "KPI monitoring and alerts",
    ],
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    icon: Target,
    title: "Process Optimization",
    description: "Identify bottlenecks and optimize your business processes for maximum efficiency.",
    details: [
      "Process audit and analysis",
      "Workflow redesign and improvement",
      "Efficiency recommendations",
      "Implementation support",
    ],
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
  {
    icon: Workflow,
    title: "Data Collection & Management",
    description: "Automate data collection and organize your business information for better decision-making.",
    details: [
      "Automated data collection systems",
      "Data organization and structuring",
      "Integration with existing databases",
      "Data quality and consistency",
    ],
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-16 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
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
                What We Do
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-5 leading-tight">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Hands-on implementation of automation systems, growth strategies, and data tracking solutions to help your business scale efficiently.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Service */}
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                <CardContent className="p-7 sm:p-8 md:p-10 relative">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center">
                          <ClipboardCheck className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            FREE
                          </span>
                          <span className="text-xs text-primary font-medium">Most Popular</span>
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Business Health Score</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Get a free comprehensive assessment of your business performance and receive personalized recommendations.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                        {services[0].details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/health-score">
                        <Button
                          size="lg"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                        >
                          Get Your Free Score
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Full Range of <span className="text-primary">Services</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From automation to analytics, we cover every aspect of business optimization
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {services.slice(1).map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.title}
                    className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20 hover:-translate-y-1"
                  >
                    <CardContent className="p-6 sm:p-7 relative">
                      <div className={`${service.iconBg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`h-5 w-5 ${service.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                      <div className="space-y-2.5">
                        {service.details.map((detail) => (
                          <div key={detail} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              <div className="relative p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Let&apos;s discuss how our services can help your business grow. Free consultation, no commitment.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    Book a Free Consultation
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
