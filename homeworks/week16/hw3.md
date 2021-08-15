```javascript=
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
1. 進入 global 的 Execution context(EC) 
2. 初始化 global EC 的 Variable object(VO)
    * fn: function
    * a: undefined
3. 開始執行 global EC
    * fn: function
    * a: 1
4. 呼叫 function fn
---
5. 進入 fn 的 EC
6. 初始化 fn EC 的 VO
    * fn2: function
    * a: undefined
7. 開始執行 fn EC
8. console.log(a) => a = undefined(步驟 6.) => 印出 undefined
9. `var a = 5`
    * a: 5
10. `console.log(a)` => a = 5(步驟 9.)=> 印出 5
11. `a++`
    * a: 6
12. `var a` (a 已經宣告過了，可忽略)
13. 呼叫 function fn2
---
14. 進入 fn2 的 EC
15. 初始化 fn2 EC 的 VO
    * 無
16. 開始執行 fn2 EC
17. `console.log(a)` => 此 function 中沒有宣告變數 a => 往上一層找(fn VO) => a = 6(步驟 11.) => 印出 6
18. `a = 20` => 此 function 中沒有宣告變數 a => 往上一層找(fn VO) => 在 fn VO 中找到 a (步驟 11.) => a 重新賦值為 20
19. `b = 100` => 此 function 中沒有宣告變數 b => 往上找都沒找到 => 將 b 宣告為全域變數 => b = 100
20. fn2 結束
---
21. 回到 fn EC
22. console.log(a) => a = 20(步驟 18.) => 印出 20
23. fn 結束
---
24. 回到 global EC
25. console.log(a) => a = 1(步驟 5.) => 印出 1
26. a = 10
    * a: 10
27. console.log(a) => a = 10(步驟 26.) => 印出 10
28. console.log(b) => b = 100(步驟 19.) => 印出 100
29. global 結束
30. 執行結束

由上述步驟可知此程式碼執行依序印出 undefined、5、6、20、1、10、100

