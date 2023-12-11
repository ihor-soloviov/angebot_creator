import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";
import stepStore from "../../stores/step-store";

interface Props {
  isDisabled?: boolean
  width?: number
  isCalculator?: boolean
}


export const ButtonNext: React.FC<Props> = ({ isDisabled, width, isCalculator }) => {
  const { setStep, generateNextStep, setCalculatorStepNext } = stepStore;

  const handler = () => {
    const nextStep = generateNextStep();
    if (nextStep === null) {
      return;
    }

    isCalculator && setCalculatorStepNext()

    setStep(nextStep)
  }
  return (
    <button style={{ width: width, position: "relative", marginTop: 54 }} onClick={handler} className={classNames("buttonNext", { "disabled": isDisabled })} disabled={isDisabled}>
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
