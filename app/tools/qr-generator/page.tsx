"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, ArrowLeft, Upload, X, Share2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState("url")
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#ffffff")
  const [qrSize, setQrSize] = useState("300")
  const [logoFile, setLogoFile] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [QRCodeStyling, setQRCodeStyling] = useState<any>(null)
  const qrCodeRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [qrImageUrl, setQrImageUrl] = useState<string>("")

  const [urlData, setUrlData] = useState("")
  const [wifiSSID, setWifiSSID] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [wifiEncryption, setWifiEncryption] = useState("WPA")
  const [email, setEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [phone, setPhone] = useState("")
  const [smsNumber, setSmsNumber] = useState("")
  const [smsMessage, setSmsMessage] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [whatsappMessage, setWhatsappMessage] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [vcardName, setVcardName] = useState("")
  const [vcardPhone, setVcardPhone] = useState("")
  const [vcardEmail, setVcardEmail] = useState("")
  const [vcardOrg, setVcardOrg] = useState("")
  const [upiId, setUpiId] = useState("")
  const [upiName, setUpiName] = useState("")
  const [upiAmount, setUpiAmount] = useState("")
  const [upiNote, setUpiNote] = useState("")
  const [plainText, setPlainText] = useState("")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
  }, [])

  useEffect(() => {
    import("qr-code-styling").then((module) => {
      setQRCodeStyling(() => module.default)
    })
  }, [])

  const getQRData = () => {
    switch (qrType) {
      case "url":
        return urlData
      case "wifi":
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      case "phone":
        return `tel:${phone}`
      case "sms":
        return `sms:${smsNumber}${smsMessage ? `?body=${encodeURIComponent(smsMessage)}` : ""}`
      case "whatsapp":
        return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ""}`
      case "location":
        return `geo:${latitude},${longitude}`
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardOrg}\nEND:VCARD`
      case "upi":
        return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}${upiAmount ? `&am=${upiAmount}` : ""}${upiNote ? `&tn=${encodeURIComponent(upiNote)}` : ""}`
      case "text":
        return plainText
      default:
        return ""
    }
  }

  const qrData = getQRData()

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoFile(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
  }

  useEffect(() => {
    if (!QRCodeStyling || !canvasRef.current || !qrData) return

    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        data: qrData,
        width: Number.parseInt(qrSize),
        height: Number.parseInt(qrSize),
        dotsOptions: {
          color: qrColor,
          type: "rounded",
        },
        backgroundOptions: {
          color: qrBgColor,
        },
        image: logoFile || undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: 0.4,
        },
      })
    } else {
      qrCodeRef.current = new QRCodeStyling({
        width: Number.parseInt(qrSize),
        height: Number.parseInt(qrSize),
        data: qrData,
        dotsOptions: {
          color: qrColor,
          type: "rounded",
        },
        backgroundOptions: {
          color: qrBgColor,
        },
        image: logoFile || undefined,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: 0.4,
        },
      })
      qrCodeRef.current.append(canvasRef.current)
    }
  }, [QRCodeStyling, qrData, qrColor, qrBgColor, qrSize, logoFile])

  const handleDownload = async (format: "png" | "svg") => {
    if (!qrCodeRef.current) return

    try {
      if (isMobile) {
        const blob = await new Promise<Blob>((resolve) => {
          qrCodeRef.current.getRawData(format).then((blob: Blob) => resolve(blob))
        })
        const url = URL.createObjectURL(blob)
        setQrImageUrl(url)
        setShowImageModal(true)
      } else {
        qrCodeRef.current.download({ name: "qr-code", extension: format })
      }
    } catch (error) {
      console.error("Download error:", error)
      qrCodeRef.current.download({ name: "qr-code", extension: format })
    }
  }

  const handleShare = async () => {
    if (!qrCodeRef.current) return

    try {
      const blob = await new Promise<Blob>((resolve) => {
        qrCodeRef.current.getRawData("png").then((blob: Blob) => resolve(blob))
      })

      const file = new File([blob], "qr-code.png", { type: "image/png" })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR code",
        })
      } else {
        const url = URL.createObjectURL(blob)
        setQrImageUrl(url)
        setShowImageModal(true)
      }
    } catch (error) {
      console.error("Share error:", error)
    }
  }

  const renderInputFields = () => {
    switch (qrType) {
      case "url":
        return (
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={urlData}
              onChange={(e) => setUrlData(e.target.value)}
            />
          </div>
        )
      case "wifi":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                placeholder="My WiFi Network"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password">Password</Label>
              <Input
                id="wifi-password"
                type="password"
                placeholder="Enter password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-encryption">Encryption</Label>
              <Select value={wifiEncryption} onValueChange={setWifiEncryption}>
                <SelectTrigger id="wifi-encryption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "email":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject (Optional)</Label>
              <Input
                id="email-subject"
                placeholder="Email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body">Message (Optional)</Label>
              <Textarea
                id="email-body"
                placeholder="Email message"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>
          </>
        )
      case "phone":
        return (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        )
      case "sms":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="sms-number">Phone Number</Label>
              <Input
                id="sms-number"
                placeholder="+1234567890"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-message">Message (Optional)</Label>
              <Textarea
                id="sms-message"
                placeholder="SMS message"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
              />
            </div>
          </>
        )
      case "whatsapp":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
              <Input
                id="whatsapp-number"
                placeholder="+1234567890"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-message">Pre-filled Message (Optional)</Label>
              <Textarea
                id="whatsapp-message"
                placeholder="Hello!"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
              />
            </div>
          </>
        )
      case "location":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="37.7749"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="-122.4194"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </>
        )
      case "vcard":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="vcard-name">Full Name</Label>
              <Input
                id="vcard-name"
                placeholder="John Doe"
                value={vcardName}
                onChange={(e) => setVcardName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-phone">Phone Number</Label>
              <Input
                id="vcard-phone"
                placeholder="+1234567890"
                value={vcardPhone}
                onChange={(e) => setVcardPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-email">Email</Label>
              <Input
                id="vcard-email"
                type="email"
                placeholder="email@example.com"
                value={vcardEmail}
                onChange={(e) => setVcardEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-org">Organization (Optional)</Label>
              <Input
                id="vcard-org"
                placeholder="Company Name"
                value={vcardOrg}
                onChange={(e) => setVcardOrg(e.target.value)}
              />
            </div>
          </>
        )
      case "upi":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input id="upi-id" placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-name">Payee Name</Label>
              <Input
                id="upi-name"
                placeholder="Your Name"
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-amount">Amount (Optional)</Label>
              <Input
                id="upi-amount"
                type="number"
                placeholder="100"
                value={upiAmount}
                onChange={(e) => setUpiAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-note">Note (Optional)</Label>
              <Input
                id="upi-note"
                placeholder="Payment for..."
                value={upiNote}
                onChange={(e) => setUpiNote(e.target.value)}
              />
            </div>
          </>
        )
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor="plain-text">Text Content</Label>
            <Textarea
              id="plain-text"
              placeholder="Enter any text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              rows={4}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/tools">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Premium QR Code Generator</h1>
          <p className="text-lg text-muted-foreground">
            Create custom QR codes with advanced features - worth $12/month, completely free
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Settings</CardTitle>
              <CardDescription>Customize your QR code with advanced options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger id="qr-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url">Website URL</SelectItem>
                    <SelectItem value="wifi">WiFi Network</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="sms">SMS Message</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="vcard">Contact Card</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="text">Plain Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderInputFields()}

              <div className="space-y-2">
                <Label htmlFor="logo">Logo (Optional)</Label>
                {logoFile ? (
                  <div className="flex items-center gap-2">
                    <img src={logoFile || "/placeholder.svg"} alt="Logo" className="h-12 w-12 rounded object-cover" />
                    <Button variant="outline" size="sm" onClick={removeLogo}>
                      <X className="mr-2 h-4 w-4" />
                      Remove Logo
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-color">QR Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="qr-color"
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-bg-color">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="qr-bg-color"
                      type="color"
                      value={qrBgColor}
                      onChange={(e) => setQrBgColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input value={qrBgColor} onChange={(e) => setQrBgColor(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-size">Size (px)</Label>
                <Select value={qrSize} onValueChange={setQrSize}>
                  <SelectTrigger id="qr-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="200">200x200</SelectItem>
                    <SelectItem value="300">300x300</SelectItem>
                    <SelectItem value="400">400x400</SelectItem>
                    <SelectItem value="500">500x500</SelectItem>
                    <SelectItem value="1000">1000x1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview & Download</CardTitle>
              <CardDescription>Your QR code will appear here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 p-8">
                {qrData ? (
                  <div ref={canvasRef} />
                ) : (
                  <p className="text-center text-muted-foreground">Fill in the fields to generate QR code</p>
                )}
              </div>

              {qrData && (
                <>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <Button onClick={() => handleDownload("png")} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        {isMobile ? "Save" : "Download"} PNG
                      </Button>
                      <Button onClick={() => handleDownload("svg")} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        {isMobile ? "Save" : "Download"} SVG
                      </Button>
                    </div>

                    {isMobile && (
                      <Button onClick={handleShare} variant="secondary" className="w-full">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share QR Code
                      </Button>
                    )}

                    {isMobile && (
                      <p className="text-xs text-center text-muted-foreground">
                        Tap "Save" to view image, then long-press to save to your device
                      </p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />

      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-lg w-full bg-background rounded-lg p-6">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => setShowImageModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Your QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Long-press the image below to save it to your device
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src={qrImageUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="max-w-full h-auto rounded-lg border-2 border-border"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = qrImageUrl
                    a.download = "qr-code.png"
                    a.click()
                  }}
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={() => setShowImageModal(false)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
