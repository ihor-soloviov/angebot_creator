import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import first from "../../assets/admin/first.png"
import sec from "../../assets/admin/sec.png"
import './Admin.scss';
import { AdminLink } from "../../types/admin";
import { ButtonNext } from "../../components/ButtonNext";

const links: Array<AdminLink> = [
  { pic: sec, title: "Поменять цены для будущих\n предложений", href: '/admin/prices' },
  { pic: first, title: "Посмотреть выиграш выбранного\n предложения", href: '/admin/table' }
]

const AdminPage = () => {
  return (
    <>
      <Header />
      <div className="adminPage">
        <div className="adminPage__links">
          {links.map(({ pic, title, href }, index) => (
            <Link to={href} className="adminPage__link" >
              <img src={pic} alt="picture" className={`link-${index}`} />
              <p>{title}</p>
              <ButtonNext width={248} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminPage
