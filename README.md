
Run

```
npm i
npm start
```

`app.js` (main entry file) requires `pages/a.js` which lazy-loads `pages/b.js`

**`app.js`**
```js
require('./pages/a')
```

**`pages/a.js`**
```js
System.import('./b')
```

This correctly produces

```text
chunk.0.284b00aefcb316ae7c89.js  99 bytes       0  [emitted]
   main.d72f6dcd9fbfae2138cc.js   6.06 kB       1  [emitted]  main
   [0] ./app.js 69 bytes {1} [built]
   [1] ./pages/a.js 22 bytes {1} [built]
   [2] ./pages/b.js 19 bytes {0} [built]
```

But when I change **`app.js`** to use **dynamic** require:

```js
const a = 'a'
require('./pages/' + a);
```

It outputs:


```text
main.96620f8327b6dcd4f856.js  3.4 kB       0  [emitted]  main
   [0] ./pages/b.js 19 bytes {0} [built]
   [1] ./pages/a.js 22 bytes {0} [optional] [built]
   [2] ./app.js 66 bytes {0} [built]
   [3] ./pages ^\.\/.*$ 198 bytes {0} [built]
```

Why didn't it get separated into 2 separate chunks this time?


Then if I change **`app.js`** to use **dynamic** lazy-load:

```js
const a = 'a'
System.import('./pages/' + a);
```

It works again:

```text
chunk.0.8251e62fa20ca8d56177.js  105 bytes       0  [emitted]
chunk.1.d5d0605c6e05ca553952.js  196 bytes       1  [emitted]
   main.64d605af9185d9023bb2.js    6.74 kB       2  [emitted]  main
   [0] ./pages lazy ^\.\/.*$ 160 bytes {2} [built]
   [1] ./pages/b.js 19 bytes {0} [built]
   [2] ./pages/a.js 22 bytes {1} [optional] [built]
   [3] ./app.js 101 bytes {2} [built]
```

