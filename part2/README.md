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