## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
* 加密(Encryption)
    1. 一對一關係，可逆
    2. 明文 => 加密 => 密文(aaa => 加密 => bbb)
    3. 密文 => 解密 => 明文(bbb => 解密 => aaa)
    4. 經過加密的資訊需要金鑰才能解密
    5. 對稱式加密：加密解密都是用同一個 key，缺點是密碼如果在傳輸過程中被攔截，則可以輕易解開加密的檔案
    6. 非對稱式加密：一組資訊會產生兩個 key，公鑰加密的內容只能用私鑰解密，私鑰不用通過傳輸，就沒有被攔截的風險

* 雜湊(hash)
    1. 多對一關係，不可逆
    2. 雜湊函數是一個單向函數，輸入一樣，輸出保證一樣，但無法從輸出推導出輸入，因為是把無限的輸入對應到有限的輸出
    3. 明文 => hash => 文字 (aaa => hash => 5u83f4w)
    4. 對其他文字做 hash 也有可能是 5u83f4w (多對一)
    5. 碰撞：當有兩個不同字串產生一樣的 hash 時稱為「碰撞」，發生機率很低
    6. 網站存取密碼 hash 之後的結果，登入時再把使用者輸入的密碼 hash 之後做比對，就可以知道是否正確
    7. 安全性比加密分法高，但仍有可能被暴力破解
    8. salting(加鹽)
    先產生一組亂數加到密碼中，再拿去 hash，確保不會太輕易被破解。
    使用 php 內建的 password_hash 功能時，[password_hash](https://www.php.net/manual/en/function.password-hash.php) 文件中提到在 7.0.0 版本之後，建議直接使用原本預設的 hash 功能，預設功能中已有 salting 處理(這部分不確定理解是否正確)，原文如下：
        > The salt option has been deprecated as of PHP 7.0.0. It is now preferred to simply use the salt that is generated by default. 

* 為什麼密碼要雜湊過後才存入資料庫？
如果資料庫中的密碼以明文儲存，一旦資料庫被攻擊密碼就會直接外洩，造成資訊安全問題。如果網站儲存的是雜湊過的密碼，在使用者忘記密碼時，解決方法為重設密碼而非提供原本的密碼，因為網站也不知道原本的密碼是多少

## `include`、`require`、`include_once`、`require_once` 的差別
* include & require：
    在 [PHP - require](https://www.php.net/manual/en/function.require.php)文件中提到：
    > require is identical to include except upon failure it will also produce a fatal E_COMPILE_ERROR level error. In other words, it will halt the script whereas include only emits a warning (E_WARNING) which allows the script to continue.

    require 跟 include 的功能基本上是相同的，都是在 php 檔案裡面引入其他檔案使用，最大的差別在於當檔案載入失敗時，require 會顯示錯誤訊息，並終止程式，include 則只會發出警告訊息，程式繼續執行。

* include_once & require_once
功能與 include 及 require 相同，差別在於加上 "_once" 時，如果相同檔案已經被引入過就不會再重複引入，使用 require 及 include 則可以重複引入相同檔案多次，容易造成多次定義同名的變數或函式的錯誤，因此大多數的時候較建議使用 include_once 或 require_once

## 請說明 SQL Injection 的攻擊原理以及防範方法
* SQL 注入：
發生於應用程式與資料庫層的安全漏洞，把惡意構造的字串注入到原本的 SQL query 中，去改變遠本的的語意，而達到仿冒別人發文或撈出資料庫其他資料的目的

* 防範方法：
在設計與資料庫連結並存取資料時，在 SQL 需要填入數值或資料的地方，使用 [Prepared Statements](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php)方法，以參數來給值，這個方法目前已被視為最有效可預防 SQL injection 的攻擊手法的防禦方式

##  請說明 XSS 的攻擊原理以及防範方法
* XSS = Cross-site Scripting = 跨網站指令碼
簡單來說就是駭客可以在你的網站上面執行 JavaScript 的程式碼。既然可以執行，那就有可能可以把使用者的 token 偷走，假造使用者的身份登入，就算偷不走 token，也可以竄改頁面內容，或是把使用者導到釣魚網站等等

* 防範方法：
正常情況應該要把留言內容作為文字解讀，而非程式碼。設計網頁時，在顯示可以使用者可以自行定義的內容時，使用 [PHP htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php) 把程式碼轉換為純文字解讀

## 請說明 CSRF 的攻擊原理以及防範方法
* CSRF = Cross Site Request Forgery = 跨站請求偽造
CSRF 就是在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」

* 「CSRF 的 reuqest 跟使用者本人發出的 request 有什麼區別 ?」
區別在於 domain 的不同，前者是從任意一個 domain 發出的，後者是從同一個 domain 發出的（假設 api 跟你的前端網站在同一個 domain）

* 防範方法
    1. 使用者的防禦
    CSRF 攻擊之所以能成立，是因為使用者在被攻擊的網頁是處於已經登入的狀態，可以在每次使用完網站就登出，就可以避免掉 CSRF

    2. Server 的防禦
    request 的 header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可。但是有些情況下瀏覽器可能不會帶 referer，或是使用者可能關閉此功能，所以檢查 referer 並不是一個很完善的方法
    
    3. 圖形驗證碼、簡訊驗證碼
    攻擊者並不知道圖形驗證碼的答案是什麼，所以就不可能攻擊了，這個方法在銀行轉帳等情況下很好用，但是如果只是一般刪除文章的 request，不可能每次都進行圖形驗證碼
    
    4. 加上 CSRF token
    在 form 裡面加上一個 hidden 的欄位，叫做 csrftoken，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中。按下 submit 之後，server 比對表單中的 csrftoken 與自己 session 裡面存的是不是一樣的，是的話就代表這的確是由使用者本人發出的 request。但是假設你的 server 支持 cross origin 的 request，攻擊者就可以在他的頁面發起一個 request，順利拿到這個 csrf token 並且進行攻擊。不過前提是你的 server 接受這個 domain 的 request

    5. Double Submit Cookie
    由 server 產生一組隨機的 token 並且加在 form 上面，同時也讓 client side 設定一個名叫 csrftoken 的 cookie，值也是同一組 token。當使用者按下 submit 的時候，server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken，檢查是否有值並且相等，就知道是不是使用者發的了。缺點是攻擊者如果掌握了你底下任何一個 subdomain，就可以幫你來寫 cookie，並且順利攻擊了

    6. SameSite cookie
    Google 在 Chrome 51 版的時候正式加入了 [SameSite cookie](https://www.chromestatus.com/feature/4672634709082112) 功能
    > Same-site cookies (née "First-Party-Only" (née "First-Party")) allow servers to mitigate the risk of CSRF and information leakage attacks by asserting that a particular cookie should only be sent with requests initiated from the same registrable domain.
            
    把 Cookie 的 header 改成 `name: value; SameSite` 就可以了

## Reference
[password_hash](https://www.php.net/manual/en/function.password-hash.php)
[一次搞懂密碼學中的三兄弟 — Encode、Encrypt 跟 Hash](https://medium.com/starbugs/what-are-encoding-encrypt-and-hashing-4b03d40e7b0c)
[[資訊安全] 密碼存明碼，怎麼不直接去裸奔算了？淺談 Hash , 用雜湊保護密碼](https://medium.com/@brad61517/%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8-%E5%AF%86%E7%A2%BC%E5%AD%98%E6%98%8E%E7%A2%BC-%E6%80%8E%E9%BA%BC%E4%B8%8D%E7%9B%B4%E6%8E%A5%E5%8E%BB%E8%A3%B8%E5%A5%94%E7%AE%97%E4%BA%86-%E6%B7%BA%E8%AB%87-hash-%E7%94%A8%E9%9B%9C%E6%B9%8A%E4%BF%9D%E8%AD%B7%E5%AF%86%E7%A2%BC-d561ad2a7d84)
[PHP - require](https://www.php.net/manual/en/function.require.php)
[Prepared Statements](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php)
[PHP htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php)
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
[SameSite cookie](https://www.chromestatus.com/feature/4672634709082112)

