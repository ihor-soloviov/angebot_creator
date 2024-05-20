import React, { ReactNode, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import "./Calculator.scss";
import { CalculatorTitle } from "../CalculatorTitle";
import { ButtonNext } from "../Buttons/ButtonNext";
import { Title } from "./calculator-types";

interface Props {
  header: Title
  children: ReactNode
}

export const Calculator: React.FC<Props> = React.memo(({
  header,
  children
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle header={header} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        {children}

        <div className="calculator__total">
          <p>Стоимость этапа</p>
          <p>{totalPrice}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
    </div>
  );
})
