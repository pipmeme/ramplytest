import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Ramply Work</h3>
            <p className="text-sm text-muted-foreground">
              Accelerating business growth through smart automation and data-driven insights.
            </p>
            <div className="flex gap-4">
              <div
                className="group relative cursor-not-allowed text-muted-foreground/50 transition-colors"
                title="Coming Soon"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook - Coming Soon</span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  Coming Soon
                </span>
              </div>
              <div
                className="group relative cursor-not-allowed text-muted-foreground/50 transition-colors"
                title="Coming Soon"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter - Coming Soon</span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  Coming Soon
                </span>
              </div>
              <div
                className="group relative cursor-not-allowed text-muted-foreground/50 transition-colors"
                title="Coming Soon"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn - Coming Soon</span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  Coming Soon
                </span>
              </div>
              <div
                className="group relative cursor-not-allowed text-muted-foreground/50 transition-colors"
                title="Coming Soon"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram - Coming Soon</span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions" className="text-muted-foreground transition-colors hover:text-primary">
                  Automation Services
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-muted-foreground transition-colors hover:text-primary">
                  Business Strategy
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-muted-foreground transition-colors hover:text-primary">
                  Data Tracking
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@ramplywork.com" className="transition-colors hover:text-primary">
                  hello@ramplywork.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ramply Work. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
