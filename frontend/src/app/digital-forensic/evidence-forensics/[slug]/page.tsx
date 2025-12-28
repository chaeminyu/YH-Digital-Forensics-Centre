'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Tag,
  ArrowLeft,
  Eye,
  Share2
} from 'lucide-react'
import Link from 'next/link'
import { 
  Section, 
  Container, 
  Button,
  Badge
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  thumbnail_url?: string
  tags?: string
  view_count: number
  created_at: string
  category?: {
    id: number
    name: string
    slug: string
  }
}

export default function PostDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link href="/digital-forensic/evidence-forensics">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Evidence Forensics
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Container className="py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Digital Forensic', href: '/digital-forensic' },
            { label: 'Evidence Forensics', href: '/digital-forensic/evidence-forensics' },
            { label: post.title }
          ]} 
        />

        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/digital-forensic/evidence-forensics">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Evidence Forensics
                </Button>
              </Link>
            </div>

            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="accent" size="sm">
                  Evidence Forensics
                </Badge>
                {post.tags && (
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Tag className="w-3 h-3" />
                    <span className="text-xs">{post.tags}</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6 text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{post.view_count} views</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {post.excerpt && (
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {post.thumbnail_url && (
              <div className="mb-8">
                <img 
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Post Content */}
            <Section>
              <div 
                className="prose prose-lg prose-slate prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Section>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <Link href="/digital-forensic/evidence-forensics">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    More Evidence Forensics
                  </Button>
                </Link>
                
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </motion.div>
        </article>
      </Container>
    </div>
  )
}