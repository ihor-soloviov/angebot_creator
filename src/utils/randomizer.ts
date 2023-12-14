import {
  SingleService,
} from "../components/Calculator/calculator-types";

export const generateUniqueThreeDigitNumber = (
  objectsArray: SingleService[]
) => {
  let randomNumber;
  if (objectsArray.length === 0) {
    return 1;
  }

  const isIdExists = (number: number) =>
    objectsArray.some((obj: SingleService) => obj.id === number);

  do {
    randomNumber = Math.floor(Math.random() * 900) + 100; // Генерує число від 100 до 999
  } while (isIdExists(randomNumber));

  return randomNumber;
};
