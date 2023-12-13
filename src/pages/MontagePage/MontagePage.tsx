import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import "./MontagePage.scss";

export const MontagePage: React.FC = () => {
  const selectService: SelectService = {
    label: "Леса",
    select: [
      { value: "<5m", price: 400 },
      { value: "5m - 8m", price: 500 },
      { value: ">8m", price: 600 }
    ]
  }

  const [selectServices, setSelectServices] = useState<SelectService[]>([selectService])

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

  const addNewSelectService = useCallback((selectObject: SelectService) => {
    setSelectServices((prev: SelectService[]) => [...prev, selectObject])
  }, [])

  // useEffect(() => {
  //   getSavedSelectServiceCount(selectServices[0].label, addNewSelectService)
  // }, [addNewSelectService, selectServices])

  useEffect(() => {
    const storedServices = sessionStorage.getItem('selectServices');
    if (storedServices) {
      const services = JSON.parse(storedServices);
      const matchingService = services.find((service: SelectService) => service.label === selectService.label);

      if (matchingService && matchingService.items) {
        // Перевірка, чи стейт вже був оновлений цими даними
        if (selectServices.length !== matchingService.items.length) {
          setSelectServices(matchingService.items);
        }
      }
    }
  }, [selectServices.length, selectService.label]);

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
      <Footer isCalculator={true} />
    </div>
  );
}
