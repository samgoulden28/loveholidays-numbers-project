import { string } from "yargs";
import {
  numbersToWordsLarge,
  numbersToWordsSingles,
  numbersToWordsTens,
} from "./numbers";

export const convertNumberInHundredsToEnglish = (
  numToConvert: number,
  final: boolean = false
) => {
  const hundred = Math.floor(numToConvert / 100);
  const tens = Math.floor((numToConvert - hundred * 100) / 10);
  const singles = numToConvert - hundred * 100 - tens * 10;
  let needsAnd = false;
  let result = "";
  if (hundred > 0) {
    result += numbersToWordsSingles[hundred] + " hundred";
  }

  needsAnd = hundred > 0 && (tens > 0 || singles > 0);
  if (needsAnd) {
    result += " and";
  }

  if (tens > 1) {
    const needsSpace = hundred > 0 ? " " : "";
    const needsAnd = final && hundred === 0 ? "and " : "";
    result += needsAnd + needsSpace + numbersToWordsTens[tens * 10];
  }

  if (singles > 0 || tens === 1) {
    const needsAnd =
      final && singles > 0 && tens === 0 && hundred === 0 ? "and " : "";
    const needsSpace = tens > 1 || hundred > 0 ? " " : "";
    if (tens === 1) {
      result += needsAnd + needsSpace + numbersToWordsSingles[10 + singles];
    } else {
      result += needsAnd + needsSpace + numbersToWordsSingles[singles];
    }
  }
  return result;
};

export const convertLargeNumberToStringArray = (numToConvert: number) => {
  const result: [string, string][] = [];
  const originalNumber = numToConvert;
  Object.entries(numbersToWordsLarge)
    .reverse()
    .forEach(([amount, string]) => {
      const orderOfMagnitude = string === "hundred" ? "" : string;
      const isFinalNumber = orderOfMagnitude === "";
      if (numToConvert >= Number(amount) && !isFinalNumber) {
        const baseOfLargeNumber = getBaseOfLargeNumber(
          numToConvert,
          Number(amount)
        );
        const numberInWords =
          convertNumberInHundredsToEnglish(baseOfLargeNumber);
        result.push([numberInWords, orderOfMagnitude]);
        numToConvert -= baseOfLargeNumber * Number(amount);
        return;
      }
      if (isFinalNumber && numToConvert > 0) {
        const numberInWords = convertNumberInHundredsToEnglish(
          numToConvert,
          originalNumber > 100
        );
        result.push([numberInWords, orderOfMagnitude]);
      }
    });
  return result;
};

export const getBaseOfLargeNumber = (
  numToConvert: number,
  magnitudeAmount: number
) => {
  //starting with the largest, lets see if we need to print it
  //if we do, we can determine how many by using math.floor to the base of the number
  return Math.floor(numToConvert / magnitudeAmount);
  //and then lets remove it from the number we are converting
};

export const convertArrayOfStringArraysToString = (
  stringOfStringArrays: [string, string][]
) => {
  const stringArray = stringOfStringArrays.map((value) => {
    if (value) return value.filter((v) => v).join(" ");
  });
  return stringArray
    .map((v, i) =>
      !stringArray[i + 1]?.startsWith("and") && i < stringArray.length - 1
        ? v + ","
        : v
    )
    .join(" ");
};

export const run = (numToConvert: number) => {
  if (typeof numToConvert !== "number") {
    throw new Error("Invalid input");
  }

  const resultArray = convertLargeNumberToStringArray(numToConvert);
  const result = convertArrayOfStringArraysToString(resultArray);

  console.log(result);
  return result;
};
