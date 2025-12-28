'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building,
  User,
  MessageSquare
} from 'lucide-react'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Button, 
  Card,
  Badge,
  Input,
  Textarea,
  Select
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

interface ContactForm {
  name: string
  email: string
  country_code: string
  phone: string
  company: string
  subject: string
  message: string
  urgency_level: string
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    country_code: '+82',
    phone: '',
    company: '',
    subject: '',
    message: '',
    urgency_level: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')


  const urgencyLevels = [
    { value: 'low', label: 'Low - General Inquiry' },
    { value: 'normal', label: 'Normal - Standard Response' },
    { value: 'high', label: 'High - Within 24 Hours' },
    { value: 'urgent', label: 'Urgent - Immediate Attention' }
  ]


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          country_code: '+82',
          phone: '',
          company: '',
          subject: '',
          message: '',
          urgency_level: 'normal'
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to submit inquiry')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+82 010-8402-2752'],
      color: 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Contact',
      details: ['yh@yhforensic.com'],
      color: 'text-accent-400'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM KST', 'Emergency: 24/7 Available'],
      color: 'text-purple-400'
    }
  ]

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM KST', status: 'Regular Hours' },
    { day: 'Emergency Cases', hours: '24/7 Available', status: 'Immediate Response' }
  ]

  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'Contact Us' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Get Expert Assistance
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Contact Our Forensic Experts
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Ready to discuss your digital forensic needs? Our team of certified experts 
                is here to provide professional consultation and immediate assistance for urgent cases.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Contact Form and Info */}
      <Section variant="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <SectionHeading
                title="Get in Touch"
                subtitle="Contact Information"
                description="Multiple ways to reach our forensic experts for immediate assistance."
                align="left"
              />

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-slate-700 ${info.color}`}>
                          <info.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-100 mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-slate-300 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-accent-400" />
                    Office Hours
                  </h3>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-b-0">
                        <div>
                          <div className="text-slate-200 font-medium text-sm">{schedule.day}</div>
                          <div className="text-slate-400 text-xs">{schedule.status}</div>
                        </div>
                        <div className="text-slate-300 text-sm">{schedule.hours}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-300">
                      Fill out the form below and we'll respond within the timeframe indicated by your urgency level.
                    </p>
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-green-400 font-medium">Message Sent Successfully!</div>
                        <div className="text-green-300 text-sm">We'll respond according to your urgency level.</div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="text-red-400 font-medium">Failed to Send Message</div>
                        <div className="text-red-300 text-sm">{errorMessage}</div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@company.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Phone Number
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-20">
                            <Input
                              name="country_code"
                              type="text"
                              value={formData.country_code}
                              onChange={handleInputChange}
                              placeholder="+82"
                              className="text-center"
                            />
                          </div>
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="10-1234-5678"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          Enter your country code (e.g., +82, +1, +44) and your phone number
                        </p>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                          Company/Organization
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your organization"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label htmlFor="urgency_level" className="block text-sm font-medium text-slate-300 mb-2">
                        Urgency Level *
                      </label>
                      <Select
                        id="urgency_level"
                        name="urgency_level"
                        value={formData.urgency_level}
                        onChange={handleInputChange}
                        required
                      >
                        {urgencyLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Please provide detailed information about your digital forensic needs, timeline, and any specific requirements..."
                          className="pl-10 pt-10"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Emergency Contact Section */}
      <Section variant="accent">
        <Container>
          <Card variant="glass" className="p-12 text-center border-accent-400/30">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Emergency Digital Forensic Response
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                For urgent cases requiring immediate attention - data breaches, legal emergencies, 
                or time-sensitive investigations - contact our 24/7 emergency response team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="tel:+82-10-1234-5678" 
                  variant="destructive" 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Emergency Hotline: +82 010-8402-2752
                </Button>
                <Button 
                  href="mailto:yh@yhforensic.com" 
                  variant="outline" 
                  size="lg"
                >
                  yh@yhforensic.com
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                Available 24/7 for critical situations requiring immediate forensic response
              </p>
            </motion.div>
          </Card>
        </Container>
      </Section>

    </>
  )
}

export default ContactPage