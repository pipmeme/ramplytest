"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Fahad Al-Mutairi",
      role: "CMO, Qahwat Al-Sabah",
      content:
        "Ramply Work transformed our operations. Their automation systems saved us 15 hours per week and increased our customer retention by 40%.",
      rating: 5,
      initials: "FA",
    },
    {
      name: "Mohammad",
      role: "Founder, Nafash Digicom",
      content:
        "The dashboards they built gave us insights we never had before. We can now make data-driven decisions that actually move the needle.",
      rating: 5,
      initials: "M",
    },
  ]

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            What our clients say
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-border/60 bg-card h-full hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                <CardContent className="p-7">
                  {/* Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground leading-relaxed mb-7 text-[15px]">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
