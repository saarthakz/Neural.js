import { Matrix } from "../Matrix/matrix.js";

import { Layer } from "./Base.js";

export class Dense extends Layer {

  protected weights: Matrix;
  protected bias: Matrix;

  constructor(inputSize: number, outputSize: number) {
    super();
    this.weights = Matrix.gen(outputSize, inputSize, () => Math.random());
    this.bias = Matrix.gen(outputSize, 1, () => Math.random());
  };

  forward(input: Matrix) {
    this.input = input;
    return Matrix
      .matMul(this.weights, this.input)
      .add(this.bias);
  };

  backward(outputGradient: Matrix, learningRate: number) {
    const weightsGradient = Matrix.mul(outputGradient, Matrix.transpose(this.input));
    const biasGradient = new Matrix(0, 0, outputGradient);
    const inputGradient = Matrix.matMul(
      Matrix.transpose(this.weights), outputGradient
    );

    //Updating weights and biases
    this.weights.sub(
      weightsGradient.mul(learningRate)
    );
    this.bias.sub(
      biasGradient.mul(learningRate)
    );

    return inputGradient;
  };
};


