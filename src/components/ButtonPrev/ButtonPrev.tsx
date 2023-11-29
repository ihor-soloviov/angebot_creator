import React from "react";
import arrBack from "../../assets/arrBack.svg"
import "./ButtonPrev.scss";
import stepStore from "../../stores/step-store";

export const ButtonPrev: React.FC = () => {
  const { step, setStep } = stepStore;
  return (
    <div onClick={() => setStep((step - 1))} className="buttonPrev">
      <p>Назад</p>
      <img src={arrBack} alt="arr back" />
    </div>
  );
}
