"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background glow — very faint to keep the page feeling clean */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-background to-primary/[0.05] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 md:right-32 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid items-center gap-10 lg:gap-16 xl:gap-20 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-xl"
          >
            {/* Badge - Higher contrast green */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-semibold shadow-sm">
              <Zap className="h-4 w-4" />
              Empowering Small Businesses
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground">
              Systems for{" "}
              <span className="relative inline-block mt-2">
                {/* Darker, richer green gradient for the keyword */}
                <span className="relative z-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent drop-shadow-sm">Scalability.</span>
                <span className="absolute bottom-2 left-0 right-0 h-4 bg-primary/15 rounded-sm -z-0" />
              </span>
              <br />
              <span className="text-muted-foreground/80 mt-2 block">Work Smarter.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
              We set up workflows, dashboards, and automation systems to{" "}
              <span className="text-foreground font-semibold">accelerate your business growth</span> — so you can focus on what matters most.
            </p>

            {/* CTA Buttons — Increased size and shadow for punchiness */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/health-score">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group w-full sm:w-auto rounded-xl"
                >
                  Free Health Score
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-border hover:border-primary/50 hover:bg-primary/5 transition-all w-full sm:w-auto rounded-xl bg-white/50 backdrop-blur-sm"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,0,0,0.1)] animate-pulse" />
                <span>Fast Setup</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(0,0,0,0.1)] animate-pulse" style={{ animationDelay: "0.5s" }} />
                <span>No Lock-In</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(0,0,0,0.1)] animate-pulse" style={{ animationDelay: "1s" }} />
                <span>Measurable ROI</span>
              </div>
            </div>
          </motion.div>

          {/* Right visual — Deeper shadows and richer greens */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative background element behind the card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform rotate-3 scale-105 shadow-2xl" />

              {/* Main card */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/[0.06] p-8 sm:p-10 border border-border">
                <div className="space-y-8">
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-2 h-40 sm:h-48">
                    {[40, 55, 45, 70, 60, 85, 75, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 rounded-t-md"
                        style={{
                          backgroundColor: i === 7 ? 'var(--primary)' : `color-mix(in srgb, var(--primary) ${40 + i * 8}%, transparent)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-primary/10" />

                  {/* Stats row — Stronger green containers */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl p-4 text-center border border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Efficiency</p>
                      <p className="text-xl font-bold text-primary">+40%</p>
                    </div>
                    <div className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl p-4 text-center border border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Time Saved</p>
                      <p className="text-xl font-bold text-primary">15h</p>
                    </div>
                    <div className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl p-4 text-center border border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Growth</p>
                      <p className="text-xl font-bold text-primary">2.5×</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges - Increased shadow to pop off the page */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl shadow-black/[0.08] p-4 border border-border z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wide text-foreground uppercase">Revenue</p>
                    <p className="text-sm text-primary font-black mt-0.5">+32%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl shadow-black/[0.08] p-4 border border-border z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wide text-foreground uppercase">Automated</p>
                    <p className="text-sm text-primary font-black mt-0.5">128 tasks</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
