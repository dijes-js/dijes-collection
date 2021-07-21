module.exports = class DataArray {
  /**
   * Конструктор коллекции
   * @constructor
   * @property {object} [options] Опции коллекции
   * @property {number} [options.limit] Предел кол-ва записей коллекции
   */

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

  /**
   * get
   * Возвращает значение под ключом key
   * @param {*} key ключ элемента
   * @return {*} Значение, закрепленное за key
   */

  get(key) {
    if (key) return this.data[1][this.data[0].indexOf(key)];
    else return null;
  }

  /**
   * set
   * Задает значение указанного ключа
   * @param {*} key ключ элемента
   * @param {*} value новое значение ключа
   * @return {object} Возвращает объект, содержащий новое значение ключа
   */

  set(key, value) {
    if (key && value) {
      let index = this.data[0].indexOf(key);
      if (index == -1) {
        if (this.limit != -1 && this.data[0].length == this.limit) {
          let error = TypeError(
            "Достигнут лимит записей для коллекции(" + this.limit + ")"
          );
        }
        index = this.data[0].length;
        this.data[0].push(key);
      }
      this.data[1][index] = value;
      return { [key]: value };
    } else {
      let error = TypeError("key или value не были определены");
      throw error;
    }
  }

  /**
   * has
   * Проверяет наличие ключа в коллекции
   * @param {*} key искомый ключ
   * @return {boolean} Логическое значение, обозначающее наличие key в коллекции
   */

  has(key) {
    return this.data[0].includes(key);
  }

  /**
   * remove
   * Удалить элемент под ключом из коллекции
   * @param {*} key ключ удаляемого элемента
   * @return {*} Удаленный элемент
   */

  remove(key) {
    if (this.data[0].includes(key)) {
      let index = this.data[0].indexOf(key);
      this.data[0].splice(index, 1);
      let deleted = this.data[1].splice(index, 1);
      return deleted[0];
    } else return null;
  }
  
  /**
  * filter
  * Фильтрация элементов коллекции
  * @param {function} expression Функция, определяющая правила фильтрации
  * @return {DataArray} Возвращает отфильтрованную коллекцию
  */

  filter(expression) {
    if (typeof expression != "function") {
      let error = TypeError("Неверное выражение");
      throw error;
    }
    let copy = this.data.slice(),
      deletable = [];
    copy[1] = copy[1].filter((el, ind) => {
      if (!expression(el)) {
        deletable.push(ind);
        return false;
      } else return true;
    });
    copy[0] = copy[0].filter((el, ind) => !deletable.includes(ind));

    return new DataArray({}, copy);
  }
  
  /**
  * map
  * Видоизменение элементов коллекции
  * @param {function} func Функция, выполняющаяся над каждым элементов коллекции
  * @return {DataArray} Возвращает новую коллекцию, в котором все над всеми элементами была выполнена func
  */

  map(func) {
    if (typeof func != "function") {
      let error = TypeError("Указанный аргумент должен являться функцией");
      throw error;
    }
    return new DataArray({}, [this.data[0], this.data[1].map(func)]);
  }
  
  /**
  * to
  * Преобразование коллекции в Map или исходный массив
  * @param {map|*} type Выходной формат данных
  * @return {map|array} Преобразованная коллекция
  */

  to(type = Map) {
    if (type == Map) {
      let map = new Map();
      this.data[0].forEach((el, ind) => map.set(el, this.data[1][ind]));
      return map;
    } else {
      return this.data;
    }
  }

  /**
  * clear
  * Очистка коллекции
  */
  
  clear() {
    this.data = [[], []];
  }
  
  /**
  * clone
  * Клонирование коллекции
  * @return {DataArray} Возвращает копию коллекции
  */

  clone() {
    return new DataArray({}, this.data);
  }
  
  /**
  * first
  * Берет amount первых элементов
  * @param {number} amount Количество элементов
  * @return {array|*} Возвращает amount первых элементов
  */

  first(amount = 1) {
    amount = amount > 0 ? amount : 1;
    let elements = this.data[1].slice().splice(0, amount);
    if (amount > 1) {
      return elements;
    } else 
      return elements[0];
  }
  
  /**
  * random
  * Берет случайный элемент коллекции
  * @return {*} Возвращает случайный элемент коллекции
  */
  
  random() {
    let elements = this.data[1]
      .slice()
      .splice(Math.floor(Math.random() * this.data[0].length), 1);
    return elements[0];
  }

  /**
  * last
  * Берет amount последних элементов из коллекции
  * @param {number} amount Количество элементов
  * @return {*|array} Возвращает amount последних элементов коллекции
  */
  
  last(amount = 1) {
    amount = amount > 0 ? amount : 1;
    let elements = this.data[1]
      .slice()
      .splice(this.data[0].length - 1 - amount, amount);
    if (amount > 1) {
      return elements;
    } else return elements[0];
  }
  
  /**
  * size
  * Количество элементов коллекции
  * @return {number} Возвращает кол-во элементов в коллекции
  */

  size() {
    return this.data[0].length;
  }

  /**
  * find
  * Поиск первого элемента соответствующего условию func
  * @param {function} func Функция, согласно которой происходит поиск элемента
  * @return {*} Первый наденный элемент, удовлетворяющий func
  */
  
  find(func) {
    if (typeof func != "function") {
      let error = TypeError("Указанный аргумент должен являться функцией");
      throw error;
    }
    return this.data[1].find(func) 
  }
  
  /**
  * forEach
  * Перебор и вызов функции со всеми элементами массива
  * @param {function} func Функция перебора
  */
  
  forEach(func){
    if(typeof func != "function"){
      let error = TypeError("Указанный аргумент должен явдяться функцией")
      throw error
    }
    this.data[1].forEach(func)
  }
  
  /**
  * every
  * Проверка всех элементов массива
  * @param {function} func Функция проверки элементов
  * @return {boolean} Логическое значение, обозначающее удовлетворяют ли все элементы коллекции условию func
  */
  
  every(func){
    
  }
  
};
