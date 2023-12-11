import React from "react";
import "./IqCombinerPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService, Title } from "../../components/Calculator/calculator-types";

export const IqCombinerPage: React.FC = () => 
  {
    const title: Title = {
      greyTitle: "IQ Combiner 3P (Enphase)",
      blackTitle: "IQ Combiner 3P"
    }
    const singleServices: SingleService[] = [
      {
        blackTitle: "X-IQ-EURO-230-3P-4-1",
        greyTitle: "(Gateway, COMMS-KIT, RELAY-3P)",
        price: 2200
      },
      {
        blackTitle: "CELLMODEM-M1-06-AT-05",
        greyTitle: "(Mobile Connect)",
        price: 700
      }
    ]
    return(
      <div className = "iqCombiner" >
        <Header />
        <Calculator
          title={title}
          singleServices={singleServices}
        />
        <Footer isCalculator={true} />
      </div >
    );
  }

