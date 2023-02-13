import { Matrix } from "../Matrix/matrix.js";

export function meanSquaredError(prediction: Matrix, trueValue: Matrix): number {

  return Matrix.sum(
    Matrix.sub(prediction, trueValue).pow(2)
  ) / prediction.getRows();
};

export function meanSquaredErrorDerivative(prediction: Matrix, trueValue: Matrix): Matrix {
  return Matrix.sub(
    prediction,
    trueValue
  ).mul(2).div(prediction.getRows());
};

