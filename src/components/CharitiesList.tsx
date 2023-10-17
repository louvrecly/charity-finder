import { Charity } from "../models/Charity";
import CharityTile from "./CharityTile";

interface CharitiesListProps {
  charities: Charity[];
}

const CharitiesList = ({ charities }: CharitiesListProps) => {
  return charities.map((charity) => <CharityTile key={charity.slug} charity={charity} />);
}

export default CharitiesList;
