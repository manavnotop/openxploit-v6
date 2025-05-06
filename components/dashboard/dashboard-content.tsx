"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, AlertTriangle, ShieldAlert, Search, RefreshCw } from "lucide-react"
import VulnerabilityTable from "@/components/dashboard/vulnerability-table"
import VulnerabilityDetail from "@/components/dashboard/vulnerability-detail"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockVulnerabilities } from "@/lib/mock-data"

interface Vulnerability {
  id: string
  name: string
  risk: string
  url: string
  description: string
  solution: string
  evidence: string
  cweid: string
  reference: string
  tags: Record<string, string>
  [key: string]: any
}

interface ApiVulnerability {
  id: string
  name: string
  risk: string
  url: string
  description: string
  solution?: string
  evidence?: string
  cweid?: string
  reference?: string
  tags?: Record<string, string>
  [key: string]: any
}

export default function DashboardContent() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<Vulnerability[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const fetchVulnerabilities = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "http://localhost:3001/api/proxy?apikey=&baseurl=http://host.docker.internal:3000",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      // Transform the API data to match our Vulnerability interface
      const vulnArray = Array.isArray(data) ? data : data.alerts || []
      const transformedVulns = vulnArray.map((vuln: ApiVulnerability) => ({
        id: vuln.id,
        name: vuln.name,
        risk: vuln.risk,
        url: vuln.url,
        description: vuln.description,
        solution: vuln.solution || '',
        evidence: vuln.evidence || '',
        cweid: vuln.cweid || '',
        reference: vuln.reference || '',
        tags: vuln.tags || {}
      }))
      
      setVulnerabilities(transformedVulns)
      setFilteredVulnerabilities(transformedVulns)
    } catch (err) {
      console.error("Error fetching vulnerabilities:", err)
      // Only use mock data if the API is completely unavailable
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        console.log("API not available, using mock data instead")
        setVulnerabilities(mockVulnerabilities)
        setFilteredVulnerabilities(mockVulnerabilities)
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch vulnerability data")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVulnerabilities()
  }, [])

  useEffect(() => {
    if (searchTerm === "" && activeTab === "all") {
      setFilteredVulnerabilities(vulnerabilities)
      return
    }

    let filtered = vulnerabilities

    // Filter by tab (risk level)
    if (activeTab !== "all") {
      filtered = filtered.filter((vuln) => vuln.risk.toLowerCase() === activeTab.toLowerCase())
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (vuln) =>
          vuln.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vuln.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vuln.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vuln.cweid.includes(searchTerm),
      )
    }

    setFilteredVulnerabilities(filtered)
  }, [searchTerm, vulnerabilities, activeTab])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleViewDetails = (vulnerability: Vulnerability) => {
    setSelectedVulnerability(vulnerability)
  }

  const handleCloseDetails = () => {
    setSelectedVulnerability(null)
  }

  const getVulnerabilityCounts = () => {
    const counts = {
      high: vulnerabilities.filter((v) => v.risk.toLowerCase() === "high").length,
      medium: vulnerabilities.filter((v) => v.risk.toLowerCase() === "medium").length,
      low: vulnerabilities.filter((v) => v.risk.toLowerCase() === "informational").length,
      info: vulnerabilities.filter((v) => v.risk.toLowerCase() === "informational").length,
      total: vulnerabilities.length,
    }
    return counts
  }

  const counts = getVulnerabilityCounts()

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          <div className="mt-2">
            <Button variant="outline" onClick={fetchVulnerabilities}>
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all severity levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">High Risk</CardTitle>
            <ShieldAlert className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{counts.high}</div>
            <p className="text-xs text-muted-foreground mt-1">Critical vulnerabilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">Medium Risk</CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{counts.medium}</div>
            <p className="text-xs text-muted-foreground mt-1">Moderate vulnerabilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">Low Risk</CardTitle>
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{counts.low + counts.info}</div>
            <p className="text-xs text-muted-foreground mt-1">Low severity issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search vulnerabilities..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button onClick={fetchVulnerabilities} variant="outline" className="whitespace-nowrap">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
        </Button>
      </div>

      {/* Tabs and Table */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="high" className="text-red-500">
            High
          </TabsTrigger>
          <TabsTrigger value="medium" className="text-amber-500">
            Medium
          </TabsTrigger>
          <TabsTrigger value="low" className="text-blue-500">
            Low
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability List</CardTitle>
              <CardDescription>
                {filteredVulnerabilities.length}{" "}
                {filteredVulnerabilities.length === 1 ? "vulnerability" : "vulnerabilities"} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilityTable
                vulnerabilities={filteredVulnerabilities}
                onViewDetails={handleViewDetails}
                loading={loading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vulnerability Detail Modal */}
      {selectedVulnerability && (
        <VulnerabilityDetail vulnerability={selectedVulnerability} onClose={handleCloseDetails} />
      )}
    </div>
  )
}
