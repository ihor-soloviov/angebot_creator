import React from "react";
import "./Header.scss";
import roleStore from "../../stores/role-store";
import stepStore from "../../stores/step-store";
import classNames from "classnames";
import producerStore from "../../stores/producer-store";

export const Header: React.FC = () => {
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
      {role === 'admin' && <div className="header__item">Admin Panel</div>}
    </div>
  );
}
