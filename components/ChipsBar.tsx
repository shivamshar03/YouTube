import Link from 'next/link'

export default function ChipsBar({
  items,
  active,
  baseHref = '/',
  param = 'c',
}: {
  items: string[]
  active?: string
  baseHref?: string
  param?: string
}) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar">
      {items.map((label) => {
        const isAll = label.toLowerCase() === 'all'
        const href = isAll ? baseHref : `${baseHref}?${param}=${encodeURIComponent(label)}`
        const isActive = isAll ? !active : active === label
        return (
          <Link
            key={label}
            href={isActive ? baseHref : href}
            className={`px-4 py-2 rounded-full border whitespace-nowrap ${
              isActive
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}


