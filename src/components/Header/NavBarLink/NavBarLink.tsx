import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  href: string,
  title: string
}

const NavBarLink: React.FC<Props> = ({ href, title }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames("header__item", { active: isActive })
      }
    >
      {title}
    </NavLink>
  )
}

export default NavBarLink
