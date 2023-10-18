import { CharityDetails, CharityOverview } from './Charity';
import { CauseDetails } from './Cause';

export type SearchResponse = {
  nonprofits: CharityOverview[];
};

type GetResponseData = {
  nonprofit: CharityDetails;
  nonprofitTags?: CauseDetails[];
};

export type GetResponse = {
  data?: GetResponseData;
  message?: string;
};
