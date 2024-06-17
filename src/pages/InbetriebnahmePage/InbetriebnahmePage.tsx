import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Calculator } from '../../components/Calculator'
import './Inbetriebnahme.scss'

const InbetriebnahmePage = () => {
  return (
    <div className='inbetriebnahmePage'>
      <Header />
      <Calculator header={{ title: "Inbetriebnahme" }} section='Inbetriebnahme' />
      <Footer isCalculator={true} />
    </div>
  )
}

export default InbetriebnahmePage
