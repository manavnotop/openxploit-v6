import { Suspense } from "react"
import DashboardContent from "@/components/dashboard/dashboard-content"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"
import Footer from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Vulnerability Scan Result</h1>

        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </main>
  )
}
