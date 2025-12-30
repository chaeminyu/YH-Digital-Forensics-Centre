'use client'

import { motion } from 'framer-motion'
import { 
  HardDrive,
  RefreshCw,
  AlertTriangle,
  Lock,
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

const whatWeRecover = [
  {
    title: 'Deleted Files',
    description: 'Recovery of accidentally or intentionally deleted documents, photos, and data',
    icon: RefreshCw
  },
  {
    title: 'Damaged Storage',
    description: 'Data recovery from physically damaged hard drives, SSDs, and storage devices',
    icon: AlertTriangle
  },
  {
    title: 'Corrupted Systems',
    description: 'Recovery from corrupted file systems, partition tables, and operating systems',
    icon: HardDrive
  },
  {
    title: 'Encrypted Data',
    description: 'Recovery and decryption of password-protected and encrypted data',
    icon: Lock
  }
]

const storageTypes = [
  'Traditional Hard Disk Drives (HDD)',
  'Solid State Drives (SSD)',
  'USB flash drives and memory cards',
  'RAID arrays and server storage',
  'Mobile device storage',
  'Optical media (CD/DVD/Blu-ray)',
  'Tape storage and backup systems',
  'Network attached storage (NAS)'
]

const scenarios = [
  'Accidental file deletion',
  'System crashes and failures',
  'Hardware malfunction or damage',
  'Virus and malware attacks',
  'Power failures and surges',
  'Water or fire damage',
  'Partition table corruption',
  'Operating system failures'
]

const processSteps = [
  {
    title: 'Initial Assessment',
    description: 'Evaluation of storage device condition and recovery feasibility',
    icon: Shield,
    step: '01'
  },
  {
    title: 'Device Stabilization',
    description: 'Secure handling and stabilization of damaged storage devices',
    icon: AlertTriangle,
    step: '02'
  },
  {
    title: 'Data Extraction',
    description: 'Professional recovery using specialized tools and clean room facilities',
    icon: HardDrive,
    step: '03'
  },
  {
    title: 'Verification',
    description: 'Quality assurance and verification of recovered data integrity',
    icon: CheckCircle,
    step: '04'
  }
]

const deliverables = [
  'Recovered data on secure media',
  'Data recovery assessment report',
  'File integrity verification results',
  'Recovery success rate analysis',
  'Recommended preventive measures',
  'Chain of custody documentation',
  'Technical methodology documentation',
  'Ongoing support and consultation'
]

const DataRecoveryPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Digital Forensic', href: '/digital-forensic' },
              { label: 'Data Recovery' }
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
                Professional Data Recovery
              </Badge>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  <HardDrive className="w-8 h-8 text-accent-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Data Recovery
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Professional recovery of deleted, corrupted, or damaged data from various storage devices. 
                Advanced techniques for recovering critical information from failed hard drives, 
                corrupted systems, and accidentally deleted files.
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
                    <span className="text-slate-300">Typical Timeline: 1-7 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Clean room facilities available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">No recovery, no fee policy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">24/7 emergency service</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* What We Recover Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="What We Recover"
            subtitle="Data Recovery Scenarios"
            description="Our data recovery service handles various types of data loss situations with professional expertise."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeRecover.map((item, index) => (
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

      {/* Storage Types Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Storage Devices We Support"
            subtitle="Compatible Media Types"
            description="We recover data from all types of storage devices using specialized tools and techniques."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storageTypes.map((storage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{storage}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Common Scenarios Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Common Data Loss Scenarios"
            subtitle="When You Need Data Recovery"
            description="We help recover data from various failure situations that can affect any storage device."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenarios.map((scenario, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{scenario}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                <p className="text-slate-400 text-sm mb-4">
                  Don't see your situation listed? Contact us for a free consultation - we handle unique and challenging recovery cases.
                </p>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Our Recovery Process"
            subtitle="How We Work"
            description="Our systematic approach ensures maximum recovery success while protecting your data integrity."
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
                  <div className="text-sm font-medium text-accent-400 mb-2">
                    Step {step.step}
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
            subtitle="Recovery Deliverables"
            description="Complete data recovery package with professional documentation and support."
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
              
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent-400">95%</div>
                    <div className="text-sm text-slate-400">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">24h</div>
                    <div className="text-sm text-slate-400">Emergency Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">100%</div>
                    <div className="text-sm text-slate-400">Confidential</div>
                  </div>
                </div>
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
                Lost Important Data?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Don't panic. Our data recovery experts are ready to help. Contact us immediately 
                for the best chance of successful recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Get Emergency Recovery
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

export default DataRecoveryPage