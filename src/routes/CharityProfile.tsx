import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharityDetails } from '../models/Charity';

const { VITE_API_KEY } = import.meta.env;

type CharityProfileParams = {
  charitySlug?: string;
};

const CharityProfile = () => {
  const [charity, setCharity] = useState<CharityDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { charitySlug } = useParams<CharityProfileParams>();

  async function getCharityBySlug(slug: string) {
    const res = await fetch(
      `https://partners.every.org/v0.2/nonprofit/${slug}?apiKey=${VITE_API_KEY}`,
    );
    return res.json();
  }

  useEffect(() => {
    if (!charitySlug) return;

    setIsLoading(true);

    getCharityBySlug(charitySlug)
      .then((result) => {
        const { data, message } = result;
        if (!data) return setErrorMessage(message);

        setErrorMessage('');
        setCharity(data.nonprofit as CharityDetails);
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [charitySlug]);

  console.log({ charitySlug });
  return (
    <div>
      {isLoading
        ? 'Loading...'
        : errorMessage ||
          (charity && (
            <div>
              <a
                href={charity.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <img src={charity.logoUrl} alt={charity.name} />
                  <h2>{charity.name}</h2>
                </div>
              </a>

              <div>{charity.locationAddress}</div>

              <p>{charity.descriptionLong}</p>
            </div>
          ))}
    </div>
  );
};

export default CharityProfile;
