import React from "react";
import "./WallboxPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../components/Calculator/calculator-types";
import producerStore from "../../stores/producer-store";


export const WallboxPage: React.FC = React.memo(() => {
  const { producer } = producerStore;

  const title: Title = {
    title: "Wallbox",
    description: `(${producer})`
  }

  return (
    <div className="wallboxPage">
      <Header />
      <Calculator
        header={title}
        serviceTableName="wallbox"
      />

      <Footer isCalculator={true} />
    </div >
  );
})
