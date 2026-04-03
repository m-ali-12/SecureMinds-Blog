import { GetStaticProps, GetStaticPaths } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PostCard from '../../components/PostCard'
import SEO from '../../components/SEO'
import { posts, getPostsByCategory, categoryMeta } from '../../data/posts'

export default function CategoryPage({ category, categoryPosts }: any) {
  const cat = categoryMeta[category]
  if (!cat) return null

  return (
    <>
      <SEO
        title={`${cat.label} — SecureMinds Blog`}
        description={cat.desc}
        keywords={[cat.label, 'cybersecurity', 'hacking']}
      />
      <Navbar />
      <main className="pt-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="py-16 border-b border-[#2a2a45] mb-10">
          <div className="text-6xl mb-4">{cat.icon}</div>
          <h1 className="font-display font-extrabold text-white text-4xl mb-3">{cat.label}</h1>
          <p className="text-[#8888aa] text-lg max-w-xl">{cat.desc}</p>
          <div className="mt-4 text-[#c8ff00] font-mono text-sm">{categoryPosts.length} articles</div>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-20">
          {categoryPosts.map((post: any) => <PostCard key={post.slug} post={post} featured />)}
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(categoryMeta).map(cat => ({ params: { category: cat } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string
  const categoryPosts = getPostsByCategory(category)
  return { props: { category, categoryPosts } }
}
