## 請簡單解釋什麼是 Single Page Application
SPA 及 MPA 為兩種不同的網頁設計方式
1. SPA(Single-Page Applicatio) 單頁應用
    * SPA 網站實際上其實只有一個頁面，透過動態重寫當前頁面來與使用者互動，而非傳統的從伺服器重新載入整個新頁面
    * 使用 AJAX 技術來處理網頁，解決 MPA 頁面重整的問題，在送出資料且收到伺服器的回覆後，只針對需要更新的頁面元素來更新

2. MPA(Multi-Page Application) 多頁應用
    * 網站的每一個畫面都是個別的 HTML 檔案，因此每次載入新的頁面都重新載入一次

![spa&mpa](https://img.onl/uFZFAf)
![spa&mpa](https://img.onl/Rkh07b)

3. 使用時機
    * MPA 跟 SPA 都有其各自較適合使用的情境，首先必須明確你的商業目標，然後依照實現這些目標需要具備的功能去選擇適當的設計方法，或是混合使用。

    * SPA 較適合資料經常變動，需叫即時反應的網頁，例如社交網站、聊天室，Netflix、Gmail、Facebook、Twitter 都是著名的 SPA 網頁

    * MPA 較適合靜態內容及較依賴 SEO 的網頁，例如部落格、電商平台、產品網站

## SPA 的優缺點為何
1. SPA 優點：
    * 前後端明確劃分：
    開發團隊可以同時進行前端及後端的工作，網頁也較好維護

    * 使用者體驗較佳：
    由於 SPA 不需要透過連結實現頁面跳轉，避免在跳轉時產生的空白，也可以設計線性使用者體驗，通過滾動頁面使用者就可以體驗無縫的瀏覽
    ![spa](https://img.onl/dWctc)

    * 反應速度快：
    資源不需要每次互動都載入，初始載入後，只有新資料在伺服器和瀏覽器之間傳輸，所以SPA的伺服器負載非常輕，因此反應速度比 MPA 快很多

    * 可離線使用：
    SPA 可以只需要向伺服器傳送一次請求，儲存從伺服器接收的所有資料，因此，即使在裝置失去網際網路連線的情況下，SPA也可以在很大程度上發揮作用

2. SPA 缺點：
    * 不利於搜尋引擎優化(SEO):
    SPA 使用 JavaScript 執行，它只在使用者互動後才載入內容。因此，當網路爬蟲試圖在搜尋引擎中索引頁面時，SPA看起來就像一個沒有內容的空頁面。由於一些流行的網路搜尋引擎的爬蟲缺乏 JavaScript 執行能力，SEO 已成為 SPA 網站必須面對的一個問題

    * 前進後退路由管理：
    由於 SPA 在一個頁面中顯示所有的內容，所以不能使用瀏覽器的前進後退功能，需要另外處理

3. MPA 優點：
    * 較適合 SEO
    * 較易於新增功能

4. MPA 缺點：
    * 較差的使用者體驗
    * 反應速度較慢
    * 前後端相依性較高

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
Ajax 可以非同步的拿到的資料，並由客戶端透過 JavaScript 渲染出來  (client-side render)。PHP 則是負責處理 server 收到的 request，處理完之後再回傳，回傳資料是由伺服器端呈現 (server-side render)
* PHP 
    1. 把資料拿出來
    2. 把資料跟 HTML 結合(UI) 在一起
    3. server-side render
    4. 回傳 HTML、CSS、JavaScript
    5. browser => render

* Ajax
    1. 把資料拿出來
    2. 變成某種格式(JSON)
    3. 回傳
    4. JavaScript => render
    5. client-side render
    6. HTML => 空的(後來 JS 才 render 上去)

## Reference
* [Single-Page Apps vs Multi-Page Apps: What To Choose For Web Development](https://www.thirdrocktechkno.com/blog/single-page-apps-vs-multi-page-apps-what-to-choose-for-web-development/)
* [Single-page App vs. Multi-page App: Pros, Cons, and Which is Better?](https://lvivity.com/single-page-app-vs-multi-page-app)
* [Difference Between AJAX and PHP](http://www.differencebetween.net/technology/difference-between-ajax-and-php/)
* [[Angular 深入淺出三十天] Day 01 - MPA 與 SPA](https://ithelp.ithome.com.tw/articles/10202427)
* [SEO 優缺點剖析，甚麼時候該用哪個？](https://www.leunghoyin.hk/spa-vs-mpa)
