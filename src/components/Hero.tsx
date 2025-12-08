import { Heart, Search, MapPin, ArrowRight, Droplets } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { BloodTypeSelector } from "./BloodTypeSelector";

export function Hero() {
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blood-light via-background to-accent/30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Floating Blood Drops */}
      <div className="absolute top-1/4 right-1/4 animate-float">
        <Droplets className="w-12 h-12 text-primary/20" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 animate-float" style={{ animationDelay: "2s" }}>
        <Droplets className="w-8 h-8 text-primary/15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm font-medium text-accent-foreground">
                Saving Lives Together
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Every Drop{" "}
              <span className="text-gradient">Counts</span>
              <br />
              Be a Lifesaver Today
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Connect with blood donors instantly. Find compatible donors near you 
              or register to help save lives in your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" variant="hero">
                <Search className="w-5 h-5" />
                Find Donors
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="xl" variant="outline">
                <Heart className="w-5 h-5" />
                Become a Donor
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Active Donors</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5K+</p>
                <p className="text-sm text-muted-foreground">Lives Saved</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Cities</p>
              </div>
            </div>
          </div>

          {/* Right Content - Search Card */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Quick Search</h3>
                  <p className="text-sm text-muted-foreground">Find donors near you</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select Blood Type
                  </label>
                  <BloodTypeSelector
                    selected={selectedBloodType}
                    onSelect={setSelectedBloodType}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Enter city or use current location"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <Button className="w-full" size="lg" disabled={!selectedBloodType}>
                  <Search className="w-4 h-4" />
                  Search Donors
                </Button>
              </div>

              {/* Emergency CTA */}
              <div className="pt-4 border-t border-border">
                <button className="w-full flex items-center justify-center gap-2 py-3 text-primary hover:text-primary/80 transition-colors">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="font-semibold">Emergency SOS Request</span>
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/50 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
