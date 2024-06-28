/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { CalculatorTitle } from "./CalculatorTitle";
import { ButtonNext } from "../Buttons/ButtonNext";
import { DropdownItems, CalculatorItem, Title } from "../../types/calculator-types";
import { fetchServicesBySection, fetchComponentsBySection } from "../../api/fetch";
import { formatSelectServices, formatSingleServices } from "../../utils/formatService";
import { observer } from "mobx-react-lite";
import producerStore from "../../stores/producer-store";
import calculatorStore from "../../stores/calculator-store";
import CalculatorContainer from "./CalculatorContainer/CalculatorContainer";
import { SingleServiceItem } from "../services/SingleServiceItem";
import { SelectServiceItem } from "../services/SelectServiceItem";
import stepStore, { AppSteps } from "../../stores/step-store";
import "./Calculator.scss";

interface Props {
  header: Title
  additionHeader?: Title
  selectsTable?: string
  serviceTableName?: string
  section?: string
}

export const Calculator: React.FC<Props> = observer(({
  header,
  selectsTable,
  serviceTableName,
  section
}) => {
  const { producer } = producerStore;
  const { appStep } = stepStore
  const { stepTotalPrice, getService } = calculatorStore;

  const [services, setServices] = useState<CalculatorItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<CalculatorItem[]>([])
  const [selects, setSelects] = useState<DropdownItems | null>(null);
  const addSelectedService = (service: CalculatorItem) => {
    setSelectedServices(prev => [...prev, service])
  }

  const setServicesByTables = useCallback(
    () => {
      if (section) {
        fetchServicesBySection(section, producer).then(({ single, select }): void => {
          const synchronizedServices = synchronizeServices(single, appStep);
          const synchronizedSelects = synchronizeServices(select, appStep).filter(service => service.count)
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
          const formattedServices = formatSingleServices(res);
          const synchronizedServices = synchronizeServices(formattedServices, appStep);
          setServices(synchronizedServices);
        });
      }
      if (selectsTable) {
        fetchComponentsBySection(selectsTable).then((res): void => {
          const selectServices = formatSelectServices(res);
          const synchronizedSelects = synchronizeServices(selectServices, appStep).filter(service => service.count)
          setSelectedServices(synchronizedSelects)
          setSelects({ options: selectServices })
        }
        )
      }
    },
    [],
  )

  const synchronizeServices = (fetchedServices: CalculatorItem[], stepName: AppSteps): CalculatorItem[] => {
    return fetchedServices.map(service => {
      const existingService = getService(stepName, service._id);
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
        <div className="calculatorService__container">
          {selects && <SelectServiceItem services={selects} addSelectedService={addSelectedService} />}
        </div>
        <div className="calculator__total">
          <p>Стоимость этапа</p>
          <p>{stepTotalPrice(appStep)}.00€</p>
        </div>
        <ButtonNext width={394} />
      </div>
    </div>
  );
})