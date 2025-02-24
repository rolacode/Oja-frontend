'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Package, Inbox, Ticket, Heart, Store, Clock, Settings, LogOut } from 'lucide-react'

const navigation = [
  { name: 'My OJA Account', href: '/profile', icon: User },
  { name: 'Orders', href: '/profile/orders', icon: Package },
  { name: 'Inbox', href: '/profile/inbox', icon: Inbox },
  { name: 'Voucher', href: '/profile/voucher', icon: Ticket },
  { name: 'Saved Items', href: '/profile/saved', icon: Heart },
  { name: 'Followed Seller', href: '/profile/followed', icon: Store },
  { name: 'Recently Viewed', href: '/profile/recent', icon: Clock },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
              pathname === item.href ? "bg-gray-100 text-gray-900" : ""
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
      <div className="my-6 border-t" />
      <div className="space-y-2">
        <h4 className="px-3 text-sm font-medium">Account Management</h4>
        <Link
          href="/profile/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
            pathname === '/profile/settings' ? "bg-gray-100 text-gray-900" : ""
          )}
        >
          <Settings className="h-4 w-4" />
          Account Settings
        </Link>
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-all hover:bg-red-50"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </nav>
  )
}

