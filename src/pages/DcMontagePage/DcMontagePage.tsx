/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from "../../types/calculator-types";
import "./MontagePage.scss";

const title: Title = {
  title: "Installation + Lieferung",
  description: "Монтаж + доставка"
}

export const DcMontage: React.FC = React.memo(() => (
  <div className="montagePage">
    <Header />
    <Calculator header={title} section="Installation + Lieferung" />
    <Footer isCalculator={true} />
  </div >
))


