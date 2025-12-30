'use client'

import { motion } from 'framer-motion'
import { 
  FileText,
  Scale,
  Users,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
  MessageSquare
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

const services = [
  {
    title: 'Expert Testimony',
    description: 'Professional court testimony explaining technical findings in clear, understandable language',
    icon: MessageSquare
  },
  {
    title: 'Forensic Reports',
    description: 'Comprehensive written reports documenting methodology, findings, and conclusions',
    icon: FileText
  },
  {
    title: 'Case Consultation',
    description: 'Pre-trial consultation to help legal teams understand technical aspects of digital evidence',
    icon: Users
  },
  {
    title: 'Deposition Support',
    description: 'Assistance during depositions and preparation for cross-examination',
    icon: Scale
  }
]

const qualifications = [
  'Certified Digital Forensics Examiner (CDFE)',
  '20+ years of forensic investigation experience',
  '50+ court testimony appearances',
  'Advanced technical certifications',
  'Law enforcement background',
  'Continuous professional education',
  'Published research and papers',
  'International case experience'
]

const reportComponents = [
  {
    title: 'Executive Summary',
    description: 'High-level overview for attorneys and decision makers'
  },
  {
    title: 'Methodology',
    description: 'Detailed description of forensic procedures and tools used'
  },
  {
    title: 'Findings',
    description: 'Comprehensive documentation of all discovered evidence'
  },
  {
    title: 'Timeline Analysis',
    description: 'Chronological sequence of events and activities'
  },
  {
    title: 'Technical Appendices',
    description: 'Detailed technical data and supporting documentation'
  },
  {
    title: 'Legal Compliance',
    description: 'Certification of chain of custody and legal standards'
  }
]

const caseTypes = [
  'Intellectual property disputes',
  'Employment law violations',
  'Financial fraud investigations',
  'Data breach litigation',
  'Criminal digital evidence cases',
  'Regulatory compliance matters',
  'Corporate internal investigations',
  'Insurance claim disputes'
]

const processSteps = [
  {
    title: 'Case Review',
    description: 'Initial review of case facts and legal requirements',
    icon: FileText,
    step: '01'
  },
  {
    title: 'Forensic Analysis',
    description: 'Comprehensive technical examination and evidence collection',
    icon: Shield,
    step: '02'
  },
  {
    title: 'Report Preparation',
    description: 'Detailed forensic report with findings and methodology',
    icon: Award,
    step: '03'
  },
  {
    title: 'Testimony',
    description: 'Expert witness testimony in depositions or court proceedings',
    icon: Scale,
    step: '04'
  }
]

const ExpertWitnessPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[
              { label: 'Digital Forensic', href: '/digital-forensic' },
              { label: 'Expert Witness Support' }
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
                Legal Support & Testimony
              </Badge>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent-400/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-accent-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                  Expert Witness Support
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Professional expert witness services for legal proceedings and litigation support. 
                Court testimony, forensic report preparation, and technical consultation to help 
                legal teams understand and present digital evidence effectively.
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
                    <span className="text-slate-300">Available for urgent cases</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Court-qualified expert</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Comprehensive documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">Deposition & trial testimony</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Expert Witness Services"
            subtitle="Legal Support"
            description="Comprehensive expert witness services to support your legal case with technical expertise and clear communication."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 flex-shrink-0">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Qualifications Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Expert Qualifications"
            subtitle="Credentials & Experience"
            description="Our expert witnesses maintain the highest professional standards and qualifications for court testimony."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{qualification}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent-400">50+</div>
                    <div className="text-sm text-slate-400">Court Appearances</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">20+</div>
                    <div className="text-sm text-slate-400">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-400">100%</div>
                    <div className="text-sm text-slate-400">Testimony Success</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Report Components Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Forensic Report Components"
            subtitle="Comprehensive Documentation"
            description="Our forensic reports include all necessary components for legal proceedings and expert testimony."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportComponents.map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    {component.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {component.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Case Types Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Case Types We Support"
            subtitle="Legal Matters"
            description="Our expert witnesses provide testimony and support for various types of legal cases involving digital evidence."
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseTypes.map((caseType, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{caseType}</span>
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
            subtitle="Expert Witness Support"
            description="Our structured approach ensures thorough preparation and effective testimony for your legal case."
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
                Need Expert Witness Support?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Our qualified expert witnesses are ready to support your legal case. 
                Contact us to discuss your expert witness and testimony needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Request Expert Witness
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

export default ExpertWitnessPage