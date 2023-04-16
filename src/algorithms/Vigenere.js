import ceasarAlgorithm from "./Ceasar";
import { ALPHABET } from "../constants";

class Vigenere {
  constructor(alphabet) {
    this.alphabet = alphabet;
  }

  getVigenereMatrix() {
    const alphabetArray = this.alphabet.split("");
    const vinegenereMatrix = alphabetArray.map((char, index) => {
      return ceasarAlgorithm.encode(this.alphabet, index).split("");
    });
    return vinegenereMatrix;
  }

  encode(input, key) {
    const VIGENERE_MATRIX = this.getVigenereMatrix();
    // transform key equal to input length
    const transformedKey = this.#createKey(input.length, key);

    const inputArray = input.split("");
    const output = inputArray.map((inputChar, i) => {

      if (this.#checkValidChar(inputChar)) {
        const columnChar = inputChar.toUpperCase();
        const rowChar = transformedKey[i].toUpperCase();
        const columnIndex = this.alphabet.indexOf(columnChar);
        const rowIndex = this.alphabet.indexOf(rowChar);
        return VIGENERE_MATRIX[rowIndex][columnIndex];
      } else {
        return inputChar;
      }
    })

    return output.join('');
  }

  decode(input, key) {
    const VIGENERE_MATRIX = this.getVigenereMatrix();
    const transformedKey = this.#createKey(input.length, key);

    const inputArray = input.split("");
    const output = inputArray.map((inputChar, i) => {
      if (this.#checkValidChar(inputChar)) {
        const encodeChar = input[i].toUpperCase();
        const keyChar = transformedKey[i].toUpperCase();
        const rowIndex = this.alphabet.indexOf(keyChar);
        // get row char list from matrix
        const rowCharList = VIGENERE_MATRIX[rowIndex];
        // get index of encoded char in that matrix -> code index in alphabets
        const columnIndex = rowCharList.indexOf(encodeChar);

        return this.alphabet[columnIndex];
      } else {
        return inputChar;
      }
    })

    return output.join('');
  }

  validateKey(key) {
    return Array.from(key).every((char) => this.alphabet.includes(char.toUpperCase()));
  }

  #createKey(inputLength, key) {
    const keyResult = [];
    for (let i = 0; i < inputLength; i++) {
      keyResult.push(key[i % key.length]);
    }
    return keyResult;
  }

  #checkValidChar(character) {
    return this.alphabet.indexOf(character.toUpperCase()) >= 0;
  }

}

export default new Vigenere(ALPHABET);
