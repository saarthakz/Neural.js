import { Matrix } from "../Matrix/matrix.js";
abstract class Layer {

  protected input: Matrix;
  protected output: Matrix;

  constructor() { };

  abstract forward(input: Matrix): Matrix;

  abstract backward(outputGradient: Matrix, learningRate: number): Matrix;
};

export { Layer };