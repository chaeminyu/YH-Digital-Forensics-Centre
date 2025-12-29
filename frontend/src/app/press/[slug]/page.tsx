'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Eye,
  ArrowLeft,
  Newspaper,
  Tag,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { 
  Section, 
  Container, 
  Button, 
  Card,
  Badge
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'
import { Post } from '@/types'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

const PressPostPage: React.FC<PostPageProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    initializeParams()
  }, [])

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`)
      
      if (!response.ok) {
        throw new Error('Post not found')
      }
      
      const data = await response.json()
      setPost(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <Section className="py-16">
        <Container>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </Container>
      </Section>
    )
  }

  if (error || !post) {
    return (
      <Section className="py-16">
        <Container>
          <Card className="p-12 text-center">
            <h1 className="text-2xl font-bold text-slate-300 mb-4">Post Not Found</h1>
            <p className="text-slate-400 mb-6">{error}</p>
            <Button href="/press" variant="outline">
              ← Back to Press & Media
            </Button>
          </Card>
        </Container>
      </Section>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Press & Media', href: '/press' },
    { label: post.title }
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link 
                href="/press"
                className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Press & Media
              </Link>
            </motion.div>

            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-accent-500/10 rounded-lg border border-accent-500/20">
                  <Newspaper className="w-6 h-6 text-accent-400" />
                </div>
                <Badge variant="accent">
                  Press & Media
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.view_count} views</span>
                </div>
                
                {post.tags && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>{post.tags}</span>
                  </div>
                )}
              </div>
            </motion.header>

            {post.thumbnail_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-80 lg:h-96 object-cover rounded-xl"
                />
              </motion.div>
            )}

            {/* Press Release Link Section - Only for Press Posts with External URL */}
            {post.category?.slug === 'press' && post.external_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <Card variant="glass" className="p-6 border-accent-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent-400/20 rounded-lg">
                        <ExternalLink className="w-5 h-5 text-accent-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100 mb-1">
                          Original Press Release
                        </h3>
                        <p className="text-sm text-slate-400">
                          Read the full press release on our media platform
                        </p>
                      </div>
                    </div>
                    <a
                      href={post.external_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-accent-400 text-black rounded-lg hover:bg-accent-300 transition-colors font-medium"
                    >
                      View Press Release
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-slate prose-lg max-w-none prose-invert"
            >
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-slate-300 leading-relaxed"
              />
            </motion.article>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-slate-700"
            >
              <div className="flex justify-between">
                <Button href="/press" variant="outline">
                  ← More Articles
                </Button>
                <Button href="/contact" variant="primary">
                  Need Help? Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default PressPostPage