import React from "react";
import { ProgressBar } from "../ProgressBar";
import { SelectServices, SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";
import { CalculatorTitle } from "../CalculatorTitle";

interface Props {
  title: Title
  singleServices: SingleService[]
  selectServices: SelectServices[]
}

export const Calculator: React.FC<Props> = ({ title, singleServices, selectServices }) => {


  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle title={title} />
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
