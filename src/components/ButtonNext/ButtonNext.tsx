import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";
import stepStore from "../../stores/step-store";

interface Props {
  isDisabled?: boolean
  nextStep?: number
}


export const ButtonNext: React.FC<Props> = ({ isDisabled, nextStep }) => {
  const handler = () => {
    nextStep && stepStore.setStep(nextStep)
  }
  return (
    <button onClick={handler} className={classNames("buttonNext", { "disabled": isDisabled })} disabled={isDisabled}>
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
