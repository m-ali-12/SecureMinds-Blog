import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function Newsletter() {
  return (
    <>
      <SEO title="Subscribe — Weekly Security Digest" description="Get the best CTF writeups, CVE breakdowns, and bug bounty tips delivered weekly. Free forever." />
      <Navbar />
      <main className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="text-5xl mb-6">📬</div>
          <h1 className="font-display font-extrabold text-white text-4xl mb-4">
            Weekly Security<br /><span className="text-[#c8ff00]">Digest</span>
          </h1>
          <p className="text-[#8888aa] text-lg mb-8 leading-relaxed">
            Every Sunday — the best CTF writeups, new CVEs explained, bug bounty tips,
            and worldwide competition updates. Free forever.
          </p>

          <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-2xl p-8">
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-[#0a0a0f] border border-[#2a2a45] text-white placeholder-[#8888aa] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c8ff00] transition-colors"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-[#0a0a0f] border border-[#2a2a45] text-white placeholder-[#8888aa] px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-[#c8ff00] transition-colors"
              />
            </div>

            <button className="w-full py-3 bg-[#c8ff00] text-[#0a0a0f] font-bold rounded-lg hover:bg-[#9fcc00] transition-colors text-sm mb-4">
              Subscribe Free →
            </button>

            <p className="text-xs text-[#8888aa] font-mono">No spam. Unsubscribe anytime. 100% free.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { num: '10K+', label: 'Subscribers' },
              { num: 'Weekly', label: 'Frequency' },
              { num: '100%', label: 'Free' },
            ].map(s => (
              <div key={s.label} className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4">
                <div className="font-display font-bold text-[#c8ff00] text-xl">{s.num}</div>
                <div className="text-xs text-[#8888aa] font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
