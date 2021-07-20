module.exports = class DataArray {
  /**
   * Конструктор DataArray
   * @constructor
   * @param {object} [options] Опции DataArray
   * @param {number} [options.limit] Предел кол-ва записей dataArray
   */

  constructor({ limit = -1 } = {}, data = [[], []]) {
    this.limit = typeof limit == "number" ? limit : -1;
    this.data = data instanceof Array && data[0] && data[1] ? data : [[], []];
  }

  /**
   * Get
   * Возвращает значение под ключом key
   * @param {any} key ключ элемента
   * @return {any} Значение, закрепленное за key
   */

  Get(key) {
    if (key) return this.data[1][this.data[0].indexOf(key)] || null;
    else return null;
  }

  /**
   * Set
   * Задает значение указанного ключа
   * @param {any} key ключ элемента
   * @param {any} value новое значение ключа
   * @return {object} Возвращает объект, содержащий новое значение ключа
   */

  Set(key, value) {
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
   * @param {any} key искомый ключ
   * @return {boolean} Логическое значение, обозначающее наличие key в DataArray
   */

  Has(key) {
    return this.data[0].indexOf(key) != -1;
  }

  /**
   * Remove
   * Удалить элемент под ключом из DataArray
   * @param {any} key ключ удаляемого элемента
   * @return {any} удаленный элемент
   */

  Remove(key) {
    if (this.data[0].indexOf(key) != -1) {
      let index = this.data[0].indexOf(key);
      this.data[0].splice(index, 1);
      let deleted = this.data[1].splice(index, 1);
      return deleted[0];
    } else return null;
  }

  Filter(expression) {
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

  Map(func) {
    if (typeof func != "function") {
      let error = TypeError("Указанный аргумент должен являться функцией");
      throw error;
    }
    return new DataArray({}, [this.data[0], this.data[1].map(func)]);
  }
  
  To(type=Map){
    if(type==Map){
      let map = new Map()
      this.data[0].forEach((el,ind)=>map.set(el,this.data[1][ind]))
      return map
    }else{return this.data}
  }
};