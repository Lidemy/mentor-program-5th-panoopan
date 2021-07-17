## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
* DNS，也就是網域名稱系統，它將人們可讀取的網域名稱 (例如，www.amazon.com) 轉換為機器可讀取的 IP 地址 (例如，192.0.2.44)。DNS 伺服器將名稱請求轉換為 IP 地址，以控制最終使用者在 Web 瀏覽器中輸入網域名稱時要連接的伺服器。

* Google Public DNS
Google Public DNS 是 Google 提供的一個免費域名解析服務(DNS)。
由於許多第三方 DNS 管理軟體會以合法途徑試圖將使用者重新導向至惡意網站，導致瀏覽器進入未註冊域名時重新導向到廣告提供商的頁面，因此 Google 表示推出免費 DNS 服務的主要目的就是為了改進網路瀏覽速度、改善網路使用者的瀏覽體驗。Google 還特別重視處理域名服務的安全問題，他們還證實他們的成果可抵禦域名伺服器快取污染，以及分散式阻斷服務攻擊。而對於 Google 而言，可藉由此服務更精準的搜集線上活動資料，應用於商業行為而獲利。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
在執行 transaction 時，會遇到 race condition 的問題。像是多人同時搶購限量商品時，多個 request 抵達 server，server 同時處理，無法保證哪一個 request 會先處理完，而造成超賣的問題。要解決這種問題，就必須用 Lock 把正在處理的資料鎖起來，讓其他人無法存取，等到 transaction commit 之後再開放，缺點是會造成效能上的損耗。使用時要注意必須在 Transaction 中使用，而 Lock 要指定 row 否則會 lock 整個 table，並且 database 的型態如果為 MyISAM 則不支援 Transaction 及 Lock

## NoSQL 跟 SQL 的差別在哪裡？
* SQL (結構化查詢語言)是用於和關聯式資料庫溝通的語言，它用在資料庫中建立 Table ，以及從資料庫中新增、修改和刪除資料，串連 Table 之間的資料。

* NoSQL 是 Not Only SQL 的縮寫，是一種非關聯式資料庫，將資料儲存為類似 JSON 的文件，並對資料進行查詢，這是一個 document 資料庫模型，在這個模型中，資料並不存儲在 Table 中，doucment 是 key-value 的有序集合。資料庫中的每個doucment 不需要具有相同的數據結構。

## 資料庫的 ACID 是什麼？
ACID，是指資料庫管理系統（DBMS）在寫入或更新資料的過程中，為保證事務（transaction）是正確可靠的，所必須具備的四個特性
* 原子性(Atomicity)：全部失敗，或者全部成功
* 一致性(Consistency)：維持資料的一致(錢的總數相同)
* 隔離性(Isolation)：多筆交易不會互相影響(不能同時改同一個值)
* 持久性(Durability)：交易成功之後，寫入的資料不會不見