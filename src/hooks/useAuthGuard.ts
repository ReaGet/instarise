import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/app/features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BASE_URL } from "@/consts"

export const useAuthGuard = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(BASE_URL)
    }
  }, [])
}