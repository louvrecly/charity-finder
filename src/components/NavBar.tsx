import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Cause } from '../data/causes';

interface NavBarProps {
  causes: Cause[];
}

const NavBar = ({ causes = [] }: NavBarProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <nav>
      <Link to="/">
        <h1>Charity Finder</h1>
      </Link>

      <div
        onMouseEnter={() => setIsMenuOpened(true)}
        onMouseLeave={() => setIsMenuOpened(false)}
      >
        Causes
        {isMenuOpened && (
          <div>
            {causes.map((cause) => (
              <li key={cause}>
                <NavLink to={`/?cause=${cause}`}>{cause}</NavLink>
              </li>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
