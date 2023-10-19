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

  return (
    <div className="u-flex u-flex-col u-gap-3 sm:u-flex-row sm:u-flex-wrap">
      {charities.map((charity) => (
        <CharityTile key={charity.slug} charity={charity} />
      ))}
    </div>
  );
};

export default CharitiesList;
