import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Everything you need to know about working with Ramply Work
          </p>
        </div>

        <div className="mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
