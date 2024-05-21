import { Link, useNavigate } from "react-router-dom"
import { Header } from "../../../components/Header"
import "./AdminCheckout.scss"
import { ButtonPrev } from "../../../components/Buttons/ButtonPrev"
import { partitions } from "../../../imports"

const AdminCheckout = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Header />
      <div className="adminPage__checkout">
        <div className="checkoutWrapper">
          <h1>Выберите раздел</h1>
          <div className="checkoutItems">
            {partitions.map(({ title, href, className }, index) => (
              <Link className={className} to={`/admin/prices/${href}`} key={title} >
                {index + 1}. {title}
              </Link>
            ))}
          </div>
          <ButtonPrev adminOnClick={handleBackClick} />
        </div>
      </div>
    </>
  )
}

export default AdminCheckout
