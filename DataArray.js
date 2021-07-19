class DataArray{
  
  /**
  * Конструктор DataArray
  * @constructor
  * @param {object} [options] Опции dataArray
  * @param {number} [options.limit] Предел кол-ва записей dataArray
  */
  
  constructor(options = {limit:-1}){
    console.log(options)
    this.data = [[],[]]
  }
  
  /**
  * Get
  * Возвращает значение под ключом key
  * @param {any} key ключ элемента
  * @return {any} значение, закрепленное за key
  */
  
  Get(key){
    return this.data[1][this.data[0].indexOf(key)]||null
  }
}

console.log(new DataArray({}))