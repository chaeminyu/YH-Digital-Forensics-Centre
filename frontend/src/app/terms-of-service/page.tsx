'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Shield, 
  Scale, 
  Globe,
  Mail,
  ExternalLink
} from 'lucide-react'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Card,
  Badge
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'Terms of Service' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Legal Information
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Terms of Service
              </h1>
              
              <div className="flex items-center space-x-6 text-slate-400 mb-8">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Effective Date: February 18, 2026</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Last Updated: February 18, 2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 md:p-12">
                <div className="prose prose-invert prose-slate max-w-none">
                  <div className="bg-accent-400/10 border border-accent-400/20 rounded-lg p-6 mb-8">
                    <p className="text-slate-200 leading-relaxed">
                      Welcome to the YH Digital Forensic Center blog ("Blog"). By accessing or using this Blog, you agree to the following Terms of Service. Please read them carefully.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <FileText className="w-6 h-6 text-accent-400 mr-3" />
                        1. About This Blog
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        This Blog is operated by YH Digital Forensic Center, based in the Republic of Korea. It is intended to provide general information about digital forensics, cyber investigation, and related topics. The content published here is for informational purposes only.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Scale className="w-6 h-6 text-accent-400 mr-3" />
                        2. No Professional or Legal Advice
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        Nothing on this Blog constitutes legal, investigative, or professional advice. The information provided is general in nature and should not be relied upon as a substitute for consultation with a qualified professional. If you have a specific legal or forensic matter, please contact us directly.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Shield className="w-6 h-6 text-accent-400 mr-3" />
                        3. Intellectual Property
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        All content on this Blog — including text, graphics, and logos — is the property of YH Digital Forensic Center and is protected under applicable copyright laws. You may not reproduce, distribute, or republish any content without our prior written permission.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <ExternalLink className="w-6 h-6 text-accent-400 mr-3" />
                        4. Third-Party Links
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        This Blog may contain links to external websites. YH Digital Forensic Center is not responsible for the content, accuracy, or privacy practices of any third-party sites. Links are provided for convenience only.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Shield className="w-6 h-6 text-accent-400 mr-3" />
                        5. Limitation of Liability
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        YH Digital Forensic Center makes no warranties regarding the accuracy or completeness of the information on this Blog. To the fullest extent permitted by law, we are not liable for any damages arising from your use of or reliance on content published here.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <FileText className="w-6 h-6 text-accent-400 mr-3" />
                        6. Changes to These Terms
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        We reserve the right to update these Terms of Service at any time. Continued use of the Blog after any changes constitutes your acceptance of the revised terms.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Globe className="w-6 h-6 text-accent-400 mr-3" />
                        7. Governing Law
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        These Terms are governed by the laws of the Republic of Korea. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Korea.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Mail className="w-6 h-6 text-accent-400 mr-3" />
                        8. Contact
                      </h2>
                      <div className="text-slate-300 leading-relaxed space-y-2">
                        <p>For questions about these Terms, please contact us at:</p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="font-semibold text-slate-100 mb-2">YH Digital Forensic Center</div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Mail className="w-4 h-4 text-accent-400" />
                            <a href="mailto:yh@yhforensic.com" className="text-accent-400 hover:text-accent-300 transition-colors">
                              yh@yhforensic.com
                            </a>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-accent-400" />
                            <a href="https://www.yhforensic.com/" className="text-accent-400 hover:text-accent-300 transition-colors" target="_blank" rel="noopener noreferrer">
                              https://www.yhforensic.com/
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default TermsOfServicePage