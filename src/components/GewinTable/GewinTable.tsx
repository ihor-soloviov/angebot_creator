/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import calculatorStore from "../../stores/calculator-store";
import { calculateProfitPrices, calculatePricesBySteps, calculateTotalWorkDc, roundUp, calculateTotalWorkAc } from "../../utils/calculatorData";
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

  const [profit, setProfit] = useState(1.9);

  const [dcPrice, setDcPrice] = useState(0)

  const [techPrice, setTechPrice] = useState(0);
  const [fullCost, setFullCost] = useState(0);

  const [dcWorkPrice, setDcWorkPrice] = useState(0);
  const [mainGewin, setMainGewin] = useState(0);

  const setPricesByGroups = (prices: Record<string, number>) => {
    console.log(prices)
    const { dcPrice, acPrice, zusaPrice } = calculateProfitPrices(prices);
    setDcPrice(dcPrice);

    const techPrice = roundUp(acPrice + dcPrice + projectAndAbschluss);
    setTechPrice(techPrice);
    setFullCost(techPrice + zusaPrice)

  }

  useEffect(() => {
    const prices = calculatePricesBySteps(calculatorData, profit)
    setCalculatorPrices(prices)
    setPricesByGroups(prices);

    const { underConstructions, dcMontage, pvModule } = calculatorData;
    const dcWorks = [...underConstructions, ...dcMontage, ...pvModule];
    const dcWorkPrice = calculateTotalWorkDc(dcWorks, profit)
    setDcWorkPrice(dcWorkPrice)

    //
    const { wallbox, acMontage, optimizer, invertor, inbetriebnahme, battery } = calculatorData;
    const acWorkPrice = calculateTotalWorkAc([...wallbox, ...acMontage, ...optimizer, ...invertor, ...inbetriebnahme, ...battery], profit)
    // const gewin = techPrice - dcWorkPrice - (acWorkPrice +) дописати розрахунок zus work price

  }, [calculatorData, profit])


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
        <SalesTable dcAndProject={dcPrice + projectAndAbschluss} dcWorkPrice={dcWorkPrice} calculatorPrices={calculatorPrices} />
        <StepsTable projectAndAbschluss={projectAndAbschluss} calculatorPrices={calculatorPrices} />
        <ProfitTable
          techPrice={techPrice}
          fullCost={fullCost}
        />
      </div>
    </div>
  )
})

export default GewinTable