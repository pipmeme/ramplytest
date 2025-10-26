import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Premium QR Code Generator - Free Forever | Ramply Work",
  description:
    "Create custom QR codes with advanced features. Multiple types (URL, WiFi, vCard, UPI), full customization, add logos, high-resolution downloads. Premium features worth $12/month, completely free.",
  keywords:
    "qr code generator, free qr code, custom qr code, wifi qr code, vcard qr code, upi qr code, qr code with logo, business qr code",
}

export default function QRGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children
}
