import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header";
import "./AdminTablePage.scss";

const AdminTablePage = () => {
  const { pathname } = useLocation();
  const angebotId = pathname.split('/').reverse()[0]
  return (
    <>
      <Header />
      <div className="adminPage__table">
        <h1>ID {angebotId}</h1>
        <h2>Предварительный рассчет</h2>
        <div className="tablesWrapper">
          <div className="giwennfaktor__inner">
            <p>Gewinnfaktor</p>
            <div className="giwennfaktor">
              <input type="text" value={0.95} />
            </div>
          </div>
          <div className="tables__inner">
            <div className="tableColumn tableColumn__first">
              <table className="table-gewin">
                <thead>
                  <tr>
                    <th className="grey">Verkaufspreis</th>
                    <th className="red">19,460.00€</th>
                  </tr>
                </thead>
                <tbody>
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

              <table className="table-prices">
                <tbody>
                  <tr className="grey">
                    <td>AC-Komponenten Holding Kosten</td>
                    <td className="weight-500">6,350.00€</td>
                  </tr>
                  <tr>
                    <td>AC-Komponenten Energy Kosten:</td>
                    <td>7,430.00€</td>
                  </tr>
                  <tr className="grey">
                    <td>Gewinn Holding:</td>
                    <td>1,080.00€</td>
                  </tr>
                  <tr>
                    <td>Gewinn Energy:</td>
                    <td>4,833.49€</td>
                  </tr>
                  <tr className="grey">
                    <td>UK+Taubenschutz</td>
                    <td>2,860.00€</td>
                  </tr>
                  <tr>
                    <td>ELEKTRO MATERIAL EXTRA</td>
                    <td>0.00€</td>
                  </tr>
                  <tr className="grey">
                    <td>AC Verkaufspreis:</td>
                    <td>9,750.00€</td>
                  </tr>
                  <tr>
                    <td>Gewinn Material Energy:</td>
                    <td>2,320.00€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tableColumn tableColumn__second">
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

              <table className="table-capital">
                <thead>
                  <tr >
                    <th>Kapital, das vorgestreckt <br /> werden muss</th>
                    <th>8,510.00€</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gewinn im Verhältnis zum <br /> vorgestreckten Kaptal</td>
                    <td className="red white-color">32,80%</td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="tableColumn tableColumn__second">
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

              <table className="table-capital">
                <thead>
                  <tr >
                    <th>Kapital, das vorgestreckt <br /> werden muss</th>
                    <th>8,510.00€</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gewinn im Verhältnis zum <br /> vorgestreckten Kaptal</td>
                    <td className="red white-color">32,80%</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="tablesWrapper">
          <div className="tablesFinal__inner">
            <div className="tableColumn">
              <table>
                <tbody className="table-steps">
                  <tr>
                    <td>1. Projektierung</td>
                    <td>500.00€</td>
                  </tr>
                  <tr>
                    <td>2. Installation + Lieferung</td>
                    <td>4,710.00€</td>
                  </tr>
                  <tr>
                    <td>3. Inbetriebnahme</td>
                    <td>900.00€</td>
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
                    <td>9. Wallbox</td>
                    <td>3,204.86€</td>
                  </tr>
                  <tr>
                    <td>10. Notstromlösung</td>
                    <td>0.00€</td>
                  </tr>
                  <tr>
                    <td>11. Gateway</td>
                    <td>0.00€</td>
                  </tr>
                  <tr>
                    <td>12. Taubenschutz</td>
                    <td>0.00€</td>
                  </tr>
                  <tr>
                    <td>13. Zusatzarbeiten</td>
                    <td>0.00€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tableColumn finalTableColumn">
              <h3>Предварительный рассчет</h3>
              <table className="table-pre-calculation">
                <thead>
                  <tr className="grey">
                    <th></th>
                    <th></th>
                    <th>Разница</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Verkaufspreis</td>
                    <td>14,595.00€</td>
                    <td>8,122.00€</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Verkaufspreis(Skonto)</td>
                    <td>14,595.00€</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminTablePage
