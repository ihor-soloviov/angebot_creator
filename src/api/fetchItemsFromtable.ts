import axios from "axios";
import producerStore from "../stores/producer-store";
import {
  SelectService,
  SingleService,
} from "../components/Calculator/calculator-types";

type El = {
  modell: string;
  preis: string;
};

export const fetchSingleItems = async (
  tableName: string,
  setSingleServices: (value: SingleService[]) => void,
  brand = ""
) => {
  const { producer } = producerStore;

  try {
    const link =
      brand !== ""
        ? `http://185.25.119.143:8082/getTable?table_name=${tableName}&hersteller=${brand}`
        : `http://185.25.119.143:8082/getTable?table_name=${tableName}&hersteller=${producer}`;

    const result = await axios.get(link, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    const services = result.data.map((el: El) => ({
      blackTitle: el.modell,
      price: +el.preis,
    }));

    setSingleServices(services);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectItems = async (
  tableName: string,
  setSelectService: (value: SelectService) => void
) => {
  const { producer } = producerStore;
  try {
    const result = await axios.get(
      `http://185.25.119.143:8082/getTable?table_name=${tableName}&hersteller=${producer}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    const services = result.data.map((el: El) => ({
      value: el.modell,
      price: +el.preis,
    }));

    console.log(services);

    setSelectService({ select: services });
  } catch (error) {
    console.log(error);
  }
};
