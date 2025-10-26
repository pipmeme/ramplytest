"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Download } from "lucide-react"
import jsPDF from "jspdf"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface LineItem {
  description: string
  quantity: number
  price: number
}

export default function InvoiceGeneratorPage() {
  const [businessName, setBusinessName] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessPhone, setBusinessPhone] = useState("")

  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientAddress, setClientAddress] = useState("")

  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState("")

  const [lineItems, setLineItems] = useState<LineItem[]>([{ description: "", quantity: 1, price: 0 }])

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, price: 0 }])
  }

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index))
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lineItems]
    updated[index] = { ...updated[index], [field]: value }
    setLineItems(updated)
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const generatePDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(24)
    doc.setTextColor(20, 184, 166)
    doc.text("INVOICE", 20, 20)

    // Business Info
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(businessName || "Your Business", 20, 35)
    doc.text(businessAddress || "Business Address", 20, 40)
    doc.text(businessEmail || "email@business.com", 20, 45)
    doc.text(businessPhone || "Phone Number", 20, 50)

    // Invoice Details
    doc.text(`Invoice #: ${invoiceNumber || "INV-001"}`, 140, 35)
    doc.text(`Date: ${invoiceDate}`, 140, 40)
    doc.text(`Due Date: ${dueDate || "N/A"}`, 140, 45)

    // Client Info
    doc.setFontSize(12)
    doc.text("Bill To:", 20, 65)
    doc.setFontSize(10)
    doc.text(clientName || "Client Name", 20, 72)
    doc.text(clientEmail || "client@email.com", 20, 77)
    doc.text(clientAddress || "Client Address", 20, 82)

    // Line Items Table
    let yPos = 100
    doc.setFontSize(10)
    doc.setFont(undefined, "bold")
    doc.text("Description", 20, yPos)
    doc.text("Qty", 120, yPos)
    doc.text("Price", 145, yPos)
    doc.text("Amount", 170, yPos)

    doc.setFont(undefined, "normal")
    yPos += 7

    lineItems.forEach((item) => {
      if (item.description) {
        const amount = item.quantity * item.price
        doc.text(item.description.substring(0, 40), 20, yPos)
        doc.text(item.quantity.toString(), 120, yPos)
        doc.text(`$${item.price.toFixed(2)}`, 145, yPos)
        doc.text(`$${amount.toFixed(2)}`, 170, yPos)
        yPos += 7
      }
    })

    // Totals
    yPos += 10
    doc.text("Subtotal:", 140, yPos)
    doc.text(`$${subtotal.toFixed(2)}`, 170, yPos)

    yPos += 7
    doc.text(`Tax (${taxRate}%):`, 140, yPos)
    doc.text(`$${tax.toFixed(2)}`, 170, yPos)

    yPos += 7
    doc.setFont(undefined, "bold")
    doc.setFontSize(12)
    doc.text("Total:", 140, yPos)
    doc.text(`$${total.toFixed(2)}`, 170, yPos)

    // Notes
    if (notes) {
      yPos += 15
      doc.setFont(undefined, "normal")
      doc.setFontSize(10)
      doc.text("Notes:", 20, yPos)
      yPos += 7
      const splitNotes = doc.splitTextToSize(notes, 170)
      doc.text(splitNotes, 20, yPos)
    }

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text("Thank you for your business!", 105, 280, { align: "center" })

    // Mobile-friendly download
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      const pdfBlob = doc.output("blob")
      const blobUrl = URL.createObjectURL(pdfBlob)

      // Create download link
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `invoice-${invoiceNumber || "001"}.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)

      // Show helpful message
      setTimeout(() => {
        alert("Your invoice is ready! Check your Downloads folder or browser downloads.")
      }, 500)
    } else {
      doc.save(`invoice-${invoiceNumber || "001"}.pdf`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-12">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">Invoice Generator</h1>
            <p className="text-lg text-muted-foreground">Create professional invoices in minutes</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Business Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Business Information</CardTitle>
                  <CardDescription>This will appear on the invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessAddress">Address</Label>
                    <Input
                      id="businessAddress"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="123 Business St, City, Country"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="businessEmail">Email</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        placeholder="email@business.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessPhone">Phone</Label>
                      <Input
                        id="businessPhone"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                  <CardDescription>Who are you invoicing?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientAddress">Client Address</Label>
                    <Input
                      id="clientAddress"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Client Address"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input
                        id="invoiceNumber"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        placeholder="INV-001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="invoiceDate">Invoice Date</Label>
                      <Input
                        id="invoiceDate"
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Line Items & Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Line Items</CardTitle>
                  <CardDescription>Add products or services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lineItems.map((item, index) => (
                    <div key={index} className="space-y-2 rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <Label>Item {index + 1}</Label>
                        {lineItems.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineItem(index)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        value={item.description}
                        onChange={(e) => updateLineItem(index, "description", e.target.value)}
                        placeholder="Description"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, "quantity", Number(e.target.value))}
                          placeholder="Qty"
                        />
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateLineItem(index, "price", Number(e.target.value))}
                          placeholder="Price"
                        />
                      </div>
                      <div className="text-right text-sm font-medium">
                        Amount: ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <Button onClick={addLineItem} variant="outline" className="w-full bg-transparent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Line Item
                  </Button>
                </CardContent>
              </Card>

              {/* Totals */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax ({taxRate}%):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Payment terms, thank you message, etc."
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button onClick={generatePDF} size="lg" className="w-full">
                <Download className="mr-2 h-5 w-5" />
                Download Invoice PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
