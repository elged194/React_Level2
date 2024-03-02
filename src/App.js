import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ErrorPage from './pages/ErrorPage';
// ---------------------------------------------------------------------
import { useContext } from "react";
import ThemeContext from "./comp/darkMode";
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
  },

  {
    path: "/About",
    element: <About />,
  },

  {
    path: "/signIn",
    element: <SignIn />,
  },

  {
    path: "/signUp",
    element: <SignUp />,
  },

  {
    path: "/Profile",
    element: <Profile />,
  },
]);
// ---------------------------------------------------------------------

function App() {
  const { mode } = useContext(ThemeContext)
  return (
    <div className={`App ${mode}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
