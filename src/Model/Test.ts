import { Matrix } from "../Matrix/matrix.js";

const matrix = Matrix.fromData([
  [1, 1, 3],
  [1, 1, 6],
  [1, 1, 9]
]);

console.log(Matrix.bilinearUpScaling(matrix));




