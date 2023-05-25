import { Matrix } from "../Matrix/matrix.js";
import { Activation } from "../Layers/Activation.js";

export class LeakyReLU extends Activation {

  constructor() {
    function activationFn(input: Matrix): Matrix {
      return Matrix.max(input, Matrix.mul(input, 0.1));
    };

    function backwardFn(outputGradient: Matrix): Matrix {
      const data = this.input.getData().map((row: number[]) => row.map(
        (num) => num > 0 ? 1 : 0.1
      ));
      return Matrix.mul(
        outputGradient, Matrix.fromData(data)
      );
    };

    super(activationFn, backwardFn);
  };
};
