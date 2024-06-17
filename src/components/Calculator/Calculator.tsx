/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import "./Calculator.scss";
import { CalculatorTitle } from "./CalculatorTitle";
import { ButtonNext } from "../Buttons/ButtonNext";
import { DropdownServices, IndividualService, Title } from "../../types/calculator-types";
import { fetchServicesBySection, fetchComponentsBySection } from "../../api/fetch";
import { formatSelectServices, formatSingleServices } from "../../utils/formatService";
import { observer } from "mobx-react-lite";
import producerStore from "../../stores/producer-store";
import calculatorStore from "../../stores/calculator-store";
import CalculatorContainer from "./CalculatorContainer/CalculatorContainer";
import { SingleServiceItem } from "../services/SingleServiceItem";
import { SelectServiceItem } from "../services/SelectServiceItem";
import stepStore from "../../stores/step-store";

interface Props {
  header: Title
  additionHeader?: Title
  selectsTable?: string
  serviceTableName?: string
  section?: string
}

export const Calculator: React.FC<Props> = observer(({
  header,
  additionHeader,
  selectsTable,
  serviceTableName,
  section
}) => {
  const { producer } = producerStore;
  const { appStep: step } = stepStore
  const { stepTotalPrice, getService } = calculatorStore;

  const [services, setServices] = useState<IndividualService[]>([]);
  const [selectedServices, setSelectedServices] = useState<IndividualService[]>([])
  const [selects, setSelects] = useState<DropdownServices | null>(null);
  const addSelectedService = (service: IndividualService) => {
    setSelectedServices(prev => [...prev, service])
  }

  const setServicesByTables = useCallback(
    () => {
      if (section) {
        fetchServicesBySection(section).then(({ single, select }): void => {
          const synchronizedServices = synchronizeServices(single, step);
          const synchronizedSelects = synchronizeServices(select, step).filter(service => service.count)
          setSelectedServices(synchronizedSelects)
          setServices(synchronizedServices);
          if (select.length > 0) {
            setSelects({ options: select });
          }
        });
        return
      }
      if (serviceTableName) {
        fetchComponentsBySection(serviceTableName).then((res): void => {
          console.log(res)
          const formattedServices = formatSingleServices(res);
          const synchronizedServices = synchronizeServices(formattedServices, step);
          setServices(synchronizedServices);
        });
      }
      if (selectsTable) {
        fetchComponentsBySection(selectsTable).then((res): void => {
          const selectServices = formatSelectServices(res);
          const synchronizedSelects = synchronizeServices(selectServices, step).filter(service => service.count)
          setSelectedServices(synchronizedSelects)
          console.log('selects Table', synchronizedSelects)
          setSelects({ options: selectServices })
        }
        )
      }
    },
    [],
  )

  const synchronizeServices = (fetchedServices: IndividualService[], stepName: string): IndividualService[] => {
    return fetchedServices.map(service => {
      const existingService = getService(stepName, service.title);
      if (existingService) {
        return { ...service, count: existingService.count };
      }
      return service;
    });
  };

  useEffect(() => {
    setServicesByTables()
  }, [producer, section, selectsTable, serviceTableName])

  return (
    <div className="calculator">
      <div className="calculator__container">
        <CalculatorTitle header={header} />
        <div className="calculator__progressBar">
          <ProgressBar />
        </div>
        <CalculatorContainer>
          {services.map((service) =>
            <React.Fragment key={service.title}>
              <SingleServiceItem
                service={service}
              />
            </React.Fragment>
          )
          }
          {selectedServices.map(service => (
            <React.Fragment key={service.title}>
              <SingleServiceItem
                service={service}
              />
            </React.Fragment>
          ))}
        </CalculatorContainer>
        {additionHeader && < CalculatorTitle header={additionHeader} className="additional__title" />}
        <div className="calculatorService__container">
          {selects && <SelectServiceItem services={selects} addSelectedService={addSelectedService} />}
        </div>
        <div className="calculator__total">
          <p>Стоимость этапа</p>
          <p>{stepTotalPrice(step)}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
    </div>
  );
})