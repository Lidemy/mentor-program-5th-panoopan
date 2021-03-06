``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行第 1 行，函式 isValid 需傳入一個陣列，將最後一行的陣列參數帶入函式。function isValid 參數 arr = [3, 5, 8, 13, 22, 35]
2. 執行第 2 行，迴圈初始值為 0，執行條件為小於陣列長度 6，每個迴圈 i + 1，開始進入迴圈
3. 執行第 3 行，判斷陣列的第 0 個元素 3 是否小於等於 0，不是，第一圈結束，跳回第 2 行，i++，i 變為 1，檢查是否小於陣列長度 6，是，繼續執行
4. 執行第 3 行，判斷陣列的第 1 個元素 5 是否小於等於 0，不是，第二圈結束，跳回第 2 行，i++，i 變為 2，檢查是否小於陣列長度 6，是，繼續執行
5. 執行第 3 行，判斷陣列的第 2 個元素 8 是否小於等於 0，不是，第三圈結束，跳回第 2 行，i++，i 變為 3，檢查是否小於陣列長度 6，是，繼續執行
6. 執行第 3 行，判斷陣列的第 3 個元素 13 是否小於等於 0，不是，第四圈結束，跳回第 2 行，i++，i 變為 4，檢查是否小於陣列長度 6，是，繼續執行
7. 執行第 3 行，判斷陣列的第 4 個元素 22 是否小於等於 0，不是，第五圈結束，跳回第 2 行，i++，i 變為 5，檢查是否小於陣列長度 6，是，繼續執行
8. 執行第 3 行，判斷陣列的第 5 個元素 35 是否小於等於 0，不是，第六圈結束，跳回第 2 行，i++，i 變為 6，檢查是否小於陣列長度 6，不是，此迴圈執行完畢，繼續往下
9. 執行第 5 行，迴圈初始值為 2，執行條件為小於陣列長度 6，每個迴圈 i + 1，開始進入迴圈
10. 執行第 6 行，判斷陣列的第 2 個元素 8 是否不等於第 1 個元素 5 與第 0 個元素 3 的和，不是，第一圈結束，跳回第 5 行，i++，i 變為 3，檢查是否小於陣列長度 6，是，繼續執行
11. 執行第 6 行，判斷陣列的第 3 個元素 13 是否不等於第 2 個元素 8 與第 1 個元素 5 的和，不是，第二圈結束，跳回第 5 行，i++，i 變為 4，檢查是否小於陣列長度 6，是，繼續執行
12. 執行第 6 行，判斷陣列的第 4 個元素 22 是否不等於第 3 個元素 13 與第 2 個元素 8 的和，是，回傳 'invalid'，此迴圈執行完畢
13. 執行完畢


> 費波那契數列 (Fibonacci numbers)
所謂費波那契數列，是指在一串數字中，每一項是前兩項的和。數學上的定義為：
第 0 項 = 0
第 1 項 = 1
第 n 項 = 第 n-1 項 + 第 n-2 項
從上面的數學定義，我們可以簡單列出數列的 0 到 10 項為：0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55。

[初學者學演算法｜從費氏數列認識何謂遞迴](https://medium.com/appworks-school/%E5%88%9D%E5%AD%B8%E8%80%85%E5%AD%B8%E6%BC%94%E7%AE%97%E6%B3%95-%E5%BE%9E%E8%B2%BB%E6%B0%8F%E6%95%B8%E5%88%97%E8%AA%8D%E8%AD%98%E4%BD%95%E8%AC%82%E9%81%9E%E8%BF%B4-dea15d2808a3)