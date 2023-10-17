import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import CharitiesList from '../components/CharitiesList';
import { Cause } from '../data/causes';

const { VITE_API_KEY } = import.meta.env;

interface HomeProps {
  causes: Cause[];
}

const Home = ({ causes = [] }: HomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cause, setCause] = useState<Cause | ''>('');
  const [keyword, setKeyword] = useState('');
  const [charities, setCharities] = useState<CharityOverview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function getCharitiesByCause(cause: Cause) {
    const res = await fetch(
      `https://partners.every.org/v0.2/search/${cause}?apiKey=${VITE_API_KEY}`,
    );
    return res.json();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setKeyword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchParams.set('cause', keyword);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const causeQueryValue =
      searchParams.get('cause')?.toLowerCase().trim() ?? '';

    if (!causeQueryValue) {
      const index = Math.floor(Math.random() * causes.length);
      return setCause(causes[index]);
    }

    if (!causes.includes(causeQueryValue as Cause)) {
      return setCharities([]);
    }

    setCause(causeQueryValue as Cause);
  }, [causes, searchParams]);

  useEffect(() => {
    if (!cause) return;

    setIsLoading(true);
    setKeyword(cause);
    getCharitiesByCause(cause)
      .then((response) => {
        setErrorMessage('');
        setCharities((response.nonprofits as CharityOverview[]) ?? []);
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [cause]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input a cause here"
          value={keyword}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
      </form>

      <p>{keyword}</p>

      <div>
        {isLoading
          ? 'Loading...'
          : errorMessage ||
            (charities.length ? (
              <CharitiesList charities={charities} />
            ) : (
              'No matching responses found'
            ))}
      </div>
    </div>
  );
};

export default Home;
