import React from "react";
import "./PvModulePage.scss";
import { Header } from "../../components/Header";
import { Calculator } from "../../components/Calculator";
import { Footer } from "../../components/Footer";
import { SingleService, Title } from "../../components/Calculator/calculator-types";

export const PvModulePage: React.FC = React.memo(() => {
  const title: Title = {
    title: "PV-Module",
    description: "Фотоэлектрические модули"
  }
  const singleServices: SingleService[] = [
    {
      title: "Trina Glas-Glas Module 440W",
      description: "(модуль)",
      price: 220
    },
    {
      title: "Jolywood JW-HD108N-420W Full black glas-glas",
      description: "(модуль)",
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
