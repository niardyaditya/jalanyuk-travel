export type TripCategory = 
  | 'Semua' 
  | 'Hidden Gems' 
  | 'Petualangan Alam' 
  | 'Pantai Tropis' 
  | 'Wisata Budaya' 
  | 'Family Trip';

export interface DayItinerary {
  day: number;
  timeRange: string;
  title: string;
  description: string;
  highlights: string[];
  photoStamp?: string;
  stampLabel?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city?: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
  helpfulCount?: number;
  tripType?: string;
  highlight?: string;
  avatar?: string;
}

export type Review = ReviewItem;

export interface Destination {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  location: string;
  province: string;
  country: string;
  category: TripCategory;
  rating: number;
  reviewCount: number;
  duration: string;
  tripType: string;
  pricePerPerson: number;
  featured: boolean;
  imageUrl: string;
  gallery: {
    url: string;
    caption: string;
    category?: string;
  }[];
  shortDescription: string;
  narrativeOverview: string[];
  specs: {
    duration: string;
    groupSize: string;
    difficulty: string;
    meetingPoint: string;
  };
  advantages: {
    icon: string;
    title: string;
    description: string;
  }[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  reviews: ReviewItem[];
  alternativeDestinations: string[]; // ids
}

export interface TravelStory {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
  author: string;
  authorRole: string;
  imageUrl: string;
}

export interface BookingState {
  tripFormat: 'open' | 'private';
  selectedDate: string;
  cabinType: 'deluxe' | 'suite';
  adults: number;
  children: number;
  addonDrone: boolean;
  addonScuba: boolean;
  voucherCode: string;
  discountAmount: number;
  paymentMode: 'dp' | 'full';
}
