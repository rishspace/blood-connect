import { MapPin, Clock, Phone, MessageCircle, Droplets } from "lucide-react";
import { BloodTypeBadge } from "./BloodTypeBadge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface DonorCardProps {
  name: string;
  bloodType: string;
  distance: string;
  lastDonation: string;
  isAvailable: boolean;
  donationCount: number;
  location: string;
  className?: string;
}

export function DonorCard({
  name,
  bloodType,
  distance,
  lastDonation,
  isAvailable,
  donationCount,
  location,
  className,
}: DonorCardProps) {
  const { toast } = useToast();

  const handleCall = () => {
    toast({
      title: "Calling " + name,
      description: "Demo: In a real app, this would initiate a phone call.",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message to " + name,
      description: "Demo: In a real app, this would open a chat window.",
    });
  };

  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 group",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <BloodTypeBadge type={bloodType} size="md" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <div className="flex items-center gap-1">
              {isAvailable ? (
                <>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                  </span>
                  <span className="text-xs text-success font-medium">Available</span>
                </>
              ) : (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50"></span>
                  <span className="text-xs text-muted-foreground">Unavailable</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lastDonation}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-accent rounded-lg">
              <Droplets className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-accent-foreground">
                {donationCount} donations
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{location}</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="default" className="flex-1" onClick={handleCall} disabled={!isAvailable}>
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={handleMessage} disabled={!isAvailable}>
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
