import React, { useEffect, useState } from 'react'
import { roundUp } from '../../../utils/calculatorData';

interface Props {
  techPrice: number,
  fullCost: number
}
const ProfitTable: React.FC<Props> = ({ techPrice, fullCost }) => {
  //discount tables variables
  const [discount, setDiscount] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0)
  // const [fullPrice, setFullPrice] = useState(0)
  const [sellersGain, setSellersGain] = useState(10);



  useEffect(() => setTotalLoss(discount + sellersGain), [discount, sellersGain])


  return (
    <div className="table-column table-column__third">
      <table className="table-profit">
        <tbody>
          <tr>
            <td>Verkaufspreis</td>
            <td className="light-red">{techPrice} €</td>
            <td></td>
          </tr>
          <tr>
            <td>abzgl. Skonto</td>
            <td className="table__discount">{techPrice - (techPrice * discount / 100)} €</td>
            <td className="table__profit">7,328.64€</td>
          </tr>
          <tr>
            <td>abzgl. Vertrieb</td>
            <td className="table__distribution">{roundUp(techPrice - (techPrice * sellersGain / 100))} €</td>
            <td className="table__profit">5,913.49€</td>
          </tr>
          <tr>
            <td>abzgl. Vertrieb + Skonto</td>
            <td className="table__distribution_discount">{roundUp(techPrice - (techPrice * totalLoss / 100))} €</td>
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
        <p>{roundUp(fullCost)} €</p>
      </div>
    </div>
  )
}

export default ProfitTable
