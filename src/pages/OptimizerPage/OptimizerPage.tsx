import React, { useEffect, useState } from "react";
import "./OptimizerPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import producerStore from "../../stores/producer-store";
import { fetchSingleItems } from "../../api/fetchItemsFromtable";
import { Steps } from "../../stores/step-store";

export const OptimizerPage: React.FC = () => {
  const { producer } = producerStore;

  const [singleServices, setSingleServices] = useState<SingleService[]>([]);

  const title: Title = {
    blackTitle: "Optimierer",
    greyTitle: `оптимизатор (${producer})`
  }

  useEffect(() => {
    fetchSingleItems("optimizers", setSingleServices);
  }, [])


  return (
    <div className="optimizerPage">
      <Header />
      <Calculator
        title={title}
        singleServices={singleServices}
        nextStepEnum={Steps.invertor}
      />
      <Footer isCalculator={true} />
    </div>
  );
}
