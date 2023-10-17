import { Tag } from '../models/Tag';
import TagPill from './TagPill';

interface TagsListProps {
  tags?: Tag[];
}
const TagsList = ({ tags = [] }: TagsListProps) => {
  if (!tags.length) return null;

  return (
    <ul>
      {tags.map((tag) => (
        <TagPill key={tag} tag={tag} />
      ))}
    </ul>
  );
};

export default TagsList;
