import { Cause } from './Cause';

interface Charity {
  name: string;
  description: string;
  profileUrl: string;
  logoUrl: string;
  coverImageUrl: string;
  ein: string;
  logoCloudinaryId: string;
}

export interface CharityOverview extends Charity {
  slug: string;
  location: string;
  tags?: Cause[];
  matchedTerms: string[];
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
  directDisbursement: boolean;
  hasAdmin: boolean;
  isDisbursable: boolean;
  nteeCode: string;
  nteeCodeMeaning: {
    centileCode: string;
    centileMeaning: string;
    decileCode: string;
    decileMeaning: string;
    majorCode: string;
    majorMeaning: string;
  };
}
