import { Card } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center bg-accent/50 p-6 md:p-8 text-center transition-all hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 md:h-8 md:w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM20 3h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 14H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1zM20 14h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Automation Services</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Automated workflows for follow-ups, reminders, and data collection
            </p>
          </Card>

          <Card className="flex flex-col items-center justify-center bg-accent/50 p-6 md:p-8 text-center transition-all hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 md:h-8 md:w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Business Strategy</h3>
            <p className="mt-2 text-sm text-muted-foreground">Growth strategies and customer re-engagement systems</p>
          </Card>

          <Card className="flex flex-col items-center justify-center bg-accent/50 p-6 md:p-8 text-center transition-all hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 md:h-8 md:w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Data Tracking & Insights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dashboards and reporting to track performance and customer behavior
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
