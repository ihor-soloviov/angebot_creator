/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Partition } from '../../imports';
import { useLocation, useNavigate } from 'react-router-dom';
import { getActualHeader } from '../../utils/getActualHeader';
import { CalculatorItem } from '../../types/calculator-types';
import { fetchServicesBySection as fetchServicesBySection, fetchServices } from '../../api/fetch';
import { CalculatorTitle } from '../../components/Calculator/CalculatorTitle';
import { ButtonNext } from '../../components/Buttons/ButtonNext';
import { ButtonPrev } from '../../components/Buttons/ButtonPrev';
import EditableService from '../../components/services/EditableService/EditableService';
import "./ChangePrice.scss";

const ChangePricePage = () => {
  const [actualHeader, setActualHeader] = useState<Partition>({
    title: "",
    description: "",
    href: "",
    className: ""
  })

  const [services, setServices] = useState<CalculatorItem[]>([]);
  const [components, setComponents] = useState<CalculatorItem[]>([]);

  const setServicesFromServer = async () => {
    const { title } = actualHeader;
    if (!title) {
      return
    }

    if (title === "Компоненты") {
      const components = await fetchServices();
      setComponents(components);
    } else {
      console.log(title)
      const servicesResult = await fetchServicesBySection(title);
      if (servicesResult) {
        console.log(servicesResult)
        setServices(servicesResult.single);
      }
    }
  };

  useEffect(() => {
    setServicesFromServer();
  }, [actualHeader.title])

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const headerByHref = getActualHeader(pathname);

    if (headerByHref?.title) {
      setActualHeader(headerByHref)
    }
  }, [pathname])

  return (
    <>
      <Header />
      <div className="changePricePage">
        <div className="changePricePage__wrapper">
          <CalculatorTitle header={actualHeader} />
          {services && services.map(service => (
            <React.Fragment key={service.title}>
              <EditableService
                title={service.title}
                item={service}
              />
            </React.Fragment>
          ))}
          {components && components.map(component => (
            <React.Fragment key={component.title}>
              <EditableService
                title={`${component.producer} ${component.title}`}
                item={component}
              />
            </React.Fragment>
          ))}
          <ButtonNext width={394} />
        </div >
        <ButtonPrev adminOnClick={handleBackClick} />
      </div>
    </>
  )
}

export default ChangePricePage
