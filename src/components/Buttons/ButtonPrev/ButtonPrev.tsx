import React from "react";
import arrBack from "../../../assets/arrBack.svg"
import "./ButtonPrev.scss";
import stepStore from "../../../stores/step-store";

interface Props {
  isCalculator?: boolean
  adminOnClick?: () => void
}

export const ButtonPrev: React.FC<Props> = ({ adminOnClick }) => {
  const { setStep, generatePrevStep } = stepStore;

  const handler = () => {
    if (adminOnClick) {
      adminOnClick();
      return
    }

    const prevStep = generatePrevStep();
    if (prevStep === null) {
      return;
    }

    setStep(prevStep)
  }
  
  return (
    <button onClick={handler} className="buttonPrev">
      <p>Назад</p>
      <img src={arrBack} alt="arr back" />
    </button>
  );
}
