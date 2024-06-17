import { observer } from 'mobx-react-lite'
import "./GewinPage.scss";
import { Header } from '../../components/Header';
import { useState } from 'react';
import { Footer } from '../../components/Footer';

const GewinPage = observer(() => {
  const [dcPrice, setDcPrice] = useState(6316)
  const [acPrice, setAcPrice] = useState(9559)
  const [zusatzarbeiten, setZusatzarbeiten] = useState(3790);
  const [projectAndAbschluss, setProjectAndAbschluss] = useState(175)

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
                  <td className="light-red">11,868.64€</td>
                  <td></td>
                </tr>
                <tr>
                  <td>abzgl. Skonto</td>
                  <td className="table__discount">11,868.64€</td>
                  <td className="table__profit">7,328.64€</td>
                </tr>
                <tr>
                  <td>abzgl. Vertrieb</td>
                  <td className="table__distribution">17,453.49€</td>
                  <td className="table__profit">5,913.49€</td>
                </tr>
                <tr>
                  <td>abzgl. Vertrieb + Skonto</td>
                  <td className="table__distribution_discount">17,453.49€</td>
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
                  <td className="red white-color">8%</td>
                  <td>8%</td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className="gewinPage__total">
            {dcPrice + acPrice + zusatzarbeiten + projectAndAbschluss - 2190} €
          </div>
          <div className="gewinPage__rabbat--wrap">
            <div className='gewinPage__rabbat'>
              <p>Rabbat</p>
              <input type="number" pattern="^\d*(\.\d{0,2})?$" value={0} />
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
})

export default GewinPage
