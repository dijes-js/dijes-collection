let first = require("./DataArray.js")
/*
DataArray.js :
10000 create = ~780ms
500 = ~15ms
100 = ~7ms
10000 get = ~5ms
10000 has = ~ 20ms
10000 filter = ~ 600ms
10000 map = ~ 30ms
*/
let x = new first()

for(let i = 0; i<10000;i++){
 x.Set(i,{text:i})
}

let starts = Date.now()
console.log(x.First(5))
console.log(Date.now()-starts+"ms")

// В душе не ебу как 