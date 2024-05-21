import React from "react";
import "./TaubenschutzPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService, ServiceSpecific } from "../../components/Calculator/calculator-types";
import { SingleServiceItem } from "../../components/SingleServiceItem";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";

const singleServices: IndividualService[] = [
  { title: "Material + Montage je Laufmeter", description: "(материал и монтаж за погонный метр)", price: 18, specific: ServiceSpecific.Single },
  { title: "240 mm Spitzen", description: "(наконечники 240 мм)", price: 18, specific: ServiceSpecific.Single }
];

export const TaubenschutzPage: React.FC = React.memo(() =>
(
  <div className="taubenschutzPage">
    <Header />
    <Calculator
      header={{ title: "Taubenschutz", description: "Защита от голубей" }}

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
