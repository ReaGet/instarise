import HomePage from './pages/page';
import SignIn from './pages/sign-in/page';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import { ACCOUNT, DASHBOARD, SIGNIN } from './consts';
import ErrorPage from './pages/error-page';
import AccountPage from './pages/account/page';
import Layout from './pages/account/layout';
import ActionsPage from './pages/account/page-actions';
import AutoReplyPage from './pages/account/page-auto-replay';
import ParsePage from './pages/account/page-parse';

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
      },
      {
        element: <Layout />,
        children: [
          {
            path: `${ACCOUNT}/:id`,
            element: <AccountPage />,
          },
          {
            path: `${ACCOUNT}/:id/auto-replay`,
            element: <AutoReplyPage />
          },
          {
            path: `${ACCOUNT}/:id/actions`,
            element: <ActionsPage />
          },
          {
            path: `${ACCOUNT}/:id/parse`,
            element: <ParsePage />
          },
        ]
      }
    ],
  }
]

export const routes = [...privateRoutes, ...publicRoutes];