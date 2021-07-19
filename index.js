let first = require("./DataArray.js")

let x = new first()

let starts = Date.now()

for(let i = 0; i<10000;i++){
 x.Set(i,i)
}

console.log(Date.now()-starts+"ms")


console.log(x.Set(require("./DataArray.js")))

console.log(x.constructor())

//ибо нехуй