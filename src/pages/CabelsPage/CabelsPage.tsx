import { Header } from '../../components/Header'
import { Calculator } from '../../components/Calculator'
import { Title } from '../../types/calculator-types'
import { Footer } from '../../components/Footer';
import "./CabelsPage.scss"

const title: Title = {
  title: "Enphase Verkabelung",
  description: "Кабели Enphase"
}

const CabelsPage = () => {
  return (
    <div className='cabelsPage'>
      <Header />
      <Calculator
        header={title}
        serviceTableName="cabels"
      />
      <Footer isCalculator={true} />
    </div>
  )
}

export default CabelsPage
