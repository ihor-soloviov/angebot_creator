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
  defaultSelectService?: SelectService
  selectServices?: SingleService[]
  additionParagraph?: boolean
  addNewSelectService?: (selectObject: SingleService) => void
  unNormalPriceChange?: boolean
  customServiceInput?: boolean
  setSingleServices?: Dispatch<SetStateAction<SingleService[]>>;
}

export const Calculator: React.FC<Props> = React.memo(({
  title,
  additionTitle,
  singleServices,
  defaultSelectService,
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
        {
          singleServiceCondition &&
          <div className="calculatorService__container" style={{ marginBottom: additionParagraph ? "100px" : 0 }}>
            {singleServices?.map((service, index) => (
              <SingleServiceItem
                serviceStorageName='singleServices'
                key={index}
                service={service}
                setTotalPrice={setTotalPrice}
                unNormalPriceChange={unNormalPriceChange}
              />
            )
            )}
          </div>
        }
        {additionParagraph && <CalculatorTitle title={additionTitle} />}
        <div className="calculatorService__container">
          {selectServicesCondition && (
            selectServices.map((service, index) => (
              <SingleServiceItem serviceStorageName='selectServi' key={index} service={service} setTotalPrice={setTotalPrice} />
            ))
          )}
          {defaultSelectService && <SelectServiceItem service={defaultSelectService} addNewSelectService={addNewSelectService} />}
        </div>
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
