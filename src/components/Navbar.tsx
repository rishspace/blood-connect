import { useState } from "react";
import { Heart, Menu, X, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-xl text-foreground">BloodLink</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#find" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Find Donors
            </a>
            <a href="#donate" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Donate
            </a>
            <a href="#campaigns" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Campaigns
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button variant="default">Register</Button>
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
            isOpen ? "max-h-80 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            <a href="#find" className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
              Find Donors
            </a>
            <a href="#donate" className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
              Donate
            </a>
            <a href="#campaigns" className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
              Campaigns
            </a>
            <a href="#about" className="py-2 px-4 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors">
              About
            </a>
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
              <Button variant="outline" className="flex-1">Sign In</Button>
              <Button variant="default" className="flex-1">Register</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
