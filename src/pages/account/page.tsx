import { useParams } from "react-router-dom"

const AccountPage = () => {
  const { id } = useParams();
  return (
    <div>AccountPage {id}</div>
  )
}

export default AccountPage