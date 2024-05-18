import React from "react";
import "./CalculatorTitle.scss";
import { Title } from "../Calculator/calculator-types";

interface Props {
  header?: Title
}

export const CalculatorTitle: React.FC<Props> = ({ header }) => {

  if (header) {
    const { title, description } = header

    return (
      <div className="calculator__title">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}
