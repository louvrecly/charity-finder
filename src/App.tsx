import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import NavBar from './components/NavBar';
import { ALL_CAUSES } from './data/causes';

const causes = [...ALL_CAUSES];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home causes={causes} />,
  }
]);

const App = () => (
  <div>
    <NavBar causes={causes} />

    <RouterProvider router={router} />
  </div>
);

export default App;
