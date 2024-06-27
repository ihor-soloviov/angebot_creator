/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import calculatorStore from "../../stores/calculator-store";
import { calculateProfitPrices, calculatePricesBySteps, calculateTotalWorkDc, calculateTotalSum, calculateTotalWorkAc, roundUp } from "../../utils/calculatorData";
import "./GewinTable.scss";
import StepsTable from "./StepsTable/StepsTable";
import ProfitTable from "./ProfitTable/ProfitTable";
import SalesTable from "./SalesTable/SalesTable";

const GewinTable = observer(() => {
  const { calculatorData } = calculatorStore;

  //calculatorPrices
  const [calculatorPrices, setCalculatorPrices] = useState<Record<string, number>>({
    acMontage: 0,
    inbetriebnahme: 0,
    invertor: 0,
    optimizer: 0,
    battery: 0,
    dcMontage: 0,
    underConstructions: 0,
    pvModule: 0,
    zusatzarbeiten: 0
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

  const setPricesByGroups = (prices: Record<string, number>) => {
    const { dcPrice, acPrice, zusaPrice } = calculateProfitPrices(prices);
    const techPrice = acPrice + dcPrice + projectAndAbschluss;

    const additionalBatteries = calculatorData.zusatzarbeiten.filter(el => el.description && el.description === 'дополнительные батареи');
    const additionalBatteriesPrice = calculateTotalSum(additionalBatteries)
    setAdditionalBatteries(additionalBatteriesPrice);

    setDcPrice(dcPrice);
    setTechPrice(techPrice);
    setFullCost(techPrice + zusaPrice)

  }

  useEffect(() => {
    const prices = calculatePricesBySteps(calculatorData, profit)
    setCalculatorPrices(prices)
    setPricesByGroups(prices);

    const { underConstructions, dcMontage, pvModule } = calculatorData;
    const dcWorks = [...underConstructions, ...dcMontage, ...pvModule];
    const dcWorkPrice = calculateTotalWorkDc(dcWorks)
    setDcWorkPrice(dcWorkPrice)

    const { wallbox, acMontage, optimizer, invertor, inbetriebnahme, battery, zusatzarbeiten } = calculatorData;
    const acWorkPrice = calculateTotalWorkAc([...acMontage, ...inbetriebnahme, ...optimizer, ...invertor, ...battery, ...zusatzarbeiten, ...wallbox,]) + 200;
    const additionalBatteries = calculateTotalWorkAc([...zusatzarbeiten]);
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