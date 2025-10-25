import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service - Ramply Work",
  description: "Terms and conditions for using Ramply Work services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-foreground md:text-5xl">Terms of Service</h1>
          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              <strong>Last updated:</strong> 03/09/2025
            </p>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing or using Ramply Work services, you agree to be bound by these Terms of Service. If you
                disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Services Description</h2>
              <p>
                Ramply Work provides business automation, workflow optimization, and data tracking services to help
                small and medium-sized businesses scale efficiently.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of any account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Service Delivery</h2>
              <p>
                We will make reasonable efforts to deliver services as described. Project timelines are estimates and
                may vary based on project complexity and client responsiveness.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Payment Terms</h2>
              <p>
                Payment terms will be outlined in individual service agreements. All fees are non-refundable unless
                otherwise specified in writing.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p>
                Upon full payment, you own the deliverables created specifically for your project. We retain rights to
                our proprietary methods, tools, and general knowledge.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                Ramply Work shall not be liable for any indirect, incidental, special, or consequential damages arising
                from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Termination</h2>
              <p>
                Either party may terminate services with written notice. Upon termination, you remain responsible for
                payment of services rendered up to the termination date.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at{" "}
                <a href="mailto:hello@ramplywork.com" className="text-primary hover:underline">
                  hello@ramplywork.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
