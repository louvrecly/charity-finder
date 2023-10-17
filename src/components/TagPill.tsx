import { Link } from 'react-router-dom';
import { Tag } from '../models/Tag';

interface TagPillProps {
  tag: Tag;
}

const TagPill = ({ tag }: TagPillProps) => {
  return (
    <li>
      <Link to={`/?cause=${tag}`}>{tag}</Link>
    </li>
  );
};

export default TagPill;
