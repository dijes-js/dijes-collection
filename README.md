# dijes-Collection
### Download
```js
npm install dijes-collection --save
```
### Using
```js
const Collection = require("dijes-collection")
var collection = new Collection({limit:-1}) // -1 - infinity elements, for change the limit of elements provide the positive number
```
#### Add elements 
```js
collection.set("1",{ number:1, text:"first element"})
// [["1"], [{number:1, text:"first element"}]]
```
#### Remove items
```js
collection.set("1", 1)
//[["1"], [1]]
collection.remove("1")
//[[], []]
```
#### Check availability items
```js
collection.set("foo", "bar")

collection.has("foo") //true
collection.has("bar") //false
```
#### Get items
```js
collection.set("foo", "bar")

collection.get("foo")//"bar"
```