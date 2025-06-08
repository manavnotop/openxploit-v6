"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { KeyValueInput } from "@/components/key-value-input"

export default function ScanPage() {
  const router = useRouter()
  const [scanType, setScanType] = useState("local")
  const [localUrl, setLocalUrl] = useState("")
  const [dockerImage, setDockerImage] = useState("")
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }])
  const [loading, setLoading] = useState(false)
  const [urlError, setUrlError] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  const validateLocalUrl = (url: string) => {
    if (!url) return "" // Don't show error for empty input
    
    try {
      const urlObj = new URL(url)
      if (urlObj.protocol !== 'http:') {
        return "Only HTTP protocol is allowed"
      }
      const validHostnames = ['localhost', '127.0.0.1', 'host.docker.internal']
      if (!validHostnames.some(host => urlObj.hostname.includes(host))) {
        return "Only localhost, 127.0.0.1, or host.docker.internal URLs are allowed"
      }
      return ""
    } catch (error) {
      return "Please enter a valid URL"
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setLocalUrl(newUrl)
    
    // Clear error if input is empty
    if (!newUrl) {
      setUrlError("")
      return
    }

    // Add debounce to validation
    setIsValidating(true)
    setTimeout(() => {
      const error = validateLocalUrl(newUrl)
      setUrlError(error)
      setIsValidating(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (scanType === "local") {
      const error = validateLocalUrl(localUrl)
      if (error) {
        setUrlError(error)
        return
      }
      setUrlError("")
    }

    setLoading(true);

    try {
      // Start the API request but don't await it
      fetch("/api/full-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: localUrl,
          scanType,
          dockerImage,
          envVars,
        }),
      }).catch(error => {
        console.error("Error in background scan:", error);
      });

      // Navigate to loading page immediately
      router.push("/scan/loading");
    } catch (error) {
      console.error("Error initiating scan:", error);
      alert("Failed to start scan. Please try again.");
      setLoading(false);
    }
  };

  const addEnvVar = () => {
    // Make sure envVars is an array before spreading
    const currentEnvVars = Array.isArray(envVars) ? envVars : []
    setEnvVars([...currentEnvVars, { key: "", value: "" }])
  }

  const updateEnvVar = (index: number, field: "key" | "value", value: string) => {
    // Make sure envVars is an array before updating
    if (!Array.isArray(envVars)) {
      setEnvVars([{ key: "", value: "" }])
      return
    }

    const updatedEnvVars = [...envVars]
    if (updatedEnvVars[index]) {
      updatedEnvVars[index][field] = value
      setEnvVars(updatedEnvVars)
    }
  }

  const removeEnvVar = (index: number) => {
    // Make sure envVars is an array before removing
    if (!Array.isArray(envVars) || envVars.length <= 1) {
      setEnvVars([{ key: "", value: "" }])
      return
    }

    const updatedEnvVars = [...envVars]
    updatedEnvVars.splice(index, 1)
    setEnvVars(updatedEnvVars.length ? updatedEnvVars : [{ key: "", value: "" }])
  }

  // Ensure envVars is always an array
  const safeEnvVars = Array.isArray(envVars) ? envVars : [{ key: "", value: "" }]

  return (
    <div className="container mx-auto max-w-3xl py-10 min-h-screen flex flex-col items-center justify-center">
      <h1 className="mb-6 text-2xl font-bold">Start a New Vulnerability Scan</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <Card className="mb-6 min-w-[400px] sm:min-w-[500px]">
          <CardHeader>
            <CardTitle>Scan Type</CardTitle>
            <CardDescription>Select the type of application you want to scan</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={scanType} onValueChange={setScanType} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="local">Local Application</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="docker" id="docker" />
                <Label htmlFor="docker">Docker Image</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Tabs value={scanType} onValueChange={setScanType}>
          <TabsContent value="local" className="mt-0">
            <Card className="min-w-[400px] sm:min-w-[500px]">
              <CardHeader>
                <CardTitle>Local Application Details</CardTitle>
                <CardDescription>Enter the URL of your locally running application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="local-url">Application URL</Label>
                    <div className="relative">
                      <Input
                        id="local-url"
                        placeholder="http://localhost:3000"
                        value={localUrl}
                        onChange={handleUrlChange}
                        required={scanType === "local"}
                        className={urlError ? "border-red-500" : ""}
                      />
                      {isValidating && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    {urlError && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {urlError}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docker" className="mt-0">
            <Card className="min-w-[400px] sm:min-w-[500px]">
              <CardHeader>
                <CardTitle>Docker Image Details</CardTitle>
                <CardDescription>Enter the Docker image name and any environment variables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="docker-image">Docker Image</Label>
                    <Input
                      id="docker-image"
                      placeholder="nginx:latest"
                      value={dockerImage}
                      onChange={(e) => setDockerImage(e.target.value)}
                      required={scanType === "docker"}
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Environment Variables (Optional)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addEnvVar}>
                        Add Variable
                      </Button>
                    </div>

                    {safeEnvVars.map((envVar, index) => (
                      <KeyValueInput
                        key={index}
                        keyValue={envVar.key || ""}
                        valueValue={envVar.value || ""}
                        onKeyChange={(value) => updateEnvVar(index, "key", value)}
                        onValueChange={(value) => updateEnvVar(index, "value", value)}
                        onRemove={() => removeEnvVar(index)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Start Scan"}
          </Button>
        </div>
      </form>
    </div>
  )
}

