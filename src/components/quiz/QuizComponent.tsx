import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { api } from '@/lib/api'
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
  onComplete: (results: any[]) => void
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


  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    try {
      const result: any = await api.submitQuiz({
        userId: user.id,
        educationLevel,
        responses
      })

      toast({
        title: "Quiz completed successfully!",
        description: "Your personalized career suggestions are ready."
      })

      onComplete(result.careerSuggestions || [])
    } catch (error: any) {
      toast({
        title: "Error saving quiz results",
        description: error.message,
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