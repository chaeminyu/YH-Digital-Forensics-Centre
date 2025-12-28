'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Tag,
  FileText,
  MoreVertical,
  ExternalLink
} from 'lucide-react'
import { Card, Badge, Button, Input, Select } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import { authUtils } from '@/utils/auth'
import { getCategoryName } from '@/utils/format'

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  thumbnail_url: string | null
  category: string
  tags: string
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
  source?: string
  external_url?: string
  training_date?: string
  client_name?: string
}

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null)
  const [deletingPost, setDeletingPost] = useState(false)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'press', label: 'Press & Media' },
    { value: 'training', label: 'Training Cases' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' }
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: number) => {
    try {
      setDeletingPost(true)
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts/${postId}`,
        { method: 'DELETE' }
      )
      
      if (response.ok) {
        setPosts((posts || []).filter(post => post.id !== postId))
        setShowDeleteDialog(null)
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    } finally {
      setDeletingPost(false)
    }
  }

  const filteredPosts = (posts || []).filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.toLowerCase().includes(searchQuery.toLowerCase())
    
    const postCategoryName = getCategoryName(post.category)
    const matchesCategory = categoryFilter === 'all' || postCategoryName === categoryFilter
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && post.is_published) ||
                         (statusFilter === 'draft' && !post.is_published)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blog': return FileText
      case 'press': return ExternalLink
      case 'training': return Calendar
      default: return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'blog': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'press': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'training': return 'text-purple-400 bg-purple-500/10 border-purple-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-slate-300">Loading posts...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Posts Management</h1>
            <p className="text-slate-400">Manage blog posts, press releases, and training case studies.</p>
          </div>
          <Link href="/admin/posts/new">
            <Button size="lg" className="mt-4 md:mt-0">
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Select>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" size="sm">
                {filteredPosts.length} posts
              </Badge>
            </div>
          </div>
        </Card>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No posts found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first post.'
              }
            </p>
            <Link href="/admin/posts/new">
              <Button>Create Your First Post</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post, index) => {
              const postCategoryName = getCategoryName(post.category)
              const CategoryIcon = getCategoryIcon(postCategoryName)
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:border-accent-400/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg border ${getCategoryColor(postCategoryName)}`}>
                            <CategoryIcon className="w-4 h-4" />
                          </div>
                          <Badge 
                            variant={post.is_published ? 'accent' : 'secondary'}
                            size="sm"
                          >
                            {post.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          <Badge variant="secondary" size="sm">
                            {getCategoryName(post.category)}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-slate-100 mb-2 line-clamp-1">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.view_count} views</span>
                          </div>
                          {post.tags && (
                            <div className="flex items-center space-x-1">
                              <Tag className="w-3 h-3" />
                              <span>{post.tags}</span>
                            </div>
                          )}
                          {postCategoryName === 'press' && post.source && (
                            <div className="flex items-center space-x-1">
                              <ExternalLink className="w-3 h-3" />
                              <span>{post.source}</span>
                            </div>
                          )}
                          {postCategoryName === 'training' && post.client_name && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.client_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Link href={`/admin/posts/edit/${post.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        <button
                          onClick={() => setShowDeleteDialog(post.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        {post.is_published && (
                          <Link 
                            href={`/${postCategoryName === 'blog' ? 'blog' : postCategoryName === 'press' ? 'press' : 'training'}/${post.id}`}
                            target="_blank"
                          >
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
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
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Delete Post</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDeletePost(showDeleteDialog)}
                  variant="destructive"
                  disabled={deletingPost}
                >
                  {deletingPost ? 'Deleting...' : 'Delete'}
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(null)}
                  variant="ghost"
                  disabled={deletingPost}
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

export default AdminPostsPage