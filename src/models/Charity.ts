export interface Charity {
  slug: string;
  name: string;
  location?: string;
  description: string;
  profileUrl: string;
  logoUrl: string;
  coverImageUrl: string;
  tags?: string[];
}
