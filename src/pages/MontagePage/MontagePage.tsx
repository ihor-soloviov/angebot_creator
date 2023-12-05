import React, { useState } from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import "./MontagePage.scss";

export const MontagePage: React.FC = () => {
  const [selectServices, setSelectServices] = useState<SelectService[]>([{
    label: "Леса",
    select: [
      { value: "<5m", price: 400 },
      { value: "5m - 8m", price: 500 },
      { value: ">8m", price: 600 }
    ]
  }
  ])

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

  const addNewSelectService = (selectObject: SelectService) => {
    setSelectServices((prev: SelectService[]) => [...prev, selectObject])
  }

  const title: Title = {
    blackTitle: "Installation + Lieferung",
    greyTitle: "Монтаж + доставка"
  }

  const additionTitle = {
    blackTitle: "Auf- und Abbau Gerüst/Absturzsicherung je Dachseite",
    greyTitle: "Размер и количество лесов"
  }


  return (
    <div className="montagePage">
      <Header />
      <Calculator
        title={title}
        additionTitle={additionTitle}
        singleServices={singleServices}
        selectServices={selectServices}
        addNewSelectService={addNewSelectService}
        additionParagraph={true}
      />
      <Footer />
    </div>
  );
}
