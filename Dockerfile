# Stage 1: Dependencies - Install pnpm, then install ALL dependencies (dev and prod)
# Using node:20-alpine for a lightweight base image for dependency installation.
FROM node:20-alpine AS deps

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally. Alpine uses apk for package management.
RUN npm install -g pnpm

# Copy pnpm-lock.yaml and package.json to leverage Docker cache
# This ensures that pnpm install is only rerun if package.json or lock file changes
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies, including devDependencies, as they are essential for the build process.
# The --frozen-lockfile ensures strict adherence to the lock file.
RUN pnpm install --frozen-lockfile

# Stage 2: Builder - Build the Next.js application
# Using node:20-alpine again for the build stage.
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally in this stage as well, as it's a new image
RUN npm install -g pnpm

# Copy ALL installed dependencies from the 'deps' stage.
# This ensures all build-time dependencies (like postcss, tailwindcss plugins) are available.
COPY --from=deps /app/node_modules ./node_modules/

# Copy the rest of the application source code
COPY . .

# Ensure NEXT_TELEMETRY_DISABLED is set to 1 to disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application.
# The 'build:docker' script (which is 'next build') will now have all necessary dependencies.
# Linting and TypeScript checks are handled by 'next.config.js' (ignoreBuildErrors, ignoreDuringBuilds).
RUN pnpm run build:docker

# Stage 3: Runner - Serve the Next.js application
# Using node:20-slim for the final runtime image, which is more minimal than full Node.
FROM node:20-slim AS runner

# Set the working directory
WORKDIR /app

# Install pnpm globally in the runner. This is needed to run 'pnpm start'.
RUN npm install -g pnpm

# Copy only necessary files for runtime from the builder stage.
# These include the .next directory (the built application), public assets,
# and package.json/pnpm-lock.yaml for re-installing production dependencies.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml 


# Install ONLY production dependencies for the final, smaller runtime image.
# This keeps the final Docker image size optimized for deployment.
RUN pnpm install --frozen-lockfile --prod

# Copy environment variables for the runtime.
# If you have a .env.production file, ensure it's copied here.
# COPY .env.production ./.env.production

# Expose the port on which the Next.js application will run
EXPOSE 3000

# Set the command to run the Next.js application in production mode
# 'pnpm start' should be defined in your package.json scripts (e.g., "start": "next start")
CMD ["pnpm", "start"]
