# a. Introduction to React
[課程](https://fullstackopen.com/en/part1/introduction_to_react)
## create-react-app
這段程式碼是 React 應用程式的基礎結構，它展示了如何將 React 元件呈現到網頁的特定位置，並且是一個簡單的 "Hello world" 應用程式。

以下是每個部分的解釋：

### 1. `main.jsx`
```jsx
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

- **`import ReactDOM from 'react-dom/client'`:** 
  `ReactDOM` 是 React 的一部分，用來將 React 元件呈現在網頁上。`'react-dom/client'` 是 React 18 的 API，使用它可以讓應用程式使用新的並發特性。
  
- **`App from './App'`:** 
  這是引入了你自定義的 `App` 元件，它位於 `App.jsx` 檔案中。React 中的每個元件都是獨立模組化的，你可以將其拆分到不同的文件中以保持程式結構整潔。

- **`ReactDOM.createRoot(document.getElementById('root'))`:**
  `createRoot` 方法會將 React 應用程序 "連接" 到 HTML 文件中的某個 DOM 節點。在這裡，它將 React 應用程式掛載到具有 `id='root'` 的 HTML 節點上。

- **`.render(<App />)`**:
  `render` 方法將 `App` 元件（由 `App.jsx` 定義）渲染到你指定的 DOM 節點（這裡是 `root`）中。`<App />` 是 JSX 語法，用來描述 React 元件的呈現方式。

### 2. `App.jsx`
```jsx
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
};

export default App;
```

- **`const App = () => {}`:**
  這是定義一個名為 `App` 的函數式元件。React 中的元件可以是函數式的，這裡 `App` 是用箭頭函數表示的。

- **`return ( ... )`:**
  這裡的 `return` 是 JSX 語法，它類似於 HTML，這段程式碼會告訴 React 你希望如何呈現這個元件的內容。這裡會返回一個 `<div>` 包含一段文字 `<p>Hello world</p>`。

- **`export default App`:**
  這行程式碼允許其他文件（例如 `main.jsx`）導入這個 `App` 元件，並將其用於渲染。

### 程式執行流程：
1. React 在 `main.jsx` 中找到帶有 `id='root'` 的 DOM 節點。
2. `App` 元件會被渲染，內容是 `Hello world` 的一段文字。
3. 這段內容將會出現在網頁中 `root` 這個節點內。

這樣可以讓你在 React 中輕鬆地創建和渲染元件。你目前正處於學習 React 的基礎部分，這是接下來構建更複雜應用的基石。

如果你有任何疑問，或需要進一步解釋，可以隨時問我！

## Component
App.jsx
```jsx
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```
這段程式碼是 React 應用程式中的一個簡單元件 `App`，其中展示了如何在 React 中使用 JavaScript 變數和運算。讓我們逐步解析這段程式碼：

### `const App = () => {}`

這是一個函數式元件，名為 `App`，它負責生成和返回 HTML 結構（以 JSX 語法表示）。這裡使用了箭頭函數語法。

### 1. **`const now = new Date()`**
   
`now` 是一個用 `Date` 物件來表示當前日期和時間的變數。`new Date()` 會創建一個新的日期物件，包含當下的時間資訊。

### 2. **`const a = 10` 和 `const b = 20`**

這兩行程式碼定義了兩個常數變數 `a` 和 `b`，分別賦值為 10 和 20。

### 3. **`console.log(now, a + b)`**

這行程式碼會在瀏覽器的開發者工具的控制台中打印出當前時間 `now` 和 `a + b` 的結果（即 30）。這是一個除錯的方式，用來查看變數的值。

### 4. **`return ( ... )`**

這是 JSX 語法，表示元件返回的內容。這部分是元件渲染到畫面上的 HTML 結構。

- **第一個 `<p>` 標籤:**
  ```jsx
  <p>Hello world, it is {now.toString()}</p>
  ```
  這裡的 `{}` 是 JSX 語法用來嵌入 JavaScript 表達式的地方。`now.toString()` 會將日期物件轉換為字串形式，然後顯示在網頁上。結果會類似於：
  ```
  Hello world, it is Mon Sep 07 2024 10:45:34 GMT+0800 (Taipei Standard Time)
  ```

- **第二個 `<p>` 標籤:**
  ```jsx
  <p>{a} plus {b} is {a + b}</p>
  ```
  這裡的 `{a}` 和 `{b}` 是 JavaScript 變數，表示數值 10 和 20，`{a + b}` 則表示它們的和（30）。這段程式碼的結果將是：
  ```
  10 plus 20 is 30
  ```

### 總結
這個 `App` 元件展示了如何在 React 中使用變數和運算結果來動態更新網頁內容。程式碼的關鍵點如下：

1. **`now`**：顯示當前的時間。
2. **`a` 和 `b`**：計算兩個數字的和並顯示在網頁上。
3. **`console.log`**：用來在控制台查看變數的值，方便調試。

渲染結果將在網頁上看到以下內容：

```
Hello world, it is [當前時間]
10 plus 20 is 30
```

這個例子讓你更清楚地看到如何在 React 中結合 JavaScript 變數與 JSX，動態顯示資料。如果有更多問題，隨時問我！

## JSX
這段講義主要解釋了 React 中的 JSX 以及它的運作原理，並指出 JSX 是如何與 HTML 不同的。以下是這段講義的逐步解釋：

### 1. **React 元件不是真的返回 HTML**
   
講義說明，React 元件看起來像是在返回 HTML 標記，但實際上並不是這樣的。元件的佈局是使用 JSX (JavaScript XML) 寫的，而 JSX 其實是一種 JavaScript 語法擴展。儘管看起來像 HTML，但它其實是在 JavaScript 中寫的一種語法，方便我們更直觀地定義 UI。

### 2. **JSX 是如何被處理的**

當你使用 JSX 語法來定義元件時，React 並不會直接渲染 JSX。事實上，在背後 JSX 會被編譯成純 JavaScript 來運作。講義中提供了一個範例，展示了 JSX 如何被編譯成 JavaScript：

```jsx
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```

這段程式碼顯示 JSX 是如何被轉換為 `React.createElement()` 語法。每個 JSX 標籤（如 `<div>`, `<p>`）都被轉換成 `React.createElement` 函數呼叫，而 `React.createElement` 是 React 用來創建 DOM 元素的方式。

### 3. **Babel 編譯器**
   
講義提到這個編譯過程是由 Babel 處理的。Babel 是一個流行的 JavaScript 編譯工具，可以將 JSX 轉換成普通的 JavaScript。當你使用 `create-react-app` 或 `vite` 等工具建立 React 專案時，它們已經自動配置好 Babel 來處理這個編譯工作，所以你不需要手動處理。

### 4. **用純 JavaScript 寫 React**
   
講義指出，你可以不用 JSX，而是使用純 JavaScript 的方式來寫 React 應用（如上例中的 `React.createElement`），但這種寫法很不直觀，也很容易讓人混淆。所以幾乎沒有人會選擇這樣做，因為 JSX 更加易讀和易用。

### 5. **JSX 與 HTML 的相似性**
   
JSX 看起來與 HTML 非常相似，最大的不同是你可以在 JSX 中輕鬆地嵌入動態內容（通過大括號 `{}` 來嵌入 JavaScript 表達式）。這類似於許多模板語言，例如 Thymeleaf，它是一種與 Java Spring 框架一起使用的伺服器端模板語言。

### 6. **JSX 是 XML-like**
   
JSX 的語法風格很像 XML，這意味著每一個標籤都必須關閉。舉個例子，HTML 中的換行標籤 `<br>` 在 JSX 中必須寫成 `<br />`，標籤必須明確地關閉，否則會報錯。這是 JSX 與 HTML 語法的一個小但重要的區別。

### **總結**
JSX 是一種看起來像 HTML 的 JavaScript 語法擴展，讓你能夠在 React 中輕鬆地撰寫 UI。儘管看起來像 HTML，但它實際上是 JavaScript，並會在背後被編譯成 `React.createElement()` 語法，這是 React 創建 DOM 元素的方式。Babel 編譯器會幫助處理這個轉換，讓我們可以更專注於編寫 JSX 而不必擔心編譯細節。

如果有更多問題，歡迎隨時提問！

## Multiple Components
這是關於 **Multiple Components** (多個元件) 的 React 章節簡單筆記：

1. **定義和使用元件**：
   - 在 `App.jsx` 中，我們可以定義一個新元件，例如 `Hello`，然後在另一個元件（例如 `App`）中使用它。
   - 例子：
     ```jsx
     const Hello = () => {
       return (
         <div>
           <p>Hello world</p>
         </div>
       )
     }

     const App = () => {
       return (
         <div>
           <h1>Greetings</h1>
           <Hello />
         </div>
       )
     }
     ```
   
2. **元件重複使用**：
   - React 元件可以在同一個地方多次使用。例如，`Hello` 可以在 `App` 元件中使用多次：
     ```jsx
     const App = () => {
       return (
         <div>
           <h1>Greetings</h1>
           <Hello />
           <Hello />
           <Hello />
         </div>
       )
     }
     ```

3. **注意事項**：
   - 雖然範例中省略了 `export`，但在實際程式中還是需要加上 `export`，以便讓其他檔案可以引用這個元件。

4. **React 核心理念**：
   - React 的核心理念之一是將應用程序拆解成許多專門化且可重複使用的元件，以便維護。
   - 一個常見的做法是將 `App` 作為應用程式中最頂層的根元件 (root component)。

5. **更複雜的應用**：
   - 儘管 `App` 通常是根元件，但在某些情況下（例如在第6章會學到的情況），`App` 可能會被包在其他實用元件內，而不是直接作為根元件。

這是關於多個元件設計的核心概念。React 元件讓應用保持模組化和可維護，重用性和組合是它的重要特性。

## Props: Passing Data to Components

1. **什麼是 Props?**
   - `props` 是用來將資料傳遞給 React 元件的方式。
   - 元件透過接收一個 `props` 參數來獲取這些傳遞過來的資料，`props` 是一個包含所有屬性的物件，對應使用元件時定義的 "props"。

2. **傳遞單一 prop**：
   - 修改後的 `Hello` 元件可以接受 `props.name`，並在 JSX 中使用它。
   - 範例：
     ```jsx
     const Hello = (props) => {
       return (
         <div>
           <p>Hello {props.name}</p>
         </div>
       )
     }

     const App = () => {
       return (
         <div>
           <h1>Greetings</h1>
           <Hello name='George' />
           <Hello name='Daisy' />
         </div>
       )
     }
     ```

3. **多個 props**：
   - 你可以向元件傳遞任意數量的 `props`，並且這些 `props` 可以是字串或 JavaScript 表達式的結果。
   - 當使用 JavaScript 表達式作為 `props` 的值時，必須用 `{}` 包裹它。

4. **範例：多個 props 的使用**：
   - 使用兩個 `props` (`name` 和 `age`) 傳遞到 `Hello` 元件。
   - `Hello` 元件會透過 `props` 來顯示名字和年齡，並且會將 `props` 物件記錄到控制台中。
   - 範例：
     ```jsx
     const Hello = (props) => {
       console.log(props)
       return (
         <div>
           <p>Hello {props.name}, you are {props.age} years old</p>
         </div>
       )
     }

     const App = () => {
       const name = 'Peter'
       const age = 10

       return (
         <div>
           <h1>Greetings</h1>
           <Hello name='Maya' age={26 + 10} />
           <Hello name={name} age={age} />
         </div>
       )
     }
     ```

5. **專業建議：保持控制台開啟**：
   - 控制台 (`console.log`) 是開發過程中非常重要的工具，無論是初學者還是專業人士都應該經常使用它來進行除錯和了解元件狀態。
   - 講義特別強調開發過程中保持控制台開啟的重要性，並鼓勵開發者善用這個工具來簡化工作。

6. **最佳實踐**：
   - 使用控制台來檢查 `props` 物件，這可以幫助你快速理解資料是如何從父元件傳遞到子元件的。
   - 透過 `console.log(props)`，你可以看到 `props` 物件的內容，這有助於排查錯誤和驗證資料。

### 總結：
- `props` 是 React 中元件之間傳遞資料的方式。
- 你可以使用硬編碼的值或 JavaScript 表達式來作為 `props`。
- 經常使用控制台和 `console.log` 來除錯，這是開發者必備的技能。

如果有任何問題或需要更詳細的說明，隨時告訴我！

## Some Notes
### Some Notes - 筆記

1. **逐步開發**：
   - React 會生成清晰的錯誤訊息，但建議一開始以小步驟進行，每次變更後確認程式是否如預期工作。
   - 控制台應該始終保持開啟，發現錯誤時不要繼續撰寫程式，而是應該先了解錯誤的原因，並回到之前的可運行狀態。

2. **使用 `console.log()`**：
   - 在撰寫 React 程式時，使用 `console.log()` 打印資料到控制台是非常有用的，能幫助你除錯。

3. **元件名稱大小寫**：
   - React 元件的名稱必須大寫開頭。如果你使用小寫開頭的名稱，React 會將它識別為內建 HTML 標籤，而不是自定義的 React 元件。這會導致內容不會如預期顯示。
   - 例如：
     - 小寫 `footer` 會被視為內建的 `<footer>` HTML 標籤。
     - 使用大寫 `Footer` 才會被視為自定義的 React 元件。

4. **根元素要求**：
   - React 元件的內容通常必須包含一個根元素。如果沒有根元素，會導致錯誤。例如，不能同時返回多個元素（如 `<h1>` 和 `<Hello>`）而不包裹在一個容器中（如 `<div>`）。
   - 解決方法：
     - 使用一個外層的 `<div>` 或者使用 React 提供的 **Fragments** (`<>...</>`) 來避免多餘的 div 包裹元素。

5. **Fragments（片段）**：
   - 使用 Fragments (`<>...</>`) 可以避免在 DOM 中生成不必要的額外 `<div>` 標籤，這樣可以讓代碼保持簡潔。

### 總結：
- React 開發過程中，應該小步前進，並保持控制台開啟。
- React 元件的名稱應以大寫字母開頭，且元件內容需要有一個根元素。
- 使用 Fragments 可以避免產生不必要的 `div` 元素。

這些筆記有助於你更好地理解 React 的一些基礎開發原則，讓程式碼更具可讀性和可維護性。

## Do Not Render Objects

1. **不要直接渲染物件**：
   - 在 React 中，直接在 JSX 中渲染物件會導致錯誤。React 無法將物件直接轉換成 DOM 節點。

2. **錯誤示例**：
   - 嘗試將含有物件的陣列直接渲染到元件中會出現錯誤，例如：
     ```jsx
     const App = () => {
       const friends = [
         { name: 'Peter', age: 4 },
         { name: 'Maya', age: 10 },
       ]

       return (
         <div>
           <p>{friends[0]}</p>
           <p>{friends[1]}</p>
         </div>
       )
     }
     ```
   - 這段代碼嘗試直接渲染 `friends[0]` 和 `friends[1]`，但因為它們都是物件，所以無法直接顯示。

3. **解決方法**：
   - 需要單獨渲染物件的屬性，而不是整個物件。修正後的代碼應該如下：
     ```jsx
     const App = () => {
       const friends = [
         { name: 'Peter', age: 4 },
         { name: 'Maya', age: 10 },
       ]

       return (
         <div>
           <p>{friends[0].name} {friends[0].age}</p>
           <p>{friends[1].name} {friends[1].age}</p>
         </div>
       )
     }
     ```
   - 這樣每個 `<p>` 標籤中都渲染了友人的 `name` 和 `age`，而不是整個物件。

4. **陣列的渲染**：
   - React 允許渲染陣列，但陣列內的元素必須是可以直接渲染的值（如數字或字符串）。例如：
     ```jsx
     const App = () => {
       const friends = [ 'Peter', 'Maya' ]

       return (
         <div>
           <p>{friends}</p>
         </div>
       )
     }
     ```
   - 這裡 `friends` 陣列包含字符串，可以被直接渲染。

5. **清除控制台錯誤**：
   - 在修正錯誤後，應清除控制台的錯誤訊息，重新加載頁面，確保沒有錯誤訊息顯示。

### 總結：
- 在 React 中，直接渲染物件會導致錯誤。應該單獨渲染物件中的具體屬性。
- 確保始終打開控制台，以幫助識別和解決此類錯誤。
- 使用控制台的錯誤提示來指導你修正代碼，以確保應用正確運行。

