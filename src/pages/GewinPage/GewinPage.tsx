import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import GewinTable from '../../components/GewinTable/GewinTable';
import "./GewinPage.scss";

const GewinPage = () => (
  <div className='gewinPage'>
    <Header />
    <div className="gewinPage__inner">
      <h1>PV-Anglage</h1>
      <GewinTable />
    </div>
    <Footer />
  </div>
)

export default GewinPage