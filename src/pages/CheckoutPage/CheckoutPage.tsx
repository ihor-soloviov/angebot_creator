import React from "react";
import "./CheckoutPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import producerStore from "../../stores/producer-store";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import { Title } from "../../components/Calculator/calculator-types";

export const CheckoutPage: React.FC = () => {
  const { producer } = producerStore;
  const title: Title = {
    blackTitle: "Проверьте ваше предложение - ID 806 v.1",
    greyTitle: `Производитель (${producer})`
  }
  return (
    <div className="checkoutPage">
      <Header />
      <div className="checkoutPage__container">
        <CalculatorTitle title={title} fontFamily="Inter Tight" />
      </div>
      <Footer />
    </div>
  );
}
