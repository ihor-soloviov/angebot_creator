import React from "react";
import "./TaubenschutzPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService } from "../../components/Calculator/calculator-types";

const singleServices: SingleService[] = [
  { title: "Material + Montage je Laufmeter", description: "(материал и монтаж за погонный метр)", price: 18 },
  { title: "240 mm Spitzen", description: "(наконечники 240 мм)", price: 18 }
];

export const TaubenschutzPage: React.FC = React.memo(() =>
(
  <div className="taubenschutzPage">
    <Header />
    <Calculator
      title={{ title: "Taubenschutz", description: "Защита от голубей" }}
      singleServices={singleServices}
    />
    <Footer isCalculator={true} />
  </div>
))
