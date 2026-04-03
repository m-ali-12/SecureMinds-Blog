import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { posts, getPostBySlug, categoryMeta, Post } from '../../data/posts'

export default function BlogPost({ post, related }: { post: Post; related: Post[] }) {
  if (!post) return null
  const cat = categoryMeta[post.category]

  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('## ')) return <h2 key={i} className="font-display font-bold text-white text-2xl mt-10 mb-4 pb-3 border-b border-[#2a2a45]">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="font-display font-semibold text-[#c8ff00] text-lg mt-7 mb-3">{line.slice(4)}</h3>
        if (line.startsWith('```')) return null
        if (line.startsWith('| ')) {
          return <div key={i} className="font-mono text-sm text-[#8888aa] border-b border-[#2a2a45] py-2 grid grid-cols-3 gap-4">{line.split('|').filter(Boolean).map((cell, j) => <span key={j}>{cell.trim()}</span>)}</div>
        }
        if (line.startsWith('- ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
          return <li key={i} className="text-[#aaaacc] mb-1 ml-4 list-disc">{line.replace(/^[\d]+\. |-/, '').trim()}</li>
        }
        if (line.trim() === '') return <div key={i} className="h-3" />
        if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="text-white font-semibold block mb-2">{line.slice(2, -2)}</strong>
        return <p key={i} className="text-[#aaaacc] leading-relaxed mb-1">{line}</p>
      })
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        canonical={`https://secureminds-blog.vercel.app/blog/${post.slug}`}
        article={{ publishedTime: post.date, author: post.author, tags: post.tags }}
      />
      <Navbar />

      <main className="pt-24">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/category/${post.category}`}>
              <span className={`badge ${cat.color} hover:opacity-80 cursor-pointer`}>{cat.icon} {cat.label}</span>
            </Link>
            {post.difficulty && (
              <span className="text-xs font-mono border border-[#2a2a45] text-[#8888aa] px-3 py-1 rounded">
                {post.difficulty}
              </span>
            )}
          </div>

          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-[#8888aa] text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center gap-6 text-sm text-[#8888aa] font-mono pb-8 border-b border-[#2a2a45]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#c8ff00] rounded-full flex items-center justify-center text-[#0a0a0f] text-xs font-bold">S</div>
              <span>{post.author}</span>
            </div>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span className="text-[#c8ff00]">{post.readTime}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-mono bg-[#1a1a2e] text-[#8888aa] border border-[#2a2a45] px-3 py-1 rounded-full hover:border-[#c8ff00]/30 hover:text-[#c8ff00] transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 pb-16">
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Share & Navigation */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="flex items-center justify-between py-8 border-t border-b border-[#2a2a45]">
            <div>
              <div className="text-xs text-[#8888aa] font-mono mb-2">Share this article</div>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Copy Link'].map(s => (
                  <button key={s} className="text-xs font-mono bg-[#1a1a2e] border border-[#2a2a45] text-[#8888aa] hover:text-[#c8ff00] hover:border-[#c8ff00]/30 px-3 py-2 rounded-lg transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Link href="/" className="text-sm text-[#8888aa] hover:text-[#c8ff00] transition-colors font-mono">
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-8">
              <div className="text-[#c8ff00] font-mono text-xs tracking-widest uppercase mb-1">// More Reading</div>
              <h2 className="font-display font-bold text-white text-2xl">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                  <article className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-6 card-hover h-full">
                    <span className={`badge ${categoryMeta[p.category].color} mb-3 inline-block`}>
                      {categoryMeta[p.category].icon} {categoryMeta[p.category].label}
                    </span>
                    <h3 className="text-white font-display font-semibold text-sm leading-tight mb-3 group-hover:text-[#c8ff00] transition-colors line-clamp-2">{p.title}</h3>
                    <div className="text-xs text-[#8888aa] font-mono">{p.readTime}</div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: posts.map(p => ({ params: { slug: p.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string)
  if (!post) return { notFound: true }
  const related = posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  return { props: { post, related } }
}
