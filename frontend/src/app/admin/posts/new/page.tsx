'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Calendar,
  ExternalLink,
  Building,
  Tag,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { Card, Badge, Button, Input, Textarea, Select } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { authUtils } from '@/utils/auth'

interface PostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail_url: string
  category: string
  subcategory?: string
  tags: string
  is_published: boolean
  source?: string
  external_url?: string
  training_date?: string
  client_name?: string
}

const NewPostPage: React.FC = () => {
  const [formData, setFormData] = useState<PostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    thumbnail_url: '',
    category: 'digital-forensic',
    subcategory: 'general-forensics',
    tags: '',
    is_published: false
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const categories = [
    { value: 'digital-forensic', label: 'Digital Forensic' },
    { value: 'press', label: 'Press & Media' },
    { value: 'training', label: 'Training Case Study' }
  ]

  const subcategories = {
    'digital-forensic': [
      { value: 'general-forensics', label: 'General Forensics' },
      { value: 'evidence-forensics', label: 'Evidence Forensics' },
      { value: 'digital-crime', label: 'Digital Crime' }
    ]
  }

  // Debug: log categories
  console.log('Categories:', categories)

  // Function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }
      
      // Auto-generate slug when title changes
      if (name === 'title') {
        newData.slug = generateSlug(value)
      }
      
      // Reset subcategory when main category changes
      if (name === 'category' && value !== 'digital-forensic') {
        delete newData.subcategory
      } else if (name === 'category' && value === 'digital-forensic') {
        newData.subcategory = 'general-forensics'
      }
      
      return newData
    })
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }))
  }

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true)
      setError('')

      // Map category/subcategory to category_id
      let categoryId = null
      if (formData.category === 'digital-forensic' && formData.subcategory) {
        // Map subcategories to their actual IDs in the database
        const categoryMapping = {
          'general-forensics': 2,
          'evidence-forensics': 3, 
          'digital-crime': 4
        }
        categoryId = categoryMapping[formData.subcategory]
      } else if (formData.category === 'press') {
        categoryId = 5
      } else if (formData.category === 'training') {
        categoryId = 6
      }

      const submitData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        thumbnail_url: formData.thumbnail_url,
        category_id: categoryId,
        tags: formData.tags,
        is_published: publish
      }

      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/posts`,
        {
          method: 'POST',
          body: JSON.stringify(submitData)
        }
      )

      if (response.ok) {
        const newPost = await response.json()
        router.push('/admin/posts')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to save post')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await authUtils.fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, thumbnail_url: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'digital-forensic': return Building
      case 'press': return ExternalLink
      case 'training': return Calendar
      default: return Building
    }
  }

  const CategoryIcon = getCategoryIcon(formData.category)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">Create New Post</h1>
              <p className="text-slate-400">Write and publish content for your digital forensics platform.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleSave(false)}
              variant="outline"
              disabled={saving || !formData.title}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saving || !formData.title || !formData.content}
            >
              <Eye className="w-4 h-4 mr-2" />
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card className="p-6">
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Post Title *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title for your post"
                className="text-xl"
                required
              />
            </Card>

            {/* Slug */}
            <Card className="p-6">
              <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-2">
                URL Slug *
              </label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="url-friendly-slug"
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Auto-generated from title. Used in URL: /{formData.category || 'category'}{formData.subcategory ? `/${formData.subcategory}` : ''}/{formData.slug || 'your-slug-here'}
              </p>
            </Card>

            {/* Excerpt */}
            <Card className="p-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-300 mb-2">
                Excerpt
              </label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the post content (used in previews)"
                rows={3}
              />
            </Card>

            {/* Rich Text Editor */}
            <Card className="p-6">
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Content *
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your post content..."
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                    Main Category
                  </label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Subcategory for Digital Forensic */}
                {formData.category === 'digital-forensic' && (
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-slate-300 mb-2">
                      Digital Forensic Type
                    </label>
                    <Select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory || ''}
                      onChange={handleInputChange}
                    >
                      {subcategories['digital-forensic'].map((subcategory) => (
                        <option key={subcategory.value} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Comma-separated tags"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Separate multiple tags with commas
                  </p>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Thumbnail Image
                  </label>
                  <div className="space-y-2">
                    <Input
                      name="thumbnail_url"
                      value={formData.thumbnail_url}
                      onChange={handleInputChange}
                      placeholder="Image URL or upload below"
                    />
                    <div className="flex items-center space-x-2">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex items-center justify-center p-3 border border-slate-600 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="text-sm">Upload Image</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Category-specific Fields */}
            {formData.category === 'press' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-green-400" />
                  Press Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-slate-300 mb-2">
                      Source
                    </label>
                    <Input
                      id="source"
                      name="source"
                      value={formData.source || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. TechCrunch, Forbes, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="external_url" className="block text-sm font-medium text-slate-300 mb-2">
                      External URL
                    </label>
                    <Input
                      id="external_url"
                      name="external_url"
                      value={formData.external_url || ''}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </Card>
            )}

            {formData.category === 'digital-forensic' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-400" />
                  Digital Forensic Settings
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-300">
                      This post will be published under: <strong>{subcategories['digital-forensic'].find(sub => sub.value === formData.subcategory)?.label}</strong>
                    </p>
                    <p className="text-xs text-blue-400 mt-1">
                      Digital forensic posts help showcase your expertise in specific investigation areas.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {formData.category === 'training' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                  Training Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="client_name" className="block text-sm font-medium text-slate-300 mb-2">
                      Client Name
                    </label>
                    <Input
                      id="client_name"
                      name="client_name"
                      value={formData.client_name || ''}
                      onChange={handleInputChange}
                      placeholder="Company or organization name"
                    />
                  </div>
                  <div>
                    <label htmlFor="training_date" className="block text-sm font-medium text-slate-300 mb-2">
                      Training Date
                    </label>
                    <Input
                      id="training_date"
                      name="training_date"
                      type="date"
                      value={formData.training_date || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Preview</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-accent-500/10 rounded border border-accent-500/20">
                    <CategoryIcon className="w-4 h-4 text-accent-400" />
                  </div>
                  <Badge variant="accent" size="sm">
                    {formData.category === 'digital-forensic' && formData.subcategory
                      ? subcategories['digital-forensic'].find(sub => sub.value === formData.subcategory)?.label
                      : categories.find(cat => cat.value === formData.category)?.label
                    }
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-slate-200 line-clamp-2">
                  {formData.title || 'Post Title'}
                </h4>
                
                <p className="text-sm text-slate-400 line-clamp-3">
                  {formData.excerpt || 'Post excerpt will appear here...'}
                </p>
                
                {formData.tags && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    <span className="text-xs text-slate-500">{formData.tags}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default NewPostPage