import React from "react";
import arrBack from "../../assets/arrBack.svg"
import "./ButtonPrev.scss";
import stepStore from "../../stores/step-store";

export const ButtonPrev: React.FC = () => {
  return (
    <div onClick={() => stepStore.setStep(2)} className="buttonPrev">
      <p>Назад</p>
      <img src={arrBack} alt="arr back" />
    </div>
  );
}
