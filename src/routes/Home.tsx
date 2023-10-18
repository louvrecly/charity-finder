import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import { SearchResponse } from '../models/EveryOrgResponse';
import CharitiesList from '../components/CharitiesList';
import TagsList from '../components/TagsList';
import { Cause } from '../data/causes';

const { VITE_EVERY_ORG_API, VITE_API_KEY } = import.meta.env;

interface HomeProps {
  causes: Cause[];
}

const Home = ({ causes = [] }: HomeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cause, setCause] = useState<Cause | ''>('');
  const [keyword, setKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [matchingCauses, setMatchingCauses] = useState<Cause[]>([]);
  const [charities, setCharities] = useState<CharityOverview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const sanitizedKeyword = value.toLowerCase().trim();
    const matchingCausesWithKeyword = sanitizedKeyword
      ? causes.filter((cause) => cause.includes(sanitizedKeyword))
      : [];

    setKeyword(value);
    setMatchingCauses(matchingCausesWithKeyword);
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

    setKeyword(causeQueryValue);
    setCause(causeQueryValue as Cause);
  }, [causes, searchParams]);

  useEffect(() => {
    if (!cause) return;

    setIsLoading(true);

    fetch(`${VITE_EVERY_ORG_API}/search/${cause}?apiKey=${VITE_API_KEY}`)
      .then((res) => res.json())
      .then((response: SearchResponse) => {
        setErrorMessage('');
        setCharities(response.nonprofits);
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
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onChange={handleChange}
        />

        {showSuggestions && (
          <div>
            {matchingCauses.length ? (
              <TagsList tags={matchingCauses} />
            ) : (
              'No matching causes'
            )}
          </div>
        )}

        <button type="submit">Search</button>
      </form>

      <p>{keyword}</p>

      <div>
        {isLoading
          ? 'Loading...'
          : errorMessage || (
              <CharitiesList
                charities={charities}
                fallbackMessage={`No matching results found for the keyword "${keyword}"`}
              />
            )}
      </div>
    </div>
  );
};

export default Home;
