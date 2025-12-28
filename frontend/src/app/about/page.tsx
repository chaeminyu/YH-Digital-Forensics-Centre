'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Shield, 
  Award, 
  Globe, 
  Lock, 
  CheckCircle,
  Users,
  Scale,
  Target,
  Heart
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

const expertise = [
  {
    title: 'Korean National Police University Graduate',
    description: 'Elite law enforcement education providing deep understanding of criminal investigation procedures and legal frameworks',
    icon: Shield
  },
  {
    title: 'Carnegie Mellon University Expertise', 
    description: 'Advanced cybersecurity education from world-renowned institution, bringing cutting-edge technical knowledge',
    icon: Award
  },
  {
    title: 'INTERPOL Collaboration Experience',
    description: 'Extensive international cybercrime investigation experience through INTERPOL partnerships and initiatives',
    icon: Globe
  },
  {
    title: 'Court-Admissible Forensic Analysis',
    description: '20 years of experience delivering precise forensic analysis that meets strict legal standards for admissibility',
    icon: Scale
  }
]

const values = [
  {
    title: 'Integrity',
    description: 'We maintain the highest ethical standards in all our investigations and client relationships',
    icon: Heart,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    title: 'Accuracy',
    description: 'Precise analysis backed by proven methodologies and cutting-edge forensic tools',
    icon: Target,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    title: 'Confidentiality',
    description: 'Strict data protection protocols and NDA compliance to protect sensitive information',
    icon: Lock,
    color: 'from-purple-400 to-pink-500'
  },
  {
    title: 'Legal Compliance',
    description: 'Chain of custody procedures ensuring court-admissible evidence and reporting',
    icon: CheckCircle,
    color: 'from-orange-400 to-red-500'
  }
]


const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'About Us' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                About Our Company
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                20 Years of Cyber Investigation Excellence
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Leading Korean digital forensics expert with two decades of cyber investigation experience, 
                delivering accurate court-admissible forensic analysis for legal and corporate professionals.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Founder Section */}
      <Section variant="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="About Our Founder"
                align="left"
                showAccentLine={true}
                className="mb-8"
              />
              
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  Welcome to <strong className="text-slate-100">YH Digital Forensic Center</strong> — your trusted partner for digital forensics in criminal defense, civil litigation, and investigation response.
                </p>
                
                <p>
                  <strong className="text-slate-100">YH Digital Forensic Center</strong> is founded and led by an <strong className="text-accent-400">INTERPOL-certified digital forensics expert</strong> with <strong className="text-slate-100">over 20 years of experience</strong> in cyber investigation. Our founder graduated from the prestigious <strong className="text-accent-400">Korean National Police University</strong> and earned an advanced degree from <strong className="text-accent-400">Carnegie Mellon University</strong>, one of the world's top cybersecurity institutions.
                </p>
                
                <p>
                  All forensic analysis at YH Digital Forensic Center is <strong className="text-slate-100">personally conducted by our founder</strong>. Only someone who has led both investigations and forensic analysis firsthand can truly provide effective digital forensics support. With extensive experience at <strong className="text-accent-400">INTERPOL headquarters in Lyon, France</strong> and the <strong className="text-accent-400">INTERPOL Global Complex in Singapore</strong>, our founder brings world-class expertise to every case.
                </p>
                
                <p>
                  This unique combination of Korean law enforcement background and international experience positions us uniquely to serve clients facing complex digital evidence challenges. We are committed to finding the safest and most reliable path forward — <strong className="text-slate-100">helping our clients overcome their difficulties and return to peace of mind as quickly as possible</strong>.
                </p>
                
                <p>
                  Every case we handle follows strict chain of custody protocols to ensure evidence admissibility in court proceedings.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Founder Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-2xl blur-xl" />
                <div className="relative">
                  <Image
                    src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/home-main.jpeg"
                    alt="YH Digital Forensic Center Founder"
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-xl shadow-2xl border border-accent-400/20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-xl" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Card variant="glass" className="p-4 text-center border-accent-400/30">
                      <div className="text-sm font-semibold text-slate-100">Leading Digital Forensics Expert</div>
                      <div className="text-xs text-slate-400 mt-1">20+ Years of Investigation Experience</div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* International Experience Section */}
      <Section>
        <Container>
          <SectionHeading
            title="International Experience"
            subtitle="Global Collaboration"
            description="Extensive collaboration with INTERPOL in international cybercrime investigations and digital forensics initiatives."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* INTERPOL Headquarters */}
            <Card className="p-6">
              <div className="relative">
                <Image
                  src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/about/interpol-head.jpg"
                  alt="INTERPOL Headquarters, Lyon, France"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover object-top rounded-lg"
                  style={{ objectPosition: 'center 20%' }}
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-64 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-lg flex items-center justify-center border border-accent-400/20">
                          <div class="text-center">
                            <div class="w-16 h-16 mx-auto mb-4 bg-accent-400/20 rounded-lg flex items-center justify-center">
                              <svg class="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <div class="text-sm text-slate-300">INTERPOL Headquarters</div>
                          </div>
                        </div>
                      `
                    }
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 rounded-b-lg">
                  <div className="text-slate-100 font-semibold">INTERPOL Headquarters</div>
                  <div className="text-slate-300 text-sm">Lyon, France</div>
                </div>
              </div>
            </Card>

            {/* INTERPOL Singapore */}
            <Card className="p-6">
              <div className="relative">
                <Image
                  src="https://yhdfc-blog.s3.ap-northeast-2.amazonaws.com/about/inerpol-sg.jpg"
                  alt="INTERPOL Global Complex, Singapore"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-64 bg-gradient-to-br from-accent-400/20 to-primary-600/20 rounded-lg flex items-center justify-center border border-accent-400/20">
                          <div class="text-center">
                            <div class="w-16 h-16 mx-auto mb-4 bg-accent-400/20 rounded-lg flex items-center justify-center">
                              <svg class="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                              </svg>
                            </div>
                            <div class="text-sm text-slate-300">INTERPOL Singapore</div>
                          </div>
                        </div>
                      `
                    }
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 rounded-b-lg">
                  <div className="text-slate-100 font-semibold">INTERPOL Global Complex</div>
                  <div className="text-slate-300 text-sm">Singapore</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card variant="glass" className="p-8 border-accent-400/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-400 mb-2">20+</div>
                  <div className="text-sm text-slate-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-400 mb-2">KNPU</div>
                  <div className="text-sm text-slate-400">Graduate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-400 mb-2">CMU</div>
                  <div className="text-sm text-slate-400">Advanced Degree</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-400 mb-2">INTERPOL</div>
                  <div className="text-sm text-slate-400">Experience</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-center space-x-3 text-slate-300">
                  <Globe className="w-5 h-5 text-accent-400" />
                  <span className="text-sm">International cybercrime investigation expertise</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* Educational Background Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Educational Background"
            subtitle="World-Class Education"
            description="Exceptional educational foundation combining elite law enforcement training with advanced cybersecurity expertise."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20 h-full">
                <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
                  <Award className="w-6 h-6 text-accent-400 mr-3" />
                  Korean National Police University
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">Elite Law Enforcement Education</div>
                      <div className="text-slate-400 text-sm">Advanced criminal investigation and forensic procedures</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">Digital Crime Investigation</div>
                      <div className="text-slate-400 text-sm">Specialized cybercrime investigation methodologies</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">Legal Framework Expertise</div>
                      <div className="text-slate-400 text-sm">Deep understanding of legal standards and procedures</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="glass" className="p-8 border-accent-400/20 h-full">
                <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center">
                  <Award className="w-6 h-6 text-accent-400 mr-3" />
                  Carnegie Mellon University
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">Advanced Cybersecurity</div>
                      <div className="text-slate-400 text-sm">Cutting-edge cybersecurity and digital forensics</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">Research & Development</div>
                      <div className="text-slate-400 text-sm">Advanced research in digital forensics methodologies</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 font-medium">International Standards</div>
                      <div className="text-slate-400 text-sm">Global best practices in cybersecurity and forensics</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Our Services & Expertise Section */}
      <Section>
        <Container>
          <SectionHeading
            title="Our Services & Expertise"
            subtitle="What Sets Us Apart"
            description="Two decades of cyber investigation experience combined with international law enforcement background and cutting-edge forensic methodologies."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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

      {/* Our Values Section */}
      <Section variant="dark">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="Guiding Principles"
            description="The core values that drive our approach to digital forensics and client service."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5`} />
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${value.color} text-white`}>
                        <value.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
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
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Work With Us
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Ready to work with Korea's leading digital forensics experts? 
                Contact us today for a confidential consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Start Your Case
                </Button>
                <Button href="/digital-forensic" variant="outline" size="lg">
                  Our Services
                </Button>
              </div>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

export default AboutPage