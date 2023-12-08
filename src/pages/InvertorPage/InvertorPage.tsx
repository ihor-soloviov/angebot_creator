import React, { useEffect, useState } from "react";
import "./InvertorPage.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { SelectService, SingleService, Title } from "../../components/Calculator/calculator-types";
import producerStore, { Producer } from "../../stores/producer-store";
import { fetchSelectItems, fetchSingleItems } from "../../api/fetchItemsFromtable";
import { titles } from "./titles";
import { enphaseServices } from "./singleServiceEnphase";

export const InvertorPage: React.FC = () => {

  const [singleServices, setSingleServices] = useState<SingleService[]>([])
  const [selectServices, setSelectServices] = useState<SelectService[]>([])
  const { producer } = producerStore;
  const title: Title = titles[producer]

  const addNewSelectService = (selectObject: SelectService) => {
    setSelectServices((prev: SelectService[]) => [...prev, selectObject])
  }


  useEffect(() => {
    fetchSelectItems("inverters", setSelectServices);
    if (producer == Producer.enphase) {
      setSingleServices(enphaseServices);
    }

    else {
      const endpoint = producer === Producer.huawei ? "smartmeters" : "other"
      fetchSingleItems(endpoint, setSingleServices);
    }
  }, [producer])

  return (
    <div className="invertorPage">
      <Header />
      <Calculator
        title={title}
        singleServices={singleServices}
        selectServices={selectServices}
        addNewSelectService={addNewSelectService}
      />
      <Footer />
    </div>
  );
}
