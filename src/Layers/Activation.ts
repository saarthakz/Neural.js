import { Matrix } from "../Matrix/matrix.js";
import { Layer } from "./Base.js";

type ActivationFunction = (input: Matrix) => Matrix;

type BackwardFunction = (outputGradient: Matrix) => Matrix;

class Activation extends Layer {
  activationFn: ActivationFunction;
  backwardFn: BackwardFunction;
  constructor(activationFn: ActivationFunction, backwardFn: BackwardFunction) {
    super();
    this.activationFn = activationFn;
    this.backwardFn = backwardFn;
  };

  forward(input: Matrix) {
    this.input = input;
    this.output = this.activationFn(this.input);
    return this.output;
  };

  backward(outputGradient: Matrix, learningRate: number) {
    return this.backwardFn(outputGradient);
  };
};

export { Activation };