import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a45] bg-[#0d0d18] mt-20">
      {/* Newsletter bar */}
      <div className="border-b border-[#2a2a45] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-bold text-white text-xl mb-1">Stay ahead of threats.</div>
            <div className="text-[#8888aa] text-sm">Weekly digest of CVEs, CTF writeups, and bug bounty tips.</div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-[#1a1a2e] border border-[#2a2a45] text-white placeholder-[#8888aa] px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#c8ff00] transition-colors"
            />
            <button className="px-5 py-2.5 bg-[#c8ff00] text-[#0a0a0f] font-semibold text-sm rounded-lg hover:bg-[#9fcc00] transition-colors whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-[#c8ff00] rounded-sm flex items-center justify-center text-[#0a0a0f] font-bold text-xs font-mono">SM</div>
            <span className="font-display font-bold text-white">SecureMinds</span>
          </div>
          <p className="text-[#8888aa] text-sm leading-relaxed mb-4">
            Pakistan's premier cybersecurity blog. Ethical hacking, CTF writeups, bug bounty, and global security challenges.
          </p>
          <div className="flex gap-3">
            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-xs text-[#8888aa] hover:text-[#c8ff00] transition-colors font-mono">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">Topics</div>
          <ul className="space-y-2">
            {[
              { href: '/category/ctf', label: 'CTF Writeups' },
              { href: '/category/ethical', label: 'Ethical Hacking' },
              { href: '/category/bugbounty', label: 'Bug Bounty' },
              { href: '/category/news', label: 'Security News' },
              { href: '/category/worldwide', label: 'Worldwide CTF' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[#8888aa] hover:text-[#c8ff00] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">Resources</div>
          <ul className="space-y-2">
            {[
              { href: 'https://portswigger.net/web-security', label: 'PortSwigger Academy' },
              { href: 'https://tryhackme.com', label: 'TryHackMe' },
              { href: 'https://hackthebox.com', label: 'HackTheBox' },
              { href: 'https://ctftime.org', label: 'CTFtime.org' },
              { href: 'https://picoctf.org', label: 'picoCTF' },
            ].map(l => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8888aa] hover:text-[#c8ff00] transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">Legal</div>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Contact'].map(l => (
              <li key={l}>
                <Link href="#" className="text-sm text-[#8888aa] hover:text-[#c8ff00] transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-3 bg-[#1a1a2e] border border-[#2a2a45] rounded-lg">
            <div className="text-xs text-[#c8ff00] font-mono mb-1">⚠️ DISCLAIMER</div>
            <p className="text-xs text-[#8888aa] leading-relaxed">
              All content is for educational purposes only. Only test systems you own or have explicit permission to test.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a45] py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#8888aa] font-mono">
          <span>© 2024 SecureMinds Blog. Built for the security community.</span>
          <span className="text-[#c8ff00]">hack ethically. learn constantly. share knowledge.</span>
        </div>
      </div>
    </footer>
  )
}
