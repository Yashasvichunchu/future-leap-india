import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, useSearchParams } from 'react-router-dom'
import { QuizComponent } from '@/components/quiz/QuizComponent'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CareerSuggestion } from '@/lib/supabase'
import { Trophy, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'

const Quiz = () => {
  const { user, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [results, setResults] = useState<CareerSuggestion[]>([])
  
  const educationLevel = searchParams.get('level') as 'tenth' | 'twelfth' | 'graduate'

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!educationLevel || !['tenth', 'twelfth', 'graduate'].includes(educationLevel)) {
    return <Navigate to="/" replace />
  }

  const handleQuizComplete = (careerSuggestions: CareerSuggestion[]) => {
    setResults(careerSuggestions)
    setQuizCompleted(true)
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Quiz Completed Successfully!
            </h1>
            <p className="text-lg text-muted-foreground">
              Here are your personalized career recommendations based on your responses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((career, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{career.career_path}</CardTitle>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {career.match_percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{career.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Salary Range:</span>
                      <span className="text-sm text-muted-foreground">{career.salary_range}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Growth Prospects:</span>
                      <p className="text-muted-foreground">{career.growth_prospects}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {career.required_skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {career.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" onClick={() => window.location.href = '/dashboard'}>
              View Complete Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <QuizComponent 
        educationLevel={educationLevel} 
        onComplete={handleQuizComplete}
      />
    </div>
  )
}

export default Quiz