import React from "react";
import arr from "../../assets/selectArr.svg";
import "./CustomSelect.scss";

export const CustomSelect: React.FC = () => {
  const selectValue = 
  return (
    <div className="customSelect__inner">
      <div className="customSelect">
        <p>Выберете тип предложения</p>
        <img src={arr} alt="arrow" />
      </div>
      <div className="customSelect__dropdown">
        <p>Vorläufiges Angebot</p>
        <p>Wirtschaftsanalyse</p>
      </div>
    </div>
  );
}
