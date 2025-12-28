interface AdminUser {
  id: number
  email: string
  full_name: string
}

export interface AuthToken {
  access_token: string
  token_type: string
}

export class AuthUtils {
  private static readonly TOKEN_KEY = 'adminToken'
  private static readonly USER_KEY = 'adminUser'

  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static getUser(): AdminUser | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  static setUser(user: AdminUser): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    return !!this.getToken()
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    }
  }

  static async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = this.getAuthHeaders()
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    })

    // If unauthorized, redirect to login
    if (response.status === 401) {
      this.logout()
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
      }
    }

    return response
  }
}

export const authUtils = AuthUtils