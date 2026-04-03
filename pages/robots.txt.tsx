import { GetServerSideProps } from 'next'

const SITE_URL = 'https://secureminds-blog.vercel.app'

export default function Robots() { return null }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin routes
Disallow: /api/
`)
  res.end()
  return { props: {} }
}
