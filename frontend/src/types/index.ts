export interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  thumbnail_url?: string
  category_id?: number
  tags?: string
  is_published: boolean
  view_count: number
  created_at: string
  updated_at?: string
  category?: Category
  external_url?: string
  source?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Inquiry {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface InquiryCreate {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export interface PostList {
  posts: Post[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface Admin {
  id: number
  username: string
  created_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface ApiError {
  detail: string
}

export interface InquiryStats {
  total: number
  unread: number
  today: number
}