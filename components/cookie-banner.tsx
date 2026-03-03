"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom duration-500">
      <div className="rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/5">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Cookie Preferences</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience and analyze our traffic.{" "}
                <a href="/privacy" className="text-primary hover:underline underline-offset-4">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-xs px-4 hover:bg-muted/50"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="text-xs px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
