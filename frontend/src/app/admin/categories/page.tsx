'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  FileText,
  AlertTriangle,
  Users
} from 'lucide-react'
import { Card, Badge, Button, Input, Textarea } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import { authUtils } from '@/utils/auth'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

interface CategoryForm {
  name: string
  slug: string
  description: string
}

const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState<Category | null>(null)
  const [formData, setFormData] = useState<CategoryForm>({
    name: '',
    slug: '',
    description: ''
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await authUtils.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`)
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      
      // Auto-generate slug from name
      if (name === 'name') {
        newData.slug = value.toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      }
      
      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      setSaving(true)
      setError('')

      const url = editingCategory 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${editingCategory.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
      
      const method = editingCategory ? 'PUT' : 'POST'

      const response = await authUtils.fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchCategories()
        handleCloseModal()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to save category')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (category: Category) => {
    try {
      setDeleting(true)
      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${category.id}`,
        { method: 'DELETE' }
      )
      
      if (response.ok) {
        setCategories(categories.filter(c => c.id !== category.id))
        setShowDeleteDialog(null)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || 'Failed to delete category')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete category')
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    })
    setShowCreateModal(true)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
    setEditingCategory(null)
    setFormData({ name: '', slug: '', description: '' })
    setError('')
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-slate-300">Loading categories...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Categories</h1>
            <p className="text-slate-400">Manage blog post categories and organize your content.</p>
          </div>
          
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Search */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" size="sm">
              {filteredCategories.length} categories
            </Badge>
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.length === 0 ? (
            <Card className="col-span-full p-12 text-center">
              <Tag className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No categories found</h3>
              <p className="text-slate-400 mb-4">
                {searchQuery ? 'Try adjusting your search query.' : 'Get started by creating your first category.'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Category
                </Button>
              )}
            </Card>
          ) : (
            filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:border-accent-400/30 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent-500/10 rounded-lg border border-accent-500/20">
                        <Tag className="w-4 h-4 text-accent-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100">{category.name}</h3>
                        <p className="text-sm text-slate-400">/{category.slug}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowDeleteDialog(category)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {category.description && (
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{category.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span>0 posts</span> {/* TODO: Add post count from backend */}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>ID: {category.id}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-600 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Digital Forensics"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
                    Slug *
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g., digital-forensics"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">URL-friendly version of the name</p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of this category..."
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={saving || !formData.name.trim()}>
                    {saving ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleCloseModal} disabled={saving}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-600 w-full max-w-md"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">Delete Category</h3>
              </div>
              
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete "<strong>{showDeleteDialog.name}</strong>"? 
                This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDelete(showDeleteDialog)}
                  variant="destructive"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Category'}
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

export default AdminCategoriesPage