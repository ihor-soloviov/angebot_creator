import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import producerStore from "../../stores/producer-store";
import { CalculatorTitle } from "../../components/Calculator/CalculatorTitle";
import { Title } from "../../components/Calculator/calculator-types";
import stepStore from "../../stores/step-store";
import { ButtonNext } from "../../components/Buttons/ButtonNext";
import { observer } from "mobx-react-lite";
import calculatorStore from "../../stores/calculator-store";

const unavailablePages = [
  "welcome",
  "angebotType",
  "pvsolFile",
  "projectImages",
  "producer",
  "checkout",
  "bravo"
];

export const CheckoutPage: React.FC = observer(() => {
  const [pages, setPages] = useState<Array<string>>([])

  const { producer } = producerStore;
  const { totalPrice, stepTotalPrice } = calculatorStore
  const { id, arraysOfSteps } = stepStore;

  useEffect(() => {
    setPages([...arraysOfSteps[producer]].filter((page: string) => !unavailablePages.includes(page)))
  }, [arraysOfSteps, producer])

  const title: Title = {
    title: `Проверьте ваше предложение - ID ${id} v.1`,
    description: `Производитель (${producer})`
  }

  return (
    <div className="checkoutPage">
      <Header />
      <div className="checkoutPage__container">
        <CalculatorTitle header={title} />
        <div className="pageList">
          {pages && (
            pages.map(page => (
              <div className="pageItem" key={page}>
                <p>{page}</p>
                <p className="page-price">{stepTotalPrice(page)}.00€</p>
              </div>
            ))
          )}
        </div>
        <div className="totalPriceForAllPages">
          <p>Общая стоимость</p>
          <p>{totalPrice}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
      <Footer isCalculator={true} />
    </div>
  );
})
