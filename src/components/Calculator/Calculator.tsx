import React, { Dispatch, SetStateAction, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { SelectService, SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";
import { CalculatorTitle } from "../CalculatorTitle";
import { SelectServiceItem } from "../SelectServiceItem";
import { ButtonNext } from "../ButtonNext";
import { CustomService } from "../CustomService";

interface Props {
  title: Title
  additionTitle?: Title
  singleServices?: SingleService[]
  selectServices?: SelectService[]
  additionParagraph?: boolean
  addNewSelectService?: (selectObject: SelectService) => void
  unNormalPriceChange?: boolean
  customServiceInput?: boolean
  setSingleServices?: Dispatch<SetStateAction<SingleService[]>>;
}

export const Calculator: React.FC<Props> = React.memo(({
  title,
  additionTitle,
  singleServices,
  selectServices,
  addNewSelectService,
  additionParagraph,
  unNormalPriceChange,
  customServiceInput,
  setSingleServices,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const singleServiceCondition = singleServices && singleServices?.length > 0;
  const selectServicesCondition = selectServices && selectServices?.length > 0;

  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle title={title} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        <div className="calculatorService__container" style={{ marginBottom: additionParagraph ? "100px" : 0 }}>
          {singleServiceCondition && singleServices?.map((service, index) => {
            if (service.blackTitle === "Kaskadenschaltung") {
              return (
                <SingleServiceItem key={index} service={service} setTotalPrice={setTotalPrice} unNormalPriceChange={unNormalPriceChange} />
              )
            }
            return <SingleServiceItem key={index} service={service} setTotalPrice={setTotalPrice} unNormalPriceChange={unNormalPriceChange} />
          }
          )}
        </div>
        {additionParagraph && <CalculatorTitle title={additionTitle} />}
        {selectServicesCondition && (

          <div className="calculatorService__container">
            {selectServices.map((service, index) => (
              <SelectServiceItem key={index} service={service} index={index} addNewSelectService={addNewSelectService} setTotalPrice={setTotalPrice} />
            ))}
          </div>
        )}
        {customServiceInput && (
          <CustomService setSingleServices={setSingleServices} />
        )}

        <div className="calculator__total">
          <p>Стоимость этапа</p>
          <p>{totalPrice}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
    </div>
  );
})
