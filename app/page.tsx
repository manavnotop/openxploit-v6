"use client"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Container, FileText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto grid items-center gap-6 px-4 py-12 md:py-24 lg:py-32 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Secure Your Applications
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
              OpenXploit helps you identify and fix security issues in your applications before they become a problem.
            </p>
          </motion.div>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/scan">
              <Button size="lg" className="gap-2 hover:scale-105 transition-transform">
                Start Scanning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
        <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Local Application</CardTitle>
                  <CardDescription>Scan an application running on your local machine</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Provide the URL of your locally running application to scan it for vulnerabilities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Container className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Docker Image</CardTitle>
                  <CardDescription>Scan a Docker image for vulnerabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enter a Docker image name and we'll scan it for security issues and configuration problems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Comprehensive Reports</CardTitle>
                  <CardDescription>Get detailed vulnerability reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View comprehensive reports with severity ratings, descriptions, and remediation steps.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
