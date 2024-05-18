import React, { useState } from "react";
import "./ZusatzarbeitenPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService } from "../../components/Calculator/calculator-types";

export const ZusatzarbeitenPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<SingleService[]>([
    { title: "Überspannungsschutz Typ 1+2 installieren", price: 415 },
    { title: "SLS Schalter installieren", price: 135 },
    { title: "Kaskadenschaltung", description: "(каскадное соединение)", price: 1000 },
    { title: "Zählerkasten nach VDE-Norm", description: "(расходомерная коробка в соответствии со стандартом VDE)", price: 2380 },
    { title: "Versetzen einer SAT-Schlüssel", description: "(перемещение SAT)", price: 250 },
    { title: "Potentialausgleich mit Erdungsspieß setzen", description: "(установить выравнивание потенциалов с помощью заземляющего колышка)", price: 300 },
  ])

  return (
    <div className="zusatzarbeitenPage">
      <Header />
      <Calculator
        title={{ title: "Zusatzarbeiten", description: "Доп. услуги" }}
        singleServices={singleServices}
        unNormalPriceChange={true}
        customServiceInput={true}
        setSingleServices={setSingleServices}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
