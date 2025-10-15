export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
      <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
            SYSTEMS FOR SCALABILITY.
            <br />
            WORK SMARTER.
          </h1>
          <p className="text-base text-muted-foreground md:text-lg lg:text-xl text-pretty">
            We set up workflows and dashboards to accelerate your business growth
          </p>
        </div>

        <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
          <svg viewBox="0 0 400 300" className="h-auto w-full max-w-sm md:max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Background decorative elements */}
            <circle cx="80" cy="50" r="8" fill="#D1F0E8" opacity="0.5" />
            <circle cx="320" cy="80" r="6" fill="#D1F0E8" opacity="0.5" />
            <circle cx="350" cy="200" r="10" fill="#D1F0E8" opacity="0.5" />
            <path d="M 100 60 Q 120 50 140 55" stroke="#A8E6CF" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 330 100 L 340 110 L 350 100" stroke="#A8E6CF" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Coins stack */}
            <ellipse cx="100" cy="240" rx="35" ry="8" fill="#5DBEA3" />
            <ellipse cx="100" cy="235" rx="35" ry="8" fill="#6ECDB3" />
            <ellipse cx="100" cy="230" rx="35" ry="8" fill="#7FD9BE" />
            <rect x="65" y="230" width="70" height="10" fill="#6ECDB3" />

            {/* Bar chart */}
            <rect x="180" y="200" width="35" height="60" rx="4" fill="#A8E6CF" />
            <rect x="225" y="170" width="35" height="90" rx="4" fill="#7FD9BE" />
            <rect x="270" y="140" width="35" height="120" rx="4" fill="#6ECDB3" />
            <rect x="315" y="100" width="35" height="160" rx="4" fill="#5DBEA3" />

            {/* Line chart overlay */}
            <path d="M 160 220 Q 200 200 240 180 Q 280 150 320 100" stroke="#4CAF93" strokeWidth="3" fill="none" />
            <circle cx="160" cy="220" r="5" fill="#4CAF93" />
            <circle cx="240" cy="180" r="5" fill="#4CAF93" />
            <circle cx="320" cy="100" r="5" fill="#4CAF93" />

            {/* Upward arrow */}
            <path d="M 340 80 L 380 40 L 390 50 L 350 90 Z" fill="#5DBEA3" opacity="0.8" />
            <path d="M 380 40 L 390 50 L 390 30 Z" fill="#5DBEA3" opacity="0.8" />
            <path d="M 380 40 L 370 40 L 390 50 Z" fill="#5DBEA3" opacity="0.8" />

            {/* Mobile/device icon */}
            <rect x="120" y="120" width="60" height="90" rx="6" fill="white" stroke="#E0E0E0" strokeWidth="2" />
            <rect x="130" y="130" width="40" height="50" rx="2" fill="#F0F0F0" />
            <line x1="135" y1="190" x2="165" y2="190" stroke="#E0E0E0" strokeWidth="2" />
            <circle cx="150" cy="200" r="4" fill="#E0E0E0" />
          </svg>
        </div>
      </div>
    </section>
  )
}
