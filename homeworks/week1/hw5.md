## 請解釋後端與前端的差異。
* ==前端(Front-end)==:看得見的部分，例如網頁排版、互動
    * HTML: 負責網站內容架構，是一種標籤語言(Markup Language)
    * CSS: 負責網站外觀裝飾，例如排版、顏色，是一種樣式表 (StyleSheet)
    * JavaScript: 負責網站互動及資料溝通，用來處理網站上需要邏輯判斷的功能，是一種程式語言

* ==後端(Back-end)==:看不見的背後運行步驟，例如執行程式及資料處理
    * 後端開發工具有 PHP、Python、Ruby on Rails 等

* 以 Google 表單為例，從送出表單到看到結果，中間發生什麼事?
 ```
    1. 送出 Google 表單（前端）
    2. 瀏覽器叫作業系統送出 Request（前端）
    3. 作業系統叫網路卡送出 Request（前端）
    4. 送出 Request 到 Google 的雲端 Server（後端）
    5. Server 將表單資料存到 Database 裡（後端）
    6. 存取成功後 Server 將 Response 回傳到網路卡（後端）
    7. 網路卡經過解析後將 Response 回傳給瀏覽器（後端）
    8. 瀏覽器顯示結果（前端）

    (網頁與手機的運作原理類似)
```

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
1. 輸入關鍵字「JavaScript」
2. 瀏覽器問 DNS server google.com 的 IP 位置
3. DNS server 回傳 IP
4. 瀏覽器送出關鍵字到 google 的雲端 server
5. google server 去資料庫查詢「JavaScript」
6. server 將搜尋結果回傳到瀏覽器
7. 瀏覽器顯示結果

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. diff : 比較兩個檔案的內容差異(EX: diff file1.ext file2.ext)
2. uname : Unix Name 的縮寫，列出此主機的作業系統名稱
3. netstat：查詢網路目前狀況