import { WelcomePage } from "./pages/WelcomePage";
import { AngebotTypePage } from "./pages/AngebotTypePage";
import { observer } from "mobx-react-lite";
import { PvsolFilePage } from "./pages/PvsolFilePage";
import { ProducerPage } from "./pages/ProducerPage";
import { MontagePage } from "./pages/MontagePage";
import { UnderConstructionsPage } from "./pages/UnderConstructionsPage";
import { PvModulePage } from "./pages/PvModulePage";
import { OptimizerPage } from "./pages/OptimizerPage";
import { InvertorPage } from "./pages/InvertorPage";
import { IqCombinerPage } from "./pages/IqCombinerPage";
import { BatteryPage } from "./pages/BatteryPage";
import { WallboxPage } from "./pages/WallboxPage";
import { BackupBoxPage } from "./pages/BackupBoxPage";
import { ZusatzarbeitenPage } from "./pages/ZusatzarbeitenPage";
import { TaubenschutzPage } from "./pages/TaubenschutzPage";
import { SkontoPage } from "./pages/SkontoPage";

import stepStore, { Steps } from "./stores/step-store";

export const App: React.FC = observer(() => {
  const { step } = stepStore;

  const switchComponent = () => {
    switch (step) {
      case Steps.welcome:
        return <WelcomePage />;

      case Steps.angebotType:
        return (
          <AngebotTypePage />
        );

      case Steps.pvsolFile:
        return (
          <PvsolFilePage />
        );

      case Steps.producer:
        return (
          <ProducerPage />
        )

      case Steps.montage:
        return (
          <MontagePage />
        )

      case Steps.underConstructions:
        return (
          <UnderConstructionsPage />
        )

      case Steps.pvModule:
        return (
          <PvModulePage />
        )

      case Steps.optimizer:
        return (
          <OptimizerPage />
        )

      case Steps.invertor:
        return (
          <InvertorPage />
        )

      case Steps.iqCombiner:
        return (
          <IqCombinerPage />
        )

      case Steps.battery:
        return (
          <BatteryPage />
        )

      case Steps.wallbox:
        return (
          <WallboxPage />
        )

      case Steps.backupBox:
        return (
          <BackupBoxPage />
        )

      case Steps.taubenschutz:
        return (
          <TaubenschutzPage />
        )

      case Steps.zusatzarbeiten:
        return (
          <ZusatzarbeitenPage />
        )

      case Steps.skonto:
        return (
          <SkontoPage />
        )
    }
  }

  return (
    <main>{switchComponent()}</main>
  )
})