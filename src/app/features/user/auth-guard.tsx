import { useMeQuery } from "@/app/services/userApi";
import Loader from "@/components/loader";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useMeQuery();

  if (isLoading) {
    return <Loader />
  }

  return children;
}

export default AuthGuard