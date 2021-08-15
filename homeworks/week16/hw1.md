```javascript=

console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

```

JavaScript 在執行程式碼時，除了 JavaScript runtime 之外，還會與瀏覽器提供的其他 web API 協同合作：

1. Call stack
JavaScript 屬於單執行序（single threaded runtime）的程式碼，意即一次只執行一段程式碼，可以將程式碼視為由很多小任務組成的。任務的堆疊順序會從全域（Global Scope）的主程式（main program）開始，由程式碼下方往上堆疊任務，把 function 推（push）至執行堆疊 call stack 的最上方，以此類推往上疊加。堆疊完成後，再由最上層（也就是最後進入的）開始執行，而當該函式執行結束（return），便會將此函式從原本的最上層抽離（pop off），以此類推

2. Web APIs
瀏覽器提供許多不同的 API，讓我們能夠同時處理多項任務(DOM、AJAX、setTimeout...）

3. Event Loop
Event Loop 就是一個 user agent（此為瀏覽器）上協調各種事件的機制，負責協調將 callback queue 中各項任務放到 call stack 執行

4. Callback Queue
工作佇列負責接收從瀏覽器傳來等候被執行的任務，透過 Event Loop 的監控，以先進先出的順序執行。要注意的是，必須等 call back 裡的任務全部執行完畢清空之後，才會開始傳入 callback queue 裡面的任務，並依先進先出的排序執行

```javascript=

console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

```
這段程式碼的執行方式為：
1. `console.log(1)` 放到 Call stack 執行 => 印出 1 => pop
2. `setTimeout(() => {console.log(2)}, 0)` 放到 Call stack 執行 => 交給瀏覽器處理 => 從 Call stack pop => 等待 0 毫秒 => 第一個參數轉移到 Callback Queue
3. 上一步 `setTimeout` 離開 Call stack 的同時，就繼續把 `console.log(3)` 放進 Call stack 執行 => 印出 3 => pop
4. 重複步驟 2. 處理第二個 `setTimeout`
5. `console.log(5)` 放到 Call stack 執行 => 印出 5 => pop
6. 此時 Call stack 的任務已經清空
7. Event Loop 將在 Callback Queue 等待的 `() => {console.log(2)}` 放到 Call stack 執行 
8. 執行 console.log(2) => 印出 2 => pop
9. Event Loop 將在 Callback Queue 等待的 `() => {console.log(4)}` 放到 Call stack 執行
10. 執行 console.log(4) => 印出 4 => pop
11. 執行結束

由上述步驟可知此程式碼執行依序印出 1、3、5、2、4

模擬影片如下：
![Event Loop](https://i.imgur.com/CZHSdoI.gif)