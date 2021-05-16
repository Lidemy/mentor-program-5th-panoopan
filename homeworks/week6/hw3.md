## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
* **datalist**
可以用 `<datalist>` 標籤製作有自動完成功能的下拉式選單，使用時必須與 `<input>` 一起使用，否則選單會被隱藏，並且 `<datalist>` 的 id 必須與 `<input>` 中的 list 屬性相同。
```htmlmixed=
<label for="browser">Choose your browser from the list:</label>
<input list="browsers" name="browser" id="browser">

<datalist id="browsers">
  <option value="Edge">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```
![datalist](https://img.onl/p22x9y)

* **progress**
用 `<progress>` 標籤配合 JavaScript 可以製作任務進度條，例如顯示下載進度
```htmlmixed=
<label for="file">Downloading progress:</label>
<progress id="file" value="32" max="100"> 32% </progress>
```
![progress](https://img.onl/lZfnhf)

* **textarea**
用 `<textarea>` 標籤建立可以輸入多行文字的輸入框，其中可以利用屬性調整細節，例如：rows 設定輸入框的高度是幾行文字、cols 設定輸入框的寬度是多少文字
```htmlmixed=
<label for="w3review">Review of W3Schools:</label>
<textarea id="w3review" name="w3review" rows="4" cols="50">
At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies. 
</textarea>
```
![textarea](https://img.onl/Bb4EC7)

* Reference: [w3schools](https://www.w3schools.com/html/)

## 請問什麼是盒模型（box modal）
* box model = 盒模型，由 content、width、height、padding、border、margin 組成
* 在網頁上打開 devTool 會顯示圖示
![box](https://img.onl/GoSjdJ)

* padding：內邊距，元素往外撐開，會改變元素大小
padding:30px --> 上下左右都外推 30px
padding:10px 20px --> 上下 10px、左右 20px
pddding:10px 20px 10px 20px --> 上 右 下 左

* margin：外邊距，元素大小不變，改變元素位置
margin:20px --> 上下左右都離旁邊 20px
分開設定的原則與 padding 相同

* user agent stylesheet：
瀏覽器預留的 margin，在 CSS 一開始的時候就要先消掉，否則會影響設定(body{margin: 0px;})

* box-sizing:border-box
一般設定好寬高後，再加上 padding、margin 會影響盒模型大小，用 box-sizing:border-box 可以將盒模型大小固定，加 padding 就會往內擴張，自動調整 content 大小，不會影響盒模型大小

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* **block**：區塊元素，EX:div、h1、p...
display: block，元素可以隨意調整屬性，但不能並排

* **inline**：行內元素，EX:span、a
display: inline，元素寬高不管怎麼調整都不會改變，margin、padding 只能調整左右距離，不能調上下。padding 只會影響有背景或邊界元素的上下寬度，如果只有文字看不出來

* **inline-block**：EX:button、input、select
最大的差別是可以在同一行裡面，放多個 block。對外像 inline 可併排，對內向 block 可調整各種屬性

* **inline-block 的小陷阱**
在 inline-block 中，並排的區塊元素之間就算 margin 為 0，中間仍有距離，是因為寫 html 時 div 之間有空行導致的。若將 div 的空行刪除或加入註解，則可以達到真正 margin=0 的效果。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
* **static**：網頁的預設排版方式
不跳脫排版流、不以特殊位置排列的預設狀，一般如果沒有特別設定的元素 position 都是 static。

* **relative**：相對定位
不跳脫排版流，以原本的位置為原點去做移動。
將元素的 position 設定為 relative，則可以隨意調整位置，並且其他元素不會被影響。如果要將元素作為 absolute 的母元素時，也可設定為 relative。

* **absolute**：絕對定位
跳脫排版流，以特定元素（EX:上一層母元素）為原點去移動。
需要有一個參考點，以參考點做定位，此參考點為程式碼往上找，找到的第一個不是 static 的元素，就是參考點，如果都找不到就會以 body 做定位。

* **fixed**：固定定位
跳脫排版流，以視窗為原點去移動。
相對於 viewport 的定位。將 display 設定為 fixed，不論網頁如何上下滾動，元素都會保持在同一個位置。

* **範例**：在網頁中間顯示彈窗
![ex](https://img.onl/zBwdu)
1. 彈窗中的文字是順著排版流，置中並由上到下排列，所以 position 用 relative，再設定文字置中就好
2. 彈窗位置相對視窗是跳脫排版流的定位，所以 position 用 fixed，並設定`top:50%`、`left:50%`，配合`transform: translate(-50%, -50%)`，因為元素預設的定為原點是左上角，因此要扣掉自己寬度及高度的一半，才能達到視覺上的中點
3. 關閉鈕定位，跳脫排版流，相對於彈窗做定位，所以 position 用 absolute。absolute 會往上找到第一個不是 static 的元素做定位，在此例中是以彈窗作為定位基礎，並設定`top:10px`、`right:10px`

* Reference: [Lidemy position 與 display 實戰篇 ](https://lidemy.com/courses/932146/lectures/22768681)
