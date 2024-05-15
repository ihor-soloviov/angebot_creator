import { Header } from "../../components/Header";
import AdminLinks from "../../components/admin/AdminLinks/AdminLinks";
import './Admin.scss';

const AdminPage = () => {

  return (
    <>
      <Header />
      <div className="adminPage">
        <AdminLinks />
      </div>
    </>
  )
}

export default AdminPage
