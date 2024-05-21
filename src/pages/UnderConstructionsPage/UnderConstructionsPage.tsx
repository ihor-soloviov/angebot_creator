import React from "react";
import "./UnderConstructionsPage.scss";
import { IndividualService, ServiceSpecific, Title } from "../../components/Calculator/calculator-types";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleServiceItem } from "../../components/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";

const singleServices: IndividualService[] = [{
  title: "Quermontage",
  description: "(модули лежа)",
  price: 220,
  specific: ServiceSpecific.Single
},
{
  title: "Hochmontage",
  description: "(модули стоя)",
  price: 190,
  specific: ServiceSpecific.Single
},
{
  title: "Trapezdach",
  description: "(трапециевидная крыша)",
  price: 68,
  specific: ServiceSpecific.Single
},
{
  title: "Flachdach Ost/West",
  description: "(на плоской крыше)",
  price: 160,
  specific: ServiceSpecific.Single
},
{
  title: "Quermontage Alpha",
  description: "(поперечное крепление Альфа)",
  price: 263,
  specific: ServiceSpecific.Single
},
{
  title: "Hochmontage Alpha",
  description: "(высокие монтажные альфа-панели)",
  price: 230,
  specific: ServiceSpecific.Single
},
{
  title: "Trapezdach Alpha",
  description: "(трапециевидная крыша Альфа)",
  price: 95,
  specific: ServiceSpecific.Single
},
{
  title: "Flachdach Alpha",
  description: "(плоская кровля Альфа)",
  price: 190,
  specific: ServiceSpecific.Single
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
      header={title}
    >
      <CalculatorContainer>
        {singleServices.map((service, index) =>
          <SingleServiceItem
            serviceStorageName='singleServices'
            key={index}
            service={service}
            unNormalPriceChange={true}
          />
        )
        }
      </CalculatorContainer>
    </Calculator>
    <Footer isCalculator={true} />
  </div>
))
