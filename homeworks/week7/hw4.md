## 什麼是 DOM？
* DOM = Document Object Model = 文件物件模型
* DOM 負責將文件(html 檔案內容)轉換為物件，讓 JavaScript 可以去拿到並改變元素，而使瀏覽器的畫面能夠改變
*  DOM 讓我們能用 JavaScript 去改變瀏覽器畫面上的東西

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
* 當這些元素之間有階層關係時，觸發內層元素的監聽事件時，也會同時觸發外層元素的監聽事件，並且順序為由內而外傳遞，此現象為『事件傳遞機制』
* DOM 事件傳遞時有三個階段：
    1. CAPTURING_PHASE (捕獲)
    2. AT_TARGET (目標)
    3. BUBBLING_PHASE (冒泡)
* 事件會由上往下傳遞（捕獲），一直到 target（點擊目標）時，再由下往上逆向回傳（冒泡）
* 如何決定監聽事件掛在哪個階段？
    * addEventListener 除了『事件』及『call back function』之外，還有第三個參數『布林值』(true/false)。
    * 若沒有特別指定，監聽事件預設為掛在冒泡階段
    * true = 監聽掛在『捕獲階段』
    * false = 監聽掛在『冒泡階段』
    * addEventListener 的第三個參數只是決定在「哪邊」加上這個監聽事件，而不是改變原本事件傳遞的流程。捕獲與冒泡是「無論如何」都會發生的，而且順序永遠不會改變的一個東西

## 什麼是 event delegation，為什麼我們需要它？
* event delegation = 事件代理機制
* 依據事件傳遞的特性，所有事件最後都會冒泡傳遞到最上層，因此只要在最上層加上監聽事件，就可以監聽所有下階層的元素
* 較有效率、可以處理動態新增情形

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
* `event.preventDefault()` = 阻止預設行為
* 阻止瀏覽器的預設行為(EX:阻止超連結、阻止送出表單)
* `event.stopPropagation()` = 中止事件傳遞
* `event.stopPropagation()` 加在哪邊，事件的傳遞就斷在哪裡，不會繼續往下傳遞
* 將此功能加在 target 上，則一直點擊也只會傳遞到 target 本身，並不會繼續向上冒泡
* 若不想觸發同階層其他事件，需使用 e.stopImmediatePropagation