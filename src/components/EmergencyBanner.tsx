import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function EmergencyBanner() {
  return (
    <section className="py-16 bg-hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Emergency Blood Request
              </h3>
              <p className="text-primary-foreground/80 max-w-xl">
                Someone nearby urgently needs blood. Your donation could save a life. 
                Use our SOS feature to respond to emergency requests in your area.
              </p>
            </div>
          </div>

          <Link to="/dashboard?tab=requests">
            <Button variant="heroOutline" size="lg" className="flex-shrink-0">
              Respond to SOS
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
