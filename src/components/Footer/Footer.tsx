import React from "react";
import { ButtonPrev } from "../ButtonPrev";
import { TotalCost } from "../TotalCost";
import "./Footer.scss";

interface Props {
  isCalculator?: boolean
}

export const Footer: React.FC<Props> = ({ isCalculator }) => {
  return (
    <div className="footer">
      <div className="footer__inner">
        <ButtonPrev isCalculator={isCalculator} />
        <TotalCost />
      </div>
    </div>
  );
}
