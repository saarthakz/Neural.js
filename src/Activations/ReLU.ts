import { Matrix } from "../Matrix/matrix.js";
import { Activation } from "../Layers/Activation.js";

export class ReLU extends Activation {

  constructor() {
    function activationFn(input: Matrix): Matrix {
      return Matrix.max(input, Matrix.zeroes(input.getRows(), input.getCols()));
    };

    function backwardFn(outputGradient: Matrix): Matrix {
      const data = this.input.getData().map((row: number[]) => row.map((num) => num > 0 ? 1 : 0));
      return Matrix.mul(
        outputGradient, Matrix.fromData(data)
      );
    };

    super(activationFn, backwardFn);
  };
};
