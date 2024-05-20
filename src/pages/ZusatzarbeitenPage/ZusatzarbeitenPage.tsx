import React, { useState } from "react";
import "./ZusatzarbeitenPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { IndividualService, ServiceSpecific } from "../../components/Calculator/calculator-types";
import { SingleServiceItem } from "../../components/SingleServiceItem";

const singleServices: IndividualService[] = [
  { title: "Überspannungsschutz Typ 1+2 installieren", price: 415, specific: ServiceSpecific.Single },
  { title: "SLS Schalter installieren", price: 135, specific: ServiceSpecific.Single },
  { title: "Kaskadenschaltung", description: "(каскадное соединение)", price: 1000, specific: ServiceSpecific.Single },
  { title: "Zählerkasten nach VDE-Norm", description: "(расходомерная коробка в соответствии со стандартом VDE)", price: 2380, specific: ServiceSpecific.Single },
  { title: "Versetzen einer SAT-Schlüssel", description: "(перемещение SAT)", price: 250, specific: ServiceSpecific.Single },
  { title: "Potentialausgleich mit Erdungsspieß setzen", description: "(установить выравнивание потенциалов с помощью заземляющего колышка)", price: 300, specific: ServiceSpecific.Single },
]

export const ZusatzarbeitenPage: React.FC = React.memo(() => {

  return (
    <div className="zusatzarbeitenPage">
      <Header />
      <Calculator
        header={{ title: "Zusatzarbeiten", description: "Доп. услуги" }}
      >
        {singleServices.map((service, index) =>
          <SingleServiceItem
            serviceStorageName='singleServices'
            key={index}
            service={service}
            setTotalPrice={() => console.log('e')}
            unNormalPriceChange={true}
          />
        )
        }
      </Calculator>
      <Footer isCalculator={true} />
    </div>
  );
})
