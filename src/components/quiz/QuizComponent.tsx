import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { CareerSuggestion } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, Clock, Award } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  type: 'multiple_choice' | 'rating' | 'preference'
  options?: string[]
  category: string
}

interface QuizComponentProps {
  educationLevel: 'tenth' | 'twelfth' | 'graduate'
  onComplete: (results: CareerSuggestion[]) => void
}

// Quiz questions database
const QUIZ_QUESTIONS = {
  tenth: [
    {
      id: '1',
      question: 'Which subject interests you the most?',
      type: 'multiple_choice',
      options: ['Mathematics & Science', 'Arts & Literature', 'Business & Commerce', 'Practical & Technical Skills'],
      category: 'academic_interest'
    },
    {
      id: '2', 
      question: 'How much do you enjoy working with your hands?',
      type: 'rating',
      category: 'work_style'
    },
    {
      id: '3',
      question: 'What type of career environment appeals to you?',
      type: 'multiple_choice',
      options: ['Creative Workshop', 'Corporate Office', 'Healthcare Setting', 'Technical Laboratory'],
      category: 'work_environment'
    },
    {
      id: '4',
      question: 'Rate your interest in technology and computers',
      type: 'rating',
      category: 'technology_interest'
    },
    {
      id: '5',
      question: 'Which activity would you prefer?',
      type: 'multiple_choice',
      options: ['Solving complex problems', 'Helping others', 'Creating something new', 'Leading a team'],
      category: 'core_motivation'
    }
  ],
  twelfth: [
    {
      id: '1',
      question: 'Which field aligns best with your career goals?',
      type: 'multiple_choice',
      options: ['Engineering & Technology', 'Medical & Healthcare', 'Business & Management', 'Arts & Design', 'Law & Governance'],
      category: 'career_field'
    },
    {
      id: '2',
      question: 'How important is work-life balance to you?',
      type: 'rating',
      category: 'lifestyle_preference'
    },
    {
      id: '3',
      question: 'What motivates you most in a career?',
      type: 'multiple_choice',
      options: ['High salary potential', 'Social impact', 'Creative expression', 'Job security', 'Innovation opportunities'],
      category: 'motivation'
    },
    {
      id: '4',
      question: 'Rate your comfort with public speaking and presentations',
      type: 'rating',
      category: 'communication_skills'
    },
    {
      id: '5',
      question: 'Which work setting do you prefer?',
      type: 'multiple_choice',
      options: ['Remote/Flexible', 'Traditional Office', 'Field Work', 'Laboratory/Research', 'Client-facing'],
      category: 'work_setting'
    }
  ],
  graduate: [
    {
      id: '1',
      question: 'What is your primary career objective?',
      type: 'multiple_choice',
      options: ['Rapid career advancement', 'Skill specialization', 'Entrepreneurship', 'Work-life balance', 'Social impact'],
      category: 'career_objective'
    },
    {
      id: '2',
      question: 'Rate your leadership and management skills',
      type: 'rating',
      category: 'leadership_skills'
    },
    {
      id: '3',
      question: 'Which industry excites you most?',
      type: 'multiple_choice',
      options: ['Technology & Software', 'Financial Services', 'Healthcare & Biotech', 'Education & Training', 'Manufacturing & Engineering'],
      category: 'industry_preference'
    },
    {
      id: '4',
      question: 'How comfortable are you with continuous learning and upskilling?',
      type: 'rating',
      category: 'learning_mindset'
    },
    {
      id: '5',
      question: 'What type of role appeals to you most?',
      type: 'multiple_choice',
      options: ['Individual contributor', 'Team lead', 'Project manager', 'Consultant', 'Researcher'],
      category: 'role_preference'
    }
  ]
} as const

export const QuizComponent = ({ educationLevel, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const questions = QUIZ_QUESTIONS[educationLevel]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleResponse = (questionId: string, response: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const evaluateResponses = (responses: Record<string, any>, educationLevel: string): CareerSuggestion[] => {
    // Career evaluation logic based on education level and responses
    const careerDatabase = {
      tenth: {
        'Mathematics & Science': [
          {
            career_path: 'Engineering Preparation',
            match_percentage: 85,
            description: 'Prepare for engineering entrance exams through Science stream',
            required_skills: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving'],
            salary_range: '₹3-8 LPA after graduation',
            growth_prospects: 'High demand in technology sector',
            steps: ['Complete 12th Science', 'Prepare for JEE/other entrance exams', 'Choose engineering specialization']
          },
          {
            career_path: 'Medical Field Preparation',
            match_percentage: 80,
            description: 'Pursue medical studies through Science stream with Biology',
            required_skills: ['Biology', 'Chemistry', 'Physics', 'Dedication to study'],
            salary_range: '₹5-15 LPA after specialization',
            growth_prospects: 'Always in demand, respected profession',
            steps: ['Complete 12th Science with Biology', 'Prepare for NEET', 'Complete MBBS/other medical courses']
          }
        ],
        'Business & Commerce': [
          {
            career_path: 'Business & Management',
            match_percentage: 90,
            description: 'Excel in business, commerce, and management fields',
            required_skills: ['Communication', 'Mathematics', 'Business Acumen', 'Leadership'],
            salary_range: '₹2.5-6 LPA initially',
            growth_prospects: 'Wide opportunities in corporate sector',
            steps: ['Complete 12th Commerce', 'Pursue BBA/B.Com', 'Consider MBA for advancement']
          }
        ],
        'Practical & Technical Skills': [
          {
            career_path: 'Technical Vocational Training',
            match_percentage: 88,
            description: 'Skilled technical roles through ITI, Polytechnic courses',
            required_skills: ['Technical aptitude', 'Hands-on skills', 'Problem solving'],
            salary_range: '₹2-5 LPA',
            growth_prospects: 'High demand for skilled technicians',
            steps: ['Complete ITI/Polytechnic', 'Gain practical experience', 'Specialize in emerging technologies']
          }
        ]
      },
      twelfth: {
        'Engineering & Technology': [
          {
            career_path: 'Software Engineering',
            match_percentage: 92,
            description: 'Build software applications and systems',
            required_skills: ['Programming', 'Problem Solving', 'Mathematics', 'Logical Thinking'],
            salary_range: '₹4-12 LPA',
            growth_prospects: 'Excellent growth in tech industry',
            steps: ['Complete B.Tech/B.E. in CSE/IT', 'Learn programming languages', 'Build projects and gain experience']
          }
        ],
        'Medical & Healthcare': [
          {
            career_path: 'Healthcare Professional',
            match_percentage: 88,
            description: 'Provide medical care and health services',
            required_skills: ['Medical Knowledge', 'Empathy', 'Communication', 'Attention to Detail'],
            salary_range: '₹5-20 LPA',
            growth_prospects: 'Always in demand, fulfilling career',
            steps: ['Complete medical degree', 'Gain clinical experience', 'Consider specialization']
          }
        ],
        'Business & Management': [
          {
            career_path: 'Business Analyst',
            match_percentage: 85,
            description: 'Analyze business processes and recommend improvements',
            required_skills: ['Analytical Skills', 'Communication', 'Business Knowledge', 'Data Analysis'],
            salary_range: '₹3-8 LPA',
            growth_prospects: 'High demand across industries',
            steps: ['Complete business degree', 'Learn data analysis tools', 'Gain industry experience']
          }
        ]
      },
      graduate: {
        'Technology & Software': [
          {
            career_path: 'Senior Software Developer',
            match_percentage: 90,
            description: 'Lead software development projects and mentor junior developers',
            required_skills: ['Advanced Programming', 'System Design', 'Leadership', 'Project Management'],
            salary_range: '₹8-25 LPA',
            growth_prospects: 'Can progress to architect or management roles',
            steps: ['Gain 2-3 years experience', 'Learn system design', 'Take leadership responsibilities']
          }
        ],
        'Financial Services': [
          {
            career_path: 'Financial Analyst',
            match_percentage: 87,
            description: 'Analyze financial data and market trends for investment decisions',
            required_skills: ['Financial Modeling', 'Data Analysis', 'Market Knowledge', 'Communication'],
            salary_range: '₹6-15 LPA',
            growth_prospects: 'Can advance to portfolio manager or investment banking',
            steps: ['Get relevant certifications', 'Build financial modeling skills', 'Gain market experience']
          }
        ]
      }
    }

    // Simple matching logic - in production, this would be more sophisticated
    const suggestions: CareerSuggestion[] = []
    const levelCareers = careerDatabase[educationLevel as keyof typeof careerDatabase]
    
    Object.values(levelCareers).flat().forEach(career => {
      suggestions.push(career)
    })

    return suggestions.slice(0, 3) // Return top 3 suggestions
  }

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Evaluate responses and get career suggestions
      const careerSuggestions = evaluateResponses(responses, educationLevel)

      // Save quiz response to localStorage (replace database functionality)
      const quizResult = {
        user_id: user.id,
        education_level: educationLevel,
        responses,
        career_suggestions: careerSuggestions,
        completed_at: new Date().toISOString()
      }
      localStorage.setItem('quiz-result', JSON.stringify(quizResult))

      toast({
        title: "Quiz completed successfully!",
        description: "Your personalized career suggestions are ready."
      })

      onComplete(careerSuggestions)
    } catch (error: any) {
      toast({
        title: "Error processing quiz results",
        description: error.message || "Something went wrong",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const currentQ = questions[currentQuestion]
  const currentResponse = responses[currentQ.id]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold">Career Assessment Quiz</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>15-20 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Personalized Results</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {currentQ.question}
            </h3>

            {currentQ.type === 'multiple_choice' && currentQ.options && (
              <RadioGroup
                value={currentResponse || ''}
                onValueChange={(value) => handleResponse(currentQ.id, value)}
              >
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                      <Label htmlFor={`${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentQ.type === 'rating' && (
              <div className="space-y-4">
                <div className="px-4">
                  <Slider
                    value={[currentResponse || 5]}
                    onValueChange={([value]) => handleResponse(currentQ.id, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-2">
                  <span>Not at all (1)</span>
                  <span>Neutral (5)</span>
                  <span>Very much (10)</span>
                </div>
                {currentResponse && (
                  <p className="text-center text-sm font-medium">
                    Selected: {currentResponse}/10
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!currentResponse || loading}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}