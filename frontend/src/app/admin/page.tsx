'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  FileText,
  Mail,
  Eye,
  TrendingUp,
  Plus,
  Clock,
  Users,
  Activity,
  Calendar,
  MessageSquare,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { Card, Badge, Button } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import { authUtils } from '@/utils/auth'
import { getCategoryName } from '@/utils/format'

interface DashboardStats {
  totalPosts: number
  totalInquiries: number
  totalViews: number
  recentActivity: number
}

interface RecentPost {
  id: number
  title: string
  category: string
  created_at: string
  view_count: number
  is_published: boolean
}

interface RecentInquiry {
  id: number
  name: string
  email: string
  subject: string
  urgency_level: string
  created_at: string
  status: string
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalInquiries: 0,
    totalViews: 0,
    recentActivity: 0
  })
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch posts
      const postsResponse = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`)
      const postsData = await postsResponse.json()
      
      // Fetch inquiries
      const inquiriesResponse = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries`)
      const inquiriesData = await inquiriesResponse.json()
      
      // Calculate stats
      const postsArray = Array.isArray(postsData) ? postsData : (postsData?.posts || [])
      const inquiriesArray = Array.isArray(inquiriesData) ? inquiriesData : (inquiriesData?.inquiries || [])
      const totalViews = postsArray.reduce((sum: number, post: any) => sum + (post.view_count || 0), 0)
      
      setStats({
        totalPosts: postsArray.length,
        totalInquiries: inquiriesArray.length,
        totalViews,
        recentActivity: postsArray.filter((post: any) => 
          new Date(post.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length
      })
      
      // Set recent data
      setRecentPosts(postsArray.slice(0, 5))
      setRecentInquiries(inquiriesArray.slice(0, 5))
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'New Inquiries',
      value: stats.totalInquiries,
      icon: Mail,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      change: '+24%',
      changeType: 'positive' as const
    },
    {
      title: 'Active This Week',
      value: stats.recentActivity,
      icon: Activity,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
      borderColor: 'border-accent-500/20',
      change: '+5%',
      changeType: 'positive' as const
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'normal': return 'text-blue-400'
      case 'low': return 'text-slate-400'
      default: return 'text-slate-400'
    }
  }

  const quickActions = [
    { label: 'Create New Post', href: '/admin/posts/new', icon: Plus, color: 'bg-accent-500/10 hover:bg-accent-500/20 border-accent-500/20' },
    { label: 'View All Posts', href: '/admin/posts', icon: FileText, color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20' },
    { label: 'Check Inquiries', href: '/admin/inquiries', icon: Mail, color: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/20' },
    { label: 'Site Analytics', href: '/admin/analytics', icon: BarChart3, color: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20' }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-slate-300">Loading dashboard...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome back! Here's what's happening with your digital forensics platform.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Badge variant="accent">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-6 border ${stat.borderColor} ${stat.bgColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-100 mt-1">{(stat.value || 0).toLocaleString()}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  <span className="text-slate-400 text-sm ml-1">vs last month</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={action.href} href={action.href}>
                  <button className={`w-full p-4 rounded-lg border transition-colors ${action.color}`}>
                    <div className="flex items-center space-x-3">
                      <action.icon className="w-5 h-5" />
                      <span className="font-medium text-slate-200">{action.label}</span>
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">Recent Posts</h2>
                <Link href="/admin/posts">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No posts yet</p>
                    <Link href="/admin/posts/new">
                      <Button size="sm" className="mt-2">Create First Post</Button>
                    </Link>
                  </div>
                ) : (
                  recentPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-slate-200 truncate">{post.title}</h3>
                          <Badge variant={post.is_published ? 'accent' : 'secondary'} size="sm">
                            {post.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>{getCategoryName(post.category)}</span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.view_count}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">Recent Inquiries</h2>
                <Link href="/admin/inquiries">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentInquiries.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No inquiries yet</p>
                  </div>
                ) : (
                  recentInquiries.map((inquiry, index) => (
                    <div key={inquiry.id} className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-slate-200 truncate">{inquiry.name}</h4>
                            <Badge 
                              variant="secondary" 
                              size="sm"
                              className={getUrgencyColor(inquiry.urgency_level)}
                            >
                              {inquiry.urgency_level}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-300 truncate">{inquiry.subject}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                            <span>{inquiry.email}</span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(inquiry.created_at)}
                            </span>
                          </div>
                        </div>
                        {inquiry.urgency_level === 'urgent' && (
                          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Activity Feed (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">New inquiry from Samsung Electronics</span>
                <span className="text-slate-500">2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-300">Published new blog post about iOS forensics</span>
                <span className="text-slate-500">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300">Updated mobile forensics service page</span>
                <span className="text-slate-500">3 hours ago</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard