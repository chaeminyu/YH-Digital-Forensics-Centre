'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Clock,
  AlertTriangle,
  Building,
  Phone,
  CheckCircle,
  XCircle,
  ChevronDown
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
  const [onStatusUpdate, setOnStatusUpdate] = useState<(() => void) | null>(null)

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

  // Handle URL parameter for pre-selecting an inquiry
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const selectedId = urlParams.get('selected')
    if (selectedId && inquiries.length > 0) {
      const inquiry = inquiries.find(inq => inq.id === parseInt(selectedId))
      if (inquiry) {
        setSelectedInquiry(inquiry)
        // Remove the parameter from URL
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [inquiries])

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
      console.log('handleMarkAsRead called for inquiry:', inquiryId)
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${inquiryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'read' })
        }
      )
      
      if (response.ok) {
        console.log('Successfully marked inquiry as read:', inquiryId)
        const updatedInquiries = inquiries.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status: 'read' }
            : inquiry
        )
        setInquiries(updatedInquiries)
        
        // Also update selectedInquiry if it's the same one
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry({ ...selectedInquiry, status: 'read' })
        }
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleUpdateStatus = async (inquiryId: number, status: string) => {
    try {
      console.log('Updating inquiry status:', inquiryId, 'from', selectedInquiry?.status, 'to', status)
      
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inquiries/${inquiryId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      )
      
      console.log('Response:', response.status, response.statusText)
      
      if (response.ok) {
        const responseData = await response.json()
        console.log('Backend response data:', responseData)
        
        const updatedInquiries = inquiries.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status }
            : inquiry
        )
        setInquiries(updatedInquiries)
        console.log('Updated inquiries array for inquiry', inquiryId, 'with status:', status)
        
        // Update selected inquiry if it's the one being modified
        if (selectedInquiry?.id === inquiryId) {
          const newSelectedInquiry = { ...selectedInquiry, status }
          setSelectedInquiry(newSelectedInquiry)
          console.log('Updated selectedInquiry:', newSelectedInquiry)
        }
        
        // Trigger notification badge update in AdminLayout
        window.dispatchEvent(new CustomEvent('inquiryStatusChanged'))
        
        console.log('Status updated successfully to:', status)
      } else {
        const errorData = await response.json()
        console.error('Failed to update status:', errorData)
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
    console.log('Opening inquiry detail for:', inquiry.id, 'Status:', inquiry.status)
    setSelectedInquiry(inquiry)
    if (inquiry.status === 'new') {
      console.log('Marking as read because status is new')
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
      <div className="max-w-5xl mx-auto">
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
          <div className="space-y-3">
            {filteredInquiries.map((inquiry, index) => {
              const StatusIcon = getStatusIcon(inquiry.status)
              const isUrgent = inquiry.urgency_level === 'urgent'
              const isExpanded = selectedInquiry?.id === inquiry.id

              return (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    className={`transition-all duration-200 ${
                      isExpanded
                        ? 'border-accent-400/60 bg-accent-500/10 shadow-accent-500/10'
                        : inquiry.status === 'new'
                          ? 'bg-blue-500/5 border-blue-500/20 hover:border-accent-400/40'
                          : 'border-slate-600 hover:border-accent-400/40'
                    }`}
                  >
                    {/* Summary row — clickable to toggle */}
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => {
                        if (isExpanded) {
                          setSelectedInquiry(null)
                        } else {
                          openInquiryDetail(inquiry)
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
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

                          {!isExpanded && (
                            <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                              {inquiry.message}
                            </p>
                          )}

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
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Expanded details — inline accordion */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-700 p-6 space-y-5">
                            {inquiry.phone && (
                              <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-300">
                                  {inquiry.country_code || '+82'} {inquiry.phone}
                                </span>
                              </div>
                            )}

                            <div>
                              <h4 className="font-semibold text-slate-200 mb-2">Message</h4>
                              <div className="bg-slate-700/50 rounded-lg p-4">
                                <p className="text-slate-300 whitespace-pre-wrap">{inquiry.message}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                size="sm"
                                variant={inquiry.status === 'responded' ? 'outline' : 'primary'}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateStatus(inquiry.id, 'responded')
                                }}
                                disabled={inquiry.status === 'responded'}
                              >
                                {inquiry.status === 'responded' ? 'Responded' : 'Mark Responded'}
                              </Button>
                              <Button
                                size="sm"
                                variant={inquiry.status === 'closed' ? 'outline' : 'ghost'}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateStatus(inquiry.id, 'closed')
                                }}
                                disabled={inquiry.status === 'closed'}
                              >
                                {inquiry.status === 'closed' ? 'Closed' : 'Close'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`)
                                }}
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Reply via Email
                              </Button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowDeleteDialog(inquiry.id)
                                }}
                                className="ml-auto p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

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