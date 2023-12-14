import React, { useCallback, useEffect, useState } from "react";
import "./InvertorPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSelectItems, fetchSingleItems } from "../../api/fetchItemsFromtable";
import { titles } from "./titles";
import { enphaseServices } from "./singleServiceEnphase";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";

export const InvertorPage: React.FC = React.memo(() => {

  const [singleServices, setSingleServices] = useState<SingleService[]>([])
  const [selectServices, setSelectServices] = useState<SingleService[]>([])
  const [selectService, setSelectService] = useState<SelectService>();
  const { producer } = producerStore;
  const title: Title = titles[producer]


  const addNewSelectService = useCallback((selectObject: SingleService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])


  useEffect(() => {
    fetchSelectItems("inverters", setSelectService);
    if (producer == Producer.enphase) {
      setSingleServices(enphaseServices);
    }

    else {
      const endpoint = producer === Producer.huawei ? "smartmeters" : "other"
      fetchSingleItems(endpoint, setSingleServices);
    }
  }, [producer])

  useEffect(() => {
    getSavedSelectServicesWithCount(setSelectServices)
  }, [])


  return (
    <div className="invertorPage">
      <Header />
      {Producer.huawei
        ? (
          <Calculator
            title={title}
            singleServices={singleServices}
            selectServices={selectServices}
            additionTitle={{ blackTitle: "Invertor" }}
            additionParagraph={true}
            defaultSelectService={selectService}
            addNewSelectService={addNewSelectService}
          />
        )

        : (
          <Calculator
            title={title}
            singleServices={singleServices}
            selectServices={selectServices}
            defaultSelectService={selectService}
            addNewSelectService={addNewSelectService}
          />
        )
      }

      <Footer isCalculator={true} />
    </div>
  );
})
