"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Mail, Phone, User, Building2, MessageSquare, CheckCircle2, Sparkles, Clock, ArrowRight, Send } from "lucide-react"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export default function GetStartedPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        form.reset()

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        console.error("Form submission error:", data)
        alert("There was an error submitting the form. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10 sm:mb-12 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Get In Touch
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                Let&apos;s Accelerate Your{" "}
                <span className="text-primary">Business Growth</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we&apos;ll get back to you within 24 hours to discuss how we can help scale
                your business.
              </p>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="pb-16 sm:pb-20 md:pb-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
                {/* Left info panel */}
                <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
                  {/* Info cards */}
                  <div className="space-y-4">
                    <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Quick Response</p>
                          <p className="text-xs text-muted-foreground">We reply within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Free Consultation</p>
                          <p className="text-xs text-muted-foreground">No obligations, no pressure</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <ArrowRight className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Actionable Plan</p>
                          <p className="text-xs text-muted-foreground">Walk away with next steps</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
                      <p className="text-sm font-medium text-foreground mb-2">Prefer email?</p>
                      <a
                        href="mailto:Ramplywork@gmail.com"
                        className="text-sm text-primary hover:underline font-medium transition-colors break-all flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        Ramplywork@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/[0.03] animate-in fade-in slide-in-from-right duration-700 delay-150">
                  {isSubmitted ? (
                    <div className="text-center py-16 animate-in fade-in duration-500">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                      <p className="text-muted-foreground">
                        We&apos;ve received your message and will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="hidden" name="access_key" value="7b634759-7ef8-4c15-a512-b0e7945c56ee" />

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-primary" />
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            className="h-11 text-sm border-border/60 focus:border-primary/50 transition-colors touch-manipulation"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-primary" />
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="h-11 text-sm border-border/60 focus:border-primary/50 transition-colors touch-manipulation"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-primary" />
                            Phone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="h-11 text-sm border-border/60 focus:border-primary/50 transition-colors touch-manipulation"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="businessName" className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Building2 className="h-3.5 w-3.5 text-primary" />
                            Business Name
                          </label>
                          <Input
                            id="businessName"
                            name="businessName"
                            type="text"
                            placeholder="Your Company"
                            className="h-11 text-sm border-border/60 focus:border-primary/50 transition-colors touch-manipulation"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5 text-primary" />
                          Tell Us About Your Business *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          placeholder="What challenges are you facing? What are your growth goals?"
                          rows={5}
                          className="resize-none text-sm border-border/60 focus:border-primary/50 transition-colors touch-manipulation min-h-[120px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base py-6 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-black/[0.06] group touch-manipulation"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
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
