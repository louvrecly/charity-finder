import { Link } from 'react-router-dom';
import { Cause } from '../models/Cause';

interface CausePillProps {
  cause: Cause;
}

const CausePill = ({ cause }: CausePillProps) => {
  return (
    <li className="u-text-start">
      <Link to={`/?cause=${cause}`}>{cause}</Link>
    </li>
  );
};

export default CausePill;
