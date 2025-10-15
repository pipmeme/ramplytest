import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Lightbulb, Rocket } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">About Ramply Work</h1>
            <p className="text-xl text-muted-foreground text-balance">
              We help small businesses grow and scale efficiently through automation, strategy, and data-driven
              insights.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <Card className="border-2">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Founded by Numan Ashraf</h2>
                <p className="text-muted-foreground mb-4">
                  Ramply Work was founded by <strong>Numan Ashraf</strong> to help small businesses achieve sustainable
                  growth through three core pillars: <strong>automation</strong>, <strong>business strategy</strong>,
                  and <strong>data tracking</strong>.
                </p>
                <p className="text-muted-foreground mb-4">
                  We're not a marketing agency. We don't run ads or handle general marketing campaigns. Instead, we
                  focus on the systems and processes that make your business run more efficiently and profitably.
                </p>
                <p className="text-muted-foreground">
                  Our approach is hands-on and practical. We implement real solutions that automate repetitive tasks,
                  optimize your workflows, and provide you with the data insights you need to make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To empower small businesses with enterprise-level automation and insights, making growth accessible
                  and sustainable.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Our Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Process-focused, data-driven, and hands-on. We implement solutions that deliver measurable results and
                  long-term value.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Our Promise</h3>
                <p className="text-sm text-muted-foreground">
                  Real solutions, not just advice. We build and implement the systems that help your business scale
                  efficiently.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Who We Work With</h2>
              <p className="text-muted-foreground mb-6">
                We partner with small businesses at various stages—from new startups building scalable systems to
                established companies ready to optimize and scale their operations.
              </p>
              <div className="text-center">
                <Link href="/get-started">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Work With Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
