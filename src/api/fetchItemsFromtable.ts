import axios from "axios";
import producerStore from "../stores/producer-store";
import {
  SelectService,
  SingleService,
} from "../components/Calculator/calculator-types";

export const fetchSingleItems = async (
  tableName: string,
  setSingleServices: (value: SingleService[]) => void
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

    const services = result.data.map((el) => ({
      blackTitle: el.modell,
      price: +el.preis,
    }));

    console.log(services);

    setSingleServices(services);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectItems = async (
  tableName: string,
  setSelectService: (value: SelectService[]) => void
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

    const services = result.data.map((el) => ({
      value: el.modell,
      price: +el.preis,
    }));

    setSelectService([{ select: services }]);
  } catch (error) {
    console.log(error);
  }
};
