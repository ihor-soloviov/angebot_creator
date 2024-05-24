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
import { fetchServicesBySection } from '../../api/fetchItemsFromtable';
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
  const [singleServices, setSingleServices] = useState<IndividualService[]>([])

  const setServicesFromServer = async () => {
    if (actialHeader.title === "") {
      return
    }
    const singleServices = await fetchServicesBySection(actialHeader.title);
    if (!singleServices) {
      return;
    }
    setSingleServices(singleServices.single)
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
          {singleServices && singleServices.map(({ title, description, price }) => (
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
