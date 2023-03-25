export class Matrix {
  private rows: number;
  private cols: number;
  private data: number[][];

  constructor(rows: number, cols: number, matrix?: Matrix) {
    if (matrix !== undefined) {
      this.rows = matrix.getRows();
      this.cols = matrix.getCols();
    } else {
      this.rows = rows;
      this.cols = cols;
    };

    this.data = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));

    if (matrix !== undefined) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          this.set(row, col, matrix.get(row, col));
        };
      };
    };

    return this;
  };

  get(row: number, col: number): number { return this.data[row][col]; }
  getRows(): number { return this.rows; }
  getCols(): number { return this.cols; }
  getData(): number[][] { return this.data; }
  set(row: number, col: number, val: number): void { this.data[row][col] = val; }

  add(other: Matrix | number): Matrix {

    if (typeof other === "number") {
      const rows = this.rows;
      const cols = this.cols;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.set(row, col,
            this.get(row, col) + other
          );
        };
      };
    } else {
      if (this.rows != other.rows || this.cols != other.cols) {
        throw Error("Dimensions do not match");
      }
      const rows = this.rows;
      const cols = this.cols;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.set(row, col,
            this.get(row, col) + other.get(row, col)
          );
        };
      };

    };
    return this;

  };

  sub(other: Matrix | number): Matrix {

    if (typeof other === "number") {
      const rows = this.rows;
      const cols = this.cols;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.set(row, col,
            this.get(row, col) - other
          );
        };
      };
    } else {
      if (this.rows != other.rows || this.cols != other.cols) throw Error("Dimensions do not match");
      const rows = this.rows;
      const cols = this.cols;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.set(row, col,
            this.get(row, col) - other.get(row, col)
          );
        };
      };
    };
    return this;
  };

  mul(other: Matrix | number): Matrix {

    const rows = this.rows;
    const cols = this.cols;

    if (typeof other === "number") {
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          this.set(row, col, this.get(row, col) * other);

    };

    if (other instanceof (Matrix)) {
      if (this.rows != other.rows || this.cols != other.cols) throw Error("Dimensions do not match");

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          this.set(row, col, this.get(row, col) * other.get(row, col));

    };

    return this;
  };

  div(other: Matrix | number): Matrix {
    const rows = this.rows;
    const cols = this.cols;

    if (typeof other === "number") {
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          this.set(row, col, this.get(row, col) / other);

    };

    if (other instanceof (Matrix)) {
      if (this.rows != other.rows || this.cols != other.cols) throw Error("Dimensions do not match");

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          this.set(row, col, this.get(row, col) / other.get(row, col));

    };

    return this;
  };

  exp(): Matrix {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.set(row, col, Math.exp(this.get(row, col)));

    return this;
  };

  pow(power: number): Matrix {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.set(row, col, Math.pow(this.get(row, col), power));

    return this;
  };

  log(): Matrix {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.set(row, col, Math.log(this.get(row, col)));

    return this;
  };

  /**Post Matrix Multiplication*/
  matMul(other: Matrix) {

    if (this.cols != other.rows) throw Error("Row-Column mismatch");

    const oneRows = this.rows;
    const commonDim = this.cols;
    const twoCols = other.cols;

    const result = new Array(oneRows).fill(0).map(() => new Array(twoCols).fill(0));

    for (let row = 0; row < oneRows; row++)
      for (let col = 0; col < twoCols; col++) {
        let sum = 0;
        for (let ctr = 0; ctr < commonDim; ctr++)
          sum += this.get(row, ctr) * other.get(ctr, col);

        result[row][col] = sum;
      };

    this.data = result;
    this.cols = other.cols;

    return this;
  };

  transpose() {
    const rows = this.rows;
    const cols = this.cols;
    const newData = new Array(cols).fill(0).map(() => new Array(rows).fill(0));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newData[col][row] = this.get(row, col);
      };
    };

    this.rows = cols;
    this.cols = rows;
    this.data = newData;
    return this;
  };

  padding(num: number) {
    const data = this.data;
    const newData = new Array(this.rows + 2 * num).fill(0)
      .map(() => new Array(this.cols + 2 * num).fill(0));

    for (let row = num; row < this.rows + num; row++) {
      for (let col = num; col < this.cols + num; col++) {
        newData[row][col] = data[row - num][col - num];
      };
    };

    this.data = newData;
    this.rows += num;
    this.cols += num;
    return this;
  };

  crossCorrelation(kernel: Matrix, strides = 1) {
    if (kernel.rows > this.rows) throw Error("Kernel rows can't be greater than the matrix");
    if (kernel.cols > this.cols) throw Error("Kernel columns can't be greater than the matrix");

    const outputRows = Math.floor((this.rows - kernel.rows) / strides + 1);
    const outputCols = Math.floor((this.cols - kernel.cols) / strides + 1);

    const output: number[][] = new Array(outputRows).fill(0).map(() => new Array(outputCols).fill(0));

    for (let row = 0; row < this.rows; row += strides) {
      if (row + kernel.rows > this.rows) break;
      for (let col = 0; col < this.cols; col += strides) {
        if (col + kernel.cols > this.cols) break;
        let sum = 0;
        for (let kRow = 0; kRow < kernel.rows; kRow++) {
          for (let kCol = 0; kCol < kernel.cols; kCol++) {
            // console.log("Kernel: ", kRow, kCol, " and Matrix ", row, col);
            sum += kernel.get(kRow, kCol) * this.get(row + kRow, col + kCol);
          };
        };
        output[row / strides][col / strides] += sum;
      };
    };

    this.rows = outputRows;
    this.cols = outputCols;
    this.data = output;

    return this;
  };

  transposeCorrelation(kernel: Matrix, strides = 1) {
    const outputRows = (this.rows - 1) * strides + kernel.rows;
    const outputCols = (this.cols - 1) * strides + kernel.cols;

    const output: number[][] = new Array(outputRows).fill(0).map(() => new Array(outputCols).fill(0));

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const rowStart = row * strides;
        const colStart = col * strides;

        for (let kRow = 0; kRow < kernel.rows; kRow++) {
          for (let kCol = 0; kCol < kernel.rows; kCol++) {
            output[rowStart + kRow][colStart + kCol] += kernel.get(kRow, kCol) * this.get(row, col);
          };
        };
      };
    };

    this.rows = outputRows;
    this.cols = outputCols;
    this.data = output;

    return this;
  };

  bilinearUpScaling() {

    const output: number[][] = new Array(this.rows * 2 - 1).fill(0).map(() => new Array(this.cols * 2 - 1).fill(0));

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        output[2 * row][2 * col] = this.get(row, col);
      };
    };

    this.rows = this.rows * 2 - 1;
    this.cols = this.cols * 2 - 1;


    //Vertical values
    for (let row = 1; row < this.rows; row += 2) {
      for (let col = 0; col < this.cols; col += 2) {
        output[row][col] = (output[row - 1][col] + output[row + 1][col]) / 2;
      };
    };

    //Horizontal values
    for (let row = 0; row < this.rows; row += 2) {
      for (let col = 1; col < this.cols; col += 2) {
        output[row][col] = (output[row][col - 1] + output[row][col + 1]) / 2;
      };
    };

    //Center values
    for (let row = 1; row < this.rows; row += 2) {
      for (let col = 1; col < this.cols; col += 2) {
        output[row][col] = (output[row][col - 1] + output[row][col + 1] + output[row - 1][col] + output[row + 1][col]) / 4;
      };
    };

    this.data = output;

    return this;

  };

  static gen(rows: number, cols: number, generator: () => number) {
    const matrix = new Matrix(rows, cols);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        matrix.set(row, col, generator());
      };
    };
    return matrix;
  };

  static add(first: Matrix, second: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, first);
    return newMatrix.add(second);
  };

  static sub(first: Matrix, second: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, first);
    return newMatrix.sub(second);
  };

  static mul(first: Matrix, second: Matrix | number): Matrix {
    const newMatrix = new Matrix(0, 0, first);
    return newMatrix.mul(second);
  };

  static div(first: Matrix, second: Matrix | number): Matrix {
    const newMatrix = new Matrix(0, 0, first);
    return newMatrix.div(second);
  };

  static exp(matrix: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return newMatrix.exp();
  };

  static pow(matrix: Matrix, power: number): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return newMatrix.pow(power);
  };

  static log(matrix: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return newMatrix.log();
  };

  static matMul(first: Matrix, second: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, first);
    return newMatrix.matMul(second);
  };

  static transpose(matrix: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return newMatrix.transpose();
  };

  static zeroes(rows: number, cols: number): Matrix {
    return new Matrix(rows, cols);
  };

  static ones(rows: number, cols: number): Matrix {
    return Matrix.gen(rows, cols, () => 1);
  };

  static max(first: Matrix, second: Matrix): Matrix {

    if (first.getRows() != second.getRows() || first.getCols() != second.getCols()) throw Error("Dimensions do not match");

    const rows = first.getRows();
    const cols = first.getCols();

    const newMatrix = new Matrix(rows, cols);

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        newMatrix.set(row, col, Math.max(
          first.get(row, col),
          second.get(row, col)
        ));

    return newMatrix;
  };

  static min(first: Matrix, second: Matrix): Matrix {

    if (first.getRows() != second.getRows() || first.getCols() != second.getCols()) throw Error("Dimensions do not match");

    const rows = first.getRows();
    const cols = first.getCols();

    const newMatrix = new Matrix(rows, cols);

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        newMatrix.set(row, col, Math.min(
          first.get(row, col),
          second.get(row, col)
        ));

    return newMatrix;
  };

  static sum(matrix: Matrix): number {
    const rows = matrix.getRows();
    const cols = matrix.getCols();

    let sum = 0;
    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        sum += matrix.get(row, col);

    return sum;
  };

  static fromData(data: number[][]): Matrix {
    const rows = data.length;
    const cols = data[0].length;
    const newMatrix = new Matrix(rows, cols);

    for (let row = 0; row < rows; row++)
      for (let col = 0; col < cols; col++)
        newMatrix.set(row, col, data[row][col]);

    return newMatrix;
  };

  static identity(rows: number, cols: number): Matrix {
    if (rows != cols) throw Error("Rows and Columns are unequal, Identity Matrix not possible");
    const newMatrix = new Matrix(rows, cols);
    for (let row = 0; row < rows; row++)
      newMatrix.set(row, row, 1);

    return newMatrix;
  };

  static padding(matrix: Matrix, num: number): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return newMatrix.padding(num);
  };

  static crossCorrelation(input: Matrix, kernel: Matrix, strides = 1): Matrix {
    const newMatrix = new Matrix(0, 0, input);
    return newMatrix.crossCorrelation(kernel, strides);
  };

  static transposeCorrelation(input: Matrix, kernel: Matrix, strides = 1): Matrix {
    const newMatrix = new Matrix(0, 0, input);
    return newMatrix.transposeCorrelation(kernel, strides);
  };

  static bilinearUpScaling(matrix: Matrix): Matrix {
    const newMatrix = new Matrix(0, 0, matrix);
    return matrix.bilinearUpScaling();
  };

};
