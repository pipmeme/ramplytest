"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-primary" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 3H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM20 3h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 14H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1zM20 14h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Automation Services",
    description: "Automated workflows for follow-ups, reminders, and data collection that run 24/7.",
    href: "/solutions",
    stat: "15+ hrs saved/week",
    statColor: "text-primary bg-primary/10",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-primary" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Business Strategy",
    description: "Growth strategies and customer re-engagement systems built on real data.",
    href: "/solutions",
    stat: "40% more retention",
    statColor: "text-primary bg-primary/10",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-primary" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Data Tracking & Insights",
    description: "Dashboards and reporting to track performance and customer behavior in real-time.",
    href: "/solutions",
    stat: "Real-time insights",
    statColor: "text-primary bg-primary/10",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">scale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We focus on the systems behind growth — automation, strategy, and data.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Link href={feature.href} className="group block h-full">
                <Card className="relative h-full bg-card border border-border/60 p-7 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 hover:-translate-y-1 rounded-2xl">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {feature.description}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.statColor}`}>
                      {feature.stat}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
