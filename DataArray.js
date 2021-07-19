class DataArray{
  
  /**
  * Конструктор 
  */
  
  constructor(data,options = {limit:-1}){
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