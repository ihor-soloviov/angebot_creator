import React, { useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { SelectService, SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";
import { CalculatorTitle } from "../CalculatorTitle";
import { SelectServiceItem } from "../SelectServiceItem";
import { ButtonNext } from "../ButtonNext";

interface Props {
  title: Title
  additionTitle: Title
  singleServices: SingleService[]
  selectServices: SelectService[]
  additionParagraph?: boolean
  addNewSelectService: (selectObject: SelectService) => void
}

export const Calculator: React.FC<Props> = ({
  title,
  additionTitle,
  singleServices,
  selectServices,
  addNewSelectService,
  additionParagraph,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle title={title} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        <div className="calculatorService__container" style={{ marginBottom: additionParagraph ? "100px" : 0 }}>
          {singleServices.map((service, index) => (
            <SingleServiceItem key={index} service={service} setTotalPrice={setTotalPrice} />
          )
          )}
        </div>
        {additionParagraph && (
          <>
            <CalculatorTitle title={additionTitle} />
            <div className="calculatorService__container">
              {selectServices.map((service, index) => (
                <SelectServiceItem key={index} service={service} index={index} addNewSelectService={addNewSelectService} setTotalPrice={setTotalPrice} />
              ))}
            </div>
          </>
        )}
        <div className="calculator__total">
          <p>Стоимость этапа</p>
          <p>{totalPrice}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
    </div>
  );
}
