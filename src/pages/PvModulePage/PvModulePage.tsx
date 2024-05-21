import React from "react";
import "./PvModulePage.scss";
import { Header } from "../../components/Header";
import { Calculator } from "../../components/Calculator";
import { Footer } from "../../components/Footer";
import { IndividualService, ServiceSpecific, Title } from "../../components/Calculator/calculator-types";
import { SingleServiceItem } from "../../components/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";

const singleServices: IndividualService[] = [
  {
    title: "Trina Glas-Glas Module 440W",
    description: "(модуль)",
    price: 220,
    specific: ServiceSpecific.Single
  },
  {
    title: "Jolywood JW-HD108N-420W Full black glas-glas",
    description: "(модуль)",
    price: 250,
    specific: ServiceSpecific.Single
  }
]

export const PvModulePage: React.FC = React.memo(() => {
  const title: Title = {
    title: "PV-Module",
    description: "Фотоэлектрические модули"
  }

  return (
    <div className="pvModulePage">
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
  );
})
