import { observer } from "mobx-react-lite"
import stepStore from "../../stores/step-store";
import { stepComponents } from "../../imports";

const AngebotCreatorSteps = observer(
  () => {
    const { appStep: step } = stepStore;
    const Step = stepComponents[step];

    return (
      <main>
        <Step />
      </main>
    )
  }
)

export default AngebotCreatorSteps
