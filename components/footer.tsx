import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Instagram, label: "Instagram" },
  ]

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground">Ramply Work</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Accelerating business growth through smart automation and data-driven insights.
            </p>
            <div className="flex gap-2 pt-1">
              {socialLinks.map((social) => (
                <div
                  key={social.label}
                  className="group relative cursor-not-allowed w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary/70 hover:bg-primary/20 transition-all touch-manipulation"
                  title="Coming Soon"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label} - Coming Soon</span>
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2.5 py-1 text-[11px] text-primary-foreground opacity-0 transition-all group-hover:opacity-100 pointer-events-none shadow-lg">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/solutions", label: "Automation Services" },
                { href: "/solutions", label: "Business Strategy" },
                { href: "/solutions", label: "Data Tracking" },
                { href: "/services", label: "All Services" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground transition-colors hover:text-primary inline-flex items-center gap-1 py-0.5 touch-manipulation"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group text-muted-foreground transition-colors hover:text-primary inline-flex items-center gap-1 py-0.5 touch-manipulation"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@ramplywork.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors touch-manipulation"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="break-all">hello@ramplywork.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ramply Work. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="text-border">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
