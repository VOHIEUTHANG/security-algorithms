import { ALPHABET } from "../constants";

class Ceasar {
  constructor(alphabet) {
    this.alphabet = alphabet;
  }

  encode(input, stepKey) {
    const inputArray = input.split("");
    const result = inputArray.map((character) => {
      const index = this.alphabet.indexOf(character.toUpperCase());
      if (index >= 0) {
        const transformedChar = (index + stepKey) % this.alphabet.length;

        return this.alphabet[transformedChar];
      } else {
        return character;
      }
    });

    return result.join("");
  }
  decode(input, stepKey) {
    const inputArray = input.split("");
    const result = inputArray.map((character) => {
      const index = this.alphabet.indexOf(character.toUpperCase());
      if (index >= 0) {
        const additionValue = 26 * Math.ceil((stepKey - index) / 26);
        const transformedIndex = index + additionValue - stepKey;
        return this.alphabet[transformedIndex];
      } else {
        return character;
      }
    });

    return result.join("");
  }
  validateKey(key) {
    return (
      Number.isInteger(Number(key)) && Number(key) >= 0 && Number(key) <= 500
    );
  }
}

export default new Ceasar(ALPHABET);
