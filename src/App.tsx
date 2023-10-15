import { MouseEvent, useEffect, useState } from 'react';
import { ALL_CAUSES } from './data/causes';

const { VITE_API_KEY } = import.meta.env;

interface NonProfit {
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
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([]);
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
        setNonProfits(result.nonprofits as NonProfit[]);
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
            nonProfits.map((nonProfit) => (
              <div key={nonProfit.slug}>
                <a href={nonProfit.profileUrl}>
                  <h2>
                    <img src={nonProfit.logoUrl} alt={nonProfit.name} />
                    <span>{nonProfit.name}</span>
                  </h2>
                </a>

                <p>
                  Location:{' '}
                  <a
                    href={`https://www.google.com/maps/search/${(
                      nonProfit.location ?? ''
                    ).replace(/\s/g, '+')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {nonProfit.location}
                  </a>
                </p>

                <p>{nonProfit.description}</p>

                <ul>
                  {nonProfit.tags &&
                    nonProfit.tags.map((tag) => (
                      <li key={`${nonProfit.slug}-${tag}`}>{tag}</li>
                    ))}
                </ul>
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
