import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'
import { 
  User, 
  Target, 
  TrendingUp, 
  Map, 
  FileText, 
  Download,
  Award,
  BookOpen,
  Clock,
  Loader2
} from 'lucide-react'

export const Dashboard = () => {
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [skillGaps, setSkillGaps] = useState<any[]>([])
  const [roadmaps, setRoadmaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    setLoading(true)
    try {
      const [suggestions, gaps, maps] = await Promise.all([
        api.getCareerSuggestions(user.id),
        api.getSkillGaps(user.id),
        api.getRoadmaps(user.id)
      ])

      setQuizResults(suggestions)
      setSkillGaps(gaps)
      setRoadmaps(maps)
    } catch (error: any) {
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const generateSkillGapAnalysis = async (careerPath: string) => {
    if (!user) return

    try {
      await api.generateSkillGapAnalysis(user.id, careerPath)
      toast({
        title: "Analysis Generated",
        description: "Skill gap analysis has been created successfully"
      })
      loadDashboardData()
    } catch (error: any) {
      toast({
        title: "Error generating analysis",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const generateRoadmap = async (careerPath: string) => {
    if (!user) return

    try {
      await api.generateRoadmap(user.id, careerPath)
      toast({
        title: "Roadmap Generated",
        description: "Career roadmap has been created successfully"
      })
      loadDashboardData()
    } catch (error: any) {
      toast({
        title: "Error generating roadmap",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  const downloadRoadmapPDF = async (roadmapId: string) => {
    try {
      await api.downloadRoadmapPDF(roadmapId)
      toast({
        title: "Download Started",
        description: "Your roadmap PDF is being downloaded"
      })
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Career Dashboard</h1>
          <p className="text-muted-foreground">Track your career development journey</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-8 h-8 text-primary" />
          <span className="font-semibold">{user?.email}</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Career Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Your Career Matches</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizResults.length === 0 ? (
                <p className="text-muted-foreground">Take the career quiz to see your personalized recommendations.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quizResults.map((career, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{career.career_path}</h3>
                          <Badge variant="secondary">{career.match_percentage}% match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Salary: </span>
                            <span className="text-muted-foreground">{career.salary_range}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => generateSkillGapAnalysis(career.career_path)}
                            >
                              <TrendingUp className="w-4 h-4 mr-1" />
                              Skill Analysis
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => generateRoadmap(career.career_path)}
                            >
                              <Map className="w-4 h-4 mr-1" />
                              Create Roadmap
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Skill Gap Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {skillGaps.length === 0 ? (
                <p className="text-muted-foreground">Generate skill analysis from your career matches to see what skills you need to develop.</p>
              ) : (
                <div className="space-y-6">
                  {skillGaps.map((gap, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-4">{gap.career_path}</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-primary">Current Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {gap.current_skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-destructive">Missing Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {gap.missing_skills.map((skill, idx) => (
                              <Badge key={idx} variant="destructive">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Learning Recommendations</h4>
                        {gap.recommendations.map((rec, idx) => (
                          <div key={idx} className="bg-muted/50 rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{rec.skill}</span>
                              <span className="text-sm text-muted-foreground">{rec.time_to_learn}</span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div>
                                <span className="font-medium">Courses: </span>
                                <span className="text-muted-foreground">{rec.courses.join(', ')}</span>
                              </div>
                              <div>
                                <span className="font-medium">Resources: </span>
                                <span className="text-muted-foreground">{rec.resources.join(', ')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Map className="w-5 h-5" />
                <span>Career Roadmaps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roadmaps.length === 0 ? (
                <p className="text-muted-foreground">Create career roadmaps from your career matches to get step-by-step guidance.</p>
              ) : (
                <div className="space-y-6">
                  {roadmaps.map((roadmap, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{roadmap.career_path}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {roadmap.timeline_months} months timeline
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadRoadmapPDF(roadmap.id)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Export PDF
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {roadmap.steps.map((step, idx) => (
                          <div key={step.id} className="flex items-start space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              step.completed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{step.title}</h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{step.duration}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {step.resources.map((resource, resourceIdx) => (
                                  <Badge key={resourceIdx} variant="outline" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Resume Builder</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Build Your Professional Resume</h3>
                <p className="text-muted-foreground mb-4">
                  Create ATS-friendly resumes tailored for the Indian job market
                </p>
                <Button variant="hero">
                  <FileText className="w-4 h-4 mr-2" />
                  Start Building Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}