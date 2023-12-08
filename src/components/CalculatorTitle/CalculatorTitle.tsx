import React from "react";
import "./CalculatorTitle.scss";
import { Title } from "../Calculator/calculator-types";

interface Props {
  title: Title
  fontFamily?: string
}

export const CalculatorTitle: React.FC<Props> = ({ title, fontFamily }) => {
  const { blackTitle, greyTitle } = title;

  return (
    <div className="calculator__title">
      <h3 style={fontFamily && { fontFamily: fontFamily }}>{blackTitle}</h3>
      <p>{greyTitle}</p>
    </div>
  );
}
