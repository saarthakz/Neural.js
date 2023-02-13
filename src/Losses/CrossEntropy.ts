import { Matrix } from "../Matrix/matrix.js";

export function crossEntropy(prediction: Matrix, trueValue: Matrix): number {
  return -1 * Matrix.sum(
    Matrix.mul(
      trueValue,
      Matrix.log(prediction)
    )
  );
};

export function crossEntropyDerivative(prediction: Matrix, trueValue: Matrix): Matrix {
  return Matrix.div(
    trueValue,
    prediction
  ).mul(-1);
};

