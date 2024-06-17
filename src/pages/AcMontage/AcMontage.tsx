import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer";
import { Calculator } from "../../components/Calculator";
import { Title } from '../../types/calculator-types';
import "./acMontage.scss";

const title: Title = {
  title: "AC Montage",
}

const AcMontage = () => {
  return (
    <div className='acMontagePage'>
      <Header />
      <Calculator header={title} section="Elektromontage" />
      <Footer isCalculator={true} />
    </div>
  )
}

export default AcMontage
