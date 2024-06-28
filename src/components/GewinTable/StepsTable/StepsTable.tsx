import React from 'react';
import { roundUp } from '../../../utils/calculations';
import { CalculatedSteps } from '../../../types/calculator-types';

interface Props {
  projectAndAbschluss: number,
  calculatorPrices: CalculatedSteps
  additionalBatteries: number
}
const StepsTable: React.FC<Props> = ({ projectAndAbschluss, calculatorPrices, additionalBatteries }) => {
  const {
    acMontage = 0,
    dcMontage = 0,
    inbetriebnahme,
    underConstructions,
    optimizer,
    pvModule,
    zusatzarbeiten = 0,
    invertor = 0,
    cabels = 0,
    iqCombiner = 0,
    battery = 0
  } = calculatorPrices;

  return (
    <div className="table-column table-column__second">
      <table>
        <tbody className="table-steps">
          <tr>
            <td>Projektierung</td>
            <td>{projectAndAbschluss}€</td>
          </tr>
          <tr>
            <td>Installation + Lieferung</td>
            <td>{roundUp(dcMontage + acMontage)}€</td>
          </tr>
          <tr>
            <td>Inbetriebnahme</td>
            <td>{inbetriebnahme}€</td>
          </tr>
          <tr>
            <td>Unterkonstruktion</td>
            <td>{underConstructions}€</td>
          </tr>
          <tr>
            <td>PV-Module</td>
            <td>{pvModule}€</td>
          </tr>
          {optimizer &&
            (<tr>
              <td>Optimierer</td>
              <td>{optimizer}€</td>
            </tr>)
          }
          {iqCombiner && (
            (<tr>
              <td>IQ Combiner 3P EU</td>
              <td>{iqCombiner}€</td>
            </tr>)
          )}

          <tr>
            <td>Wechselrichter + Smart Dongle + Smartmeter</td>
            <td>{cabels ? invertor + cabels : invertor}€</td>
          </tr>

          <tr>
            <td>PV-Speicher</td>
            <td>{battery + additionalBatteries}€</td>
          </tr>
          <tr>
            <td>Zusatzarbeiten</td>
            <td>{zusatzarbeiten - additionalBatteries}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StepsTable
