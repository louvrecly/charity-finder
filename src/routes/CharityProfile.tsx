import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharityDetails } from '../models/Charity';
import { Tag, TagDetails } from '../models/Tag';
import { GetResponse } from '../models/EveryOrgResponse';
import ProfileTitle from '../components/ProfileTitle';
import LocationBlock from '../components/LocationBlock';
import TagsList from '../components/TagsList';

const { VITE_EVERY_ORG_API, VITE_API_KEY } = import.meta.env;

type CharityProfileParams = {
  charitySlug?: string;
};

const CharityProfile = () => {
  const [charity, setCharity] = useState<CharityDetails | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { charitySlug } = useParams<CharityProfileParams>();

  useEffect(() => {
    if (!charitySlug) return;

    setIsLoading(true);

    fetch(
      `${VITE_EVERY_ORG_API}/nonprofit/${charitySlug}?apiKey=${VITE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((response: GetResponse) => {
        const { data, message } = response;
        if (!data) return setErrorMessage(message ?? 'Data fetch error');

        setErrorMessage('');
        setCharity(data.nonprofit);

        setTags(
          data.nonprofitTags?.map((tag: TagDetails) => tag.tagName) || [],
        );
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [charitySlug]);

  return (
    <div>
      {isLoading
        ? 'Loading...'
        : errorMessage ||
          (charity && (
            <div>
              <img src={charity.coverImageUrl} alt={charity.name} />

              <a
                href={charity.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProfileTitle name={charity.name} logoUrl={charity.logoUrl} />
              </a>

              <LocationBlock
                location={charity.locationAddress}
                coordinates={charity.locationLatLng?.coordinates}
              />

              <p>{charity.descriptionLong || charity.description}</p>

              <TagsList tags={tags} />
            </div>
          ))}
    </div>
  );
};

export default CharityProfile;
