import { Matrix } from "../Matrix/matrix.js";
import { Activation } from "../Layers/Activation.js";

export class Sigmoid extends Activation {

  constructor() {
    function activationFn(input: Matrix): Matrix {
      return new Matrix(0, 0, input)
        .mul(-1) // -x
        .exp() // e^-x
        .add(1) // (e^-x) + 1
        .pow(-1); // 1/[(e^-x) + 1]
    };

    function backwardFn(outputGradient: Matrix): Matrix {

      return Matrix.mul(
        outputGradient, Matrix.mul(
          this.output, new Matrix(0, 0, this.output).mul(-1).add(1)
        )
      );
    };

    super(activationFn, backwardFn);
  };
};
