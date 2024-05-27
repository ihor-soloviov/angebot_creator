/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CalculatorTitle } from '../../components/Calculator/CalculatorTitle';
import { Header } from '../../components/Header';
import { Partition } from '../../imports';
import "./ChangePrice.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonPrev } from '../../components/Buttons/ButtonPrev';
import { getActualHeader } from '../../utils/getActualHeader';
import { IndividualService } from '../../components/Calculator/calculator-types';
import { HttpMethod, fetchData, fetchServicesBySection, fetchServicesByTableName } from '../../api/fetchItemsFromtable';
import ServiceWrapper from '../../components/services/ServiceWrapper/ServiceWrapper';
import PriceInput from '../../components/Inputs/PriceInput/PriceInput';
import { ButtonNext } from '../../components/Buttons/ButtonNext';

const ChangePricePage = () => {
  const [actialHeader, setActialHeader] = useState<Partition>({
    title: "",
    description: "",
    href: "",
    className: ""
  })
  const [services, setServices] = useState<IndividualService[]>([])

  const setServicesFromServer = async () => {
    if (actialHeader.title === "") {
      return
    }
    if (actialHeader.title === "Компоненты") {
      const url = `${import.meta.env.BASE_URL}/getAllModules`
      const services = await fetchData(HttpMethod.GET, url)
    }
    const services = await fetchServicesBySection(actialHeader.title);
    if (!services) {
      return;
    }
    setServices(services.single)
  }

  useEffect(() => {
    setServicesFromServer();
  }, [actialHeader.title])

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const headerByHref = getActualHeader(pathname);

    if (headerByHref?.title) {
      setActialHeader(headerByHref)
    }

  }, [pathname])



  return (
    <>
      <Header />
      <div className="changePricePage">
        <div className="changePricePage__wrapper">
          <CalculatorTitle header={actialHeader} />
          {services && services.map(({ title, description, price }) => (
            <React.Fragment key={title}>
              <ServiceWrapper title={title} description={description} >
                <PriceInput currentPrice={+price} />
              </ServiceWrapper>
            </React.Fragment>
          ))}
          <ButtonNext width={394} />
        </div>
        <ButtonPrev adminOnClick={handleBackClick} />
      </div>
    </>
  )
}

export default ChangePricePage
