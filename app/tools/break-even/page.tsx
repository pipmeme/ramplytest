"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  Download,
  ArrowLeft,
  Info,
  Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import jsPDF from "jspdf"

const CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  GBP: { symbol: "£", name: "British Pound" },
  INR: { symbol: "₹", name: "Indian Rupee" },
  AUD: { symbol: "A$", name: "Australian Dollar" },
  CAD: { symbol: "C$", name: "Canadian Dollar" },
  JPY: { symbol: "¥", name: "Japanese Yen" },
  CNY: { symbol: "¥", name: "Chinese Yuan" },
}

export default function BreakEvenCalculator() {
  const [step, setStep] = useState<"input" | "results">("input")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("USD")

  // Input values
  const [fixedCosts, setFixedCosts] = useState("5000")
  const [variableCost, setVariableCost] = useState("3")
  const [sellingPrice, setSellingPrice] = useState("10")
  const [currentSales, setCurrentSales] = useState("400")
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [businessType, setBusinessType] = useState("retail")

  // Scenario sliders
  const [priceAdjustment, setPriceAdjustment] = useState(0)
  const [costReduction, setCostReduction] = useState(0)
  const [variableCostReduction, setVariableCostReduction] = useState(0)

  const formatCurrency = (amount: number) => {
    const symbol = CURRENCIES[currency].symbol
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
  }

  const calculateMetrics = () => {
    const fixed = Number.parseFloat(fixedCosts) || 0
    const variable = Number.parseFloat(variableCost) || 0
    const price = Number.parseFloat(sellingPrice) || 0
    const sales = Number.parseFloat(currentSales) || 0

    // Apply adjustments
    const adjustedPrice = price + priceAdjustment
    const adjustedFixed = fixed * (1 - costReduction / 100)
    const adjustedVariable = variable * (1 - variableCostReduction / 100)

    const contributionMargin = adjustedPrice - adjustedVariable
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(adjustedFixed / contributionMargin) : 0
    const currentProfit = sales * contributionMargin - adjustedFixed
    const unitsNeeded = breakEvenUnits - sales
    const percentageIncrease = sales > 0 ? ((unitsNeeded / sales) * 100).toFixed(1) : "0"

    const contributionMarginPercent = price > 0 ? ((contributionMargin / adjustedPrice) * 100).toFixed(1) : "0"

    return {
      breakEvenUnits,
      currentProfit,
      unitsNeeded,
      percentageIncrease,
      contributionMargin,
      adjustedPrice,
      adjustedFixed,
      adjustedVariable,
      contributionMarginPercent,
    }
  }

  const generateCashFlowData = () => {
    const fixed = Number.parseFloat(fixedCosts) || 0
    const variable = Number.parseFloat(variableCost) || 0
    const price = Number.parseFloat(sellingPrice) || 0
    const sales = Number.parseFloat(currentSales) || 0

    const data = []
    let cumulativeProfit = 0

    for (let month = 1; month <= 12; month++) {
      // Assume 5% monthly growth in sales
      const projectedSales = Math.round(sales * Math.pow(1.05, month - 1))
      const revenue = projectedSales * price
      const totalCost = fixed + projectedSales * variable
      const monthlyProfit = revenue - totalCost
      cumulativeProfit += monthlyProfit

      data.push({
        month: `Month ${month}`,
        revenue,
        cost: totalCost,
        profit: monthlyProfit,
        cumulative: cumulativeProfit,
        sales: projectedSales,
      })
    }

    return data
  }

  const generateChartData = () => {
    const fixed = Number.parseFloat(fixedCosts) || 0
    const variable = Number.parseFloat(variableCost) || 0
    const price = Number.parseFloat(sellingPrice) || 0
    const sales = Number.parseFloat(currentSales) || 0

    const data = []
    const maxUnits = Math.max(sales * 2, 1000)
    const step = Math.ceil(maxUnits / 20)

    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * price
      const totalCost = fixed + units * variable
      const profit = revenue - totalCost

      data.push({
        units,
        revenue,
        cost: totalCost,
        profit,
      })
    }

    return data
  }

  const generateScenarioComparison = () => {
    const fixed = Number.parseFloat(fixedCosts) || 0
    const variable = Number.parseFloat(variableCost) || 0
    const price = Number.parseFloat(sellingPrice) || 0

    const scenarios = [
      {
        name: "Current",
        price: price,
        fixedCost: fixed,
        variableCost: variable,
      },
      {
        name: "Price +10%",
        price: price * 1.1,
        fixedCost: fixed,
        variableCost: variable,
      },
      {
        name: "Cost -10%",
        price: price,
        fixedCost: fixed * 0.9,
        variableCost: variable * 0.9,
      },
    ]

    return scenarios.map((scenario) => {
      const cm = scenario.price - scenario.variableCost
      const breakEven = cm > 0 ? Math.ceil(scenario.fixedCost / cm) : 0
      return {
        ...scenario,
        breakEven,
        contributionMargin: cm,
      }
    })
  }

  const metrics = calculateMetrics()
  const chartData = generateChartData()
  const cashFlowData = generateCashFlowData()
  const scenarioData = generateScenarioComparison()

  const handleCalculate = async () => {
    if (!businessName || !email) {
      alert("Please enter your business name and email to see results")
      return
    }

    // Send data to Web3Forms
    try {
      const formData = {
        access_key: "7b634759-7ef8-4c15-a512-b0e7945c56ee",
        subject: "Break-Even Calculator Submission",
        from_name: businessName,
        email: email,
        message: `
Break-Even Calculator Submission

Business Name: ${businessName}
Business Type: ${businessType}
Email: ${email}
Currency: ${currency} (${CURRENCIES[currency].name})

INPUT DATA:
- Monthly Fixed Costs: ${formatCurrency(Number.parseFloat(fixedCosts))}
- Variable Cost per Unit: ${formatCurrency(Number.parseFloat(variableCost))}
- Selling Price per Unit: ${formatCurrency(Number.parseFloat(sellingPrice))}
- Current Monthly Sales: ${currentSales} units

CALCULATED RESULTS:
- Break-Even Point: ${metrics.breakEvenUnits} units/month
- Current Monthly Profit/Loss: ${formatCurrency(metrics.currentProfit)}
- Units Needed to Break Even: ${metrics.unitsNeeded} units
- Required Sales Increase: ${metrics.percentageIncrease}%
- Contribution Margin: ${formatCurrency(metrics.contributionMargin)} (${metrics.contributionMarginPercent}%)

Timestamp: ${new Date().toLocaleString()}
        `,
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

    setStep("results")
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      let yPos = 20

      // Header with colored background
      pdf.setFillColor(255, 102, 0) // Orange
      pdf.rect(0, 0, pageWidth, 35, "F")

      pdf.setFontSize(28)
      pdf.setTextColor(255, 255, 255)
      pdf.text("Break-Even Analysis Report", pageWidth / 2, 20, { align: "center" })

      pdf.setFontSize(11)
      pdf.setTextColor(255, 255, 255)
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" })

      yPos = 50

      // Business Information Box
      pdf.setFillColor(245, 245, 245)
      pdf.roundedRect(15, yPos, pageWidth - 30, 35, 3, 3, "F")

      pdf.setFontSize(14)
      pdf.setTextColor(0, 0, 0)
      pdf.text("Business Information", 20, yPos + 8)

      pdf.setFontSize(10)
      pdf.setTextColor(60, 60, 60)
      pdf.text(`Business Name: ${businessName}`, 20, yPos + 16)
      pdf.text(`Business Type: ${businessType.charAt(0).toUpperCase() + businessType.slice(1)}`, 20, yPos + 23)
      pdf.text(`Currency: ${CURRENCIES[currency].name} (${CURRENCIES[currency].symbol})`, 20, yPos + 30)

      yPos += 45

      // Key Metrics Section
      pdf.setFontSize(16)
      pdf.setTextColor(255, 102, 0)
      pdf.text("Key Metrics", 20, yPos)
      yPos += 10

      // Break-Even Point Box
      pdf.setFillColor(255, 245, 235)
      pdf.setDrawColor(255, 102, 0)
      pdf.setLineWidth(0.5)
      pdf.roundedRect(15, yPos, (pageWidth - 35) / 2, 25, 3, 3, "FD")

      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      pdf.text("Break-Even Point", 20, yPos + 8)

      pdf.setFontSize(20)
      pdf.setTextColor(255, 102, 0)
      pdf.text(`${metrics.breakEvenUnits} units/month`, 20, yPos + 18)

      // Current Status Box
      const statusColor = metrics.currentProfit >= 0 ? [34, 197, 94] : [239, 68, 68]
      pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2], 0.1)
      pdf.setDrawColor(statusColor[0], statusColor[1], statusColor[2])
      pdf.roundedRect(15 + (pageWidth - 35) / 2 + 5, yPos, (pageWidth - 35) / 2, 25, 3, 3, "FD")

      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      pdf.text(metrics.currentProfit >= 0 ? "Monthly Profit" : "Monthly Loss", 20 + (pageWidth - 35) / 2 + 5, yPos + 8)

      pdf.setFontSize(20)
      pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2])
      pdf.text(formatCurrency(Math.abs(metrics.currentProfit)), 20 + (pageWidth - 35) / 2 + 5, yPos + 18)

      yPos += 35

      // Contribution Margin Box
      pdf.setFillColor(245, 245, 255)
      pdf.setDrawColor(59, 130, 246)
      pdf.roundedRect(15, yPos, (pageWidth - 35) / 2, 25, 3, 3, "FD")

      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      pdf.text("Contribution Margin", 20, yPos + 8)

      pdf.setFontSize(16)
      pdf.setTextColor(59, 130, 246)
      pdf.text(
        `${metrics.contributionMarginPercent}% (${formatCurrency(metrics.contributionMargin)}/unit)`,
        20,
        yPos + 18,
      )

      // Units Needed Box
      pdf.setFillColor(240, 253, 244)
      pdf.setDrawColor(34, 197, 94)
      pdf.roundedRect(15 + (pageWidth - 35) / 2 + 5, yPos, (pageWidth - 35) / 2, 25, 3, 3, "FD")

      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      pdf.text("To Break Even", 20 + (pageWidth - 35) / 2 + 5, yPos + 8)

      pdf.setFontSize(16)
      pdf.setTextColor(34, 197, 94)
      if (metrics.unitsNeeded > 0) {
        pdf.text(
          `${metrics.unitsNeeded} more units (+${metrics.percentageIncrease}%)`,
          20 + (pageWidth - 35) / 2 + 5,
          yPos + 18,
        )
      } else {
        pdf.text("Already Profitable!", 20 + (pageWidth - 35) / 2 + 5, yPos + 18)
      }

      yPos += 35

      // Input Data Section
      pdf.setFontSize(16)
      pdf.setTextColor(255, 102, 0)
      pdf.text("Your Business Inputs", 20, yPos)
      yPos += 8

      pdf.setFillColor(250, 250, 250)
      pdf.roundedRect(15, yPos, pageWidth - 30, 35, 3, 3, "F")

      pdf.setFontSize(10)
      pdf.setTextColor(60, 60, 60)
      pdf.text(`Monthly Fixed Costs: ${formatCurrency(Number.parseFloat(fixedCosts))}`, 20, yPos + 8)
      pdf.text(`Variable Cost per Unit: ${formatCurrency(Number.parseFloat(variableCost))}`, 20, yPos + 15)
      pdf.text(`Selling Price per Unit: ${formatCurrency(Number.parseFloat(sellingPrice))}`, 20, yPos + 22)
      pdf.text(`Current Monthly Sales: ${currentSales} units`, 20, yPos + 29)

      yPos += 45

      // Scenario Comparison Section
      pdf.setFontSize(16)
      pdf.setTextColor(255, 102, 0)
      pdf.text("Scenario Comparison", 20, yPos)
      yPos += 10

      scenarioData.forEach((scenario, index) => {
        const boxWidth = (pageWidth - 40) / 3
        const xPos = 15 + index * (boxWidth + 5)

        pdf.setFillColor(255, 250, 245)
        pdf.setDrawColor(200, 200, 200)
        pdf.setLineWidth(0.3)
        pdf.roundedRect(xPos, yPos, boxWidth, 22, 2, 2, "FD")

        pdf.setFontSize(9)
        pdf.setTextColor(100, 100, 100)
        pdf.text(scenario.name, xPos + 5, yPos + 7)

        pdf.setFontSize(14)
        pdf.setTextColor(255, 102, 0)
        pdf.text(`${scenario.breakEven} units`, xPos + 5, yPos + 16)
      })

      yPos += 32

      // Add new page for recommendations
      pdf.addPage()
      yPos = 20

      // Recommendations Section
      pdf.setFontSize(18)
      pdf.setTextColor(255, 102, 0)
      pdf.text("Personalized Recommendations", 20, yPos)
      yPos += 12

      // Industry Benchmark
      pdf.setFillColor(240, 249, 255)
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(0.5)
      pdf.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, "FD")

      pdf.setFontSize(11)
      pdf.setTextColor(59, 130, 246)
      pdf.text("Industry Benchmark", 20, yPos + 8)

      pdf.setFontSize(9)
      pdf.setTextColor(60, 60, 60)
      const benchmarkText = `Your contribution margin of ${metrics.contributionMarginPercent}% is ${
        Number.parseFloat(metrics.contributionMarginPercent) >= 40 ? "healthy and above" : "below"
      } the typical ${businessType} industry range of 40-60%.`
      const benchmarkLines = pdf.splitTextToSize(benchmarkText, pageWidth - 50)
      pdf.text(benchmarkLines, 20, yPos + 16)

      yPos += 35

      // Action Items
      const recommendations = []

      if (metrics.currentProfit < 0) {
        recommendations.push({
          title: "Increase Sales Volume",
          text: `You need ${metrics.unitsNeeded} more units (${metrics.percentageIncrease}% increase) to reach break-even. Focus on marketing and customer acquisition strategies.`,
        })
        recommendations.push({
          title: "Reduce Fixed Costs",
          text: `Reducing fixed costs by 10% would lower your break-even point to ${Math.ceil(
            (Number.parseFloat(fixedCosts) * 0.9) / metrics.contributionMargin,
          )} units - that's ${
            metrics.breakEvenUnits - Math.ceil((Number.parseFloat(fixedCosts) * 0.9) / metrics.contributionMargin)
          } fewer units needed.`,
        })
        recommendations.push({
          title: "Optimize Pricing Strategy",
          text: `Increasing your price by just ${formatCurrency(1)} would lower your break-even point to ${Math.ceil(
            Number.parseFloat(fixedCosts) / (metrics.contributionMargin + 1),
          )} units. Test if your market can support a small price increase.`,
        })
        recommendations.push({
          title: "Lower Variable Costs",
          text: `Negotiate with suppliers or find ways to reduce your cost per unit. Every ${formatCurrency(
            0.5,
          )} reduction in variable costs significantly improves your margins.`,
        })
      } else {
        recommendations.push({
          title: "You're Profitable!",
          text: `Great job! You're making ${formatCurrency(
            metrics.currentProfit,
          )} per month. Focus on scaling your successful business model.`,
        })
        recommendations.push({
          title: "Scale Your Success",
          text: "Consider reinvesting profits into marketing to increase sales volume and grow your business further.",
        })
        recommendations.push({
          title: "Monitor Your Margins",
          text: "Keep a close eye on your costs to maintain healthy profit margins as you grow.",
        })
        recommendations.push({
          title: "Automate and Optimize",
          text: "Look for opportunities to automate processes and improve efficiency to increase profitability.",
        })
      }

      recommendations.forEach((rec, index) => {
        if (yPos > 250) {
          pdf.addPage()
          yPos = 20
        }

        // Number circle
        pdf.setFillColor(255, 102, 0)
        pdf.circle(20, yPos + 3, 4, "F")
        pdf.setFontSize(10)
        pdf.setTextColor(255, 255, 255)
        pdf.text(`${index + 1}`, 20, yPos + 5, { align: "center" })

        // Recommendation box
        pdf.setFillColor(252, 252, 252)
        pdf.roundedRect(27, yPos - 2, pageWidth - 42, 20, 2, 2, "F")

        pdf.setFontSize(11)
        pdf.setTextColor(0, 0, 0)
        pdf.text(rec.title, 30, yPos + 4)

        pdf.setFontSize(9)
        pdf.setTextColor(80, 80, 80)
        const lines = pdf.splitTextToSize(rec.text, pageWidth - 50)
        pdf.text(lines, 30, yPos + 10)

        yPos += 28
      })

      // Footer
      yPos = pageHeight - 20
      pdf.setDrawColor(255, 102, 0)
      pdf.setLineWidth(0.5)
      pdf.line(20, yPos, pageWidth - 20, yPos)

      pdf.setFontSize(9)
      pdf.setTextColor(150, 150, 150)
      pdf.text("Generated by Ramply Work - Business Growth Tools", pageWidth / 2, yPos + 7, { align: "center" })
      pdf.text("Visit ramplywork.com for more free business tools", pageWidth / 2, yPos + 12, { align: "center" })

      // Save PDF
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      if (isMobile) {
        const pdfBlob = pdf.output("blob")
        const blobUrl = URL.createObjectURL(pdfBlob)

        // Create download link
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = `break-even-analysis-${businessName.replace(/\s+/g, "-").toLowerCase()}.pdf`
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Show helpful message
        setTimeout(() => {
          alert(
            "Your report is ready! Check your Downloads folder or browser downloads. If you don't see it, please allow downloads in your browser settings.",
          )
        }, 500)
      } else {
        pdf.save(`break-even-analysis-${businessName.replace(/\s+/g, "-").toLowerCase()}.pdf`)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (step === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header />
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/tools">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tools
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Currency: {CURRENCIES[currency].name} ({CURRENCIES[currency].symbol})
              </div>
            </div>

            <div className="mx-auto max-w-6xl space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-foreground">Your Break-Even Analysis</h1>
                <p className="text-lg text-muted-foreground">
                  Complete path to profitability with 12-month projections
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid gap-6 md:grid-cols-4">
                <Card className="border-2 border-orange-500/20 bg-orange-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Target className="h-5 w-5" />
                      Break-Even
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{metrics.breakEvenUnits}</p>
                    <p className="text-sm text-muted-foreground">units/month</p>
                  </CardContent>
                </Card>

                <Card
                  className={`border-2 ${
                    metrics.currentProfit >= 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={`flex items-center gap-2 ${
                        metrics.currentProfit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <DollarSign className="h-5 w-5" />
                      Current Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={`text-3xl font-bold ${metrics.currentProfit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(Math.abs(metrics.currentProfit))}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metrics.currentProfit >= 0 ? "Monthly Profit" : "Monthly Loss"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="h-5 w-5" />
                      To Break Even
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {metrics.unitsNeeded > 0 ? (
                      <>
                        <p className="text-3xl font-bold text-foreground">{metrics.unitsNeeded}</p>
                        <p className="text-sm text-muted-foreground">more units (+{metrics.percentageIncrease}%)</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-green-600">Profitable!</p>
                        <p className="text-sm text-muted-foreground">Keep growing</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <BarChart3 className="h-5 w-5" />
                      Margin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground">{metrics.contributionMarginPercent}%</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(metrics.contributionMargin)}/unit</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    12-Month Cash Flow Projection
                  </CardTitle>
                  <CardDescription>
                    Projected revenue, costs, and cumulative profit (assuming 5% monthly growth)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => label}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                          name="Revenue"
                        />
                        <Area
                          type="monotone"
                          dataKey="cost"
                          stackId="2"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.6}
                          name="Costs"
                        />
                        <Line
                          type="monotone"
                          dataKey="cumulative"
                          stroke="#ff6600"
                          strokeWidth={3}
                          name="Cumulative Profit"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scenario Comparison</CardTitle>
                  <CardDescription>Compare break-even points under different scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scenarioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: "Units to Break Even", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Bar dataKey="breakEven" fill="#ff6600" name="Break-Even Units" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {scenarioData.map((scenario, index) => (
                      <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                        <p className="font-medium text-foreground">{scenario.name}</p>
                        <p className="text-2xl font-bold text-orange-600">{scenario.breakEven} units</p>
                        <p className="text-sm text-muted-foreground">
                          Margin: {formatCurrency(scenario.contributionMargin)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Path to Profitability</CardTitle>
                  <CardDescription>Revenue, costs, and profit at different sales volumes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="units" label={{ value: "Units Sold", position: "insideBottom", offset: -5 }} />
                        <YAxis
                          label={{
                            value: `Amount (${CURRENCIES[currency].symbol})`,
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => `${label} units`}
                        />
                        <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                        <ReferenceLine
                          x={metrics.breakEvenUnits}
                          stroke="#ff6600"
                          strokeDasharray="3 3"
                          label="Break-Even"
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                        <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Total Cost" />
                        <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle>What-If Scenarios</CardTitle>
                  <CardDescription>
                    Adjust these sliders to see how changes affect your break-even point
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Adjust Selling Price</Label>
                      <span className="text-sm font-medium">
                        {formatCurrency(Number.parseFloat(sellingPrice) + priceAdjustment)} (
                        {priceAdjustment >= 0 ? "+" : ""}
                        {formatCurrency(priceAdjustment)})
                      </span>
                    </div>
                    <Slider
                      value={[priceAdjustment]}
                      onValueChange={(value) => setPriceAdjustment(value[0])}
                      min={-5}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Reduce Fixed Costs</Label>
                      <span className="text-sm font-medium">
                        {formatCurrency(Number.parseFloat(fixedCosts) * (1 - costReduction / 100))} (-{costReduction}
                        %)
                      </span>
                    </div>
                    <Slider
                      value={[costReduction]}
                      onValueChange={(value) => setCostReduction(value[0])}
                      min={0}
                      max={30}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Reduce Variable Cost per Unit</Label>
                      <span className="text-sm font-medium">
                        {formatCurrency(Number.parseFloat(variableCost) * (1 - variableCostReduction / 100))} (-
                        {variableCostReduction}%)
                      </span>
                    </div>
                    <Slider
                      value={[variableCostReduction]}
                      onValueChange={(value) => setVariableCostReduction(value[0])}
                      min={0}
                      max={30}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <Card className="border-orange-500/20 bg-orange-500/5">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Adjusted Break-Even Point</p>
                          <p className="text-2xl font-bold text-orange-600">{metrics.breakEvenUnits} units/month</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            With these adjustments, you would need {metrics.breakEvenUnits} units to break even
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>Based on your {businessType} business metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="border-blue-500/20 bg-blue-500/5">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground mb-2">Industry Benchmark</p>
                          <p className="text-muted-foreground">
                            Your contribution margin of {metrics.contributionMarginPercent}% is{" "}
                            {Number.parseFloat(metrics.contributionMarginPercent) >= 40 ? "healthy and above" : "below"}{" "}
                            the typical {businessType} industry range of 40-60%.
                            {Number.parseFloat(metrics.contributionMarginPercent) < 40 &&
                              " Consider ways to increase prices or reduce variable costs."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {metrics.currentProfit < 0 ? (
                    <>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Increase Sales Volume</p>
                          <p className="text-sm text-muted-foreground">
                            You need {metrics.unitsNeeded} more units ({metrics.percentageIncrease}% increase) to reach
                            break-even. Focus on marketing and customer acquisition.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Reduce Fixed Costs</p>
                          <p className="text-sm text-muted-foreground">
                            Reducing fixed costs by 10% would lower your break-even point to{" "}
                            {Math.ceil((Number.parseFloat(fixedCosts) * 0.9) / metrics.contributionMargin)} units -
                            that's{" "}
                            {metrics.breakEvenUnits -
                              Math.ceil((Number.parseFloat(fixedCosts) * 0.9) / metrics.contributionMargin)}{" "}
                            fewer units needed.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Optimize Pricing</p>
                          <p className="text-sm text-muted-foreground">
                            Increasing your price by just {formatCurrency(1)} would lower your break-even point to{" "}
                            {Math.ceil(Number.parseFloat(fixedCosts) / (metrics.contributionMargin + 1))} units. Test if
                            your market can support a small price increase.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Lower Variable Costs</p>
                          <p className="text-sm text-muted-foreground">
                            Negotiate with suppliers or find ways to reduce your cost per unit. Every{" "}
                            {formatCurrency(0.5)} reduction in variable costs significantly improves your margins.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="font-medium text-foreground">You're Profitable!</p>
                          <p className="text-sm text-muted-foreground">
                            Great job! You're making {formatCurrency(metrics.currentProfit)} per month. Focus on scaling
                            your successful business model.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Scale Your Success</p>
                          <p className="text-sm text-muted-foreground">
                            Consider reinvesting profits into marketing to increase sales volume and grow your business
                            further.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Monitor Your Margins</p>
                          <p className="text-sm text-muted-foreground">
                            Keep a close eye on your costs to maintain healthy profit margins as you grow.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Automate and Optimize</p>
                          <p className="text-sm text-muted-foreground">
                            Look for opportunities to automate processes and improve efficiency to increase
                            profitability.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <Button variant="outline" onClick={() => setStep("input")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Recalculate
                </Button>
                <Button onClick={generatePDF} disabled={isGeneratingPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  {isGeneratingPDF ? "Generating PDF..." : "Download Full Report"}
                </Button>
              </div>

              {/* CTA */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-bold text-foreground">Want Help Reaching Your Goals?</h3>
                    <p className="mb-4 text-muted-foreground">
                      Our tools show you the numbers. Our services help you achieve them. Let's grow your business
                      together.
                    </p>
                    <Link href="/contact">
                      <Button size="lg">
                        Get Started
                        <TrendingUp className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/tools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex rounded-full bg-orange-500/10 p-3">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h1 className="mb-4 text-4xl font-bold text-foreground">Break-Even Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Discover when your business will be profitable with 12-month projections and scenario analysis
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Enter Your Business Details</CardTitle>
                <CardDescription>
                  Provide your basic business metrics to calculate your break-even point
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={(value) => setCurrency(value as keyof typeof CURRENCIES)}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
                        <SelectItem key={code} value={code}>
                          {symbol} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Info */}
                <div className="space-y-4 rounded-lg border border-border bg-muted/30 p-4">
                  <h3 className="font-medium text-foreground">Your Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="e.g., Joe's Coffee Shop"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger id="businessType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail Store</SelectItem>
                        <SelectItem value="cafe">Cafe/Restaurant</SelectItem>
                        <SelectItem value="service">Service Business</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fixed Costs */}
                <div className="space-y-2">
                  <Label htmlFor="fixedCosts" className="flex items-center gap-2">
                    Monthly Fixed Costs
                    <span className="text-xs text-muted-foreground">(rent, salaries, insurance, etc.)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {CURRENCIES[currency].symbol}
                    </span>
                    <Input
                      id="fixedCosts"
                      type="number"
                      placeholder="5000"
                      value={fixedCosts}
                      onChange={(e) => setFixedCosts(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                {/* Variable Cost */}
                <div className="space-y-2">
                  <Label htmlFor="variableCost" className="flex items-center gap-2">
                    Variable Cost per Unit
                    <span className="text-xs text-muted-foreground">(materials, product cost, etc.)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {CURRENCIES[currency].symbol}
                    </span>
                    <Input
                      id="variableCost"
                      type="number"
                      placeholder="3"
                      value={variableCost}
                      onChange={(e) => setVariableCost(e.target.value)}
                      className="pl-7"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Selling Price */}
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice" className="flex items-center gap-2">
                    Selling Price per Unit
                    <span className="text-xs text-muted-foreground">(what customers pay)</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {CURRENCIES[currency].symbol}
                    </span>
                    <Input
                      id="sellingPrice"
                      type="number"
                      placeholder="10"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="pl-7"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Current Sales */}
                <div className="space-y-2">
                  <Label htmlFor="currentSales" className="flex items-center gap-2">
                    Current Monthly Sales
                    <span className="text-xs text-muted-foreground">(units sold per month)</span>
                  </Label>
                  <Input
                    id="currentSales"
                    type="number"
                    placeholder="400"
                    value={currentSales}
                    onChange={(e) => setCurrentSales(e.target.value)}
                  />
                </div>

                {/* Info Box */}
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">Premium Analysis Includes:</p>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>12-month cash flow projections</li>
                          <li>Scenario comparison analysis</li>
                          <li>Industry benchmark comparisons</li>
                          <li>Interactive what-if scenarios</li>
                          <li>Personalized recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={handleCalculate} size="lg" className="w-full">
                  Calculate My Break-Even Point
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
