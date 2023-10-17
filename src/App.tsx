import { MouseEvent, useEffect, useState } from 'react';
import { ALL_CAUSES } from './data/causes';

const { VITE_API_KEY } = import.meta.env;

interface Charity {
  slug: string;
  name: string;
  location?: string;
  description: string;
  profileUrl: string;
  logoUrl: string;
  coverImageUrl: string;
  tags?: string[];
}

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function searchByKeyword(cause: string) {
    const res = await fetch(
      `https://partners.every.org/v0.2/search/${cause}?apiKey=${VITE_API_KEY}`,
    );
    return res.json();
  }

  const handleInput = (event: MouseEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setKeyword(value);
  };

  useEffect(() => {
    const index = Math.floor(Math.random() * ALL_CAUSES.length);
    const cause = ALL_CAUSES[index];
    setIsLoading(true);

    searchByKeyword(cause)
      .then((result) => {
        setErrorMessage('');
        setCharities(result.Charities as Charity[]);
      })
      .catch((err) => setErrorMessage(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1>Charity Finder</h1>

      <input
        type="text"
        placeholder="Input a cause here"
        onInput={handleInput}
      />

      <p>{keyword}</p>

      <div>
        {isLoading
          ? 'Loading...'
          : errorMessage ||
          charities.map((charity) => (
            <div key={charity.slug}>
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
          ))}
      </div>
    </div>
  );
};

export default App;
