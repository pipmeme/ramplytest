import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Lightbulb, Rocket, ArrowRight, Sparkles, Heart, Shield } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export const metadata = {
  title: "About Us - Ramply Work",
  description:
    "Founded by Numan Ashraf, Ramply Work helps small businesses grow through automation, strategy, and data-driven insights.",
  keywords: ["about ramply work", "numan ashraf", "business automation company", "small business growth"],
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower small businesses with enterprise-level automation and insights, making growth accessible and sustainable.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "Process-focused, data-driven, and hands-on. We implement solutions that deliver measurable results and long-term value.",
  },
  {
    icon: Rocket,
    title: "Our Promise",
    description:
      "Real solutions, not just advice. We build and implement the systems that help your business scale efficiently.",
  },
]

const principles = [
  { icon: Heart, label: "Hands-on" },
  { icon: Shield, label: "Transparent" },
  { icon: Sparkles, label: "Results-driven" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Our Story
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                About <span className="text-primary">Ramply Work</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We help small businesses grow and scale efficiently through automation, strategy, and data-driven insights.
              </p>
            </div>
          </div>
        </section>

        {/* Founder story */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                <CardContent className="p-8 sm:p-10 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                      NA
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Founded by Numan Ashraf</h2>
                      <p className="text-sm text-muted-foreground">Founder & CEO</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Ramply Work was founded by <strong className="text-foreground">Numan Ashraf</strong> to help
                      small businesses achieve sustainable growth through three core pillars:{" "}
                      <strong className="text-primary">automation</strong>,{" "}
                      <strong className="text-primary">business strategy</strong>, and{" "}
                      <strong className="text-primary">data tracking</strong>.
                    </p>
                    <p>
                      We&apos;re not a marketing agency. We don&apos;t run ads or handle general marketing campaigns.
                      Instead, we focus on the systems and processes that make your business run more efficiently and
                      profitably.
                    </p>
                    <p>
                      Our approach is hands-on and practical. We implement real solutions that automate repetitive tasks,
                      optimize your workflows, and provide you with the data insights you need to make informed
                      decisions.
                    </p>
                  </div>

                  {/* Principles */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border/50">
                    {principles.map((p) => (
                      <div
                        key={p.label}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-foreground"
                      >
                        <p.icon className="h-3.5 w-3.5 text-primary" />
                        {p.label}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-5 md:grid-cols-3">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="group relative bg-card/80 backdrop-blur-sm border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-primary/20 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <CardContent className="p-7 relative">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                <div className="relative p-8 sm:p-12 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Ready to Work With Us?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    We partner with small businesses at various stages — from new startups building scalable systems to
                    established companies ready to optimize and scale their operations.
                  </p>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] group"
                    >
                      Work With Us
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
