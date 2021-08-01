```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
* 在物件導向中，this 代表呼叫這個 function 的 instance
* 在非物件導向的環境中，this 的值會隨著呼叫 function 的方式改變而有所不同，跟 this 的位置無關
* 此例程式碼為非物件導向環境，因此可由以下方法判斷 this 的值:
    1. `obj.inner.hello() === obj.inner.hello.call(obj.inner)`
    this 的值就是 call 傳入的第一個參數，印出的值為 obj.inner.value，因此印出 2
    2. `obj2.hello() === obj2.hello.call(obj2)`
    this 的值就是 call 傳入的第一個參數，印出的值為 obj2.value，而 obj2 又等於 obj.inner，因此印出 obj.inner.value 等於 2
    3. `hello() === hello.call()`
    this 的值就是 call 傳入的第一個參數，因此印出的值為 undefined
* 此程式碼執行後依序印出 2, 2, undefined
