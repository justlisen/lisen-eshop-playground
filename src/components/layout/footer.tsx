export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 eshop playground. All rights reserved.
          </p>
          <p className="text-sm text-zinc-400">
            Built with Next.js · Playground only — no real transactions
          </p>
        </div>
      </div>
    </footer>
  );
}
