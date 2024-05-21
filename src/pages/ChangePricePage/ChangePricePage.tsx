import { useEffect, useState } from 'react';
import { CalculatorTitle } from '../../components/CalculatorTitle';
import { Header } from '../../components/Header';
import { Partition } from '../../imports';
import "./ChangePrice.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonPrev } from '../../components/Buttons/ButtonPrev';
import { getActualHeader } from '../../utils/getActualHeader';

const ChangePricePage = () => {
  const [actialHeader, setActialHeader] = useState<Partition>({
    title: "",
    description: "",
    href: "",
    className: ""
  })

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

        </div>
        <ButtonPrev adminOnClick={handleBackClick} />
      </div>
    </>
  )
}

export default ChangePricePage
