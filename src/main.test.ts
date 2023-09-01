import {
  convertArrayOfStringArraysToString,
  convertLargeNumberToStringArray,
  convertNumberInHundredsToEnglish,
  getBaseOfLargeNumber,
  run,
} from "./main";

describe("Main", () => {
  describe("convertNumberInHundredsToEnglish", () => {
    const convertNumberInHundredsToEnglishTests: [number, string][] = [
      [318, "three hundred and eighteen"],
      [100, "one hundred"],
      [101, "one hundred and one"],
      [110, "one hundred and ten"],
      [111, "one hundred and eleven"],
      [999, "nine hundred and ninety nine"],
      [409, "four hundred and nine"],
      [3, "three"],
      [55, "fifty five"],
      [52, "fifty two"],
      [15, "fifteen"],
    ];
    it.each(convertNumberInHundredsToEnglishTests)(
      "should convert %s to %s",
      (input, expected) => {
        expect(convertNumberInHundredsToEnglish(input)).toEqual(expected);
      }
    );
  });
  describe("getBaseOfLargeNumber", () => {
    const getBaseOfLargeNumberTests: [number, number, number][] = [
      [3180, 1000, 3],
      [318022, 1000, 318],
      [9866777, 1000000, 9],
      [45, 1000, 0],
      [1000, 1000, 1],
      [22997773333, 1000000000, 22],
    ];
    it.each(getBaseOfLargeNumberTests)(
      "should convert %s to %s",
      (input, magnitudeAmount, expected) => {
        expect(getBaseOfLargeNumber(input, magnitudeAmount)).toEqual(expected);
      }
    );
  });
  describe("convertLargeNumberToStringArray", () => {
    const convertLargeNumberToStringArrayTests: [number, [string, string][]][] =
      [
        [
          3180,
          [
            ["three", "thousand"],
            ["one hundred and eighty", ""],
          ],
        ],
        [
          318022,
          [
            ["three hundred and eighteen", "thousand"],
            ["and twenty two", ""],
          ],
        ],
        [
          99888111,
          [
            ["ninety nine", "million"],
            ["eight hundred and eighty eight", "thousand"],
            ["one hundred and eleven", ""],
          ],
        ],
        [
          14909888111,
          [
            ["fourteen", "billion"],
            ["nine hundred and nine", "million"],
            ["eight hundred and eighty eight", "thousand"],
            ["one hundred and eleven", ""],
          ],
        ],
        [
          546414909888111,
          [
            ["five hundred and forty six", "trillion"],
            ["four hundred and fourteen", "billion"],
            ["nine hundred and nine", "million"],
            ["eight hundred and eighty eight", "thousand"],
            ["one hundred and eleven", ""],
          ],
        ],
        [
          5000000000000001,
          [
            ["five", "quadrillion"],
            ["and one", ""],
          ],
        ],
        [5000000000000000, [["five", "quadrillion"]]],
        [
          9870003,
          [
            ["nine", "million"],
            ["eight hundred and seventy", "thousand"],
            ["and three", ""],
          ],
        ],
        [
          9870023,
          [
            ["nine", "million"],
            ["eight hundred and seventy", "thousand"],
            ["and twenty three", ""],
          ],
        ],
        [
          10000000000003,
          [
            ["ten", "trillion"],
            ["and three", ""],
          ],
        ],
      ];
    it.each(convertLargeNumberToStringArrayTests)(
      "should convert %s to %s",
      (input, output) => {
        expect(convertLargeNumberToStringArray(input)).toEqual(output);
      }
    );
  });
  describe("Join string array", () => {
    it("should join the string array", () => {
      const input: [string, string][] = [
        ["ten", "trillion"],
        ["and three", ""],
      ];
      expect(convertArrayOfStringArraysToString(input)).toEqual(
        "ten trillion and three"
      );
    });
  });
  // create run tests with these inputs and outputs:
  /* ./bin/numbers-to-words 52
fifty-two

./bin/numbers-to-words 1000
one thousand

./bin/numbers-to-words 101
one hundred and one

./bin/numbers-to-words 352
three hundred and fifty-two

./bin/numbers-to-words 12300
twelve thousand, three hundred

./bin/numbers-to-words 12055
twelve thousand and fifty-five

./bin/numbers-to-words 12345
twelve thousand, three hundred and forty-five
*/
  describe("run", () => {
    const runTests: [number, string][] = [
      [52, "fifty two"],
      [1000, "one thousand"],

      [101, "one hundred and one"],
      [352, "three hundred and fifty two"],
      [12300, "twelve thousand, three hundred"],
      [12055, "twelve thousand and fifty five"],
      [12345, "twelve thousand, three hundred and forty five"],
    ];
    it.each(runTests)("should convert %s to %s", (input, output) => {
      expect(run(input)).toEqual(output);
    });
  });
});
