import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";
import classNames from "classnames";

interface Props {
  isDisabled?: boolean
}


export const ButtonNext: React.FC<Props> = ({ isDisabled }) => {
  return (
    <button className={classNames("buttonNext", {"disabled": isDisabled})} disabled={isDisabled}>
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
