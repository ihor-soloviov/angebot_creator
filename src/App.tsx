import { WelcomePage } from "./pages/WelcomePage";
import { AngebotTypePage } from "./pages/AngebotTypePage";
import { observer } from "mobx-react-lite";
import stepStore from "./stores/step-store";
import { PvsolFilePage } from "./pages/PvsolFilePage";
import { ProducerPage } from "./pages/ProducerPage";
import { MontagePage } from "./pages/MontagePage";
import { UnderConstructionsPage } from "./pages/UnderConstructionsPage";
import { PvModulePage } from "./pages/PvModulePage";
import { OptimizerPage } from "./pages/OptimizerPage";
import { InvertorPage } from "./pages/InvertorPage";
import { IqCombiner } from "./pages/IqCombiner";
import { BatteryPage } from "./pages/BatteryPage";
import { WallboxPage } from "./pages/WallboxPage";
import { BackupBoxPage } from "./pages/BackupBoxPage";
import { ZusatzarbeitenPage } from "./pages/ZusatzarbeitenPage";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

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

      case 5:
        return (
          <MontagePage />
        )

      case 6:
        return (
          <UnderConstructionsPage />
        )

      case 7:
        return (
          <PvModulePage />
        )

      case 8:
        return (
          <OptimizerPage />
        )

      case 9:
        return (
          <InvertorPage />
        )

      case 10:
        return (
          <IqCombiner />
        )

      case 11:
        return (
          <BatteryPage />
        )

      case 12:
        return (
          <WallboxPage />
        )

      case 13:
        return (
          <BackupBoxPage />
        )

      case 14:
        return (
          <ZusatzarbeitenPage />
        )
    }
  }

  return (
    <main>{switchComponent()}</main>
  )
})