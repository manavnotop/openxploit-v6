import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} OpenXploit. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
