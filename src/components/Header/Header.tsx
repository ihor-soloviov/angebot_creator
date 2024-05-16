import React from "react";
import "./Header.scss";
import NavBarLink from "./NavBarLink/NavBarLink";

const headerLinks = [
  { href: "/", title: "Angebot Creator" },
  { href: "/calculator", title: "Калькулятор" },
  { href: "/admin", title: "Admin Panel" }
]

export const Header: React.FC = React.memo(
  () => (
    <div className="header">
      {headerLinks.map(({ href, title }) => <NavBarLink href={href} title={title} />)}
    </div>
  )
)
