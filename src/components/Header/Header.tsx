import React from "react";
import "./Header.scss";
import roleStore from "../../stores/role-store";
import stepStore from "../../stores/step-store";
import classNames from "classnames";

export const Header: React.FC = () => {
  const { role } = roleStore;
  const { step } = stepStore;

  return (
    <div className="header">
      <div className={classNames("header__item", { active: step < 5 })}>Angebot Creater</div>
      <div className={classNames("header__item", { active: step >= 5 })}>Калькулятор</div>
      {role === 'admin' && <div className="header__item">Admin Panel</div>}
    </div>
  );
}
