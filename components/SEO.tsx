import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  article?: {
    publishedTime: string
    author: string
    tags: string[]
  }
  canonical?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://secureminds-blog.vercel.app'
const SITE_NAME = 'SecureMinds Blog'
const DEFAULT_DESC = 'Pakistan\'s premier cybersecurity blog. CTF writeups, ethical hacking tutorials, bug bounty tips, and worldwide security challenges. Learn offensive and defensive security.'
const DEFAULT_IMG = `${SITE_URL}/og-default.png`

export default function SEO({ title, description, keywords = [], ogImage, article, canonical }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Cybersecurity, CTF & Bug Bounty`
  const desc = description || DEFAULT_DESC
  const img = ogImage || DEFAULT_IMG
  const url = canonical || SITE_URL

  const defaultKeywords = [
    'cybersecurity blog', 'CTF writeups', 'ethical hacking tutorials', 'bug bounty tips',
    'penetration testing', 'web security', 'OSCP', 'HackTheBox', 'TryHackMe',
    'security research', 'Pakistan cybersecurity', 'hacking tutorials', 'SQL injection',
    'XSS vulnerability', 'IDOR bug bounty', 'DEF CON CTF', 'Google CTF',
    ...keywords
  ]

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={defaultKeywords.join(', ')} />
      <meta name="author" content="SecureMinds Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:site" content="@SecureMindsBlog" />

      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content="Cybersecurity" />
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: desc,
            image: img,
            datePublished: article.publishedTime,
            author: { '@type': 'Organization', name: 'SecureMinds Team' },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          } : {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: desc,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />

      {/* Favicon */}
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" />
      <meta name="theme-color" content="#0a0a0f" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}
