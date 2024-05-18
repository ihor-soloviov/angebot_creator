import React, { Dispatch, SetStateAction, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { SelectService, SingleService, Title } from "./calculator-types";
import "./Calculator.scss";
import { SingleServiceItem } from "../SingleServiceItem";
import { CalculatorTitle } from "../CalculatorTitle";
import { SelectServiceItem } from "../SelectServiceItem";
import { ButtonNext } from "../Buttons/ButtonNext";
import { CustomService } from "../CustomService";

interface Props {
  header: Title
  additionHeader?: Title
  singleServices?: SingleService[]
  defaultSelectService?: SelectService
  selectServices?: SingleService[]
  additionServices?: boolean
  addNewSelectService?: (selectObject: SingleService) => void
  unNormalPriceChange?: boolean
  customServiceInput?: boolean
  setSingleServices?: Dispatch<SetStateAction<SingleService[]>>;
}

export const Calculator: React.FC<Props> = React.memo(({
  header,
  additionHeader,
  singleServices,
  defaultSelectService,
  selectServices,
  addNewSelectService,
  additionServices,
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
        <CalculatorTitle header={header} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        {
          singleServiceCondition &&
          <div className="calculatorService__container" style={{ marginBottom: additionServices ? "100px" : 0 }}>
            {singleServices?.map((service, index) =>
              <SingleServiceItem
                serviceStorageName='singleServices'
                key={index}
                service={service}
                setTotalPrice={setTotalPrice}
                unNormalPriceChange={unNormalPriceChange}
              />
            )
            }
          </div>
        }
        {additionServices && <CalculatorTitle header={additionHeader} />}
        <div className="calculatorService__container">
          {selectServicesCondition && (
            selectServices.map((service, index) => {
              console.log(service);

              return (
                <SingleServiceItem serviceStorageName='selectServices' key={index} service={service} setTotalPrice={setTotalPrice} />
              )
            })
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
