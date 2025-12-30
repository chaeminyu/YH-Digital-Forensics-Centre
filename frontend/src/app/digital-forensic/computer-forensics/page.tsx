'use client'

import { motion } from 'framer-motion'
import { 
  Monitor,
  HardDrive,
  Server,
  Laptop,
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
    title: 'Desktop Computers',
    description: 'Complete analysis of desktop systems including hard drives, registry, and user data',
    icon: Monitor
  },
  {
    title: 'Laptops & Notebooks',
    description: 'Mobile workstation investigation including encrypted drives and cloud sync data',
    icon: Laptop
  },
  {
    title: 'Servers',
    description: 'Enterprise server forensics including database analysis and log file examination',
    icon: Server
  },
  {
    title: 'Storage Devices',
    description: 'External drives, USB devices, SSDs, and traditional hard disk drives',
    icon: HardDrive
  }
]

const useCases = [
  'Employee misconduct investigations',
  'Intellectual property theft cases',
  'Financial fraud examination',
  'Data breach incident response',
  'Compliance auditing and eDiscovery',
  'Criminal investigations support',
  'Civil litigation evidence gathering',
  'Insurance claim investigations'
]

const processSteps = [
  {
    title: 'Secure Acquisition',
    description: 'Forensically sound imaging of storage devices using write-blocking hardware',
    icon: Shield
  },
  {
    title: 'Data Analysis',
    description: 'Comprehensive examination of file systems, deleted files, and system artifacts',
    icon: Monitor
  },
  {
    title: 'Evidence Recovery',
    description: 'Recovery of relevant evidence including documents, communications, and logs',
    icon: FileText
  },
  {
    title: 'Reporting',
    description: 'Detailed forensic report with findings, methodology, and chain of custody',
    icon: CheckCircle
  }
]

const deliverables = [
  'Forensic imaging of all storage devices',
  'Comprehensive forensic analysis report',
  'Detailed timeline of user activities',
  'Recovered files and evidence catalog',
  'Technical documentation and methodology',
  'Expert witness testimony (if required)',
  'Chain of custody documentation',
  'Executive summary for stakeholders'
]

const relatedServices = [
  {
    title: 'Mobile Forensics',
    href: '/digital-forensic/mobile-forensics',
    description: 'Smartphone and tablet investigation'
  },
  {
    title: 'Data Recovery',
    href: '/digital-forensic/data-recovery',
    description: 'Recovery of deleted or damaged data'
  },
  {
    title: 'Expert Witness',
    href: '/digital-forensic/expert-witness',
    description: 'Court testimony and legal support'
  }
]

const ComputerForensicsPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Digital Forensic', href: '/digital-forensic' },
              { label: 'Computer Forensics' }
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
                Digital Evidence Analysis
              </Badge>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-accent-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Computer Forensics
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Comprehensive analysis of desktop computers, laptops, servers, and storage devices 
                for evidence recovery and investigation. Professional computer forensic services 
                with court-admissible results.
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
                    <span className="text-slate-300">Typical Timeline: 3-10 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Chain of custody maintained</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Court-admissible reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Expert witness available</span>
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
            subtitle="Computer Systems & Devices"
            description="Our computer forensics service covers a comprehensive range of computing devices and storage systems."
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

      {/* Use Cases Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Typical Use Cases"
            subtitle="When You Need Computer Forensics"
            description="Computer forensics is essential for various legal, corporate, and investigative scenarios."
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
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Our Process"
            subtitle="How We Work"
            description="Our structured forensic process ensures thorough analysis while maintaining evidence integrity."
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
      <Section>
        <Container>
          <SectionHeading
            title="What You Receive"
            subtitle="Deliverables"
            description="Comprehensive documentation and evidence packages prepared for legal proceedings and internal use."
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
                  All deliverables are prepared in accordance with legal standards and can be used in court proceedings.
                </p>
                <Button href="/contact" variant="outline">
                  Discuss Your Requirements
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Related Services Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Related Services"
            subtitle="Other Forensic Solutions"
            description="Computer forensics often works in conjunction with other forensic disciplines for comprehensive investigations."
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
                Need Computer Forensics?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get started with a free consultation. We'll assess your case and 
                recommend the best approach for your computer forensics needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Start Your Case
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

export default ComputerForensicsPage