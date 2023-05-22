import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Author from "./pages/Author";
import AuthorDetail from "./pages/AuthorDetail";
import EditAuthor from "./pages/EditAuthor";
import AddAuthor from "./pages/AddAuthor";
import MainRoot from "./pages/MainRoot";
import { AuthorContextProvider } from "./context/AuthorContext";

export const ROUTES = [
  {
    path: '/',
    element: <MainRoot/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/authors',
        element: <Author/>
      },
      {
        path: '/authors/:id',
        element: <AuthorDetail/>
      },
      {
        path: '/authors/add',
        element: <AddAuthor/>
      },
      {
        path: '/authors/edit/:id',
        element: <EditAuthor/>
      }
    ]
  }
];

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
     <AuthorContextProvider>
      <RouterProvider router={routes}/>
     </AuthorContextProvider>
    </>
  );
}

export default App;


