import { BravoPage } from "./pages/BravoPage";
import { AngebotTypePage } from "./pages/AngebotTypePage";
import { BackupBoxPage } from "./pages/BackupBoxPage";
import { BatteryPage } from "./pages/BatteryPage";
import { CheckoutPage } from "./pages/CheckoutPage";
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
import { ZusatzarbeitenPage } from "./pages/ZusatzarbeitenPage";
import { Steps } from "./stores/step-store";
import { ProjectImagesPage } from "./pages/ProjectImagesPage";
import { Title } from "./components/Calculator/calculator-types";

export const stepComponents = {
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
  [Steps.checkout]: CheckoutPage,
  [Steps.bravo]: BravoPage,
  [Steps.projectImages]: ProjectImagesPage,
};

export type Partition = Title & {
  href: string;
  className: string;
};

export const partitions: Partition[] = [
  {
    title: "Projektierung",
    description: "Планирование проекта",
    href: "projectPlanning",
    className: "checkoutLink",
  },
  {
    title: "Installation + Lieferung",
    description: "Монтаж + доставка",
    href: "install-delivery",
    className: "checkoutLink",
  },
  {
    title: "Inbetriebnahme",
    description: "Ввод в эксплуатацию",
    href: "install-start",
    className: "checkoutLink",
  },
  {
    title: "Unterkonstruktion",
    description: "Подконструкция",
    href: "subconstructions",
    className: "checkoutLink",
  },
  {
    title: "Компоненты",
    description: "Компоненты",
    href: "components",
    className: "checkoutLink interTigth",
  },
  {
    title: "Taubenschutz",
    description: "Защита от голубей",
    href: "birdsProtection",
    className: "checkoutLink",
  },
  {
    title: "Zusatzarbeiten",
    description: "Доп. услуги",
    href: "extraWork",
    className: "checkoutLink",
  },
];
