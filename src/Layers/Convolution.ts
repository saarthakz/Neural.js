import { Matrix } from "../Matrix/matrix.js";
import { Layer } from "./Base.js";

export class Convolution {
  constructor(inputSize: number, kernelSize: number, depth: number) {

  };

  forward(input: Matrix[]): Matrix {

    return new Matrix(0, 0);
  };

  backward(outputGradient: Matrix, learningRate: number): Matrix {
    return new Matrix(0, 0);
  };
};