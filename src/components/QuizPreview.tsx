import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  ChevronRight,
  Clock,
  Users,
  Award
} from "lucide-react";

const QuizPreview = () => {
  const educationLevels = [
    {
      level: "10th Pass",
      icon: BookOpen,
      description: "Explore streams and vocational courses",
      color: "bg-primary/10 text-primary",
      features: ["Stream Selection", "Vocational Training", "Skill Development"]
    },
    {
      level: "12th Pass", 
      icon: GraduationCap,
      description: "Discover college degrees and competitive exams",
      color: "bg-secondary/10 text-secondary",
      features: ["College Courses", "Entrance Exams", "Career Planning"]
    },
    {
      level: "Graduate",
      icon: Briefcase,
      description: "Find job roles and career advancement paths",
      color: "bg-success/10 text-success",
      features: ["Job Opportunities", "Skill Enhancement", "Industry Insights"]
    }
  ];

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Personalized Career Assessment
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take our comprehensive quiz designed specifically for your education level. 
            Get personalized career recommendations based on your interests, skills, and goals.
          </p>
        </div>

        {/* Education Level Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {educationLevels.map((item, index) => (
            <Card key={index} className="quiz-card group cursor-pointer border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold">{item.level}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="quiz" className="w-full group">
                  Start Assessment
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Sample Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-muted/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">Sample Quiz Question</CardTitle>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>15-20 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>25 questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Instant results</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">Question 3 of 25</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>

              {/* Sample Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Which type of work environment appeals to you most?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Creative and flexible workspace",
                    "Structured office environment", 
                    "Hands-on fieldwork",
                    "Remote and digital workspace"
                  ].map((option, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 border-2 border-muted-foreground rounded-full"></div>
                        <span className="text-foreground">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline">
                  Previous
                </Button>
                <Button variant="hero">
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuizPreview;