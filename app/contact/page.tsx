"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Mail, Phone, User, Building2, MessageSquare, CheckCircle2 } from "lucide-react"
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

        // Reset success message after 5 seconds
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

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 text-balance px-2">
              Let's Accelerate Your <span className="text-primary">Business Growth</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty px-2">
              Fill out the form below and we'll get back to you within 24 hours to discuss how we can help scale your
              business.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            {isSubmitted ? (
              <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
                <CheckCircle2 className="h-14 w-14 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Thank You!</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <input type="hidden" name="access_key" value="7b634759-7ef8-4c15-a512-b0e7945c56ee" />

                {/* Name Field */}
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                  <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary flex-shrink-0" />
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="transition-all focus:scale-[1.01] h-12 text-base touch-manipulation"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="transition-all focus:scale-[1.01] h-12 text-base touch-manipulation"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-400">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="transition-all focus:scale-[1.01] h-12 text-base touch-manipulation"
                  />
                </div>

                {/* Business Name Field */}
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-500">
                  <label htmlFor="businessName" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                    Business Name
                  </label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Your Company Name"
                    className="transition-all focus:scale-[1.01] h-12 text-base touch-manipulation"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-600">
                  <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                    Tell Us About Your Business *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="What challenges are you facing? What are your growth goals?"
                    rows={5}
                    className="transition-all focus:scale-[1.01] resize-none text-base touch-manipulation min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base sm:text-lg py-6 sm:py-7 transition-all hover:scale-[1.02] hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700 touch-manipulation"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Prefer to email directly?{" "}
              <a
                href="mailto:Ramplywork@gmail.com"
                className="text-primary hover:underline font-medium transition-colors break-all"
              >
                Ramplywork@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
