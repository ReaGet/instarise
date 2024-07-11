import HomePage from './app/page';
import SignIn from './app/sign-in/page';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import { DASHBOARD, SIGNIN } from './consts';
import ErrorPage from './app/error-page';

const isAuth = true;

export const publicRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute  condition={!isAuth} redirect={DASHBOARD} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: SIGNIN,
        element: <SignIn />,
        errorElement: <ErrorPage />,
      }
    ]
  },
];

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute  condition={isAuth} />,
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