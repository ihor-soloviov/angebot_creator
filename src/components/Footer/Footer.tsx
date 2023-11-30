import React from "react";
import { ButtonPrev } from "../ButtonPrev";
import { TotalCost } from "../TotalCost";
import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__inner">
        <ButtonPrev />
        <TotalCost />
      </div>
    </div>
  );
}
