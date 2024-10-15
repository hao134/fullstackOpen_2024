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

# b. Javascript
## Variables

1. **定義變數的方式**：
   - **`const`**：定義不可改變的常量，一旦賦值後無法改變值。
     ```javascript
     const x = 1;
     ```
     - 如果嘗試重新賦值給 `x`，會產生錯誤。
   
   - **`let`**：定義可變的變數，可以在後續修改其值。
     ```javascript
     let y = 5;
     y += 10;  // y 的值變為 15
     y = 'sometext';  // y 的值變為字串
     ```

2. **動態類型**：
   - JavaScript 是動態類型語言，變數的數據類型可以在執行期間更改。
     - 例如，`y` 一開始是一個整數，後來被賦值為一個字串。
   
3. **`var` 關鍵字**：
   - **`var`** 是 JavaScript 早期用來定義變數的方式，直到 ES6 才引入了 `const` 和 `let`。
   - 與 `let` 和 `const` 不同，`var` 有一些特殊的行為（例如變數提升），因此在現代 JavaScript 開發中不推薦使用。
   
4. **推薦使用 `const` 和 `let`**：
   - 在這門課程中，**不建議使用 `var`**。應盡量使用 `const` 和 `let` 來定義變數，這是現代 JavaScript 的標準做法。

5. **更多資源**：
   - 了解 `var`, `let`, 和 `const` 之間的區別，推薦觀看 YouTube 或 Medium 上的教學資源，例如：
     - 「`var`, `let` and `const` - ES6 JavaScript Features」等影片。

### 總結：
- **`const`**：定義常量，值不可變。
- **`let`**：定義可變變數，值可變。
- **避免使用 `var`**，使用 `const` 和 `let` 是現代 JavaScript 的標準。

## Array

1. **定義陣列與基礎操作**：
   - 陣列可以存儲多個值：
     ```javascript
     const t = [1, -1, 3];
     ```
   - 使用 `push` 方法可以向陣列添加新元素：
     ```javascript
     t.push(5);
     console.log(t.length); // 4
     console.log(t[1]);     // -1
     ```

2. **`forEach` 方法**：
   - 用來迭代陣列的每個元素，並對每個元素執行一個函數：
     ```javascript
     t.forEach(value => {
       console.log(value);  // 依次打印 1, -1, 3, 5
     });
     ```

3. **`const` 和對象的修改**：
   - 雖然 `const` 定義的變數不能重新賦值，但 `const` 定義的對象（如陣列）的內容是可以修改的。例如，使用 `push` 增加元素並不會違反 `const` 限制，因為引用保持不變。

4. **不可變性與 `concat` 方法**：
   - 在 React 開發中，推薦使用 **不可變資料結構**。`concat` 方法返回一個新陣列，而不修改原陣列：
     ```javascript
     const t2 = t.concat(5);  // 創建新陣列
     console.log(t);  // [1, -1, 3]
     console.log(t2); // [1, -1, 3, 5]
     ```

5. **`map` 方法**：
   - `map` 用來基於舊陣列創建新陣列，會對每個元素應用一個函數：
     ```javascript
     const m1 = t.map(value => value * 2);
     console.log(m1);  // [2, 4, 6]
     ```
   - 也可以用來將陣列轉換成不同類型的資料：
     ```javascript
     const m2 = t.map(value => '<li>' + value + '</li>');
     console.log(m2);  
     // [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
     ```

6. **解構賦值**：
   - 可以使用解構賦值輕鬆將陣列中的項目分配給變數：
     ```javascript
     const [first, second, ...rest] = [1, 2, 3, 4, 5];
     console.log(first, second);  // 1, 2
     console.log(rest);           // [3, 4, 5]
     ```

### 總結：
- 使用 `forEach` 來遍歷陣列元素。
- 使用 `push` 來修改陣列，但在 React 中推薦使用不可變操作如 `concat`。
- 使用 `map` 創建新陣列或轉換數據。
- 使用解構賦值來將陣列元素分配給變數。 

## Objects


1. **物件的定義方式**：
   - 最常見的方式是使用**物件字面量**，在大括號內列出屬性和對應的值：
     ```javascript
     const object1 = {
       name: 'Arto Hellas',
       age: 35,
       education: 'PhD',
     }

     const object2 = {
       name: 'Full Stack web application development',
       level: 'intermediate studies',
       size: 5,
     }

     const object3 = {
       name: {
         first: 'Dan',
         last: 'Abramov',
       },
       grades: [2, 3, 5, 3],
       department: 'Stanford University',
     }
     ```

2. **屬性值可以是任何類型**：
   - 物件的屬性值可以是數字、字串、陣列，甚至是其他物件。

3. **訪問屬性**：
   - 使用點標記法 (`.`) 或括號標記法 (`[]`) 訪問物件屬性：
     ```javascript
     console.log(object1.name)         // Arto Hellas
     const fieldName = 'age'
     console.log(object1[fieldName])   // 35
     ```

4. **動態添加屬性**：
   - 可以隨時向物件添加新的屬性：
     ```javascript
     object1.address = 'Helsinki'
     object1['secret number'] = 12341
     ```
   - 注意：若屬性名稱包含空格，必須使用括號標記法。

5. **物件的方法**：
   - 物件可以擁有方法（即函數作為屬性）。然而，在這門課程中不會深入討論物件方法，因為課程範圍不涉及定義帶有方法的物件。

6. **建構函數與類別**：
   - JavaScript 也可以使用**建構函數**來定義物件，這與許多其他編程語言（如 Java）類似。雖然 JavaScript 傳統上沒有真正的類別，但從 ES6 開始引入了**class 語法**，使得物件導向的結構更清晰。

### 總結：
- 物件可以透過物件字面量定義，屬性值可以是各種數據類型。
- 物件屬性可以使用點標記或括號標記來訪問和動態添加。
- 雖然 JavaScript 現在支援 `class` 語法，但它的物件系統與傳統的 OOP 語言（如 Java）不同。

## Functions

1. **箭頭函數 (Arrow Function) 定義**：
   - 完整的箭頭函數定義如下：
     ```javascript
     const sum = (p1, p2) => {
       console.log(p1)
       console.log(p2)
       return p1 + p2
     }
     ```
   - 呼叫方式：
     ```javascript
     const result = sum(1, 5)
     console.log(result)  // 6
     ```

2. **簡化箭頭函數**：
   - 當只有單一個參數時，可以省略括號：
     ```javascript
     const square = p => {
       return p * p
     }
     ```
   - 當函數只有一個表達式時，可以省略大括號與 `return` 關鍵字：
     ```javascript
     const square = p => p * p
     ```

3. **箭頭函數與陣列操作**：
   - 箭頭函數在處理陣列時非常實用，例如使用 `map` 方法：
     ```javascript
     const t = [1, 2, 3]
     const tSquared = t.map(p => p * p)
     // tSquared = [1, 4, 9]
     ```

4. **傳統函數定義**：
   - 在 ES6 之前，JavaScript 使用 `function` 關鍵字來定義函數。
   - **命名函數宣告 (Function Declaration)**：
     ```javascript
     function product(a, b) {
       return a * b
     }
     const result = product(2, 6)  // 12
     ```
   - **函數表達式 (Function Expression)**：
     - 可以不用為函數命名，直接將函數賦值給變數：
     ```javascript
     const average = function(a, b) {
       return (a + b) / 2
     }
     const result = average(2, 5)  // 3.5
     ```

5. **箭頭函數的使用**：
   - 在這門課程中，我們將統一使用箭頭函數來定義所有函數，因為它語法簡潔且與現代 JavaScript 開發風格一致。

### 總結：
- **箭頭函數** 是現代 JavaScript 中推薦的函數定義方式，尤其適合簡潔的表達式和陣列操作。
- **傳統函數** 使用 `function` 關鍵字定義，可以是命名函數或匿名函數，但箭頭函數在現代 JavaScript 中更常用。

## Object Methods and "this" 

1. **方法定義與 `this`**：
   - 在 JavaScript 中，物件的方法可以透過將函數分配給屬性來定義：
     ```javascript
     const arto = {
       name: 'Arto Hellas',
       greet: function() {
         console.log('hello, my name is ' + this.name)
       },
     }
     arto.greet()  // "hello, my name is Arto Hellas"
     ```

2. **動態添加方法**：
   - 方法可以在物件創建後動態添加：
     ```javascript
     arto.growOlder = function() {
       this.age += 1
     }
     ```

3. **方法引用與 `this` 問題**：
   - 當把方法的引用分配給變數並執行，`this` 會變為全域物件，導致意外行為：
     ```javascript
     const referenceToGreet = arto.greet
     referenceToGreet()  // "hello, my name is undefined"
     ```
   - `this` 是根據函數的呼叫方式來定義的，而不是函數所在的物件。

4. **解決 `this` 問題**：
   - 可以使用 `bind()` 方法將 `this` 綁定到原物件，保證 `this` 不變：
     ```javascript
     setTimeout(arto.greet.bind(arto), 1000)
     ```

5. **箭頭函數與 `this`**：
   - 箭頭函數不會綁定自己的 `this`，它會繼承來自作用域的 `this`。因此，箭頭函數不適合作為物件的方法。

6. **更多學習資源**：
   - `this` 是 JavaScript 中比較難掌握的概念，推薦觀看相關教程來深入了解，例如 egghead.io 上的 "Understand JavaScript's this Keyword in Depth"。

### 總結：
- `this` 是基於方法的呼叫方式來決定的，當方法通過變數調用或透過 `setTimeout` 等調用時，`this` 會指向全域物件。
- 使用 `bind()` 可以確保 `this` 指向正確的物件。
- 箭頭函數雖然可以解決某些 `this` 相關問題，但不適合用作物件方法。


## Classes

1. **JavaScript 中的類**：
   - 雖然 JavaScript 沒有傳統的面向對象語言中的類機制，但 ES6 引入了 **class 語法**，使得類的定義變得簡單。
   - 類的行為模仿了面向對象語言中的類，但其核心仍然基於 JavaScript 的**原型繼承**。

2. **類的定義與使用**：
   - 使用 `class` 關鍵字定義類，並通過 `constructor` 函數來設置物件的初始屬性。
   - 方法可以直接在類內部定義，如 `greet()` 方法：
     ```javascript
     class Person {
       constructor(name, age) {
         this.name = name
         this.age = age
       }
       greet() {
         console.log('hello, my name is ' + this.name)
       }
     }

     const adam = new Person('Adam Ondra', 29)
     adam.greet()  // "hello, my name is Adam Ondra"
     ```

3. **類的實例化**：
   - 使用 `new` 關鍵字來創建類的實例。每個實例都有獨立的屬性值和方法。
   - 例如，`adam` 和 `janja` 是 `Person` 類的兩個實例。

4. **類與 JavaScript 的型別系統**：
   - 儘管類的語法和行為類似於傳統面向對象語言中的類，但在 JavaScript 中，類實際上仍然是基於**物件**的。所有的類型仍然是 `Object`。

5. **類語法的爭議**：
   - ES6 引入的 `class` 語法引發了一些爭議，因為它掩蓋了 JavaScript 原型繼承的真實機制。有興趣的讀者可以查看相關的討論文章，例如 “Not Awesome: ES6 Classes”。
   
6. **React 中的類**：
   - 在舊版的 React 和 Node.js 中，`class` 語法被廣泛使用。然而，隨著 React Hooks 的引入，我們在這門課程中不再需要使用 `class` 來管理狀態或定義元件。

### 總結：
- **ES6 class** 提供了類似於傳統面向對象語言中的類的語法，但它的底層仍然基於 JavaScript 的原型繼承。
- 雖然理解 `class` 語法對於舊版 React 和 Node.js 有幫助，但在使用 React Hooks 時，`class` 並非必需。

# C. Component state, event handlers
## Component Helper Functions

1. **定義幫助函數**：
   - 可以在 React 元件內部定義幫助函數，以分離複雜邏輯，使程式碼更具可讀性。例如，在 `Hello` 元件中，猜測出生年份的邏輯被提取到 `bornYear` 函數中：
     ```javascript
     const Hello = (props) => {
       const bornYear = () => {
         const yearNow = new Date().getFullYear()
         return yearNow - props.age
       }

       return (
         <div>
           <p>Hello {props.name}, you are {props.age} years old</p>
           <p>So you were probably born in {bornYear()}</p>
         </div>
       )
     }
     ```

2. **直接存取 `props`**：
   - 幫助函數不需要額外的參數來獲取元件的 `props`，因為它們可以直接存取元件內的 `props`。
   
3. **JavaScript 中的函數定義**：
   - 在 JavaScript 中，定義函數嵌套在其他函數內是常見且簡便的做法，這與某些其他語言（如 Java）不同，在這些語言中，函數內定義函數較為複雜。

### 總結：
- 可以在元件內部定義幫助函數，將複雜邏輯從 JSX 中抽離出來。
- 在 JavaScript 中，函數內定義函數是常見的設計模式，這樣可以提高代碼的可讀性和結構性。


## Destructuring

1. **解構賦值 (Destructuring)**：
   - 解構賦值是 ES6 引入的功能，允許我們從物件或陣列中直接解構值並賦給變數，讓代碼更加簡潔。

2. **傳統方式**：
   - 在傳遞 `props` 給元件時，我們必須通過 `props.name` 和 `props.age` 的方式來引用數據：
     ```javascript
     const Hello = (props) => {
       const name = props.name
       const age = props.age
     }
     ```

3. **使用解構賦值**：
   - 解構賦值可以直接從 `props` 中提取 `name` 和 `age`，不需要重複引用 `props`：
     ```javascript
     const Hello = (props) => {
       const { name, age } = props
     }
     ```
   - 這樣使代碼更簡潔，並且更容易讀懂。

4. **進一步簡化**：
   - 我們可以在函數參數中直接解構 `props`，進一步簡化代碼：
     ```javascript
     const Hello = ({ name, age }) => {
     }
     ```
   - 這樣 `name` 和 `age` 被直接解構為變數，無需在函數內部額外解構。

5. **等效定義**：
   - 下面兩種方式是等效的：
     ```javascript
     const Hello = (props) => {
       const { name, age } = props
     }
     ```
     ```javascript
     const Hello = ({ name, age }) => {
     }
     ```

6. **更緊湊的箭頭函數語法**：
   - 當函數只有一個表達式時，可以省略大括號和 `return`：
     ```javascript
     const bornYear = () => new Date().getFullYear() - age
     ```

### 總結：
- 解構賦值讓我們可以直接從物件（如 `props`）中提取屬性，減少重複引用，提高代碼可讀性。
- 可以直接在函數參數中解構 `props`，進一步簡化元件的代碼。

## Page re-rendering

1. **靜態渲染**：
   - 目前的應用程式在初次渲染後外觀保持不變。當 `counter` 值變化時，畫面不會自動更新。

2. **初始範例**：
   - `App` 元件透過 `props` 接收 `counter` 的值並顯示在螢幕上：
     ```javascript
     const App = (props) => {
       const { counter } = props
       return (
         <div>{counter}</div>
       )
     }
     ```

3. **手動重新渲染**：
   - 即使我們更改 `counter` 值，元件不會自動重新渲染。需要再次呼叫 `ReactDOM.render` 來強制重新渲染：
     ```javascript
     const refresh = () => {
       ReactDOM.createRoot(document.getElementById('root')).render(
         <App counter={counter} />
       )
     }
     ```

4. **自動增加 `counter` 並重新渲染**：
   - 通過包裝 `render` 函數，我們可以重複渲染元件，並每次增大 `counter` 值：
     ```javascript
     let counter = 1

     const refresh = () => {
       ReactDOM.createRoot(document.getElementById('root')).render(
         <App counter={counter} />
       )
     }

     setInterval(() => {
       refresh()
       counter += 1
     }, 1000)
     ```

5. **非推薦方式**：
   - 反覆調用 `render` 方法來達到重新渲染的效果並非最佳做法。稍後會介紹更好的實現方式來自動更新元件。

### 總結：
- 當 `counter` 值變化時，我們需要手動調用 `render` 來重新渲染元件。
- 雖然可以透過 `setInterval` 來實現自動更新，但這不是推薦的做法，後續會介紹更好的方式。

## Stateful component
### Stateful Component - 筆記

1. **無狀態元件**：
   - 到目前為止，我們的元件都沒有狀態，元件的外觀不會根據用戶的操作或其他變化動態更新。

2. **引入 `useState`**：
   - 透過 React 的 `useState` hook，可以為元件引入**狀態**。狀態允許我們在元件的生命週期中追踪和更新數據。
   - 初始化範例：
     ```javascript
     const [ counter, setCounter ] = useState(0)
     ```
   - 這行代碼會設置一個名為 `counter` 的狀態變數，初始值為 0。`setCounter` 是用來更新 `counter` 的函數。

3. **自動更新 `counter`**：
   - 透過 `setTimeout` 每秒自動增加 `counter` 的值：
     ```javascript
     setTimeout(
       () => setCounter(counter + 1),
       1000
     )
     ```
   - 當 `setCounter` 被調用後，React 會重新渲染元件，這樣每次 `counter` 的值都會增加 1，並每秒更新畫面。

4. **元件的重新渲染**：
   - 每當狀態被修改（`setCounter` 被調用）時，React 會重新執行元件的函數，這會再次呼叫 `useState` 並返回新的狀態值。
   - 因此，`counter` 每次遞增後，元件會重新渲染，並顯示新的值。

5. **偵錯與除錯**：
   - 若元件未按預期渲染，可以使用 `console.log` 來檢查元件的狀態和渲染流程：
     ```javascript
     console.log('rendering...', counter)
     ```
   - 在開發過程中，確保開啟瀏覽器控制台以便追踪輸出。

### 總結：
- `useState` 允許我們為 React 元件添加狀態，從而能夠動態更新 UI。
- 當狀態改變時，React 會自動重新渲染元件，這使得應用程序能夠響應用戶行為或其他變化。

## Event Handling
### Event Handling - 筆記

1. **事件處理 (Event Handling)**：
   - 用戶與網頁互動時可以觸發各種事件，如 `click` 事件。
   - 在 React 中，我們可以為元素的事件屬性（如 `onClick`）指定一個事件處理函數。

2. **註冊事件處理函數**：
   - 我們可以將 `button` 元素的 `onClick` 屬性設為對應的事件處理函數：
     ```javascript
     const App = () => {
       const [ counter, setCounter ] = useState(0)

       const handleClick = () => {
         console.log('clicked')
       }

       return (
         <div>
           <div>{counter}</div>
           <button onClick={handleClick}>
             plus
           </button>
         </div>
       )
     }
     ```
   - 每次點擊按鈕，`handleClick` 函數會被調用，並輸出 `'clicked'` 到控制台。

3. **內聯定義事件處理函數**：
   - 事件處理函數也可以直接內聯定義於 `onClick`：
     ```javascript
     <button onClick={() => console.log('clicked')}>
       plus
     </button>
     ```

4. **更新狀態的事件處理**：
   - 我們可以將 `onClick` 設定為更新狀態的函數，以實現點擊按鈕時增加 `counter`：
     ```javascript
     <button onClick={() => setCounter(counter + 1)}>
       plus
     </button>
     ```

5. **添加重置按鈕**：
   - 可以再添加一個按鈕，用於重置 `counter` 的值為 0：
     ```javascript
     const App = () => {
       const [ counter, setCounter ] = useState(0)

       return (
         <div>
           <div>{counter}</div>
           <button onClick={() => setCounter(counter + 1)}>
             plus
           </button>
           <button onClick={() => setCounter(0)}> 
             zero
           </button>
         </div>
       )
     }
     ```

6. **應用程式完成**：
   - 現在我們有兩個按鈕：一個用於增加 `counter`，另一個用於重置 `counter`。

### 總結：
- React 事件處理使用類似 HTML 的方式，但將事件處理函數設置為 JavaScript 函數。
- 可以使用內聯或獨立定義的函數來處理按鈕的 `click` 事件，並透過 `setCounter` 來動態更新應用的狀態。

## An Event Handler is a Function
### An Event Handler is a Function - 筆記

1. **事件處理器的定義**：
   - 在 React 中，事件處理器（event handler）通常通過將 `onClick` 等屬性設置為一個**函數**或**函數引用**來定義：
     ```javascript
     <button onClick={() => setCounter(counter + 1)}> 
       plus
     </button>
     ```

2. **錯誤的方式**：
   - 若將 `onClick` 屬性設置為函數的調用結果，而不是一個函數引用，會導致應用錯誤：
     ```javascript
     <button onClick={setCounter(counter + 1)}> 
       plus
     </button>
     ```
   - 這會直接執行 `setCounter(counter + 1)`，導致元件在渲染時不斷更新狀態，並進入無限重渲染循環。

3. **正確的方式**：
   - 應該將 `onClick` 設置為一個函數或函數引用，這樣函數只有在按鈕被點擊時才會執行：
     ```javascript
     <button onClick={() => setCounter(counter + 1)}> 
       plus
     </button>
     ```

4. **將事件處理函數提取到變數**：
   - 雖然在 JSX 中直接定義簡單的事件處理函數是可以接受的，但更好的做法是將事件處理器提取到單獨的函數中：
     ```javascript
     const increaseByOne = () => setCounter(counter + 1)
     const setToZero = () => setCounter(0)
     ```

5. **最終實現**：
   - 事件處理器被提取成獨立的函數，`onClick` 屬性設為這些函數的引用：
     ```javascript
     <button onClick={increaseByOne}>
       plus
     </button>
     <button onClick={setToZero}>
       zero
     </button>
     ```

### 總結：
- 事件處理器應該是**函數**或**函數引用**，而不是函數的調用結果。
- 將事件處理函數提取出來，讓代碼更具可讀性和可維護性

## Passing State to Child Components
### Passing State to Child Components - 筆記

1. **組件拆分**：
   - React 中推薦將元件設計為小型且可重用的，這樣便於維護和跨應用使用。
   - 我們將應用拆分為三個組件：一個用來顯示計數器值，兩個用來表示按鈕。

2. **提升狀態 (Lifting State Up)**：
   - 當多個元件需要共享狀態時，將狀態提升到它們的**最近共同祖先**是最佳實踐。這使得狀態更易於管理和共享。
   - 我們把 `counter` 狀態提升到 `App` 元件中，並通過 `props` 傳遞給子元件。

3. **`Display` 組件**：
   - `Display` 負責顯示計數器值，`App` 元件將 `counter` 狀態傳遞給它：
     ```javascript
     const Display = (props) => {
       return (
         <div>{props.counter}</div>
       )
     }
     ```

4. **使用 `Display` 組件**：
   - 在 `App` 中，我們通過 `props` 傳遞 `counter` 狀態給 `Display`：
     ```javascript
     const App = () => {
       const [ counter, setCounter ] = useState(0)

       return (
         <div>
           <Display counter={counter} />
         </div>
       )
     }
     ```

5. **`Button` 組件**：
   - 我們為按鈕創建一個 `Button` 組件，該元件通過 `props` 接收點擊事件處理函數 (`onClick`) 和按鈕文本 (`text`)：
     ```javascript
     const Button = (props) => {
       return (
         <button onClick={props.onClick}>
           {props.text}
         </button>
       )
     }
     ```

6. **使用 `Button` 組件**：
   - 在 `App` 中，使用 `Button` 組件並傳遞按鈕的文本和點擊事件處理函數：
     ```javascript
     const App = () => {
       const [ counter, setCounter ] = useState(0)

       const increaseByOne = () => setCounter(counter + 1)
       const decreaseByOne = () => setCounter(counter - 1)
       const setToZero = () => setCounter(0)

       return (
         <div>
           <Display counter={counter}/>
           <Button onClick={increaseByOne} text='plus' />
           <Button onClick={setToZero} text='zero' />
           <Button onClick={decreaseByOne} text='minus' />
         </div>
       )
     }
     ```

7. **React 的命名慣例**：
   - React 中，常見的命名慣例是使用 `onSomething` 來命名接收事件處理函數的 `props`，而使用 `handleSomething` 作為實際處理事件的函數名稱。

### 總結：
- **狀態提升**是 React 管理共享狀態的最佳實踐，將狀態存儲在共同祖先元件中，並通過 `props` 傳遞給子元件。
- `Button` 和 `Display` 元件是小型、可重用的元件，它們通過 `props` 接收狀態和事件處理函數。

# d. A more complex state, debugging React apps
## Complex state
### Complex State - 筆記

1. **使用多個 `useState`**：
   - 當應用程式狀態變得複雜時，最簡單的方法是使用多個 `useState` 來分別管理不同的狀態。例如：
     ```javascript
     const [left, setLeft] = useState(0)
     const [right, setRight] = useState(0)
     ```

2. **將狀態存儲在單個物件中**：
   - 另一種方法是將多個狀態存入一個物件中。例如，將 `left` 和 `right` 計數器存入一個物件：
     ```javascript
     const [clicks, setClicks] = useState({ left: 0, right: 0 })
     ```

3. **事件處理函數**：
   - 當按鈕被點擊時，我們需要更新整個狀態物件：
     ```javascript
     const handleLeftClick = () => {
       const newClicks = { left: clicks.left + 1, right: clicks.right }
       setClicks(newClicks)
     }
     ```

4. **使用 Object Spread Syntax 簡化代碼**：
   - 可以使用展開語法（spread syntax）簡化狀態更新邏輯：
     ```javascript
     const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })
     const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })
     ```

5. **避免直接修改狀態**：
   - 不應該直接修改狀態物件，因為這會導致 React 無法正確追蹤狀態變化，可能引發預期外的副作用。必須創建新的狀態物件來更新狀態：
     ```javascript
     const handleLeftClick = () => {
       // 錯誤示範：不應直接修改 clicks 物件
       clicks.left++
       setClicks(clicks)
     }
     ```

6. **選擇合適的狀態結構**：
   - 在某些情況下，將狀態存儲在一個複雜的數據結構中可能是有益的。但是，對於這個範例，將 `left` 和 `right` 分開儲存是更好的選擇。

### 總結：
- 在 React 中，使用多個 `useState` 來管理不同的狀態通常是最簡單的解決方案。
- 如果需要使用單個物件來存儲狀態，可以使用展開語法來更新部分屬性，但要避免直接修改狀態物件。
- 根據應用的需求，選擇最適合的狀態結構來維護清晰且易於管理的代碼。

### Handling Arrays - 筆記

1. **新增陣列狀態**：
   - 我們可以使用 `useState` 來跟蹤按鈕點擊事件，並存儲所有點擊記錄到一個陣列 `allClicks` 中：
     ```javascript
     const [allClicks, setAll] = useState([])
     ```

2. **更新狀態時不直接修改陣列**：
   - 當點擊左邊按鈕時，我們使用 `concat` 方法來創建一個新的陣列，將字母 `'L'` 添加到陣列中，並且不直接修改原陣列：
     ```javascript
     const handleLeftClick = () => {
       setAll(allClicks.concat('L'))
       setLeft(left + 1)
     }
     ```
   - 對於右邊按鈕也同樣操作：
     ```javascript
     const handleRightClick = () => {
       setAll(allClicks.concat('R'))
       setRight(right + 1)
     }
     ```

3. **使用 `concat` 而非 `push`**：
   - **不要**使用 `push` 方法來修改狀態，因為 `push` 會直接修改原陣列，這在 React 中是不允許的。雖然使用 `push` 可能看起來正常工作，但它會導致不可預期的副作用：
     ```javascript
     // 錯誤示範
     allClicks.push('L')
     setAll(allClicks)
     ```

4. **顯示點擊記錄**：
   - 使用 `join` 方法將 `allClicks` 陣列中的所有元素連接成一個字串，並以空格分隔：
     ```javascript
     <p>{allClicks.join(' ')}</p>
     ```
   - `join(' ')` 會將陣列元素用空格連接成字串，顯示所有點擊記錄。

### 總結：
- 使用 `useState` 來跟蹤按鈕的點擊事件並記錄到陣列中。
- 使用 `concat` 方法來更新陣列，避免直接修改狀態。
- 使用 `join` 方法來將陣列轉換為字串，方便顯示在頁面上。

:::info
當我們使用 **`concat`** 而不是 **`push`** 來更新 React 中的狀態時，核心原因是 **React 不允許直接修改狀態**。我們來詳細解釋這兩者的區別及其背後的原因。

### 1. **`concat` 的特點**
   - **`concat`** 方法**不會改變原陣列**，而是返回一個**新陣列**，並將新元素添加到新陣列中。
   - 在 React 中，當我們更新狀態時，我們應該創建一個新的狀態物件（或陣列），然後將其傳遞給 `setState` 函數，這樣可以保持**不可變性**（immutability），確保 React 能夠正確追蹤狀態變化，並有效進行重渲染。

   ```javascript
   const handleLeftClick = () => {
     setAll(allClicks.concat('L'))  // 返回新陣列，未修改原陣列
     setLeft(left + 1)
   }
   ```

   在這種情況下，React 知道 `allClicks` 的值發生了變化，因為我們使用 `concat` 創建了一個新陣列，這讓 React 可以正確地更新畫面。

### 2. **`push` 的特點**
   - **`push`** 方法會直接改變原陣列，並在其末尾添加新元素。
   - 如果你使用 `push` 方法來更新狀態，你會直接修改現有的 `allClicks` 陣列，而不是創建一個新的陣列。
   - **這會破壞 React 的不可變性規則**，因為 React 依賴狀態的不可變性來確定是否需要重新渲染元件。如果你修改了現有陣列，React 可能無法正確檢測到狀態變化，從而導致無法正確觸發重渲染或出現難以預測的錯誤。

   ```javascript
   // 錯誤示範
   const handleLeftClick = () => {
     allClicks.push('L')  // 直接修改原陣列
     setAll(allClicks)    // React 無法正確追蹤變化
     setLeft(left + 1)
   }
   ```

   在這裡，雖然畫面看起來可能仍然正常運作，但由於 `push` 修改了原本的陣列，React 無法清楚地知道狀態已經變化，這可能導致 React 無法重新渲染元件或引發其他問題。

### 3. **不可變性的重要性**
   - **不可變性** 是 React 中的關鍵概念。當狀態發生變化時，我們應該創建一個新的狀態物件，而不是修改現有的狀態。這樣，React 可以通過比較新舊狀態，決定是否需要重新渲染元件。
   - 使用 **`concat`** 保持陣列不可變，而 **`push`** 會破壞這種不可變性，這就是為什麼我們應該避免使用 `push` 來直接更新狀態。

### 總結：
- **`concat`** 創建新陣列，保持 React 狀態不可變性，讓 React 能夠正確追蹤變化和重渲染。
- **`push`** 直接修改原陣列，會破壞不可變性，可能導致 React 無法正確地重渲染元件。
:::

## Update of the State is Asynchronous
### Update of the State is Asynchronous - 筆記

1. **問題描述**：
   - React 中的狀態更新是**異步**的，這意味著即使你呼叫了 `setState`，狀態不會立即更新。狀態的更新會在 React 決定重新渲染元件之前進行。因此，在相同的事件處理函數中，如果你立即使用剛剛更新的狀態，可能會發生狀態仍然是舊值的情況。

2. **範例：按鈕點擊計數錯誤**：
   - 我們希望在點擊按鈕時更新左邊和右邊的計數器，並同時更新總點擊次數（`total`），但結果 `total` 總是少一個：
     ```javascript
     const handleLeftClick = () => {
       setAll(allClicks.concat('L'))
       setLeft(left + 1)
       setTotal(left + right)
     }
     ```

3. **原因**：
   - 即使呼叫了 `setLeft(left + 1)`，此時 `left` 的值還沒有更新。在同一函數中，`setTotal(left + right)` 使用的仍然是舊的 `left` 值。因此，`total` 計算錯誤。

4. **解決方案：保存更新後的值**：
   - 因為 `setState` 是異步的，我們可以先計算出更新後的 `left` 或 `right` 值，然後使用這些更新後的值來計算 `total`：
     ```javascript
     const handleLeftClick = () => {
       setAll(allClicks.concat('L'))
       const updatedLeft = left + 1
       setLeft(updatedLeft)
       setTotal(updatedLeft + right)
     }
     ```

   - 同樣地，對 `right` 也需要進行同樣的處理：
     ```javascript
     const handleRightClick = () => {
       setAll(allClicks.concat('R'))
       const updatedRight = right + 1
       setRight(updatedRight)
       setTotal(left + updatedRight)
     }
     ```

5. **為何 React 狀態是異步的？**：
   - React 的狀態更新是異步的，以提高性能。這允許 React 可以在同一個更新週期中批量處理多個狀態更新，而不是每次呼叫 `setState` 時都立刻重新渲染元件。這樣可以減少不必要的重渲染次數，提升應用效能。

6. **結論**：
   - 當你需要依賴更新後的狀態值進行進一步操作時，**不要**直接依賴狀態本身，而是應該在事件處理函數中**手動計算**更新後的狀態，然後再執行相關邏輯。這樣可以避免由於狀態更新異步帶來的問題。

### 總結：
- React 的狀態更新是異步的，這意味著即使呼叫了 `setState`，狀態不會立即更新。
- 當你在同一函數中需要依賴更新後的狀態值時，應該手動計算並使用這些更新後的值來進行操作。
- 這樣可以確保邏輯基於正確的狀態值進行運算，避免異步更新帶來的問題。