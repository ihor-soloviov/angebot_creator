import React from "react";
import "./UnderConstructionsPage.scss";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";

const singleServices: SingleService[] = [{
  title: "Quermontage",
  description: "(модули лежа)",
  price: 220
},
{
  title: "Hochmontage",
  description: "(модули стоя)",
  price: 190
},
{
  title: "Trapezdach",
  description: "(трапециевидная крыша)",
  price: 68
},
{
  title: "Flachdach Ost/West",
  description: "(на плоской крыше)",
  price: 160
},
{
  title: "Quermontage Alpha",
  description: "(поперечное крепление Альфа)",
  price: 263
},
{
  title: "Hochmontage Alpha",
  description: "(высокие монтажные альфа-панели)",
  price: 230
},
{
  title: "Trapezdach Alpha",
  description: "(трапециевидная крыша Альфа)",
  price: 95
},
{
  title: "Flachdach Alpha",
  description: "(плоская кровля Альфа)",
  price: 190
}
]

const title: Title = {
  title: "Unterkonstruktion",
  description: "Подконструкция"
}

export const UnderConstructionsPage: React.FC = React.memo(() => (
  <div className="underConstructionsPage">
    <Header />
    <Calculator
      title={title}
      singleServices={singleServices}
    />
    <Footer isCalculator={true} />
  </div>
))
