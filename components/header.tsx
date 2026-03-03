"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/health-score", label: "Free Health Score", highlight: true },
    { href: "/products", label: "Products" },
    { href: "/solutions", label: "Solutions" },
    { href: "/services", label: "Services" },
    { href: "/tools", label: "Business Tools", highlight: true },
    { href: "/about", label: "About" },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? "border-border/80 bg-background/80 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          }`}
      >
        <div className="container mx-auto flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/design-mode/e65242ac-188e-40dc-b365-1cd897ae8af0.png"
              alt="Ramply Work"
              width={180}
              height={60}
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
              priority
              quality={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:gap-1.5 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : link.highlight
                      ? "font-semibold text-primary hover:text-primary/80 hover:bg-primary/5"
                      : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          <Link href="/contact" className="hidden md:block">
            <Button
              variant="outline"
              size="default"
              className={`border-primary/80 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.06] ${pathname === "/contact" ? "bg-primary text-primary-foreground" : ""
                }`}
            >
              Contact Us
            </Button>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 -mr-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all touch-manipulation"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
              <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="border-t border-border bg-background/98 backdrop-blur-xl">
            <nav className="container mx-auto flex flex-col px-4 py-3 space-y-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base py-3 px-3 rounded-xl transition-all duration-200 touch-manipulation ${isActive
                      ? "text-primary font-semibold bg-primary/10"
                      : link.highlight
                        ? "font-semibold text-primary hover:text-primary/80 hover:bg-primary/5"
                        : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2 pb-1">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="lg"
                    className={`border-primary/80 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium w-full touch-manipulation transition-all ${pathname === "/contact" ? "bg-primary text-primary-foreground" : ""
                      }`}
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-primary/20 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          style={{ top: "64px" }}
        />
      )}
    </>
  )
}
