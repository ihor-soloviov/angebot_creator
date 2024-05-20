import React from "react";
import "./IqCombinerPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService, Title } from "../../components/Calculator/calculator-types";

export const IqCombinerPage: React.FC = () => {
  const title: Title = {
    description: "IQ Combiner 3P (Enphase)",
    title: "IQ Combiner 3P"
  }
  const singleServices: IndividualService[] = [
    {
      title: "X-IQ-EURO-230-3P-4-1",
      description: "(Gateway, COMMS-KIT, RELAY-3P)",
      price: 2200
    },
    {
      title: "CELLMODEM-M1-06-AT-05",
      description: "(Mobile Connect)",
      price: 700
    }
  ]
  return (
    <div className="iqCombiner" >
      <Header />
      <Calculator
        header={title}
        singleServices={singleServices}
      />
      <Footer isCalculator={true} />
    </div >
  );
}

