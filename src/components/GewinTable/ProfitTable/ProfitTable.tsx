import React from 'react'
import { roundUp } from '../../../utils/calculatorData';

interface Props {
  techPrice: number,
  fullCost: number
  discount: number,
  changeDiscount: (e: React.ChangeEvent<HTMLInputElement>) => void
  changeSellerGain: (e: React.ChangeEvent<HTMLInputElement>) => void
  changeTotalLoss: (e: React.ChangeEvent<HTMLInputElement>) => void
  mainGewin: number
  sellersGain: number
  totalLoss: number
}
const ProfitTable: React.FC<Props> = ({ techPrice, fullCost, discount, changeDiscount, mainGewin, sellersGain, totalLoss, changeSellerGain, changeTotalLoss }) => {

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
            <td className="table__profit"></td>
          </tr>
          <tr>
            <td>abzgl. Vertrieb</td>
            <td className="table__distribution">{roundUp(techPrice - (techPrice * sellersGain / 100))} €</td>
            <td className="table__profit"></td>
          </tr>
          <tr>
            <td>abzgl. Vertrieb + Skonto</td>
            <td className="table__distribution_discount">{roundUp(techPrice - (techPrice * totalLoss / 100))} €</td>
            <td className="table__profit light-red">{mainGewin}€</td>
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
              <input value={discount} onChange={changeDiscount} />
              %
            </td>
            <td className="red white-color">
              <input className="red white-color" value={sellersGain} onChange={changeSellerGain} />
              %
            </td>
            <td>
              <input value={totalLoss} onChange={changeTotalLoss} />
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
