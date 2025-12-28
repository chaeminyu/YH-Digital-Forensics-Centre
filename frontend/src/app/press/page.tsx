'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Newspaper,
  Calendar,
  ExternalLink,
  Filter,
  Mail,
  Phone,
  Download,
  BookOpen,
  AlertCircle
} from 'lucide-react'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Button, 
  Card,
  Badge,
  Select
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

interface PressPost {
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
const PressPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [pressPosts, setPressPosts] = useState<PressPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPressPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=press`)
        if (!response.ok) {
          throw new Error('Failed to fetch press posts')
        }
        const data = await response.json()
        const posts: PressPost[] = data.posts || data
        setPressPosts(posts)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load press posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPressPosts()
  }, [])

  // Get unique years for filter from pressPosts
  const years = ['all', ...Array.from(new Set(pressPosts.map(post => new Date(post.created_at).getFullYear().toString())))]

  // Filter press releases by year
  const filteredReleases = selectedYear === 'all' 
    ? pressPosts 
    : pressPosts.filter(post => new Date(post.created_at).getFullYear().toString() === selectedYear)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'Press & Media' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Press & Media Coverage
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Press & Media
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                News and media coverage about YH Digital Forensic Center. 
                Stay updated on our latest achievements, expert insights, and industry recognition.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Filter Section */}
      <Section variant="dark" padding="sm">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-accent-400" />
              <span className="text-slate-300 font-medium">Filter by Year:</span>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Container>
      </Section>

      {/* Press Releases List */}
      <Section>
        <Container>
          <SectionHeading
            title="Press Releases & Coverage"
            subtitle="Latest News"
            description={
              isLoading 
                ? "Loading press releases..." 
                : `${filteredReleases.length} press ${filteredReleases.length === 1 ? 'release' : 'releases'} ${selectedYear !== 'all' ? `from ${selectedYear}` : 'total'}`
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
                  Error Loading Press Releases
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
            <div className="space-y-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="p-8 animate-pulse">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg"></div>
                    <div className="flex-grow">
                      <div className="w-24 h-4 bg-slate-700 rounded mb-2"></div>
                      <div className="w-3/4 h-6 bg-slate-700 rounded mb-4"></div>
                      <div className="w-full h-4 bg-slate-700 rounded mb-2"></div>
                      <div className="w-2/3 h-4 bg-slate-700 rounded mb-6"></div>
                      <div className="w-32 h-8 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : !error && filteredReleases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">
                  No press releases found
                </h3>
                <p className="text-slate-400">
                  {selectedYear !== 'all' 
                    ? `No press releases available for ${selectedYear}.`
                    : 'No press releases available at the moment.'}
                </p>
              </Card>
            </motion.div>
          ) : !error && (
            <div className="space-y-8">
              {filteredReleases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover:border-accent-400/30 transition-colors group">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Date Badge */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent-400/20 text-accent-400">
                          <Calendar className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant="secondary" size="sm">
                                {release.category.name}
                              </Badge>
                              <span className="text-sm text-slate-400">
                                {formatDate(release.created_at)}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-100 group-hover:text-accent-400 transition-colors leading-tight">
                              {release.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed mb-6">
                          {release.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <Button
                            href={`/blog/${release.slug}`}
                            variant="outline"
                            size="sm"
                            className="group"
                          >
                            Read Full Article
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredReleases.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 text-center">
                <Newspaper className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">
                  No press releases found
                </h3>
                <p className="text-slate-400">
                  No press releases found for the selected year. Please try a different filter.
                </p>
              </Card>
            </motion.div>
          )}

          {/* Load More Button (placeholder) */}
          {filteredReleases.length > 0 && filteredReleases.length >= 8 && (
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

      {/* Media Contact Section */}
      <Section variant="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Media Contact"
                subtitle="Press Inquiries"
                align="left"
                description="For press inquiries, interview requests, or media kits, please contact our communications team."
                className="mb-8"
              />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent-400" />
                  <div>
                    <div className="text-slate-300 font-medium">Email</div>
                    <a 
                      href="mailto:press@yhdfc.com"
                      className="text-accent-400 hover:text-accent-300 transition-colors"
                    >
                      press@yhdfc.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent-400" />
                  <div>
                    <div className="text-slate-300 font-medium">Phone</div>
                    <a 
                      href="tel:+82-2-1234-5678"
                      className="text-accent-400 hover:text-accent-300 transition-colors"
                    >
                      +82-2-1234-5678
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20">
                <h3 className="text-xl font-semibold text-slate-100 mb-6">
                  Media Resources
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Company Logo Package</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Executive Headshots</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Company Fact Sheet</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                    Media kit materials are available for download. 
                    For custom requests or additional resources, please contact our press team.
                  </p>
                </div>
              </Card>
            </motion.div>
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
                Stay Updated
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Follow our latest news and expert insights in digital forensics. 
                Contact us for interviews or expert commentary on cybersecurity trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Contact Press Team
                </Button>
                <Button href="/blog" variant="outline" size="lg">
                  Read Our Blog
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default PressPage