import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircleQuestion } from "lucide-react"

export function FAQSection() {
  const faqs = [
    {
      question: "What types of businesses do you work with?",
      answer:
        "We work with small to medium-sized businesses across all industries. Whether you're just starting out or looking to scale, our systems adapt to your specific needs and growth stage.",
    },
    {
      question: "How long does it take to set up automation systems?",
      answer:
        "Most automation projects take 1-3 weeks depending on complexity. We start with quick wins that show immediate results, then build more comprehensive systems over time.",
    },
    {
      question: "Do I need technical knowledge to use your systems?",
      answer:
        "Not at all. We build user-friendly systems that your team can use without technical expertise. We also provide training and ongoing support to ensure smooth adoption.",
    },
    {
      question: "What's the difference between your service and a marketing agency?",
      answer:
        "We focus on internal processes, automation, and data tracking - not advertising or general marketing. We help you work more efficiently and make better decisions with your existing operations.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We track concrete metrics like time saved, customer retention rates, revenue growth, and process efficiency. You'll see measurable improvements in your dashboards within the first month.",
    },
    {
      question: "What if I need changes after the initial setup?",
      answer:
        "We provide ongoing support and can adjust systems as your business evolves. Many clients start with one service and expand as they see results.",
    },
  ]

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          {/* Left side - section info */}
          <div className="lg:sticky lg:top-28 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <MessageCircleQuestion className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Everything you need to know about working with Ramply Work. Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact">
              <Button variant="outline" className="group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right side - accordion */}
          <div className="animate-in fade-in slide-in-from-right duration-700 delay-200">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl px-5 data-[state=open]:border-primary/20 data-[state=open]:shadow-lg data-[state=open]:shadow-black/5 transition-all duration-200"
                >
                  <AccordionTrigger className="text-left text-[15px] font-medium hover:text-primary transition-colors py-5 hover:no-underline">
                    <span className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-10">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
