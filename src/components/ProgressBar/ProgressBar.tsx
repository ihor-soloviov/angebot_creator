import React from "react";
import "./ProgressBar.scss";
import stepStore from "../../stores/step-store";


export const ProgressBar: React.FC = () => {
  const { getRangeValues } = stepStore;
  const [arrayOfStepsLength, stepCount] = getRangeValues();
  console.log(arrayOfStepsLength, stepCount)

  const progresSize = Math.round(100 * stepCount  / arrayOfStepsLength);

  return (
    <>
      <div className="progressBar__inner">
        <div className="progressBar" style={{ width: `${progresSize}%` }} />
      </div>
      <div className="progressBar__value">
        {stepCount}/{arrayOfStepsLength}
      </div>
    </>
  );
}
