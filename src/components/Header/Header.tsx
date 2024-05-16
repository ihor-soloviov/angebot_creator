import React from "react";
import "./Header.scss";
import NavBarLink from "./NavBarLink/NavBarLink";

const headerLinks = [
  { href: "/angebotCreator", title: "Angebot Creator" },
  { href: "/calculator", title: "Калькулятор" },
  { href: "/admin", title: "Admin Panel" }
]

export const Header: React.FC = React.memo(
  () => (
    <div className="header">
      {
        headerLinks.map(
          ({ href, title }) =>
            <React.Fragment key={title}>
              <NavBarLink href={href} title={title} />
            </React.Fragment>
        )
      }
    </div>
  )
)
