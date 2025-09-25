import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Map, 
  FileText, 
  Brain,
  Download,
  Share,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Smart Career Matching",
      description: "AI-powered algorithm matches your interests, skills, and personality with suitable career paths",
      features: ["Personality assessment", "Interest mapping", "Skill evaluation", "Market demand analysis"],
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Identify what skills you need to develop for your dream career with actionable recommendations",
      features: ["Current skill assessment", "Industry requirements", "Learning resources", "Progress tracking"],
      color: "secondary"
    },
    {
      icon: Map,
      title: "Interactive Career Roadmap",
      description: "Visual step-by-step guide showing exactly how to reach your career goals",
      features: ["Timeline visualization", "Milestone tracking", "Course recommendations", "PDF export"],
      color: "success"
    },
    {
      icon: FileText,
      title: "Professional Resume Builder",
      description: "Create ATS-friendly resumes tailored for the Indian job market with industry-specific templates",
      features: ["Multiple templates", "ATS optimization", "Industry customization", "Real-time preview"],
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "bg-primary/10 text-primary group-hover:bg-primary/20",
      secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary/20", 
      success: "bg-success/10 text-success group-hover:bg-success/20",
      accent: "bg-accent/10 text-accent group-hover:bg-accent/20"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-primary/10 text-primary";
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Career Guidance Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to make informed career decisions and achieve your professional goals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="career-card group border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${getColorClasses(feature.color)}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Personalized Dashboard
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your progress, access your career roadmap, and manage all your career development tools in one place
            </p>
          </div>

          {/* Dashboard Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Quiz Results</h4>
              <p className="text-sm text-muted-foreground">View detailed analysis of your career assessment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Export Tools</h4>
              <p className="text-sm text-muted-foreground">Download roadmaps and resumes as PDF</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share className="w-8 h-8 text-success" />
              </div>
              <h4 className="font-semibold mb-2">Share Progress</h4>
              <p className="text-sm text-muted-foreground">Share achievements with family and mentors</p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              Explore Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;