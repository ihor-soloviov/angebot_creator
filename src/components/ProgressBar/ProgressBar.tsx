import React from "react";
import "./ProgressBar.scss";
import stepStore from "../../stores/step-store";


export const ProgressBar: React.FC = () => {
  const { calculatorSteps, calculatorStep } = stepStore;

  const progresSize = Math.round(100 * calculatorStep / calculatorSteps);

  return (
    <>
      <div className="progressBar__inner">
        <div className="progressBar" style={{ width: `${progresSize}%` }} />
      </div>
      <div className="progressBar__value">
        {calculatorStep}/{calculatorSteps}
      </div>
    </>
  );
}
