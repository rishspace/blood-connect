import { Users, Droplets, MapPin, Award } from "lucide-react";
import { StatsCard } from "./StatsCard";

const stats = [
  {
    icon: Users,
    value: "10,500+",
    label: "Registered Donors",
    trend: "+12% this month",
  },
  {
    icon: Droplets,
    value: "5,200+",
    label: "Successful Donations",
    trend: "+8% this month",
  },
  {
    icon: MapPin,
    value: "50+",
    label: "Cities Covered",
    trend: "+5 new cities",
  },
  {
    icon: Award,
    value: "98%",
    label: "Success Rate",
    trend: "Industry leading",
  },
];

export function Stats() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Making an Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            Together, we're building a stronger blood donation network
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
