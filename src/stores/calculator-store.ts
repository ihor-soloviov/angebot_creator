import { makeAutoObservable } from "mobx";
import { IndividualService } from "../types/calculator-types";

export enum AngebotType {
  previous = "Vorläufiges Angebot",
  analyse = "Wirtschaftsanalyse",
  oriented = "Richtpreisangebot",
  individual = 'Individuelles Angebot',
  default = "",
}

export interface PvsolFileItem {
  title: string;
  price: string;
  measurement: string;
}

class CalculatorStore {
  calculatorData: { [key: string]: IndividualService[] } = {};
  angebotData: { [key: string]: IndividualService[] } = {};
  angebotType: AngebotType = AngebotType.default;
  pvsolFileData: PvsolFileItem[] | null = null;
  pricesTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCount = (
    stepName: string,
    service: IndividualService,
    count: number
  ) => {
    if (!this.calculatorData[stepName]) {
      this.calculatorData[stepName] = [];
    }

    const stepServices = this.calculatorData[stepName];
    const selectedServiceIndex = stepServices.findIndex(
      (s) => s.title === service.title
    );

    if (count > 0) {
      if (selectedServiceIndex === -1) {
        stepServices.push({ ...service, count });
      } else {
        stepServices[selectedServiceIndex].count = count;
      }
    } else {
      if (selectedServiceIndex !== -1) {
        stepServices.splice(selectedServiceIndex, 1);
      }
    }
  };

  get totalPrice() {
    return Object.values(this.calculatorData)
      .flat()
      .reduce((total, service) => {
        const count = service.count || 0;
        return total + service.price * count;
      }, 0);
  }

  stepTotalPrice = (stepName: string) => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.reduce((total, service) => {
      const count = service.count || 0;
      return total + service.price * count;
    }, 0);
  };

  getService = (
    stepName: string,
    serviceTitle: string
  ): IndividualService | undefined => {
    const stepServices = this.calculatorData[stepName] || [];
    return stepServices.find((s) => s.title === serviceTitle);
  };

  setAngebotType = (type: AngebotType) => (this.angebotType = type);

  setPvsolFileData = (dataFromParse: PvsolFileItem[]) =>
    (this.pvsolFileData = dataFromParse);
}

export default new CalculatorStore();


const a = {
  "message": "Angebot successfully created",
  "data": {
    "angebotId": "1166",
    "angebotType": "Wirtschaftsanalyse",
    "montage": [
      {
        "title": "Montage, Verkabelung, Anschluss je Wechselrichter",
        "price": 400,
        "_id": "666af2d5c39d037206dfb921",
        "__v": 0,
        "description": "(монтаж, подключение проводов и подключение самого инвертора)",
        "specific": "single",
        "angebotSection": "Installation + Lieferung",
        "calculatorSection": "Installation + Lieferung",
        "count": 3
      },
      {
        "title": "Montage, Verkabelung, Anschluss je Stromspeicher",
        "price": 400,
        "_id": "666af2d5c39d037206dfb922",
        "__v": 0,
        "description": "(монтаж, подключение проводов и подключение самого оптимайзера)",
        "specific": "single",
        "angebotSection": "Installation + Lieferung",
        "calculatorSection": "Installation + Lieferung",
        "count": 3
      },
      {
        "title": "DC-Montage je Modul",
        "price": 130,
        "_id": "666af2d5c39d037206dfb923",
        "__v": 0,
        "description": "(монтаж на крыше)",
        "specific": "single",
        "angebotSection": "Installation + Lieferung",
        "calculatorSection": "Installation + Lieferung",
        "count": 2
      },
      {
        "title": "5-8m",
        "price": 500,
        "_id": "666af2d5c39d037206dfb925",
        "__v": 0,
        "description": "(леса от 5-8 метров)",
        "specific": "select",
        "angebotSection": "Installation + Lieferung",
        "calculatorSection": "Installation + Lieferung",
        "count": 4
      }
    ],
    "underConstructions": [
      {
        "title": "Quermontage",
        "price": 220,
        "_id": "666af2d5c39d037206dfb927",
        "__v": 0,
        "description": "(модули лежа)",
        "specific": "single",
        "angebotSection": "Unterkonstruktion",
        "calculatorSection": "Unterkonstruktion",
        "count": 2
      },
      {
        "title": "Trapezdach",
        "price": 68,
        "_id": "666af2d5c39d037206dfb929",
        "__v": 0,
        "description": "(трапециевидная крыша)",
        "specific": "single",
        "angebotSection": "Unterkonstruktion",
        "calculatorSection": "Unterkonstruktion",
        "count": 3
      },
      {
        "title": "Hochmontage Alpha",
        "price": 230,
        "_id": "666af2d5c39d037206dfb92b",
        "__v": 0,
        "description": "(высокие монтажные альфа-панели)",
        "specific": "single",
        "angebotSection": "Unterkonstruktion",
        "calculatorSection": "Unterkonstruktion",
        "count": 4
      },
      {
        "title": "Flachdach Alpha",
        "price": 190,
        "_id": "666af2d5c39d037206dfb92d",
        "__v": 0,
        "description": "(плоская кровля Альфа)",
        "specific": "single",
        "angebotSection": "Unterkonstruktion",
        "calculatorSection": "Unterkonstruktion",
        "count": 2
      }
    ],
    "pvModule": [
      {
        "title": "Trina Glas-Glas Module 440W",
        "price": 220,
        "_id": "666af2d5c39d037206dfb92e",
        "__v": 0,
        "description": "(модуль)",
        "specific": "single",
        "angebotSection": "PV-Module",
        "calculatorSection": "PV-Module",
        "count": 4
      },
      {
        "title": "Jolywood JW-HD108N-420W Full black glas-glas",
        "price": 250,
        "_id": "666af2d5c39d037206dfb92f",
        "__v": 0,
        "description": "(модуль)",
        "specific": "single",
        "angebotSection": "PV-Module",
        "calculatorSection": "PV-Module",
        "count": 4
      }
    ],
    "pvsolFileData": null,
    "invertor": [
      {
        "title": "SUN2000-8KTL-M1",
        "price": 1750,
        "_id": "666af2d5c39d037206dfb8fa",
        "__v": 0,
        "producer": "Huawei",
        "calculatorSection": "inverters",
        "angebotSection": "Components",
        "power": "8.800VA",
        "mpp": "2",
        "max_efficiency": "98.6%",
        "guarantee": "10 Jahre*",
        "header": "Wechselrichter",
        "image": "huawei3-10.png",
        "specific": "select",
        "count": 5
      }
    ],
    "optimizer": [
      {
        "title": "SUN2000-450w-P2",
        "price": 70,
        "_id": "666af2d5c39d037206dfb912",
        "__v": 0,
        "producer": "Huawei",
        "calculatorSection": "optimizers",
        "angebotSection": "Components",
        "guarantee": "25 Jahre*",
        "header": "Smart PV Optimizer",
        "image": "450w.png",
        "count": 4,
        "specific": "single"
      }
    ],
    "battery": [
      {
        "title": "LUNA2000-10-S0",
        "price": 5900,
        "_id": "666af2d5c39d037206dfb8ed",
        "__v": 0,
        "producer": "Huawei",
        "calculatorSection": "batteries",
        "angebotSection": "Components",
        "storage": "10kWh",
        "guarantee": "10 Jahre*",
        "header": "Batteriesystem",
        "image": "huawei5-15.png",
        "specific": "select",
        "count": 4
      }
    ],
    "wallbox": [
      {
        "title": "FusionCharge AC 22kW/32A",
        "price": 2000,
        "_id": "666af2d5c39d037206dfb91a",
        "__v": 0,
        "producer": "Huawei",
        "calculatorSection": "wallbox",
        "angebotSection": "Zusatzarbeiten",
        "guarantee": "10 Jahre*",
        "header": "Wallbox",
        "image": "huaweiWall.png",
        "count": 4,
        "specific": "single"
      }
    ],
    "backupBox": [
      {
        "title": "Backup Box-B1 ",
        "price": 1500,
        "_id": "666af2d5c39d037206dfb913",
        "__v": 0,
        "producer": "Huawei",
        "angebotSection": "Zusatzarbeiten",
        "calculatorSection": "other",
        "guarantee": "10 Jahre*",
        "header": "Backup Box",
        "image": "backup.png",
        "count": 3,
        "specific": "single"
      }
    ],
    "taubenschutz": [
      {
        "title": "Material + Montage je Laufmeter",
        "price": 228,
        "_id": "666af2d5c39d037206dfb931",
        "__v": 0,
        "description": "(материал и монтаж за погонный метр)",
        "specific": "single",
        "angebotSection": "Zusatzarbeiten",
        "calculatorSection": "Taubenschutz",
        "count": 6
      }
    ],
    "zusatzarbeiten": [
      {
        "title": "Zählerkasten nach VDE-Norm",
        "price": 2380,
        "_id": "666af2d5c39d037206dfb935",
        "__v": 0,
        "description": "(расходомерная коробка в соответствии со стандартом VDE)",
        "specific": "single",
        "angebotSection": "Zusatzarbeiten",
        "calculatorSection": "Zusatzarbeiten",
        "count": 4
      },
      {
        "title": "Potentialausgleich mit Erdungsspieß setzen",
        "price": 300,
        "_id": "666af2d5c39d037206dfb937",
        "__v": 0,
        "description": "(установить выравнивание потенциалов с помощью заземляющего колышка)",
        "specific": "single",
        "angebotSection": "Zusatzarbeiten",
        "calculatorSection": "Zusatzarbeiten",
        "count": 4
      }
    ],
    "_id": "666c0256f103a0a4ea03c74a",
    "iqCombiner": [],
    "__v": 0
  }
}