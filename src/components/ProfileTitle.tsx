interface ProfileTitleProps {
  name: string;
  logoUrl?: string;
}

const ProfileTitle = ({ name, logoUrl }: ProfileTitleProps) => {
  return (
    <h2 className="u-flex u-gap-4 u-items-center">
      <img
        className="u-w-8 u-h-auto"
        src={logoUrl ?? 'https://every.org/favicon-32x32.png'}
        alt={name}
      />
      <span>{name}</span>
    </h2>
  );
};

export default ProfileTitle;
