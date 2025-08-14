export const dynamic = 'force-dynamic'
export default function LibraryPage() {
  // Demo-only static sections
  const sections = [
    { title: 'History', description: 'Videos you watched recently.' },
    { title: 'Watch later', description: 'Save videos to watch anytime.' },
    { title: 'Playlists', description: 'Create and manage your playlists.' },
    { title: 'Your videos', description: 'Upload to share with the world.' },
  ]
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <div key={s.title} className="border rounded-lg p-5 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{s.description}</div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700">View</button>
              <button className="px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-700">Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


