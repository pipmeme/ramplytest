export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ramply Work",
    description: "Business automation, workflow optimization, and data tracking services for small businesses",
    url: "https://ramplywork.com",
    founder: {
      "@type": "Person",
      name: "Numan Ashraf",
    },
    areaServed: "Worldwide",
    serviceType: ["Business Automation", "Workflow Optimization", "Data Analytics", "Business Strategy"],
    priceRange: "$$",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
