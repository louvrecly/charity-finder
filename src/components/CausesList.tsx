import { Cause } from '../models/Cause';
import CausePill from './CausePill';

interface CausesListProps {
  causes?: Cause[];
}
const CausesList = ({ causes = [] }: CausesListProps) => {
  if (!causes.length) return null;

  return (
    <ul className="u-py-2 u-px-8 u-w-full u-flex u-flex-col u-items-start u-gap-2">
      {causes.map((cause) => (
        <CausePill key={cause} cause={cause} />
      ))}
    </ul>
  );
};

export default CausesList;
