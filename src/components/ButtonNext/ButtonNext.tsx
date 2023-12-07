import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";
import stepStore, { Steps } from "../../stores/step-store";

interface Props {
  isDisabled?: boolean
  width?: number
  nextStep: Steps
}


export const ButtonNext: React.FC<Props> = ({ isDisabled, width, nextStep }) => {
  const { setStep } = stepStore;
  
  const handler = () => {
    setStep(nextStep)
  }
  return (
    <button style={{ width: width, position: "relative", marginTop: 54 }} onClick={handler} className={classNames("buttonNext", { "disabled": isDisabled })} disabled={isDisabled}>
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
