/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import calculatorStore from "../../stores/calculator-store";
import { calculatePrices, calculateTablePrices } from "../../utils/calculatorData";
import "./GewinTable.scss";
import StepsTable from "./StepsTable/StepsTable";
import ProfitTable from "./ProfitTable/ProfitTable";

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

  //main step prices
  const projectAndAbschluss = 175;
  const [dcPrice, setDcPrice] = useState(0)
  const [acPrice, setAcPrice] = useState(0)
  const [profit, setProfit] = useState(1.9);
  const [zusatzarbeiten, setZusatzarbeiten] = useState(0);

  const setter = useCallback(() => {
    const { dcPrice, acPrice, zusaPrice } = calculatePrices(calculatorPrices);
    setDcPrice(dcPrice);
    setAcPrice(acPrice)
    setZusatzarbeiten(zusaPrice)

  }, [calculatorPrices])

  useEffect(() => {
    setCalculatorPrices(calculateTablePrices(calculatorData, profit))
    setTimeout(() => {
      setter();
    }, 500);
  }, [calculatorData, profit])


  return (
    <div className="tables__wrapper">
      <div className="giwennfaktor__inner">
        <p>Rabbat</p>
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
        <div className="table-column table-column__first">
          <table className="table-gewin">
            <thead>
              <tr>
                <th className="grey">Verkaufspreis</th>
                <th className="red">{acPrice + dcPrice + zusatzarbeiten}€</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kosten</td>
                <td>10,108.00€</td>
              </tr>
              <tr>
                <td>Einkaufspreis</td>
                <td>10,108.00€</td>
              </tr>
              <tr>
                <td>Gewinn</td>
                <td>9,352.00€</td>
              </tr>
              <tr>
                <td>Gewinn in %</td>
                <td>48,06%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <StepsTable projectAndAbschluss={projectAndAbschluss} calculatorPrices={calculatorPrices} />
        <ProfitTable dcPrice={dcPrice} acPrice={acPrice} zusaPrice={zusatzarbeiten} projectAndAbschluss={projectAndAbschluss} />
      </div>
    </div>
  )
})

export default GewinTable