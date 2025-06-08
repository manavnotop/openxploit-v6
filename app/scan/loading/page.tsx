"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Search, FileText, LucideIcon } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Starting Spider Scan...")

  const phases = [
    {
      name: "Spider Scan",
      duration: 240000, // 4 minutes
      status: "Spider Scan in Progress",
      icon: Search
    },
    {
      name: "Active Scan",
      duration: 240000, // 4 minutes
      status: "Active Scan in Progress",
      icon: Shield
    },
    {
      name: "Finalizing",
      duration: 60000, // 1 minute
      status: "Finalizing...",
      icon: FileText
    }
  ]

  useEffect(() => {
    if (currentPhase >= phases.length) {
      router.push("/dashboard")
      return
    }

    const phase = phases[currentPhase]
    const startTime = Date.now()
    const updateInterval = 100 // Update every 100ms for smooth animation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const phaseProgress = Math.min((elapsed / phase.duration) * 100, 100)
      setProgress(phaseProgress)

      if (phaseProgress >= 100) {
        clearInterval(interval)
        setCurrentPhase(prev => prev + 1)
        if (currentPhase < phases.length - 1) {
          setStatus(`Starting ${phases[currentPhase + 1].name}...`)
        }
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [currentPhase, router])

  const currentPhaseData = phases[currentPhase] || phases[phases.length - 1]
  const Icon: LucideIcon = currentPhaseData.icon

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                OWASP ZAP Security Scan
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Please wait while we perform a comprehensive security analysis of your application
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between text-lg font-medium"
                  >
                    <span>{status}</span>
                    <span>{Math.round(progress)}%</span>
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Progress value={progress} className="h-2" />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground space-y-2"
              >
                <p className="text-base font-medium">
                  Current Phase: {currentPhaseData.name}
                </p>
                <p>
                  This comprehensive security scan includes spider crawling, active vulnerability testing,
                  and detailed analysis. The process typically takes 10-12 minutes to complete.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

