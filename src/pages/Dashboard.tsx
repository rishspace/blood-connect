import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Droplets,
  MapPin,
  Phone,
  Mail,
  Calendar,
  User,
  LogOut,
  Bell,
  Settings,
  Plus,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BloodTypeBadge } from '@/components/BloodTypeBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  getStats,
  getOpenRequests,
  getDonors,
  exportDatabase,
  importDatabase,
  clearDatabase,
  BloodRequest,
  User as DBUser,
} from '@/lib/localDatabase';

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalDonors: 0, totalDonations: 0, livesSaved: 0, openRequests: 0, fulfilledRequests: 0 });
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [donors, setDonors] = useState<DBUser[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'donors' | 'settings'>('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setStats(getStats());
    setRequests(getOpenRequests());
    setDonors(getDonors());
  };

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
    navigate('/');
  };

  const handleExport = () => {
    const data = exportDatabase();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bloodbank_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export successful', description: 'Database backup has been downloaded.' });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = importDatabase(event.target?.result as string);
          if (result) {
            loadData();
            toast({ title: 'Import successful', description: 'Database has been restored from backup.' });
          } else {
            toast({ title: 'Import failed', description: 'Invalid backup file.', variant: 'destructive' });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearDatabase();
      toast({ title: 'Data cleared', description: 'All local data has been removed.' });
      logout();
      navigate('/');
    }
  };

  const toggleAvailability = async () => {
    if (user) {
      await updateProfile({ isAvailable: !user.isAvailable });
      loadData();
      toast({
        title: user.isAvailable ? 'You are now unavailable' : 'You are now available',
        description: user.isAvailable
          ? 'You will not appear in donor searches.'
          : 'You will appear in donor searches.',
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-current" />
            <span className="text-xl font-bold text-gradient">BloodBank</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome, {user.name}!</h1>
                <div className="flex items-center gap-3 mt-1">
                  <BloodTypeBadge type={user.bloodType} />
                  <span className="text-muted-foreground capitalize">{user.role}</span>
                  {user.role === 'donor' && (
                    <span className={`inline-flex items-center gap-1 text-sm ${user.isAvailable ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span className={`w-2 h-2 rounded-full ${user.isAvailable ? 'bg-green-500' : 'bg-muted'}`} />
                      {user.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {user.role === 'donor' && (
              <Button onClick={toggleAvailability} variant={user.isAvailable ? 'outline' : 'default'}>
                {user.isAvailable ? 'Set Unavailable' : 'Set Available'}
              </Button>
            )}
            {user.role === 'seeker' && (
              <Link to="/request">
                <Button>
                  <Plus className="w-4 h-4" />
                  New Blood Request
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['overview', 'requests', 'donors', 'settings'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalDonors}</p>
                    <p className="text-sm text-muted-foreground">Total Donors</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalDonations}</p>
                    <p className="text-sm text-muted-foreground">Donations</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.livesSaved}</p>
                    <p className="text-sm text-muted-foreground">Lives Saved</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.openRequests}</p>
                    <p className="text-sm text-muted-foreground">Open Requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Profile</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{user.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {user.lastDonation ? `Last donated: ${user.lastDonation}` : 'No donations yet'}
                  </span>
                </div>
              </div>
              {user.role === 'donor' && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Total Donations: <span className="font-semibold text-foreground">{user.donationCount}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Blood Requests</h2>
              {user.role === 'seeker' && (
                <Link to="/request">
                  <Button size="sm">
                    <Plus className="w-4 h-4" />
                    New Request
                  </Button>
                </Link>
              )}
            </div>
            {requests.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No open blood requests at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <div key={request.id} className="glass-card p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BloodTypeBadge type={request.bloodType} />
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            request.urgency === 'emergency'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : request.urgency === 'urgent'
                              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {request.urgency.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-medium text-foreground">{request.seekerName}</p>
                        <p className="text-sm text-muted-foreground">{request.hospital}</p>
                        <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{request.unitsNeeded} units</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {user.role === 'donor' && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Button size="sm" className="w-full">
                          Respond to Request
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Available Donors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donors.filter(d => d.isAvailable).map((donor) => (
                <div key={donor.id} className="glass-card p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{donor.name}</p>
                        <BloodTypeBadge type={donor.bloodType} />
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Available
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {donor.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      {donor.donationCount} donations
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="w-4 h-4" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Data Management</h2>
              <p className="text-sm text-muted-foreground mb-4">
                All data is stored locally on your device. You can export, import, or clear your data below.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleExport} variant="outline">
                  <Download className="w-4 h-4" />
                  Export Database
                </Button>
                <Button onClick={handleImport} variant="outline">
                  <Upload className="w-4 h-4" />
                  Import Database
                </Button>
                <Button onClick={handleClearData} variant="destructive">
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                <Settings className="w-5 h-5 inline-block mr-2" />
                Offline Mode
              </h2>
              <p className="text-sm text-muted-foreground">
                This application runs completely offline. All features work without an internet connection.
                Your data is stored in your browser's local storage.
              </p>
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Offline Mode Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
