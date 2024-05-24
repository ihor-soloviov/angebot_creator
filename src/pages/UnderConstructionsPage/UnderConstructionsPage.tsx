/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./UnderConstructionsPage.scss";
import { Title } from "../../components/Calculator/calculator-types";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";


const title: Title = {
  title: "Unterkonstruktion",
  description: "Подконструкция"
}

export const UnderConstructionsPage: React.FC = React.memo(() => (
  <div className="underConstructionsPage">
    <Header />
    <Calculator
      header={title}
      sectionTable="Unterkonstruktion"
    />
    <Footer isCalculator={true} />
  </div>
))
