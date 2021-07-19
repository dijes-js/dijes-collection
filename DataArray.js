module.exports=class DataArray{
  
  /**
  * Конструктор DataArray
  * @constructor
  * @param {object} [options] Опции dataArray
  * @param {number} [options.limit] Предел кол-ва записей dataArray
  */
  
  constructor({limit=-1}={}){
    this.limit = limit;
    this.data = [[],[]];
  }
  
  /**
  * Get
  * Возвращает значение под ключом key
  * @param {any} key ключ элемента
  * @return {any} значение, закрепленное за key
  */
  
  Get(key){
    if(key)
    return this.data[1][this.data[0].indexOf(key)]||null;
    else return null;
  }
  
  Set(key,value){
    if(key!=undefined&&value!=undefined){
      
    } else {
      let er = TypeError("key или value не были предоставлены")
    }
  }
}
