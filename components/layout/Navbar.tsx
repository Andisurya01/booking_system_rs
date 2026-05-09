'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/useAuthStore'
import { useLogout } from '@/modules/auth/hooks/useAuth'

export default function Navbar() {
    const pathname = usePathname()
    const { user, isAuthenticated } = useAuthStore()
    const logoutAction = useLogout()
    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    console.log(isAuthenticated, user);


    const linkStyle = "text-sm font-medium transition-colors pb-1 border-b-2"
    const activeStyle = "text-green-600 border-green-600"
    const inactiveStyle = "text-gray-500 border-transparent hover:text-green-600"

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className='flex items-center gap-8'>
                    <Link href="/" className="font-bold text-xl text-gray-900 mr-4">
                        Booking RS
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/doctors"
                            className={`${linkStyle} ${isActive('/doctors') ? activeStyle : inactiveStyle}`}
                        >
                            Cari dokter
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={`${linkStyle} ${isActive('/dashboard') ? activeStyle : inactiveStyle}`}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/mybookings"
                                    className={`${linkStyle} ${isActive('/mybookings') ? activeStyle : inactiveStyle}`}
                                >
                                    Booking saya
                                </Link>
                                <Link
                                    href="/insurance"
                                    className={`${linkStyle} ${isActive('/insurance') ? activeStyle : inactiveStyle}`}
                                >
                                    Asuransi
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <HelpCircle className="w-5 h-5 text-gray-600" />
                    </Button>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3 ml-2 border-l pl-3">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-400">Halo,</span>
                                <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => logoutAction}
                                className="rounded-full px-4"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button asChild className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}