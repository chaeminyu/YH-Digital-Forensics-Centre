'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Calendar,
  Clock,
  Eye,
  Tag,
  User,
  Share2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Hash
} from 'lucide-react'
import { 
  Section, 
  SectionHeading,
  Container, 
  Button, 
  Card,
  Badge
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


const BlogDetailPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [tableOfContents, setTableOfContents] = useState<Array<{id: string, title: string, level: number}>>([])
  const [activeSection, setActiveSection] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const postData: BlogPost = await response.json()
        setPost(postData)
        
        // Generate table of contents from content headings
        if (postData.content) {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = postData.content
          const headings = tempDiv.querySelectorAll('h2, h3, h4')
          
          const toc = Array.from(headings).map((heading, index) => ({
            id: `heading-${index}`,
            title: heading.textContent || '',
            level: parseInt(heading.tagName.charAt(1))
          }))
          
          setTableOfContents(toc)
        }
        
        // Fetch related posts
        const relatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=blog&limit=3`)
        if (relatedResponse.ok) {
          const related: BlogPost[] = await relatedResponse.json()
          setRelatedPosts(related.filter(p => p.id !== postData.id).slice(0, 3))
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    // You could add a toast notification here
  }

  if (isLoading) {
    return (
      <Section className="relative" padding="lg">
        <Container>
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-32 mb-8"></div>
            <div className="h-12 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-slate-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-700 rounded w-4/5"></div>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  if (error || !post) {
    return (
      <Section className="relative" padding="lg">
        <Container>
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Post Not Found</h2>
            <p className="text-slate-400 mb-6">{error || 'The blog post you requested could not be found.'}</p>
            <Button href="/blog" variant="outline">
              Back to Blog
            </Button>
          </Card>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title }
            ]}
            className="mb-8"
          />
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Badge variant="accent">{post.category.name}</Badge>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count} views</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300 font-medium">By Administrator</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-400">Share:</span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Copy Link</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section variant="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-accent-400" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-colors ${
                          activeSection === item.id
                            ? 'text-accent-400 font-medium'
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                        style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </Card>

                {/* Share Section */}
                <Card className="p-6 mt-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-accent-400" />
                    Share Article
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    >
                      <Hash className="w-4 h-4 text-accent-400" />
                      <span className="text-sm text-slate-300">Copy Link</span>
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-8">
                  <div 
                    className="prose prose-slate prose-lg max-w-none text-slate-300 leading-relaxed [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4 [&_img]:block"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <div className="flex items-center space-x-3 mb-4">
                      <Tag className="w-4 h-4 text-accent-400" />
                      <span className="text-sm font-medium text-slate-300">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.split(', ').map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Link href="/blog" className="flex items-center space-x-2 text-accent-400 hover:text-accent-300 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Blog</span>
                </Link>
                
                <Button href="/contact" variant="outline">
                  Need Forensic Help?
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      <Section>
        <Container>
          <SectionHeading
            title="Related Articles"
            subtitle="Continue Reading"
            description="More expert insights and analysis from our digital forensics team."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <Card className="p-6 h-full hover:border-accent-400/30 transition-colors">
                    <Badge variant="secondary" size="sm" className="mb-3">
                      {post.category.name}
                    </Badge>
                    
                    <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-accent-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 text-accent-400 text-sm">
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
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
                Need Digital Forensic Assistance?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Our experts are ready to help with your digital forensic needs. 
                Contact us for professional consultation and investigation services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Contact Our Team
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

export default BlogDetailPage