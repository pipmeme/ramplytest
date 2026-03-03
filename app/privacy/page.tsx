import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Ramply Work",
  description: "Learn how Ramply Work collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 sm:py-18 md:py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
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
                <Shield className="h-3.5 w-3.5" />
                Your Privacy Matters
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-muted-foreground">Last updated: 27/08/2025</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-10">
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-10">
                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">01</span>
                    Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    When you use our contact form or services, we collect information that you provide directly to us, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Name and contact information (email, phone number)</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Business name and details</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Messages and communications you send to us</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">02</span>
                    How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">We use the information we collect to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Respond to your inquiries and provide customer support</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Deliver our services and fulfill your requests</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Send you updates about our services (with your consent)</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Improve our website and services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">03</span>
                    Information Sharing
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />With your explicit consent</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />To comply with legal obligations</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />With service providers who assist in our operations (under strict confidentiality agreements)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">04</span>
                    Data Security
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">05</span>
                    Your Rights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Access the personal information we hold about you</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Request correction of inaccurate information</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Request deletion of your personal information</li>
                    <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">06</span>
                    Cookies
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies to improve your browsing experience. You can control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-bold text-foreground flex items-baseline gap-3">
                    <span className="text-sm font-bold text-primary/40">07</span>
                    Contact Us
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:hello@ramplywork.com" className="text-primary hover:underline font-medium">
                      hello@ramplywork.com
                    </a>{" / "}
                    <a href="mailto:ramplywork@gmail.com" className="text-primary hover:underline font-medium">
                      ramplywork@gmail.com
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
