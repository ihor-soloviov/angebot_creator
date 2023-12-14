import React, { useCallback, useEffect, useState } from "react";
import "./BatteryPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import producerStore from "../../stores/producer-store";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";
import { fetchSelectItems } from "../../api/fetchItemsFromtable";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";

export const BatteryPage: React.FC = React.memo(() => {
  const [selectServices, setSelectServices] = useState<SingleService[]>([])
  const [selectService, setSelectService] = useState<SelectService>()
  const { producer } = producerStore;
  const title: Title = titles[producer];

  useEffect(() => {
    fetchSelectItems("batteries", setSelectService);
  }, [producer])

  useEffect(() => {
    getSavedSelectServicesWithCount(setSelectServices)
  }, [])

  const addNewSelectService = useCallback((selectObject: SingleService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])

  return (
    <div className="batteryPage">
      <Header />
      <Calculator
        title={title}
        selectServices={selectServices}
        defaultSelectService={selectService}
        addNewSelectService={addNewSelectService}
      />
      <Footer isCalculator={true} />
    </div>
  );
})
