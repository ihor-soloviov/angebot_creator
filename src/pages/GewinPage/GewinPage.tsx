import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx'
import "./GewinPage.scss";
import { Header } from '../../components/Header';
import { useCallback, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import calculatorStore from '../../stores/calculator-store';
import { CalculatorData, IndividualService } from '../../types/calculator-types';

const profitChangePriceArray = [
  "DC-Montage je Modul",
  "Montage & Verkabelung je Wechselrichter",
  "Montage & Verkabelung je Stromspeicher"
];

const calculateTotalSum = (arr: IndividualService[], profit: number) => {
  if (arr.length === 0) {
    return 0
  }
  return arr.reduce((total, item) => {
    const price = profitChangePriceArray.includes(item.title) ? item.price * profit : item.price;
    const count = item.count || 1;
    return total + (price * count);
  }, 0);
};

const calculatePrices = (calculatorData: CalculatorData, profit: number) => {
  const travelCost = 500;
  let dcPrice = travelCost;
  let acPrice = 0;
  let zusaPrice = 0;

  Object.entries(calculatorData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const totalSum = calculateTotalSum(value, profit);
      if (['dcMontage', 'underConstructions', 'pvModule'].includes(key)) {
        dcPrice += totalSum;
      } else if (['acMontage', 'inbetriebnahme', 'invertor', 'optimizer', 'battery'].includes(key)) {
        acPrice += totalSum;
      } else if (key === 'zusatzarbeiten') {
        zusaPrice += totalSum;
      }
    }
  });

  return { dcPrice, acPrice, zusaPrice };
};

const GewinPage = observer(() => {
  const { calculatorData } = calculatorStore;

  //main step prices
  const [zusatzarbeiten, setZusatzarbeiten] = useState(0);
  const [dcPrice, setDcPrice] = useState(0)
  const [acPrice, setAcPrice] = useState(0)
  const [profit, setProfit] = useState(1.9);
  const projectAndAbschluss = 175;

  //discount tables variables
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [sellersGain, setSellersGain] = useState(10);
  const [totalLoss, setTotalLoss] = useState(0)

  const changeProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfit(+e.target.value)
  }

  const setter = useCallback(
    () => {
      console.log(toJS(calculatorData))
      const { dcPrice, acPrice, zusaPrice } = calculatePrices(calculatorData, profit);
      setDcPrice(dcPrice);
      setAcPrice(acPrice)
      setZusatzarbeiten(zusaPrice)
      setSellingPrice(dcPrice + acPrice + zusaPrice + projectAndAbschluss)
    }, [calculatorData, profit]
  )

  useEffect(() => {
    setter()
  }, [profit, setter])

  useEffect(() => {
    setTotalLoss(discount + sellersGain)
  }, [discount, sellersGain])



  return (
    <div className='gewinPage'>
      <Header />
      <div className="gewinPage__inner">

        <div className="gewinPage__tables--wrap">
          <h1>PV-ANLAGE</h1>
          <div className="gewinPage__tables">
            <table className="table-profit">
              <thead>
                <tr className="grey">
                  <th></th>
                  <th></th>
                  <th className="weight-500">Gewinn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Verkaufspreis</td>
                  <td className="light-red" title="ціна продажу">{sellingPrice}€</td>
                  <td></td>
                </tr>
                <tr>
                  <td>abzgl. Skonto</td>
                  <td className="table__discount" title="мінус знижка готівкою">{sellingPrice - (sellingPrice * discount / 100)}€</td>
                  <td className="table__profit">7,328.64€</td>
                </tr>
                <tr>
                  <td>abzgl. Vertrieb</td>
                  <td className="table__distribution">{sellingPrice - (sellingPrice * sellersGain / 100)}€</td>
                  <td className="table__profit">5,913.49€</td>
                </tr>
                <tr>
                  <td>abzgl. Vertrieb + Skonto</td>
                  <td className="table__distribution_discount">{sellingPrice - (sellingPrice * totalLoss / 100)}€</td>
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
                  <td>0%</td>
                  <td className="red white-color">{sellersGain}%</td>
                  <td>{totalLoss}%</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className="gewinPage__total">
            {dcPrice + acPrice + zusatzarbeiten + projectAndAbschluss} €
          </div>
          <div className="gewinPage__rabbat--wrap">
            <div className='gewinPage__rabbat'>
              <p>Rabbat</p>
              <input type="number" pattern="^\d*(\.\d{0,2})?$" value={profit} onChange={changeProfit} />
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
})

export default GewinPage
