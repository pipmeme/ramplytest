"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, TrendingUp, Target, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HealthScoreCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border bg-gradient-to-br from-primary/[0.04] via-white to-primary/[0.02] p-10 sm:p-14 lg:p-16 shadow-lg shadow-black/[0.04]">
            {/* Subtle decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-sm font-semibold mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Free Assessment
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance leading-tight tracking-tight">
                  How healthy is your{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">business</span>?
                </h2>
                <p className="text-base text-muted-foreground mb-7 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Get a comprehensive analysis in just 2 minutes. Discover strengths, find growth opportunities, and get a personalized plan.
                </p>

                {/* Feature pills — colorful */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7">
                  {[
                    { icon: TrendingUp, text: "8 Key Metrics", color: "text-primary bg-primary/10 border-primary/20" },
                    { icon: Target, text: "Instant Results", color: "text-primary bg-primary/10 border-primary/20" },
                    { icon: ClipboardCheck, text: "100% Free", color: "text-primary bg-primary/10 border-primary/20" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className={`flex items-center gap-2 text-sm font-medium border rounded-full px-3.5 py-1.5 ${item.color}`}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/health-score">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group rounded-xl"
                  >
                    Check Your Score
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Right visual — concentric rings */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/8 rounded-full blur-xl pulse-glow" />
                  <div className="relative w-48 h-48 rounded-full bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full bg-primary/12 border border-primary/10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-black/10">
                        <ClipboardCheck className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-1 right-5 w-3 h-3 rounded-full bg-primary/60 float-fast" />
                  <div className="absolute bottom-5 -left-1 w-2.5 h-2.5 rounded-full bg-primary/40 float-slow" />
                  <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-primary/80 float-medium" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
