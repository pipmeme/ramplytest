import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Automation Services",
      description: "Streamline your business operations with intelligent automation",
      features: [
        "Automated customer follow-ups and reminders",
        "Smart voucher and promotion systems",
        "Automated data collection and processing",
        "Workflow automation for repetitive tasks",
        "Email and SMS automation sequences",
      ],
    },
    {
      title: "Business Development & Strategy",
      description: "Strategic guidance to accelerate your business growth",
      features: [
        "Custom growth strategies tailored to your business",
        "Customer re-engagement campaigns",
        "Workflow optimization and process improvement",
        "Revenue growth planning and execution",
        "Market positioning and competitive analysis",
      ],
    },
    {
      title: "Data Tracking & Insights",
      description: "Make informed decisions with powerful analytics and reporting",
      features: [
        "Custom dashboards for real-time insights",
        "Performance tracking and KPI monitoring",
        "Automated reporting and analytics",
        "Customer behavior analysis",
        "Data-driven recommendations for growth",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Solutions That Scale Your Business</h1>
          <p className="text-lg text-muted-foreground text-balance">
            We provide comprehensive solutions to automate your workflows, optimize your processes, and accelerate your
            business growth through data-driven insights.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">{solution.title}</CardTitle>
                <CardDescription className="text-base">{solution.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
