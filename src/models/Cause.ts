export const ALL_CAUSES = [
  'aapi-led',
  'adoption',
  'afghanistan',
  'animals',
  'art',
  'athletics',
  'autism',
  'black-led',
  'buddhism',
  'cancer',
  'cats',
  'christianity',
  'climate',
  'conservation',
  'coronavirus',
  'culture',
  'dance',
  'disabilities',
  'disease',
  'dogs',
  'education',
  'environment',
  'filmandtv',
  'food-security',
  'freepress',
  'gender-equality',
  'health',
  'hinduism',
  'housing',
  'humans',
  'hurricane-ian',
  'immigrants',
  'indigenous-led',
  'indigenous-peoples',
  'islam',
  'judaism',
  'justice',
  'latine-led',
  'legal',
  'lgbt',
  'libraries',
  'mental-health',
  'museums',
  'music',
  'oceans',
  'parks',
  'poverty',
  'racial-justice',
  'radio',
  'refugees',
  'religion',
  'research',
  'science',
  'seniors',
  'space',
  'theater',
  'transgender',
  'ukraine',
  'veterans',
  'votingrights',
  'water',
  'wildfires',
  'wildlife',
  'women-led',
  'womens-health',
  'youth',
] as const;

export type Cause = (typeof ALL_CAUSES)[number];

export interface CauseDetails {
  id: string;
  tagName: Cause;
  title: string;
  causeCategory: string;
  tagImageCloudinaryId: string;
  tagImageUrl: string;
  tagUrl: string;
}