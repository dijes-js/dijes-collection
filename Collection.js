module.exports = class Collection {
  constructor({ limit = -1 } = {}, data = [[], []]) {
    //this.limit = typeof limit == "number" ? limit : -1;
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
//трогаем, так-то структуры данных разные, господи, какой же ты тугодум, тебе, что на пайтоне, что на js ничего не светит, хоть головой об ствол бейся
//интегрируй код, он не совсем верный для выбранной структуры данных
//метод constructor() вызывается при создании экземпляра класса (new Class())