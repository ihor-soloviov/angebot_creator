import { BravoPage } from "./pages/BravoPage";
import { AngebotTypePage } from "./pages/AngebotTypePage";
import { BatteryPage } from "./pages/BatteryPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { InvertorPage } from "./pages/InvertorPage";
import { IqCombinerPage } from "./pages/IqCombinerPage";
import { DcMontage } from "./pages/DcMontagePage";
import { OptimizerPage } from "./pages/OptimizerPage";
import { ProducerPage } from "./pages/ProducerPage";
import { PvModulePage } from "./pages/PvModulePage";
import { PvsolFilePage } from "./pages/PvsolFilePage";
import { UnderConstructionsPage } from "./pages/UnderConstructionsPage";
import { WallboxPage } from "./pages/WallboxPage";
import { ZusatzarbeitenPage } from "./pages/ZusatzarbeitenPage";
import { AppSteps } from "./stores/step-store";
import { ProjectImagesPage } from "./pages/ProjectImagesPage";
import { Title } from "./types/calculator-types";
import GewinPage from "./pages/GewinPage/GewinPage";
import AcMontage from "./pages/AcMontage/AcMontage";
import InbetriebnahmePage from "./pages/InbetriebnahmePage/InbetriebnahmePage";
import CabelsPage from "./pages/CabelsPage/CabelsPage";

export const stepComponents = {
  [AppSteps.angebotType]: AngebotTypePage,
  [AppSteps.pvsolFile]: PvsolFilePage,
  [AppSteps.projectImages]: ProjectImagesPage,
  [AppSteps.producer]: ProducerPage,
  [AppSteps.dcMontage]: DcMontage,
  [AppSteps.underConstructions]: UnderConstructionsPage,
  [AppSteps.pvModule]: PvModulePage,
  [AppSteps.acMontage]: AcMontage,
  [AppSteps.inbetriebnahme]: InbetriebnahmePage,
  [AppSteps.optimizer]: OptimizerPage,
  [AppSteps.invertor]: InvertorPage,
  [AppSteps.iqCombiner]: IqCombinerPage,
  [AppSteps.cabels]: CabelsPage,
  [AppSteps.battery]: BatteryPage,
  [AppSteps.wallbox]: WallboxPage,
  [AppSteps.zusatzarbeiten]: ZusatzarbeitenPage,
  [AppSteps.checkout]: CheckoutPage,
  [AppSteps.gewin]: GewinPage,
  [AppSteps.bravo]: BravoPage,
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
    title: "Zusatzarbeiten",
    description: "Доп. услуги",
    href: "extraWork",
    className: "checkoutLink",
  },
];
