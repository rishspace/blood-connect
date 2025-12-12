import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DonorCard } from "./DonorCard";
import { MapPin, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { getDonors, User } from "@/lib/localDatabase";

export function DonorsList() {
  const [donors, setDonors] = useState<User[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadedDonors = getDonors();
    setDonors(loadedDonors);
  }, []);

  const displayedDonors = showAll ? donors : donors.slice(0, 6);

  return (
    <section id="find" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Donors Near You
            </h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Showing {displayedDonors.length} of {donors.length} registered donors
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard?tab=donors">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                View All
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Register as Donor
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDonors.map((donor, index) => (
            <div
              key={donor.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DonorCard 
                name={donor.name}
                bloodType={donor.bloodType}
                distance={`${(Math.random() * 5 + 1).toFixed(1)} km`}
                lastDonation={donor.lastDonation ? `${Math.floor((Date.now() - new Date(donor.lastDonation).getTime()) / (1000 * 60 * 60 * 24 * 30))} months ago` : 'New donor'}
                isAvailable={donor.isAvailable}
                donationCount={donor.donationCount}
                location={donor.location}
              />
            </div>
          ))}
        </div>

        {donors.length > 6 && !showAll && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
              Load More Donors
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
