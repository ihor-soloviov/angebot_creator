import React from "react";
import arrBack from "../../assets/arrBack.svg"
import "./ButtonPrev.scss";
import stepStore from "../../stores/step-store";

export const ButtonPrev: React.FC = () => {
  const { setStep, generatePrevStep } = stepStore;

  const handler = () => {
    const prevStep = generatePrevStep();
    if (prevStep === null) {
      return;
    }
    setStep(prevStep)
  }
  return (
    <div onClick={handler} className="buttonPrev">
      <p>Назад</p>
      <img src={arrBack} alt="arr back" />
    </div>
  );
}
