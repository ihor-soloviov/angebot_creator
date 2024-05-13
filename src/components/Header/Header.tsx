import React from "react";
import "./Header.scss";
import roleStore from "../../stores/role-store";
import stepStore from "../../stores/step-store";
import classNames from "classnames";
import producerStore from "../../stores/producer-store";
import { Link } from "react-router-dom";

export const Header: React.FC = React.memo(
  () => {
    const { role } = roleStore;
    const { step, arraysOfSteps } = stepStore;
    const { producer } = producerStore;

    const getStepIndex = () => {
      const currentStepIndex = arraysOfSteps[producer].findIndex(
        (el, index) => el === step && index > 0
      );

      return currentStepIndex
    }

    return (
      <div className="header">
        <div className={classNames("header__item", { active: getStepIndex() < 5 })}>Angebot Creater</div>
        <div className={classNames("header__item", { active: getStepIndex() >= 5 })}>Калькулятор</div>
        {role === 'admin' && <Link to="/admin" className="header__item">Admin Panel</Link>}
      </div>
    );
  }
)
