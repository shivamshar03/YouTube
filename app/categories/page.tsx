export const dynamic = 'force-dynamic'
import Link from 'next/link'

const cats = ['Trending', 'Recommended', 'Animation', 'Education', 'Sci-Fi', 'Trailers']

export default function CategoriesPage() {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cats.map(c => (
          <Link key={c} href={`/category/${encodeURIComponent(c)}`} className="border rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            {c}
          </Link>
        ))}
      </div>
    </div>
  )
}


