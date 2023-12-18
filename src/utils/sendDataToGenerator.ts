import producerStore from "../stores/producer-store";
import stepStore from "../stores/step-store";

export const sendDataToGenerator = () => {
  const { producer } = producerStore;
  const { arraysOfSteps } = stepStore;

  const unavailablePages = [
    "welcome",
    "projectImages",
    "producer",
    "checkout",
    "bravo",
  ];
  const pagesByProducer = arraysOfSteps[producer].filter(
    (page) => !unavailablePages.includes(page)
  );

  const dataToGenerator = pagesByProducer
    .map((page) => sessionStorage.getItem(page))
    .filter((storageItem) => storageItem != null)
    .map((storageItem) => JSON.parse(storageItem || ""));

  if (dataToGenerator.length > 0) {
    console.log(dataToGenerator);
  }
};
