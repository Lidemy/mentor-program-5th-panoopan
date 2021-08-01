```javascript=
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
1. for 迴圈放到 Call stack 執行 
2. i=0 判斷符合 i<5 條件
3. `console.log('i: ' + i)` 放到 Call stack 執行 => 印出 i: 0
4. `setTimeout(() => {console.log(i)}, i * 1000)` 放到 Call stack 執行 => 交給瀏覽器處理 => 從 Call stack pop => 等待 0 * 1000 毫秒 => 第一個參數轉移到 Callback Queue
5. `i++` 放到 Call stack 執行 => i=i+1 => i=1 
6. 重複 2. 到 5. 步驟直到 i=5
7. i=5 判斷不符合 i<5 條件 => 迴圈結束 => 從 Call stack pop
8. 此時 Call stack 的任務已經清空
9. Event Loop 將在 Callback Queue 等待的 `() => {console.log(i)}` 放到 Call stack 執行
10. 此 function 中沒有宣告變數 i => 往上層找 => 發現 i 為全域變數(因為 var 的 scoop 為 function)， i 值為 5(步驟 6.) => 印出 5 => pop
11. 重複 9. 到 10. 步驟直到 Callback Queue 清空
12. 執行結束

由上述步驟可知此程式碼執行依序印出 i:0、i:1、i:2、i:3、i:4、5、5、5、5、5

---
* 補充
如果要將程式碼改為顯示 i:0、i:1、i:2、i:3、i:4、0、1、2、3、4，有三種方式：
1. 用 closure 的方式，新建一個 function 並回傳另外一個 function，這樣每個 setTimeout 的 callback function 的 i 就都會自己的作用域
```javascript=
for (var i = 0; i < 5; i++) {
  console.log('i: ' + i);
  setTimeout(log(i), i * 1000);
}

function log(n) {
  return function() {
    console.log(n);
  };
}
```
2. 方法同 1.，只是不另外寫一個 function，而是用 IIFE 把匿名 function 包起來並立即執行
```javascript=
for (var i = 0; i < 5; i++) {
  console.log('i: ' + i);
  setTimeout(
    (function(n) {
      return function() {
        console.log(n);
      };
    })(i),
    i * 1000
  );
}
```
3. 直接把 var 改成 let，因為 let 的作用域為 block，因此每個 setTimeout 的 callback function 都有自己的作用域
```javascript=
for(let i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

