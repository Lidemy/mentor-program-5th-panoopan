## 什麼是 Ajax？
* AJAX = Asynchronous JavaScript And XML = 非同步的  JavaScript 與 XML 技術

* 同步：
執行到某一行的時候，會等這行執行完畢，才執行到下一行，確保執行順序，一般用 Node.js 寫的 JavaScript 都是同步執行的。但是如果把這個做法放到網路操作的話，等於是在上一個步驟的 response 還沒回來之前，其他功能完全都無法值行，所以才需要非同步執行的功能

* 非同步：
發出 request 之後不等結果回來就繼續執行下一行，等有 response 之後再 call back

* Ajax 一定會受到同源政策限制
> 助教建議：Ajax 的確是瀏覽器端上的技術，不過 CORS 主要是受瀏覽器限制，而非針對 Ajax 這個技術

## 用 Ajax 與我們用表單送出資料的差別在哪？
* 用 Ajax 跟 form 傳送資料的主要差別，為資料處理為同步或非同步
> 助教建議：這邊的同步與非同步會與程式概念中的名詞混淆（一定要逐行執行 vs 可以併行處理），Ajax 可以動態改變網站，在不需要換頁的情況下更動網站內容。

* 使用 Ajax 時瀏覽器會把 server 回傳的 response 傳送給 javaScript，這樣可以用瀏覽器拿到 response 並且不用換頁，達到同步的效果
![form API2](https://img.onl/wlewcW)
(圖片來源：[Lidemy [FE102] 前端必備：JavaScript](https://lidemy.com/courses/enrolled/390588))

* 用表單傳 request 到 server 會有換頁的情況發生，因為 server 回傳 response 之後，瀏覽器會直接 render 拿到的 response，直接換頁到新的網址，無法同步
![AJAX](https://img.onl/lm4ohQ)
(圖片來源：[Lidemy [FE102] 前端必備：JavaScript](https://lidemy.com/courses/enrolled/390588))

## JSONP 是什麼？
* JSONP = JSON with Padding

* 有些標籤不受同源政策限制，例如`<img>`、`<script>`

* JSONP 可以存取跨來源的資料，利用 `<script>` 不受同源政策限制之特性，在裡面放資料，透過指定好的 function 把資料帶回去
```javascript=
<script src="https://api.twitch.tv/kraken/games/top?client_id=xxx&callback=receiveData&limit=1"></script>
<script>
  function receiveData (response) {
    console.log(response);
  }
</script>
```

* JSONP 的缺點：參數永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST，如果能用 CORS 的話，還是應該優先考慮 CORS

## 要如何存取跨網域的 API？
* 如果本地網站跟要呼叫的 API 的網站「不同源」時，就會受到同源政策(Same Origin Policy)限制

* 同源定義：
相同協定(http/https)、相同網域、相同port(若有指定)、相同主機位置

* 網站不同源時，瀏覽器一樣會發出 Request，但是會把回傳的 Response 擋下來，不讓你的 JavaScript 拿到並且傳回錯誤(如果沒有透過瀏覽器，就不會有非同源的問題)

* 跨來源資源共用 = CORS = Cross-Origin Resource Sharing 
如果要使用跨來源 HTTP 請求的話，Server 必須在 Response 的 Header 裡面加上`Access-Control-Allow-Origin`。當瀏覽器收到 Response 之後，會先檢查`Access-Control-Allow-Origin`裡面的內容，如果裡面有包含現在這個發起 Request 的 Origin 的話，就會允許通過，讓程式順利接收到 Response

* 如果一樣的動作不透過瀏覽器，而是透過 Node.js 實行，就可以拿到資料，不會有不同源的問題，因為上述那些限制都是瀏覽器給的，而瀏覽器通常是因為安全性考量才加上這些限制

* Reference: [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
* 第四週與第八週的課程雖然都是在串 API，但第四週是透過 Node.js 直接發送 request 到 server，而 server 的 response 也可以直接拿到，中間沒有阻礙或限制

* 第八週則是在瀏覽器上寫 Javascript 串 API，是透過瀏覽器發出 request 到 server，而 server 回傳的 response 也是透過瀏覽器回傳。基於瀏覽器的安全性考量，因此會有一些規則限制

* 最大的差別在於有沒有經過瀏覽器這一關
