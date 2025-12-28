'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LogIn,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle,
  User,
  Lock
} from 'lucide-react'
import { 
  Card,
  Button,
  Input,
  Badge
} from '@/components/ui'

interface LoginForm {
  email: string
  password: string
}

interface AuthResponse {
  access_token: string
  token_type: string
  admin: {
    id: number
    email: string
    full_name: string
  }
}

const AdminLoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken')
    if (token) {
      router.push('/admin')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formBody = new URLSearchParams()
      formBody.append('username', formData.email)
      formBody.append('password', formData.password)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      })

      if (response.ok) {
        const data: AuthResponse = await response.json()
        
        // Store token and user info
        localStorage.setItem('adminToken', data.access_token)
        localStorage.setItem('adminUser', JSON.stringify(data.admin))
        
        setSuccess(true)
        
        // Redirect after a brief delay
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Login failed')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Login Successful!</h2>
            <p className="text-slate-300 mb-4">Redirecting to admin dashboard...</p>
            <div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-accent-500/10 rounded-full border border-accent-500/20">
                <Shield className="w-8 h-8 text-accent-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Admin Portal</h1>
            <p className="text-slate-400">Sign in to access the YHDFC admin dashboard</p>
            <Badge variant="accent" className="mt-2">
              Secure Access Required
            </Badge>
          </div>

          {/* Login Card */}
          <Card className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-red-400 font-medium">Authentication Failed</div>
                  <div className="text-red-300 text-sm">{error}</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin"
                    className="pl-12"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-12 pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accent-400 bg-slate-700 border-slate-600 rounded focus:ring-accent-400 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-accent-400 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-medium text-sm">Secure Login</div>
                  <div className="text-slate-400 text-xs">
                    This is a protected admin area. All activities are logged and monitored.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Development Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-400 font-medium text-sm mb-1">Development Access</div>
              <div className="text-blue-300 text-xs">
                Default admin credentials: admin / admin123
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLoginPage