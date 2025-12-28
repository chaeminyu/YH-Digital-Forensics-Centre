'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Calendar,
  ArrowRight,
  Shield,
  Building,
  Tag
} from 'lucide-react'
import Link from 'next/link'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Button, 
  Card,
  Badge,
  Input
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

interface Post {
  id: number
  title: string
  excerpt: string
  thumbnail_url?: string
  category: string
  slug: string
  created_at: string
  tags: string
  is_published: boolean
}

const GeneralForensicsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=general-forensics`)
      
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts.filter((post: Post) => post.is_published))
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Digital Forensic', href: '/digital-forensic' },
    { label: 'General Forensics' }
  ]

  return (
    <>
      <div className="pt-6 pb-2">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </div>
      
      <Section className="pt-4">
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-accent-500/10 rounded-lg border border-accent-500/20">
                <Shield className="w-8 h-8 text-accent-400" />
              </div>
            </div>
            <SectionHeading 
              title="General Forensics"
              subtitle="General digital forensic investigations and case studies"
              align="center"
            />
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="p-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search general forensics posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>
          </motion.div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <Building className="w-16 h-16 text-slate-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-300 mb-4">No posts found</h3>
              <p className="text-slate-400 mb-6">
                {searchQuery ? 'Try adjusting your search query.' : 'No general forensics posts have been published yet.'}
              </p>
              <Button href="/digital-forensic" variant="ghost">
                ← Back to Digital Forensic
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={`post-${post.id}-${post.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/posts/${post.slug}`} className="block">
                    <Card className="group overflow-hidden hover:border-accent-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 cursor-pointer h-full">
                      {post.thumbnail_url && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.thumbnail_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="accent" size="sm">
                            General Forensics
                          </Badge>
                          <div className="flex items-center space-x-1 text-slate-500 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-accent-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-400 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {post.tags && (
                          <div className="flex items-center space-x-1 mb-4">
                            <Tag className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{post.tags}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-accent-400 text-sm font-medium">
                          <span className="mr-2">Read More</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-accent-500/10 to-primary-600/10 border-accent-500/20">
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Need General Digital Forensic Services?
              </h3>
              <p className="text-slate-400 mb-6">
                Contact our expert team for comprehensive digital investigation services.
              </p>
              <Button href="/contact" size="lg">
                Request Consultation
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

export default GeneralForensicsPage