import React, { useEffect, useState } from 'react'
import { calculateExpence, calculatePricesBySteps, calculatePricesWithoutProfit, roundUp } from '../../../utils/calculatorData'
import { observer } from 'mobx-react-lite'
import calculatorStore from '../../../stores/calculator-store'

interface Props {
  dcWorkPrice: number
  dcAndProject: number
}

const SalesTable: React.FC<Props> = observer(({ dcAndProject, dcWorkPrice }) => {
  const { calculatorData } = calculatorStore
  const [clearPrice, setClearPrice] = useState(0)
  const [expense, setExpense] = useState(0);


  useEffect(() => {
    const prices = calculatePricesBySteps(calculatorData);
    const result = calculatePricesWithoutProfit(prices)
    setClearPrice(result)

  }, [calculatorData])

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
            <td>{roundUp(dcAndProject - dcWorkPrice)}€</td>
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
