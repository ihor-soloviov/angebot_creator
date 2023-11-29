import { WelcomePage } from "./pages/WelcomePage";
import { AngebotTypePage } from "./pages/AngebotTypePage";
import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { PvsolFilePage } from "./pages/PvsolFilePage";
import { ProducerPage } from "./pages/ProducerPage";

export const App: React.FC = observer(() => {
  const { step } = stepStore;
  console.log(step)

  const switchComponent = () => {
    switch (step) {
      case 1:
        return <WelcomePage />;

      case 2:
        return (
          <AngebotTypePage />
        );

      case 3:
        return (
          <PvsolFilePage />
        );

      case 4:
        return (
          <ProducerPage />
        )
    }
  }

  return (
    <main>{switchComponent()}</main>
  )
})