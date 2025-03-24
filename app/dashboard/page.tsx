"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Download, FileText, Shield } from "lucide-react"
import { VulnerabilityChart } from "@/components/vulnerability-chart"
import { SeverityDistribution } from "@/components/severity-distribution"
import { VulnerabilityTable } from "@/components/vulnerability-table"
import { mockScanResults } from "@/lib/mock-data"

// Define a fallback scan result to use if mockScanResults is undefined
const fallbackScanResult = {
  target: "Not specified",
  scanType: "Not specified",
  scanDate: "Not specified",
  scanDuration: "Not specified",
  vulnerabilities: [],
  recommendations: [],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Use fallback if mockScanResults is undefined
  const scanResult = mockScanResults || fallbackScanResult

  // Ensure vulnerabilities is an array
  const vulnerabilities = Array.isArray(scanResult.vulnerabilities) ? scanResult.vulnerabilities : []

  // Calculate counts with safe array checks
  const totalVulnerabilities = vulnerabilities.length
  const criticalCount = vulnerabilities.filter((v) => v && v.severity === "critical").length
  const highCount = vulnerabilities.filter((v) => v && v.severity === "high").length
  const mediumCount = vulnerabilities.filter((v) => v && v.severity === "medium").length
  const lowCount = vulnerabilities.filter((v) => v && v.severity === "low").length

  const securityScore = Math.max(0, 100 - (criticalCount * 15 + highCount * 10 + mediumCount * 5 + lowCount * 2))

  // Ensure recommendations is an array
  const recommendations = Array.isArray(scanResult.recommendations) ? scanResult.recommendations : []

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vulnerability Scan Results</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield
                  className={`h-5 w-5 ${securityScore > 70 ? "text-green-500" : securityScore > 40 ? "text-amber-500" : "text-red-500"}`}
                />
                <div className="text-2xl font-bold">{securityScore}/100</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div className="text-2xl font-bold">{totalVulnerabilities}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div className="text-2xl font-bold">{criticalCount}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scan Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div className="text-lg font-medium">{scanResult.scanType || "Not specified"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Severity</CardTitle>
                  <CardDescription>Distribution of vulnerabilities by severity level</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="h-80">
                    <VulnerabilityChart data={vulnerabilities} />
                  </div> */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution</CardTitle>
                  <CardDescription>Breakdown of vulnerability severity</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="h-80">
                    <SeverityDistribution
                      critical={criticalCount}
                      high={highCount}
                      medium={mediumCount}
                      low={lowCount}
                    />
                  </div> */}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Scan Information</CardTitle>
                <CardDescription>Details about the scan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium">Target</h3>
                    <p className="text-sm text-muted-foreground">{scanResult.target || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Scan Type</h3>
                    <p className="text-sm text-muted-foreground">{scanResult.scanType || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Scan Date</h3>
                    <p className="text-sm text-muted-foreground">{scanResult.scanDate || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Scan Duration</h3>
                    <p className="text-sm text-muted-foreground">{scanResult.scanDuration || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vulnerabilities">
            <Card>
              <CardHeader>
                <CardTitle>Detected Vulnerabilities</CardTitle>
                <CardDescription>{totalVulnerabilities} vulnerabilities found in your application</CardDescription>
              </CardHeader>
              <CardContent>
                <VulnerabilityTable vulnerabilities={vulnerabilities} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
                <CardDescription>Follow these recommendations to improve your application security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendations.length > 0 ? (
                    recommendations.map((recommendation, index) => {
                      if (!recommendation) return null
                      return (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <div className="flex items-start gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <h3 className="font-medium">{recommendation.title || "Unnamed Recommendation"}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">
                            {recommendation.description || "No description provided"}
                          </p>
                          {recommendation.relatedVulnerabilities &&
                            Array.isArray(recommendation.relatedVulnerabilities) &&
                            recommendation.relatedVulnerabilities.length > 0 && (
                              <div className="ml-7 mt-2 flex flex-wrap gap-2">
                                {recommendation.relatedVulnerabilities.map((vuln, i) => (
                                  <Badge key={i} variant="outline">
                                    {vuln}
                                  </Badge>
                                ))}
                              </div>
                            )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No recommendations available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

