let first = require("./DataArray.js")
const coll = require("@discordjs/collection")
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
let x = new first(),
    f=new coll()

for(let i = 0; i<10000;i++){
 x.set(i,{text:i})
  //f.set(i,{text:i})
}

let starts = Date.now()
console.log(x.last(5))
console.log(Date.now()-starts+"ms")

// В душе не ебу как 