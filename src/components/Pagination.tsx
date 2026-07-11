import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  search: string
  category: string
}

export default function Pagination({ currentPage, totalPages, search, category }: PaginationProps) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category && category !== 'all') params.set('category', category)
    params.set('page', String(page))
    return `/explore?${params.toString()}`
  }

  // পেজ নাম্বার তৈরি করা (বেশি পেজ থাকলে ... দিয়ে সংক্ষিপ্ত করা)
  const pages: (number | string)[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className={`px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors ${
          currentPage === 1 ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        Prev
      </Link>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-600">...</span>
        ) : (
          <Link
            key={p}
            href={buildHref(p as number)}
            className={`px-3.5 py-2 text-sm rounded-lg border transition-colors ${
              currentPage === p
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className={`px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors ${
          currentPage === totalPages ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        Next
      </Link>
    </div>
  )
}