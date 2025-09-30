import { useState, useEffect } from 'react'
import { api, getAuthToken } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface User {
  id: string
  email: string
  name: string
  age: number
  educationLevel: string
  interests: string[]
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = getAuthToken()
    if (token) {
      api.getCurrentUser()
        .then((userData) => {
          setUser(userData)
          setLoading(false)
        })
        .catch(() => {
          setUser(null)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string, userData: {
    name: string
    age: number
    education_level: 'tenth' | 'twelfth' | 'graduate'
    interests: string[]
  }) => {
    try {
      const data = await api.signUp({
        email,
        password,
        name: userData.name,
        age: userData.age,
        educationLevel: userData.education_level,
        interests: userData.interests
      })

      toast({
        title: "Account created successfully!",
        description: "You can now sign in with your credentials."
      })

      return data
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.signIn(email, password)
      setUser(data.user)

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      })

      return data
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      await api.signOut()
      setUser(null)

      toast({
        title: "Signed out successfully",
        description: "You have been logged out."
      })
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
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