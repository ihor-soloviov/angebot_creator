import React from "react";
import "./IqCombinerPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../types/calculator-types";

export const IqCombinerPage: React.FC = () => {
  const title: Title = {
    description: "IQ Combiner 3P (Enphase)",
    title: "IQ Combiner 3P"
  }

  return (
    <div className="iqCombiner" >
      <Header />
      <Calculator
        header={title}
        serviceTableName="iq_combiner"
      />
      <Footer isCalculator={true} />
    </div >
  );
}