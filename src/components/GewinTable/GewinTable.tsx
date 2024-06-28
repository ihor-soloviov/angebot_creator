/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import calculatorStore from "../../stores/calculator-store";
import { calculateProfitPrices, calculatePricesBySteps, calculateTotalWorkDc, calculateTotalSum, calculateTotalWorkAc, roundUp, getDcWorkPriceArray, getAcWorkPriceArray } from "../../utils/calculations";
import "./GewinTable.scss";
import StepsTable from "./StepsTable/StepsTable";
import ProfitTable from "./ProfitTable/ProfitTable";
import SalesTable from "./SalesTable/SalesTable";
import { AppSteps } from "../../stores/step-store";
import { CalculatedSteps } from "../../types/calculator-types";

const GewinTable = observer(() => {
  const { calculatorData } = calculatorStore;

  //calculatorPrices
  const [calculatorPrices, setCalculatorPrices] = useState<Partial<Record<AppSteps, number>>>({
    [AppSteps.acMontage]: 0,
    [AppSteps.inbetriebnahme]: 0,
    [AppSteps.invertor]: 0,
    [AppSteps.optimizer]: 0,
    [AppSteps.cabels]: 0,
    [AppSteps.battery]: 0,
    [AppSteps.iqCombiner]: 0,
    [AppSteps.dcMontage]: 0,
    [AppSteps.underConstructions]: 0,
    [AppSteps.pvModule]: 0,
    [AppSteps.zusatzarbeiten]: 0
  })

  //main group prices
  const projectAndAbschluss = 175;

  const [profit, setProfit] = useState(1);
  const [dcPrice, setDcPrice] = useState(0);
  const [additionalBatteries, setAdditionalBatteries] = useState(0);
  const [techPrice, setTechPrice] = useState(0);
  const [fullCost, setFullCost] = useState(0);
  const [dcWorkPrice, setDcWorkPrice] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0)
  const [sellersGain, setSellersGain] = useState(10);

  const [mainGewin, setMainGewin] = useState(0);

  const changeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => setDiscount(+e.target.value)
  const changeSellerGain = (e: React.ChangeEvent<HTMLInputElement>) => setSellersGain(+e.target.value)
  const changeTotalLoss = (e: React.ChangeEvent<HTMLInputElement>) => setTotalLoss(+e.target.value)

  useEffect(() => setTotalLoss(discount + sellersGain), [discount, sellersGain])

  const setPricesByGroups = (prices: CalculatedSteps) => {
    const { dcPrice, acPrice, zusaPrice } = calculateProfitPrices(prices);
    const techPrice = acPrice + dcPrice + projectAndAbschluss;
    let additionalBatteriesPrice = 0;

    if (calculatorData.zusatzarbeiten) {
      const additionalBatteries = calculatorData.zusatzarbeiten.filter(el => el.description && el.description === 'дополнительные батареи');
      additionalBatteriesPrice = calculateTotalSum(additionalBatteries)
    }

    setAdditionalBatteries(additionalBatteriesPrice);

    setDcPrice(dcPrice);
    setTechPrice(techPrice);
    setFullCost(techPrice + zusaPrice)

  }

  useEffect(() => {
    const prices = calculatePricesBySteps(calculatorData, profit)
    setCalculatorPrices(prices)
    setPricesByGroups(prices);

    const dcWorks = getDcWorkPriceArray(calculatorData);
    const dcWorkPrice = calculateTotalWorkDc(dcWorks)
    setDcWorkPrice(dcWorkPrice)

    const acWorks = getAcWorkPriceArray(calculatorData);
    const acWorkPrice = calculateTotalWorkAc(acWorks) + 200;

    const { zusatzarbeiten } = calculatorData;
    let additionalBatteries = 0;

    if (zusatzarbeiten) {
      additionalBatteries = calculateTotalWorkAc([...zusatzarbeiten]);
    }
    const priceWithAllLosses = roundUp(techPrice - (techPrice * totalLoss / 100))
    const gewin = priceWithAllLosses - dcWorkPrice - acWorkPrice - projectAndAbschluss + additionalBatteries;
    setMainGewin(roundUp(gewin))

  }, [calculatorData, profit, totalLoss, techPrice])


  return (
    <div className="tables__wrapper">
      <div className="giwennfaktor__inner">
        <p>Rabatt</p>
        <div className="giwennfaktor">
          <input
            type="number"
            pattern="^\d*(\.\d{0,2})?$"
            value={profit}
            onChange={(e) => setProfit(+e.target.value)}
          />
        </div>
      </div>
      <div className="tables__inner">
        <SalesTable
          dcAndProject={dcPrice + projectAndAbschluss}
          dcWorkPrice={dcWorkPrice}
        />
        <StepsTable
          additionalBatteries={additionalBatteries}
          projectAndAbschluss={projectAndAbschluss}
          calculatorPrices={calculatorPrices}
        />
        <ProfitTable
          techPrice={techPrice}
          fullCost={fullCost}
          discount={discount}
          changeDiscount={changeDiscount}
          mainGewin={mainGewin}
          sellersGain={sellersGain}
          totalLoss={totalLoss}
          changeSellerGain={changeSellerGain}
          changeTotalLoss={changeTotalLoss}
        />
      </div>
    </div>
  )
})

export default GewinTable