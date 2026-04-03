import Link from 'next/link'
import { Post, categoryMeta } from '../data/posts'

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const cat = categoryMeta[post.category]
  const diffColors: Record<string, string> = {
    Beginner: 'text-[#c8ff00] border-[#c8ff00]/30',
    Intermediate: 'text-[#0095ff] border-[#0095ff]/30',
    Advanced: 'text-[#ff8c00] border-[#ff8c00]/30',
    Expert: 'text-[#ff4d00] border-[#ff4d00]/30',
  }

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <article className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-7 card-hover cursor-pointer h-full">
          <div className="flex items-center gap-3 mb-4">
            <span className={`badge ${cat.color}`}>{cat.icon} {cat.label}</span>
            {post.difficulty && (
              <span className={`text-xs font-mono border rounded px-2 py-0.5 ${diffColors[post.difficulty]}`}>
                {post.difficulty}
              </span>
            )}
          </div>
          <h2 className="text-white font-display font-bold text-xl leading-tight mb-3 group-hover:text-[#c8ff00] transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[#8888aa] text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-[#8888aa] font-mono">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-[#c8ff00] group-hover:translate-x-1 transition-transform inline-block">
              {post.readTime} →
            </span>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="flex gap-5 py-5 border-b border-[#2a2a45] hover:border-[#c8ff00]/30 transition-colors cursor-pointer">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`badge ${cat.color}`}>{cat.icon} {cat.label}</span>
            {post.difficulty && (
              <span className={`text-xs font-mono border rounded px-2 py-0.5 ${diffColors[post.difficulty]}`}>
                {post.difficulty}
              </span>
            )}
          </div>
          <h3 className="text-white font-display font-semibold text-base leading-tight mb-2 group-hover:text-[#c8ff00] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[#8888aa] text-sm line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-[#8888aa] font-mono">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span className="text-[#c8ff00]">{post.tags[0]}</span>
          </div>
        </div>
        <div className="w-8 flex-shrink-0 flex items-center justify-center text-[#2a2a45] group-hover:text-[#c8ff00] transition-colors text-lg">
          →
        </div>
      </article>
    </Link>
  )
}
