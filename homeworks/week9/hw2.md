## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
* 資料設定差異
在建立欄位時，VARCHAR 可以指定字節長度，在 MySQL 5.0.3 以下的版本其限制為 0~255，在 5.0.3 以上之版本改為 0~65535，TEXT 的長度則固定為最大值 65535

* 儲存差異
VARCHAR 儲存的資料佔比較小的數據庫容量，索引速度也比較快。TEXT 則是可以因應更大的儲存量，在選單中選擇 MEDIUMTEXT 最多可以儲存 16MB 的資料，而 LONGTEXT 則可以達到 4 GB

* 平常選擇欄位型態時，可以先考量使用 VARCHAR，除非資料量超過 VARCHAR 的最大值時，再選擇 TEXT

* Reference:[Choosing Between VARCHAR and TEXT in MySQL](https://www.navicat.com/en/company/aboutus/blog/1308-choosing-between-varchar-and-text-in-mysql)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
* Cookie 
是某些網站為了辨別使用者身分而儲存在用戶端（Client Side）上的資料，為一種小型文字檔案

* stateless
由於 HTTP 無狀態 (stateless) 的特性，使網站無法辨別使用者身份或儲存瀏覽資訊，而為了建立更好的網路使用體驗，必須克服這個問題才能實現保持登入狀態、記住網站偏好設定...等功能

* stateful
透過 session 機制可以使 HTTP 的狀態從 stateless 變為 stateful，而 cookie 就是實作 session 機制的其中一種方式

* Cookie 設置流程
    1. Set-Cookie
    瀏覽器發送一個 Request 給 Server -> Server 傳的 response header 中用 Set-Cookie 帶上要瀏覽器儲存的資訊 -> 瀏覽器把這些資訊存在 Cookie 裡面
    2. 再次瀏覽同一個網頁時
    Cookie 由 Name 及 Value 組成，並帶上一些參數，EX: 存在哪個 Domain(在這個 Domain 底下的網頁都可以存取這個 cookie)、路徑、到期日...，再次瀏覽同一個網頁時，瀏覽器自動帶上符合資格的 Cookie(沒過期、domainr 及路徑符合)，放在 Cookie 這個 header 裡面一起發 Request 給 Server，Server 根據 Cookie 的內容判斷狀態

* 預防 Cookie 被竄改的方法
由於瀏覽器上 Cookie 帶的資訊可以被隨意修改，因此需要一些處理避免此問題發生，主要解決方法有兩種：
    * Cookie-based session
    把所有的 Session 狀態都存在 Cookie 裡面，並且將內容加密，以避免被竄改
    * Session ID
    Session ID 為一串隨機產生的亂數，這種方法只在 Cookie 裡存 ID 來辨識身份，其他狀態都存在 Server，預防其他人偽造身份登入竄改資料

* Reference
    1. [白話 Session 與 Cookie：從經營雜貨店開始](https://hulitw.medium.com/session-and-cookie-15e47ed838bc)
    2. [Cookie-Wiki](https://zh.wikipedia.org/wiki/Cookie)

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
這題...老實說，現在完全沒有頭緒！！！只好先偷看一下後面的課程
1. 明文密碼
密碼直接存在資料庫裡，如果資料庫被偷了，全部的密碼就被看光光了
2. 輸入 html 標籤跑版問題
![week9-hw2](https://img.onl/FRlwHU)
