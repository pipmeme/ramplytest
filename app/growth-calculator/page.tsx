"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, TrendingUp, DollarSign, Users, Target, Download, Info, Mail } from "lucide-react"
import { jsPDF } from "jspdf"

export default function GrowthCalculator() {
  const [step, setStep] = useState(1)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [userEmail, setUserEmail] = useState("")
  const [businessName, setBusinessName] = useState("")

  // Input values
  const [avgPurchase, setAvgPurchase] = useState(50)
  const [purchasesPerYear, setPurchasesPerYear] = useState(12)
  const [customerLifespan, setCustomerLifespan] = useState(2)
  const [monthlyCustomers, setMonthlyCustomers] = useState(200)
  const [retentionRate, setRetentionRate] = useState(30)
  const [acquisitionCost, setAcquisitionCost] = useState(25)
  const [profitMargin, setProfitMargin] = useState(40)

  // Simulator values (for "what if" scenarios)
  const [simRetentionRate, setSimRetentionRate] = useState(30)
  const [simLifespan, setSimLifespan] = useState(2)
  const [simMonthlyCustomers, setSimMonthlyCustomers] = useState(200)

  // Calculated metrics
  const [clv, setClv] = useState(0)
  const [annualRevenue, setAnnualRevenue] = useState(0)
  const [lostRevenue, setLostRevenue] = useState(0)
  const [roi, setRoi] = useState(0)
  const [simRevenue, setSimRevenue] = useState(0)
  const [potentialGain, setPotentialGain] = useState(0)

  // Calculate all metrics
  useEffect(() => {
    // Customer Lifetime Value
    const calculatedClv = avgPurchase * purchasesPerYear * customerLifespan
    setClv(calculatedClv)

    // Annual Revenue (current)
    const yearlyCustomers = monthlyCustomers * 12
    const currentAnnualRevenue = yearlyCustomers * avgPurchase * purchasesPerYear * (retentionRate / 100)
    setAnnualRevenue(currentAnnualRevenue)

    // Lost Revenue (customers who don't return)
    const lostCustomers = yearlyCustomers * (1 - retentionRate / 100)
    const calculatedLostRevenue = lostCustomers * calculatedClv
    setLostRevenue(calculatedLostRevenue)

    // ROI Calculation
    const totalAcquisitionCost = yearlyCustomers * acquisitionCost
    const totalProfit = currentAnnualRevenue * (profitMargin / 100)
    const calculatedRoi = ((totalProfit - totalAcquisitionCost) / totalAcquisitionCost) * 100
    setRoi(calculatedRoi)

    // Simulated Revenue (with improved metrics)
    const simClv = avgPurchase * purchasesPerYear * simLifespan
    const simYearlyCustomers = simMonthlyCustomers * 12
    const calculatedSimRevenue = simYearlyCustomers * avgPurchase * purchasesPerYear * (simRetentionRate / 100)
    setSimRevenue(calculatedSimRevenue)

    // Potential Gain
    const calculatedGain = calculatedSimRevenue - currentAnnualRevenue
    setPotentialGain(calculatedGain)
  }, [
    avgPurchase,
    purchasesPerYear,
    customerLifespan,
    monthlyCustomers,
    retentionRate,
    acquisitionCost,
    profitMargin,
    simRetentionRate,
    simLifespan,
    simMonthlyCustomers,
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleCalculate = () => {
    setShowEmailCapture(true)
  }

  const handleSubmitAndShowResults = async () => {
    if (!userEmail || !businessName) {
      alert("Please enter your email and business name to see results")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = {
        access_key: "7b634759-7ef8-4c15-a512-b0e7945c56ee",
        subject: "New Growth Calculator Submission",
        from_name: "Growth Calculator - Ramply Work",
        email: userEmail,
        business_name: businessName,

        // Input values
        average_purchase: `$${avgPurchase}`,
        purchases_per_year: purchasesPerYear,
        customer_lifespan: `${customerLifespan} years`,
        monthly_customers: monthlyCustomers,
        retention_rate: `${retentionRate}%`,
        acquisition_cost: `$${acquisitionCost}`,
        profit_margin: `${profitMargin}%`,

        // Calculated metrics
        customer_lifetime_value: formatCurrency(clv),
        annual_revenue: formatCurrency(annualRevenue),
        lost_revenue: formatCurrency(lostRevenue),
        roi: `${roi.toFixed(1)}%`,

        // Additional info
        submission_date: new Date().toLocaleString(),
        tool: "Growth Calculator",
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowEmailCapture(false)
        setShowResults(true)
        // Initialize simulator with current values
        setSimRetentionRate(retentionRate)
        setSimLifespan(customerLifespan)
        setSimMonthlyCustomers(monthlyCustomers)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      alert("There was an error. Please try again or contact us at ramplywork@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true)

      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 20

      // Header
      pdf.setFillColor(20, 184, 166)
      pdf.rect(0, 0, pageWidth, 40, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont("helvetica", "bold")
      pdf.text("Business Growth Calculator Report", margin, 25)

      // Company info
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text("Powered by Ramply Work", margin, 35)

      // Reset text color
      pdf.setTextColor(0, 0, 0)
      let yPos = 55

      if (businessName) {
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text(`Business: ${businessName}`, margin, yPos)
        yPos += 10
      }

      // Current Metrics Section
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(20, 184, 166)
      pdf.text("Your Current Business Metrics", margin, yPos)
      yPos += 10

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(0, 0, 0)

      const metrics = [
        { label: "Customer Lifetime Value", value: formatCurrency(clv) },
        { label: "Annual Revenue", value: formatCurrency(annualRevenue) },
        { label: "Customer Retention Rate", value: `${retentionRate}%` },
        { label: "Monthly New Customers", value: monthlyCustomers.toString() },
        { label: "Average Purchase Amount", value: formatCurrency(avgPurchase) },
        { label: "Purchases Per Year", value: purchasesPerYear.toString() },
        { label: "Customer Lifespan", value: `${customerLifespan} years` },
        { label: "ROI", value: `${roi.toFixed(1)}%` },
      ]

      metrics.forEach((metric) => {
        pdf.setFont("helvetica", "bold")
        pdf.text(`${metric.label}:`, margin, yPos)
        pdf.setFont("helvetica", "normal")
        pdf.text(metric.value, margin + 80, yPos)
        yPos += 7
      })

      yPos += 10

      // Lost Revenue Section
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(239, 68, 68)
      pdf.text("Revenue at Risk", margin, yPos)
      yPos += 10

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.text(`You're potentially losing ${formatCurrency(lostRevenue)} annually`, margin, yPos)
      pdf.text(`from customers who don't return.`, margin, yPos + 7)
      yPos += 20

      // Growth Potential Section
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(34, 197, 94)
      pdf.text("Your Growth Potential", margin, yPos)
      yPos += 10

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(0, 0, 0)
      pdf.text(`With improved retention (${simRetentionRate}%) and optimized metrics:`, margin, yPos)
      yPos += 7
      pdf.setFont("helvetica", "bold")
      pdf.text(`Projected Annual Revenue: ${formatCurrency(simRevenue)}`, margin, yPos)
      yPos += 7
      pdf.setFont("helvetica", "normal")
      pdf.text(`Potential Revenue Gain: ${formatCurrency(potentialGain)}`, margin, yPos)
      yPos += 15

      // Recommendations Section
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.setTextColor(20, 184, 166)
      pdf.text("Recommended Actions", margin, yPos)
      yPos += 10

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(0, 0, 0)

      const recommendations = [
        "1. Implement automated customer follow-up systems",
        "2. Create personalized retention campaigns",
        "3. Track customer behavior and preferences",
        "4. Develop loyalty programs for repeat customers",
        "5. Use data analytics to identify at-risk customers",
        "6. Optimize customer acquisition channels",
      ]

      recommendations.forEach((rec) => {
        pdf.text(rec, margin, yPos)
        yPos += 6
      })

      yPos += 10

      // Footer
      pdf.setFillColor(20, 184, 166)
      pdf.rect(0, pdf.internal.pageSize.getHeight() - 30, pageWidth, 30, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.text("Contact: ramplywork@gmail.com", margin, pdf.internal.pageSize.getHeight() - 15)
      pdf.text(
        "Ready to unlock this growth? Book a free consultation today.",
        margin,
        pdf.internal.pageSize.getHeight() - 8,
      )

      const pdfBlob = pdf.output("blob")
      const blobUrl = URL.createObjectURL(pdfBlob)

      // Detect if mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      if (isMobile) {
        const link = document.createElement("a")
        link.href = blobUrl
        link.download = "Business-Growth-Report.pdf"
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          alert(
            "Your report is ready! Check your Downloads folder or browser downloads. If you don't see it, please allow downloads in your browser settings.",
          )
        }, 500)
      } else {
        pdf.save("Business-Growth-Report.pdf")
      }

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
    } catch (error) {
      console.error("[v0] PDF generation error:", error)
      alert("Sorry, there was an error generating your report. Please try again or contact us at ramplywork@gmail.com")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <TrendingUp className="h-4 w-4" />
                Free Business Growth Calculator
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Calculate Your Business Growth Potential
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Discover your Customer Lifetime Value, identify lost revenue, and see exactly how much your business
                could grow with better retention strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {!showEmailCapture && !showResults ? (
              <div className="mx-auto max-w-4xl">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Enter Your Business Metrics</CardTitle>
                    <CardDescription className="text-base">
                      Provide accurate data for the most valuable insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Customer Metrics */}
                    <div className="space-y-6">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Users className="h-5 w-5 text-primary" />
                        Customer Metrics
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Average Purchase Amount
                            <span className="text-xs text-muted-foreground">(per transaction)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="number"
                              value={avgPurchase}
                              onChange={(e) => setAvgPurchase(Number(e.target.value))}
                              className="h-12"
                            />
                            <span className="text-2xl font-bold text-primary">{formatCurrency(avgPurchase)}</span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Purchases Per Year
                            <span className="text-xs text-muted-foreground">(per customer)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="range"
                              min="1"
                              max="52"
                              value={purchasesPerYear}
                              onChange={(e) => setPurchasesPerYear(Number(e.target.value))}
                              className="flex-1"
                            />
                            <span className="min-w-[60px] text-right text-2xl font-bold text-primary">
                              {purchasesPerYear}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Average Customer Lifespan
                            <span className="text-xs text-muted-foreground">(years)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="range"
                              min="0.5"
                              max="10"
                              step="0.5"
                              value={customerLifespan}
                              onChange={(e) => setCustomerLifespan(Number(e.target.value))}
                              className="flex-1"
                            />
                            <span className="min-w-[60px] text-right text-2xl font-bold text-primary">
                              {customerLifespan}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Monthly New Customers
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="number"
                              value={monthlyCustomers}
                              onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
                              className="h-12"
                            />
                            <span className="text-2xl font-bold text-primary">{monthlyCustomers}</span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Customer Retention Rate
                            <span className="text-xs text-muted-foreground">(% who return)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={retentionRate}
                              onChange={(e) => setRetentionRate(Number(e.target.value))}
                              className="flex-1"
                            />
                            <span className="min-w-[60px] text-right text-2xl font-bold text-primary">
                              {retentionRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Metrics */}
                    <div className="space-y-6 border-t pt-6">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Business Metrics
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Customer Acquisition Cost
                            <span className="text-xs text-muted-foreground">(per customer)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="number"
                              value={acquisitionCost}
                              onChange={(e) => setAcquisitionCost(Number(e.target.value))}
                              className="h-12"
                            />
                            <span className="text-2xl font-bold text-primary">{formatCurrency(acquisitionCost)}</span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                            Profit Margin
                            <span className="text-xs text-muted-foreground">(%)</span>
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={profitMargin}
                              onChange={(e) => setProfitMargin(Number(e.target.value))}
                              className="flex-1"
                            />
                            <span className="min-w-[60px] text-right text-2xl font-bold text-primary">
                              {profitMargin}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-semibold"
                    >
                      Calculate My Growth Potential
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : showEmailCapture ? (
              <div className="mx-auto max-w-2xl">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Get Your Results</CardTitle>
                    <CardDescription className="text-base">
                      Enter your details to see your personalized growth analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Business Name</label>
                      <Input
                        type="text"
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="h-12"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        We'll send you a copy of your results and growth recommendations
                      </p>
                    </div>
                    <Button
                      onClick={handleSubmitAndShowResults}
                      disabled={isSubmitting || !userEmail || !businessName}
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        "Calculating..."
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Show My Results
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => setShowEmailCapture(false)}
                      variant="ghost"
                      className="w-full text-muted-foreground"
                    >
                      ← Back to Calculator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="mx-auto max-w-6xl space-y-8">
                {/* Key Metrics Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Customer Lifetime Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(clv)}</div>
                      <p className="mt-2 text-xs text-muted-foreground">Per customer over {customerLifespan} years</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-background">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Annual Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(annualRevenue)}</div>
                      <p className="mt-2 text-xs text-muted-foreground">Current projected revenue</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-background">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Revenue at Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">{formatCurrency(lostRevenue)}</div>
                      <p className="mt-2 text-xs text-muted-foreground">From lost customers annually</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-background">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Current ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">{roi.toFixed(1)}%</div>
                      <p className="mt-2 text-xs text-muted-foreground">Return on investment</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Growth Simulator */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Target className="h-6 w-6 text-primary" />
                      Growth Simulator - Play With Your Numbers
                    </CardTitle>
                    <CardDescription>
                      Move the sliders to see how improving your metrics impacts revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
                          <span>Retention Rate</span>
                          <span className="text-lg font-bold text-primary">{simRetentionRate}%</span>
                        </label>
                        <Input
                          type="range"
                          min="0"
                          max="100"
                          value={simRetentionRate}
                          onChange={(e) => setSimRetentionRate(Number(e.target.value))}
                          className="w-full"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current: {retentionRate}% → Simulated: {simRetentionRate}%
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
                          <span>Customer Lifespan (years)</span>
                          <span className="text-lg font-bold text-primary">{simLifespan}</span>
                        </label>
                        <Input
                          type="range"
                          min="0.5"
                          max="10"
                          step="0.5"
                          value={simLifespan}
                          onChange={(e) => setSimLifespan(Number(e.target.value))}
                          className="w-full"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current: {customerLifespan} years → Simulated: {simLifespan} years
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
                          <span>Monthly New Customers</span>
                          <span className="text-lg font-bold text-primary">{simMonthlyCustomers}</span>
                        </label>
                        <Input
                          type="range"
                          min="0"
                          max={monthlyCustomers * 3}
                          value={simMonthlyCustomers}
                          onChange={(e) => setSimMonthlyCustomers(Number(e.target.value))}
                          className="w-full"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Current: {monthlyCustomers} → Simulated: {simMonthlyCustomers}
                        </p>
                      </div>
                    </div>

                    {/* Simulated Results */}
                    <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-foreground">Projected Results</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Projected Annual Revenue</p>
                          <p className="text-3xl font-bold text-primary">{formatCurrency(simRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Potential Revenue Gain</p>
                          <p className="text-3xl font-bold text-green-600">
                            {potentialGain >= 0 ? "+" : ""}
                            {formatCurrency(potentialGain)}
                          </p>
                        </div>
                      </div>
                      {potentialGain > 0 && (
                        <div className="mt-4 rounded-lg bg-green-500/10 p-4">
                          <p className="text-sm font-medium text-green-700">
                            By improving your metrics, you could increase annual revenue by{" "}
                            {((potentialGain / annualRevenue) * 100).toFixed(1)}%!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Personalized Recommendations</CardTitle>
                    <CardDescription>Based on your business metrics, here's how to unlock growth</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {retentionRate < 40 && (
                      <div className="rounded-lg border-l-4 border-red-500 bg-red-500/10 p-4">
                        <h4 className="mb-2 font-semibold text-red-700">Critical: Low Retention Rate</h4>
                        <p className="text-sm text-muted-foreground">
                          Your retention rate of {retentionRate}% is below industry average. Implementing automated
                          follow-ups and loyalty programs could recover {formatCurrency(lostRevenue * 0.3)} annually.
                        </p>
                      </div>
                    )}

                    {roi < 100 && (
                      <div className="rounded-lg border-l-4 border-orange-500 bg-orange-500/10 p-4">
                        <h4 className="mb-2 font-semibold text-orange-700">Improve ROI</h4>
                        <p className="text-sm text-muted-foreground">
                          Your current ROI of {roi.toFixed(1)}% can be improved by reducing acquisition costs and
                          increasing customer lifetime value through better retention strategies.
                        </p>
                      </div>
                    )}

                    <div className="rounded-lg border-l-4 border-primary bg-primary/10 p-4">
                      <h4 className="mb-2 font-semibold text-primary">Recommended: Customer Data Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Track customer behavior and preferences to personalize experiences. This typically increases
                        retention by 15-25%.
                      </p>
                    </div>

                    <div className="rounded-lg border-l-4 border-green-500 bg-green-500/10 p-4">
                      <h4 className="mb-2 font-semibold text-green-700">Quick Win: Automated Engagement</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up automated follow-ups and personalized offers. Businesses see an average 20% increase in
                        repeat purchases within 3 months.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Section */}
                <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-background">
                  <CardContent className="p-8 text-center">
                    <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                      Ready to Unlock This Growth?
                    </h3>
                    <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                      Ramply Work helps businesses like yours implement the exact systems needed to capture this
                      revenue. Book a free consultation to create your custom growth strategy.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button
                        onClick={handleDownloadReport}
                        size="lg"
                        variant="outline"
                        disabled={isDownloading}
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground sm:w-auto bg-transparent disabled:opacity-50"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        {isDownloading ? "Generating PDF..." : "Download Full Report"}
                      </Button>
                      <Button
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                        onClick={() => (window.location.href = "/contact")}
                      >
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Button */}
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setShowResults(false)
                      setSimRetentionRate(retentionRate)
                      setSimLifespan(customerLifespan)
                      setSimMonthlyCustomers(monthlyCustomers)
                    }}
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary"
                  >
                    ← Start Over with New Numbers
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Educational Section */}
        <section className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
                Understanding Your Metrics
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="h-5 w-5 text-primary" />
                      Customer Lifetime Value (CLV)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The total revenue you can expect from a single customer over their entire relationship with your
                      business. Higher CLV means more profitable customers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="h-5 w-5 text-primary" />
                      Retention Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The percentage of customers who return to make another purchase. Industry average is 20-40%.
                      Increasing retention by just 5% can increase profits by 25-95%.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="h-5 w-5 text-primary" />
                      Customer Acquisition Cost (CAC)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The total cost of acquiring a new customer, including marketing and sales expenses. Your CLV
                      should be at least 3x your CAC for a healthy business.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="h-5 w-5 text-primary" />
                      Revenue at Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The potential revenue you're losing from customers who don't return. This represents your biggest
                      growth opportunity through improved retention strategies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
