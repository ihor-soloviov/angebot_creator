import React, { useCallback, useEffect, useState } from "react";
import "./InvertorPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownService, IndividualService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSelectItems, fetchSingleItems } from "../../api/fetchItemsFromtable";
import { titles } from "./titles";
import { enphaseServices } from "./singleServiceEnphase";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";

export const InvertorPage: React.FC = React.memo(() => {

  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<IndividualService[]>([])
  const [selectService, setSelectService] = useState<DropdownService>();
  const { producer } = producerStore;
  const title: Title = titles[producer]


  const addNewSelectService = useCallback((selectObject: IndividualService) => {
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
      fetchSingleItems(endpoint).then((res) => setSingleServices(res));
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
            header={title}
            singleServices={singleServices}
            selectServices={selectServices}
            additionHeader={{ title: "Invertor" }}
            additionServices={true}
            defaultSelectService={selectService}
            addNewSelectService={addNewSelectService}
          />
        )

        : (
          <Calculator
            header={title}
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
