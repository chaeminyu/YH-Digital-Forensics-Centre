'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Shield, 
  Scale, 
  Clock, 
  Globe,
  Monitor,
  Smartphone,
  Cloud,
  HardDrive,
  FileText,
  Users,
  Building,
  Landmark,
  UserSearch,
  ArrowRight,
  Calendar,
  Tag
} from 'lucide-react'
import Link from 'next/link'
import { getPostUrl } from '@/utils/postUrls'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Button, 
  Card, 
  ServiceCard,
  Badge
} from '@/components/ui'

const services = [
  {
    title: 'General Forensics',
    description: 'General digital forensic investigations and case studies covering comprehensive analysis methods.',
    icon: Shield,
    href: '/digital-forensic/general-forensics',
    features: ['Digital investigations', 'Case studies', 'Forensic analysis', 'Evidence collection']
  },
  {
    title: 'Evidence Forensics',
    description: 'Digital evidence analysis and preservation services with court-admissible documentation.',
    icon: FileText,
    href: '/digital-forensic/evidence-forensics',
    features: ['Evidence analysis', 'Data preservation', 'Chain of custody', 'Court documentation']
  },
  {
    title: 'Digital Crime',
    description: 'Digital crime investigation and cybercrime analysis for law enforcement and corporate clients.',
    icon: Scale,
    href: '/digital-forensic/digital-crime',
    features: ['Cybercrime investigation', 'Digital crime analysis', 'Law enforcement support', 'Corporate security']
  }
]

const features = [
  {
    title: '20+ Years Experience',
    description: 'Decades of combined experience in digital forensics and investigations',
    icon: Shield
  },
  {
    title: 'Court-Admissible Procedures',
    description: 'All investigations follow legally compliant chain of custody protocols',
    icon: Scale
  },
  {
    title: 'Fast & Confidential',
    description: 'Quick turnaround times while maintaining strict confidentiality',
    icon: Clock
  },
  {
    title: 'INTERPOL-Certified Expert',
    description: 'Our founder served at INTERPOL headquarters in Lyon and the Singapore Global Complex, bringing world-class forensic expertise to every case',
    icon: Globe
  }
]

const industries = [
  {
    title: 'Law Firms',
    description: 'Litigation support and expert witness services',
    icon: Scale
  },
  {
    title: 'Corporations',
    description: 'Internal investigations and compliance audits',
    icon: Building
  },
  {
    title: 'Government Agencies',
    description: 'Official investigations and regulatory compliance',
    icon: Landmark
  },
  {
    title: 'Private Investigations',
    description: 'Evidence collection for private cases',
    icon: UserSearch
  }
]

interface Post {
  id: number
  title: string
  excerpt: string
  thumbnail_url?: string
  category: string
  slug: string
  created_at: string
  tags?: string
  is_published: boolean
}

const HomePage: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    fetchLatestPosts()
  }, [])

  const fetchLatestPosts = async () => {
    try {
      setLoadingPosts(true)
      
      // Fetch posts from all three categories
      const categories = ['digital-forensic', 'general-forensics', 'evidence-forensics', 'digital-crime', 'press', 'training']
      
      const responses = await Promise.all(
        categories.map(async (category) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=${category}`)
            if (response.ok) {
              const data = await response.json()
              return data.posts || []
            }
            return []
          } catch (error) {
            console.error(`Failed to fetch ${category} posts:`, error)
            return []
          }
        })
      )
      
      // Combine all posts and filter published only
      const allPosts = responses.flat().filter((post: Post) => post.is_published)
      
      // Deduplicate using a more robust approach
      const seenIds = new Set()
      const seenSlugs = new Set()
      const uniquePosts = allPosts.filter((post) => {
        const uniqueKey = `${post.id}-${post.slug}`
        if (seenIds.has(post.id) || seenSlugs.has(post.slug)) {
          return false
        }
        seenIds.add(post.id)
        seenSlugs.add(post.slug)
        return true
      })
      
      // Sort by date (newest first) and take latest 6 posts
      const sortedPosts = uniquePosts
        .sort((a: Post, b: Post) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6)
      
      setLatestPosts(sortedPosts)
    } catch (error) {
      console.error('Failed to fetch latest posts:', error)
    } finally {
      setLoadingPosts(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general-forensics': return 'General Forensics'
      case 'evidence-forensics': return 'Evidence Forensics'
      case 'digital-crime': return 'Digital Crime'
      case 'press': return 'Press & Media'
      case 'training': return 'Training'
      default: return 'Digital Forensic'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general-forensics':
      case 'evidence-forensics':
      case 'digital-crime':
      case 'digital-forensic':
        return 'bg-accent-500/10 text-accent-400 border-accent-500/20'
      case 'press':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'training':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      default:
        return 'bg-accent-500/10 text-accent-400 border-accent-500/20'
    }
  }
  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden" padding="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left - Text Content (60%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 text-center lg:text-left"
            >
              <Badge variant="accent" className="mb-6">
                Trusted by Legal & Corporate Professionals
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight mb-6">
                Digital Forensics & 
                <span className="text-transparent bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text">
                  {' '}eDiscovery Experts
                </span>
                {' '}in Korea
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Computer, Mobile & Cloud Forensic Services for Legal Disputes, Investigations, and Compliance. 
                Court-admissible procedures with fast, confidential service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button href="/contact" size="lg">
                  Request Consultation
                </Button>
                <Button href="/digital-forensic" variant="secondary" size="lg">
                  Our Services
                </Button>
              </div>

              {/* Stats */}
              <Card variant="glass" className="p-6 border-accent-400/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent-400">20+</div>
                    <div className="text-xs md:text-sm text-slate-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent-400">1000+</div>
                    <div className="text-xs md:text-sm text-slate-400">Cases Handled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent-400">24/7</div>
                    <div className="text-xs md:text-sm text-slate-400">Emergency Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent-400">100%</div>
                    <div className="text-xs md:text-sm text-slate-400">Confidential</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right - Founder Image (40%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2 relative"
            >
              <div className="relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-2xl blur-2xl transform scale-105" />
                
                {/* Image container */}
                <div className="relative">
                  {/* Fallback placeholder if image fails */}
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-accent-500/10 to-primary-600/10 rounded-xl border border-accent-400/20 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-16 h-16 text-accent-400 mx-auto mb-4" />
                      <div className="text-lg font-semibold text-slate-100">YH Digital Forensic</div>
                      <div className="text-sm text-slate-400">Expert Investigation Services</div>
                    </div>
                  </div>
                  
                  {/* Actual image - will overlay the placeholder if it loads */}
                  <Image
                    src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/home-main.jpeg"
                    alt="YH Digital Forensic Center Founder"
                    width={600}
                    height={750}
                    priority
                    className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl border border-accent-400/20"
                    style={{ display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-xl" />
                </div>
                
                {/* Professional badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Card variant="glass" className="p-4 text-center border-accent-400/30">
                    <div className="text-sm font-semibold text-slate-100">Leading Digital Forensics Expert</div>
                    <div className="text-xs text-slate-400 mt-1">20+ Years of Investigation Experience</div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Why Choose Us"
            subtitle="Our Advantages"
            description="We combine technical expertise with legal compliance to deliver reliable forensic analysis for your most critical investigations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 mx-auto mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* INTERPOL Experience Section */}
      <Section variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionHeading
              title="International Experience"
              subtitle="INTERPOL Partnership"
              description="Our founder's extensive experience at INTERPOL headquarters brings world-class expertise to every case."
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* INTERPOL Headquarters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="relative">
                  <img
                    src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/about/interpol-head.jpg"
                    alt="INTERPOL Headquarters, Lyon, France"
                    className="w-full h-64 object-cover object-top rounded-lg"
                    style={{ objectPosition: 'center 20%' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-64 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-lg flex items-center justify-center border border-accent-400/20">
                            <div class="text-center">
                              <div class="w-16 h-16 bg-accent-400/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg class="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              </div>
                              <p class="text-slate-300 font-medium">INTERPOL Headquarters</p>
                              <p class="text-slate-400 text-sm">Lyon, France</p>
                            </div>
                          </div>
                        `
                      }
                    }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    INTERPOL Headquarters
                  </h3>
                  <p className="text-slate-400 mb-3">Lyon, France</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Direct experience working at the global headquarters of the International Criminal Police Organization, 
                    contributing to international cybercrime investigations and digital forensics standards.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* INTERPOL Singapore */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="relative">
                  <img
                    src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/about/inerpol-sg.jpg"
                    alt="INTERPOL Global Complex for Innovation, Singapore"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-64 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-lg flex items-center justify-center border border-accent-400/20">
                            <div class="text-center">
                              <div class="w-16 h-16 bg-accent-400/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg class="w-8 h-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                </svg>
                              </div>
                              <p class="text-slate-300 font-medium">INTERPOL Global Complex</p>
                              <p class="text-slate-400 text-sm">Singapore</p>
                            </div>
                          </div>
                        `
                      }
                    }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    INTERPOL Global Complex
                  </h3>
                  <p className="text-slate-400 mb-3">Singapore</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Collaborative work at INTERPOL's innovation hub in Singapore, focusing on emerging cybercrime trends 
                    and advanced digital forensics methodologies for international law enforcement.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Services Overview Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Our Digital Forensic Services"
            subtitle="What We Do"
            description="Comprehensive forensic analysis services to meet all your investigation and legal compliance needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/digital-forensic" variant="outline" size="lg">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Industries Section */}
      <Section variant="accent">
        <Container>
          <SectionHeading
            title="Who We Serve"
            subtitle="Our Clients"
            description="We frequently support attorneys during litigation, providing forensic reports suitable for court submission and expert testimony services."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6 text-center h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 mx-auto mb-4">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest Updates */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Latest Updates"
            subtitle="Recent News & Insights"
            description="Stay informed with our latest digital forensics insights, press coverage, and training case studies."
          />
          
          {loadingPosts ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-slate-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-300 mb-4">No Posts Yet</h3>
              <p className="text-slate-400 mb-8">Check back soon for the latest updates and insights.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {latestPosts.map((post, index) => (
                  <motion.div
                    key={`post-${post.id}-${post.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={getPostUrl(post)}>
                      <Card className="group h-full overflow-hidden hover:border-accent-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 cursor-pointer">
                        {post.thumbnail_url && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.thumbnail_url}
                              alt={post.title}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge 
                              className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(post.category)}`}
                            >
                              {getCategoryLabel(post.category)}
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
                              <span className="text-xs text-slate-500 truncate">{post.tags}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center text-accent-400 text-sm font-medium group-hover:text-accent-300 transition-colors">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/digital-forensic" variant="outline">
                    View Digital Forensics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href="/press" variant="outline">
                    View Press & Media
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href="/training" variant="outline">
                    View Training Cases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <Card variant="glass" className="p-12 text-center border-accent-400/30">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Need Digital Forensic Support?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Free initial consultation available. Contact us today to discuss your investigation needs and how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Contact Us Today
                </Button>
                <Button href="/digital-forensic" variant="outline" size="lg">
                  Learn About Our Services
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default HomePage