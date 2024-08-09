import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/routes.tsx'
import AuthGuard from '@/app/features/user/auth-guard'
// import { Suspense } from 'react'
// import Loader from './loader'

function AppRouter() {
  const router = createBrowserRouter(routes);
  return (
    <AuthGuard>
      {/* <Suspense fallback={<Loader />}> */}
        <RouterProvider router={router} />
      {/* </Suspense> */}
    </AuthGuard>
  )
}

export default AppRouter