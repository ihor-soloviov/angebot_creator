import React from "react";
import "./TotalCost.scss";
import stepStore, { AppSteps } from "../../stores/step-store";

export const TotalCost: React.FC = () => {
  return (
    <div className="totalCost" onClick={() => stepStore.setStep(AppSteps.checkout)}>Общая стоимость</div>
  );
}
