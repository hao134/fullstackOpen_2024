[課程](https://fullstackopen.com/en/part2/rendering_a_collection_modules)
# a. Rendering a collection, modules
## console.log
### Console.log 筆記

**console.log 的重要性：**
- 有經驗的 JavaScript 程式開發者會比新手更多地使用 `console.log` 進行除錯。
- 當程式不如預期工作時，不應該猜測問題，而應該透過 `console.log` 或其他除錯方法來找出問題所在。

**使用 `console.log` 的正確方式：**
- 避免使用 Java 風格的字串連接（`+`）來輸出變數或物件，這樣可能會產生不直觀的輸出，像是 `[object Object]`。
- 正確的作法是使用逗號將物件與字串分開，這樣能夠更直觀地顯示物件的內容。

**範例：**
- 不建議的寫法：
  ```js
  console.log('props value is ' + props)
  ```
  這會輸出類似 `props value is [object Object]`，不具備任何可讀性。
  
- 建議的寫法：
  ```js
  console.log('props value is', props)
  ```
  使用逗號分隔時，`console.log` 會更詳細地顯示物件的內容，使開發者更容易理解。

總結：使用 `console.log` 時，將物件與字串分開列印，能更清楚地查看物件的真實內容，這是進行除錯的好習慣。
## Rendering Collections & Key-attribute
### Rendering Collections 和 Key-attribute 筆記

**Rendering Collections:**

1. **呈現陣列中的項目：**
   - 一個常見的需求是顯示一個物件陣列中的內容。像 `notes` 這樣的陣列，每個物件都包含 `id`、`content` 及 `important` 等屬性。
   
2. **硬編碼的索引：**
   - 初步範例中，我們使用硬編碼索引顯示陣列中的元素：
     ```jsx
     <li>{notes[0].content}</li>
     <li>{notes[1].content}</li>
     <li>{notes[2].content}</li>
     ```
   - 這種方式不具通用性，當陣列元素改變數量時，需要手動調整。

3. **使用 `map` 方法生成列表：**
   - 可以利用 JavaScript 的 `map` 函數來動態生成 `li` 元素：
     ```jsx
     {notes.map(note => <li>{note.content}</li>)}
     ```
   - `map` 會將 `notes` 中的每個物件轉換為對應的 React 元素。
   - 這樣可以動態生成無限多的列表項目，使程式碼更具通用性。

4. **分隔多行以提高可讀性：**
   - 可以將 `map` 的箭頭函數展開成多行，使代碼更易讀：
     ```jsx
     {notes.map(note => 
       <li>
         {note.content}
       </li>
     )}
     ```

**Key-attribute:**

1. **React 中的 Key 屬性：**
   - 當 React 渲染列表項目時，每個項目必須有唯一的 `key` 屬性。這樣可以幫助 React 高效追蹤列表項目的變化，並確定哪些項目需要更新或重繪。
   - 當沒有提供 `key` 屬性時，React 會顯示警告訊息，提醒開發者必須為每個項目加上唯一的 `key`。

2. **解決警告：**
   - 通常，陣列中的每個物件會有一個唯一的 `id`，這可以作為 `key`：
     ```jsx
     {notes.map(note => 
       <li key={note.id}>
         {note.content}
       </li>
     )}
     ```
   - 為每個 `li` 元素添加 `key` 屬性後，React 能更有效地更新列表，並消除警告訊息。

3. **為什麼 `key` 很重要：**
   - `key` 用來識別每個列表項目，使 React 在重繪列表時能夠優化渲染，特別是當列表項目動態增減或順序改變時，`key` 能幫助 React 跟蹤變化。

## Map
### Map 筆記

**基本概念：**
- `map` 是 JavaScript 陣列的方法，會將原陣列的每個元素映射到新的元素，並回傳一個新的陣列。
- 在 React 開發中，`map` 被廣泛用來將資料陣列轉換成 JSX 元素陣列，使得動態生成內容變得簡單。

**應用範例：**
1. **基本使用方法：**
   假設有一個名為 `notes` 的陣列，每個物件包含 `id`、`content` 及 `important` 屬性。
   ```javascript
   const notes = [
     { id: 1, content: 'HTML is easy', important: true },
     { id: 2, content: 'Browser can execute only JavaScript', important: false },
     { id: 3, content: 'GET and POST are the most important methods of HTTP protocol', important: true }
   ]
   ```
   
2. **提取特定屬性：**
   使用 `map` 提取 `notes` 中每個物件的 `id`：
   ```javascript
   const result = notes.map(note => note.id);
   console.log(result);  // 結果：[1, 2, 3]
   ```
   - `map` 的參數是一個函數（這裡是一個箭頭函數），該函數接收每個 `note` 物件並回傳它的 `id`。

3. **箭頭函數的簡寫與完整寫法：**
   簡寫形式：
   ```javascript
   note => note.id
   ```
   完整形式：
   ```javascript
   (note) => {
     return note.id;
   }
   ```

4. **生成含內容的陣列：**
   如果將 `map` 函數改為 `note => note.content`，則會取得包含 `content` 值的陣列。
   
5. **生成 React 元素：**
   - 利用 `map` 將 `notes` 中的每個 `note` 物件轉換為含 `li` 標籤的 JSX 元素：
     ```javascript
     notes.map(note =>
       <li key={note.id}>{note.content}</li>
     )
     ```
   - 每個 `note` 會被轉換成帶有 `key` 屬性的 `<li>` 元素。
   - 因為 `map` 函數內的函數參數是用來生成視圖元素，必須將 JSX 元素放在大括號內，以便正確渲染。

**注意事項：**
- **大括號**：在 React 中，將 `map` 生成的 JSX 元素放入大括號 `{}` 中是必要的，否則會報錯。

## Anti-pattern: Array Indexes as Keys
### Anti-pattern: 使用陣列索引作為鍵值

**問題概述：**
在 React 中，為每個元素指定唯一的 `key` 是很重要的。雖然使用陣列索引作為 `key` 值可以消除控制台的錯誤訊息，但這種方法通常會帶來潛在的問題。

**範例：**
在 `map` 函數中，我們可以將索引值作為 `key` 值傳入，如下所示：
```javascript
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```
上面的代碼中，我們使用 `i` 作為每個項目的 `key` 值。

**為什麼避免使用陣列索引作為 `key`：**
1. **渲染效能問題**：如果陣列的內容或順序發生變化，React 可能會錯誤地更新或重新渲染元素，導致效能下降。
  
2. **潛在的重複渲染**：使用索引作為 `key` 值會讓 React 難以準確判斷哪些元素實際上發生了變化，可能會出現不必要的重複渲染。

3. **預期外的行為**：對於具有動態添加、刪除或重新排序的項目，使用索引作為 `key` 會使 React 追蹤元素狀態變得困難，導致無法預期的行為。

**正確的做法：**
最好為每個項目提供穩定且唯一的 `id` 屬性，並將其用作 `key` 值。例如：
```javascript
<ul>
  {notes.map(note => 
    <li key={note.id}>
      {note.content}
    </li>
  )}
</ul>
```

**結論：**
雖然使用陣列索引作為 `key` 可以快速解決控制台的錯誤，但在長期和複雜應用中會帶來潛在問題。因此，應盡量避免使用索引作為 `key`，而是使用唯一且穩定的 `id`。

## Refactoring Modules
### Refactoring Modules 簡單筆記

#### 1. **直接使用解構賦值**
   - 為了更清晰地取得 `notes`，可以直接用解構賦值。
   - **範例：**
     ```javascript
     const App = ({ notes }) => {
       return (
         <div>
           <h1>Notes</h1>
           <ul>
             {notes.map(note => 
               <li key={note.id}>
                 {note.content}
               </li>
             )}
           </ul>
         </div>
       )
     }
     ```

#### 2. **分離單一筆記為獨立組件**
   - 建立 `Note` 組件來顯示單一筆記的內容，使程式碼更具可讀性和模組化。
   - **範例：**
     ```javascript
     const Note = ({ note }) => {
       return (
         <li>{note.content}</li>
       )
     }

     const App = ({ notes }) => {
       return (
         <div>
           <h1>Notes</h1>
           <ul>
             {notes.map(note => 
               <Note key={note.id} note={note} />
             )}
           </ul>
         </div>
       )
     }
     ```
   - 注意：`key` 屬性現在應該被放在 `Note` 組件，而不是 `li` 標籤上。

#### 3. **使用模組化與單獨檔案**
   - 大型應用程式不會將所有組件寫在同一文件中，通常將每個組件放在獨立文件中，並使用 ES6 模組化。
   - 常見做法是將組件放在 `src` 目錄中的 `components` 資料夾中，並以組件名稱命名檔案。
   - **範例：**
     - **Note.jsx** (components 資料夾下)
       ```javascript
       const Note = ({ note }) => {
         return (
           <li>{note.content}</li>
         )
       }

       export default Note
       ```

     - **App.jsx** (匯入 `Note` 組件)
       ```javascript
       import Note from './components/Note'

       const App = ({ notes }) => {
         return (
           <div>
             <h1>Notes</h1>
             <ul>
               {notes.map(note => 
                 <Note key={note.id} note={note} />
               )}
             </ul>
           </div>
         )
       }
       ```

   - 匯入自定義組件時，路徑必須相對於匯入檔案；`.jsx` 檔案副檔名可省略。

#### 4. **模組化的優點**
   - 模組化不僅讓組件可分離到不同檔案中，還便於維護和重複使用。在更大規模的應用程式中更顯實用，後續課程中會進一步探索模組的用途。

## When the Application Breaks
### When the Application Breaks 簡單筆記

#### 1. **應用程式崩潰時的情況**
   - 在使用 JavaScript 等動態型別語言時，應用程式崩潰的情況可能更為頻繁，因為編譯器無法檢查資料型別的正確性。

#### 2. **處理崩潰的最佳工具：`console.log`**
   - 當應用程式崩潰時，最有效的除錯工具之一就是 `console.log`。
   - 透過在應用程式的不同位置添加 `console.log`，可以逐步檢查應用程式的工作狀態，找出錯誤的來源。

#### 3. **逐步調查錯誤**
   - **範例**：假設應用程式因 `Course` 組件而崩潰，我們可以從 `App` 組件開始加上 `console.log`，檢查應用程式的初始化是否正常：
     ```javascript
     const App = () => {
       const course = { /*...*/ }
       console.log('App works...')
       return (
         <div>
           <Course course={course} />
         </div>
       )
     }
     ```
   - 檢查 `console` 來確認訊息的輸出，這樣可以確認應用程式的某些部分是正常工作的。

#### 4. **更改組件格式以便於調試**
   - 如果組件以單行箭頭函式聲明，會使加入 `console.log` 更困難，建議更改為完整函式格式以便於除錯。
   - **範例**：修改 `Course` 組件為多行格式，加入 `console.log` 以檢查 `course` 變數。
     ```javascript
     const Course = ({ course }) => { 
       console.log(course)
       return (
         <div>
           <Header course={course} />
         </div>
       )
     }
     ```

#### 5. **檢查 `props` 型別與名稱**
   - 很多時候錯誤來源是 `props` 的型別或名稱與預期不符，這會導致解構賦值失敗。
   - 嘗試移除解構賦值，直接檢查 `props` 內容以進一步定位問題。
   - **範例**：
     ```javascript
     const Course = (props) => {
       console.log(props)
       const { course } = props
       return (
         <div>
           <Header course={course} />
         </div>
       )
     }
     ```

#### 6. **繼續逐步添加 `console.log` 直到找到錯誤**
   - 若問題仍未解決，繼續在程式碼的不同位置添加 `console.log`，逐步找到錯誤來源。

#### 7. **使用 `console.log` 調試的實際經驗**
   - 本節內容源自真實經驗：在開發中遇到錯誤的 `props` 型別導致應用程式崩潰，透過 `console.log` 成功定位問題並解決。

# b. Forms
## Saving the notes in the component state

### note : Saving the notes in the component state

#### 1. 初始化 Component State
為了在新增筆記時更新頁面，我們可以將筆記存儲到 `App` component 的 state 中，而不是單純依賴 props 傳入的初始值。這樣可以讓 React 根據 state 變化來重新渲染頁面。使用 `useState` 來初始化筆記的狀態。

```javascript
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
    </div>
  );
};

export default App;
```

#### 2. 使用 React Developer Tools
`useState` 初始化的 `notes` 是通過 `props.notes` 傳入的初始值。我們可以通過使用 React Developer Tools 來驗證 `notes` 確實被正確地存儲到 state 中。

#### 3. 將初始值設為空陣列
如果想要讓筆記從空列表開始，可以將 `useState` 的初始值設為空陣列 `[]`，並省略 `props`，如下所示：

```javascript
const App = () => {
  const [notes, setNotes] = useState([]);
};
```

#### 4. 新增筆記的 HTML 表單
接著，我們可以添加一個 HTML 表單，讓使用者可以輸入並保存新筆記。

```javascript
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>   
    </div>
  );
};
```

#### 5. 添加事件處理程序
`addNote` 函數是一個事件處理程序，用於處理表單提交事件。我們通過 `onSubmit` 將 `addNote` 函數連接到表單，當表單提交時觸發此函數。

```javascript
const addNote = (event) => {
  event.preventDefault(); // 阻止表單提交的默認行為
  console.log('button clicked', event.target); // 查看事件的目標
};
```

在事件處理程序中，我們使用 `event.preventDefault()` 來防止表單的默認行為，即防止頁面刷新，並在控制台記錄 `event.target`，該目標即是觸發此事件的表單。

#### 總結
* 使用 `useState` 將筆記存儲在 `App` 組件的 state 中，以便新增筆記時更新頁面。
* 使用 `addNote` 處理表單提交事件，並用 `event.preventDefault()` 防止頁面重新載入。
* 透過 `console.log` 驗證事件的目標。


## Controlled Components
### 筆記：Controlled Components

#### 1. Controlled Components 和 `newNote` State
在 React 中，Controlled Component 是指其值由 component state 控制的元素，例如 `input` 元素。首先，我們可以為使用者輸入的筆記新增一個 `newNote` 的 state，用來儲存 `input` 元素的值。

```javascript
const [newNote, setNewNote] = useState('a new note...');
```

接著，我們將這個 `newNote` 狀態作為 `input` 元素的 `value`，初始值是 `"a new note..."`。

#### 2. 為 `input` 註冊 `onChange` 事件處理
此時 `input` 元素的值已經受 `newNote` 控制，但無法編輯。我們需要為 `input` 註冊一個 `onChange` 事件處理，來同步輸入的變更。

```javascript
const handleNoteChange = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value);
};
```

#### 3. 將 `input` 元素設為 Controlled Component
在 JSX 中將 `value` 和 `onChange` 設為 `newNote` 和 `handleNoteChange`，讓每次改變輸入內容時都能即時更新 `newNote` 的值。

```jsx
<input
  value={newNote}
  onChange={handleNoteChange}
/>
```

#### 4. 新增筆記的邏輯 `addNote`
為 `addNote` 增加邏輯，當表單提交時生成新的筆記物件並加入筆記列表：

```javascript
const addNote = (event) => {
  event.preventDefault();
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length + 1),
  };

  setNotes(notes.concat(noteObject)); // 不直接修改 `notes`，而是創建新陣列
  setNewNote(''); // 清空 `input` 的值
};
```

#### 5. 更新 State 和清空 `input`
- 新的筆記物件 `noteObject` 使用 `newNote` 的值來填入 `content`。
- 使用 `concat` 方法來建立 `notes` 的副本，加入新的筆記，並更新 `notes` 狀態。
- 調用 `setNewNote('')` 來重置 `input` 的值，清空輸入框。

這樣的設計將 `input` 元素變成 Controlled Component，使其狀態受到 `App` component 的控制，並確保每次新增筆記後可以動態地更新頁面而不影響原始的 `notes` 陣列。


## Filtering Displayed Elements
### 筆記：Filtering Displayed Elements

#### 1. 新增 `showAll` State
為了控制應顯示的筆記（全部或僅限重要的），我們可以新增一個 state 變數 `showAll` 來追蹤顯示狀態：

```javascript
const [showAll, setShowAll] = useState(true);
```

#### 2. 使用 `notesToShow` 變數篩選筆記
`notesToShow` 是一個依據 `showAll` 狀態篩選筆記的變數：

```javascript
const notesToShow = showAll ? notes : notes.filter(note => note.important);
```

如果 `showAll` 是 `true`，則顯示所有筆記；如果是 `false`，則僅顯示重要的筆記。這樣的篩選運用了 JavaScript 的 `filter` 方法。

#### 3. 條件運算符的使用
`notesToShow` 的賦值使用了條件運算符（`? :`），該運算符在條件成立時返回一個值，否則返回另一個值。

```javascript
const notesToShow = showAll ? notes : notes.filter(note => note.important);
```

#### 4. 篩選條件的簡化
`filter` 方法中的 `note => note.important` 已經是簡化後的寫法，去掉了多餘的 `=== true`：

```javascript
notes.filter(note => note.important);
```

#### 5. 新增切換顯示的按鈕
接著，我們可以加入按鈕來切換顯示模式，並直接在按鈕中定義事件處理器：

```jsx
<button onClick={() => setShowAll(!showAll)}>
  show {showAll ? 'important' : 'all'}
</button>
```

- `onClick` 中的 `setShowAll(!showAll)` 切換 `showAll` 的值，`true` 變 `false`，`false` 變 `true`。
- 按鈕的文字會根據 `showAll` 的值動態改變，若目前顯示全部筆記，按鈕顯示「顯示重要筆記」，反之亦然。

這樣的設計讓使用者可以點擊按鈕輕鬆切換顯示模式，而不必刷新頁面。

# c.Getting data from server 
## The browser as a runtime environment
### 瀏覽器作為執行環境

#### 在 React 應用程式中使用客戶端與伺服器端
目前為止，我們只專注於前端（即瀏覽器端）功能。現在，我們將開始向後端功能邁進，透過連接 React 應用程式到伺服器來儲存數據。我們將使用 JSON Server 來模擬伺服器功能，無需實際編寫伺服器程式碼。

#### 使用 JSON Server 進行本地開發
1. **建立 `db.json` 檔案**：在專案根目錄中建立一個 `db.json` 檔案作為數據儲存庫。該檔案將包含一組筆記資料，可以透過 JSON Server 進行管理。
2. **安裝並運行 JSON Server**：
   - 可以使用 `npm install -g json-server` 全域安裝 JSON Server。
   - 使用以下指令在埠號 3001 上運行 JSON Server：`json-server --port 3001 --watch db.json`。
   - 或者，使用 `npx` 運行以避免全域安裝：`npx json-server --port 3001 --watch db.json`。
3. **測試 JSON Server**：可以在瀏覽器中前往 `http://localhost:3001/notes` 來查看 JSON 格式的筆記資料。

#### 使用 `fetch` API 取得資料
要從 JSON Server 取得已儲存的筆記資料，我們將使用 `fetch` API，它是現代 JavaScript 中替代 `XMLHttpRequest`（XHR）的方法。

#### 比較 `fetch` 與 `XMLHttpRequest`：
- **XMLHttpRequest (XHR)**：XHR 曾是 HTTP 請求的標準方法，但採用事件驅動的回呼方式處理請求。
- **fetch**：`fetch` 基於 Promise，可以讓非同步操作的處理更加簡單且具可讀性，比 XHR 的事件驅動模型更容易管理。

#### `XMLHttpRequest` 示例（不推薦使用）：
```javascript
const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText);
    // 處理 data 資料
  }
};

xhttp.open("GET", "/data.json", true);
xhttp.send();
```

#### JavaScript 的非同步特性
JavaScript 執行 IO 操作時是非同步的，也就是說程式碼在進行 IO 呼叫後立即繼續執行，不會等待它完成。這種方式可以保持瀏覽器的響應性，讓它在等待 IO 完成時不會卡住。

1. **JavaScript 單執行緒**：JavaScript 引擎為單執行緒，因此無法並行執行程式碼。所有 IO 操作必須是非阻塞的，以防止瀏覽器無法回應使用者操作。
2. **非同步程式碼執行示例**：
   ```javascript
   setTimeout(() => {
     console.log('loop..');
     let i = 0;
     while (i < 50000000000) { i++; }
     console.log('end');
   }, 5000);
   ```
   當 5 秒後進入迴圈時，瀏覽器將會卡住，直到迴圈結束，無法進行其他操作。

#### 事件迴圈與瀏覽器響應性
為了保持瀏覽器的響應性，程式碼設計需避免執行時間過長的計算操作。單執行緒的限制要求程式碼避免阻塞，否則會阻礙瀏覽器快速處理使用者互動。

在現代瀏覽器中，可以透過 Web Worker 進行平行處理，但事件迴圈仍然維持單執行緒。

## npm
### npm

#### 取得伺服器數據
我們可以使用 `fetch` 函數來從伺服器獲取數據，但本課程建議使用 `axios` 來進行伺服器與瀏覽器之間的通訊。`axios` 使用起來更便捷，並且安裝 `axios` 也讓我們學習如何在 React 專案中新增 npm 套件。

#### npm 與 package.json
大多數 JavaScript 專案都使用 Node Package Manager (npm) 來管理。Vite 建立的專案也會產生 `package.json` 文件，用來描述專案依賴的外部庫或套件，例如以下範例：

```json
{
  "name": "notes-frontend",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "eslint": "^8.45.0",
    "vite": "^4.4.5"
  }
}
```

#### 安裝 `axios`
在專案根目錄（含 `package.json` 的位置）執行以下命令來安裝 `axios`：

```bash
npm install axios
```

此指令會將 `axios` 加入到 `dependencies` 中，並且自動下載相關的庫到 `node_modules` 資料夾中：

```json
"dependencies": {
  "axios": "^1.4.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

#### 安裝 `json-server`
`json-server` 是用於開發的工具，將其設為開發依賴（只在開發時使用）：

```bash
npm install json-server --save-dev
```

在 `package.json` 中的 `scripts` 區域新增啟動指令：

```json
"scripts": {
  "dev": "vite",
  "server": "json-server -p3001 --watch db.json"
}
```

這樣就可以用以下指令方便地啟動 `json-server`：

```bash
npm run server
```

#### 關於 `npm install` 的參數
我們使用過兩次 `npm install` 指令：

1. `npm install axios`：將 `axios` 安裝為**運行時依賴**，因為專案執行需要它。
2. `npm install json-server --save-dev`：將 `json-server` 安裝為**開發依賴**，因為它僅用於開發輔助，而不是程式本身的運行。

## Axios and promises
### Axios 與 Promises

#### 安裝與初始化
在 `json-server` 執行的情況下，`axios` 可以透過 `import` 語句載入並開始使用：

```javascript
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```

#### Promise 的三種狀態
Promise 是 JavaScript 處理非同步操作的一種方式，包含以下三種狀態：

1. **Pending（待定）**：操作尚未完成，結果還不可用。
2. **Fulfilled（已完成）**：操作成功完成，可用最終值。
3. **Rejected（被拒絕）**：操作失敗，無法獲取最終值，通常代表錯誤。

上例中，第一個 Promise 是成功（fulfilled）的，因為對 `http://localhost:3001/notes` 的請求成功。第二個 Promise 則失敗（rejected），原因是請求了不存在的位址 `http://localhost:3001/foobar`。

#### 使用 `then` 方法處理 Promise
若要存取 Promise 的結果，我們必須使用 `then` 方法註冊回調函數：

```javascript
axios.get('http://localhost:3001/notes').then(response => {
  console.log(response)
})
```

`then` 方法的回調函數會接收 `response` 物件，內含 HTTP GET 回應的數據、狀態碼和標頭。

通常，不必將 Promise 儲存在變數中，直接將 `then` 方法鏈接在 `axios` 方法後面即可：

```javascript
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```

這段程式碼會將伺服器返回的資料存入變數 `notes`，並將其顯示在控制台。

為了提升可讀性，常將鏈式調用分行顯示：

```javascript
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

#### 資料的解析
伺服器返回的資料是一串 JSON 格式的純文字，但 `axios` 可以自動解析它並將其轉換為 JavaScript 陣列，因為伺服器的 `Content-Type` 標頭指定了資料格式為 `application/json`。

#### 讓應用程式使用從伺服器獲取的資料
我們嘗試將伺服器上的 `notes` 資料請求回來並渲染，但這種方法並不理想。如下例所示，每當獲取到回應時，整個 `App` 元件將被重新渲染：

```javascript
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})
```

這種方法適合某些情況，但不夠靈活。最佳方式是將資料獲取邏輯移入 `App` 元件中，這樣可以更靈活地控制渲染流程。然而，`axios.get` 的放置位置並不明顯，因此需要進一步探討如何在 React 中最佳化使用這段非同步的資料獲取程式碼。

## Effect-hooks
### Effect Hook 詳細筆記

#### 什麼是 Effect Hook
React 16.8.0 引入了 `useState` 與 `useEffect` 這兩個 hook 來增強函式型元件的功能。`useEffect` 是一種 effect hook，讓元件能夠在與外部系統同步時（例如網路請求、DOM 操作、動畫等）執行特定的動作。`useEffect` 尤其適合用於從伺服器獲取資料。

#### 整合 Effect Hook 來取得資料
先移除 `main.jsx` 中的伺服器請求，並讓 `App` 元件自己負責抓取資料：

**main.jsx**
```javascript
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

在 `App` 元件中使用 `useEffect` 來從伺服器獲取資料：

**App.jsx**
```javascript
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([]) // 初始值為空陣列
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, []) // 第二參數為空陣列，僅執行一次

  console.log('render', notes.length, 'notes')
  // ...
}
```

#### 效果說明
這段程式碼的執行流程：
1. **初次渲染**：當 `App` 元件首次被渲染時，控制台顯示 `render 0 notes`，因為此時尚未取得資料。
2. **執行 Effect**：`useEffect` 開始執行，`console.log('effect')` 顯示在控制台。
3. **發送請求**：`axios.get` 開始從 `http://localhost:3001/notes` 取得資料，並註冊一個事件處理器。
4. **處理伺服器回應**：當資料成功返回，`promise fulfilled` 被印出，並透過 `setNotes` 更新狀態，使 `notes` 包含伺服器的資料。
5. **重新渲染**：更新狀態後元件重新渲染，這次的 `notes` 已包含 3 筆資料，控制台顯示 `render 3 notes`。

#### `useEffect` 的兩個參數
`useEffect` 接收兩個參數：
1. **第一個參數**：`useEffect` 的主要執行函數，即副作用函數，會在每次渲染後自動執行。
2. **第二個參數**：是依賴陣列，用來控制副作用的執行頻率。當它為空陣列 `[]` 時，副作用只在首次渲染時執行一次。

#### 重構的寫法
將 effect 函數定義成變數以便更清晰：

```javascript
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
```

這樣的寫法更清楚地展示了 `useEffect` 的兩個參數：`hook` 是副作用函數，`[]` 是依賴陣列。

#### 彈性使用 `useEffect` 的情境
除了伺服器請求，`useEffect` 也適用於各種需要在特定時機執行的情況，例如 DOM 操作或監聽事件。

#### 另一種 `useEffect` 寫法
也可以透過變數存儲事件處理函數，並分別存放 Promise：

```javascript
useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
```

雖然分開存放函數與 Promise 讓程式碼更細緻，但一般不需要特地用變數存儲函數或 Promise，直接鏈接呼叫會更簡潔。

```javascript
useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}, [])
```

#### 持續問題
目前應用程式從伺服器取得的資料可以顯示出來，但新增筆記時資料並未同步存回伺服器，因此無法持久保存資料。接下來需要處理如何在新增筆記時更新伺服器的資料。

## The development runtime environment小節
### 開發執行環境

隨著整個應用程式的配置越來越複雜，我們來回顧一下每個部分發生的事情和所在位置。以下的圖解描述了應用程式的架構。

1. **React 應用程式在瀏覽器中執行**：應用程式的 JavaScript 程式碼在瀏覽器中運行。瀏覽器從 React 開發伺服器獲取 JavaScript 程式碼。當你執行 `npm run dev` 指令後，會啟動這個開發伺服器。

2. **React 開發伺服器（dev-server）**：開發伺服器會將 JavaScript 程式碼轉換成瀏覽器可以理解的格式。開發伺服器除了將不同檔案的 JavaScript 程式碼合併成單一檔案，還負責編譯與轉換。我們會在課程的第 7 部分詳細討論開發伺服器的運作方式。

3. **資料的 JSON 格式化**：在瀏覽器中執行的 React 應用程式會向執行在本機 3001 埠口的 `json-server` 發出請求，來取得 JSON 格式化的資料。`json-server` 是開發時用來模擬伺服器的一個工具。

4. **資料來源（db.json）**：`json-server` 的資料來自於本地端的 `db.json` 檔案。這個檔案在開發期間存放所有的資料。

5. **本地端運行環境**：目前開發的所有部分都在開發者的本地機器（localhost）上運行。當應用程式部屬到網路上時，這個情況就會有所改變。我們將在課程的第 3 部分討論如何將應用程式部屬到網際網路。
![截圖 2024-11-03 下午4.10.10](https://hackmd.io/_uploads/ry6kx2VWyg.jpg)

# d. Altering data in server
## REST
### 2-d章節：修改伺服器上的資料（Altering data in server）

#### 簡介
在應用程式中建立筆記時，我們會希望將它們存儲到後端伺服器中。`json-server` 套件宣稱提供了所謂的 REST 或 RESTful API，並允許快速創建一個完整的假 REST API，無需編碼。

儘管 `json-server` 不完全符合教科書中對 REST API 的定義，但大多數聲稱是 RESTful 的 API 也大同小異。我們將在課程後續部分更深入了解 REST 的概念，但在這裡有必要先了解一些 `json-server` 和 REST API 的基本約定，尤其是路由（URL）和 HTTP 請求類型的使用方式。

#### REST 的基本概念
- **資源（Resource）**：在 REST 中，單個資料物件（例如應用程式中的筆記）稱為資源，每個資源都有一個唯一的地址（URL）。
- **資源的路徑**：例如，筆記資源的路徑 `notes/3` 對應到 id 為 3 的筆記，`notes` 則對應包含所有筆記的集合。

#### HTTP 請求方法
- **HTTP GET**：用於從伺服器獲取資源。
  - `GET notes/3`：從伺服器取得 id 為 3 的筆記。
  - `GET notes`：取得所有筆記的清單。

- **HTTP POST**：用於創建新資源，將筆記儲存到伺服器中。
  - 將新筆記的資料作為請求的主體，並發送至 `notes` URL 來創建新筆記。

#### JSON 資料格式
- **JSON 格式要求**：`json-server` 要求所有資料以 JSON 格式傳送，即資料必須是正確格式的字串，且請求中需包含 `Content-Type` 標頭，其值為 `application/json`。

這些約定構成了我們在使用 REST API 時的基本規範，並有助於理解如何與伺服器上的資源進行互動。


## Sending Data to the Server
### 傳送資料至伺服器 (Sending Data to the Server)

在這一小節中，我們將學習如何將新筆記的數據發送到伺服器。

#### 1. 修改新增筆記的事件處理函數
首先，更新 `addNote` 函數，使其使用 `axios` 的 `post` 方法將新筆記發送到伺服器：

```javascript
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    })
}
```

- `noteObject`：建立一個新的筆記物件，不包含 `id` 屬性，因為我們希望由伺服器來生成資源的 `id`。
- `axios.post`：將 `noteObject` 發送到 `http://localhost:3001/notes`，並在伺服器回應後，將回應數據記錄到控制台中。

#### 2. 確認伺服器回應
新增筆記後，控制台會顯示伺服器的回應內容，其中包含伺服器生成的 `id`，這代表筆記已成功儲存在伺服器。

#### 3. 檢查網路請求
在 Chrome 的開發者工具中，可以查看發送的 HTTP 請求，以確認請求標頭（headers）和數據是否正確。
- **Headers**：確認 `Content-Type` 為 `application/json`，這表示數據格式為 JSON。
- **Payload**：查看請求中發送的數據內容。
- **Response**：檢查伺服器的回應數據，其中包含生成的 `id`。

#### 4. 更新應用程式的狀態
目前，新增的筆記還沒有顯示在螢幕上，因為我們尚未更新 `App` 元件的狀態。以下是修改後的 `addNote` 函數，將新筆記添加到應用程式的狀態中：

```javascript
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() > 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
}
```

- `setNotes`：將伺服器返回的筆記（包含 `id`）添加到 `notes` 狀態中。
- `setNewNote('')`：清空輸入欄位。
- `concat`：使用 `concat` 方法產生新的陣列，這樣可以保持原始狀態的不可變性（immutability），符合 React 的最佳實踐。

#### 5. 異步通訊與除錯策略
當伺服器回傳的數據影響應用行為時，會面臨一系列異步通訊的挑戰，這要求我們掌握足夠的 JavaScript 和 React 基礎來正確地調試。
- 在開發過程中，透過控制台日誌（`console.log`）等方式來確認狀態的正確性非常重要。
- 可以在瀏覽器中查看 `json-server` 的 JSON 資料，確認數據是否正確存儲在伺服器中。

#### 6. 總結
在課程的下一部分，我們將學習如何在後端實現自己的邏輯，並且深入了解如 **Postman** 之類的工具，這些工具有助於除錯伺服器應用程式。

## Changing the Importance of Notes
### 更改筆記的重要性 (Changing the Importance of Notes)

我們將為每個筆記新增一個按鈕，讓使用者可以切換筆記的重要性。

#### 1. 修改 Note 元件
在 `Note` 元件中新增一個按鈕，並將 `toggleImportance` 函數設為按鈕的事件處理器：

```javascript
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
```

- **按鈕標籤**：根據筆記的 `important` 屬性設定標籤為 "make not important" 或 "make important"。
- **事件處理器**：按鈕的事件處理器 `toggleImportance` 是透過 props 傳入的函數，用來切換筆記的重要性。

#### 2. 在 App 元件中定義 `toggleImportanceOf` 函數
`App` 元件中定義了一個 `toggleImportanceOf` 事件處理函數，並將其傳遞給每個 `Note` 元件：

```javascript
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}
```

- **唯一事件處理器**：每個筆記的 `toggleImportance` 事件處理器都是唯一的，因為每個 `note.id` 不同。
- **模板字串**：可以使用模板字串更易讀地生成字串，如 `console.log(\`importance of ${id} needs to be toggled\`)`。

#### 3. 使用 PUT 請求更新筆記
每個筆記在 `json-server` 後端有唯一的 URL，我們可以透過 HTTP PUT 請求更新筆記。以下是 `toggleImportanceOf` 函數的最終形式：

```javascript
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(n => n.id === id ? response.data : n))
  })
}
```

- **設定 URL**：根據 `id` 設定筆記的唯一 URL。
- **找到筆記**：用 `find` 方法找到指定 `id` 的筆記，並將其賦值給 `note` 變數。
- **建立新物件**：用擴展運算符 `{ ...note, important: !note.important }` 建立一個新的 `changedNote` 物件，並將 `important` 屬性值取反。
- **PUT 請求**：使用 `axios.put` 將 `changedNote` 發送到伺服器，替換掉原來的筆記。
- **更新狀態**：在回應中接收到更新後的筆記，用 `setNotes` 更新 `notes` 狀態。

#### 4. 為什麼使用淺拷貝？
在 React 中，直接修改狀態中的物件是不建議的，因為這會違反 React 的不可變性原則。因此，我們使用 `{ ...note }` 來創建 `note` 的淺拷貝，以確保我們不直接修改原始的狀態物件。

#### 5. 用 `map` 更新陣列中的特定項目
```javascript
setNotes(notes.map(n => n.id === id ? response.data : n))
```

- **`map` 方法**：`map` 會創建一個新陣列。條件為 `note.id === id` 時，使用更新的筆記（`response.data`）；否則保留舊的項目。
- **更新邏輯**：這樣可以在不直接修改原陣列的情況下更新指定的筆記，符合 React 不變性原則。

這種 `map` 方法看起來可能有點複雜，但在 React 中非常常用。