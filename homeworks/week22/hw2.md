## 請列出 React 內建的所有 hook，並大概講解功能是什麼

Hook 是 React 16.8 中增加的新功能，讓 function component 擁有 state 或 class component 的功能。使用 Hook 時需要注意，只能在 React function component 中呼叫 Hook。

1. useState

```javascript=
const [state, setState] = useState(initialState);
```

- useState 用來設定 function component 的狀態。
- useState 會回傳一個 state 的值，以及更新 state 的 function，在首次 render 時，回傳的 state 值會跟傳入的初始值相同。
- 用 setState function 更新 state 的值，state 值改變就會觸發 React 重新渲染畫面

2. useEffect

```javascript=
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

- useEffect 用來告訴 React component 在 render 之後要做的事情
- 需傳入兩個參數，第一個參數傳入 function，在 render 完成之後會被呼叫。第二個參數傳入陣列，用來放想要關注的資料，當變數改變時才會呼叫 useEffect。
- 在 useEffect 可以回傳一個清除的 function，會在 component 從 UI 被移除前執行

3. useContext

- 解決跨多層傳遞資料的問題，就像建立了全域變數
- 讓父層的資料能夠被底下的任意子層存取，不需要像 props 一層一層傳遞下去，避免造成 Props drilling
- 用 React.createContext 建立一個 context 物件，並由 <MyContext.Provider value={}> 存取該物件的值，底下的子層就可以直接透過 useContext 來存取 MyContext

4. useReducer

```javascript=
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- 是 useState 的替代方案，當 state 邏輯變得複雜，需要操作多種 state 時可使用
- state：當前的 state 值
- dispatch：透過參數來和 function 溝通，藉此控制處理方式
- reducer： 用來接受一個 (state, action) => newState，並回傳當前的 state 和對應的 dispatch 方法
- initState：設定 state 的初始值

5. useCallback

```javascript=
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

- 用來記憶父元件的記憶體位置，避免在重新渲染時被重新分配
- 第一個參數是 function，第二個參數是其依賴陣列，會回傳一個 memoized 的 callback
- 在重新渲染時，只會在依賴改變時才更新，防止不必要的渲染，減少效能上的消耗

6. useMemo

```javascript=
const memoizedValue = useMemo(
() => computeExpensiveValue(a, b),
[a, b]);
```

- 用途是當 component 重新渲染時，能避免複雜的程式被重複執行
- 第一個參數是 function，第二個參數是其依賴陣列，會回傳一個 memoized 的值
- 在重新渲染時，傳到 useMemo 的 function 就只會在依賴改變時才執行，將 memoized 更新成回傳的值

7. useRef

```javascript=
const refContainer = useRef(initialValue);
```

- 用來抓取 DOM 節點，存放的值不會受到 render 影響
- 會回傳一個 mutable 的 ref object，其 .current 屬性會被初始為傳入的參數 initialValue
- 當 .current 屬性有變動時不會觸發重新 render，而每次 render 時都會給同一個 ref object

8. useImperativeHandle

```javascript=
useImperativeHandle(ref, createHandle, [deps])
```

- 可以在父層調用子層中 ref，選取指定的 DOM 節點
- 第一個參數是接收的 ref
- 第二個參數是傳給父層的方法

9. useLayoutEffect

- 功能與 useEffect 相似，差別在於 useLayoutEffect 會在瀏覽器執行繪製之前執行

10. useDebugValue

```javascript=
useDebugValue(value)
```

- useDebugValue 可以用來在 React DevTools 中顯示自訂義 hook 的標籤。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](https://i.imgur.com/ySODoXR.png)

class component 的 lifecycle methods 可以分為三大類：

1. Mounting - 裝載，當元件被加入到 DOM 中時會觸發

- constructor(props)
  constructor 會在 component 還沒被掛載到 DOM 之前先被執行，用來初始化 state，直接將初始值指定給 this.state 這屬性。
- static getDerivedStateFromProps()
  getDerivedStateFromProps() 會在「每一次」跑 render() 之前被呼叫執行。

- render()
  render() 是 class component 中唯一必要的方法。在每次 props 或是 state 被改變時，都會被執行一次。根據當前 this.props 及 this.state 的資料狀態，來決定該元件當前的 UI 結構和顯示內容。

- componentDidMount()
  在一個 component 被 mount（加入 DOM tree 中）後，componentDidMount() 會馬上被呼叫。適合在 componentDidMount() 做的，像是綁定元件的 DOM 事件，或 AJAX 拉遠端資料來進一步初始化元件。

2. Updating - 更新，當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發

- static getDerivedStateFromProps(props, state)
  getDerivedStateFromProps 會在每一次 render() 之前被呼叫執行，不管是在首次 mount 時或後續的更新時。執行時會傳入當前的 props 和 state，執行後需要返回一個物件 (object) 來表示欲更新的 state 或返回 null 表示不更新。

- shouldComponentUpdate(nextProps, nextState)
  shouldComponentUpdate() 是用來你想最佳化效能時使用，每當 Props 或 State 有更新時，React 會在 call render() 重繪畫面之前，先 call shouldComponentUpdate() 決定是否真的需要 render()。

- render()
  render() 是 class component 中唯一必要的方法。在每次 props 或是 state 被改變時，都會被執行一次。根據當前 this.props 及 this.state 的資料狀態，來決定該元件當前的 UI 結構和顯示內容。

- getSnapshotBeforeUpdate(prevProps, prevState)
  getSnapshotBeforeUpdate() 在提交最新 render 的 output 之前立即被調用。它讓你在 DOM 改變之前先從其中抓取一些資訊（例如滾動軸的位置）。這個生命週期方法回傳的任何值會被當作一個參數傳遞給 componentDidUpdate()。

- componentDidUpdate(prevProps, prevState, snapshot)
  componentDidUpdate() 會在元件更新完成、執行完 render() 重繪後被執行。而每一次元件更新時，React 確保 componentDidUpdate() 只會被執行一次。

3. Unmounting - 卸載，當元件要從 DOM 中被移除時會觸發

- componentWillUnmount()
  componentWillUnmount() 會在ㄧ個 component 被 unmount 和 destroy 後馬上被呼叫。，例如清除 timer、取消 AJAX request、移除 event listener 等。

---

React Hook Flow
![](https://i.imgur.com/5rkTU23.png)

## 請問 class component 與 function component 的差別是什麼？

1. 渲染
   function component 就是一個單純回傳 JSX 的函式，而 class component 是一個繼承 React.Component 的 JS 物件，它裡面必須調用一個 render() 方法，這個方法會回傳 JSX。

2. props 傳遞
   寫 class component 的時候，隨時都可以用 this.props.onChange 拿到最新的屬性。function component 則是每一次 render 就是一次 function call，而傳進來的 props 就會是「當時」的 props，不會因為 props 改變而改變。

3. 生命週期
   寫 class component 時你會以那些 lifecycle 去思考，去想說「didMount 要做什麼」、「update 的時候要做什麼」，但 hook 的重點會放在「每一次 render」。class component 是以 class 的 instance 為主體去思考，而 hook 是以 function 為主體去思考。但是 function component 就是「每一次 render 都會把整個 function 重新執行一遍」。

4. 效能
   class component 即使狀態沒變化，只要調用到 setstate 就會觸發重新渲染。function component 會進行檢測，只有狀態值真正改變時，才會觸發渲染，換句話說就是提升了整體效能。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

- 在 React 中表單元素的處理主要可以分成 Controlled 和 Uncontrolled 這兩種

- 關於 Controlled 和 Uncontrolled 指的是「資料受不受到 React 所控制」

- Uncontrolled component
  在瀏覽器中，像是 <input /> 這類的表單元素本身就可以保有自己的資料狀態，這也就是爲什麼當我們在 <input /> 中輸入文字後，可以直接透過 JavaScript 選到該 input 元素後，再取出該元素的值，因為使用者輸入的內容（資料）可以直接保存在 <input /> 元素內。

- Controlled component
  可以把表單內使用者輸入的資料交給 React，在使用者輸入資料的同時驗證使用者輸入內容的有效性，並做瀏覽器畫面的更新。這種把表單資料交給 React 來處理的就稱作 Controlled Components，也就是受 React 控制的資料
