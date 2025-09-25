import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Pattern */}
      <div className="absolute inset-0 hero-gradient pattern-dots opacity-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Indian students pursuing their careers"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Career Path
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Personalized career guidance for Indian students. From 10th pass to graduates, 
              discover your ideal career with AI-powered assessments, skill analysis, and step-by-step roadmaps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="group">
                Start Career Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Careers
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-sm text-muted-foreground">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up">
            <div className="career-card text-center group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Personalized Quiz</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered assessment based on your education level and interests
              </p>
            </div>

            <div className="career-card text-center group">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-secondary/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Skill Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Identify skill gaps and get actionable recommendations
              </p>
            </div>

            <div className="career-card text-center group">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-success/20 transition-colors">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Career Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step guide with courses, certifications, and milestones
              </p>
            </div>

            <div className="career-card text-center group">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Resume Builder</h3>
              <p className="text-sm text-muted-foreground">
                Professional resumes tailored for the Indian job market
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;