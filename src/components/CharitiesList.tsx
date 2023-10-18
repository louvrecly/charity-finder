import { CharityOverview } from '../models/Charity';
import CharityTile from './CharityTile';

interface CharitiesListProps {
  charities: CharityOverview[];
  fallbackMessage?: string;
}

const CharitiesList = ({
  charities,
  fallbackMessage = '',
}: CharitiesListProps) => {
  if (!charities.length) return <div>{fallbackMessage}</div>;

  return charities.map((charity) => (
    <CharityTile key={charity.slug} charity={charity} />
  ));
};

export default CharitiesList;
