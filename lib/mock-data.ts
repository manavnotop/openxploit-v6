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

export const mockVulnerabilities = [
  {
    id: "1",
    sourceid: "3",
    name: "Cross-Domain Misconfiguration",
    risk: "High",
    url: "http://host.docker.internal:3000/api/users",
    description:
      "Web browser data loading may be possible, due to a Cross Origin Resource Sharing (CORS) misconfiguration on the web server.",
    solution:
      'Ensure that sensitive data is not available in an unauthenticated manner (using IP address white-listing, for instance).\nConfigure the "Access-Control-Allow-Origin" HTTP header to a more restrictive set of domains, or remove all CORS headers entirely, to allow the web browser to enforce the Same Origin Policy (SOP) in a more restrictive manner.',
    evidence: "Access-Control-Allow-Origin: *",
    cweid: "264",
    reference: "https://vulncat.fortify.com/en/detail?id=desc.config.dotnet.html5_overly_permissive_cors_policy",
    tags: {
      OWASP_2021_A01: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
      OWASP_2017_A05: "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
      "CWE-264": "https://cwe.mitre.org/data/definitions/264.html",
    },
    method: "GET",
    pluginId: "10098",
    confidence: "High",
    wascid: "14",
    messageId: "15",
    inputVector: "",
    alert: "Cross-Domain Misconfiguration",
    param: "",
    attack: "",
    alertRef: "10098",
  },
  {
    id: "2",
    sourceid: "4",
    name: "Content Security Policy (CSP) Header Not Set",
    risk: "Medium",
    url: "http://host.docker.internal:3000/dashboard",
    description:
      "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware.",
    solution:
      "Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.",
    evidence: "",
    cweid: "693",
    reference: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
    tags: {
      OWASP_2021_A05: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
      OWASP_2017_A06: "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
    },
    method: "GET",
    pluginId: "10038",
    confidence: "Medium",
    wascid: "15",
    messageId: "16",
    inputVector: "",
    alert: "Content Security Policy (CSP) Header Not Set",
    param: "",
    attack: "",
    alertRef: "10038",
  },
  {
    id: "3",
    sourceid: "5",
    name: "X-Content-Type-Options Header Missing",
    risk: "Low",
    url: "http://host.docker.internal:3000/assets/js/main.js",
    description:
      "The X-Content-Type-Options header is not set to 'nosniff'. This allows older versions of Internet Explorer and Chrome to perform MIME-sniffing on the response body, potentially causing the response body to be interpreted and displayed as a content type other than the declared content type.",
    solution:
      "Ensure that the application/web server sets the Content-Type header appropriately, and that it sets the X-Content-Type-Options header to 'nosniff' for all web pages.",
    evidence: "",
    cweid: "693",
    reference: "https://owasp.org/www-project-secure-headers/#x-content-type-options",
    tags: {
      OWASP_2021_A05: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
      OWASP_2017_A06: "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      "CWE-693": "https://cwe.mitre.org/data/definitions/693.html",
    },
    method: "GET",
    pluginId: "10021",
    confidence: "Medium",
    wascid: "15",
    messageId: "17",
    inputVector: "",
    alert: "X-Content-Type-Options Header Missing",
    param: "",
    attack: "",
    alertRef: "10021",
  },
  {
    id: "4",
    sourceid: "6",
    name: "Strict-Transport-Security Header Not Set",
    risk: "Medium",
    url: "http://host.docker.internal:3000/login",
    description:
      "HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL).",
    solution:
      "Ensure that your web server, application server, load balancer, etc. is configured to enforce Strict-Transport-Security.",
    evidence: "",
    cweid: "319",
    reference: "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html",
    tags: {
      OWASP_2021_A05: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
      OWASP_2017_A06: "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      "CWE-319": "https://cwe.mitre.org/data/definitions/319.html",
    },
    method: "GET",
    pluginId: "10035",
    confidence: "Medium",
    wascid: "15",
    messageId: "18",
    inputVector: "",
    alert: "Strict-Transport-Security Header Not Set",
    param: "",
    attack: "",
    alertRef: "10035",
  },
  {
    id: "5",
    sourceid: "7",
    name: 'Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)',
    risk: "Low",
    url: "http://host.docker.internal:3000/",
    description:
      'The web/application server is leaking information via one or more "X-Powered-By" HTTP response headers. Access to such information may facilitate attackers identifying other frameworks/components your web application is reliant upon and the vulnerabilities such components may be subject to.',
    solution:
      'Ensure that your web server, application server, load balancer, etc. is configured to suppress "X-Powered-By" headers.',
    evidence: "X-Powered-By: Express",
    cweid: "200",
    reference: "https://owasp.org/www-project-secure-headers/#x-powered-by",
    tags: {
      OWASP_2021_A05: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
      OWASP_2017_A06: "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration.html",
      "CWE-200": "https://cwe.mitre.org/data/definitions/200.html",
    },
    method: "GET",
    pluginId: "10037",
    confidence: "Medium",
    wascid: "13",
    messageId: "19",
    inputVector: "",
    alert: 'Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)',
    param: "",
    attack: "",
    alertRef: "10037",
  },
  {
    id: "6",
    sourceid: "8",
    name: "SQL Injection",
    risk: "High",
    url: "http://host.docker.internal:3000/api/products?id=1",
    description:
      "SQL injection may be possible. The application appears to be using user-supplied input in a SQL query without proper sanitization. This could allow an attacker to manipulate SQL queries and potentially access, modify, or delete data from the database.",
    solution:
      "Use parameterized queries or prepared statements instead of building SQL queries with string concatenation. Implement proper input validation and sanitization. Consider using an ORM (Object-Relational Mapping) library that handles SQL escaping automatically.",
    evidence: "Error: ER_PARSE_ERROR: You have an error in your SQL syntax",
    cweid: "89",
    reference: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    tags: {
      OWASP_2021_A03: "https://owasp.org/Top10/A03_2021-Injection/",
      OWASP_2017_A01: "https://owasp.org/www-project-top-ten/2017/A1_2017-Injection.html",
      "CWE-89": "https://cwe.mitre.org/data/definitions/89.html",
    },
    method: "GET",
    pluginId: "40018",
    confidence: "High",
    wascid: "19",
    messageId: "20",
    inputVector: "id parameter",
    alert: "SQL Injection",
    param: "id",
    attack: "1' OR '1'='1",
    alertRef: "40018",
  },
  {
    id: "7",
    sourceid: "9",
    name: "Cross Site Scripting (Reflected)",
    risk: "High",
    url: "http://host.docker.internal:3000/search?q=test",
    description:
      "Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance. A successful XSS attack can allow the attacker to execute arbitrary JavaScript code in the victim's browser, potentially leading to credential theft, session hijacking, or delivery of malware.",
    solution:
      "Validate all input and sanitize output before rendering to the browser. Use context-specific escaping for data inserted into HTML, JavaScript, CSS, and URLs. Consider implementing a Content Security Policy (CSP) as an additional layer of protection.",
    evidence: "<script>alert(1)</script>",
    cweid: "79",
    reference: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
    tags: {
      OWASP_2021_A03: "https://owasp.org/Top10/A03_2021-Injection/",
      OWASP_2017_A07: "https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS).html",
      "CWE-79": "https://cwe.mitre.org/data/definitions/79.html",
    },
    method: "GET",
    pluginId: "40012",
    confidence: "High",
    wascid: "8",
    messageId: "21",
    inputVector: "q parameter",
    alert: "Cross Site Scripting (Reflected)",
    param: "q",
    attack: "<script>alert(1)</script>",
    alertRef: "40012",
  },
  {
    id: "8",
    sourceid: "10",
    name: "Insecure JWT Validation",
    risk: "Medium",
    url: "http://host.docker.internal:3000/api/auth",
    description:
      "The application appears to be using JWT (JSON Web Tokens) for authentication but may not be properly validating the signature. This could allow an attacker to forge tokens and gain unauthorized access to protected resources.",
    solution:
      "Ensure that JWT tokens are properly validated, including signature verification, expiration time, and issuer validation. Use strong algorithms for signing tokens (RS256 is recommended over HS256). Store JWT secrets securely and rotate them periodically.",
    evidence: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    cweid: "347",
    reference: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html",
    tags: {
      OWASP_2021_A02: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
      OWASP_2017_A02: "https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication.html",
      "CWE-347": "https://cwe.mitre.org/data/definitions/347.html",
    },
    method: "POST",
    pluginId: "90034",
    confidence: "Medium",
    wascid: "13",
    messageId: "22",
    inputVector: "Authorization header",
    alert: "Insecure JWT Validation",
    param: "Authorization",
    attack: "",
    alertRef: "90034",
  },
  {
    id: "9",
    sourceid: "11",
    name: "Insecure Direct Object Reference (IDOR)",
    risk: "Medium",
    url: "http://host.docker.internal:3000/api/user/profile/123",
    description:
      "The application appears to expose a direct reference to an internal implementation object, such as a file, directory, database record, or key. Without an access control check or other protection, attackers can manipulate these references to access unauthorized data.",
    solution:
      "Implement proper access controls to ensure users can only access resources they are authorized for. Use indirect references that are mapped on the server-side to actual implementation objects. Validate that the requested object belongs to the current authenticated user.",
    evidence: "",
    cweid: "639",
    reference:
      "https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html",
    tags: {
      OWASP_2021_A01: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
      OWASP_2017_A05: "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html",
      "CWE-639": "https://cwe.mitre.org/data/definitions/639.html",
    },
    method: "GET",
    pluginId: "10028",
    confidence: "Medium",
    wascid: "2",
    messageId: "23",
    inputVector: "URL path",
    alert: "Insecure Direct Object Reference (IDOR)",
    param: "",
    attack: "",
    alertRef: "10028",
  },
  {
    id: "10",
    sourceid: "12",
    name: "Missing Rate Limiting",
    risk: "Low",
    url: "http://host.docker.internal:3000/api/login",
    description:
      "The application does not implement sufficient rate limiting for authentication attempts. This could make the application vulnerable to brute force attacks against user credentials.",
    solution:
      "Implement rate limiting for sensitive functionality, especially authentication endpoints. Consider using techniques such as progressive delays, account lockouts after multiple failed attempts, or CAPTCHA challenges. Monitor and alert on suspicious activity patterns.",
    evidence: "",
    cweid: "307",
    reference:
      "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls",
    tags: {
      OWASP_2021_A04: "https://owasp.org/Top10/A04_2021-Insecure_Design/",
      OWASP_2017_A02: "https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication.html",
      "CWE-307": "https://cwe.mitre.org/data/definitions/307.html",
    },
    method: "POST",
    pluginId: "10023",
    confidence: "Medium",
    wascid: "21",
    messageId: "24",
    inputVector: "",
    alert: "Missing Rate Limiting",
    param: "",
    attack: "",
    alertRef: "10023",
  },
]