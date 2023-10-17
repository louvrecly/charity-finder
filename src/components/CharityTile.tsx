import { Link } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import TagsList from './TagsList';
import LocationBlock from './LocationBlock';

interface CharityTileProps {
  charity: CharityOverview;
}

const CharityTile = ({ charity }: CharityTileProps) => (
  <div>
    <Link to={`/charity/${charity.slug}`}>
      <h2>
        <img
          src={charity.logoUrl ?? 'https://every.org/favicon-32x32.png'}
          alt={charity.name}
        />
        <span>{charity.name}</span>
      </h2>
    </Link>

    <LocationBlock location={charity.location} />

    <p>{charity.description}</p>

    <TagsList tags={charity.tags} />
  </div>
);

export default CharityTile;
