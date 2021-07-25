## 短網址系統設計

短網址系統可以將原有的 URL 縮短，並且透過短網址能夠重新導向至原有的  URL，[TinyURL](https://tinyurl.com/app)、[bit.ly](https://bitly.com/)、[goo.gl](https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html)、[PicSee](https://picsee.io/)...等網站都提供了短網址服務。

## KGS
可以建立一個獨立的 KGS(Key Generation Service) 預先生成隨機的固定長度 key 存在 Database(key-DB) 裡面，並且確保插入到 key-DB 中的所有 key 都是唯一的。當需要產生短網址時，就拿一個 key 配對，並與原有的 URL 一起存在另外的 Database 裡面。這種方法不需要經過編碼就能產生短網址，較為簡單快速。

## Cache
可以將較常使用的 URL 存在 Cache 裡面，server 在查詢 URL 時會先到 Cache 查詢，如果沒有查到再到 Database 裡面找，這種做法可以提升查詢的效率。根據 80/20 法則，20% 的 URL 產生 80% 的流量，可以先設定 Cache 每日流量的 20% ，再根據 client 的使用模式調整

## Load Balancer(LB)
透過 Load Balancer 將 request 平均分配給後端的 server，達到負載平衡並使資源使用最佳化，避免過載當機的風險

## Cleanup service 
系統應該要定期搜索過期的短網址，並且刪除，刪除後的短網址可以放回 key-DB 裡面繼續提供使用

## 系統示意圖
下圖為簡單的短網址系統示意圖，紅色部分為創建短網址的流程，藍色部分則是輸入短網址導向至原 URL 的過程
![URL shortening](https://img.onl/Jix24j)

## Reference
[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
[Designing a URL Shortening service like TinyURL](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)
[經典系統設計面試題解析：如何設計TinyURL](https://www.twblogs.net/a/5db35e84bd9eee310ee68793)
[System Design : Scalable URL shortener service like TinyURL](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
