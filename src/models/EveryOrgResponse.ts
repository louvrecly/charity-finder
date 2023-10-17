import { CharityDetails, CharityOverview } from './Charity';
import { TagDetails } from './Tag';

export type SearchResponse = {
  nonprofits: CharityOverview[];
};

type GetResponseData = {
  nonprofit: CharityDetails;
  nonprofitTags?: TagDetails[];
};

export type GetResponse = {
  data?: GetResponseData;
  message?: string;
};
