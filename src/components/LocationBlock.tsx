interface LocationBlockProps {
  location: string;
  coordinates?: [number, number];
}

const LocationBlock = ({ location, coordinates }: LocationBlockProps) => {
  const query = coordinates
    ? `${coordinates[1]},${coordinates[0]}`
    : encodeURIComponent(location).replace(/%20/g, '+');
  const locationLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <p>
      Location:{' '}
      <a href={locationLink} target="_blank" rel="noopener noreferrer">
        {location}
      </a>
    </p>
  );
};

export default LocationBlock;
