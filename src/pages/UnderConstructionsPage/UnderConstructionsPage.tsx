import React from "react";
import "./UnderConstructionsPage.scss";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";

const singleServices: SingleService[] = [{
  blackTitle: "Quermontage",
  greyTitle: "(модули лежа)",
  price: 220
},
{
  blackTitle: "Hochmontage",
  greyTitle: "(модули стоя)",
  price: 190
},
{
  blackTitle: "Trapezdach",
  greyTitle: "(трапециевидная крыша)",
  price: 68
},
{
  blackTitle: "Flachdach Ost/West",
  greyTitle: "(на плоской крыше)",
  price: 160
},
{
  blackTitle: "Quermontage Alpha",
  greyTitle: "(поперечное крепление Альфа)",
  price: 263
},
{
  blackTitle: "Hochmontage Alpha",
  greyTitle: "(высокие монтажные альфа-панели)",
  price: 230
},
{
  blackTitle: "Trapezdach Alpha",
  greyTitle: "(трапециевидная крыша Альфа)",
  price: 95
},
{
  blackTitle: "Flachdach Alpha",
  greyTitle: "(плоская кровля Альфа)",
  price: 190
}
]

const title: Title = {
  blackTitle: "Unterkonstruktion",
  greyTitle: "Подконструкция"
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
