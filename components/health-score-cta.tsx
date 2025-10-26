import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardCheck, TrendingUp, Target, ArrowRight } from "lucide-react"

export function HealthScoreCTA() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    <ClipboardCheck className="h-4 w-4" />
                    Free Business Assessment
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                    How Healthy Is Your Business?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 text-pretty">
                    Get a comprehensive analysis of your business performance in just 2 minutes. Discover your
                    strengths, identify growth opportunities, and receive personalized recommendations.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>8 Key Metrics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4 text-primary" />
                      <span>Instant Results</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClipboardCheck className="h-4 w-4 text-primary" />
                      <span>Actionable Insights</span>
                    </div>
                  </div>
                  <Link href="/health-score">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                    >
                      Check Your Business Health Score
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-4">
                    No credit card required • Takes 2 minutes • 100% Free
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                          <ClipboardCheck className="h-16 w-16 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
