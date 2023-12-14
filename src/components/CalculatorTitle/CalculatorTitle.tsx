import React from "react";
import "./CalculatorTitle.scss";
import { Title } from "../Calculator/calculator-types";

interface Props {
  title?: Title
}

export const CalculatorTitle: React.FC<Props> = ({ title }) => {

  let blackTitle;
  let greyTitle;

  if (title) {
    blackTitle = title.blackTitle;
    greyTitle = title.greyTitle
  }

  return (
    <div className="calculator__title">
      <h3>{blackTitle}</h3>
      <p>{greyTitle}</p>
    </div>
  );
}
