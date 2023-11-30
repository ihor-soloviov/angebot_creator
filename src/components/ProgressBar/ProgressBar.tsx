import React from "react";
import "./ProgressBar.scss";

interface Props {
  stepCount?: number
  calculatorStep?: number
}

export const ProgressBar: React.FC<Props> = ({ stepCount = 10, calculatorStep = 5 }) => {
  const progresSize = Math.round(100 * calculatorStep / stepCount);

  return (
    <>
      <div className="progressBar__inner">
        <div className="progressBar" style={{ width: `${progresSize}%` }} />
      </div>
      <div className="progressBar__value">
        {calculatorStep}/{stepCount}
      </div>
    </>
  );
}
