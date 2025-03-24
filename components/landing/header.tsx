import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">open</span>xploit
        </h1>
        <nav className="flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-700">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-gray-700">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}