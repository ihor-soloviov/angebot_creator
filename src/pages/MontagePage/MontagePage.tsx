import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownService, IndividualService, Title } from "../../components/Calculator/calculator-types";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import "./MontagePage.scss";
// import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { fetchServicesBySection } from "../../api/fetchItemsFromtable";
import { SingleServiceItem } from "../../components/SingleServiceItem";
import { CalculatorTitle } from "../../components/CalculatorTitle";

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
  const [selectServices, setSelectServices] = useState<DropdownService[]>([])

  // useEffect(() => {
  //   getSavedSelectServicesWithCount(setSelectServices)
  // }, []);

  useEffect(() => {
    fetchServicesBySection("Installation + Lieferung").then(({ single }) => setSingleServices(single));

  }, [])

  const addNewSelectService = useCallback((selectObject: IndividualService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])

  return (
    <div className="montagePage">
      <Header />
      <Calculator header={title}>
        <div
          className="calculatorService__container"
          style={{ marginBottom: "100px" }}
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
        </div>

        <CalculatorTitle header={additionHeader} />
        {/* <div className="calculatorService__container">
          {selectServicesCondition && (
            selectServices.map((service, index) => {
              console.log(service);

              return (
                <SingleServiceItem serviceStorageName='selectServices' key={index} service={service} setTotalPrice={setTotalPrice} />
              )
            })
          )}
          {defaultSelectService && <SelectServiceItem service={defaultSelectService} addNewSelectService={addNewSelectService} />}
        </div> */}
      </Calculator >
      <Footer isCalculator={true} />
    </div >
  );
})
