import React from "react";
import "./PvModulePage.scss";
import { Header } from "../../components/Header";
import { Calculator } from "../../components/Calculator";
import { Footer } from "../../components/Footer";
import { Title } from "../../components/Calculator/calculator-types";

export const PvModulePage: React.FC = React.memo(() => {
  const title: Title = {
    title: "PV-Module",
    description: "Фотоэлектрические модули"
  }

  return (
    <div className="pvModulePage">
      <Header />
      <Calculator
        header={title}
        sectionTable="PV-Module"
      />
      <Footer isCalculator={true} />
    </div>
  );
})
