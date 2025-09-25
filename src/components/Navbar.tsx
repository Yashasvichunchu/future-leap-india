import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SignInDialog } from "@/components/auth/SignInDialog";
import { SignUpDialog } from "@/components/auth/SignUpDialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CareerGuide
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#quiz" className="text-foreground hover:text-primary transition-colors">
              Take Quiz
            </a>
            <a href="#resources" className="text-foreground hover:text-primary transition-colors">
              Resources
            </a>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button variant="hero" size="sm" onClick={() => window.location.href = '/dashboard'}>
                  Dashboard
                </Button>
              </div>
            ) : (
              <>
                <SignInDialog>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </SignInDialog>
                <SignUpDialog>
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </SignUpDialog>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-4 pb-4 space-y-4">
            <a href="#features" className="block text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#quiz" className="block text-foreground hover:text-primary transition-colors">
              Take Quiz
            </a>
            <a href="#resources" className="block text-foreground hover:text-primary transition-colors">
              Resources
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button variant="hero" size="sm" onClick={() => window.location.href = '/dashboard'}>
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <SignInDialog>
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </SignInDialog>
                  <SignUpDialog>
                    <Button variant="hero" size="sm">
                      Get Started
                    </Button>
                  </SignUpDialog>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;