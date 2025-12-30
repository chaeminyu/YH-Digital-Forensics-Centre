'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Tag,
  Search,
  Filter,
  ArrowRight,
  User,
  AlertCircle
} from 'lucide-react'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Button, 
  Card,
  Badge,
  Input,
  Select
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail_url: string | null
  category: {
    id: number
    name: string
  }
  tags: string
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}


const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=blog`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        const data = await response.json()
        const posts: BlogPost[] = data.posts || data // Handle both paginated and direct array response
        setBlogPosts(posts)
        
        // Extract unique categories from posts
        const uniqueCategories = ['All', ...new Set(posts.map(post => post.category.name))]
        setCategories(uniqueCategories)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load blog posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'Blog & Insights' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Expert Insights & Knowledge
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Blog & Insights
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Expert perspectives on digital forensics, cybersecurity trends, case studies, 
                and technical insights from our team of forensic specialists.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Search and Filter Section */}
      <Section variant="dark" padding="sm">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-accent-400" />
                <span className="text-slate-300 font-medium text-sm">Category:</span>
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent-400 text-slate-900'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        <Container>
          <SectionHeading
            title="Latest Articles"
            subtitle="Our Blog"
            description={
              isLoading 
                ? "Loading articles..." 
                : `${filteredPosts.length} articles ${selectedCategory !== 'All' ? `in ${selectedCategory}` : 'total'}`
            }
          />
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">
                  Error Loading Articles
                </h3>
                <p className="text-slate-400 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                >
                  Try Again
                </Button>
              </Card>
            </motion.div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-96 p-6 animate-pulse">
                  <div className="w-20 h-6 bg-slate-700 rounded mb-4"></div>
                  <div className="w-full h-8 bg-slate-700 rounded mb-3"></div>
                  <div className="w-full h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-slate-700 rounded mb-4"></div>
                  <div className="w-full h-px bg-slate-700 my-4"></div>
                  <div className="flex justify-between">
                    <div className="w-24 h-4 bg-slate-700 rounded"></div>
                    <div className="w-16 h-4 bg-slate-700 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : !error && filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-400">
                  {searchQuery || selectedCategory !== 'All' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No blog posts available at the moment.'}
                </p>
              </Card>
            </motion.div>
          ) : !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <Card variant="blog" className="h-full p-6">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <Badge variant="accent" size="sm">
                          {post.category.name}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-accent-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">
                          {post.tags}
                        </span>
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>5 min read</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.view_count}</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-accent-400 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Author */}
                      <div className="flex items-center space-x-2 mt-4">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-400">By Administrator</span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button (placeholder) */}
          {filteredPosts.length > 0 && filteredPosts.length >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="accent">
        <Container>
          <Card variant="glass" className="p-12 text-center border-accent-400/30">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Stay Informed
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get expert insights on digital forensics trends, case studies, and 
                best practices delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Contact Our Experts
                </Button>
                <Button href="/digital-forensic" variant="outline" size="lg">
                  Our Services
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default BlogPage