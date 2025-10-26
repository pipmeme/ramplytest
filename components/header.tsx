"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/design-mode/e65242ac-188e-40dc-b365-1cd897ae8af0.png"
            alt="Ramply Work"
            width={180}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain transition-transform hover:scale-105"
            priority
            quality={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          <Link
            href="/health-score"
            className="text-sm font-semibold text-primary transition-all hover:text-primary/80 hover:scale-105 flex items-center gap-1"
          >
            Free Health Score
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
          >
            Products
          </Link>
          <Link
            href="/solutions"
            className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
          >
            Solutions
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
          >
            Services
          </Link>
          <Link
            href="/tools"
            className="text-sm font-semibold text-primary transition-all hover:text-primary/80 hover:scale-105 font-medium"
          >
            Free Tools
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
          >
            About
          </Link>
        </nav>

        <Link href="/contact" className="hidden md:block">
          <Button
            variant="outline"
            size="default"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            Contact Us
          </Button>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 -mr-3 text-muted-foreground hover:text-primary transition-colors touch-manipulation"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto flex flex-col px-4 py-4 space-y-1">
            <Link
              href="/health-score"
              className="text-base font-semibold text-primary hover:text-primary/80 transition-colors py-3 px-2 rounded-lg hover:bg-primary/10 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Health Score
            </Link>
            <Link
              href="/products"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/solutions"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/services"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/tools"
              className="text-base font-semibold text-primary hover:text-primary/80 transition-colors py-3 px-2 rounded-lg hover:bg-primary/10 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Tools
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="pt-2">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium w-full touch-manipulation"
              >
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
