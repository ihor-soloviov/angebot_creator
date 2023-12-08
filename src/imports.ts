import { AngebotTypePage } from "./pages/AngebotTypePage";
import { BackupBoxPage } from "./pages/BackupBoxPage";
import { BatteryPage } from "./pages/BatteryPage";
import { InvertorPage } from "./pages/InvertorPage";
import { IqCombinerPage } from "./pages/IqCombinerPage";
import { MontagePage } from "./pages/MontagePage";
import { OptimizerPage } from "./pages/OptimizerPage";
import { ProducerPage } from "./pages/ProducerPage";
import { PvModulePage } from "./pages/PvModulePage";
import { PvsolFilePage } from "./pages/PvsolFilePage";
import { TaubenschutzPage } from "./pages/TaubenschutzPage";
import { UnderConstructionsPage } from "./pages/UnderConstructionsPage";
import { WallboxPage } from "./pages/WallboxPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ZusatzarbeitenPage } from "./pages/ZusatzarbeitenPage";
import { Steps } from "./stores/step-store";

export const stepComponents = {
  [Steps.welcome]: WelcomePage,
  [Steps.angebotType]: AngebotTypePage,
  [Steps.pvsolFile]: PvsolFilePage,
  [Steps.producer]: ProducerPage,
  [Steps.montage]: MontagePage,
  [Steps.underConstructions]: UnderConstructionsPage,
  [Steps.pvModule]: PvModulePage,
  [Steps.optimizer]: OptimizerPage,
  [Steps.invertor]: InvertorPage,
  [Steps.iqCombiner]: IqCombinerPage,
  [Steps.battery]: BatteryPage,
  [Steps.wallbox]: WallboxPage,
  [Steps.backupBox]: BackupBoxPage,
  [Steps.taubenschutz]: TaubenschutzPage,
  [Steps.zusatzarbeiten]: ZusatzarbeitenPage,
};
