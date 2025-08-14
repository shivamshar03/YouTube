"use client"
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="py-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="space-y-6">
        <section className="border rounded-lg border-neutral-200 dark:border-neutral-800">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 font-medium">Appearance</div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Choose light or dark appearance.</div>
            </div>
            <select
              className="border rounded-md px-3 py-2 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </section>

        <section className="border rounded-lg border-neutral-200 dark:border-neutral-800">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 font-medium">Playback</div>
          <div className="p-4 space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4" defaultChecked />
              <span>Autoplay next video</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4" />
              <span>Always use highest quality</span>
            </label>
          </div>
        </section>

        <section className="border rounded-lg border-neutral-200 dark:border-neutral-800">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 font-medium">Privacy</div>
          <div className="p-4 space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4" defaultChecked />
              <span>Show liked videos in Library</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4" />
              <span>Pause watch history</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}


