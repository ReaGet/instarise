import HomePage from './app/page';
import SignIn from './app/sign-in/page';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import { DASHBOARD, SIGNIN } from './consts';
import ErrorPage from './app/error-page';

const isAuth = false;

export const publicRoutes: RouteObject[] = [
  {
    path: SIGNIN,
    element: <SignIn />,
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // }
];

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute  isAuthenticated={isAuth} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: DASHBOARD,
        element: <HomePage />,
      }
    ],
  }
]

export const routes = [...privateRoutes, ...publicRoutes];