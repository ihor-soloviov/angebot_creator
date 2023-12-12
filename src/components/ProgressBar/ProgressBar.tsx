import React, { useEffect, useState } from "react";
import "./ProgressBar.scss";
import stepStore from "../../stores/step-store";


export const ProgressBar: React.FC = () => {
  const { calculatorSteps, getCurrectRangeIndex } = stepStore;
  const [currentRangeIndex, setCurrentRangeIndex] = useState(1);


  useEffect(() => {
    setCurrentRangeIndex(getCurrectRangeIndex());
  }, [getCurrectRangeIndex])


  const progresSize = Math.round(100 * currentRangeIndex / calculatorSteps);

  return (
    <>
      <div className="progressBar__inner">
        <div className="progressBar" style={{ width: `${progresSize}%` }} />
      </div>
      <div className="progressBar__value">
        {currentRangeIndex}/{calculatorSteps}
      </div>
    </>
  );
}
