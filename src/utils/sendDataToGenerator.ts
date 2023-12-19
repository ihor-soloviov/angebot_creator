import producerStore from "../stores/producer-store";
import stepStore from "../stores/step-store";
import picturesStore from "../stores/pictures-store";

export const sendDataToGenerator = () => {
  const { producer } = producerStore;
  const { arraysOfSteps } = stepStore;
  const { picObject, picArray } = picturesStore;

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
    .filter((storageItem): storageItem is string => storageItem != null)
    .map((storageItem) => JSON.parse(storageItem));

  if (dataToGenerator.length > 0) {
    console.log(dataToGenerator);
    console.log(picObject);
    console.log(picArray);
  }
};

export const uploadMainImage = async (
  mainPictureOfObject: { mainPictureOfObject: File },
  angebot_id: string
): Promise<void> => {
  const formData = new FormData();
  formData.append("mainImage", mainPictureOfObject.mainPictureOfObject);

  try {
    const response = await fetch(
      `https://api.creator.work-set.eu/mainImage/${angebot_id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Обробка відповіді від сервера
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Upload failed", error);
  }
};