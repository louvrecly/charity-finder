import { Link } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import ProfileTitle from './ProfileTitle';
import LocationBlock from './LocationBlock';
import CausesList from './CausesList';

interface CharityTileProps {
  charity: CharityOverview;
}

const CharityTile = ({ charity }: CharityTileProps) => (
  <div className="u-py-2 u-px-8 u-flex-1 u-shadow-xl">
    <Link to={`/charity/${charity.slug}`}>
      <ProfileTitle name={charity.name} logoUrl={charity.logoUrl} />
    </Link>

    <LocationBlock location={charity.location} />

    <p className="u-text-sm">{charity.description}</p>

    <CausesList causes={charity.tags} />
  </div>
);

export default CharityTile;
