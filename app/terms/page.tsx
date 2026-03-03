import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Terms of Service - Ramply Work",
  description: "Terms and conditions for using Ramply Work services.",
}

const sections = [
  {
    title: "Agreement to Terms",
    content: "By accessing or using Ramply Work services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.",
  },
  {
    title: "Services Description",
    content: "Ramply Work provides business automation, workflow optimization, and data tracking services to help small and medium-sized businesses scale efficiently.",
  },
  {
    title: "User Responsibilities",
    content: "You agree to:",
    items: [
      "Provide accurate and complete information",
      "Maintain the confidentiality of any account credentials",
      "Use our services only for lawful purposes",
      "Not interfere with or disrupt our services",
    ],
  },
  {
    title: "Service Delivery",
    content: "We will make reasonable efforts to deliver services as described. Project timelines are estimates and may vary based on project complexity and client responsiveness.",
  },
  {
    title: "Payment Terms",
    content: "Payment terms will be outlined in individual service agreements. All fees are non-refundable unless otherwise specified in writing.",
  },
  {
    title: "Intellectual Property",
    content: "Upon full payment, you own the deliverables created specifically for your project. We retain rights to our proprietary methods, tools, and general knowledge.",
  },
  {
    title: "Limitation of Liability",
    content: "Ramply Work shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.",
  },
  {
    title: "Termination",
    content: "Either party may terminate services with written notice. Upon termination, you remain responsible for payment of services rendered up to the termination date.",
  },
  {
    title: "Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
  },
]

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 sm:py-18 md:py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <FileText className="h-3.5 w-3.5" />
                Legal
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                Terms of <span className="text-primary">Service</span>
              </h1>
              <p className="text-muted-foreground">Last updated: 03/09/2025</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-10">
                {sections.map((section, index) => (
                  <section key={section.title}>
                    <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                      <span className="text-sm font-bold text-primary/40">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    {section.items && (
                      <ul className="mt-3 space-y-2 text-muted-foreground">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">10</span>
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, contact us at{" "}
                    <a href="mailto:hello@ramplywork.com" className="text-primary hover:underline font-medium">
                      hello@ramplywork.com
                    </a>
                  </p>
                </section>
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
