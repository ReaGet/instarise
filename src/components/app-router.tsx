import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/routes.tsx'

function AppRouter() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />
}

export default AppRouter