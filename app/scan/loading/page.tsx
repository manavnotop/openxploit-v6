"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function LoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing scan...")

  useEffect(() => {
    const statuses = [
      "Initializing scan...",
      "Analyzing dependencies...",
      "Checking for known vulnerabilities...",
      "Scanning configuration files...",
      "Performing security analysis...",
      "Generating report...",
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval)
        router.push("/dashboard")
        return
      }

      const newProgress = progress + 100 / (statuses.length * 5)
      setProgress(Math.min(newProgress, 100))

      if (newProgress > (currentStep + 1) * (100 / statuses.length) && currentStep < statuses.length - 1) {
        currentStep++
        setStatus(statuses[currentStep])
      }
    }, 800)

    return () => clearInterval(interval)
  }, [progress, router])

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Scanning in Progress</CardTitle>
          <CardDescription>Please wait while we scan your application for vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{status}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>This process may take several minutes depending on the size and complexity of your application.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

