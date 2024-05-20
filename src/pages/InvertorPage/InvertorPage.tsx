import React, { useCallback, useEffect, useState } from "react";
import "./InvertorPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { DropdownServices, IndividualService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSelectItems, fetchSingleItems } from "../../api/fetchItemsFromtable";
import { titles } from "./titles";
import { enphaseServices } from "./singleServiceEnphase";
import { generateUniqueThreeDigitNumber } from "../../utils/randomizer";
import { getSavedSelectServicesWithCount } from "../../utils/sessionStorageMethods";
import { SingleServiceItem } from "../../components/SingleServiceItem";

export const InvertorPage: React.FC = React.memo(() => {

  const [singleServices, setSingleServices] = useState<IndividualService[]>([])
  const [selectServices, setSelectServices] = useState<IndividualService[]>([])
  const [selectService, setSelectService] = useState<DropdownServices>();
  const { producer } = producerStore;
  const title: Title = titles[producer]


  const addNewSelectService = useCallback((selectObject: IndividualService) => {
    const id = generateUniqueThreeDigitNumber(selectServices);
    const objWithId = { ...selectObject, id: id }
    setSelectServices((prev) => [...prev, objWithId])
  }, [selectServices])


  useEffect(() => {
    fetchSelectItems("inverters", setSelectService);
    const endpoint = producer === Producer.huawei ? "smartmeters" : "other"
    fetchSingleItems(endpoint).then((res) => setSingleServices(res));
  }, [producer])

  useEffect(() => {
    getSavedSelectServicesWithCount(setSelectServices)
  }, [])


  return (
    <div className="invertorPage">
      <Header />
      <Calculator
        header={title}
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
      </Calculator>

      <Footer isCalculator={true} />
    </div>
  );
})
