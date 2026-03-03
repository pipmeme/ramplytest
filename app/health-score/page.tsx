"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Share2,
  Mail,
  Copy,
  Search,
  ChevronDown,
  Store,
  ShoppingCart,
  Code,
  Briefcase,
  Utensils,
  Stethoscope,
  Wrench,
  GraduationCap,
  Home,
  Truck,
  Palette,
  Users,
  Laptop,
  Factory,
  Hotel,
  Scissors,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import jsPDF from "jspdf"
import { detectUserCurrency, currencies, getCurrencySymbol } from "@/lib/currency-utils"
import { motion } from "framer-motion"

// Category labels for the breakdown
const SCORING_CATEGORIES = [
  { id: "growth", label: "Growth & Sales", icon: TrendingUp },
  { id: "operations", label: "Systems & Operations", icon: Zap },
  { id: "experience", label: "Customer Experience", icon: Users },
]
interface Question {
  id: string
  question: string
  options: { value: string; label: string; points: number }[]
}

interface IndustryConfig {
  value: string
  label: string
  icon: any
  questions: Question[]
}

const industries: IndustryConfig[] = [
  {
    value: "saas",
    label: "SaaS / Software",
    icon: Code,
    questions: [
      {
        id: "mrr",
        question: "What's your Monthly Recurring Revenue (MRR)?",
        options: [
          { value: "0-5k", label: "Under 5K", points: 5 },
          { value: "5k-25k", label: "5K - 25K", points: 10 },
          { value: "25k-100k", label: "25K - 100K", points: 15 },
          { value: "100k+", label: "Over 100K", points: 20 },
        ],
      },
      {
        id: "churn",
        question: "What's your monthly customer churn rate?",
        options: [
          { value: "0-2", label: "0-2% (Excellent)", points: 20 },
          { value: "2-5", label: "2-5% (Good)", points: 15 },
          { value: "5-10", label: "5-10% (Needs work)", points: 10 },
          { value: "10+", label: "Over 10% (Critical)", points: 5 },
        ],
      },
      {
        id: "cac_ltv",
        question: "Do you track Customer Acquisition Cost (CAC) vs Lifetime Value (LTV)?",
        options: [
          { value: "yes_good", label: "Yes, LTV is 3x+ CAC", points: 20 },
          { value: "yes_ok", label: "Yes, but ratio needs work", points: 10 },
          { value: "tracking", label: "Just started tracking", points: 5 },
          { value: "no", label: "Not tracking yet", points: 0 },
        ],
      },
      {
        id: "automation",
        question: "How automated is your customer onboarding?",
        options: [
          { value: "full", label: "Fully automated", points: 20 },
          { value: "mostly", label: "Mostly automated", points: 15 },
          { value: "partial", label: "Partially automated", points: 10 },
          { value: "manual", label: "Mostly manual", points: 5 },
        ],
      },
      {
        id: "support",
        question: "How do you handle customer support?",
        options: [
          { value: "ai_auto", label: "AI + automation with human escalation", points: 20 },
          { value: "ticketing", label: "Ticketing system", points: 15 },
          { value: "email", label: "Email only", points: 10 },
          { value: "adhoc", label: "Ad-hoc responses", points: 5 },
        ],
      },
      {
        id: "analytics",
        question: "Do you have product usage analytics?",
        options: [
          { value: "advanced", label: "Yes, with cohort analysis", points: 20 },
          { value: "basic", label: "Basic analytics", points: 15 },
          { value: "limited", label: "Limited tracking", points: 10 },
          { value: "none", label: "No analytics", points: 0 },
        ],
      },
      {
        id: "growth",
        question: "What's your month-over-month growth rate?",
        options: [
          { value: "20+", label: "20%+ (Hypergrowth)", points: 20 },
          { value: "10-20", label: "10-20% (Strong)", points: 15 },
          { value: "5-10", label: "5-10% (Steady)", points: 10 },
          { value: "0-5", label: "Under 5%", points: 5 },
        ],
      },
      {
        id: "retention",
        question: "How do you retain customers?",
        options: [
          { value: "proactive", label: "Proactive engagement + value delivery", points: 20 },
          { value: "reactive", label: "Reactive support", points: 10 },
          { value: "minimal", label: "Minimal retention efforts", points: 5 },
          { value: "none", label: "No retention strategy", points: 0 },
        ],
      },
    ],
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    questions: [
      {
        id: "monthly_orders",
        question: "How many orders do you process monthly?",
        options: [
          { value: "0-50", label: "0-50 orders", points: 5 },
          { value: "50-200", label: "50-200 orders", points: 10 },
          { value: "200-1000", label: "200-1,000 orders", points: 15 },
          { value: "1000+", label: "1,000+ orders", points: 20 },
        ],
      },
      {
        id: "conversion",
        question: "What's your website conversion rate?",
        options: [
          { value: "5+", label: "5%+ (Excellent)", points: 20 },
          { value: "2-5", label: "2-5% (Good)", points: 15 },
          { value: "1-2", label: "1-2% (Average)", points: 10 },
          { value: "0-1", label: "Under 1%", points: 5 },
        ],
      },
      {
        id: "cart_abandonment",
        question: "Do you have cart abandonment recovery?",
        options: [
          { value: "automated", label: "Automated email + SMS sequences", points: 20 },
          { value: "email", label: "Basic email reminders", points: 15 },
          { value: "manual", label: "Manual follow-ups", points: 5 },
          { value: "none", label: "No recovery system", points: 0 },
        ],
      },
      {
        id: "inventory",
        question: "How do you manage inventory?",
        options: [
          { value: "automated", label: "Automated system with alerts", points: 20 },
          { value: "software", label: "Inventory software", points: 15 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "manual", label: "Manual tracking", points: 5 },
        ],
      },
      {
        id: "customer_data",
        question: "How do you use customer data?",
        options: [
          { value: "personalized", label: "Personalized recommendations + marketing", points: 20 },
          { value: "segmented", label: "Segmented email campaigns", points: 15 },
          { value: "basic", label: "Basic email blasts", points: 10 },
          { value: "none", label: "Don't use customer data", points: 0 },
        ],
      },
      {
        id: "repeat_rate",
        question: "What's your repeat customer rate?",
        options: [
          { value: "40+", label: "40%+ (Excellent)", points: 20 },
          { value: "25-40", label: "25-40% (Good)", points: 15 },
          { value: "10-25", label: "10-25% (Average)", points: 10 },
          { value: "0-10", label: "Under 10%", points: 5 },
        ],
      },
      {
        id: "fulfillment",
        question: "How automated is your order fulfillment?",
        options: [
          { value: "full", label: "Fully automated with 3PL", points: 20 },
          { value: "semi", label: "Semi-automated", points: 15 },
          { value: "manual", label: "Manual processing", points: 10 },
          { value: "adhoc", label: "Ad-hoc fulfillment", points: 5 },
        ],
      },
      {
        id: "reviews",
        question: "Do you collect and use customer reviews?",
        options: [
          { value: "automated", label: "Automated collection + display", points: 20 },
          { value: "manual", label: "Manual requests", points: 10 },
          { value: "passive", label: "Passive collection only", points: 5 },
          { value: "none", label: "No review system", points: 0 },
        ],
      },
    ],
  },
  {
    value: "restaurant",
    label: "Restaurant / Cafe",
    icon: Utensils,
    questions: [
      {
        id: "daily_customers",
        question: "How many customers do you serve daily?",
        options: [
          { value: "0-30", label: "0-30 customers", points: 5 },
          { value: "30-100", label: "30-100 customers", points: 10 },
          { value: "100-300", label: "100-300 customers", points: 15 },
          { value: "300+", label: "300+ customers", points: 20 },
        ],
      },
      {
        id: "table_turnover",
        question: "What's your average table turnover rate?",
        options: [
          { value: "3+", label: "3+ times per meal period", points: 20 },
          { value: "2-3", label: "2-3 times", points: 15 },
          { value: "1-2", label: "1-2 times", points: 10 },
          { value: "1", label: "Once per meal period", points: 5 },
        ],
      },
      {
        id: "food_cost",
        question: "What's your food cost percentage?",
        options: [
          { value: "25-30", label: "25-30% (Excellent)", points: 20 },
          { value: "30-35", label: "30-35% (Good)", points: 15 },
          { value: "35-40", label: "35-40% (Acceptable)", points: 10 },
          { value: "40+", label: "Over 40% (High)", points: 5 },
        ],
      },
      {
        id: "reservations",
        question: "How do you manage reservations?",
        options: [
          { value: "system", label: "Automated booking system", points: 20 },
          { value: "phone", label: "Phone + manual log", points: 10 },
          { value: "walkin", label: "Walk-ins only", points: 5 },
          { value: "none", label: "No reservation system", points: 0 },
        ],
      },
      {
        id: "loyalty",
        question: "Do you have a customer loyalty program?",
        options: [
          { value: "digital", label: "Digital loyalty with automation", points: 20 },
          { value: "punch", label: "Punch cards", points: 10 },
          { value: "informal", label: "Informal recognition", points: 5 },
          { value: "none", label: "No loyalty program", points: 0 },
        ],
      },
      {
        id: "online_orders",
        question: "What percentage of orders are online?",
        options: [
          { value: "40+", label: "40%+ (Digital-first)", points: 20 },
          { value: "20-40", label: "20-40% (Growing)", points: 15 },
          { value: "10-20", label: "10-20% (Starting)", points: 10 },
          { value: "0-10", label: "Under 10%", points: 5 },
        ],
      },
      {
        id: "waste",
        question: "How do you track food waste?",
        options: [
          { value: "system", label: "Automated tracking system", points: 20 },
          { value: "manual", label: "Manual daily logs", points: 15 },
          { value: "weekly", label: "Weekly estimates", points: 10 },
          { value: "none", label: "Don't track waste", points: 0 },
        ],
      },
      {
        id: "feedback",
        question: "How do you collect customer feedback?",
        options: [
          { value: "automated", label: "Automated surveys + reviews", points: 20 },
          { value: "manual", label: "Manual requests", points: 10 },
          { value: "passive", label: "Passive (comment cards)", points: 5 },
          { value: "none", label: "No feedback system", points: 0 },
        ],
      },
    ],
  },
  {
    value: "retail",
    label: "Retail Store",
    icon: Store,
    questions: [
      {
        id: "foot_traffic",
        question: "How many customers visit your store daily?",
        options: [
          { value: "0-20", label: "0-20 customers", points: 5 },
          { value: "20-50", label: "20-50 customers", points: 10 },
          { value: "50-150", label: "50-150 customers", points: 15 },
          { value: "150+", label: "150+ customers", points: 20 },
        ],
      },
      {
        id: "conversion_rate",
        question: "What's your in-store conversion rate?",
        options: [
          { value: "30+", label: "30%+ (Excellent)", points: 20 },
          { value: "20-30", label: "20-30% (Good)", points: 15 },
          { value: "10-20", label: "10-20% (Average)", points: 10 },
          { value: "0-10", label: "Under 10%", points: 5 },
        ],
      },
      {
        id: "inventory_system",
        question: "How do you manage inventory?",
        options: [
          { value: "pos", label: "POS with real-time tracking", points: 20 },
          { value: "software", label: "Inventory software", points: 15 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "manual", label: "Manual counting", points: 5 },
        ],
      },
      {
        id: "customer_recognition",
        question: "Do you recognize repeat customers?",
        options: [
          { value: "crm", label: "CRM with purchase history", points: 20 },
          { value: "loyalty", label: "Loyalty program", points: 15 },
          { value: "memory", label: "Staff memory", points: 5 },
          { value: "no", label: "Don't track customers", points: 0 },
        ],
      },
      {
        id: "promotions",
        question: "How do you run promotions?",
        options: [
          { value: "targeted", label: "Targeted digital campaigns", points: 20 },
          { value: "email", label: "Email blasts", points: 15 },
          { value: "instore", label: "In-store signage only", points: 10 },
          { value: "none", label: "Rarely run promotions", points: 5 },
        ],
      },
      {
        id: "online_presence",
        question: "Do you sell online?",
        options: [
          { value: "integrated", label: "Integrated online + offline", points: 20 },
          { value: "separate", label: "Separate online store", points: 15 },
          { value: "social", label: "Social media only", points: 10 },
          { value: "none", label: "No online sales", points: 5 },
        ],
      },
      {
        id: "staff_efficiency",
        question: "How do you track staff performance?",
        options: [
          { value: "system", label: "Automated performance tracking", points: 20 },
          { value: "manual", label: "Manual sales tracking", points: 15 },
          { value: "basic", label: "Basic observations", points: 10 },
          { value: "none", label: "Don't track performance", points: 5 },
        ],
      },
      {
        id: "stockouts",
        question: "How often do you experience stockouts?",
        options: [
          { value: "rare", label: "Rarely (good forecasting)", points: 20 },
          { value: "monthly", label: "Few times per month", points: 15 },
          { value: "weekly", label: "Weekly", points: 10 },
          { value: "frequent", label: "Frequently", points: 5 },
        ],
      },
    ],
  },
  {
    value: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    questions: [
      {
        id: "monthly_clients",
        question: "How many clients do you serve monthly?",
        options: [
          { value: "1-5", label: "1-5 clients (High-value B2B)", points: 20 },
          { value: "5-15", label: "5-15 clients", points: 20 },
          { value: "15-50", label: "15-50 clients", points: 15 },
          { value: "50+", label: "50+ clients", points: 10 },
        ],
      },
      {
        id: "avg_deal",
        question: "What's your average deal value?",
        options: [
          { value: "500k+", label: "500K+ (Enterprise)", points: 20 },
          { value: "100k-500k", label: "100K-500K", points: 20 },
          { value: "25k-100k", label: "25K-100K", points: 15 },
          { value: "0-25k", label: "Under 25K", points: 10 },
        ],
      },
      {
        id: "production_tracking",
        question: "How do you track production?",
        options: [
          { value: "erp", label: "ERP system with real-time data", points: 20 },
          { value: "software", label: "Production management software", points: 15 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "manual", label: "Manual logs", points: 5 },
        ],
      },
      {
        id: "quality_control",
        question: "How automated is your quality control?",
        options: [
          { value: "automated", label: "Automated with sensors/AI", points: 20 },
          { value: "systematic", label: "Systematic manual checks", points: 15 },
          { value: "sampling", label: "Random sampling", points: 10 },
          { value: "adhoc", label: "Ad-hoc inspection", points: 5 },
        ],
      },
      {
        id: "supply_chain",
        question: "How do you manage your supply chain?",
        options: [
          { value: "integrated", label: "Integrated system with suppliers", points: 20 },
          { value: "software", label: "Supply chain software", points: 15 },
          { value: "manual", label: "Manual coordination", points: 10 },
          { value: "reactive", label: "Reactive ordering", points: 5 },
        ],
      },
      {
        id: "downtime",
        question: "How much unplanned downtime do you have?",
        options: [
          { value: "0-2", label: "0-2% (Excellent)", points: 20 },
          { value: "2-5", label: "2-5% (Good)", points: 15 },
          { value: "5-10", label: "5-10% (Needs work)", points: 10 },
          { value: "10+", label: "Over 10% (Critical)", points: 5 },
        ],
      },
      {
        id: "client_communication",
        question: "How do you communicate with clients?",
        options: [
          { value: "portal", label: "Client portal with real-time updates", points: 20 },
          { value: "automated", label: "Automated status updates", points: 15 },
          { value: "manual", label: "Manual emails/calls", points: 10 },
          { value: "reactive", label: "Only when asked", points: 5 },
        ],
      },
      {
        id: "capacity_planning",
        question: "How do you plan production capacity?",
        options: [
          { value: "predictive", label: "Predictive analytics", points: 20 },
          { value: "data", label: "Data-driven planning", points: 15 },
          { value: "experience", label: "Based on experience", points: 10 },
          { value: "reactive", label: "Reactive planning", points: 5 },
        ],
      },
    ],
  },
  {
    value: "consulting",
    label: "Consulting / Agency",
    icon: Briefcase,
    questions: [
      {
        id: "active_clients",
        question: "How many active clients do you have?",
        options: [
          { value: "20+", label: "20+ clients", points: 20 },
          { value: "10-20", label: "10-20 clients", points: 15 },
          { value: "5-10", label: "5-10 clients", points: 10 },
          { value: "0-5", label: "Under 5 clients", points: 5 },
        ],
      },
      {
        id: "project_tracking",
        question: "How do you track project progress?",
        options: [
          { value: "pm_tool", label: "Project management tool", points: 20 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "email", label: "Email threads", points: 5 },
          { value: "memory", label: "Memory/notes", points: 0 },
        ],
      },
      {
        id: "time_tracking",
        question: "Do you track billable hours?",
        options: [
          { value: "automated", label: "Automated time tracking", points: 20 },
          { value: "manual", label: "Manual time logs", points: 15 },
          { value: "estimates", label: "Rough estimates", points: 5 },
          { value: "none", label: "Don't track time", points: 0 },
        ],
      },
      {
        id: "client_onboarding",
        question: "How automated is your client onboarding?",
        options: [
          { value: "full", label: "Fully automated workflow", points: 20 },
          { value: "templates", label: "Templates + manual steps", points: 15 },
          { value: "manual", label: "Mostly manual", points: 10 },
          { value: "adhoc", label: "Ad-hoc process", points: 5 },
        ],
      },
      {
        id: "proposals",
        question: "How do you create proposals?",
        options: [
          { value: "automated", label: "Automated with templates", points: 20 },
          { value: "templates", label: "Manual with templates", points: 15 },
          { value: "scratch", label: "From scratch each time", points: 10 },
          { value: "basic", label: "Basic documents", points: 5 },
        ],
      },
      {
        id: "client_communication",
        question: "How do you communicate with clients?",
        options: [
          { value: "portal", label: "Client portal + automation", points: 20 },
          { value: "scheduled", label: "Scheduled updates", points: 15 },
          { value: "adhoc", label: "Ad-hoc emails", points: 10 },
          { value: "reactive", label: "Only when asked", points: 5 },
        ],
      },
      {
        id: "knowledge_base",
        question: "Do you have a knowledge base for recurring questions?",
        options: [
          { value: "comprehensive", label: "Comprehensive + searchable", points: 20 },
          { value: "basic", label: "Basic documentation", points: 15 },
          { value: "scattered", label: "Scattered notes", points: 5 },
          { value: "none", label: "No knowledge base", points: 0 },
        ],
      },
      {
        id: "revenue_predictability",
        question: "How predictable is your revenue?",
        options: [
          { value: "retainer", label: "Mostly retainer-based", points: 20 },
          { value: "mixed", label: "Mix of retainer + project", points: 15 },
          { value: "project", label: "Mostly project-based", points: 10 },
          { value: "unpredictable", label: "Highly variable", points: 5 },
        ],
      },
    ],
  },
  {
    value: "healthcare",
    label: "Healthcare / Clinic",
    icon: Stethoscope,
    questions: [
      {
        id: "daily_patients",
        question: "How many patients do you see daily?",
        options: [
          { value: "50+", label: "50+ patients", points: 20 },
          { value: "25-50", label: "25-50 patients", points: 15 },
          { value: "10-25", label: "10-25 patients", points: 10 },
          { value: "0-10", label: "Under 10 patients", points: 5 },
        ],
      },
      {
        id: "appointment_system",
        question: "How do you manage appointments?",
        options: [
          { value: "automated", label: "Automated booking + reminders", points: 20 },
          { value: "software", label: "Scheduling software", points: 15 },
          { value: "manual", label: "Manual phone bookings", points: 10 },
          { value: "walkin", label: "Walk-ins only", points: 5 },
        ],
      },
      {
        id: "records",
        question: "How do you manage patient records?",
        options: [
          { value: "ehr", label: "Electronic Health Records (EHR)", points: 20 },
          { value: "digital", label: "Digital files", points: 15 },
          { value: "paper", label: "Paper records", points: 5 },
          { value: "mixed", label: "Mix of paper + digital", points: 10 },
        ],
      },
      {
        id: "no_shows",
        question: "What's your no-show rate?",
        options: [
          { value: "0-5", label: "0-5% (Excellent)", points: 20 },
          { value: "5-10", label: "5-10% (Good)", points: 15 },
          { value: "10-20", label: "10-20% (Needs work)", points: 10 },
          { value: "20+", label: "Over 20% (Critical)", points: 5 },
        ],
      },
      {
        id: "follow_ups",
        question: "How do you handle follow-up appointments?",
        options: [
          { value: "automated", label: "Automated reminders + booking", points: 20 },
          { value: "manual", label: "Manual calls", points: 10 },
          { value: "patient", label: "Patient-initiated only", points: 5 },
          { value: "none", label: "No follow-up system", points: 0 },
        ],
      },
      {
        id: "billing",
        question: "How automated is your billing?",
        options: [
          { value: "full", label: "Fully automated", points: 20 },
          { value: "semi", label: "Semi-automated", points: 15 },
          { value: "manual", label: "Manual processing", points: 10 },
          { value: "adhoc", label: "Ad-hoc billing", points: 5 },
        ],
      },
      {
        id: "patient_communication",
        question: "How do you communicate with patients?",
        options: [
          { value: "portal", label: "Patient portal + automated messages", points: 20 },
          { value: "sms", label: "SMS reminders", points: 15 },
          { value: "phone", label: "Phone calls only", points: 10 },
          { value: "none", label: "Minimal communication", points: 5 },
        ],
      },
      {
        id: "wait_time",
        question: "What's your average patient wait time?",
        options: [
          { value: "0-10", label: "0-10 minutes (Excellent)", points: 20 },
          { value: "10-20", label: "10-20 minutes (Good)", points: 15 },
          { value: "20-30", label: "20-30 minutes (Average)", points: 10 },
          { value: "30+", label: "Over 30 minutes", points: 5 },
        ],
      },
    ],
  },
  {
    value: "construction",
    label: "Construction / Trades",
    icon: Wrench,
    questions: [
      {
        id: "active_projects",
        question: "How many active projects do you have?",
        options: [
          { value: "10+", label: "10+ projects", points: 20 },
          { value: "5-10", label: "5-10 projects", points: 15 },
          { value: "2-5", label: "2-5 projects", points: 10 },
          { value: "0-2", label: "1-2 projects", points: 5 },
        ],
      },
      {
        id: "project_tracking",
        question: "How do you track project progress?",
        options: [
          { value: "software", label: "Project management software", points: 20 },
          { value: "spreadsheet", label: "Spreadsheets", points: 15 },
          { value: "paper", label: "Paper logs", points: 10 },
          { value: "memory", label: "Memory/experience", points: 5 },
        ],
      },
      {
        id: "estimates",
        question: "How do you create estimates?",
        options: [
          { value: "software", label: "Estimating software", points: 20 },
          { value: "templates", label: "Templates + manual calc", points: 15 },
          { value: "manual", label: "Manual calculations", points: 10 },
          { value: "rough", label: "Rough estimates", points: 5 },
        ],
      },
      {
        id: "client_updates",
        question: "How do you update clients on progress?",
        options: [
          { value: "portal", label: "Client portal with photos", points: 20 },
          { value: "scheduled", label: "Scheduled updates", points: 15 },
          { value: "adhoc", label: "Ad-hoc calls/texts", points: 10 },
          { value: "onsite", label: "Only on-site discussions", points: 5 },
        ],
      },
      {
        id: "scheduling",
        question: "How do you schedule crews and materials?",
        options: [
          { value: "software", label: "Scheduling software", points: 20 },
          { value: "calendar", label: "Digital calendar", points: 15 },
          { value: "manual", label: "Manual coordination", points: 10 },
          { value: "adhoc", label: "Day-by-day planning", points: 5 },
        ],
      },
      {
        id: "invoicing",
        question: "How do you handle invoicing?",
        options: [
          { value: "automated", label: "Automated invoicing", points: 20 },
          { value: "software", label: "Invoicing software", points: 15 },
          { value: "manual", label: "Manual invoices", points: 10 },
          { value: "paper", label: "Paper invoices", points: 5 },
        ],
      },
      {
        id: "change_orders",
        question: "How do you manage change orders?",
        options: [
          { value: "system", label: "Digital approval system", points: 20 },
          { value: "documented", label: "Documented + signed", points: 15 },
          { value: "verbal", label: "Verbal agreements", points: 5 },
          { value: "informal", label: "Informal tracking", points: 0 },
        ],
      },
      {
        id: "profitability",
        question: "Do you track project profitability?",
        options: [
          { value: "realtime", label: "Real-time tracking", points: 20 },
          { value: "post", label: "Post-project analysis", points: 15 },
          { value: "rough", label: "Rough estimates", points: 10 },
          { value: "none", label: "Don't track profitability", points: 0 },
        ],
      },
    ],
  },
  {
    value: "education",
    label: "Education / Training",
    icon: GraduationCap,
    questions: [
      {
        id: "students",
        question: "How many active students/clients do you have?",
        options: [
          { value: "500+", label: "500+ students", points: 20 },
          { value: "100-500", label: "100-500 students", points: 15 },
          { value: "25-100", label: "25-100 students", points: 10 },
          { value: "0-25", label: "Under 25 students", points: 5 },
        ],
      },
      {
        id: "enrollment",
        question: "How do you handle enrollment?",
        options: [
          { value: "automated", label: "Automated online enrollment", points: 20 },
          { value: "online", label: "Online forms", points: 15 },
          { value: "manual", label: "Manual registration", points: 10 },
          { value: "paper", label: "Paper forms", points: 5 },
        ],
      },
      {
        id: "content_delivery",
        question: "How do you deliver content?",
        options: [
          { value: "lms", label: "Learning Management System", points: 20 },
          { value: "video", label: "Video platform", points: 15 },
          { value: "email", label: "Email + documents", points: 10 },
          { value: "inperson", label: "In-person only", points: 5 },
        ],
      },
      {
        id: "progress_tracking",
        question: "How do you track student progress?",
        options: [
          { value: "automated", label: "Automated tracking + analytics", points: 20 },
          { value: "manual", label: "Manual records", points: 15 },
          { value: "basic", label: "Basic attendance", points: 10 },
          { value: "none", label: "Don't track progress", points: 0 },
        ],
      },
      {
        id: "communication",
        question: "How do you communicate with students?",
        options: [
          { value: "platform", label: "Integrated platform", points: 20 },
          { value: "email", label: "Email + messaging", points: 15 },
          { value: "adhoc", label: "Ad-hoc communication", points: 10 },
          { value: "inperson", label: "In-person only", points: 5 },
        ],
      },
      {
        id: "payments",
        question: "How do you handle payments?",
        options: [
          { value: "automated", label: "Automated recurring billing", points: 20 },
          { value: "online", label: "Online payments", points: 15 },
          { value: "manual", label: "Manual invoicing", points: 10 },
          { value: "cash", label: "Cash/check only", points: 5 },
        ],
      },
      {
        id: "feedback",
        question: "How do you collect student feedback?",
        options: [
          { value: "automated", label: "Automated surveys", points: 20 },
          { value: "periodic", label: "Periodic surveys", points: 15 },
          { value: "informal", label: "Informal feedback", points: 10 },
          { value: "none", label: "Don't collect feedback", points: 0 },
        ],
      },
      {
        id: "completion_rate",
        question: "What's your course completion rate?",
        options: [
          { value: "80+", label: "80%+ (Excellent)", points: 20 },
          { value: "60-80", label: "60-80% (Good)", points: 15 },
          { value: "40-60", label: "40-60% (Average)", points: 10 },
          { value: "0-40", label: "Under 40%", points: 5 },
        ],
      },
    ],
  },
  {
    value: "realestate",
    label: "Real Estate",
    icon: Home,
    questions: [
      {
        id: "active_listings",
        question: "How many active listings do you manage?",
        options: [
          { value: "20+", label: "20+ listings", points: 20 },
          { value: "10-20", label: "10-20 listings", points: 15 },
          { value: "5-10", label: "5-10 listings", points: 10 },
          { value: "0-5", label: "Under 5 listings", points: 5 },
        ],
      },
      {
        id: "lead_management",
        question: "How do you manage leads?",
        options: [
          { value: "crm", label: "Real estate CRM", points: 20 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "email", label: "Email only", points: 5 },
          { value: "adhoc", label: "Ad-hoc tracking", points: 0 },
        ],
      },
      {
        id: "showings",
        question: "How do you schedule showings?",
        options: [
          { value: "automated", label: "Automated scheduling system", points: 20 },
          { value: "calendar", label: "Digital calendar", points: 15 },
          { value: "manual", label: "Manual coordination", points: 10 },
          { value: "phone", label: "Phone calls only", points: 5 },
        ],
      },
      {
        id: "follow_ups",
        question: "How do you follow up with prospects?",
        options: [
          { value: "automated", label: "Automated drip campaigns", points: 20 },
          { value: "scheduled", label: "Scheduled manual follow-ups", points: 15 },
          { value: "adhoc", label: "Ad-hoc follow-ups", points: 10 },
          { value: "reactive", label: "Only when they reach out", points: 5 },
        ],
      },
      {
        id: "marketing",
        question: "How do you market properties?",
        options: [
          { value: "multi", label: "Multi-channel digital marketing", points: 20 },
          { value: "social", label: "Social media + listings", points: 15 },
          { value: "listings", label: "Listing sites only", points: 10 },
          { value: "minimal", label: "Minimal marketing", points: 5 },
        ],
      },
      {
        id: "documentation",
        question: "How do you handle transaction documents?",
        options: [
          { value: "digital", label: "Digital signature platform", points: 20 },
          { value: "pdf", label: "PDF + email", points: 15 },
          { value: "paper", label: "Paper documents", points: 5 },
          { value: "mixed", label: "Mix of paper + digital", points: 10 },
        ],
      },
      {
        id: "client_updates",
        question: "How do you update clients?",
        options: [
          { value: "portal", label: "Client portal with updates", points: 20 },
          { value: "scheduled", label: "Scheduled calls/emails", points: 15 },
          { value: "adhoc", label: "Ad-hoc updates", points: 10 },
          { value: "reactive", label: "Only when asked", points: 5 },
        ],
      },
      {
        id: "conversion_rate",
        question: "What's your lead-to-client conversion rate?",
        options: [
          { value: "10+", label: "10%+ (Excellent)", points: 20 },
          { value: "5-10", label: "5-10% (Good)", points: 15 },
          { value: "2-5", label: "2-5% (Average)", points: 10 },
          { value: "0-2", label: "Under 2%", points: 5 },
        ],
      },
    ],
  },
  {
    value: "logistics",
    label: "Logistics / Delivery",
    icon: Truck,
    questions: [
      {
        id: "daily_deliveries",
        question: "How many deliveries do you make daily?",
        options: [
          { value: "100+", label: "100+ deliveries", points: 20 },
          { value: "50-100", label: "50-100 deliveries", points: 15 },
          { value: "20-50", label: "20-50 deliveries", points: 10 },
          { value: "0-20", label: "Under 20 deliveries", points: 5 },
        ],
      },
      {
        id: "route_optimization",
        question: "How do you plan delivery routes?",
        options: [
          { value: "ai", label: "AI-powered route optimization", points: 20 },
          { value: "software", label: "Route planning software", points: 15 },
          { value: "manual", label: "Manual planning", points: 10 },
          { value: "driver", label: "Driver decides", points: 5 },
        ],
      },
      {
        id: "tracking",
        question: "Do you offer real-time tracking?",
        options: [
          { value: "customer", label: "Customer-facing real-time tracking", points: 20 },
          { value: "internal", label: "Internal tracking only", points: 15 },
          { value: "manual", label: "Manual status updates", points: 10 },
          { value: "none", label: "No tracking", points: 0 },
        ],
      },
      {
        id: "dispatch",
        question: "How do you dispatch drivers?",
        options: [
          { value: "automated", label: "Automated dispatch system", points: 20 },
          { value: "software", label: "Dispatch software", points: 15 },
          { value: "manual", label: "Manual assignment", points: 10 },
          { value: "adhoc", label: "Ad-hoc coordination", points: 5 },
        ],
      },
      {
        id: "proof_delivery",
        question: "How do you capture proof of delivery?",
        options: [
          { value: "digital", label: "Digital signature + photo", points: 20 },
          { value: "signature", label: "Digital signature", points: 15 },
          { value: "paper", label: "Paper signature", points: 5 },
          { value: "none", label: "No proof of delivery", points: 0 },
        ],
      },
      {
        id: "customer_communication",
        question: "How do you communicate with customers?",
        options: [
          { value: "automated", label: "Automated notifications", points: 20 },
          { value: "manual", label: "Manual updates", points: 10 },
          { value: "phone", label: "Phone calls only", points: 5 },
          { value: "none", label: "Minimal communication", points: 0 },
        ],
      },
      {
        id: "fleet_management",
        question: "How do you manage your fleet?",
        options: [
          { value: "system", label: "Fleet management system", points: 20 },
          { value: "tracking", label: "GPS tracking", points: 15 },
          { value: "manual", label: "Manual logs", points: 10 },
          { value: "none", label: "No fleet management", points: 5 },
        ],
      },
      {
        id: "on_time_rate",
        question: "What's your on-time delivery rate?",
        options: [
          { value: "95+", label: "95%+ (Excellent)", points: 20 },
          { value: "85-95", label: "85-95% (Good)", points: 15 },
          { value: "75-85", label: "75-85% (Average)", points: 10 },
          { value: "0-75", label: "Under 75%", points: 5 },
        ],
      },
    ],
  },
  {
    value: "creative",
    label: "Creative Agency",
    icon: Palette,
    questions: [
      {
        id: "active_projects",
        question: "How many active projects do you have?",
        options: [
          { value: "15+", label: "15+ projects", points: 20 },
          { value: "8-15", label: "8-15 projects", points: 15 },
          { value: "3-8", label: "3-8 projects", points: 10 },
          { value: "0-3", label: "Under 3 projects", points: 5 },
        ],
      },
      {
        id: "project_management",
        question: "How do you manage projects?",
        options: [
          { value: "pm_tool", label: "Project management tool", points: 20 },
          { value: "spreadsheet", label: "Spreadsheets", points: 10 },
          { value: "email", label: "Email threads", points: 5 },
          { value: "adhoc", label: "Ad-hoc tracking", points: 0 },
        ],
      },
      {
        id: "client_feedback",
        question: "How do you collect client feedback?",
        options: [
          { value: "platform", label: "Feedback platform with versioning", points: 20 },
          { value: "structured", label: "Structured review process", points: 15 },
          { value: "email", label: "Email back-and-forth", points: 10 },
          { value: "calls", label: "Phone calls only", points: 5 },
        ],
      },
      {
        id: "asset_management",
        question: "How do you manage creative assets?",
        options: [
          { value: "dam", label: "Digital Asset Management system", points: 20 },
          { value: "cloud", label: "Cloud storage with organization", points: 15 },
          { value: "folders", label: "Basic folder structure", points: 10 },
          { value: "scattered", label: "Scattered files", points: 5 },
        ],
      },
      {
        id: "time_tracking",
        question: "Do you track time per project?",
        options: [
          { value: "automated", label: "Automated time tracking", points: 20 },
          { value: "manual", label: "Manual time logs", points: 15 },
          { value: "estimates", label: "Rough estimates", points: 5 },
          { value: "none", label: "Don't track time", points: 0 },
        ],
      },
      {
        id: "client_portal",
        question: "Do you have a client portal?",
        options: [
          { value: "full", label: "Full portal with files + communication", points: 20 },
          { value: "basic", label: "Basic file sharing", points: 15 },
          { value: "email", label: "Email only", points: 5 },
          { value: "none", label: "No portal", points: 0 },
        ],
      },
      {
        id: "proposals",
        question: "How do you create proposals?",
        options: [
          { value: "automated", label: "Automated with templates", points: 20 },
          { value: "templates", label: "Manual with templates", points: 15 },
          { value: "scratch", label: "From scratch", points: 10 },
          { value: "basic", label: "Basic documents", points: 5 },
        ],
      },
      {
        id: "profitability",
        question: "Do you track project profitability?",
        options: [
          { value: "realtime", label: "Real-time tracking", points: 20 },
          { value: "post", label: "Post-project analysis", points: 15 },
          { value: "rough", label: "Rough estimates", points: 10 },
          { value: "none", label: "Don't track profitability", points: 0 },
        ],
      },
    ],
  },
  {
    value: "fitness",
    label: "Fitness / Wellness",
    icon: Users,
    questions: [
      {
        id: "active_members",
        question: "How many active members do you have?",
        options: [
          { value: "500+", label: "500+ members", points: 20 },
          { value: "200-500", label: "200-500 members", points: 15 },
          { value: "50-200", label: "50-200 members", points: 10 },
          { value: "0-50", label: "Under 50 members", points: 5 },
        ],
      },
      {
        id: "booking_system",
        question: "How do members book classes/sessions?",
        options: [
          { value: "app", label: "Mobile app with automation", points: 20 },
          { value: "online", label: "Online booking system", points: 15 },
          { value: "phone", label: "Phone bookings", points: 10 },
          { value: "walkin", label: "Walk-ins only", points: 5 },
        ],
      },
      {
        id: "member_tracking",
        question: "How do you track member progress?",
        options: [
          { value: "software", label: "Fitness tracking software", points: 20 },
          { value: "manual", label: "Manual records", points: 15 },
          { value: "basic", label: "Basic attendance", points: 10 },
          { value: "none", label: "Don't track progress", points: 0 },
        ],
      },
      {
        id: "payments",
        question: "How do you handle membership payments?",
        options: [
          { value: "automated", label: "Automated recurring billing", points: 20 },
          { value: "online", label: "Online payments", points: 15 },
          { value: "manual", label: "Manual invoicing", points: 10 },
          { value: "cash", label: "Cash/check only", points: 5 },
        ],
      },
      {
        id: "communication",
        question: "How do you communicate with members?",
        options: [
          { value: "app", label: "App with push notifications", points: 20 },
          { value: "email_sms", label: "Email + SMS", points: 15 },
          { value: "email", label: "Email only", points: 10 },
          { value: "inperson", label: "In-person only", points: 5 },
        ],
      },
      {
        id: "retention",
        question: "What's your member retention rate?",
        options: [
          { value: "80+", label: "80%+ (Excellent)", points: 20 },
          { value: "60-80", label: "60-80% (Good)", points: 15 },
          { value: "40-60", label: "40-60% (Average)", points: 10 },
          { value: "0-40", label: "Under 40%", points: 5 },
        ],
      },
      {
        id: "engagement",
        question: "How do you engage inactive members?",
        options: [
          { value: "automated", label: "Automated re-engagement campaigns", points: 20 },
          { value: "manual", label: "Manual outreach", points: 10 },
          { value: "passive", label: "Passive reminders", points: 5 },
          { value: "none", label: "No engagement strategy", points: 0 },
        ],
      },
      {
        id: "capacity",
        question: "How do you manage class capacity?",
        options: [
          { value: "automated", label: "Automated with waitlists", points: 20 },
          { value: "system", label: "Booking system limits", points: 15 },
          { value: "manual", label: "Manual tracking", points: 10 },
          { value: "none", label: "No capacity management", points: 5 },
        ],
      },
    ],
  },
  {
    value: "hospitality",
    label: "Hotel / Hospitality",
    icon: Hotel,
    questions: [
      {
        id: "occupancy",
        question: "What's your average occupancy rate?",
        options: [
          { value: "80+", label: "80%+ (Excellent)", points: 20 },
          { value: "60-80", label: "60-80% (Good)", points: 15 },
          { value: "40-60", label: "40-60% (Average)", points: 10 },
          { value: "0-40", label: "Under 40%", points: 5 },
        ],
      },
      {
        id: "booking_system",
        question: "How do guests book rooms?",
        options: [
          { value: "integrated", label: "Integrated booking engine + OTAs", points: 20 },
          { value: "online", label: "Online booking system", points: 15 },
          { value: "phone", label: "Phone bookings", points: 10 },
          { value: "walkin", label: "Walk-ins only", points: 5 },
        ],
      },
      {
        id: "pms",
        question: "Do you use a Property Management System?",
        options: [
          { value: "cloud", label: "Cloud-based PMS", points: 20 },
          { value: "onprem", label: "On-premise PMS", points: 15 },
          { value: "basic", label: "Basic software", points: 10 },
          { value: "manual", label: "Manual management", points: 5 },
        ],
      },
      {
        id: "guest_communication",
        question: "How do you communicate with guests?",
        options: [
          { value: "automated", label: "Automated pre/post-stay messages", points: 20 },
          { value: "email", label: "Email confirmations", points: 15 },
          { value: "phone", label: "Phone calls", points: 10 },
          { value: "checkin", label: "At check-in only", points: 5 },
        ],
      },
      {
        id: "reviews",
        question: "How do you manage guest reviews?",
        options: [
          { value: "automated", label: "Automated review requests + monitoring", points: 20 },
          { value: "manual", label: "Manual review requests", points: 10 },
          { value: "passive", label: "Passive collection", points: 5 },
          { value: "none", label: "Don't manage reviews", points: 0 },
        ],
      },
      {
        id: "housekeeping",
        question: "How do you manage housekeeping?",
        options: [
          { value: "software", label: "Housekeeping management software", points: 20 },
          { value: "digital", label: "Digital checklists", points: 15 },
          { value: "paper", label: "Paper logs", points: 10 },
          { value: "adhoc", label: "Ad-hoc coordination", points: 5 },
        ],
      },
      {
        id: "upselling",
        question: "Do you upsell services/amenities?",
        options: [
          { value: "automated", label: "Automated upsell campaigns", points: 20 },
          { value: "checkin", label: "At check-in", points: 15 },
          { value: "passive", label: "Passive (signage only)", points: 5 },
          { value: "none", label: "No upselling", points: 0 },
        ],
      },
      {
        id: "guest_satisfaction",
        question: "What's your guest satisfaction score?",
        options: [
          { value: "9+", label: "9+ / 10 (Excellent)", points: 20 },
          { value: "8-9", label: "8-9 / 10 (Good)", points: 15 },
          { value: "7-8", label: "7-8 / 10 (Average)", points: 10 },
          { value: "0-7", label: "Under 7 / 10", points: 5 },
        ],
      },
    ],
  },
  {
    value: "salon",
    label: "Salon / Spa",
    icon: Scissors,
    questions: [
      {
        id: "daily_clients",
        question: "How many clients do you serve daily?",
        options: [
          { value: "30+", label: "30+ clients", points: 20 },
          { value: "15-30", label: "15-30 clients", points: 15 },
          { value: "5-15", label: "5-15 clients", points: 10 },
          { value: "0-5", label: "Under 5 clients", points: 5 },
        ],
      },
      {
        id: "booking_system",
        question: "How do clients book appointments?",
        options: [
          { value: "online", label: "Online booking with reminders", points: 20 },
          { value: "phone", label: "Phone bookings", points: 10 },
          { value: "walkin", label: "Walk-ins only", points: 5 },
          { value: "mixed", label: "Mix of methods", points: 15 },
        ],
      },
      {
        id: "client_records",
        question: "How do you track client preferences?",
        options: [
          { value: "software", label: "Salon software with history", points: 20 },
          { value: "digital", label: "Digital notes", points: 15 },
          { value: "paper", label: "Paper cards", points: 10 },
          { value: "memory", label: "Staff memory", points: 5 },
        ],
      },
      {
        id: "no_shows",
        question: "What's your no-show rate?",
        options: [
          { value: "0-5", label: "0-5% (Excellent)", points: 20 },
          { value: "5-10", label: "5-10% (Good)", points: 15 },
          { value: "10-20", label: "10-20% (Needs work)", points: 10 },
          { value: "20+", label: "Over 20%", points: 5 },
        ],
      },
      {
        id: "retail",
        question: "Do you sell retail products?",
        options: [
          { value: "tracked", label: "Yes, with inventory tracking", points: 20 },
          { value: "yes", label: "Yes, basic tracking", points: 15 },
          { value: "limited", label: "Limited products", points: 10 },
          { value: "no", label: "No retail sales", points: 5 },
        ],
      },
      {
        id: "loyalty",
        question: "Do you have a loyalty program?",
        options: [
          { value: "digital", label: "Digital loyalty program", points: 20 },
          { value: "punch", label: "Punch cards", points: 10 },
          { value: "informal", label: "Informal rewards", points: 5 },
          { value: "none", label: "No loyalty program", points: 0 },
        ],
      },
      {
        id: "marketing",
        question: "How do you market to clients?",
        options: [
          { value: "automated", label: "Automated email/SMS campaigns", points: 20 },
          { value: "social", label: "Social media", points: 15 },
          { value: "passive", label: "Word of mouth only", points: 5 },
          { value: "none", label: "No marketing", points: 0 },
        ],
      },
      {
        id: "rebooking",
        question: "What's your rebooking rate?",
        options: [
          { value: "70+", label: "70%+ (Excellent)", points: 20 },
          { value: "50-70", label: "50-70% (Good)", points: 15 },
          { value: "30-50", label: "30-50% (Average)", points: 10 },
          { value: "0-30", label: "Under 30%", points: 5 },
        ],
      },
    ],
  },
  {
    value: "tech",
    label: "IT Services / Tech",
    icon: Laptop,
    questions: [
      {
        id: "active_clients",
        question: "How many active clients do you support?",
        options: [
          { value: "50+", label: "50+ clients", points: 20 },
          { value: "20-50", label: "20-50 clients", points: 15 },
          { value: "10-20", label: "10-20 clients", points: 10 },
          { value: "0-10", label: "Under 10 clients", points: 5 },
        ],
      },
      {
        id: "ticketing",
        question: "How do you manage support tickets?",
        options: [
          { value: "system", label: "Ticketing system with SLAs", points: 20 },
          { value: "basic", label: "Basic ticketing", points: 15 },
          { value: "email", label: "Email only", points: 10 },
          { value: "adhoc", label: "Ad-hoc requests", points: 5 },
        ],
      },
      {
        id: "monitoring",
        question: "Do you proactively monitor client systems?",
        options: [
          { value: "automated", label: "Automated monitoring + alerts", points: 20 },
          { value: "manual", label: "Manual checks", points: 10 },
          { value: "reactive", label: "Reactive only", points: 5 },
          { value: "none", label: "No monitoring", points: 0 },
        ],
      },
      {
        id: "documentation",
        question: "How do you document client systems?",
        options: [
          { value: "comprehensive", label: "Comprehensive + up-to-date", points: 20 },
          { value: "basic", label: "Basic documentation", points: 15 },
          { value: "scattered", label: "Scattered notes", points: 10 },
          { value: "none", label: "No documentation", points: 0 },
        ],
      },
      {
        id: "billing",
        question: "How do you bill clients?",
        options: [
          { value: "automated", label: "Automated time tracking + billing", points: 20 },
          { value: "manual", label: "Manual time logs", points: 15 },
          { value: "flat", label: "Flat rate only", points: 10 },
          { value: "adhoc", label: "Ad-hoc billing", points: 5 },
        ],
      },
      {
        id: "response_time",
        question: "What's your average response time?",
        options: [
          { value: "1hr", label: "Under 1 hour", points: 20 },
          { value: "4hr", label: "1-4 hours", points: 15 },
          { value: "24hr", label: "4-24 hours", points: 10 },
          { value: "24hr+", label: "Over 24 hours", points: 5 },
        ],
      },
      {
        id: "client_portal",
        question: "Do you have a client portal?",
        options: [
          { value: "full", label: "Full portal with tickets + docs", points: 20 },
          { value: "basic", label: "Basic portal", points: 15 },
          { value: "email", label: "Email only", points: 5 },
          { value: "none", label: "No portal", points: 0 },
        ],
      },
      {
        id: "satisfaction",
        question: "What's your client satisfaction score?",
        options: [
          { value: "9+", label: "9+ / 10 (Excellent)", points: 20 },
          { value: "8-9", label: "8-9 / 10 (Good)", points: 15 },
          { value: "7-8", label: "7-8 / 10 (Average)", points: 10 },
          { value: "0-7", label: "Under 7 / 10", points: 5 },
        ],
      },
    ],
  },
]

export default function HealthScorePage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("")
  const [showResults, setShowResults] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllIndustries, setShowAllIndustries] = useState(false)

  useEffect(() => {
    detectUserCurrency().then(setCurrency)
  }, [])

  useEffect(() => {
    if (!showResults && (businessName || email || selectedIndustry || Object.keys(answers).length > 0)) {
      const saveData = {
        businessName,
        email,
        selectedIndustry,
        answers,
        currency,
        step,
        timestamp: Date.now(),
      }
      localStorage.setItem("healthScoreProgress", JSON.stringify(saveData))
    }
  }, [businessName, email, selectedIndustry, answers, currency, step, showResults])

  useEffect(() => {
    const saved = localStorage.getItem("healthScoreProgress")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Only load if less than 7 days old
        if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setBusinessName(parsed.businessName || "")
          setEmail(parsed.email || "")
          setSelectedIndustry(parsed.selectedIndustry || "")
          setAnswers(parsed.answers || {})
          setCurrency(parsed.currency || "USD")
          // Don't restore step or showResults - always start fresh
        }
      } catch (e) {
        console.error("Failed to load saved progress:", e)
      }
    }
  }, [])

  const industryConfig = industries.find((i) => i.value === selectedIndustry)
  const currentQuestion = industryConfig?.questions[step - 2] // step 0 = business info, step 1 = industry, step 2+ = questions

  const filteredIndustries = industries.filter((industry) =>
    industry.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const popularIndustries = filteredIndustries.slice(0, 8)
  const remainingIndustries = filteredIndustries.slice(8)

  const handleAnswer = (value: string) => {
    if (currentQuestion) {
      setAnswers({ ...answers, [currentQuestion.id]: value })
    }
  }

  const handleNext = () => {
    if (industryConfig && step - 2 < industryConfig.questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResults(true)
      localStorage.removeItem("healthScoreProgress")
      sendAssessmentToCompany()
    }
  }

  const handleBack = () => {
    if (step > 2) {
      setStep(step - 1)
    } else if (step === 2) {
      setStep(1) // Back to industry selection
    }
  }

  const calculateScore = () => {
    if (!industryConfig) return 0
    let totalScore = 0
    industryConfig.questions.forEach((q) => {
      const answer = answers[q.id]
      const option = q.options.find((opt) => opt.value === answer)
      if (option) {
        totalScore += option.points
      }
    })
    const maxScore = industryConfig.questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0)
    return Math.round((totalScore / maxScore) * 100)
  }

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-primary", bg: "bg-primary/10", icon: CheckCircle2 }
    if (score >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50", icon: TrendingUp }
    if (score >= 40)
      return { label: "Needs Improvement", color: "text-orange-600", bg: "bg-orange-50", icon: AlertTriangle }
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle }
  }

  const calculateCategoryScores = () => {
    if (!industryConfig) return { growth: 0, operations: 0, experience: 0 }

    // Divide the 8 questions into 3 logical buckets
    // Q0-Q2: Growth/Sales (Index 0,1,2)
    // Q3-Q5: Operations/Systems (Index 3,4,5)
    // Q6-Q7: Customer Experience (Index 6,7)

    const getBucketScore = (start: number, end: number) => {
      let bucketTotal = 0;
      let bucketMax = 0;
      for (let i = start; i <= Math.min(end, industryConfig.questions.length - 1); i++) {
        const q = industryConfig.questions[i];
        if (!q) continue;
        const answer = answers[q.id];
        const option = q.options.find(opt => opt.value === answer);
        if (option) bucketTotal += option.points;
        bucketMax += Math.max(...q.options.map((o) => o.points));
      }
      return bucketMax === 0 ? 0 : Math.round((bucketTotal / bucketMax) * 100);
    }

    return {
      growth: getBucketScore(0, 2),
      operations: getBucketScore(3, 5),
      experience: getBucketScore(6, 7)
    }
  }

  const getRecommendations = () => {
    if (!industryConfig) return []

    const recs: Array<{ title: string; description: string; impact: string; service: string }> = []

    // Industry-specific recommendations based on answers
    industryConfig.questions.forEach((q) => {
      const answer = answers[q.id]
      const option = q.options.find((opt) => opt.value === answer)

      if (option && option.points <= 10) {
        // Low score answers get recommendations
        recs.push({
          title: `Improve: ${q.question.replace("?", "")}`,
          description: `Your current level needs attention. This is a key metric for ${industryConfig.label} businesses.`,
          impact: option.points === 0 ? "Critical" : option.points <= 5 ? "High" : "Medium",
          service: "Ramply Automation Suite",
        })
      }
    })

    return recs.slice(0, 4)
  }

  const handleDownloadReport = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    // Header
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

    // Business info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(businessName || "Your Business", pageWidth / 2, yPos, { align: "center" })
    yPos += 8
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(`Industry: ${industryConfig?.label || "N/A"}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 5
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 15

    // Score
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

    // Recommendations
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Your Personalized Action Plan", 15, yPos)
    yPos += 10

    const recommendations = getRecommendations()

    recommendations.forEach((rec) => {
      if (yPos > pageHeight - 50) {
        doc.addPage()
        yPos = 20
      }

      let badgeColor: [number, number, number] = [61, 184, 154]
      if (rec.impact === "Critical") badgeColor = [220, 38, 38]
      else if (rec.impact === "High") badgeColor = [234, 88, 12]
      else if (rec.impact === "Medium") badgeColor = [37, 99, 235]

      doc.setFillColor(245, 245, 245)
      doc.roundedRect(15, yPos, pageWidth - 30, 35, 2, 2, "F")

      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(0, 0, 0)
      doc.text(rec.title, 20, yPos + 8)

      doc.setFillColor(...badgeColor)
      doc.roundedRect(pageWidth - 55, yPos + 3, 35, 6, 2, 2, "F")
      doc.setFontSize(8)
      doc.setTextColor(255, 255, 255)
      doc.text(`${rec.impact} Impact`, pageWidth - 37.5, yPos + 7, { align: "center" })

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(80, 80, 80)
      const descLines = doc.splitTextToSize(rec.description, pageWidth - 50)
      doc.text(descLines, 20, yPos + 15)

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

    const cleanBizName = (businessName || "Your-Business")
      .replace(/[^a-zA-Z0-9-]/g, "-") // Replace any non-alphanumeric chars with dashes
      .replace(/-+/g, "-") // Clean up multiple dashes
      .replace(/^-|-$/g, ""); // Trim dashes from start/end

    const dateStr = new Date().toISOString().split("T")[0];
    const fileName = `Ramply-Health-Report-${cleanBizName}-${dateStr}.pdf`;

    doc.save(fileName);
  }

  const handleShare = (platform: string) => {
    const score = calculateScore()
    const url = window.location.href
    const text = `I just scored ${score}/100 on the Ramply Work Business Health Assessment! Check yours: ${url}`

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
        break
      case "email":
        window.location.href = `mailto:?subject=My Business Health Score&body=${encodeURIComponent(text)}`
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(text)
        alert("Link copied to clipboard!")
        break
    }
  }

  const score = showResults ? calculateScore() : 0
  const category = showResults ? getScoreCategory(score) : null
  const recommendations = showResults ? getRecommendations() : []

  const sendAssessmentToCompany = async () => {
    const score = calculateScore()
    const category = getScoreCategory(score)
    const recommendations = getRecommendations()

    const answersText = industryConfig?.questions
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
    formData.append("industry", industryConfig?.label || "N/A")
    formData.append("score", score.toString())
    formData.append("category", category.label)
    formData.append("currency", currency)
    formData.append(
      "message",
      `NEW BUSINESS HEALTH ASSESSMENT SUBMISSION

Business Name: ${businessName}
Industry: ${industryConfig?.label || "N/A"}
Contact Email: ${email}
Currency: ${currency}
Health Score: ${score}/100
Category: ${category.label}

=== ASSESSMENT ANSWERS ===

${answersText}

=== PERSONALIZED RECOMMENDATIONS ===

${recommendationsText}

=== QUICK STATS ===
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
    const categoryScores = calculateCategoryScores()

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header / Score Display */}
            <div className="grid lg:grid-cols-[1fr_300px] gap-8 mb-8">
              <Card className="overflow-hidden border-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center md:text-left mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-semibold">Your Results Are Ready</span>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">Business Health Score</h1>
                      <p className="text-muted-foreground text-lg mb-1">{businessName || "Your Business"}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 md:justify-start justify-center">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        {industryConfig?.label}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative w-40 h-40 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="72"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="none"
                            className="text-muted/30"
                          />
                          <motion.circle
                            cx="80"
                            cy="80"
                            r="72"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 72}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 72 }}
                            animate={{ strokeDashoffset: `${2 * Math.PI * 72 * (1 - score / 100)}` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={category?.color}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-4xl font-bold"
                          >
                            {score}
                          </motion.span>
                          <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">out of 100</span>
                        </div>
                      </div>

                      {category && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm ${category.bg}`}
                        >
                          <category.icon className={`h-4 w-4 ${category.color}`} />
                          <span className={`font-semibold ${category.color}`}>{category.label} Score</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-6 border-t border-border/50">
                    <Button variant="outline" size="sm" onClick={() => handleShare("whatsapp")} className="gap-2">
                      <Share2 className="h-4 w-4 text-primary" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("email")} className="gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")} className="gap-2">
                      <Share2 className="h-4 w-4 text-primary" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare("copy")} className="gap-2">
                      <Copy className="h-4 w-4 text-primary" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                <h3 className="text-lg font-bold mb-2">Category Breakdown</h3>
                {[
                  { key: "growth", label: "Growth & Sales", score: categoryScores.growth, icon: TrendingUp },
                  { key: "operations", label: "Systems & Ops", score: categoryScores.operations, icon: Zap },
                  { key: "experience", label: "Customer Exp.", score: categoryScores.experience, icon: Users },
                ].map((cat, i) => (
                  <Card key={cat.key} className="overflow-hidden border border-border/50 shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <cat.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{cat.label}</p>
                          <div className="w-32 h-1.5 mt-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.score}%` }}
                              transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                              className={`h-full ${cat.score >= 80 ? 'bg-primary' : cat.score >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{cat.score}</span>
                        <span className="text-xs text-muted-foreground block">/100</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Your Personalized Action Plan</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:border-primary/30 group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm ${rec.impact === "Critical"
                                  ? "bg-red-100 text-red-700"
                                  : rec.impact === "High"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-blue-100 text-blue-700"
                                  }`}
                              >
                                {rec.impact} Priority
                              </span>
                            </div>
                            <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-primary transition-colors">{rec.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{rec.description}</p>

                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1.5 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Solution: {rec.service}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic CTA Section */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-8 md:p-12 text-center relative z-10">
                {score < 50 ? (
                  <>
                    <h3 className="text-3xl font-bold mb-4">Your Business Needs Urgent Systems</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                      Based on your score of {score}/100, manual work and lack of systems are costing you serious time and money right now. Let's fix this before it bottlenecks your growth further.
                    </p>
                  </>
                ) : score < 75 ? (
                  <>
                    <h3 className="text-3xl font-bold mb-4">You're Halfway to Scale-Ready</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                      You have a solid foundation with a {score}/100 score, but there are clear gaps in your automation. Let's build a roadmap to plug these leaks and accelerate your growth.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold mb-4">You're Ready for Hyper-Scale!</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                      An excellent score of {score}/100 means your foundation is strong. Now it's time to layer in advanced automations and data tracking to scale without adding headcount.
                    </p>
                  </>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 shadow-md hover:shadow-lg hover:scale-105 transition-all" asChild>
                    <a href="/contact">Book Free Strategy Call</a>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-background hover:bg-muted text-foreground border-border h-14" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 text-primary" />
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

  // Step 0: Business Info
  if (step === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Free Business Assessment</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                How Healthy Is Your Business?
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Get an industry-specific health score and personalized recommendations to accelerate growth in just 2
                minutes.
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
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="h-12">
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
                    <h3 className="font-semibold mb-1">Industry-Specific</h3>
                    <p className="text-sm text-muted-foreground">Questions tailored to your business</p>
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
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Step 1: Industry Selection
  if (step === 1) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Select Your Industry</h2>
              <p className="text-muted-foreground mb-6">
                We'll ask questions specific to your industry for accurate results
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>

            {/* Industry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {popularIndustries.map((industry) => {
                const Icon = industry.icon
                return (
                  <Card
                    key={industry.value}
                    className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
                    onClick={() => {
                      setSelectedIndustry(industry.value)
                      setAnswers({ ...answers, industry: industry.value })
                      setStep(2)
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold text-sm">{industry.label}</h3>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Show More Button */}
            {remainingIndustries.length > 0 && !showAllIndustries && (
              <div className="text-center mb-6">
                <Button variant="outline" onClick={() => setShowAllIndustries(true)} className="gap-2">
                  Show More Industries
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Remaining Industries */}
            {showAllIndustries && remainingIndustries.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {remainingIndustries.map((industry) => {
                  const Icon = industry.icon
                  return (
                    <Card
                      key={industry.value}
                      className="cursor-pointer hover:border-primary hover:shadow-lg transition-all"
                      onClick={() => {
                        setSelectedIndustry(industry.value)
                        setAnswers({ ...answers, industry: industry.value })
                        setStep(2)
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold text-sm">{industry.label}</h3>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            <div className="text-center">
              <Button variant="outline" onClick={() => setStep(0)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Step 2+: Questions
  if (currentQuestion) {
    const progress = ((step - 1) / (industryConfig!.questions.length + 1)) * 100

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {step - 1} of {industryConfig!.questions.length}
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
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${answers[currentQuestion.id] === option.value
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
                    <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!answers[currentQuestion.id]}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {step - 2 === industryConfig!.questions.length - 1 ? "See Results" : "Next"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return null
}
