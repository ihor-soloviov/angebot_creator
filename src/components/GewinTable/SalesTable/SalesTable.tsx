import React, { useEffect, useState } from 'react'
import { calculateExpence, calculatePricesWithoutProfit, roundUp } from '../../../utils/calculatorData'
import { observer } from 'mobx-react-lite'
import calculatorStore from '../../../stores/calculator-store'

interface Props {
  calculatorPrices: Record<string, number>
  dcWorkPrice: number
  dcAndProject: number
}

const SalesTable: React.FC<Props> = observer(({ calculatorPrices, dcAndProject, dcWorkPrice }) => {
  const { calculatorData } = calculatorStore
  const [clearPrice, setClearPrice] = useState(0)
  const [expense, setExpense] = useState(0);


  useEffect(() => {
    if (calculatorPrices) {
      const result = calculatePricesWithoutProfit(calculatorPrices)
      setClearPrice(result)
    }
  }, [calculatorPrices])

  useEffect(() => {
    const result = calculateExpence(calculatorData)
    setExpense(result)
  }, [calculatorData])


  return (
    <div className="table-column table-column__first">
      <table className="table-gewin">
        <thead>
          <tr>
            <th className="grey">Verkaufspreis</th>
            <th className="red">{clearPrice}€</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kosten</td>
            <td>{expense}€</td>
          </tr>
          <tr>
            <td>Verkaufspreis  PV UK+Projektierung</td>
            <td>{dcAndProject}€</td>
          </tr>
          <tr>
            <td>Einkaufspreis</td>
            <td>{dcWorkPrice}€</td>
          </tr>
          <tr>
            <td>Gewinn</td>
            <td>{roundUp(dcAndProject - dcWorkPrice)}0€</td>
          </tr>
          <tr>
            <td>Gewinn in %</td>
            <td>{roundUp((dcAndProject - dcWorkPrice) / dcAndProject * 100)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})

export default SalesTable
