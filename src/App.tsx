import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './routes/Home';
import CharityProfile from './routes/CharityProfile';
import { ALL_CAUSES } from './models/Cause';

const causes = [...ALL_CAUSES];

const App = () => (
  <BrowserRouter>
    <NavBar causes={causes} />

    <Routes>
      <Route path="/" element={<Home causes={causes} />} />

      <Route path="/charity/:charitySlug" element={<CharityProfile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
