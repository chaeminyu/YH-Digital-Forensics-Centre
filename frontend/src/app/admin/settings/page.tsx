'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Search,
  Share2,
  Shield,
  Database,
  Palette,
  Monitor,
  AlertTriangle
} from 'lucide-react'
import { Card, Badge, Button, Input, Textarea } from '@/components/ui'
import AdminLayout from '@/components/admin/AdminLayout'

interface SiteSettings {
  // Company Information
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  
  // SEO Settings
  defaultMetaTitle: string
  defaultMetaDescription: string
  defaultKeywords: string
  
  // Social Media
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  youtubeUrl: string
  
  // Site Configuration
  maintenanceMode: boolean
  allowRegistration: boolean
  requireEmailVerification: boolean
}

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: 'YH Digital Forensic Center',
    companyEmail: 'info@yhdfc.com',
    companyPhone: '+82-10-0000-0000',
    companyAddress: 'Seoul, South Korea',
    defaultMetaTitle: 'YHDFC - Digital Forensics & Cyber Investigation',
    defaultMetaDescription: 'Professional digital forensics services including mobile forensics, computer forensics, and cyber investigation training.',
    defaultKeywords: 'digital forensics, mobile forensics, computer forensics, cyber investigation, data recovery',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    maintenanceMode: false,
    allowRegistration: false,
    requireEmailVerification: true
  })
  
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('company')

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'seo', label: 'SEO Defaults', icon: Search },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'system', label: 'System', icon: Database }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // For now, we'll just save to localStorage since there's no backend endpoint
      // In a real app, this would call an API endpoint
      localStorage.setItem('yhdfc_settings', JSON.stringify(settings))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setSaving(false)
    }
  }

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('yhdfc_settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [])

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-blue-400" />
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Company Name
            </label>
            <Input
              name="companyName"
              value={settings.companyName}
              onChange={handleInputChange}
              placeholder="Your Company Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contact Email
            </label>
            <Input
              type="email"
              name="companyEmail"
              value={settings.companyEmail}
              onChange={handleInputChange}
              placeholder="contact@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number
            </label>
            <Input
              name="companyPhone"
              value={settings.companyPhone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Address
            </label>
            <Textarea
              name="companyAddress"
              value={settings.companyAddress}
              onChange={handleInputChange}
              placeholder="123 Business St, City, Country"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSeoTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-purple-400" />
          Default SEO Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Default Meta Title
            </label>
            <Input
              name="defaultMetaTitle"
              value={settings.defaultMetaTitle}
              onChange={handleInputChange}
              placeholder="Your Site Title"
              maxLength={60}
            />
            <p className="text-xs text-slate-500 mt-1">
              {settings.defaultMetaTitle.length}/60 characters (optimal: 50-60)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Default Meta Description
            </label>
            <Textarea
              name="defaultMetaDescription"
              value={settings.defaultMetaDescription}
              onChange={handleInputChange}
              placeholder="Brief description of your website..."
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-slate-500 mt-1">
              {settings.defaultMetaDescription.length}/160 characters (optimal: 120-160)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Default Keywords
            </label>
            <Input
              name="defaultKeywords"
              value={settings.defaultKeywords}
              onChange={handleInputChange}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-slate-500 mt-1">
              Comma-separated keywords relevant to your business
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-green-400" />
          Social Media Links
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Facebook URL
            </label>
            <Input
              name="facebookUrl"
              value={settings.facebookUrl}
              onChange={handleInputChange}
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Twitter/X URL
            </label>
            <Input
              name="twitterUrl"
              value={settings.twitterUrl}
              onChange={handleInputChange}
              placeholder="https://twitter.com/youraccount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              LinkedIn URL
            </label>
            <Input
              name="linkedinUrl"
              value={settings.linkedinUrl}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              YouTube URL
            </label>
            <Input
              name="youtubeUrl"
              value={settings.youtubeUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-orange-400" />
          System Configuration
        </h3>
        
        <div className="space-y-6">
          <Card className="p-4 border-orange-500/20 bg-orange-500/5">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h4 className="font-medium text-orange-200">Maintenance Mode</h4>
            </div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-400 bg-slate-700 border-slate-600 rounded focus:ring-orange-400"
              />
              <span className="text-sm text-slate-300">
                Enable maintenance mode (visitors will see a maintenance page)
              </span>
            </label>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-medium text-slate-200 mb-3">User Registration</h4>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent-400 bg-slate-700 border-slate-600 rounded focus:ring-accent-400"
                />
                <span className="text-sm text-slate-300">
                  Allow new user registration
                </span>
              </label>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium text-slate-200 mb-3">Email Verification</h4>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent-400 bg-slate-700 border-slate-600 rounded focus:ring-accent-400"
                />
                <span className="text-sm text-slate-300">
                  Require email verification for new users
                </span>
              </label>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
            <p className="text-slate-400">Configure your site settings and preferences.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-2 text-green-400"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Settings saved</span>
              </motion.div>
            )}
            
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {activeTab === 'company' && renderCompanyTab()}
              {activeTab === 'seo' && renderSeoTab()}
              {activeTab === 'social' && renderSocialTab()}
              {activeTab === 'system' && renderSystemTab()}
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminSettingsPage