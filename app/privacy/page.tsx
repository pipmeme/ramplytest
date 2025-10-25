import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Ramply Work",
  description: "Learn how Ramply Work collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-foreground md:text-5xl">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                When you use our contact form or services, we collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6">
                <li>Name and contact information (email, phone number)</li>
                <li>Business name and details</li>
                <li>Messages and communications you send to us</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Deliver our services and fulfill your requests</li>
                <li>Send you updates about our services (with your consent)</li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">3. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                only in the following circumstances:
              </p>
              <ul className="list-disc pl-6">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Cookies</h2>
              <p>
                We use cookies to improve your browsing experience. You can control cookie preferences through your
                browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
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
