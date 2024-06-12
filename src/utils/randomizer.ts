import { IndividualService } from "../types/calculator-types";

export const generateUniqueThreeDigitNumber = (
  objectsArray: IndividualService[]
) => {
  let randomNumber;
  if (objectsArray.length === 0) {
    return 1;
  }

  const isIdExists = (number: number) =>
    objectsArray.some((obj: IndividualService) => obj.id === number);

  do {
    randomNumber = Math.floor(Math.random() * 900) + 100; // Генерує число від 100 до 999
  } while (isIdExists(randomNumber));

  return randomNumber;
};
