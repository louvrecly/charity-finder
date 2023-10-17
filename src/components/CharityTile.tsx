import { Link } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';

interface CharityTileProps {
  charity: CharityOverview;
}

const CharityTile = ({ charity }: CharityTileProps) => {
  return (
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

      <p>
        Location:{' '}
        <a
          href={`https://www.google.com/maps/search/${(
            charity.location ?? ''
          ).replace(/\s/g, '+')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {charity.location}
        </a>
      </p>

      <p>{charity.description}</p>

      <ul>
        {charity.tags &&
          charity.tags.map((tag) => (
            <li key={`${charity.slug}-${tag}`}>
              <Link to={`/?cause=${tag}`}>{tag}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CharityTile;
