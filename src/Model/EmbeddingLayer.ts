import { Matrix } from "../Matrix/matrix.js";
import { Dense } from "../Layers/Dense.js";
import { Sigmoid } from "../Activations/Sigmoid.js";
import { Layer } from "../Layers/Base.js";
import { meanSquaredError, meanSquaredErrorDerivative } from "../Losses/MSE.js";
import { readFile } from "node:fs/promises";

const reviews = (await readFile("dataset/IMDB/reviews.txt", { encoding: "ascii" })).split("\n");

const targetDataset = (await readFile("dataset/IMDB/labels.txt", { encoding: "ascii" })).split("\n").map((sentiment) => sentiment == "positive" ? 1 : 0);

const tokenizedReviews = reviews.map((review) => review.split(" "));

const vocab = new Set<string>();

tokenizedReviews.forEach((tokenizedReview) => tokenizedReview.forEach((token) => vocab.add(token)));

const vocabList = Array.from(vocab);
const tokenToIndex = {};

vocabList.forEach((token, idx) => tokenToIndex[token] = idx);

//Original Bag of words approach is not possible due to Node.js Runtime Heap Memory constraints.

/**Input dataset for the embedding layer */
const inputDataset = new Array<Array<number>>(tokenizedReviews.length);

tokenizedReviews.forEach((tokenizedReview, idx) => {
  const indexList = new Set<number>();
  tokenizedReview.forEach((token) => indexList.add(tokenToIndex[token]));
  inputDataset[idx] = Array.from(indexList).sort();
});






