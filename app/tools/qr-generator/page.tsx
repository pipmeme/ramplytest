"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Wifi, Mail, Phone, MessageSquare, MapPin, CreditCard, User, LinkIcon, FileText } from "lucide-react"
import QRCodeStyling from "qr-code-styling"

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState("url")
  const [qrData, setQrData] = useState({
    url: "",
    wifi: { ssid: "", password: "", encryption: "WPA" },
    email: { address: "", subject: "", body: "" },
    phone: "",
    sms: { number: "", message: "" },
    whatsapp: { number: "", message: "" },
    location: { latitude: "", longitude: "" },
    text: "",
    vcard: { name: "", phone: "", email: "", company: "", title: "" },
    upi: { id: "", name: "", amount: "" },
  })
  const [customization, setCustomization] = useState({
    fgColor: "#000000",
    bgColor: "#ffffff",
    size: 300,
    errorCorrection: "M",
    dotStyle: "square",
    cornerStyle: "square",
  })
  const [logo, setLogo] = useState<string | null>(null)
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  const generateQRData = () => {
    switch (qrType) {
      case "url":
        return qrData.url
      case "wifi":
        return `WIFI:T:${qrData.wifi.encryption};S:${qrData.wifi.ssid};P:${qrData.wifi.password};;`
      case "email":
        return `mailto:${qrData.email.address}?subject=${encodeURIComponent(qrData.email.subject)}&body=${encodeURIComponent(qrData.email.body)}`
      case "phone":
        return `tel:${qrData.phone}`
      case "sms":
        return `sms:${qrData.sms.number}?body=${encodeURIComponent(qrData.sms.message)}`
      case "whatsapp":
        return `https://wa.me/${qrData.whatsapp.number}?text=${encodeURIComponent(qrData.whatsapp.message)}`
      case "location":
        return `geo:${qrData.location.latitude},${qrData.location.longitude}`
      case "text":
        return qrData.text
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${qrData.vcard.name}\nTEL:${qrData.vcard.phone}\nEMAIL:${qrData.vcard.email}\nORG:${qrData.vcard.company}\nTITLE:${qrData.vcard.title}\nEND:VCARD`
      case "upi":
        return `upi://pay?pa=${qrData.upi.id}&pn=${encodeURIComponent(qrData.upi.name)}&am=${qrData.upi.amount}`
      default:
        return ""
    }
  }

  useEffect(() => {
    const data = generateQRData()
    if (!data) return

    if (!qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling({
        width: customization.size,
        height: customization.size,
        data: data,
        dotsOptions: {
          color: customization.fgColor,
          type: customization.dotStyle as any,
        },
        backgroundOptions: {
          color: customization.bgColor,
        },
        cornersSquareOptions: {
          type: customization.cornerStyle as any,
        },
        cornersDotOptions: {
          type: customization.cornerStyle as any,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
        },
        image: logo || undefined,
      })

      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = ""
        qrCodeInstance.current.append(qrCodeRef.current)
      }
    } else {
      qrCodeInstance.current.update({
        data: data,
        width: customization.size,
        height: customization.size,
        dotsOptions: {
          color: customization.fgColor,
          type: customization.dotStyle as any,
        },
        backgroundOptions: {
          color: customization.bgColor,
        },
        cornersSquareOptions: {
          type: customization.cornerStyle as any,
        },
        cornersDotOptions: {
          type: customization.cornerStyle as any,
        },
        image: logo || undefined,
      })
    }
  }, [qrType, qrData, customization, logo])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogo(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadQR = (format: "png" | "svg") => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({
        extension: format,
        name: `qr-code-${qrType}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Premium QR Code Generator
            </h1>
            <p className="text-lg text-muted-foreground">
              Create custom QR codes with advanced features - worth $12/month, free forever
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Configuration */}
            <div className="space-y-6">
              {/* QR Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Type</CardTitle>
                  <CardDescription>Choose what your QR code will contain</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={qrType} onValueChange={setQrType}>
                    <TabsList className="grid w-full grid-cols-5 h-auto">
                      <TabsTrigger value="url" className="flex flex-col gap-1 py-2">
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-xs">URL</span>
                      </TabsTrigger>
                      <TabsTrigger value="wifi" className="flex flex-col gap-1 py-2">
                        <Wifi className="h-4 w-4" />
                        <span className="text-xs">WiFi</span>
                      </TabsTrigger>
                      <TabsTrigger value="email" className="flex flex-col gap-1 py-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-xs">Email</span>
                      </TabsTrigger>
                      <TabsTrigger value="phone" className="flex flex-col gap-1 py-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-xs">Phone</span>
                      </TabsTrigger>
                      <TabsTrigger value="sms" className="flex flex-col gap-1 py-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">SMS</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-5 h-auto mt-2">
                      <TabsTrigger value="whatsapp" className="flex flex-col gap-1 py-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">WhatsApp</span>
                      </TabsTrigger>
                      <TabsTrigger value="location" className="flex flex-col gap-1 py-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">Location</span>
                      </TabsTrigger>
                      <TabsTrigger value="vcard" className="flex flex-col gap-1 py-2">
                        <User className="h-4 w-4" />
                        <span className="text-xs">Contact</span>
                      </TabsTrigger>
                      <TabsTrigger value="upi" className="flex flex-col gap-1 py-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="text-xs">UPI Pay</span>
                      </TabsTrigger>
                      <TabsTrigger value="text" className="flex flex-col gap-1 py-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-xs">Text</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="mt-6 space-y-4">
                      <TabsContent value="url" className="mt-0">
                        <Label htmlFor="url">Website URL</Label>
                        <Input
                          id="url"
                          placeholder="https://example.com"
                          value={qrData.url}
                          onChange={(e) => setQrData({ ...qrData, url: e.target.value })}
                        />
                      </TabsContent>

                      <TabsContent value="wifi" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="ssid">Network Name (SSID)</Label>
                          <Input
                            id="ssid"
                            placeholder="My WiFi"
                            value={qrData.wifi.ssid}
                            onChange={(e) => setQrData({ ...qrData, wifi: { ...qrData.wifi, ssid: e.target.value } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="wifi-password">Password</Label>
                          <Input
                            id="wifi-password"
                            type="password"
                            placeholder="Password"
                            value={qrData.wifi.password}
                            onChange={(e) =>
                              setQrData({ ...qrData, wifi: { ...qrData.wifi, password: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="encryption">Encryption</Label>
                          <select
                            id="encryption"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={qrData.wifi.encryption}
                            onChange={(e) =>
                              setQrData({ ...qrData, wifi: { ...qrData.wifi, encryption: e.target.value } })
                            }
                          >
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">None</option>
                          </select>
                        </div>
                      </TabsContent>

                      <TabsContent value="email" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="email-address">Email Address</Label>
                          <Input
                            id="email-address"
                            type="email"
                            placeholder="contact@example.com"
                            value={qrData.email.address}
                            onChange={(e) =>
                              setQrData({ ...qrData, email: { ...qrData.email, address: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-subject">Subject</Label>
                          <Input
                            id="email-subject"
                            placeholder="Subject"
                            value={qrData.email.subject}
                            onChange={(e) =>
                              setQrData({ ...qrData, email: { ...qrData.email, subject: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-body">Message</Label>
                          <textarea
                            id="email-body"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Message"
                            value={qrData.email.body}
                            onChange={(e) => setQrData({ ...qrData, email: { ...qrData.email, body: e.target.value } })}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="phone" className="mt-0">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+1234567890"
                          value={qrData.phone}
                          onChange={(e) => setQrData({ ...qrData, phone: e.target.value })}
                        />
                      </TabsContent>

                      <TabsContent value="sms" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="sms-number">Phone Number</Label>
                          <Input
                            id="sms-number"
                            placeholder="+1234567890"
                            value={qrData.sms.number}
                            onChange={(e) => setQrData({ ...qrData, sms: { ...qrData.sms, number: e.target.value } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="sms-message">Message</Label>
                          <textarea
                            id="sms-message"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Message"
                            value={qrData.sms.message}
                            onChange={(e) => setQrData({ ...qrData, sms: { ...qrData.sms, message: e.target.value } })}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="whatsapp" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="wa-number">WhatsApp Number (with country code)</Label>
                          <Input
                            id="wa-number"
                            placeholder="1234567890"
                            value={qrData.whatsapp.number}
                            onChange={(e) =>
                              setQrData({ ...qrData, whatsapp: { ...qrData.whatsapp, number: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="wa-message">Pre-filled Message</Label>
                          <textarea
                            id="wa-message"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Hello!"
                            value={qrData.whatsapp.message}
                            onChange={(e) =>
                              setQrData({ ...qrData, whatsapp: { ...qrData.whatsapp, message: e.target.value } })
                            }
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="location" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input
                            id="latitude"
                            placeholder="40.7128"
                            value={qrData.location.latitude}
                            onChange={(e) =>
                              setQrData({ ...qrData, location: { ...qrData.location, latitude: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input
                            id="longitude"
                            placeholder="-74.0060"
                            value={qrData.location.longitude}
                            onChange={(e) =>
                              setQrData({ ...qrData, location: { ...qrData.location, longitude: e.target.value } })
                            }
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="text" className="mt-0">
                        <Label htmlFor="text">Text Content</Label>
                        <textarea
                          id="text"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter any text..."
                          value={qrData.text}
                          onChange={(e) => setQrData({ ...qrData, text: e.target.value })}
                        />
                      </TabsContent>

                      <TabsContent value="vcard" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="vcard-name">Full Name</Label>
                          <Input
                            id="vcard-name"
                            placeholder="John Doe"
                            value={qrData.vcard.name}
                            onChange={(e) => setQrData({ ...qrData, vcard: { ...qrData.vcard, name: e.target.value } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="vcard-phone">Phone</Label>
                          <Input
                            id="vcard-phone"
                            placeholder="+1234567890"
                            value={qrData.vcard.phone}
                            onChange={(e) =>
                              setQrData({ ...qrData, vcard: { ...qrData.vcard, phone: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="vcard-email">Email</Label>
                          <Input
                            id="vcard-email"
                            type="email"
                            placeholder="john@example.com"
                            value={qrData.vcard.email}
                            onChange={(e) =>
                              setQrData({ ...qrData, vcard: { ...qrData.vcard, email: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="vcard-company">Company</Label>
                          <Input
                            id="vcard-company"
                            placeholder="Company Name"
                            value={qrData.vcard.company}
                            onChange={(e) =>
                              setQrData({ ...qrData, vcard: { ...qrData.vcard, company: e.target.value } })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="vcard-title">Job Title</Label>
                          <Input
                            id="vcard-title"
                            placeholder="CEO"
                            value={qrData.vcard.title}
                            onChange={(e) =>
                              setQrData({ ...qrData, vcard: { ...qrData.vcard, title: e.target.value } })
                            }
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="upi" className="mt-0 space-y-4">
                        <div>
                          <Label htmlFor="upi-id">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="username@upi"
                            value={qrData.upi.id}
                            onChange={(e) => setQrData({ ...qrData, upi: { ...qrData.upi, id: e.target.value } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="upi-name">Payee Name</Label>
                          <Input
                            id="upi-name"
                            placeholder="Business Name"
                            value={qrData.upi.name}
                            onChange={(e) => setQrData({ ...qrData, upi: { ...qrData.upi, name: e.target.value } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="upi-amount">Amount (optional)</Label>
                          <Input
                            id="upi-amount"
                            type="number"
                            placeholder="100"
                            value={qrData.upi.amount}
                            onChange={(e) => setQrData({ ...qrData, upi: { ...qrData.upi, amount: e.target.value } })}
                          />
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Customization */}
              <Card>
                <CardHeader>
                  <CardTitle>Customize Design</CardTitle>
                  <CardDescription>Make your QR code unique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fg-color">Foreground Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="fg-color"
                          type="color"
                          value={customization.fgColor}
                          onChange={(e) => setCustomization({ ...customization, fgColor: e.target.value })}
                          className="h-10 w-20"
                        />
                        <Input
                          type="text"
                          value={customization.fgColor}
                          onChange={(e) => setCustomization({ ...customization, fgColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bg-color">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="bg-color"
                          type="color"
                          value={customization.bgColor}
                          onChange={(e) => setCustomization({ ...customization, bgColor: e.target.value })}
                          className="h-10 w-20"
                        />
                        <Input
                          type="text"
                          value={customization.bgColor}
                          onChange={(e) => setCustomization({ ...customization, bgColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="size">Size: {customization.size}px</Label>
                    <input
                      id="size"
                      type="range"
                      min="200"
                      max="800"
                      step="50"
                      value={customization.size}
                      onChange={(e) => setCustomization({ ...customization, size: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dot-style">Dot Style</Label>
                    <select
                      id="dot-style"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={customization.dotStyle}
                      onChange={(e) => setCustomization({ ...customization, dotStyle: e.target.value })}
                    >
                      <option value="square">Square</option>
                      <option value="rounded">Rounded</option>
                      <option value="dots">Dots</option>
                      <option value="classy">Classy</option>
                      <option value="classy-rounded">Classy Rounded</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="corner-style">Corner Style</Label>
                    <select
                      id="corner-style"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={customization.cornerStyle}
                      onChange={(e) => setCustomization({ ...customization, cornerStyle: e.target.value })}
                    >
                      <option value="square">Square</option>
                      <option value="dot">Dot</option>
                      <option value="extra-rounded">Extra Rounded</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="logo">Add Logo (optional)</Label>
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="mt-1" />
                    {logo && (
                      <Button variant="outline" size="sm" onClick={() => setLogo(null)} className="mt-2">
                        Remove Logo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview & Download */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>Your QR code will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 p-8">
                    <div ref={qrCodeRef} className="flex items-center justify-center" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download</CardTitle>
                  <CardDescription>Get your QR code in high resolution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={() => downloadQR("png")} className="w-full" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download PNG
                  </Button>
                  <Button onClick={() => downloadQR("svg")} variant="outline" className="w-full" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download SVG (Vector)
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-pink-500/50 bg-pink-500/5">
                <CardHeader>
                  <CardTitle className="text-pink-600">Premium Features Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>10+ QR code types (URL, WiFi, vCard, UPI, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>Full color customization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>Add your logo to QR codes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>Multiple design styles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>High-resolution downloads (PNG & SVG)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>No watermarks or branding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-pink-500">✓</span>
                      <span>Unlimited QR codes</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-center text-sm font-semibold text-pink-600">Worth $12/month - Free Forever</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
