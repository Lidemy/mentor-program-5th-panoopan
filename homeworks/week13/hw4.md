## Webpack 是做什麼用的？可以不用它嗎？
1. Webpack 是一個前端打包工具(bundler)，讓製作網頁時能夠使用模組化的開發方式，將各種靜態資源視為模組打包，並在瀏覽器上可以使用。在 Node.js 可以使用 `require/module.exports` 引入模組，是因為採用了 CommonJS 這個標準，然而瀏覽器原生並不支援 CommonJS，一定要透過工具才能在瀏覽器上面使用，所以才需要 Webpack 這種工具

2. 在開發網頁時，使用 Webpack 的目的是實現瀏覽器上的模組化管理，應該視專案的需求判斷是否需要使用

## gulp 跟 webpack 有什麼不一樣？
1. gulp 
是一種任務管理系統(task manager)，讓你把各種任務（例如：babel、sass、minify…）寫在一起執行，透過各種 plug in 完成不同任務

2. Webpack 
是一種打包工具(bundler)，提供模組化的開發方式，將模組打包後在瀏覽器上使用

## CSS Selector 權重的計算方式為何？
假設有多個不同 CSS 規則套用到同一個元素，要優先使用哪一個？

1. 套用原則
    * 如果只選擇上層的父元素，下面包含的階層也會一起套用
    * 依照權重計算結果套用，權重原則為：id > class/psuedo-class/attribute > tag
    * 若權重相同，會以最後面設定的為優先

2. 權重計算方式
    * 分別計算 CSS 設定中 id、class/psuedo-class/attribute、tag 出現的次數，再跟同元素的其他設定，依序由 id 比大小到 tag，只要比到結果就停止，例如：
    ```
    div.wrapper > div.list > div.item{} => 0,3,3

    .item{}  => 0,1,0

    #pickme  => 1,0,0
    ```
    比較之下 1,0,0 權重最高，因此以顯示 #pickme 的設定為主

3. 其他情況
    * 如果元素在 html 檔案中有設定 inline style (例如：`< div style=“color: orange;” >< /div >`)，則會忽略權重計算原則優先使用
    * 最強的是`!important`，不管權重都以此為優先，但因為要修改的時後很麻煩，所以除非是要覆蓋來自第三方的 CSS(Bootstrap、normalize.css)，否則應該避免使用
