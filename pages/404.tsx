import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-display font-extrabold text-[#c8ff00] text-9xl mb-4 opacity-20">404</div>
          <div className="font-mono text-[#c8ff00] text-sm tracking-widest mb-4">// PAGE_NOT_FOUND</div>
          <h1 className="font-display font-bold text-white text-3xl mb-4">Endpoint Not Found</h1>
          <p className="text-[#8888aa] mb-8">This page doesn't exist or was moved. Try recon on the homepage.</p>
          <Link href="/" className="px-6 py-3 bg-[#c8ff00] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#9fcc00] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
