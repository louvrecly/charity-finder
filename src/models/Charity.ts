interface Charity {
  name: string;
  description: string;
  profileUrl: string;
  logoUrl: string;
  coverImageUrl: string;
}

export interface CharityOverview extends Charity {
  slug: string;
  location: string;
  tags?: string[];
}

export interface CharityDetails extends Charity {
  id: string;
  primarySlug: string;
  descriptionLong: string;
  locationAddress: string;
  locationLatLng: {
    type: string;
    coordinates: [number, number];
  };
  websiteUrl: string;
}
