import { exec } from "child_process";
import { NextResponse } from "next/server";

interface ScanRequestBody {
  scanType: "local" | "docker";
  localUrl?: string;
  dockerImage?: string;
  envVars?: Array<{ key: string; value: string }>;
}

export async function POST(request: Request) {
  try {
    const body: ScanRequestBody = await request.json();

    // Validate scanType
    if (!["local", "docker"].includes(body.scanType)) {
      return NextResponse.json({ error: "Invalid scan type" }, { status: 400 });
    }

    if (body.scanType === "local") {
      if (!body.localUrl) {
        return NextResponse.json({ error: "Local URL is required" }, { status: 400 });
      }
      return handleLocalScan(body.localUrl);
    } else if (body.scanType === "docker") {
      if (!body.dockerImage) {
        return NextResponse.json({ error: "Docker image is required" }, { status: 400 });
      }
      return handleDockerScan(body.dockerImage, body.envVars || []);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function handleLocalScan(localUrl?: string) {
  if (!localUrl || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(localUrl)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  //const dockerCommand = `docker run -it --rm my-scanner-image scan ${localUrl}`;
  const dockerCommand = `docker run hello-world`;

  return new Promise<NextResponse>((resolve, reject) => {
    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running Docker command: ${stderr}`);
        return resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      }
      resolve(NextResponse.json({ message: "Scan started successfully", output: stdout }));
    });
  });
}

function handleDockerScan(dockerImage?: string, envVars?: Array<{ key: string; value: string }>) {
  if (!dockerImage || !/^[a-z0-9]+([._-][a-z0-9]+)*\/[a-z0-9]+([._-][a-z0-9]+)*:[a-z0-9._-]+$/.test(dockerImage)) {
    return NextResponse.json({ error: "Invalid Docker image format" }, { status: 400 });
  }

  // Construct environment variables for Docker
  const envFlags = envVars
    ?.filter(({ key, value }) => key && value)
    .map(({ key, value }) => `-e ${key}=${value}`)
    .join(" ");

  const runCommand = `docker run -d ${envFlags || ""} ${dockerImage}`;

  return new Promise<NextResponse>((resolve, reject) => {
    exec(runCommand, async (runError, stdout, stderr) => {
      if (runError) {
        console.error(`Error starting Docker container: ${stderr}`);
        return resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      }

      const containerId = stdout.trim();

      // Simulate waiting for the container to be ready
      await new Promise((r) => setTimeout(r, 10000));

      // Run the scanner against the container
      const scanCommand = `docker run -it --rm my-scanner-image scan http://localhost:3000`;
      exec(scanCommand, (scanError, scanStdout, scanStderr) => {
        if (scanError) {
          console.error(`Error running Docker scan command: ${scanStderr}`);
          return resolve(NextResponse.json({ error: scanStderr }, { status: 500 }));
        }

        // Stop the container after scanning
        exec(`docker stop ${containerId}`, (stopError) => {
          if (stopError) {
            console.error(`Error stopping container: ${stopError}`);
          }
          resolve(NextResponse.json({ message: "Scan completed successfully", output: scanStdout }));
        });
      });
    });
  });
}