import "./TaubenschutzPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import React from "react";

export const TaubenschutzPage: React.FC = React.memo(() => (
  <div className="taubenschutzPage">
    <Header />
    <Calculator
      header={{ title: "Taubenschutz", description: "Защита от голубей" }}
      section="Taubenschutz"
    />
    <Footer isCalculator={true} />
  </div>
))
