"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Target,
  Zap,
  Download,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import jsPDF from "jspdf"

interface Question {
  id: string
  question: string
  options: { value: string; label: string; points: number }[]
}

const questions: Question[] = [
  {
    id: "industry",
    question: "What industry is your business in?",
    options: [
      { value: "cafe", label: "Cafe/Restaurant", points: 10 },
      { value: "retail", label: "Retail/Shop", points: 10 },
      { value: "services", label: "Professional Services", points: 10 },
      { value: "other", label: "Other", points: 10 },
    ],
  },
  {
    id: "customers",
    question: "How many customers do you serve monthly?",
    options: [
      { value: "0-50", label: "0-50 customers", points: 5 },
      { value: "50-200", label: "50-200 customers", points: 10 },
      { value: "200-500", label: "200-500 customers", points: 15 },
      { value: "500+", label: "500+ customers", points: 20 },
    ],
  },
  {
    id: "tracking",
    question: "How do you currently track customer data?",
    options: [
      { value: "nothing", label: "We don't track it", points: 0 },
      { value: "paper", label: "Paper/Manual records", points: 5 },
      { value: "spreadsheet", label: "Spreadsheets", points: 10 },
      { value: "crm", label: "CRM System", points: 20 },
    ],
  },
  {
    id: "followup",
    question: "How do you follow up with customers?",
    options: [
      { value: "none", label: "We don't follow up", points: 0 },
      { value: "manual", label: "Manual messages/calls", points: 10 },
      { value: "semi", label: "Some automation", points: 15 },
      { value: "auto", label: "Fully automated", points: 20 },
    ],
  },
  {
    id: "time",
    question: "Hours spent on repetitive tasks weekly?",
    options: [
      { value: "0-5", label: "0-5 hours", points: 20 },
      { value: "5-15", label: "5-15 hours", points: 10 },
      { value: "15-30", label: "15-30 hours", points: 5 },
      { value: "30+", label: "30+ hours", points: 0 },
    ],
  },
  {
    id: "valuable",
    question: "Do you know which customers are most valuable?",
    options: [
      { value: "no", label: "No idea", points: 0 },
      { value: "guess", label: "I can guess", points: 5 },
      { value: "some", label: "I have some data", points: 10 },
      { value: "yes", label: "Yes, I track this", points: 20 },
    ],
  },
  {
    id: "trends",
    question: "Can you see your business trends easily?",
    options: [
      { value: "no", label: "No visibility", points: 0 },
      { value: "manual", label: "Manual analysis", points: 10 },
      { value: "yes", label: "Yes, with dashboards", points: 20 },
    ],
  },
  {
    id: "promotions",
    question: "How do you send promotions to customers?",
    options: [
      { value: "none", label: "We don't send promotions", points: 0 },
      { value: "manual", label: "Manual messages", points: 5 },
      { value: "bulk", label: "Bulk messages (same to all)", points: 10 },
      { value: "personalized", label: "Personalized & automated", points: 20 },
    ],
  },
]

export default function HealthScorePage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
      sendAssessmentToCompany()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    questions.forEach((q) => {
      const answer = answers[q.id]
      const option = q.options.find((opt) => opt.value === answer)
      if (option) {
        totalScore += option.points
      }
    })
    const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0)
    return Math.round((totalScore / maxScore) * 100)
  }

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 }
    if (score >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50", icon: TrendingUp }
    if (score >= 40)
      return { label: "Needs Improvement", color: "text-orange-600", bg: "bg-orange-50", icon: AlertTriangle }
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle }
  }

  const getRecommendations = () => {
    const recs = []

    if (answers.tracking === "nothing" || answers.tracking === "paper") {
      recs.push({
        title: "Implement Customer Tracking",
        description:
          "You're missing valuable customer data. Start with Ramply Sense to capture visits, preferences, and behavior.",
        impact: "High",
        service: "Ramply Sense",
      })
    }

    if (answers.followup === "none" || answers.followup === "manual") {
      recs.push({
        title: "Automate Customer Follow-ups",
        description:
          "Manual follow-ups are time-consuming and inconsistent. Automate personalized messages to increase repeat business.",
        impact: "High",
        service: "Ramply Engage",
      })
    }

    if (answers.trends === "no" || answers.trends === "manual") {
      recs.push({
        title: "Get Real-Time Business Insights",
        description: "Without dashboards, you're flying blind. See trends, patterns, and opportunities instantly.",
        impact: "Medium",
        service: "Ramply Insight",
      })
    }

    if (answers.valuable === "no" || answers.valuable === "guess") {
      recs.push({
        title: "Identify Your Best Customers",
        description: "Know who spends the most and visits most often. Focus your efforts where they matter.",
        impact: "High",
        service: "Ramply Insight",
      })
    }

    if (answers.time === "15-30" || answers.time === "30+") {
      recs.push({
        title: "Eliminate Repetitive Tasks",
        description: `You're wasting ${answers.time === "30+" ? "30+" : "15-30"} hours per week. Automation can recover 70% of this time.`,
        impact: "Critical",
        service: "Full Automation Suite",
      })
    }

    return recs.slice(0, 4) // Return top 4 recommendations
  }

  const handleDownloadReport = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    // Header with logo
    doc.setFillColor(61, 184, 154)
    doc.rect(0, 0, pageWidth, 30, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("Ramply Work", pageWidth / 2, 15, { align: "center" })
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Business Health Score Report", pageWidth / 2, 22, { align: "center" })

    yPos = 45

    // Business name and date
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(businessName || "Your Business", pageWidth / 2, yPos, { align: "center" })
    yPos += 8
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 15

    // Score section with background
    doc.setFillColor(240, 253, 244)
    doc.roundedRect(15, yPos, pageWidth - 30, 40, 3, 3, "F")
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(12)
    doc.text("Your Business Health Score", pageWidth / 2, yPos + 10, { align: "center" })
    doc.setTextColor(61, 184, 154)
    doc.setFontSize(36)
    doc.setFont("helvetica", "bold")
    doc.text(`${calculateScore()}/100`, pageWidth / 2, yPos + 25, { align: "center" })
    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    const categoryLabel = getScoreCategory(calculateScore())?.label || ""
    doc.text(categoryLabel, pageWidth / 2, yPos + 35, { align: "center" })
    yPos += 50

    // Stats section
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Key Metrics", 15, yPos)
    yPos += 10

    const stats = [
      { label: "Monthly Customers", value: answers.customers || "N/A" },
      { label: "Hours on Manual Tasks", value: answers.time || "N/A" },
      { label: "Priority Actions", value: getRecommendations().length.toString() },
    ]

    stats.forEach((stat, index) => {
      const xPos = 15 + (index * (pageWidth - 30)) / 3
      doc.setFillColor(249, 250, 251)
      doc.roundedRect(xPos, yPos, (pageWidth - 40) / 3, 20, 2, 2, "F")
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(61, 184, 154)
      doc.text(stat.value, xPos + (pageWidth - 40) / 6, yPos + 8, { align: "center" })
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(100, 100, 100)
      doc.text(stat.label, xPos + (pageWidth - 40) / 6, yPos + 15, { align: "center" })
    })
    yPos += 30

    // Recommendations
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Your Personalized Action Plan", 15, yPos)
    yPos += 10

    const recommendations = getRecommendations()

    recommendations.forEach((rec, index) => {
      // Check if we need a new page
      if (yPos > pageHeight - 50) {
        doc.addPage()
        yPos = 20
      }

      // Impact badge color
      let badgeColor: [number, number, number] = [61, 184, 154]
      if (rec.impact === "Critical") badgeColor = [220, 38, 38]
      else if (rec.impact === "High") badgeColor = [234, 88, 12]
      else if (rec.impact === "Medium") badgeColor = [37, 99, 235]

      doc.setFillColor(245, 245, 245)
      doc.roundedRect(15, yPos, pageWidth - 30, 35, 2, 2, "F")

      // Title
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 0, 0)
      doc.text(rec.title, 20, yPos + 8)

      // Impact badge
      doc.setFillColor(...badgeColor)
      doc.roundedRect(pageWidth - 55, yPos + 3, 35, 6, 2, 2, "F")
      doc.setFontSize(8)
      doc.setTextColor(255, 255, 255)
      doc.text(`${rec.impact} Impact`, pageWidth - 37.5, yPos + 7, { align: "center" })

      // Description
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(80, 80, 80)
      const descLines = doc.splitTextToSize(rec.description, pageWidth - 50)
      doc.text(descLines, 20, yPos + 15)

      // Solution
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(61, 184, 154)
      doc.text(`→ Solution: ${rec.service}`, 20, yPos + 15 + descLines.length * 4 + 3)

      yPos += 40
    })

    // Footer
    if (yPos > pageHeight - 40) {
      doc.addPage()
      yPos = 20
    }

    yPos = pageHeight - 30
    doc.setFillColor(61, 184, 154)
    doc.rect(0, yPos, pageWidth, 30, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Ready to improve your score?", pageWidth / 2, yPos + 8, { align: "center" })
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Contact Ramply Work for a free consultation", pageWidth / 2, yPos + 14, { align: "center" })
    doc.setFontSize(9)
    doc.text("ramplywork@gmail.com", pageWidth / 2, yPos + 20, { align: "center" })

    // Save the PDF
    doc.save(
      `${businessName.replace(/\s+/g, "-") || "Business"}-Health-Report-${new Date().toISOString().split("T")[0]}.pdf`,
    )
  }

  const score = showResults ? calculateScore() : 0
  const category = showResults ? getScoreCategory(score) : null
  const recommendations = showResults ? getRecommendations() : []

  const sendAssessmentToCompany = async () => {
    const score = calculateScore()
    const category = getScoreCategory(score)
    const recommendations = getRecommendations()

    // Format answers for email
    const answersText = questions
      .map((q) => {
        const answer = answers[q.id]
        const option = q.options.find((opt) => opt.value === answer)
        return `${q.question}\nAnswer: ${option?.label || "N/A"}`
      })
      .join("\n\n")

    const recommendationsText = recommendations
      .map(
        (rec, index) =>
          `${index + 1}. ${rec.title} (${rec.impact} Impact)\n   ${rec.description}\n   Solution: ${rec.service}`,
      )
      .join("\n\n")

    const formData = new FormData()
    formData.append("access_key", "7b634759-7ef8-4c15-a512-b0e7945c56ee")
    formData.append("subject", `New Business Health Assessment: ${businessName}`)
    formData.append("from_name", "Ramply Work Health Score Tool")
    formData.append("email", email)
    formData.append("businessName", businessName)
    formData.append("score", score.toString())
    formData.append("category", category.label)
    formData.append(
      "message",
      `NEW BUSINESS HEALTH ASSESSMENT SUBMISSION

Business Name: ${businessName}
Contact Email: ${email}
Health Score: ${score}/100
Category: ${category.label}

=== ASSESSMENT ANSWERS ===

${answersText}

=== PERSONALIZED RECOMMENDATIONS ===

${recommendationsText}

=== QUICK STATS ===
Monthly Customers: ${answers.customers || "N/A"}
Hours on Manual Tasks: ${answers.time || "N/A"}
Priority Actions: ${recommendations.length}

This lead was generated from the Business Health Score Tool.
Follow up within 24 hours for best conversion.`,
    )

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!data.success) {
        console.error("Failed to send assessment to company:", data)
      }
    } catch (error) {
      console.error("Error sending assessment to company:", error)
    }
  }

  if (showResults) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Score Display */}
            <Card className="mb-8 overflow-hidden border-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-semibold">Your Results Are Ready</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Business Health Score</h1>
                  <p className="text-muted-foreground">{businessName || "Your Business"}</p>
                </div>

                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-48 h-48 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${2 * Math.PI * 88 * (1 - score / 100)}`}
                        className={category?.color}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 2s ease-out" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">{score}</span>
                      <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                  </div>

                  {category && (
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${category.bg}`}>
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      <span className={`font-semibold ${category.color}`}>{category.label}</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{answers.customers || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">Monthly Customers</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{answers.time || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">Hours on Manual Tasks</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{recommendations.length}</div>
                    <div className="text-sm text-muted-foreground">Priority Actions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <h2 className="text-2xl font-bold mb-6">Your Personalized Action Plan</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            rec.impact === "Critical"
                              ? "bg-red-100"
                              : rec.impact === "High"
                                ? "bg-orange-100"
                                : "bg-blue-100"
                          }`}
                        >
                          <Target
                            className={`h-6 w-6 ${
                              rec.impact === "Critical"
                                ? "text-red-600"
                                : rec.impact === "High"
                                  ? "text-orange-600"
                                  : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{rec.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                rec.impact === "Critical"
                                  ? "bg-red-100 text-red-700"
                                  : rec.impact === "High"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {rec.impact} Impact
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">{rec.description}</p>
                          <p className="text-sm text-primary font-medium">→ Solution: {rec.service}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Improve Your Score?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
                  Get a personalized implementation plan and see how Ramply Work can help you achieve an 80+ score in 90
                  days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14" asChild>
                    <a href="/contact">Book Free Consultation</a>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {step === 0 ? (
            // Welcome Screen
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Free Business Assessment</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                How Healthy Is Your Business?
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Discover your automation readiness score and get personalized recommendations to accelerate growth in
                just 2 minutes.
              </p>

              <Card className="mb-8 text-left">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                      />
                      <p className="text-sm text-muted-foreground mt-1">We'll send your detailed report here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 h-14"
                onClick={() => email && businessName && setStep(1)}
                disabled={!email || !businessName}
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">Get your score immediately</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Plan</h3>
                    <p className="text-sm text-muted-foreground">Custom recommendations for you</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">100% Free</h3>
                    <p className="text-sm text-muted-foreground">No credit card required</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Question Screen
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {step} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-balance">{currentQuestion.question}</h2>

                  <RadioGroup value={answers[currentQuestion.id]} onValueChange={handleAnswer} className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                          answers[currentQuestion.id] === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer text-base font-medium">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      disabled={!answers[currentQuestion.id]}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {step === questions.length - 1 ? "See Results" : "Next"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
