export default function PageNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-mono text-sm font-medium tracking-widest text-muted-foreground">
        ERROR 404
      </p>

      <h1 className="mt-4 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
      </p>

      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back to home
      </a>
    </main>
  )
}