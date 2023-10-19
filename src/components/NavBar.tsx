import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cause } from '../models/Cause';
import CausesList from './CausesList';

interface NavBarProps {
  causes: Cause[];
}

const NavBar = ({ causes = [] }: NavBarProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <nav className="u-relative u-py-2 u-px-8 u-bg-zinc-950/70 u-flex u-justify-between u-items-center u-flex-wrap u-gap-2">
      <Link to="/">
        <h1 className="u-text-2xl">Charity Finder</h1>
      </Link>

      <button
        className="u-py-1 u-bg-blue-900 sm:u-relative hover:u-bg-blue-800"
        onMouseEnter={() => setIsMenuOpened(true)}
        onMouseLeave={() => setIsMenuOpened(false)}
      >
        Causes
        {isMenuOpened && (
          <div className="u-absolute u-top-full u-right-0 u-max-h-96 u-bg-zinc-950/70 u-rounded-b-xl u-overflow-auto sm:u-rounded-xl">
            <CausesList causes={causes} />
          </div>
        )}
      </button>
    </nav>
  );
};

export default NavBar;
