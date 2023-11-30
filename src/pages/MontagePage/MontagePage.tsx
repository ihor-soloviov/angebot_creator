import React from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import "./MontagePage.scss";

export const MontagePage: React.FC = () => {
  return (
    <div className="montagePage">
      <Header />
      <Calculator />
      <Footer />
    </div>
  );
}
