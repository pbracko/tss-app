export default function Footer() {
  return (
    <footer className="p-4 flex items-center justify-center bg-gray-800 text-white shadow-lg border-t border-gray-700 shrink-0">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} TSS App. All rights reserved. 005 BP
      </p>
    </footer>
  )
}
