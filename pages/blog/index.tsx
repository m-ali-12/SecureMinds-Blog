import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import SEO from '../components/SEO'
import { posts, categoryMeta } from '../data/posts'
import Link from 'next/link'
import { useState } from 'react'

export default function BlogIndex() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      <SEO title="All Articles — SecureMinds Blog" description="Browse all cybersecurity articles including CTF writeups, ethical hacking tutorials, bug bounty tips, and worldwide security challenges." />
      <Navbar />
      <main className="pt-24 max-w-7xl mx-auto px-6">
        <div className="py-16 border-b border-[#2a2a45] mb-10">
          <div className="text-[#c8ff00] font-mono text-xs tracking-widest uppercase mb-2">// All Articles</div>
          <h1 className="font-display font-extrabold text-white text-4xl mb-3">Security Knowledge Base</h1>
          <p className="text-[#8888aa] text-lg">{posts.length} articles on CTF, ethical hacking, bug bounty & more</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`badge transition-all ${active === 'all' ? 'badge-ctf' : 'bg-[#1a1a2e] border border-[#2a2a45] text-[#8888aa]'}`}
          >
            All ({posts.length})
          </button>
          {Object.entries(categoryMeta).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`badge transition-all ${active === key ? cat.color : 'bg-[#1a1a2e] border border-[#2a2a45] text-[#8888aa]'}`}
            >
              {cat.icon} {cat.label} ({posts.filter(p => p.category === key).length})
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-20">
          {filtered.map(post => <PostCard key={post.slug} post={post} featured />)}
        </div>
      </main>
      <Footer />
    </>
  )
}
