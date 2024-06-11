/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../components/Calculator/calculator-types";
import "./MontagePage.scss";

const title: Title = {
  title: "Installation + Lieferung",
  description: "Монтаж + доставка"
}

const additionHeader: Title = {
  title: "Auf- und Abbau Gerüst/Absturzsicherung je Dachseite",
  description: "Размер и количество лесов"
}

export const MontagePage: React.FC = React.memo(() => (
  <div className="montagePage">
    <Header />
    <Calculator header={title} additionHeader={additionHeader} section="Installation + Lieferung" />
    <Footer isCalculator={true} />
  </div >
))


