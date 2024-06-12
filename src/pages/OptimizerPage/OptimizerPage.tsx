import React from "react";
import "./OptimizerPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../types/calculator-types";
import producerStore from "../../stores/producer-store";

export const OptimizerPage: React.FC = React.memo(() => {
  const { producer } = producerStore;

  const title: Title = {
    title: "Optimierer",
    description: `оптимизатор (${producer})`
  }

  return (
    <div className="optimizerPage">
      <Header />
      <Calculator
        header={title}
        serviceTableName="optimizers"
      />
      <Footer isCalculator={true} />
    </div>
  );
})
