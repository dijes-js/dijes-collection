module.exports = class Collection {
  constructor({ limit = -1 } = {}, data = [[], []]) {
    this.limit = typeof limit == "number" ? limit : -1;
    this.data =
      data instanceof Array &&
      data[0] &&
      data[1] &&
      data[0] instanceof Array &&
      data[1] instanceof Array
        ? data
        : [[], []];
  }
}
//
//интегрируй код, он не совсем верный для выбранной структуры данных
//лучше возьми конструктор из dataArray различий не особо много
//идентифицируй массив, в котором будут храниться данные
//метод constructor() вызывается при создании экземпляра класса (new Class())