'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap,
  Users,
  Shield,
  FileCheck,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  BookOpen,
  Award
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
import { getPostUrl } from '@/utils/postUrls'
import { Post } from '@/types'
const whyChooseTraining = [
  {
    title: 'Expert Instructors',
    description: 'Learn from certified professionals with real-world forensic investigation experience',
    icon: Users
  },
  {
    title: 'Practical Scenarios',
    description: 'Hands-on training with realistic case studies and industry-specific examples',
    icon: FileCheck
  },
  {
    title: 'Flexible Delivery',
    description: 'On-site, online, or hybrid training options to meet your organizational needs',
    icon: Globe
  },
  {
    title: 'Ongoing Support',
    description: 'Continued consultation and support after training completion',
    icon: Shield
  }
]

const TrainingPage: React.FC = () => {
  const [trainingPosts, setTrainingPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTrainingPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=Training`)
        if (!response.ok) {
          throw new Error('Failed to fetch training posts')
        }
        const data = await response.json()
        const posts: Post[] = data.posts || data
        setTrainingPosts(posts)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load training posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainingPosts()
  }, [])

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
            items={[{ label: 'Corporate Training' }]}
            className="mb-8"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Professional Education
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Corporate Training
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Digital forensics awareness and skills training for organizations. 
                Comprehensive training programs designed to enhance your team's 
                understanding of digital evidence, incident response, and compliance requirements.
              </p>

              <Button href="/contact" size="lg">
                Request Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400 mb-2">500+</div>
                    <div className="text-sm text-slate-400">Professionals Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400 mb-2">50+</div>
                    <div className="text-sm text-slate-400">Training Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400 mb-2">25+</div>
                    <div className="text-sm text-slate-400">Organizations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-400 mb-2">98%</div>
                    <div className="text-sm text-slate-400">Satisfaction Rate</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Why Training Matters Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Why Digital Forensics Training Matters"
            subtitle="The Need for Education"
            description="In today's digital landscape, understanding how to handle digital evidence and respond to cyber incidents is crucial for all organizations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseTraining.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 mx-auto mb-4">
                    <reason.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Training Articles Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Training Articles & Resources"
            subtitle="Educational Content"
            description={
              isLoading 
                ? "Loading training resources..." 
                : trainingPosts.length > 0 
                  ? `${trainingPosts.length} training articles available`
                  : "Training articles and resources will appear here when published."
            }
          />
          
{/* Display dynamic Training posts from admin */}
          {isLoading ? (
            <div className="space-y-6">
              <div className="animate-pulse bg-slate-800 rounded-lg h-48"></div>
              <div className="animate-pulse bg-slate-800 rounded-lg h-48"></div>
              <div className="animate-pulse bg-slate-800 rounded-lg h-48"></div>
            </div>
          ) : trainingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:border-accent-400/30 transition-colors group">
                    {post.thumbnail_url && (
                      <div className="aspect-video bg-slate-700 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-accent-400" />
                        <span className="text-sm text-slate-400">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-slate-100 group-hover:text-accent-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <Button 
                        href={getPostUrl(post)}
                        variant="ghost" 
                        size="sm"
                        className="mt-4"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">
                No Training Articles Yet
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Training articles and educational content will appear here when published by our team.
              </p>
            </div>
          )}
        </Container>
      </Section>


      {/* Training Request Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Request Custom Training"
                subtitle="Tailored Solutions"
                align="left"
                description="We offer customized training programs designed to meet your organization's specific needs and industry requirements."
                className="mb-8"
              />
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-slate-100 font-medium mb-1">On-site Training</h4>
                    <p className="text-slate-300 text-sm">Conducted at your facilities with customized content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-slate-100 font-medium mb-1">Online Delivery</h4>
                    <p className="text-slate-300 text-sm">Virtual training sessions with interactive components</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-slate-100 font-medium mb-1">Customizable Content</h4>
                    <p className="text-slate-300 text-sm">Programs tailored to your industry and specific requirements</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Request Training Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20">
                <div className="text-center mb-6">
                  <GraduationCap className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Training Benefits
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Enhance your team's capabilities
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {[
                    'Improved incident response capabilities',
                    'Better understanding of legal requirements',
                    'Enhanced evidence handling procedures',
                    'Reduced compliance risks',
                    'Increased team confidence and skills',
                    'Customized for your industry needs'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
                      <span className="text-slate-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
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
                Ready to Train Your Team?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact us to discuss your training needs and develop a customized program 
                that enhances your organization's digital forensics capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Schedule Consultation
                </Button>
                <Button href="/digital-forensic" variant="outline" size="lg">
                  View Our Services
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default TrainingPage