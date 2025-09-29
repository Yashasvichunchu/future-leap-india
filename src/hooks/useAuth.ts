import { useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

// Define a simple User type to replace Supabase's User
interface User {
  id: string
  email: string
  name?: string
  age?: number
  education_level?: 'tenth' | 'twelfth' | 'graduate'
  interests?: string[]
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('auth-user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('auth-user')
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, userData: {
    name: string
    age: number
    education_level: 'tenth' | 'twelfth' | 'graduate'
    interests: string[]
  }) => {
    try {
      // Mock authentication - in a real app, you'd call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        ...userData
      }

      setUser(newUser)
      localStorage.setItem('auth-user', JSON.stringify(newUser))

      toast({
        title: "Account created successfully!",
        description: "Welcome to Future Leap India!"
      })

      return { user: newUser }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "Something went wrong",
        variant: "destructive"
      })
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - in a real app, you'd call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: 'Demo User'
      }

      setUser(mockUser)
      localStorage.setItem('auth-user', JSON.stringify(mockUser))

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      })

      return { user: mockUser }
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      localStorage.removeItem('auth-user')

      toast({
        title: "Signed out successfully",
        description: "You have been logged out."
      })
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Something went wrong",
        variant: "destructive"
      })
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  }
}