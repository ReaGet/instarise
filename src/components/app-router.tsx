import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/routes.tsx'
import AuthGuard from '@/app/features/user/auth-guard';

function AppRouter() {
  const router = createBrowserRouter(routes);
  return (
    <AuthGuard>
      <RouterProvider router={router} />
    </AuthGuard>
  )
}

export default AppRouter