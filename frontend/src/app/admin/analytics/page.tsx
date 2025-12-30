'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Clock,
  ExternalLink,
  Eye,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { Card, Badge, Button } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import { authUtils } from '@/utils/auth'

interface AnalyticsStats {
  total_visits: number
  unique_visitors: number
  visits_today: number
  visits_this_week: number
  visits_this_month: number
}

interface CountryStats {
  country_code: string
  country_name: string
  visit_count: number
  percentage: number
}

interface RecentVisit {
  id: number
  ip_masked: string
  page_path: string
  country_name: string
  country_code: string
  created_at: string
  user_agent: string
}

const getCountryFlag = (countryCode: string | null): string => {
  if (!countryCode) return '🌍'
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  
  return String.fromCodePoint(...codePoints)
}

const getTimeAgo = (dateString: string): string => {
  // Parse the date assuming it's already in KST
  const date = new Date(dateString)
  const now = new Date()
  
  // Convert both to KST for consistent comparison
  const kstOffset = 9 * 60 * 60 * 1000 // KST is UTC+9
  const dateKST = new Date(date.getTime() + kstOffset)
  const nowKST = new Date(now.getTime() + kstOffset)
  
  const diffInSeconds = Math.floor((nowKST.getTime() - dateKST.getTime()) / 1000)
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

const AnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats>({
    total_visits: 0,
    unique_visitors: 0,
    visits_today: 0,
    visits_this_week: 0,
    visits_this_month: 0
  })
  const [countries, setCountries] = useState<CountryStats[]>([])
  const [recentVisits, setRecentVisits] = useState<RecentVisit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [statsResponse, countriesResponse, recentResponse] = await Promise.all([
        authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/stats`),
        authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/countries`),
        authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/recent`)
      ])

      if (!statsResponse.ok || !countriesResponse.ok || !recentResponse.ok) {
        throw new Error('Failed to fetch analytics data')
      }

      const statsData = await statsResponse.json()
      const countriesData = await countriesResponse.json()
      const recentData = await recentResponse.json()

      console.log('Countries data:', countriesData);
      console.log('Recent visits data:', recentData);

      setStats(statsData)
      
      // Calculate percentages for countries data
      const totalVisits = statsData.total_visits || 0
      const countriesWithPercentage = (countriesData || []).map((country: any) => ({
        ...country,
        percentage: totalVisits > 0 ? (country.visit_count / totalVisits) * 100 : 0
      }))
      
      setCountries(countriesWithPercentage)
      setRecentVisits(recentData || [])
      
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
      setError('Failed to load analytics data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Visits',
      value: stats.total_visits,
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Unique Visitors',
      value: stats.unique_visitors,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Visits Today',
      value: stats.visits_today,
      icon: Calendar,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'Visits This Month',
      value: stats.visits_this_month,
      icon: TrendingUp,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
      borderColor: 'border-accent-500/20'
    }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-slate-300">Loading analytics...</div>
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
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Analytics</h1>
            <p className="text-slate-400">Monitor your website's visitor analytics and traffic patterns.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Badge variant="accent">
              <Activity className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-6 border border-red-500/20 bg-red-500/10">
            <div className="flex items-center space-x-2 text-red-400">
              <BarChart3 className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <Button 
              onClick={fetchAnalyticsData}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Retry
            </Button>
          </Card>
        )}

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
                    <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                      {(stat.value || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Country Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Visitors by Country
                </h2>
              </div>
              
              <div className="space-y-4">
                {countries.length === 0 ? (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No visitor data available yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-slate-400 uppercase tracking-wide pb-2 border-b border-slate-700">
                      <span>Country</span>
                      <span>Flag</span>
                      <span>Visits</span>
                      <span>%</span>
                    </div>
                    {countries.slice(0, 10).map((country, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 py-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <span className="text-slate-300 text-sm">
                          {country.country_name || 'Unknown'}
                        </span>
                        <span className="text-lg">
                          {getCountryFlag(country.country_code)}
                        </span>
                        <span className="text-slate-300 text-sm font-medium">
                          {country.visit_count.toLocaleString()}
                        </span>
                        <span className="text-accent-400 text-sm font-medium">
                          {country.percentage.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Visits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Visitors
                </h2>
              </div>
              
              <div className="space-y-4">
                {recentVisits.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No recent visitors</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-slate-400 uppercase tracking-wide pb-2 border-b border-slate-700">
                      <span>IP</span>
                      <span>Country</span>
                      <span>Page</span>
                      <span>Time</span>
                    </div>
                    {recentVisits.slice(0, 20).map((visit, index) => (
                      <div key={visit.id} className="grid grid-cols-4 gap-4 py-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <span className="text-slate-300 text-sm font-mono">
                          {visit.ip_masked}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">
                            {getCountryFlag(visit.country_code)}
                          </span>
                          <span className="text-slate-300 text-xs">
                            {visit.country_name || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Link 
                            href={visit.page_path} 
                            target="_blank"
                            className="text-accent-400 hover:text-accent-300 text-sm truncate flex items-center"
                          >
                            {visit.page_path}
                            <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                          </Link>
                        </div>
                        <span className="text-slate-400 text-xs">
                          {getTimeAgo(visit.created_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Empty State for No Data */}
        {stats.total_visits === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="p-12 text-center">
              <BarChart3 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-200 mb-2">No Analytics Data Yet</h3>
              <p className="text-slate-400 mb-6">
                Start driving traffic to your website to see analytics data here. 
                Visitor tracking is automatically enabled.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/admin/posts/new">
                  <Button>Create Content</Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={fetchAnalyticsData}
                >
                  Refresh Data
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AnalyticsPage