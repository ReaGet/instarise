import { useParams } from "react-router-dom"
import Layout from "./layout"

const AccountPage = () => {
  const { id } = useParams();
  return (
    <div>AccountPage {id}</div>
  )
}

export default AccountPage