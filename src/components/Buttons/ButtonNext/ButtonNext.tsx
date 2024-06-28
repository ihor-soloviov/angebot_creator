import React, { useCallback } from "react";
import arrButton from "../../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";
import stepStore from "../../../stores/step-store";
import { observer } from "mobx-react-lite";

interface Props {
  isDisabled?: boolean
  width?: number
  storageSetter?: () => void
  adminOnClick?: () => void
}


export const ButtonNext: React.FC<Props> = observer(({ isDisabled, width, storageSetter, adminOnClick }) => {
  const { setStep, generateNextStep } = stepStore;

  const handler = useCallback(
    () => {
      const nextStep = generateNextStep()
      if (adminOnClick) {
        adminOnClick();
        return
      }

      if (nextStep === null) {
        return;
      }

      if (storageSetter) {
        storageSetter()
      }

      setStep(nextStep)
    },
    [adminOnClick, generateNextStep, setStep, storageSetter],
  )



  return (
    <button
      style={{ width: width, position: "relative", marginTop: 54 }}
      onClick={handler}
      className={classNames("buttonNext", { "disabled": isDisabled })}
    >
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
})
