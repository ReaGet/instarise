import HomePage from '@/pages/page'
import SignIn from '@/pages/sign-in/page'
import type { RouteObject } from 'react-router-dom'
import { ACCOUNT, DASHBOARD, SIGNIN } from '@/consts'
import ErrorPage from '@/pages/error-page'
import AccountLayout from '@/pages/account/layout'
import MainLayout from '@/pages/layout'
// import { lazy } from 'react'
import AccountPage from '@/pages/account/page';
import ActionsPage from '@/pages/account/page-actions';
import AutoReplyPage from '@/pages/account/page-auto-replay';
import ParsePage from '@/pages/account/parse/page';
import ParseResultsPage from '@/pages/account/parse/page-results';

// const AccountPage = lazy(() => import('@/pages/account/page'))
// const ActionsPage = lazy(() => import('@/pages/account/page-actions'))
// const AutoReplyPage = lazy(() => import('@/pages/account/page-auto-replay'))
// const ParsePage = lazy(() => import('@/pages/account/parse/page'))
// const ParseResultsPage = lazy(() => import('@/pages/account/parse/page-results'))


export const routes: RouteObject[] = [
  {
    path: SIGNIN,
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: DASHBOARD,
        element: <HomePage />,
      },
      {
        element: <AccountLayout />,
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
          {
            path: `${ACCOUNT}/:id/parse/results`,
            element: <ParseResultsPage />
          },
        ]
      }
    ],
  }
]