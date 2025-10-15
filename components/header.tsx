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
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/design-mode/e65242ac-188e-40dc-b365-1cd897ae8af0.png"
            alt="Ramply Work"
            width={180}
            height={60}
            className="h-12 w-auto object-contain transition-transform hover:scale-105"
            priority
            quality={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
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
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105"
          >
            About
          </Link>
        </nav>

        {/* Desktop Get Started Button */}
        <Link href="/get-started">
          <Button
            variant="outline"
            className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium transition-all hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-in slide-in-from-top-5 duration-300">
          <nav className="container mx-auto flex flex-col px-4 py-6 space-y-4">
            <Link
              href="/solutions"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/services"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-medium w-full mt-4"
              >
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
