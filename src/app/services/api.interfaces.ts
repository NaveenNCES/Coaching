// API Response interfaces for type safety

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface Coach {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  gender: 'male' | 'female';
  email?: string;
  experience?: number;
  rating?: number;
  bio?: string;
  availability?: string[];
}

export interface Appointment {
  id: string;
  coachId: string;
  coachName: string;
  userId: string;
  userName: string;
  date: string;
  slot: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  coachId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Error interface
export interface ApiError {
  status: number;
  message: string;
  details?: any;
} 