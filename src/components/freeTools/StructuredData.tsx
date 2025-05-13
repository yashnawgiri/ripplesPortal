export function HomePageStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://free-tools.goripples.com/#website",
    name: "Ripples Free Tools",
    url: "https://free-tools.goripples.com",
    description:
      "Free marketing tools to analyze Instagram engagement, discover influencers, and optimize your social media strategy.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://free-tools.goripples.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function InstagramCalculatorStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Instagram Engagement Rate Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Calculate the engagement rate of any Instagram profile for free. Analyze likes, comments, and followers to benchmark performance.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://goripples.com/#organization",
    name: "Ripples",
    url: "https://goripples.com",
    logo: {
      "@type": "ImageObject",
      url: "https://goripples.com/logo.png",
    },
    sameAs: [
      "https://twitter.com/RipplesHQ",
      "https://www.linkedin.com/company/ripples",
      "https://www.instagram.com/rippleshq",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
