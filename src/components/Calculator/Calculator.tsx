import React from "react";
import { ProgressBar } from "../ProgressBar";
import { SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";

interface Props {
  title: Title
  singleServices: SingleService[]
}

export const Calculator: React.FC<Props> = ({ title, singleServices }) => {
  const { blackTitle, greyTitle } = title;

  return (
    <div className="calculator">
      <div className="calculator__container">
        <div className="calculator__title">
          <h3>{blackTitle}</h3>
          <p>{greyTitle}</p>
        </div>
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        <div className="calculatorService__container">
          {singleServices.map(service => (
            <SingleServiceItem service={service} />
          )
          )}
        </div>
      </div>
    </div>
  );
}
