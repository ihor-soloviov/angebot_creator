import React from "react";
import "./CalculatorTitle.scss";
import { Title } from "../calculator-types";

interface Props {
  header?: Title
  className?: string
}

export const CalculatorTitle: React.FC<Props> = ({ header, className }) => {

  if (header) {
    const { title, description } = header

    return (
      <div className={`calculator__title ${className}`}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}
