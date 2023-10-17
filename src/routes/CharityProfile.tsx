import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CharityDetails } from '../models/Charity';
import { Tag, TagDetails } from '../models/Tag';
import ProfileTitle from '../components/ProfileTitle';
import LocationBlock from '../components/LocationBlock';
import TagsList from '../components/TagsList';

const { VITE_API_KEY } = import.meta.env;

type CharityProfileParams = {
  charitySlug?: string;
};

const CharityProfile = () => {
  const [charity, setCharity] = useState<CharityDetails | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
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
      .then((response) => {
        const { data, message } = response;
        if (!data) return setErrorMessage(message);

        setErrorMessage('');
        setCharity(data.nonprofit as CharityDetails);

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
