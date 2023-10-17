import { Charity } from '../models/Charity';

interface CharityTileProps {
  charity: Charity;
}

const CharityTile = ({ charity }: CharityTileProps) => {
  return (
    <div>
      <a href={charity.profileUrl}>
        <h2>
          <img src={charity.logoUrl ?? 'https://every.org/favicon-32x32.png'} alt={charity.name} />
          <span>{charity.name}</span>
        </h2>
      </a>

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
            <li key={`${charity.slug}-${tag}`}>{tag}</li>
          ))}
      </ul>
    </div>
  );
}

export default CharityTile;
