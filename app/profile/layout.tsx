import { Sidebar } from "@/components/profile/sidebar"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Sidebar />
          <main className="md:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

