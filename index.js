let first = require("./DataArray.js")
/*
DataArray.js :
10000 create = ~780ms
500 = ~15ms
100 = ~7ms

10000 get = ~5ms

10000 has = ~ 20ms
*/
let x = new first()


/*for(let i = 0; i<10000;i++){
 x.Set(i,i)
}
let starts = Date.now()

console.log(Date.now()-starts+"ms")
*/
x.Set("1","1")
x.Set("2","2")
console.log(x.Remove("2"))
x.Remove("1")
console.log(x.data)
// В душе не ебу как 