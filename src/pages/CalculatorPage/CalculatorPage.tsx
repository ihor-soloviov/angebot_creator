import { observer } from 'mobx-react-lite';
import stepStore from '../../stores/step-store';
import { stepComponents } from '../../imports';

const CalculatorPage = observer(
  () => {
    const { appStep } = stepStore;

    const Step = stepComponents[appStep];
    return (
      <main><Step /></main>
    )
  }
)

export default CalculatorPage
