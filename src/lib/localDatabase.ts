// Local Database System for Offline Demo
// All data is stored in localStorage for full offline functionality

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  bloodType: string;
  phone: string;
  location: string;
  role: 'donor' | 'seeker';
  isAvailable: boolean;
  donationCount: number;
  lastDonation: string | null;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  seekerId: string;
  seekerName: string;
  bloodType: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  location: string;
  hospital: string;
  unitsNeeded: number;
  description: string;
  status: 'open' | 'fulfilled' | 'cancelled';
  createdAt: string;
  responses: RequestResponse[];
}

export interface RequestResponse {
  id: string;
  donorId: string;
  donorName: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface DonationHistory {
  id: string;
  donorId: string;
  donorName: string;
  requestId: string;
  bloodType: string;
  units: number;
  hospital: string;
  date: string;
  createdAt: string;
}

const DB_KEYS = {
  USERS: 'bloodbank_users',
  REQUESTS: 'bloodbank_requests',
  DONATIONS: 'bloodbank_donations',
  CURRENT_USER: 'bloodbank_current_user',
};

// Initialize database with sample data if empty
export function initializeDatabase() {
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const sampleUsers: User[] = [
      {
        id: '1',
        email: 'sarah@example.com',
        password: 'password123',
        name: 'Sarah Johnson',
        bloodType: 'O+',
        phone: '+1234567890',
        location: 'Downtown Medical Center',
        role: 'donor',
        isAvailable: true,
        donationCount: 12,
        lastDonation: '2024-09-15',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'michael@example.com',
        password: 'password123',
        name: 'Michael Chen',
        bloodType: 'A+',
        phone: '+1234567891',
        location: 'City Hospital',
        role: 'donor',
        isAvailable: true,
        donationCount: 8,
        lastDonation: '2024-08-20',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        email: 'emily@example.com',
        password: 'password123',
        name: 'Emily Rodriguez',
        bloodType: 'B-',
        phone: '+1234567892',
        location: 'Red Cross Center',
        role: 'donor',
        isAvailable: false,
        donationCount: 15,
        lastDonation: '2024-10-01',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        email: 'david@example.com',
        password: 'password123',
        name: 'David Kim',
        bloodType: 'AB+',
        phone: '+1234567893',
        location: 'Community Blood Bank',
        role: 'donor',
        isAvailable: true,
        donationCount: 6,
        lastDonation: '2024-07-10',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        email: 'jessica@example.com',
        password: 'password123',
        name: 'Jessica Patel',
        bloodType: 'O-',
        phone: '+1234567894',
        location: 'University Hospital',
        role: 'seeker',
        isAvailable: true,
        donationCount: 0,
        lastDonation: null,
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem(DB_KEYS.REQUESTS)) {
    const sampleRequests: BloodRequest[] = [
      {
        id: '1',
        seekerId: '5',
        seekerName: 'Jessica Patel',
        bloodType: 'O-',
        urgency: 'urgent',
        location: 'University Hospital',
        hospital: 'University Hospital',
        unitsNeeded: 2,
        description: 'Needed for emergency surgery',
        status: 'open',
        createdAt: new Date().toISOString(),
        responses: [],
      },
    ];
    localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify(sampleRequests));
  }

  if (!localStorage.getItem(DB_KEYS.DONATIONS)) {
    localStorage.setItem(DB_KEYS.DONATIONS, JSON.stringify([]));
  }
}

// User operations
export function getUsers(): User[] {
  const data = localStorage.getItem(DB_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function getDonors(): User[] {
  return getUsers().filter(u => u.role === 'donor');
}

export function getUserById(id: string): User | null {
  return getUsers().find(u => u.id === id) || null;
}

export function getUserByEmail(email: string): User | null {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  return users[index];
}

// Auth operations
export function login(email: string, password: string): User | null {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  }
  return null;
}

export function logout() {
  localStorage.removeItem(DB_KEYS.CURRENT_USER);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: User) {
  localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
}

// Blood Request operations
export function getRequests(): BloodRequest[] {
  const data = localStorage.getItem(DB_KEYS.REQUESTS);
  return data ? JSON.parse(data) : [];
}

export function getOpenRequests(): BloodRequest[] {
  return getRequests().filter(r => r.status === 'open');
}

export function getRequestById(id: string): BloodRequest | null {
  return getRequests().find(r => r.id === id) || null;
}

export function createRequest(request: Omit<BloodRequest, 'id' | 'createdAt' | 'responses'>): BloodRequest {
  const requests = getRequests();
  const newRequest: BloodRequest = {
    ...request,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    responses: [],
  };
  requests.push(newRequest);
  localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify(requests));
  return newRequest;
}

export function updateRequest(id: string, updates: Partial<BloodRequest>): BloodRequest | null {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) return null;
  requests[index] = { ...requests[index], ...updates };
  localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify(requests));
  return requests[index];
}

export function addResponseToRequest(requestId: string, response: Omit<RequestResponse, 'id' | 'createdAt'>): BloodRequest | null {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === requestId);
  if (index === -1) return null;
  
  const newResponse: RequestResponse = {
    ...response,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  requests[index].responses.push(newResponse);
  localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify(requests));
  return requests[index];
}

// Donation History operations
export function getDonations(): DonationHistory[] {
  const data = localStorage.getItem(DB_KEYS.DONATIONS);
  return data ? JSON.parse(data) : [];
}

export function createDonation(donation: Omit<DonationHistory, 'id' | 'createdAt'>): DonationHistory {
  const donations = getDonations();
  const newDonation: DonationHistory = {
    ...donation,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  donations.push(newDonation);
  localStorage.setItem(DB_KEYS.DONATIONS, JSON.stringify(donations));
  
  // Update donor's donation count
  const donor = getUserById(donation.donorId);
  if (donor) {
    updateUser(donor.id, {
      donationCount: donor.donationCount + 1,
      lastDonation: donation.date,
    });
  }
  
  return newDonation;
}

// Stats
export function getStats() {
  const users = getUsers();
  const donations = getDonations();
  const requests = getRequests();
  
  return {
    totalDonors: users.filter(u => u.role === 'donor').length,
    totalDonations: donations.length,
    livesSaved: Math.floor(donations.reduce((acc, d) => acc + d.units, 0) * 3),
    openRequests: requests.filter(r => r.status === 'open').length,
    fulfilledRequests: requests.filter(r => r.status === 'fulfilled').length,
  };
}

// Export database for backup
export function exportDatabase(): string {
  return JSON.stringify({
    users: getUsers(),
    requests: getRequests(),
    donations: getDonations(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

// Import database from backup
export function importDatabase(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.users) localStorage.setItem(DB_KEYS.USERS, JSON.stringify(data.users));
    if (data.requests) localStorage.setItem(DB_KEYS.REQUESTS, JSON.stringify(data.requests));
    if (data.donations) localStorage.setItem(DB_KEYS.DONATIONS, JSON.stringify(data.donations));
    return true;
  } catch {
    return false;
  }
}

// Clear all data
export function clearDatabase() {
  localStorage.removeItem(DB_KEYS.USERS);
  localStorage.removeItem(DB_KEYS.REQUESTS);
  localStorage.removeItem(DB_KEYS.DONATIONS);
  localStorage.removeItem(DB_KEYS.CURRENT_USER);
}
