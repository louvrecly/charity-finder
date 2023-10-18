import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cause } from '../models/Cause';

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
                <Link to={`/?cause=${cause}`}>{cause}</Link>
              </li>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
