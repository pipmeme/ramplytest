"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Download, Plus, Trash2, TrendingUp, DollarSign, Percent, Target, AlertCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import jsPDF from "jspdf"

interface Product {
  id: string
  name: string
  cost: number
  price: number
  overhead: number
  quantity: number
}

interface Calculations {
  grossProfit: number
  netProfit: number
  profitMargin: number
  markup: number
  roi: number
  breakEvenUnits: number
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
]

const industryBenchmarks: Record<string, { margin: number; markup: number }> = {
  retail: { margin: 50, markup: 100 },
  restaurant: { margin: 65, markup: 186 },
  cafe: { margin: 70, markup: 233 },
  ecommerce: { margin: 40, markup: 67 },
  services: { margin: 75, markup: 300 },
  manufacturing: { margin: 35, markup: 54 },
  wholesale: { margin: 25, markup: 33 },
}

export default function ProfitMarginCalculator() {
  const [currency, setCurrency] = useState("USD")
  const [businessType, setBusinessType] = useState("retail")
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "", cost: 0, price: 0, overhead: 0, quantity: 1 },
  ])
  const [targetMargin, setTargetMargin] = useState(50)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)

  const currencySymbol = currencies.find((c) => c.code === currency)?.symbol || "$"

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: "", cost: 0, price: 0, overhead: 0, quantity: 1 }])
  }

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const calculateMetrics = (product: Product): Calculations => {
    const totalCost = product.cost + product.overhead
    const grossProfit = product.price - product.cost
    const netProfit = product.price - totalCost
    const profitMargin = product.price > 0 ? (netProfit / product.price) * 100 : 0
    const markup = totalCost > 0 ? ((product.price - totalCost) / totalCost) * 100 : 0
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0
    const breakEvenUnits = netProfit > 0 ? Math.ceil(totalCost / netProfit) : 0

    return {
      grossProfit,
      netProfit,
      profitMargin,
      markup,
      roi,
      breakEvenUnits,
    }
  }

  const calculateRecommendedPrice = (cost: number, overhead: number, margin: number) => {
    const totalCost = cost + overhead
    return totalCost / (1 - margin / 100)
  }

  const handleCalculate = () => {
    const hasValidData = products.some((p) => p.name && p.cost > 0 && p.price > 0)
    if (!hasValidData) {
      alert("Please add at least one product with valid data")
      return
    }
    setShowEmailForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send to Web3Forms
    try {
      const productsData = products.map((p) => {
        const metrics = calculateMetrics(p)
        return {
          name: p.name,
          cost: p.cost,
          price: p.price,
          overhead: p.overhead,
          quantity: p.quantity,
          profitMargin: metrics.profitMargin.toFixed(2),
          markup: metrics.markup.toFixed(2),
          netProfit: metrics.netProfit.toFixed(2),
        }
      })

      const formData = {
        access_key: "7b634759-7ef8-4c15-a512-b0e7945c56ee",
        subject: "New Profit Margin Calculator Submission",
        from_name: "Ramply Work - Profit Margin Calculator",
        business_name: businessName,
        email: email,
        currency: currency,
        business_type: businessType,
        products: JSON.stringify(productsData, null, 2),
        total_products: products.length,
        timestamp: new Date().toLocaleString(),
      }

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    }

    setShowResults(true)
    setShowEmailForm(false)
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let yPos = 20

    // Header
    doc.setFillColor(249, 115, 22)
    doc.rect(0, 0, pageWidth, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("Profit Margin Analysis Report", pageWidth / 2, 25, { align: "center" })

    yPos = 50

    // Business Info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Business: ${businessName}`, 20, yPos)
    yPos += 7
    doc.text(`Industry: ${businessType.charAt(0).toUpperCase() + businessType.slice(1)}`, 20, yPos)
    yPos += 7
    doc.text(`Currency: ${currency}`, 20, yPos)
    yPos += 7
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos)
    yPos += 15

    // Products Analysis
    products.forEach((product, index) => {
      if (!product.name) return

      const metrics = calculateMetrics(product)
      const benchmark = industryBenchmarks[businessType]

      // Product Header
      doc.setFillColor(249, 115, 22)
      doc.rect(15, yPos - 5, pageWidth - 30, 10, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${product.name}`, 20, yPos)
      yPos += 15

      doc.setTextColor(0, 0, 0)
      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")

      // Cost Breakdown
      doc.setFont("helvetica", "bold")
      doc.text("Cost Breakdown:", 20, yPos)
      yPos += 7
      doc.setFont("helvetica", "normal")
      doc.text(`Product Cost: ${currencySymbol}${product.cost.toFixed(2)}`, 25, yPos)
      yPos += 6
      doc.text(`Overhead: ${currencySymbol}${product.overhead.toFixed(2)}`, 25, yPos)
      yPos += 6
      doc.text(`Total Cost: ${currencySymbol}${(product.cost + product.overhead).toFixed(2)}`, 25, yPos)
      yPos += 6
      doc.text(`Selling Price: ${currencySymbol}${product.price.toFixed(2)}`, 25, yPos)
      yPos += 10

      // Metrics
      doc.setFont("helvetica", "bold")
      doc.text("Profitability Metrics:", 20, yPos)
      yPos += 7
      doc.setFont("helvetica", "normal")
      doc.text(`Net Profit: ${currencySymbol}${metrics.netProfit.toFixed(2)}`, 25, yPos)
      yPos += 6
      doc.text(`Profit Margin: ${metrics.profitMargin.toFixed(2)}%`, 25, yPos)
      yPos += 6
      doc.text(`Markup: ${metrics.markup.toFixed(2)}%`, 25, yPos)
      yPos += 6
      doc.text(`ROI: ${metrics.roi.toFixed(2)}%`, 25, yPos)
      yPos += 10

      // Industry Comparison
      doc.setFont("helvetica", "bold")
      doc.text("Industry Comparison:", 20, yPos)
      yPos += 7
      doc.setFont("helvetica", "normal")
      doc.text(`Your Margin: ${metrics.profitMargin.toFixed(2)}%`, 25, yPos)
      yPos += 6
      doc.text(`Industry Average: ${benchmark.margin}%`, 25, yPos)
      yPos += 6
      const marginDiff = metrics.profitMargin - benchmark.margin
      doc.setTextColor(marginDiff >= 0 ? 0 : 255, marginDiff >= 0 ? 128 : 0, 0)
      doc.text(`Difference: ${marginDiff >= 0 ? "+" : ""}${marginDiff.toFixed(2)}%`, 25, yPos)
      doc.setTextColor(0, 0, 0)
      yPos += 15

      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
    })

    // Recommendations
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }

    doc.setFillColor(249, 115, 22)
    doc.rect(15, yPos - 5, pageWidth - 30, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Recommendations", 20, yPos)
    yPos += 15

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const recommendations = [
      "Review products with margins below industry average",
      "Consider price increases for high-value products",
      "Reduce overhead costs where possible",
      "Focus on high-margin products for growth",
      "Implement volume discounts strategically",
    ]

    recommendations.forEach((rec, index) => {
      doc.text(`${index + 1}. ${rec}`, 20, yPos)
      yPos += 7
    })

    // Footer
    yPos = doc.internal.pageSize.getHeight() - 20
    doc.setFontSize(9)
    doc.setTextColor(128, 128, 128)
    doc.text("Generated by Ramply Work - Profit Margin Calculator", pageWidth / 2, yPos, {
      align: "center",
    })

    // Save with mobile-friendly approach
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      const blob = doc.output("blob")
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "profit-margin-analysis.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      alert("PDF download started! Check your downloads folder.")
    } else {
      doc.save("profit-margin-analysis.pdf")
    }
  }

  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const totalProfit = products.reduce((sum, p) => {
    const metrics = calculateMetrics(p)
    return sum + metrics.netProfit * p.quantity
  }, 0)
  const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  const chartData = products
    .filter((p) => p.name)
    .map((p) => {
      const metrics = calculateMetrics(p)
      return {
        name: p.name,
        margin: metrics.profitMargin,
        markup: metrics.markup,
        profit: metrics.netProfit,
      }
    })

  const pieData = products
    .filter((p) => p.name && p.quantity > 0)
    .map((p) => {
      const metrics = calculateMetrics(p)
      return {
        name: p.name,
        value: metrics.netProfit * p.quantity,
      }
    })

  const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b"]

  if (showEmailForm) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Get Your Profit Analysis</CardTitle>
            <CardDescription>
              Enter your details to see your complete profit margin analysis and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setShowEmailForm(false)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  View Analysis
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Profit Margin Calculator</h1>
        <p className="text-lg text-muted-foreground">
          Calculate profit margins, optimize pricing, and maximize profitability
        </p>
      </div>

      {/* Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Business Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Industry Type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="cafe">Cafe</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="wholesale">Wholesale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculator" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="reverse">Pricing Tool</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!showResults}>
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="space-y-4">
            {products.map((product, index) => {
              const metrics = calculateMetrics(product)
              const benchmark = industryBenchmarks[businessType]

              return (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Product {index + 1}</CardTitle>
                      {products.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <Label>Product Name</Label>
                        <Input
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                          placeholder="e.g., Coffee"
                        />
                      </div>
                      <div>
                        <Label>Cost ({currencySymbol})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={product.cost || ""}
                          onChange={(e) => updateProduct(product.id, "cost", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Selling Price ({currencySymbol})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={product.price || ""}
                          onChange={(e) => updateProduct(product.id, "price", Number.parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Overhead per Unit ({currencySymbol})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={product.overhead || ""}
                          onChange={(e) =>
                            updateProduct(product.id, "overhead", Number.parseFloat(e.target.value) || 0)
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={product.quantity || ""}
                          onChange={(e) => updateProduct(product.id, "quantity", Number.parseInt(e.target.value) || 1)}
                          placeholder="1"
                        />
                      </div>
                    </div>

                    {product.name && product.cost > 0 && product.price > 0 && (
                      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg border-2 border-green-500 bg-green-500/10 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Percent className="h-4 w-4" />
                            Profit Margin
                          </div>
                          <div className="mt-2 text-2xl font-bold text-green-600">
                            {metrics.profitMargin.toFixed(2)}%
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">Industry avg: {benchmark.margin}%</div>
                        </div>
                        <div className="rounded-lg border-2 border-blue-500 bg-blue-500/10 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            Markup
                          </div>
                          <div className="mt-2 text-2xl font-bold text-blue-600">{metrics.markup.toFixed(2)}%</div>
                          <div className="mt-1 text-xs text-muted-foreground">Industry avg: {benchmark.markup}%</div>
                        </div>
                        <div className="rounded-lg border-2 border-orange-500 bg-orange-500/10 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            Net Profit
                          </div>
                          <div className="mt-2 text-2xl font-bold text-orange-600">
                            {currencySymbol}
                            {metrics.netProfit.toFixed(2)}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">Per unit sold</div>
                        </div>
                        <div className="rounded-lg border-2 border-purple-500 bg-purple-500/10 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="h-4 w-4" />
                            ROI
                          </div>
                          <div className="mt-2 text-2xl font-bold text-purple-600">{metrics.roi.toFixed(2)}%</div>
                          <div className="mt-1 text-xs text-muted-foreground">Return on investment</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}

            <Button onClick={addProduct} variant="outline" className="w-full bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Product
            </Button>

            <Button onClick={handleCalculate} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Full Analysis
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reverse">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Optimization Tool</CardTitle>
              <CardDescription>Calculate the optimal price based on your target profit margin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Product Cost ({currencySymbol})</Label>
                    <Input type="number" step="0.01" placeholder="0.00" id="reverseCost" />
                  </div>
                  <div>
                    <Label>Overhead ({currencySymbol})</Label>
                    <Input type="number" step="0.01" placeholder="0.00" id="reverseOverhead" />
                  </div>
                  <div>
                    <Label>Target Margin (%)</Label>
                    <Input
                      type="number"
                      value={targetMargin}
                      onChange={(e) => setTargetMargin(Number.parseFloat(e.target.value) || 0)}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="rounded-lg border-2 border-orange-500 bg-orange-500/10 p-6">
                  <div className="text-sm text-muted-foreground">Recommended Selling Price</div>
                  <div className="mt-2 text-4xl font-bold text-orange-600">
                    {currencySymbol}
                    {(() => {
                      const costInput = document.getElementById("reverseCost") as HTMLInputElement
                      const overheadInput = document.getElementById("reverseOverhead") as HTMLInputElement
                      const cost = Number.parseFloat(costInput?.value || "0")
                      const overhead = Number.parseFloat(overheadInput?.value || "0")
                      return calculateRecommendedPrice(cost, overhead, targetMargin).toFixed(2)
                    })()}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">To achieve {targetMargin}% profit margin</div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-orange-500" />
                    <div className="text-sm">
                      <p className="font-semibold">Pricing Tips:</p>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                        <li>Consider competitor pricing in your market</li>
                        <li>Test price sensitivity with small increases</li>
                        <li>Higher margins allow for promotions and discounts</li>
                        <li>Premium positioning can justify higher prices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          {showResults && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {currencySymbol}
                      {totalRevenue.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Profit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {currencySymbol}
                      {totalProfit.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Overall Margin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{overallMargin.toFixed(2)}%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Profit Margin Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="margin" fill="#f97316" name="Profit Margin %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profit Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => entry.name}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product, index) => {
                      if (!product.name) return null
                      const metrics = calculateMetrics(product)
                      const benchmark = industryBenchmarks[businessType]
                      const recommendations = []

                      if (metrics.profitMargin < benchmark.margin) {
                        recommendations.push(`Consider increasing the price of ${product.name} to improve margin`)
                      }
                      if (metrics.profitMargin > benchmark.margin + 10) {
                        recommendations.push(
                          `${product.name} has excellent margins - consider volume growth strategies`,
                        )
                      }
                      if (product.overhead > product.cost) {
                        recommendations.push(`Review overhead costs for ${product.name} - they exceed product cost`)
                      }

                      return recommendations.map((rec, i) => (
                        <div key={`${index}-${i}`} className="flex items-start gap-3 rounded-lg border p-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))
                    })}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={generatePDF} className="w-full" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download Full Report (PDF)
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
