import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/category/ctf', label: 'CTF Writeups' },
    { href: '/category/ethical', label: 'Ethical Hacking' },
    { href: '/category/bugbounty', label: 'Bug Bounty' },
    { href: '/category/worldwide', label: 'Worldwide' },
  ]

  const isActive = (href: string) => router.pathname === href || router.asPath === href

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#2a2a45]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#c8ff00] rounded-sm flex items-center justify-center text-[#0a0a0f] font-bold text-sm font-mono group-hover:rotate-12 transition-transform duration-300">
              SM
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Secure<span className="text-[#c8ff00]">Minds</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[#c8ff00] bg-[#c8ff00]/10'
                    : 'text-[#8888aa] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/newsletter"
              className="px-4 py-2 border border-[#c8ff00] text-[#c8ff00] text-sm font-medium rounded-md hover:bg-[#c8ff00] hover:text-[#0a0a0f] transition-all duration-200"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#8888aa] hover:text-white p-2"
          >
            <div className="w-5 h-0.5 bg-current mb-1 transition-all"></div>
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b border-[#2a2a45] px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive(link.href) ? 'text-[#c8ff00] bg-[#c8ff00]/10' : 'text-[#8888aa]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
