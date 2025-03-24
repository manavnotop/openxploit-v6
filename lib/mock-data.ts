interface Vulnerability {
  id: string
  name: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  affected: string
  remediation: string
}

interface Recommendation {
  title: string
  description: string
  relatedVulnerabilities: string[]
}

interface ScanResult {
  target: string
  scanType: string
  scanDate: string
  scanDuration: string
  vulnerabilities: Vulnerability[]
  recommendations: Recommendation[]
}

// Export the mock data with proper typing
export const mockScanResults: ScanResult = {
  target: "nginx:latest",
  scanType: "Docker Image",
  scanDate: "2025-03-24",
  scanDuration: "2m 34s",
  vulnerabilities: [
    {
      id: "CVE-2023-1234",
      name: "Outdated OpenSSL Library",
      severity: "critical",
      description:
        "The OpenSSL library used in this image has a known vulnerability that could allow remote attackers to execute arbitrary code.",
      affected: "OpenSSL 1.1.1k",
      remediation:
        "Update to OpenSSL 1.1.1l or later. This can be done by updating the base image or installing the latest version manually.",
    },
    {
      id: "CVE-2023-5678",
      name: "Nginx Configuration Exposure",
      severity: "high",
      description:
        "The Nginx configuration exposes sensitive server information that could be used by attackers to target specific vulnerabilities.",
      affected: "Nginx configuration",
      remediation:
        "Modify the Nginx configuration to hide server version information by adding 'server_tokens off;' to the configuration file.",
    },
    {
      id: "CVE-2023-9012",
      name: "Insecure Default Permissions",
      severity: "medium",
      description:
        "Default file permissions for configuration files are too permissive, potentially allowing unauthorized access.",
      affected: "File system permissions",
      remediation:
        "Update file permissions to be more restrictive. For configuration files, use chmod 644 and for directories use chmod 755.",
    },
    {
      id: "CVE-2023-3456",
      name: "Weak TLS Configuration",
      severity: "medium",
      description:
        "The TLS configuration allows for weak cipher suites that could be vulnerable to man-in-the-middle attacks.",
      affected: "Nginx SSL configuration",
      remediation:
        "Update the SSL configuration to only allow strong cipher suites and disable older TLS versions (1.0 and 1.1).",
    },
    {
      id: "CVE-2023-7890",
      name: "Outdated Base Image",
      severity: "low",
      description: "The base image used is outdated and may contain known vulnerabilities.",
      affected: "Base image",
      remediation:
        "Update to the latest base image version or use a minimal base image like Alpine to reduce the attack surface.",
    },
    {
      id: "CVE-2023-2345",
      name: "Missing Security Headers",
      severity: "low",
      description:
        "The application is missing important security headers that help protect against common web vulnerabilities.",
      affected: "HTTP response headers",
      remediation:
        "Add security headers such as Content-Security-Policy, X-Content-Type-Options, and X-Frame-Options to the Nginx configuration.",
    },
  ],
  recommendations: [
    {
      title: "Update OpenSSL Library",
      description: "Update the OpenSSL library to the latest version to address critical vulnerabilities.",
      relatedVulnerabilities: ["CVE-2023-1234"],
    },
    {
      title: "Improve Nginx Configuration",
      description: "Modify the Nginx configuration to hide server information and improve security settings.",
      relatedVulnerabilities: ["CVE-2023-5678", "CVE-2023-3456"],
    },
    {
      title: "Fix File Permissions",
      description: "Update file permissions to be more restrictive for configuration files and directories.",
      relatedVulnerabilities: ["CVE-2023-9012"],
    },
    {
      title: "Update Base Image",
      description: "Use the latest base image or switch to a minimal base image like Alpine.",
      relatedVulnerabilities: ["CVE-2023-7890"],
    },
    {
      title: "Add Security Headers",
      description: "Configure Nginx to include important security headers in HTTP responses.",
      relatedVulnerabilities: ["CVE-2023-2345"],
    },
  ],
}

