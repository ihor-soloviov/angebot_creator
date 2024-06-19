
import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import calculatorStore from "../../stores/calculator-store";
import { calculatePrices } from "../../utils/calculatorData";
import "./GewinTable.scss";

const GewinTable = observer(() => {
  const { calculatorData } = calculatorStore;

  //calculatorPrices
  // const [calculatorPrices, setCalculatorPrices] = useState({
  //   acMontage: 0,
  //   inbetriebnahme: 0,
  //   invertor: 0,
  //   optimizer: 0,
  //   battery: 0,
  //   dcMontage: 0,
  //   underConstructions: 0,
  //   pvModule: 0,
  //   zusatzarbeiten: 0
  // })

  //main step prices
  const projectAndAbschluss = 175;
  const [dcPrice, setDcPrice] = useState(0)
  const [acPrice, setAcPrice] = useState(0)
  const [profit, setProfit] = useState(1.9);
  const [zusatzarbeiten, setZusatzarbeiten] = useState(0);

  //discount tables variables
  const [discount, setDiscount] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0)
  const [fullPrice, setFullPrice] = useState(0)
  const [sellersGain, setSellersGain] = useState(10);
  const [sellingPrice, setSellingPrice] = useState(0);

  const setter = useCallback(() => {
    console.log(toJS(calculatorData))
    const { dcPrice, acPrice, zusaPrice } = calculatePrices(calculatorData, profit);
    setDcPrice(dcPrice);
    setAcPrice(acPrice)
    setZusatzarbeiten(zusaPrice)
    setSellingPrice(dcPrice + acPrice + projectAndAbschluss)
    setFullPrice(dcPrice + acPrice + zusaPrice + projectAndAbschluss)
  }, [calculatorData, profit])

  useEffect(() => setter(), [profit, setter])
  useEffect(() => setTotalLoss(discount + sellersGain), [discount, sellersGain])

  return (
    <div className="tablesWrapper">
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
        <div className="tableColumn tableColumn__first">
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
        <div className="tableColumn tableColumn__second">
          <table>
            <tbody className="table-steps">
              <tr>
                <td>1. Projektierung</td>
                <td>{projectAndAbschluss}€</td>
              </tr>
              <tr>
                <td>2. Installation + Lieferung</td>
                <td>€</td>
              </tr>
              <tr>
                <td>3. Inbetriebnahme</td>
                <td>€</td>
              </tr>
              <tr>
                <td>4. Unterkonstruktion</td>
                <td>3,674.59€</td>
              </tr>
              <tr>
                <td>5. PV-Module</td>
                <td>3,876.75€</td>
              </tr>
              <tr>
                <td>6. Optimierer</td>
                <td>0.00€</td>
              </tr>
              <tr>
                <td>7. Wechselrichter + Smart Dongle + Smartmeter</td>
                <td>2,002.43€</td>
              </tr>
              <tr>
                <td>8. PV-Speicher</td>
                <td>3,204.86€</td>
              </tr>
              <tr>
                <td>Zusatzarbeiten</td>
                <td>0.00€</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tableColumn tableColumn__third">
          <table className="table-profit">
            <tbody>
              <tr>
                <td>Verkaufspreis</td>
                <td className="light-red">{sellingPrice} €</td>
                <td></td>
              </tr>
              <tr>
                <td>abzgl. Skonto</td>
                <td className="table__discount">{sellingPrice - (sellingPrice * discount / 100)} €</td>
                <td className="table__profit">7,328.64€</td>
              </tr>
              <tr>
                <td>abzgl. Vertrieb</td>
                <td className="table__distribution">{sellingPrice - (sellingPrice * sellersGain / 100)} €</td>
                <td className="table__profit">5,913.49€</td>
              </tr>
              <tr>
                <td>abzgl. Vertrieb + Skonto</td>
                <td className="table__distribution_discount">{sellingPrice - (sellingPrice * totalLoss / 100)} €</td>
                <td className="table__profit light-red">5,913.49€</td>
              </tr>
            </tbody>
          </table>

          <table className="table-discount">
            <thead>
              <tr className="grey">
                <th>Skonto</th>
                <th>abzgl. Vertrieb</th>
                <th>abzgl. Vertrieb + Skonto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input value={discount} onChange={(e) => setDiscount(+e.target.value)} />
                  %
                </td>
                <td className="red white-color">
                  <input className="red white-color" value={sellersGain} onChange={(e) => setSellersGain(+e.target.value)} />
                  %
                </td>
                <td>
                  <input value={totalLoss} onChange={(e) => setTotalLoss(+e.target.value)} />
                  %
                </td>
              </tr>

            </tbody>
          </table>

          <div className="fullPrice">
            <p>{fullPrice} €</p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GewinTable