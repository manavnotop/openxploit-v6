import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto grid items-center gap-6 px-4 py-12 md:py-24 lg:py-32 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Scan your applications for vulnerabilities
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              OpenXploit helps you identify and fix security issues in your applications before they become a problem.
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/scan">
              <Button size="lg" className="gap-2">
                Start Scanning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Local Application</CardTitle>
                <CardDescription>Scan an application running on your local machine</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Provide the URL of your locally running application to scan it for vulnerabilities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Docker Image</CardTitle>
                <CardDescription>Scan a Docker image for vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enter a Docker image name and we'll scan it for security issues and configuration problems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Reports</CardTitle>
                <CardDescription>Get detailed vulnerability reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View comprehensive reports with severity ratings, descriptions, and remediation steps.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
