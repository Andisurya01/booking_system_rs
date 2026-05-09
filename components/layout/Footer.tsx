import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 px-6 py-8">
      <div className="max-w-7xl mx-auto flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900">Booking RS</p>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} Booking Rs. Kesehatan pasien nomor satu.
          </p>
        </div>
        <div className="flex gap-8 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          <Link href="/support" className="hover:text-gray-900">Kontak support</Link>
        </div>
      </div>
    </footer>
  )
}