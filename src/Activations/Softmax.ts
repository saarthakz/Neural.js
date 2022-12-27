import { Activation } from "../Layers/Activation.js";
import { Matrix } from "../Matrix/matrix.js";

export class Softmax extends Activation {

  constructor() {
    function activationFn(input: Matrix): Matrix {
      const expMat = Matrix.exp(input);
      const denominator = Matrix.sum(expMat);
      return expMat.div(denominator);
    };

    function backwardFn(outputGradient: Matrix): Matrix {
      const temp = Matrix.matMul(
        this.output, Matrix.ones(1, this.output.getRows())
      );
      const tempT = Matrix.transpose(temp);
      const I = Matrix.identity(this.output.getRows(), this.output.getRows());
      return Matrix.mul(
        temp,
        I.sub(tempT)
      ).matMul(outputGradient);
    };

    super(activationFn, backwardFn);
  };
};