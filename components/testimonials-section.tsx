import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Fahad Al-Mutairi",
      role: "CMO, Qahwat Al-Sabah",
      content:
        "Ramply Work transformed our operations. Their automation systems saved us 15 hours per week and increased our customer retention by 40%.",
      rating: 5,
    },
    {
      name: "Mohammad",
      role: "Founder, Nafash Digicom",
      content:
        "The dashboards they built gave us insights we never had before. We can now make data-driven decisions that actually move the needle.",
      rating: 5,
    },
  ]

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Real results from businesses that chose to work smarter
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
