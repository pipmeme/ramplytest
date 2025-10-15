import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, BarChart3, Users, Target, Workflow } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
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
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Our Services</h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            We offer hands-on implementation of automation systems, growth strategies, and data tracking solutions to
            help your business scale efficiently.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Today
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
