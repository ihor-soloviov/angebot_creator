import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";
import stepStore from "../../stores/step-store";

interface Props {
  isDisabled?: boolean
  nextStep?: number
  width?: number
}


export const ButtonNext: React.FC<Props> = ({ isDisabled, nextStep, width }) => {
  const handler = () => {
    nextStep && stepStore.setStep(nextStep)
  }
  return (
    <button style={{width: width, position: "relative", marginTop: 54}} onClick={handler} className={classNames("buttonNext", { "disabled": isDisabled })} disabled={isDisabled}>
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
