import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { stepComponents } from "./imports";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

  const switchComponent = () => {
    const Component = stepComponents[step];
    return <Component />;
  };


  return (
    <main>{switchComponent()}</main>
  )
})