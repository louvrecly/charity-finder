interface ProfileTitleProps {
  name: string;
  logoUrl?: string;
}

const ProfileTitle = ({ name, logoUrl }: ProfileTitleProps) => {
  return (
    <h2>
      <img src={logoUrl ?? 'https://every.org/favicon-32x32.png'} alt={name} />
      <span>{name}</span>
    </h2>
  );
};

export default ProfileTitle;
