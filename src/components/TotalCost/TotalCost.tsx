import React from "react";
import "./TotalCost.scss";
import stepStore, { Steps } from "../../stores/step-store";

export const TotalCost: React.FC = () => {
  return (
    <div className="totalCost" onClick={() => stepStore.setStep(Steps.checkout)}>Общая стоимость</div>
  );
}
