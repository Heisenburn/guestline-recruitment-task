export interface HotelsRootData {
  id: string
  name: string
  description: string
  address1: string
  address2: string
  postcode: string
  town: string
  country: string
  countryCode: string
  starRating: string
  facilities: Facility[]
  telephone: string
  email: string
  images: Image[]
  checkInHours: string
  checkInMinutes: string
  checkOutHours: string
  checkOutMinutes: string
  position: Position
}

export interface Facility {
  code: string
}

export interface Image {
  url: string
}

export interface Position {
  latitude: number
  longitude: number
  timezone: string
}

export interface Room {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  occupancy: Occupancy
  disabledAccess: boolean
  bedConfiguration: string
  images: Image[]
  facilities: Facility[]
}

export interface Image {
  url: string
  alt: string
}

export interface Facility {
  code: string
  name: string
}
export interface HotelDetailsResponse {
  rooms: Room[]
  ratePlans: RatePlan[]
}

export interface Room {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  occupancy: Occupancy
  disabledAccess: boolean
  bedConfiguration: string
  images: Image[]
  facilities: Facility[]
}

export interface Occupancy {
  maxAdults: number
  maxChildren: number
  maxOverall?: number
}

export interface Image {
  url: string
  alt: string
}

export interface Facility {
  code: string
  name: string
}

export interface RatePlan {
  id: string
  shortDescription: string
  longDescription?: string
  prePayment: string
  cancellationPolicy?: CancellationPolicy
  prePaymentValue?: number
  prePaymentIsPercentage?: boolean
}

export interface CancellationPolicy {
  name: string
  text: string
  penalty: string
  applicable: string
  amount?: number
  days?: number
  hour: string
}

export type MergedHotelWithDetailsType = HotelsRootData & HotelDetailsResponse
