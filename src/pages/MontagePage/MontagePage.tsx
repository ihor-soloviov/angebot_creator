import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownService, IndividualService, Title } from "../../components/Calculator/calculator-types";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import "./MontagePage.scss";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { fetchServices, fetchServicesBySection, fetchServicesByTableName } from "../../api/fetchItemsFromtable";

const title: Title = {
  title: "Installation + Lieferung",
  description: "Монтаж + доставка"
}

const additionHeader: Title = {
  title: "Auf- und Abbau Gerüst/Absturzsicherung je Dachseite",
  description: "Размер и количество лесов"
}

// const singleServices: SingleService[] = [{
//   title: "Montage, Verkabelung, Anschluss je Wechselrichter",
//   description: "(монтаж, подключение проводов и подключение самого инвертора)",
//   price: 400
// },

// {
//   title: "Montage, Verkabelung, Anschluss je Stromspeicher",
//   description: "(монтаж, подключение проводов и подключение самой батареи)",
//   price: 400
// },
// {
//   title: "DC-Montage je Modul",
//   description: "(монтаж на крыше)",
//   price: 165
// }]

// const defaultSelectService: SelectService = {
//   label: "Леса",
//   select: [
//     { value: "<5m", price: 400 },
//     { value: "5m - 8m", price: 500 },
//     { value: ">8m", price: 600 }
//   ]
// }

export const MontagePage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<IndividualService[]>([])

  useEffect(() => {
    getSavedSelectServicesWithCount(setSelectServices)
  }, []);

  useEffect(() => {
    fetchServicesBySection('Installation + Lieferung')
  }, [])

  const addNewSelectService = useCallback((selectObject: IndividualService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])

  return (
    <div className="montagePage">
      <Header />
      <Calculator
        header={title}
        additionHeader={additionHeader}
        singleServices={singleServices}
        // defaultSelectService={defaultSelectService}
        selectServices={selectServices}
        addNewSelectService={addNewSelectService}
        additionServices={true}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
