"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
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
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you
                consent to our use of cookies.{" "}
                <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={declineCookies}>
                Decline
              </Button>
              <Button size="sm" onClick={acceptCookies}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
