import React, { useState } from "react";
import "./ZusatzarbeitenPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService } from "../../components/Calculator/calculator-types";

export const ZusatzarbeitenPage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<SingleService[]>([
    { blackTitle: "Überspannungsschutz Typ 1+2 installieren", price: 415 },
    { blackTitle: "SLS Schalter installieren", price: 135 },
    { blackTitle: "Kaskadenschaltung", greyTitle: "(каскадное соединение)", price: 1000 },
    { blackTitle: "Zählerkasten nach VDE-Norm", greyTitle: "(расходомерная коробка в соответствии со стандартом VDE)", price: 2380 },
    { blackTitle: "Versetzen einer SAT-Schlüssel", greyTitle: "(перемещение SAT)", price: 250 },
    { blackTitle: "Potentialausgleich mit Erdungsspieß setzen", greyTitle: "(установить выравнивание потенциалов с помощью заземляющего колышка)", price: 300 },
  ])

  return (
    <div className="zusatzarbeitenPage">
      <Header />
      <Calculator
        title={{ blackTitle: "Zusatzarbeiten", greyTitle: "Доп. услуги" }}
        singleServices={singleServices}
        unNormalPriceChange={true}
        customServiceInput={true}
        setSingleServices={setSingleServices}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
