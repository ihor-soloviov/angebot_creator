import React from "react";
import "./PvModulePage.scss";
import { Header } from "../../components/Header";
import { Calculator } from "../../components/Calculator";
import { Footer } from "../../components/Footer";
import { SingleService, Title } from "../../components/Calculator/calculator-types";

export const PvModulePage: React.FC = React.memo(() => {
  const title: Title = {
    blackTitle: "PV-Module",
    greyTitle: "Фотоэлектрические модули"
  }
  const singleServices: SingleService[] = [
    {
      blackTitle: "Trina Glas-Glas Module 440W",
      greyTitle: "(модуль)",
      price: 220
    },
    {
      blackTitle: "Jolywood JW-HD108N-420W Full black glas-glas",
      greyTitle: "(модуль)",
      price: 250
    }
  ]
  return (
    <div className="pvModulePage">
      <Header />
      <Calculator
        title={title}
        singleServices={singleServices}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
