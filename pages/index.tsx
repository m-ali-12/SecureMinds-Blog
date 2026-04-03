import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import SEO from '../components/SEO'
import { posts, getFeaturedPosts, categoryMeta } from '../data/posts'

export default function Home() {
  const featured = getFeaturedPosts().slice(0, 3)
  const latest = posts.slice(0, 6)
  const tickerItems = [
    '🚨 CVE-2024-4671 Chrome Zero-Day — Patch Now',
    '🏆 DEF CON CTF 2024 Registration Opens June',
    '💰 HackerOne Pays $10M in Q1 2024 Bounties',
    '🌍 Google CTF 2024 — June 21-23',
    '📚 New OWASP Top 10 2024 Draft Released',
    '🔥 PicoCTF 2024 Winners Announced',
  ]

  return (
    <>
      <SEO />
      <Navbar />

      {/* News Ticker */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#c8ff00] py-1.5 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[#0a0a0f] text-xs font-mono font-semibold px-8 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(#c8ff00 1px, transparent 1px), linear-gradient(90deg, #c8ff00 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Glow orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8ff00]/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00]/10 border border-[#c8ff00]/30 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-[#c8ff00] rounded-full animate-pulse"></span>
              <span className="text-[#c8ff00] text-xs font-mono font-semibold tracking-widest uppercase">
                Live Security Research
              </span>
            </div>

            <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-none mb-6 animate-fade-up delay-1" style={{animationDelay:'0.1s'}}>
              Hack Smart.<br />
              <span className="gradient-text">Think Secure.</span>
            </h1>

            <p className="text-[#8888aa] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-fade-up delay-2" style={{animationDelay:'0.2s'}}>
              Pakistan's #1 cybersecurity blog. CTF writeups, ethical hacking tutorials,
              bug bounty tips, and worldwide security challenges — all in one place.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{animationDelay:'0.3s'}}>
              <Link href="/category/ctf" className="px-6 py-3 bg-[#c8ff00] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#9fcc00] transition-colors text-sm">
                🚩 Read CTF Writeups
              </Link>
              <Link href="/category/bugbounty" className="px-6 py-3 border border-[#2a2a45] text-[#aaaacc] rounded-lg hover:border-[#c8ff00]/50 hover:text-[#c8ff00] transition-colors text-sm">
                💰 Bug Bounty Tips
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#2a2a45] max-w-lg">
              {[
                { num: '50+', label: 'Articles Published' },
                { num: '20+', label: 'CTF Writeups' },
                { num: '10K+', label: 'Monthly Readers' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-[#c8ff00]">{s.num}</div>
                  <div className="text-xs text-[#8888aa] font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryMeta).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className={`badge ${cat.color} hover:scale-105 transition-transform cursor-pointer`}
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Posts Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[#c8ff00] font-mono text-xs tracking-widest uppercase mb-1">// Featured</div>
              <h2 className="font-display font-bold text-white text-2xl">Top Picks This Week</h2>
            </div>
            <Link href="/blog" className="text-[#8888aa] hover:text-[#c8ff00] text-sm font-mono transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((post, i) => (
              <div key={post.slug} className="animate-fade-up" style={{animationDelay:`${i*0.1}s`}}>
                <PostCard post={post} featured />
              </div>
            ))}
          </div>
        </section>

        {/* Latest + Sidebar */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Latest Posts */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="text-[#c8ff00] font-mono text-xs tracking-widest uppercase mb-1">// Latest</div>
                <h2 className="font-display font-bold text-white text-2xl">Recent Articles</h2>
              </div>
              <div>
                {latest.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Trending Tags */}
              <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-6">
                <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
                  🔥 Trending Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {['SQL Injection', 'XSS', 'IDOR', 'OSCP', 'Bug Bounty', 'CTF', 'Zero-Day', 'Recon', 'Burp Suite', 'Metasploit', 'Python', 'OWASP'].map(tag => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                      className="text-xs font-mono bg-[#252540] text-[#8888aa] hover:text-[#c8ff00] hover:bg-[#c8ff00]/10 px-3 py-1.5 rounded-md transition-colors border border-[#2a2a45] hover:border-[#c8ff00]/30"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top Resources */}
              <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-6">
                <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
                  📚 Free Resources
                </div>
                <ul className="space-y-3">
                  {[
                    { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security', tag: 'Free' },
                    { name: 'TryHackMe', url: 'https://tryhackme.com', tag: 'Free' },
                    { name: 'picoCTF', url: 'https://picoctf.org', tag: 'Free' },
                    { name: 'HackTheBox', url: 'https://hackthebox.com', tag: 'Free' },
                    { name: 'CTFtime.org', url: 'https://ctftime.org', tag: 'Free' },
                  ].map(r => (
                    <li key={r.name}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between group">
                        <span className="text-sm text-[#aaaacc] group-hover:text-[#c8ff00] transition-colors">{r.name}</span>
                        <span className="text-xs font-mono bg-[#c8ff00]/10 text-[#c8ff00] border border-[#c8ff00]/20 px-2 py-0.5 rounded">{r.tag}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#c8ff00]/10 to-[#1a1a2e] border border-[#c8ff00]/20 rounded-xl p-6">
                <div className="font-display font-bold text-white text-base mb-2">
                  Weekly Security Digest
                </div>
                <p className="text-[#8888aa] text-xs mb-4 leading-relaxed">
                  Get the best CTF writeups, CVE breakdowns, and bug bounty tips every week.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#0a0a0f] border border-[#2a2a45] text-white text-sm px-3 py-2 rounded-lg mb-3 focus:outline-none focus:border-[#c8ff00]"
                />
                <button className="w-full py-2 bg-[#c8ff00] text-[#0a0a0f] font-semibold text-sm rounded-lg hover:bg-[#9fcc00] transition-colors">
                  Subscribe Free
                </button>
              </div>

              {/* CTF Calendar */}
              <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-6">
                <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
                  🗓️ Upcoming CTFs
                </div>
                <ul className="space-y-3">
                  {[
                    { name: 'Google CTF 2024', date: 'Jun 21-23', pts: 'Elite' },
                    { name: 'DEF CON CTF', date: 'Aug 8-11', pts: 'Elite' },
                    { name: 'HTB Apocalypse', date: 'Mar 2024', pts: 'Mid' },
                    { name: 'HITCON CTF', date: 'Oct 2024', pts: 'Advanced' },
                  ].map(ctf => (
                    <li key={ctf.name} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#aaaacc]">{ctf.name}</div>
                        <div className="text-xs text-[#8888aa] font-mono">{ctf.date}</div>
                      </div>
                      <span className="text-xs font-mono text-[#c8ff00] border border-[#c8ff00]/30 px-2 py-0.5 rounded">{ctf.pts}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5"
              style={{backgroundImage:'radial-gradient(#c8ff00 1px, transparent 1px)', backgroundSize:'30px 30px'}}
            />
            <div className="relative">
              <div className="font-display font-extrabold text-white text-3xl mb-3">
                Start Your <span className="text-[#c8ff00]">Hacking Journey</span> Today
              </div>
              <p className="text-[#8888aa] mb-8 max-w-xl mx-auto">
                Everything you need to go from zero to certified ethical hacker — all free, all in one place.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/category/ethical" className="px-6 py-3 bg-[#c8ff00] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#9fcc00] transition-colors">
                  Start Learning →
                </Link>
                <Link href="/category/ctf" className="px-6 py-3 border border-[#2a2a45] text-[#aaaacc] rounded-lg hover:border-[#c8ff00]/40 transition-colors">
                  Browse CTF Writeups
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
