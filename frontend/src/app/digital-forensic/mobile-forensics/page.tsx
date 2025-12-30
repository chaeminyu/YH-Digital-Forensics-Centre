'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone,
  Tablet,
  MessageCircle,
  MapPin,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  FileText,
  Users,
  Image,
  Phone
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
    title: 'iOS Devices',
    description: 'iPhones and iPads including encrypted data, iCloud backups, and app data',
    icon: Smartphone
  },
  {
    title: 'Android Devices',
    description: 'Android smartphones and tablets with root access and advanced extraction',
    icon: Tablet
  },
  {
    title: 'Messaging Applications',
    description: 'WhatsApp, KakaoTalk, Line, Telegram, and other messaging platforms',
    icon: MessageCircle
  },
  {
    title: 'Location & Media',
    description: 'GPS data, photos, videos, and metadata analysis',
    icon: MapPin
  }
]

const useCases = [
  'Employee policy violation investigations',
  'Harassment and cyberbullying cases',
  'Corporate espionage and data theft',
  'Family court and custody disputes',
  'Insurance fraud investigations',
  'Criminal investigation support',
  'Civil litigation evidence collection',
  'Compliance and regulatory audits'
]

const dataTypes = [
  {
    category: 'Communications',
    items: ['Text messages (SMS/MMS)', 'Messaging app conversations', 'Call logs and records', 'Email accounts']
  },
  {
    category: 'Media & Files',
    items: ['Photos and videos', 'Audio recordings', 'Documents and files', 'Downloaded content']
  },
  {
    category: 'Activities',
    items: ['Internet browsing history', 'App usage patterns', 'Location history (GPS)', 'Social media activity']
  },
  {
    category: 'System Data',
    items: ['Device information', 'Network connections', 'Installed applications', 'System logs and artifacts']
  }
]

const processSteps = [
  {
    title: 'Device Acquisition',
    description: 'Secure acquisition using advanced mobile forensic tools and techniques',
    icon: Shield
  },
  {
    title: 'Data Extraction',
    description: 'Logical and physical extraction of device data including deleted content',
    icon: Smartphone
  },
  {
    title: 'Analysis & Recovery',
    description: 'Comprehensive analysis of extracted data and recovery of deleted information',
    icon: FileText
  },
  {
    title: 'Reporting',
    description: 'Detailed forensic report with timeline analysis and evidence documentation',
    icon: CheckCircle
  }
]

const deliverables = [
  'Complete mobile device forensic image',
  'Comprehensive forensic analysis report',
  'Timeline of device activities',
  'Recovered deleted messages and files',
  'Location history and mapping data',
  'Application usage and data analysis',
  'Chain of custody documentation',
  'Expert witness testimony (if required)'
]

const relatedServices = [
  {
    title: 'Computer Forensics',
    href: '/digital-forensic/computer-forensics',
    description: 'Desktop and laptop investigation'
  },
  {
    title: 'Cloud Forensics',
    href: '/digital-forensic/cloud-forensics',
    description: 'Cloud storage and backup analysis'
  },
  {
    title: 'Data Recovery',
    href: '/digital-forensic/data-recovery',
    description: 'Recovery of damaged or deleted data'
  }
]

const MobileForensicsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Digital Forensic', href: '/digital-forensic' },
              { label: 'Mobile Forensics' }
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
                Mobile Device Investigation
              </Badge>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-accent-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Mobile Device Forensics
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Advanced extraction and analysis of smartphones and tablets including iOS and Android devices. 
                Recover deleted messages, call logs, photos, location data, and application information 
                for legal proceedings and investigations.
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
                    <span className="text-slate-300">Typical Timeline: 1-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Advanced extraction tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Deleted data recovery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">iOS & Android specialists</span>
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
            subtitle="Mobile Devices & Applications"
            description="Our mobile forensics service covers all major mobile platforms and messaging applications commonly used in Korea and internationally."
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
            subtitle="Comprehensive Analysis"
            description="We can extract and analyze various types of data from mobile devices, including deleted information."
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
            subtitle="When You Need Mobile Forensics"
            description="Mobile device forensics is crucial for various legal, corporate, and personal investigation scenarios."
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

      {/* Process Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Our Process"
            subtitle="How We Work"
            description="Our mobile forensics process ensures comprehensive data extraction while maintaining evidence integrity."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deliverables Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="What You Receive"
            subtitle="Deliverables"
            description="Comprehensive mobile forensic analysis package with detailed documentation and evidence."
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
                  All extractions follow forensically sound procedures and are admissible in court proceedings.
                </p>
                <Button href="/contact" variant="outline">
                  Discuss Your Case
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Related Services Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Related Services"
            subtitle="Additional Solutions"
            description="Mobile forensics often complements other forensic services for comprehensive digital investigations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full group hover:border-accent-400/30 transition-colors">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-accent-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Button href={service.href} variant="ghost" className="p-0">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
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
                Need Mobile Device Analysis?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Our mobile forensics experts are ready to help. Contact us for a free consultation 
                to discuss your mobile device investigation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Start Your Investigation
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

export default MobileForensicsPage