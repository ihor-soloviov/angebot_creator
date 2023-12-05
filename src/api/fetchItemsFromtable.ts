import axios from "axios";
import producerStore from "../stores/producer-store";

export const fetchItemsFromTable = async (tableName: string, setter) => {
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
      blackTitle: el.black_title,
      price: +el.preis,
    }));

    setter(services);
  } catch (error) {
    console.log(error);
  }
};
