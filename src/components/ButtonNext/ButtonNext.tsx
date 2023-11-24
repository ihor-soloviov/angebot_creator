import React from "react";
import arrButton from "../../assets/arrowButton.svg"
import "./ButtonNext.scss";


export const ButtonNext: React.FC = () => {
  return (
    <button className="buttonNext">
      Далее
      <img src={arrButton} alt="butt" />
    </button>
  );
}
