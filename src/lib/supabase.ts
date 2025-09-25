import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  age: number
  education_level: 'tenth' | 'twelfth' | 'graduate'
  interests: string[]
  created_at: string
}

export interface QuizResponse {
  id: string
  user_id: string
  education_level: 'tenth' | 'twelfth' | 'graduate'
  responses: Record<string, any>
  career_suggestions: CareerSuggestion[]
  completed_at: string
}

export interface CareerSuggestion {
  career_path: string
  match_percentage: number
  description: string
  required_skills: string[]
  salary_range: string
  growth_prospects: string
  steps: string[]
}

export interface SkillGap {
  id: string
  user_id: string
  career_path: string
  current_skills: string[]
  required_skills: string[]
  missing_skills: string[]
  recommendations: SkillRecommendation[]
}

export interface SkillRecommendation {
  skill: string
  courses: string[]
  resources: string[]
  time_to_learn: string
}

export interface CareerRoadmap {
  id: string
  user_id: string
  career_path: string
  steps: RoadmapStep[]
  timeline_months: number
  created_at: string
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  type: 'course' | 'certification' | 'project' | 'internship' | 'skill'
  duration: string
  resources: string[]
  completed: boolean
}

export interface Resume {
  id: string
  user_id: string
  template: string
  personal_info: PersonalInfo
  education: Education[]
  skills: string[]
  projects: Project[]
  experience: Experience[]
  certifications: string[]
  updated_at: string
}

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Education {
  institution: string
  degree: string
  year: string
  percentage: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
}

export interface Experience {
  company: string
  role: string
  duration: string
  description: string
}