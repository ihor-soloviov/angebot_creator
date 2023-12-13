export const generateUniqueThreeDigitNumber = (objectsArray) => {
  let randomNumber;
  if (objectsArray.length === 0) {
    return 1;
  }
  
  const isIdExists = (number) => objectsArray.some((obj) => obj.id === number);

  do {
    randomNumber = Math.floor(Math.random() * 900) + 100; // Генерує число від 100 до 999
  } while (isIdExists(randomNumber));

  return randomNumber;
};
