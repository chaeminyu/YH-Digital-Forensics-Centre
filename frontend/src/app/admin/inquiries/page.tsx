'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Mail,
  MailOpen,
  Trash2,
  Clock,
  AlertTriangle,
  Eye,
  Building,
  Phone,
  Calendar,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Card, Badge, Button, Input, Select } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import { authUtils } from '@/utils/auth'

interface Inquiry {
  id: number
  name: string
  email: string
  country_code?: string
  phone?: string
  company?: string
  subject: string
  message: string
  urgency_level: string
  status: string
  created_at: string
}

const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [urgencyFilter, setUrgencyFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Inquiries' },
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'responded', label: 'Responded' },
    { value: 'closed', label: 'Closed' }
  ]

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency Levels' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' }
  ]

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const response = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries`)
      if (response.ok) {
        const data = await response.json()
        const inquiries = data.inquiries || data || []
        setInquiries(inquiries)
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (inquiryId: number) => {
    try {
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${inquiryId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ status: 'read' })
        }
      )
      
      if (response.ok) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status: 'read' }
            : inquiry
        ))
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleUpdateStatus = async (inquiryId: number, status: string) => {
    try {
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${inquiryId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ status })
        }
      )
      
      if (response.ok) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status }
            : inquiry
        ))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleDeleteInquiry = async (inquiryId: number) => {
    try {
      setDeleting(true)
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${inquiryId}`,
        { method: 'DELETE' }
      )
      
      if (response.ok) {
        setInquiries(inquiries.filter(inquiry => inquiry.id !== inquiryId))
        setShowDeleteDialog(null)
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error)
    } finally {
      setDeleting(false)
    }
  }

  const openInquiryDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    if (inquiry.status === 'new') {
      handleMarkAsRead(inquiry.id)
    }
  }

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    const matchesUrgency = urgencyFilter === 'all' || inquiry.urgency_level === urgencyFilter
    
    return matchesSearch && matchesStatus && matchesUrgency
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
      case 'normal': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'low': return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'read': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'responded': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'closed': return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return Mail
      case 'read': return MailOpen
      case 'responded': return CheckCircle
      case 'closed': return XCircle
      default: return Mail
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-slate-300">Loading inquiries...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
        {/* Inquiries List */}
        <div className="xl:col-span-2 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Inquiries Management</h1>
            <p className="text-slate-400">Manage customer inquiries and support requests.</p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              
              <Select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
              >
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" size="sm">
                  {filteredInquiries.length} inquiries
                </Badge>
                <Badge variant="accent" size="sm">
                  {filteredInquiries.filter(i => i.status === 'new').length} new
                </Badge>
              </div>
            </div>
          </Card>

          {/* Inquiries List */}
          <div className="flex-1 overflow-hidden">
            {filteredInquiries.length === 0 ? (
              <Card className="p-12 text-center">
                <Mail className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No inquiries found</h3>
                <p className="text-slate-400">
                  {searchQuery || statusFilter !== 'all' || urgencyFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No customer inquiries have been received yet.'
                  }
                </p>
              </Card>
            ) : (
              <div className="space-y-3 overflow-y-auto h-full pr-2">
                {filteredInquiries.map((inquiry, index) => {
                  const StatusIcon = getStatusIcon(inquiry.status)
                  const isUrgent = inquiry.urgency_level === 'urgent'
                  
                  return (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card 
                        className={`p-4 cursor-pointer transition-all duration-200 hover:border-accent-400/40 hover:shadow-lg hover:shadow-accent-500/5 ${
                          selectedInquiry?.id === inquiry.id 
                            ? 'border-accent-400/60 bg-accent-500/10 shadow-accent-500/10' 
                            : inquiry.status === 'new' 
                              ? 'bg-blue-500/5 border-blue-500/20' 
                              : 'border-slate-600'
                        }`}
                        onClick={() => openInquiryDetail(inquiry)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className={`p-1 rounded border ${getStatusColor(inquiry.status)}`}>
                                <StatusIcon className="w-3 h-3" />
                              </div>
                              <Badge variant="secondary" size="sm" className={getUrgencyColor(inquiry.urgency_level)}>
                                {inquiry.urgency_level}
                              </Badge>
                              {isUrgent && (
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                            
                            <h3 className="font-semibold text-slate-200 mb-1 line-clamp-1">
                              {inquiry.subject}
                            </h3>
                            
                            <p className="text-sm text-slate-400 mb-2 line-clamp-1">
                              From: {inquiry.name} ({inquiry.email})
                            </p>
                            
                            <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                              {inquiry.message}
                            </p>
                            
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(inquiry.created_at)}</span>
                              </div>
                              {inquiry.company && (
                                <div className="flex items-center space-x-1">
                                  <Building className="w-3 h-3" />
                                  <span>{inquiry.company}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Detail Panel */}
        <div className="xl:col-span-1">
          {selectedInquiry ? (
            <Card className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-100">Inquiry Details</h2>
                <button
                  onClick={() => setShowDeleteDialog(selectedInquiry.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-medium text-slate-200">{selectedInquiry.name}</div>
                    <div className="text-sm text-slate-400">{selectedInquiry.email}</div>
                  </div>
                </div>
                
                {selectedInquiry.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">
                      {selectedInquiry.country_code || '+82'} {selectedInquiry.phone}
                    </span>
                  </div>
                )}
                
                {selectedInquiry.company && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{selectedInquiry.company}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{formatDate(selectedInquiry.created_at)}</span>
                </div>
              </div>
              
              {/* Status & Urgency */}
              <div className="flex items-center space-x-3 mb-6">
                <Badge variant="secondary" className={getStatusColor(selectedInquiry.status)}>
                  {selectedInquiry.status}
                </Badge>
                <Badge variant="secondary" className={getUrgencyColor(selectedInquiry.urgency_level)}>
                  {selectedInquiry.urgency_level} priority
                </Badge>
              </div>
              
              {/* Subject */}
              <div className="mb-4">
                <h3 className="font-semibold text-slate-200 mb-2">Subject</h3>
                <p className="text-slate-300">{selectedInquiry.subject}</p>
              </div>
              
              
              {/* Message */}
              <div className="flex-1 mb-6">
                <h3 className="font-semibold text-slate-200 mb-2">Message</h3>
                <div className="bg-slate-700/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === 'responded' ? 'outline' : 'primary'}
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'responded')}
                    disabled={selectedInquiry.status === 'responded'}
                  >
                    {selectedInquiry.status === 'responded' ? 'Responded' : 'Mark Responded'}
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === 'closed' ? 'outline' : 'ghost'}
                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'closed')}
                    disabled={selectedInquiry.status === 'closed'}
                  >
                    {selectedInquiry.status === 'closed' ? 'Closed' : 'Close'}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center h-full flex items-center justify-center">
              <div>
                <Eye className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Select an Inquiry</h3>
                <p className="text-slate-400">
                  Choose an inquiry from the list to view its details and respond.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-600 w-96"
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Delete Inquiry</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete this inquiry? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDeleteInquiry(showDeleteDialog)}
                  variant="destructive"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(null)}
                  variant="ghost"
                  disabled={deleting}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminInquiriesPage