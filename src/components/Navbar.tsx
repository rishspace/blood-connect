import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, X, User, Bell, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-xl text-foreground">BloodLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Find Donors
            </Link>
            <Link to="/signup" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Become Donor
            </Link>
            <Link to="/request" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Request Blood
            </Link>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            <Link 
              to="/dashboard" 
              className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find Donors
            </Link>
            <Link 
              to="/signup" 
              className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Become Donor
            </Link>
            <Link 
              to="/request" 
              className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Request Blood
            </Link>
            <a 
              href="#about" 
              className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button variant="destructive" className="flex-1" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="default" className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
