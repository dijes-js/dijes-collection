module.exports = class DataArray {
  /**
   * Конструктор DataArray
   * @constructor
   * @property {object} [options] Опции DataArray
   * @property {number} [options.limit] Предел кол-ва записей dataArray
   */

  constructor({ limit = -1 } = {}, data = [[], []]) {
    this.limit = typeof limit == "number" ? limit : -1;
    this.data = data instanceof Array && data[0] && data[1] ? data : [[], []];
  }

  /**
   * Get
   * Возвращает значение под ключом key
   * @param {*} key ключ элемента
   * @return {*} Значение, закрепленное за key
   */

  get(key) {
    if (key) return this.data[1][this.data[0].indexOf(key)] || null;
    else return null;
  }

  /**
   * Set
   * Задает значение указанного ключа
   * @param {*} key ключ элемента
   * @param {*} value новое значение ключа
   * @return {object} Возвращает объект, содержащий новое значение ключа
   */

  set(key, value) {
    if (key != undefined && value != undefined) {
      let index = this.data[0].indexOf(key);
      if (index == -1) {
        if (this.limit != -1 && this.data[0].length == this.limit) {
          let error = TypeError(
            "достигнут лимит записей для DataArray(" + this.limit + ")"
          );
        }
        index = this.data[0].length;
        this.data[0].push(key);
      }
      this.data[1][index] = value;
      return { [key]: value };
    } else {
      let error = TypeError("key или value не были предоставлены");
      throw error;
    }
  }

  /**
   * Has
   * Проверяет наличие ключа в DataArray
   * @param {*} key искомый ключ
   * @return {boolean} Логическое значение, обозначающее наличие key в DataArray
   */

  has(key) {
    return this.data[0].indexOf(key) != -1;
  }

  /**
   * Remove
   * Удалить элемент под ключом из DataArray
   * @param {*} key ключ удаляемого элемента
   * @return {*} удаленный элемент
   */

  remove(key) {
    if (this.data[0].indexOf(key) != -1) {
      let index = this.data[0].indexOf(key);
      this.data[0].splice(index, 1);
      let deleted = this.data[1].splice(index, 1);
      return deleted[0];
    } else return null;
  }

  filter(expression) {
    if (typeof expression != "function") {
      let error = TypeError("Неверное выражение");
      throw error;
    }
    let copy = this.data.slice(),
      deletabel = [];
    copy[1] = copy[1].filter((el, ind) => {
      if (!expression(el)) {
        deletabel.push(ind);
        return false;
      } else return true;
    });
    copy[0] = copy[0].filter((el, ind) => !deletabel.includes(ind));

    return new DataArray({}, copy);
  }

  map(func) {
    if (typeof func != "function") {
      let error = TypeError("Указанный аргумент должен являться функцией");
      throw error;
    }
    return new DataArray({}, [this.data[0], this.data[1].map(func)]);
  }

  to(type = Map) {
    if (type == Map) {
      let map = new Map();
      this.data[0].forEach((el, ind) => map.set(el, this.data[1][ind]));
      return map;
    } else {
      return this.data;
    }
  }

  clear() {
    this.data = [[], []];
  }

  clone() {
    return new DataArray({}, this.data);
  }

  first(amount = 1) {
    amount = amount > 0 ? amount : 1;
    let elements = this.data[1].slice().splice(0, amount);
    if (amount > 1) {
      return elements;
    } else return elements[0];
  }
  random() {
    let elements = this.data[1]
      .slice()
      .splice(Math.floor(Math.random() * this.data[0].length), 1);
    return elements[0];
  }

  last(amount = 1) {
    amount = amount > 0 ? amount : 1;
    let elements = this.data[1]
      .slice()
      .splice(this.data[0].length - 1 - amount, amount);
    if (amount > 1) {
      return elements;
    } else return elements[0];
  }
  
  size(){
    return this.data[0].length
  }
};
