import React from "react";
import "./ZusatzarbeitenPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";


export const ZusatzarbeitenPage: React.FC = React.memo(() => (
  <div className="zusatzarbeitenPage">
    <Header />
    <Calculator
      header={{ title: "Zusatzarbeiten", description: "Доп. услуги" }}
      section="Zusatzarbeiten"
    />
    <Footer isCalculator={true} />
  </div>
))
