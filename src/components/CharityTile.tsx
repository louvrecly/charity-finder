import { Link } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import ProfileTitle from './ProfileTitle';
import LocationBlock from './LocationBlock';
import TagsList from './TagsList';

interface CharityTileProps {
  charity: CharityOverview;
}

const CharityTile = ({ charity }: CharityTileProps) => (
  <div>
    <Link to={`/charity/${charity.slug}`}>
      <ProfileTitle name={charity.name} logoUrl={charity.logoUrl} />
    </Link>

    <LocationBlock location={charity.location} />

    <p>{charity.description}</p>

    <TagsList tags={charity.tags} />
  </div>
);

export default CharityTile;
