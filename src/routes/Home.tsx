import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CharityOverview } from '../models/Charity';
import { SearchResponse } from '../models/EveryOrgResponse';
import CharitiesList from '../components/CharitiesList';
import { Cause } from '../models/Cause';

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

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
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
    <div className="u-py-2 u-px-8">
      <form className="u-mb-2 u-flex u-items-stretch" onSubmit={handleSubmit}>
        <div className="u-relative u-flex-1">
          <input
            className="u-py-1 u-px-4 u-w-full u-h-full u-rounded-l-full"
            type="text"
            placeholder="Input a cause here"
            value={keyword}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          {showSuggestions && (
            <div className="u-py-2 u-px-8 u-absolute u-top-full u-left-4 u-right-0 u-bg-zinc-950/70 u-rounded-b-xl">
              {matchingCauses.length
                ? matchingCauses.map((cause) => (
                    <div
                      className="u-cursor-pointer"
                      key={cause}
                      onClick={() => setKeyword(cause)}
                    >
                      {cause}
                    </div>
                  ))
                : keyword.length
                ? 'No matching causes'
                : 'Try typing something'}
            </div>
          )}
        </div>

        <button
          className="u-py-1 u-bg-blue-900 u-rounded-l-none u-rounded-r-full hover:u-bg-blue-800"
          type="submit"
        >
          Search
        </button>
      </form>

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
