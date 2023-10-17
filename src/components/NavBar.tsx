import { useState } from 'react';
import { Cause } from '../data/causes';

interface NavBarProps {
  causes: Cause[];
}

const NavBar = ({ causes = [] }: NavBarProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <nav>
      <h1>Charity Finder</h1>

      <div onMouseEnter={() => setIsMenuOpened(true)} onMouseLeave={() => setIsMenuOpened(false)}>
        Causes
        {isMenuOpened && (
          <div>
            {causes.map(cause => <li key={cause}>{cause}</li>)}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
