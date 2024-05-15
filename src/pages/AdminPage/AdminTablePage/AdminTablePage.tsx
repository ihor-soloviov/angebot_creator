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
            <div className="tableColumn__first">
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
                    <td>6,350.00€</td>
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
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminTablePage
