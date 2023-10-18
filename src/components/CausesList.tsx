import { Cause } from '../models/Cause';
import CausePill from './CausePill';

interface CausesListProps {
  causes?: Cause[];
}
const CausesList = ({ causes = [] }: CausesListProps) => {
  if (!causes.length) return null;

  return (
    <ul>
      {causes.map((cause) => (
        <CausePill key={cause} cause={cause} />
      ))}
    </ul>
  );
};

export default CausesList;
