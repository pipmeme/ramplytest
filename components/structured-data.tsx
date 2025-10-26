export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ramply Work",
    alternateName: "Ramply",
    url: "https://ramplywork.com",
    logo: "https://ramplywork.com/ramply-logo.png",
    description:
      "Business automation, workflow optimization, and data tracking services for small businesses. We help businesses scale through process automation, not marketing.",
    founder: {
      "@type": "Person",
      name: "Numan Ashraf",
      jobTitle: "Founder",
    },
    foundingDate: "2025",
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceType: [
      "Business Automation Services",
      "Workflow Optimization",
      "Data Analytics and Tracking",
      "Business Strategy Consulting",
      "Customer Engagement Automation",
      "Business Intelligence Dashboards",
    ],
    knowsAbout: [
      "Business Process Automation",
      "Workflow Management",
      "Customer Relationship Management",
      "Data Analytics",
      "Business Intelligence",
      "Small Business Growth",
      "Scalability Solutions",
    ],
    slogan: "Accelerating Business Growth",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://ramplywork.com/contact",
    },
    sameAs: [],
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ramply Work",
    url: "https://ramplywork.com",
    description: "Business automation and growth solutions for small businesses",
    publisher: {
      "@type": "Organization",
      name: "Ramply Work",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ramplywork.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Business Automation and Growth Services",
    provider: {
      "@type": "Organization",
      name: "Ramply Work",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automation Services",
            description: "Customer follow-ups, reminders, vouchers, and data collection automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Strategy",
            description: "Growth strategies, customer re-engagement, and workflow optimization",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Tracking & Insights",
            description: "Dashboards, reporting, and performance tracking",
          },
        },
      ],
    },
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ramplywork.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: "https://ramplywork.com/solutions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: "https://ramplywork.com/services",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Products",
        item: "https://ramplywork.com/products",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "About",
        item: "https://ramplywork.com/about",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: "https://ramplywork.com/contact",
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
    </>
  )
}
