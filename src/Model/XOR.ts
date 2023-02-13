import { Matrix } from "../Matrix/matrix.js";
import { Dense } from "../Layers/Dense.js";
import { Sigmoid } from "../Activations/Sigmoid.js";
import { Layer } from "../Layers/Base.js";
import { meanSquaredError, meanSquaredErrorDerivative } from "../Losses/MSE.js";

const x = [
  [
    [0],
    [0]
  ],
  [
    [0],
    [1]
  ],
  [
    [1],
    [0]
  ],
  [
    [1],
    [1]
  ],
];

const y = [
  [[0]],
  [[1]],
  [[1]],
  [[0]]
];

const network: Layer[] = [
  new Dense(2, 3),
  new Sigmoid(),
  new Dense(3, 1),
  new Sigmoid()
];

const epochs = 10000;
const learningRate = 0.1;

for (let epoch = 0; epoch < epochs; epoch++) {
  let error = 0;

  for (let idx = 0; idx < x.length; idx++) {
    const inp = Matrix.fromData(x[idx]);

    const trueOut = Matrix.fromData(y[idx]);
    let output = inp;

    network.forEach((layer) => {
      output = layer.forward(output);
    });

    error += meanSquaredError(output, trueOut);

    let grad = meanSquaredErrorDerivative(output, trueOut);

    [...network].reverse().forEach((layer) => {
      grad = layer.backward(grad, learningRate);
    });
  };

  error /= x.length;

  console.log("Error: ", error);

};
