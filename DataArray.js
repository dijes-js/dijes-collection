module.exports = class DataArray {
  /**
   * Конструктор DataArray
   * @constructor
   * @param {object} [options] Опции dataArray
   * @param {number} [options.limit] Предел кол-ва записей dataArray
   */

  constructor({ limit = -1 } = {}) {
    this.limit = typeof limit=="number"?limit:-1;
    this.data = [[], []];
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
   * Get
   * Задает значение указанного ключа
   * @param {any} key ключ элемента
   * @param {any} value новое значение ключа
   * @return {object} Возвращает объект, содержащий новое значение ключа
   */

  Set(key, value) {
    if (key != undefined && value != undefined) {
      let index = this.data[0].indexOf(key);
      if (index == -1) {
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
  
  Has(key){
    return this.data[0].indexOf(key)!=-1
  }
};
