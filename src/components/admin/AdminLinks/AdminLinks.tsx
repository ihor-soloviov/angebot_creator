import React from 'react';
import first from "../../../assets/admin/first.png"
import sec from "../../../assets/admin/sec.png"
import { AdminLink } from '../../../types/admin';
import { Link } from 'react-router-dom';
import { ButtonNext } from '../../Buttons/ButtonNext';
import "./AdminLinks.scss"

const links: Array<AdminLink> = [
  { pic: sec, title: "Поменять цены для будущих\n предложений", href: '/admin/prices' },
  { pic: first, title: "Посмотреть выиграш выбранного\n предложения", href: '/admin/table' }
]

const AdminLinks: React.FC = () => {
  return (
    <div className="adminPage__links">
      {links.map(({ pic, title, href }, index) => (
        <Link key={title} to={href} className="adminPage__link" >
          <img src={pic} alt="picture" className={`link-${index}`} />
          <p>{title}</p>
          <ButtonNext width={248} />
        </Link>
      ))}
    </div>
  )
}

export default AdminLinks
