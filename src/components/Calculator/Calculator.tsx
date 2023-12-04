import React from "react";
import { ProgressBar } from "../ProgressBar";
import { SelectService, SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";
import { CalculatorTitle } from "../CalculatorTitle";
import { SelectServiceItem } from "../SelectServiceItem";

interface Props {
  title: Title
  additionTitle: Title
  singleServices: SingleService[]
  selectServices: SelectService[]
  additionParagraph?: boolean
  addNewSelectService: (selectObject: SelectService) => void
}

export const Calculator: React.FC<Props> = ({ title, additionTitle, singleServices, selectServices, addNewSelectService, additionParagraph }) => {


  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle title={title} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        <div className="calculatorService__container" style={{ marginBottom: additionParagraph ? "100px" : 0 }}>
          {singleServices.map(service => (
            <SingleServiceItem service={service} />
          )
          )}
        </div>
        {additionParagraph && (
          <>
            <CalculatorTitle title={additionTitle} />
            <div className="calculatorService__container">
              {selectServices.map((service, index) => (
                <SelectServiceItem service={service} index={index} addNewSelectService={addNewSelectService} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
