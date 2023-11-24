import React from "react";
import "./Header.scss";
import roleStore from "../../stores/role-store";

export const Header: React.FC = () => {
  const { role } = roleStore;

  return (
    <div className="header">
      <div className="header__item active">Angebot Creater</div>
      <div className="header__item">Калькулятор</div>
      {role === 'admin' && <div className="header__item">Admin Panel</div>}
    </div>
  );
}
