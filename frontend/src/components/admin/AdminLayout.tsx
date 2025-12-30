'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Tag,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
  Search,
  User,
  ChevronDown,
  BarChart3
} from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import { authUtils } from '@/utils/auth'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface MenuItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [unreadInquiries, setUnreadInquiries] = useState<any[]>([])
  const router = useRouter()
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Posts', href: '/admin/posts', icon: FileText },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Inquiries', href: '/admin/inquiries', icon: Mail, badge: unreadCount > 0 ? unreadCount.toString() : undefined },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings }
  ]

  useEffect(() => {
    const userData = authUtils.getUser()
    if (!userData) {
      router.push('/admin/login')
    } else {
      setUser(userData)
    }
  }, [router])

  const fetchUnreadCount = async () => {
    try {
      const response = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/stats`)
      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.unread || 0)
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  const fetchUnreadInquiries = async () => {
    try {
      const response = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries?is_read=false&limit=5`)
      if (response.ok) {
        const data = await response.json()
        const inquiries = data.inquiries || data || []
        setUnreadInquiries(inquiries.slice(0, 5))
      }
    } catch (error) {
      console.error('Failed to fetch unread inquiries:', error)
    }
  }

  const handleInquiryClick = (inquiryId: number) => {
    setShowNotifications(false)
    router.push(`/admin/inquiries?selected=${inquiryId}`)
  }

  // Poll for new inquiries every 30 seconds
  useEffect(() => {
    if (user) {
      fetchUnreadCount()
      fetchUnreadInquiries()
      const interval = setInterval(() => {
        fetchUnreadCount()
        fetchUnreadInquiries()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest('.notification-dropdown')) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications])

  // Listen for inquiry status changes to update notification badge
  useEffect(() => {
    const handleStatusChange = () => {
      fetchUnreadCount()
      fetchUnreadInquiries()
    }

    window.addEventListener('inquiryStatusChanged', handleStatusChange)
    return () => window.removeEventListener('inquiryStatusChanged', handleStatusChange)
  }, [])

  const handleLogout = () => {
    authUtils.logout()
    router.push('/admin/login')
  }

  const isActiveRoute = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-slate-300">Loading admin panel...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative z-30 w-70 h-full bg-slate-800 border-r border-slate-700"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-500/10 rounded-lg border border-accent-500/20">
                <Shield className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-100">YHDFC Admin</div>
                <div className="text-xs text-slate-400">Management Portal</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-700">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-500/10 rounded-full flex items-center justify-center border border-accent-500/20">
                    <User className="w-4 h-4 text-accent-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-100">{user.full_name}</div>
                    <div className="text-xs text-slate-400">{user.email}</div>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-0 right-0 mb-2"
                >
                  <Card className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors lg:hidden"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative notification-dropdown">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50"
                  >
                    <div className="p-3 border-b border-slate-700">
                      <h3 className="text-lg font-semibold text-slate-100">Notifications</h3>
                      <p className="text-sm text-slate-400">{unreadCount} unread inquiries</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {unreadInquiries.length === 0 ? (
                        <div className="p-6 text-center">
                          <Bell className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                          <p className="text-slate-400">No new notifications</p>
                        </div>
                      ) : (
                        unreadInquiries.map((inquiry) => (
                          <button 
                            key={inquiry.id}
                            onClick={() => handleInquiryClick(inquiry.id)}
                            className="w-full p-3 hover:bg-slate-700 text-left border-b border-slate-700/50 last:border-b-0 transition-colors"
                          >
                            <p className="font-medium text-slate-200 mb-1">{inquiry.name}</p>
                            <p className="text-sm text-slate-300 line-clamp-1">{inquiry.subject}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(inquiry.created_at).toLocaleString()}
                            </p>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-slate-700">
                      <Link href="/admin/inquiries">
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="w-full text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors text-center"
                        >
                          View All Inquiries →
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="hidden sm:block text-sm text-slate-300">
                Welcome back, <span className="font-medium text-slate-100">{user.full_name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout