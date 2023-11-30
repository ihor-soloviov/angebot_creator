import React from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SingleService, Title } from "../../components/Calculator/calculator-types";
import "./MontagePage.scss";

export const MontagePage: React.FC = () => {
  const title: Title = {
    blackTitle: "Installation + Lieferung",
    greyTitle: "Монтаж + доставка"
  }

  const singleServices: SingleService[] = [{
    blackTitle: "Montage, Verkabelung, Anschluss je Wechselrichter",
    greyTitle: "(монтаж, подключение проводов и подключение самого инвертора)",
    price: 400
  },
  {
    blackTitle: "Montage, Verkabelung, Anschluss je Stromspeicher",
    greyTitle: "(монтаж, подключение проводов и подключение самой батареи)",
    price: 400
  },
  {
    blackTitle: "DC-Montage je Modul",
    greyTitle: "(монтаж на крыше)",
    price: 165
  }]
  return (
    <div className="montagePage">
      <Header />
      <Calculator title={title} singleServices={singleServices} />
      <Footer />
    </div>
  );
}
