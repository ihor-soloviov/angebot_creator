/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownServices, IndividualService, Title } from "../../components/Calculator/calculator-types";
// import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { fetchServicesBySection } from "../../api/fetchItemsFromtable";
import { SingleServiceItem } from "../../components/services/SingleServiceItem";
import { CalculatorTitle } from "../../components/CalculatorTitle";
import { SelectServiceItem } from "../../components/services/SelectServiceItem";
import "./MontagePage.scss";
import CalculatorContainer from "../../components/Calculator/CalculatorContainer/CalculatorContainer";

const title: Title = {
  title: "Installation + Lieferung",
  description: "Монтаж + доставка"
}

const additionHeader: Title = {
  title: "Auf- und Abbau Gerüst/Absturzsicherung je Dachseite",
  description: "Размер и количество лесов"
}
export const MontagePage: React.FC = React.memo(() => {
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<DropdownServices | null>(null)

  const addSelectedService = (service: IndividualService) => {
    setSingleServices(prev => [...prev, service])
  }

  const setServicesBySpecific = useCallback(async () => {
    const { single, select } = await fetchServicesBySection("Installation + Lieferung");
    setSingleServices(single);
    if (select.length > 0) {
      const service: DropdownServices = {
        label: "Леса",
        options: select
      };

      setSelectServices(service);
    }
  }, [setSingleServices, setSelectServices]);

  useEffect(() => {
    setServicesBySpecific()
  }, [])

  return (
    <div className="montagePage">
      <Header />
      <Calculator header={title}>
        <CalculatorContainer additionalSection={true}
        >
          {singleServices.map((service, index) =>
            <SingleServiceItem
              serviceStorageName='singleServices'
              key={index}
              service={service}
            />
          )
          }
        </CalculatorContainer>

        <CalculatorTitle header={additionHeader} />
        <div className="calculatorService__container">
          {selectServices && <SelectServiceItem services={selectServices} addSelectedService={addSelectedService} />}
        </div>
      </Calculator >
      <Footer isCalculator={true} />
    </div >
  );
})
