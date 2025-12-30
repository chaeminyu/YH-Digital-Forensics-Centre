'use client'

import { motion } from 'framer-motion'
import { 
  Cloud,
  Mail,
  Database,
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  FileText,
  Users
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

const whatWeAnalyze = [
  {
    title: 'Microsoft 365',
    description: 'Exchange Online, SharePoint, OneDrive, Teams, and other Office 365 services',
    icon: Mail
  },
  {
    title: 'Google Workspace',
    description: 'Gmail, Google Drive, Google Meet, Calendar, and collaboration tools',
    icon: Globe
  },
  {
    title: 'Cloud Storage',
    description: 'Dropbox, iCloud, Amazon S3, and other cloud storage platforms',
    icon: Cloud
  },
  {
    title: 'Enterprise Systems',
    description: 'Custom cloud applications, databases, and enterprise collaboration platforms',
    icon: Database
  }
]

const useCases = [
  'Email investigation and eDiscovery',
  'Intellectual property theft cases',
  'Employee misconduct investigations',
  'Compliance auditing and reporting',
  'Data breach incident response',
  'Litigation support and evidence gathering',
  'Regulatory compliance verification',
  'Corporate espionage investigations'
]

const dataTypes = [
  {
    category: 'Email & Communications',
    items: ['Email messages and attachments', 'Calendar entries and meetings', 'Instant messages and chats', 'Voice and video call logs']
  },
  {
    category: 'Documents & Files',
    items: ['Shared documents and folders', 'Version history and changes', 'File access and sharing logs', 'Collaboration activities']
  },
  {
    category: 'User Activities',
    items: ['Login and access patterns', 'File download/upload history', 'Search queries and activities', 'Administrative actions']
  },
  {
    category: 'System Data',
    items: ['Audit logs and trails', 'Security and compliance reports', 'User permissions and roles', 'API and integration logs']
  }
]

const deliverables = [
  'Complete cloud data extraction',
  'Comprehensive forensic analysis report',
  'Email and communication timeline',
  'Document access and sharing history',
  'User activity and behavior analysis',
  'Compliance and security assessment',
  'Chain of custody documentation',
  'Expert witness testimony support'
]

const CloudForensicsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Digital Forensic', href: '/digital-forensic' },
              { label: 'Cloud & Email Forensics' }
            ]}
            className="mb-8"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Cloud & Email Investigation
              </Badge>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-accent-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Cloud & Email Forensics
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Investigation of cloud storage services, email systems, and online collaboration platforms. 
                Professional analysis of Office 365, Google Workspace, and other cloud services for 
                evidence collection and compliance auditing.
              </p>

              <Button href="/contact" size="lg">
                Request This Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Typical Timeline: 2-7 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">API-based secure extraction</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">eDiscovery compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Cloud platform specialists</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* What We Analyze Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="What We Analyze"
            subtitle="Cloud Platforms & Services"
            description="Our cloud forensics service covers major cloud platforms and email systems used by businesses worldwide."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeAnalyze.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Data Types Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Types of Data We Extract"
            subtitle="Comprehensive Cloud Analysis"
            description="We extract and analyze various types of data from cloud platforms, including historical and deleted information."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataTypes.map((dataType, index) => (
              <motion.div
                key={dataType.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">
                    {dataType.category}
                  </h3>
                  <ul className="space-y-2">
                    {dataType.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Use Cases Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Typical Use Cases"
            subtitle="When You Need Cloud Forensics"
            description="Cloud and email forensics is essential for modern digital investigations and compliance requirements."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{useCase}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Deliverables Section */}
      <Section>
        <Container>
          <SectionHeading
            title="What You Receive"
            subtitle="Deliverables"
            description="Comprehensive cloud forensic analysis with detailed documentation and evidence packages."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{deliverable}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                <p className="text-slate-400 text-sm mb-4">
                  All cloud investigations follow secure API access and maintain data integrity for legal proceedings.
                </p>
                <Button href="/contact" variant="outline">
                  Discuss Your Cloud Investigation
                </Button>
              </div>
            </Card>
          </motion.div>
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
                Need Cloud Forensics?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact our cloud forensics experts for secure, compliant investigation of your cloud platforms and email systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Start Cloud Investigation
                </Button>
                <Button href="/digital-forensic" variant="outline" size="lg">
                  View All Services
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default CloudForensicsPage