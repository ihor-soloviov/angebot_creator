/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Partition } from '../../imports';
import "./ChangePrice.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { getActualHeader } from '../../utils/getActualHeader';
import { IndividualService } from '../../components/Calculator/calculator-types';
import { fetchServicesBySection, getComponents } from '../../api/fetchItemsFromtable';
import { CalculatorTitle } from '../../components/Calculator/CalculatorTitle';
import ServiceWrapper from '../../components/services/ServiceWrapper/ServiceWrapper';
import PriceInput from '../../components/Inputs/PriceInput/PriceInput';
import { ButtonNext } from '../../components/Buttons/ButtonNext';
import { ButtonPrev } from '../../components/Buttons/ButtonPrev';

const ChangePricePage = () => {
  const [actualHeader, setActualHeader] = useState<Partition>({
    title: "",
    description: "",
    href: "",
    className: ""
  })

  const [services, setServices] = useState<IndividualService[]>([]);
  const [components, setComponents] = useState<IndividualService[]>([]);

  const setServicesFromServer = async () => {
    const { title } = actualHeader;

    if (title === "Компоненты") {
      const components = await getComponents();
      setComponents(components);
    } else {
      const servicesResult = await fetchServicesBySection(title);
      if (servicesResult) {
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
          {services && services.map(({ title, description, price }) => (
            <React.Fragment key={title}>
              <ServiceWrapper title={title} description={description} >
                <PriceInput currentPrice={+price} />
              </ServiceWrapper>
            </React.Fragment>
          ))}
          {components && components.map(({ title, description, price, producer }) => (
            <React.Fragment key={title}>
              <ServiceWrapper title={`${producer} ${title}`} description={description} >
                <PriceInput currentPrice={+price} />
              </ServiceWrapper>
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
