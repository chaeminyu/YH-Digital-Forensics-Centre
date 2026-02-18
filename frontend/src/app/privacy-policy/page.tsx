'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Database, 
  Globe,
  Mail,
  UserCheck,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { 
  Section, 
  SectionHeading, 
  Container, 
  Card,
  Badge
} from '@/components/ui'
import { Breadcrumb } from '@/components/layout'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Section className="relative" padding="lg">
        <Container>
          <Breadcrumb 
            items={[{ label: 'Privacy Policy' }]}
            className="mb-8"
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="mb-6">
                Privacy & Data Protection
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
                Privacy Policy
              </h1>
              
              <div className="flex items-center space-x-6 text-slate-400 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Effective Date: February 18, 2026</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
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
                      YH Digital Forensic Center ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our Blog and submit inquiries through our contact form.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Database className="w-6 h-6 text-accent-400 mr-3" />
                        1. Information We Collect
                      </h2>
                      <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                          We collect personal information only when you voluntarily submit it through our contact form. This may include:
                        </p>
                        <ul className="text-slate-300 space-y-2 ml-6">
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Your name</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Your email address</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Any information you include in your message</span>
                          </li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                          We do not collect any personal data passively through cookies, analytics tools, or tracking technologies at this time.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <UserCheck className="w-6 h-6 text-accent-400 mr-3" />
                        2. How We Use Your Information
                      </h2>
                      <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                          Information submitted through the contact form is used solely to:
                        </p>
                        <ul className="text-slate-300 space-y-2 ml-6">
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Respond to your inquiry</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Provide information about our digital forensics services</span>
                          </li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                          We do not use your information for marketing purposes without your explicit consent, and we do not sell or share your personal data with third parties.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Clock className="w-6 h-6 text-accent-400 mr-3" />
                        3. Data Retention
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        We retain contact form submissions only for as long as necessary to respond to your inquiry and for a reasonable period thereafter for record-keeping purposes. When no longer needed, your information is securely deleted.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Lock className="w-6 h-6 text-accent-400 mr-3" />
                        4. Data Security
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or loss. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Scale className="w-6 h-6 text-accent-400 mr-3" />
                        5. Your Rights Under Korean Privacy Law
                      </h2>
                      <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                          As a user, you have rights under the Personal Information Protection Act (PIPA) of the Republic of Korea, including the right to:
                        </p>
                        <ul className="text-slate-300 space-y-2 ml-6">
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Access the personal information we hold about you</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Request correction of inaccurate information</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Request deletion of your personal information</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Withdraw consent to processing at any time</span>
                          </li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                          To exercise any of these rights, please contact us using the details below.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Globe className="w-6 h-6 text-accent-400 mr-3" />
                        6. International Visitors
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        This Blog is operated from the Republic of Korea. If you are accessing the Blog from outside Korea, please be aware that your information may be processed in Korea, where data protection laws may differ from those in your country.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <AlertTriangle className="w-6 h-6 text-accent-400 mr-3" />
                        7. Changes to This Privacy Policy
                      </h2>
                      <p className="text-slate-300 leading-relaxed">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center">
                        <Mail className="w-6 h-6 text-accent-400 mr-3" />
                        8. Contact
                      </h2>
                      <div className="text-slate-300 leading-relaxed space-y-2">
                        <p>If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:</p>
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

export default PrivacyPolicyPage