import React, { useEffect, useState } from 'react'

interface Props {
  dcPrice: number,
  acPrice: number,
  projectAndAbschluss: number,
  zusaPrice: number
}
const ProfitTable: React.FC<Props> = ({ dcPrice, acPrice, projectAndAbschluss, zusaPrice }) => {
  //discount tables variables
  const [discount, setDiscount] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0)
  const [fullPrice, setFullPrice] = useState(0)
  const [sellersGain, setSellersGain] = useState(10);
  const [sellingPrice, setSellingPrice] = useState(0);

  useEffect(() => setTotalLoss(discount + sellersGain), [discount, sellersGain])
  useEffect(() => {
    setSellingPrice(dcPrice + acPrice + projectAndAbschluss)
    setFullPrice(dcPrice + acPrice + zusaPrice + projectAndAbschluss)
  }, [acPrice, dcPrice, projectAndAbschluss, zusaPrice])


  return (
    <div className="table-column table-column__third">
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
  )
}

export default ProfitTable
