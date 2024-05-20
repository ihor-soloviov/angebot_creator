import React, { useCallback, useEffect, useState } from "react";
import "./BatteryPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import producerStore from "../../stores/producer-store";
import { DropdownService, IndividualService, Title } from "../../components/Calculator/calculator-types";
import { titles } from "./titles";
import { fetchSelectItems } from "../../api/fetchItemsFromtable";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import { SingleServiceItem } from "../../components/SingleServiceItem";

export const BatteryPage: React.FC = React.memo(() => {
  const [selectServices, setSelectServices] = useState<IndividualService[]>([])
  const [selectService, setSelectService] = useState<DropdownService>()
  const { producer } = producerStore;
  const title: Title = titles[producer];

  useEffect(() => {
    fetchSelectItems("batteries", setSelectService);
  }, [producer])

  useEffect(() => {
    getSavedSelectServicesWithCount(setSelectServices)
  }, [])

  const addNewSelectService = useCallback((selectObject: IndividualService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])

  return (
    <div className="batteryPage">
      <Header />
      {/* <Calculator
        header={title}
      >
      </Calculator> */}
      <Footer isCalculator={true} />
    </div>
  );
})
