import React from 'react';
import { roundUp } from '../../../utils/calculatorData';

interface Props {
  projectAndAbschluss: number,
  calculatorPrices: Record<string, number>
}
const StepsTable: React.FC<Props> = ({ projectAndAbschluss, calculatorPrices }) => {
  const {
    acMontage,
    dcMontage,
    inbetriebnahme,
    underConstructions,
    optimizer,
    pvModule,
    zusatzarbeiten,
    invertor,
    battery
  } = calculatorPrices;

  return (
    <div className="table-column table-column__second">
      <table>
        <tbody className="table-steps">
          <tr>
            <td>1. Projektierung</td>
            <td>{projectAndAbschluss}€</td>
          </tr>
          <tr>
            <td>2. Installation + Lieferung</td>
            <td>{roundUp(dcMontage + acMontage)}€</td>
          </tr>
          <tr>
            <td>3. Inbetriebnahme</td>
            <td>{inbetriebnahme}€</td>
          </tr>
          <tr>
            <td>4. Unterkonstruktion</td>
            <td>{underConstructions}€</td>
          </tr>
          <tr>
            <td>5. PV-Module</td>
            <td>{pvModule}€</td>
          </tr>
          <tr>
            <td>6. Optimierer</td>
            <td>{optimizer}€</td>
          </tr>
          <tr>
            <td>7. Wechselrichter + Smart Dongle + Smartmeter</td>
            <td>{invertor}€</td>
          </tr>
          <tr>
            <td>8. PV-Speicher</td>
            <td>{battery}€</td>
          </tr>
          <tr>
            <td>Zusatzarbeiten</td>
            <td>{zusatzarbeiten}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StepsTable
