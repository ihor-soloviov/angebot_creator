import React from "react";
import "./TaubenschutzPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService } from "../../components/Calculator/calculator-types";

const singleServices: SingleService[] = [
  { blackTitle: "Material + Montage je Laufmeter", greyTitle: "(материал и монтаж за погонный метр)", price: 18 },
  { blackTitle: "240 mm Spitzen", greyTitle: "(наконечники 240 мм)", price: 18 }
];

export const TaubenschutzPage: React.FC = React.memo(() =>
(
  <div className="taubenschutzPage">
    <Header />
    <Calculator
      title={{ blackTitle: "Taubenschutz", greyTitle: "Защита от голубей" }}
      singleServices={singleServices}
    />
    <Footer isCalculator={true} />
  </div>
))
