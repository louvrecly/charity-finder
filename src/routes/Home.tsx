import { MouseEvent, useEffect, useState } from 'react';
import { Charity } from '../models/Charity';
import CharitiesList from '../components/CharitiesList';
import { Cause } from '../data/causes';

const { VITE_API_KEY } = import.meta.env;

interface HomeProps {
  causes: Cause[];
}

const Home = ({ causes = [] }: HomeProps) => {
  const [keyword, setKeyword] = useState('');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function searchByKeyword(cause: Cause) {
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
    const index = Math.floor(Math.random() * causes.length);
    const cause = causes[index];
    setIsLoading(true);

    searchByKeyword(cause)
      .then((result) => {
        setErrorMessage('');
        setCharities(result.nonprofits as Charity[]);
      })
      .catch((err) => setErrorMessage(err))
      .finally(() => setIsLoading(false));
  }, [causes]);

  return (
    <div>
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
          <CharitiesList charities={charities} />}
      </div>
    </div>
  );
};

export default Home;
