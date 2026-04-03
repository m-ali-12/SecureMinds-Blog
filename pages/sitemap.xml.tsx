import { GetServerSideProps } from 'next'
import { posts, categoryMeta } from '../../data/posts'

const SITE_URL = 'https://secureminds-blog.vercel.app'

function generateSitemap() {
  const staticPages = [
    { url: SITE_URL, priority: '1.0', changefreq: 'daily' },
    ...Object.keys(categoryMeta).map(cat => ({
      url: `${SITE_URL}/category/${cat}`,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    ...posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      priority: '0.9',
      changefreq: 'monthly',
      lastmod: post.date,
    })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('')}
</urlset>`
}

export default function Sitemap() { return null }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(generateSitemap())
  res.end()
  return { props: {} }
}
