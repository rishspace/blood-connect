import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Building2, FileText, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BloodTypeSelector } from '@/components/BloodTypeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createRequest } from '@/lib/localDatabase';

export default function BloodRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: '',
    urgency: 'normal' as 'normal' | 'urgent' | 'emergency',
    hospital: '',
    location: '',
    unitsNeeded: 1,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to create a request.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (!formData.bloodType) {
      toast({
        title: 'Blood type required',
        description: 'Please select the blood type needed.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      createRequest({
        seekerId: user.id,
        seekerName: user.name,
        bloodType: formData.bloodType,
        urgency: formData.urgency,
        location: formData.location || user.location,
        hospital: formData.hospital,
        unitsNeeded: formData.unitsNeeded,
        description: formData.description,
        status: 'open',
      });

      toast({
        title: 'Request created!',
        description: 'Your blood request has been posted. Donors will be notified.',
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Failed to create request',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blood-light via-background to-accent/30 p-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="glass-card p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary fill-current" />
              <span className="text-2xl font-bold text-gradient">BloodBank</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Create Blood Request</h1>
            <p className="text-muted-foreground">Post a request to find blood donors near you</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Urgency Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Urgency Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['normal', 'urgent', 'emergency'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: level })}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.urgency === level
                        ? level === 'emergency'
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : level === 'urgent'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {level === 'emergency' && <AlertTriangle className={`w-5 h-5 mx-auto mb-1 ${formData.urgency === level ? 'text-red-500' : 'text-muted-foreground'}`} />}
                    <p className={`font-medium capitalize ${
                      formData.urgency === level
                        ? level === 'emergency'
                          ? 'text-red-600 dark:text-red-400'
                          : level === 'urgent'
                          ? 'text-orange-600 dark:text-orange-400'
                          : 'text-primary'
                        : 'text-foreground'
                    }`}>
                      {level}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Blood Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Blood Type Needed</label>
              <BloodTypeSelector
                selected={formData.bloodType}
                onSelect={(type) => setFormData({ ...formData, bloodType: type || '' })}
              />
            </div>

            {/* Units Needed */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Units Needed</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, unitsNeeded: Math.max(1, formData.unitsNeeded - 1) })}
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-foreground w-12 text-center">{formData.unitsNeeded}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, unitsNeeded: Math.min(10, formData.unitsNeeded + 1) })}
                >
                  +
                </Button>
                <span className="text-muted-foreground">units</span>
              </div>
            </div>

            {/* Hospital */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hospital / Medical Center</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  placeholder="Enter hospital name"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={user?.location || 'Enter location'}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Additional Details</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide any additional information (patient condition, urgency reason, etc.)"
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Request...' : 'Post Blood Request'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
