import { DonorCard } from "./DonorCard";
import { MapPin, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

const mockDonors = [
  {
    name: "Sarah Johnson",
    bloodType: "O+",
    distance: "1.2 km",
    lastDonation: "3 months ago",
    isAvailable: true,
    donationCount: 12,
    location: "Downtown Medical Center",
  },
  {
    name: "Michael Chen",
    bloodType: "A+",
    distance: "2.8 km",
    lastDonation: "4 months ago",
    isAvailable: true,
    donationCount: 8,
    location: "City Hospital",
  },
  {
    name: "Emily Rodriguez",
    bloodType: "B-",
    distance: "3.5 km",
    lastDonation: "2 months ago",
    isAvailable: false,
    donationCount: 15,
    location: "Red Cross Center",
  },
  {
    name: "David Kim",
    bloodType: "AB+",
    distance: "4.1 km",
    lastDonation: "5 months ago",
    isAvailable: true,
    donationCount: 6,
    location: "Community Blood Bank",
  },
  {
    name: "Jessica Patel",
    bloodType: "O-",
    distance: "5.2 km",
    lastDonation: "6 months ago",
    isAvailable: true,
    donationCount: 20,
    location: "University Hospital",
  },
  {
    name: "Robert Wilson",
    bloodType: "A-",
    distance: "6.8 km",
    lastDonation: "4 months ago",
    isAvailable: true,
    donationCount: 10,
    location: "Regional Medical Center",
  },
];

export function DonorsList() {
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
              Showing results for your current location
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDonors.map((donor, index) => (
            <div
              key={donor.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DonorCard {...donor} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            Load More Donors
          </Button>
        </div>
      </div>
    </section>
  );
}
