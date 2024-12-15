# a. Node.js and Express
## Simple web server
### Simple Web Server筆記

在這一章中，我們將重心放在後端的實作，也就是在伺服器端進行功能開發。

我們會使用 Node.js 作為後端基礎。Node.js 是基於 Google Chrome 的 V8 JavaScript 引擎的 JavaScript 執行環境。

#### 準備工作
本課程使用 Node.js v20.11.0。請確保你的 Node.js 版本至少與教材所使用的版本相同（可以在命令列中輸入 `node -v` 來確認版本）。

在前端（瀏覽器端）通常需要使用 Babel 等工具來將最新的 JavaScript 功能轉譯（transpile）為瀏覽器支援的格式；但在後端，Node.js 支援大多數 JavaScript 的最新功能，無需轉譯。

我們的目標是實作一個後端來支持第二部分的筆記應用程式，但先從基本的「Hello World」應用程式開始。

---

#### 初始化 Node.js 應用程式

我們使用 `npm init` 命令來初始化應用程式，回答提示問題後會生成一個 `package.json` 文件，該文件包含專案的基本資訊：

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Matti Luukkainen",
  "license": "MIT"
}
```

文件中定義了應用程式的入口文件為 `index.js`。

我們可以在 `scripts` 物件中新增一個 `start` 指令：

```json
"scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

然後，創建一個 `index.js` 文件，內容如下：

```javascript
console.log('hello world');
```

可以使用以下任一指令執行程式：
1. 直接使用 Node.js 執行：
   ```bash
   node index.js
   ```
2. 使用 npm 指令執行：
   ```bash
   npm start
   ```

---

#### 建立簡單的 Web Server

將 `index.js` 修改為 Web Server，如下：

```javascript
const http = require('http');

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

啟動伺服器後，會在控制台打印 `Server running on port 3001`。可以在瀏覽器中訪問 `http://localhost:3001`，會顯示 "Hello World"。

若端口 3001 被其他應用程式佔用（例如 json-server），則需要更換端口或停止使用該端口的應用程式。

#### 模組與導入方式

Node.js 使用 CommonJS 模組系統，不像前端的 ES6 模組。這是因為在 JavaScript 官方支援模組之前，Node.js 就已經實作了自己的模組系統。Node.js 也支援 ES6 模組，但還不是非常完善。

CommonJS 模組的使用方式如下：

```javascript
const http = require('http');
```

---

#### 回應 JSON 資料

接下來，我們讓伺服器回應 JSON 格式的筆記列表：

```javascript
const http = require('http');

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
];

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

- 我們將 `Content-Type` 設為 `application/json`，告知接收方資料為 JSON 格式。
- 使用 `JSON.stringify(notes)` 將 `notes` 陣列轉換成 JSON 格式的字串，這是因為 `response.end()` 需要字串或緩衝區（buffer）作為回應的內容。

重新啟動伺服器並刷新瀏覽器，應用程式將以 JSON 格式顯示筆記列表的資料，就像我們在第二部分使用 json-server 時所看到的一樣。

---

### 總結

- 我們學習了如何使用 Node.js 建立一個簡單的 Web Server，並使用 `http` 模組處理 HTTP 請求。
- 初步實作了伺服器回應 JSON 格式的資料，這為後續構建更複雜的後端打下基礎。
- Node.js 的 CommonJS 模組與 ES6 模組略有不同，了解其導入方式有助於更靈活地使用模組。

接下來，我們會繼續擴展這個後端程式，使其能夠更全面地支持我們的筆記應用程式。

## Express
### Express

#### 為什麼使用 Express？

直接使用 Node.js 內建的 `http` 模組實作伺服器是可能的，但隨著應用程式的規模增大，這種方式會變得非常麻煩。

為了解決這個問題，有許多第三方函式庫被開發出來，提供更好的介面來操作 Node.js 的內建 `http` 模組。這些函式庫簡化了伺服器端開發的流程，幫助開發者更輕鬆地實現後端伺服器常見的功能。而其中最受歡迎的函式庫就是 **Express**。

---

#### 安裝 Express

使用以下指令將 Express 加入專案的依賴項：

```bash
npm install express

```

安裝完成後，`package.json` 文件會自動更新，並新增以下內容：

```json
"dependencies": {
  "express": "^4.18.2"
}

```

Express 的原始碼會被下載到專案根目錄的 `node_modules` 資料夾中。此外，該資料夾中還包含其他許多依賴項：

-   Express 本身的依賴項
-   這些依賴項的依賴項（遞歸）

這些間接的依賴項被稱為 **轉移依賴項（transitive dependencies）**。

---

#### npm 的版本規則

在 `package.json` 文件中，Express 的版本號前有一個 `^` 符號：

```json
"express": "^4.18.2"

```

這是 **語意化版本規範（Semantic Versioning）** 的一部分，用來管理依賴項的版本。

-   `^4.18.2` 的含義是：  
    當更新依賴項時，Express 的版本必須至少是 4.18.2，但可以更新至更高的 **小版本（patch number）** 或 **次版本（minor number）**。  
    **主要版本（major number）**（第一位數）必須保持不變。

---

#### 更新與安裝依賴項

-   **更新現有依賴項**  
    使用以下指令更新專案中的所有依賴項至符合 `package.json` 定義的最新版本：
    
    ```bash
    npm update
    
    ```
    
-   **在新環境中安裝依賴項**  
    如果你在另一台電腦上開啟專案，可以使用以下指令根據 `package.json` 文件自動安裝所有依賴項：
    
    ```bash
    npm install
    
    ```
    

---

#### 向後兼容性

-   如果依賴項的 **主要版本號（major number）** 不變，則新版本通常是 **向後兼容（backward compatible）**的。  
    例如：如果未來使用的是 `4.99.175` 版本，這一章節的程式碼應該仍然可以正常運行。
    
-   如果依賴項升級到新 **主要版本（major version）**（例如：5.0.0），則可能引入不兼容的變更，導致應用程式無法正常工作。
    

---

### 總結

-   Express 是最受歡迎的 Node.js 後端開發函式庫，簡化了伺服器構建流程。
-   依賴項的版本由語意化版本規範控制。`^` 符號允許更新次版本和小版本，但限制了主要版本的變更。
-   `npm install` 和 `npm update` 是管理專案依賴項的常用指令。

接下來，我們會開始使用 Express 架設更靈活的後端伺服器。

## Web and Express
### Web and Express

#### 實作一個簡單的 Express 伺服器

以下是我們應用程式的修改版本：

```javascript
const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

```

---

### 關鍵點解析

#### 1. **建立 Express 應用程式**

```javascript
const express = require('express')
const app = express()

```

-   `require('express')` 引入 Express 函式庫。
-   `express()` 是一個函式，會建立並回傳一個 Express 應用程式物件，儲存在 `app` 中。

---

#### 2. **設定路由 (Routes)**

##### **根路徑 (Root Path)**

```javascript
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

```

-   定義一個處理 `GET /` 的事件處理器。
-   **`request`**：包含所有 HTTP 請求的相關資訊。
-   **`response`**：用來定義如何回應請求。
-   **`response.send()`**：回傳 HTML 格式的回應，這裡回傳的是 `<h1>Hello World!</h1>`。
-   Express 自動將 `Content-Type` 設為 `text/html`，且回應的狀態碼預設為 `200`。

##### **取得 JSON 資料**

```javascript
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

```

-   定義一個處理 `GET /api/notes` 的事件處理器。
-   **`response.json()`**：自動將 JavaScript 物件 `notes` 轉換為 JSON 格式並回傳，並將 `Content-Type` 設為 `application/json`。

---

#### 3. **啟動伺服器**

```javascript
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

```

-   啟動伺服器，監聽 `3001` 埠號上的請求。
-   啟動後，伺服器會顯示 `Server running on port 3001`。

---

### JSON 與 Express

在使用 Node.js 內建的 `http` 模組時，我們需要手動將物件轉換為 JSON 字串：

```javascript
response.end(JSON.stringify(notes))

```

在 Express 中，這個步驟是自動化的：

```javascript
response.json(notes)

```

---

### 使用 Node.js REPL 測試 JSON

Node.js 提供一個互動式的 REPL（Read-Eval-Print Loop），適合快速測試指令和功能。

以下範例展示了 JSON 資料的型別：

```javascript
> const notes = [{ id: 1, content: "Hello" }]
> JSON.stringify(notes)
'[{"id":1,"content":"Hello"}]'
> typeof JSON.stringify(notes)
'string'

```

-   **JSON 是字串**，不是 JavaScript 的物件。
-   使用 REPL 測試指令能幫助理解程式執行過程和資料結構。

---

### 總結

-   **Express** 簡化了伺服器的建構，讓開發者可以快速定義路由並處理請求。
-   使用 `response.send()` 可以回傳 HTML，`response.json()` 可直接回傳 JSON 格式資料。
-   Express 自動處理大部分的 HTTP header，例如 `Content-Type`。
-   Node.js 的 REPL 是測試和學習 JavaScript 的強大工具。

接下來，我們將進一步擴展伺服器的功能，例如處理更多的路由和請求方法。
## nodemon
### **Nodemon：自動重啟伺服器的工具**

#### **問題**

-   每次修改伺服器程式碼後，必須手動重新啟動伺服器，流程如下：
    1.  使用 `Ctrl+C` 停止伺服器。
    2.  再次啟動伺服器，例如執行 `node index.js`。
-   與 React 的自動重新載入（hot reload）相比，這樣的流程效率低下且耗時。

---

### **解決方法：使用 Nodemon**

-   **Nodemon** 是一個工具，用於監控專案檔案的變化，並在檔案修改時自動重新啟動應用程式。
-   它能夠大幅簡化開發過程，減少手動操作。

---

### **安裝 Nodemon**

-   使用以下指令將 Nodemon 安裝為開發依賴：
    
    ```bash
    npm install --save-dev nodemon
    
    ```
    
-   安裝後，`package.json` 檔案會自動更新，新增 `devDependencies`：
    
    ```json
    {
      "dependencies": {
        "express": "^4.18.2"
      },
      "devDependencies": {
        "nodemon": "^3.0.3"
      }
    }
    
    ```
    
-   **開發依賴（Dev Dependencies）**：
    -   開發時需要的工具（如 Nodemon），但在部署到生產環境時不需要。
    -   範例：Nodemon 用於開發期間自動重啟伺服器，但生產環境中不會用到。

---

### **使用 Nodemon**

1.  使用 Nodemon 啟動伺服器：
    
    ```bash
    node_modules/.bin/nodemon index.js
    
    ```
    
2.  當檔案被修改時，Nodemon 會自動重啟伺服器。
3.  **注意**：即使伺服器自動重啟，仍需手動刷新瀏覽器，Nodemon 不支援自動重新載入網頁。

---

### **透過 npm Scripts 簡化流程**

-   指令 `node_modules/.bin/nodemon` 太長，可以透過 npm scripts 簡化。

#### 修改 `package.json`：

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}

```

-   **腳本說明**：
    -   `"start"`：使用 Node.js 啟動伺服器。
    -   `"dev"`：使用 Nodemon 啟動伺服器，開發模式下自動監控檔案變化並重啟伺服器。
    -   `"test"`：未來用於測試的占位腳本，目前只是簡單的回傳錯誤訊息。

---

### **如何啟動伺服器**

1.  開發模式下執行：
    
    ```bash
    npm run dev
    
    ```
    
    -   因為是自定義腳本（如 `dev`），需要加上 `run` 關鍵字。
2.  生產模式執行：
    
    ```bash
    npm start
    
    ```
    

---

### **重點整理**

-   **Nodemon 無法自動重新載入瀏覽器**，修改後仍需手動刷新瀏覽器。
-   **使用 `--save-dev` 安裝開發依賴**，確保這些工具只用於開發環境，不會部署到生產伺服器。
-   **Nodemon 的優勢**：
    -   節省開發時間，修改程式碼後自動重啟伺服器。
    -   減少因忘記重新啟動伺服器而導致的錯誤。

完成這些步驟後，你的開發流程會更加高效！接下來將學習 Express 如何處理多樣化的路由和請求。

## REST
### **REST：建立可擴展的網路應用架構**

#### **REST 簡介**

-   REST 是 **Representational State Transfer** 的縮寫，由 Roy Fielding 在 2000 年的博士論文中提出。
-   REST 是一種架構風格，旨在建立可擴展的網路應用。
-   我們將關注於 RESTful API 的常見理解，而不深入討論 Fielding 的正式定義。

---

### **資源（Resource）**

-   **資源** 是 RESTful API 的核心概念，指的是應用程式中的特定物件或數據。
-   每個資源都有一個唯一的 URL，稱為**資源地址**。
-   例如：
    -   資源類型為 `notes`，資源的唯一 ID 為 `10`：
        -   單一資源的 URL: `www.example.com/api/notes/10`
        -   所有資源的集合 URL: `www.example.com/api/notes`

---

### **HTTP 動詞與操作**

RESTful API 通過 HTTP 動詞定義對資源的操作：

| **URL** | **HTTP Verb** | **功能** |
| --- | --- | --- |
| `notes/10` | `GET` | 獲取單一資源 |
| `notes` | `GET` | 獲取所有資源集合 |
| `notes` | `POST` | 根據請求數據創建新資源 |
| `notes/10` | `DELETE` | 刪除指定的資源 |
| `notes/10` | `PUT` | 使用請求數據替換整個資源 |
| `notes/10` | `PATCH` | 使用請求數據部分更新資源 |

#### **統一介面（Uniform Interface）**

-   RESTful API 的一個特點是提供一致的方式來操作資源，這種一致性讓系統之間更容易協作。
-   例如，所有資源的操作都使用統一的 URL 和 HTTP 動詞。

---

### **RESTful 成熟度模型**

RESTful API 的成熟度可以分為不同層次：

-   我們目前使用的是 **Richardson Maturity Model** 的第二層次：
    -   **使用 HTTP 動詞來操作資源**。
    -   **使用清晰的 URL 來標識資源**。
-   **Fielding 的原始 REST 定義** 則包含更多嚴格的條件，例如超媒體作為應用狀態的引擎（HATEOAS）。大多數現代 API 雖稱為 RESTful，但其實不完全符合 Fielding 的定義。

---

### **範例：應用 CRUD**

-   CRUD 是 RESTful API 的核心操作模式：
    -   **Create**（創建）→ POST
    -   **Read**（讀取）→ GET
    -   **Update**（更新）→ PUT / PATCH
    -   **Delete**（刪除）→ DELETE

---

### **資源導向架構**

-   我們實現的 API 是一種**資源導向架構**（Resource-Oriented Architecture, ROA）。
-   雖然某些文獻將其與 Fielding 的 REST 定義區分，但這種架構已被廣泛接受作為 RESTful API 的通用模式。

---

### **結論**

-   RESTful API 提供了清晰、一致的方式來操作資源，這讓系統之間的協作更加簡單高效。
-   接下來的章節將應用 RESTful 概念，進一步擴展我們的應用，使其提供與 `json-server` 相同的功能。


## Fetching a single resource
### **Fetching a Single Resource**

#### **新增路由以獲取單個資源**

我們將應用程式擴展，使其提供 REST 接口來操作單個筆記資源。以下是步驟與實現：

---

### **1\. 定義路由**

使用 Express 的 **colon syntax** 定義動態路由，允許從 URL 中提取參數：

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})

```

-   `:id` 是 URL 的動態部分，可透過 `request.params.id` 訪問。
-   使用陣列的 `find` 方法查找與 `id` 匹配的筆記。
-   匹配到的筆記以 JSON 格式回應給請求方。

---

### **2\. 測試功能**

-   輸入網址：[http://localhost:3001/api/notes/1](http://localhost:3001/api/notes/1)
-   瀏覽器會顯示 id 為 `1` 的筆記內容（JSON 格式）。

---

### **3\. 處理無效 ID 的情況**

當使用不存在的 ID 時，服務器返回 HTTP 狀態碼 **200**（請求成功），但內容為空。

#### **解決方案：返回 404 狀態碼**

-   當未找到匹配的筆記時，應返回 **404 Not Found**。

修改程式碼如下：

```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

```

#### **程式碼解析**

1.  **`note` 的檢查**：
    
    -   如果找到匹配的筆記，`note` 會是物件，屬於 truthy 值。
    -   如果未找到，`note` 為 `undefined`，屬於 falsy 值。
2.  **404 回應**：
    
    -   使用 `response.status(404)` 設置狀態碼為 404。
    -   使用 `response.end()` 回應空內容。

---

### **4\. 設計考量**

-   REST API 是為程式化使用而設計，不需要像瀏覽器中那樣顯示詳細頁面。
-   返回 **HTTP 狀態碼** 是提供錯誤資訊的標準方式。

#### **自定義 404 錯誤訊息**

可以透過修改回應內容來提供更多資訊，例如：

```javascript
response.status(404).send({ error: 'Note not found' })

```

此方法會在回應中附加 JSON 格式的錯誤訊息，供前端或其他消費端使用。

---

### **總結**

1.  定義動態路由 `/api/notes/:id`。
2.  使用 `find` 方法查找筆記並返回。
3.  當未找到資源時，返回 404 狀態碼，並可附加錯誤訊息。
4.  此設計符合 REST API 的規範，專注於程式化使用，無需返回 HTML 頁面。

## Deleting resources
### **Deleting Resources**

#### **實作刪除資源的路由**

刪除資源是透過向資源的 URL 發送 **HTTP DELETE 請求**實現的。以下是刪除資源的步驟與程式碼範例：

---

### **1\. 定義刪除資源的路由**

在 `index.js` 中新增以下路由：

```javascript
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

```

#### **程式碼解析**

1.  **提取 `id`**：
    
    -   使用 `request.params.id` 從路徑參數中提取筆記的 ID。
2.  **過濾筆記陣列**：
    
    -   使用陣列的 `filter` 方法過濾掉匹配該 `id` 的筆記。
    -   更新 `notes` 陣列為不包含該筆記的版本。
3.  **回應狀態碼 204**：
    
    -   使用 `response.status(204)` 設定狀態碼為 **204 No Content**。
    -   使用 `response.end()` 回應空內容，表示操作成功且無需返回任何資料。

---

### **2\. 測試功能**

發送 DELETE 請求，例如：

```bash
curl -X DELETE http://localhost:3001/api/notes/1

```

-   如果刪除成功，伺服器返回狀態碼 **204 No Content**。
-   無論目標資源是否存在，程式碼目前都返回 **204**。

---

### **3\. 設計考量**

-   **成功刪除的情況**：
    
    -   如果筆記存在且被成功刪除，返回 **204 No Content** 是 REST API 的常見慣例。
-   **目標資源不存在的情況**：
    
    -   根據 REST 的設計哲學，返回 **404 Not Found** 會更清晰地表明資源不存在。
    -   然而，在此範例中，為了簡化實現，程式對所有情況統一返回 **204**。

---

### **4\. 延伸功能**

如果需要更準確地反映刪除的結果，可以根據資源是否存在選擇狀態碼：

-   **資源存在且刪除成功**：返回 **204 No Content**。
-   **資源不存在**：返回 **404 Not Found** 並附加錯誤訊息：

```javascript
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const noteExists = notes.some(note => note.id === id)

  if (noteExists) {
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  } else {
    response.status(404).send({ error: 'Note not found' })
  }
})

```

---

### **總結**

-   刪除資源的操作使用 **HTTP DELETE** 請求。
-   簡化設計中，程式對刪除成功或資源不存在的情況統一返回 **204 No Content**。
-   如果需要更準確地反映刪除狀態，可根據資源是否存在返回 **404** 或 **204**。

## Receiving data
### **處理收到的資料：新增筆記到伺服器**

以下是如何讓應用程式可以透過 HTTP POST 請求新增筆記資源的詳細整理。

---

### **1\. 使用 JSON 解析器**

為了能夠解析請求的 JSON 格式資料，需要啟用 Express 的 JSON 解析器：

```javascript
const express = require('express')
const app = express()

app.use(express.json())

```

-   `app.use(express.json())`：
    -   將請求中的 JSON 資料解析為 JavaScript 物件，並附加到 `request.body` 屬性上。
    -   如果不使用 JSON 解析器，`request.body` 的值會是 `undefined`。

---

### **2\. 初始處理 HTTP POST 請求**

實現新增筆記的路由，並打印接收到的資料：

```javascript
app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

```

-   **功能說明**：
    
    -   打印 `request.body` 確保伺服器正確接收資料。
    -   回傳接收到的資料作為回應。
-   **測試工具**：
    
    -   使用 **Postman** 或 **VS Code 的 REST Client** 進行測試。
    -   確保請求的 `Content-Type` 設置為 `application/json`，否則伺服器無法正確解析資料。

---

### **3\. 最佳化新增邏輯**

接收到資料後，將新筆記存入應用程式的 `notes` 陣列，並生成唯一的 ID：

```javascript
app.post('/api/notes', (request, response) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

  const note = request.body
  note.id = String(maxId + 1)

  notes = notes.concat(note)

  response.json(note)
})

```

-   **功能說明**：
    -   利用 `Math.max` 找到現有筆記的最大 ID，並將新筆記的 ID 設為 `maxId + 1`。
    -   使用 `concat` 方法將新筆記加入到 `notes` 陣列中，保持不可變性。

---

### **4\. 改進資料驗證**

新增邏輯時檢查收到的資料是否符合需求，例如 `content` 是否為空，並給 `important` 屬性設定預設值：

```javascript
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

```

-   **功能說明**：
    1.  **檢查 `content` 屬性**：
        
        -   如果 `content` 為空，回傳狀態碼 **400 Bad Request**，並附加錯誤訊息。
        -   使用 `return` 避免執行後續邏輯。
    2.  **處理 `important` 屬性**：
        
        -   如果沒有傳遞 `important`，預設為 `false`。
        -   使用 `Boolean(body.important) || false` 確保值為布林型別。
    3.  **提取生成 ID 的邏輯**：
        
        -   抽取成 `generateId` 函數以提升可讀性和模組化。

---

### **5\. 重點補充**

-   **JSON 解析錯誤**：
    
    -   如果 `Content-Type` 未設置為 `application/json`，伺服器將無法解析資料，並可能導致 `request.body`為空物件。
    -   可透過 `console.log(request.headers)` 檢查請求的標頭資訊。
-   **注意開發工具**：
    
    -   建議使用 VS Code 的 REST Client，它可以將請求保存到 `.rest` 檔案，方便團隊共享測試。

---

### **6\. 測試與驗證**

-   測試新增筆記時：
    1.  發送符合要求的 JSON 資料。
    2.  驗證伺服器是否正確生成 ID 並回傳筆記。
    3.  測試缺少 `content` 的情況，是否返回狀態碼 **400**。

---

### **程式運作流程**

1.  伺服器收到 POST 請求，解析 `JSON` 資料。
2.  檢查資料完整性（如 `content`）。
3.  生成新筆記的唯一 ID 並儲存到 `notes` 陣列。
4.  回應新增的筆記給客戶端。

## About HTTP request types
### **HTTP 請求類型解析**

HTTP 標準定義了兩個與請求類型相關的重要屬性：**安全性 (Safety)** 和 **冪等性 (Idempotency)**。以下整理這些概念及其在 RESTful API 的應用。

---

### **1\. 安全性 (Safety)**

-   **定義**：
    
    -   HTTP GET 請求應該是安全的，意思是執行請求時，伺服器狀態不應該因為請求而改變。
-   **HTTP 標準的描述**：
    
    > GET 和 HEAD 方法不應具有任何意義上的動作，除了檢索數據，這些方法應被視為“安全”的。
    
-   **實務應用**：
    
    -   **GET 請求**：
        -   應只用來檢索數據。
        -   不應改變伺服器的狀態，例如不新增、刪除或修改任何資料。
    -   **HEAD 請求**：
        -   與 GET 類似，但只返回狀態碼和回應標頭，不包含回應主體。
-   **注意**：
    
    -   **安全性是推薦標準**，無法絕對保證。例如，某些非 RESTful API 可能在 GET 請求中執行修改操作。

---

### **2\. 冪等性 (Idempotency)**

-   **定義**：
    
    -   一個請求即使執行多次，產生的副作用應與執行一次時的結果相同。
-   **HTTP 標準的描述**：
    
    > GET、HEAD、PUT 和 DELETE 方法應具備冪等性，請求多次的副作用應與執行一次時相同。
    
-   **實務應用**：
    
    -   **GET 和 HEAD 請求**：
        -   僅檢索數據，因此不會產生副作用，天生具備冪等性。
    -   **PUT 請求**：
        -   用於更新資源。多次執行相同的 PUT 請求，會覆蓋相同的數據，不會產生額外的副作用。
    -   **DELETE 請求**：
        -   用於刪除資源。多次執行相同的 DELETE 請求，結果與執行一次相同（資源已刪除或不存在）。
-   **POST 的特例**：
    
    -   **POST 請求**並非冪等：
        -   每次執行 POST 請求，都會新增一個資源。
        -   例如，發送 5 次內容為 `{ content: "many same", important: true }` 的 POST 請求，會新增 5 筆相同的資源。

---

### **3\. 總結**

| **請求類型** | **安全性 (Safety)** | **冪等性 (Idempotency)** | **功能** |
| --- | --- | --- | --- |
| **GET** | 是 | 是 | 檢索資源數據，不影響伺服器狀態 |
| **HEAD** | 是 | 是 | 檢索資源的狀態碼和標頭，不包含主體 |
| **PUT** | 否 | 是 | 更新或替換資源 |
| **DELETE** | 否 | 是 | 刪除資源 |
| **POST** | 否 | 否 | 新增資源，每次請求產生不同結果 |

---

### **4\. RESTful API 設計建議**

-   遵循 HTTP 標準，合理使用請求類型：
    -   使用 **GET** 檢索資料，避免修改伺服器狀態。
    -   更新或覆蓋資料時使用 **PUT**。
    -   刪除資源時使用 **DELETE**。
    -   新增資源時使用 **POST**，並接受非冪等性的特性。
-   確保 API 的行為符合設計預期，避免在非標準使用下導致潛在問題。


## Middleware
### **MiddleWare：Express 中間件功能整理**

---

### **1\. 中間件 (Middleware) 是什麼？**

-   中間件是處理請求和回應對象的函數，常用於增強或修改 Express 應用的行為。
-   它可以攔截、處理請求，並在完成後傳遞控制權給下一個中間件。

---

### **2\. 常見中間件：json-parser**

-   **作用**：
    
    -   解析請求的原始數據（如 JSON），並將其轉換為 JavaScript 對象。
    -   然後將解析後的對象附加到請求對象的 `body` 屬性中。
-   **使用方法**：
    
    ```javascript
    app.use(express.json())
    
    ```
    
-   **執行順序**：
    
    -   中間件按代碼中定義的順序逐一執行。

---

### **3\. 自定義中間件：請求日誌紀錄**

-   自定義中間件可用於擴展功能，例如記錄每個請求的訊息。
    
-   **範例：自定義請求日誌中間件**
    
    ```javascript
    const requestLogger = (request, response, next) => {
      console.log('Method:', request.method)
      console.log('Path:  ', request.path)
      console.log('Body:  ', request.body)
      console.log('---')
      next() // 將控制權傳遞給下一個中間件
    }
    
    app.use(requestLogger)
    
    ```
    
-   **注意順序**：
    
    -   必須在所有路由之前使用，否則請求可能已被處理。
    -   如果需要 `request.body`，請確保在 `json-parser` 之後執行。

---

### **4\. 捕捉未知端點**

-   當請求未匹配到任何路由時，返回 404 狀態碼和錯誤訊息。
    
-   **範例：捕捉未知端點**
    
    ```javascript
    const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
    }
    
    app.use(unknownEndpoint)
    
    ```
    
-   **執行順序**：
    
    -   應放置在所有路由定義之後，專門處理未匹配的請求。

---

### **5\. 中間件的執行流程**

1.  請求進入應用，按順序執行已註冊的中間件。
2.  每個中間件需要執行 `next()`，將控制權交給下一個中間件。
3.  如果中間件未調用 `next()`，請求將卡在該中間件，無法繼續處理。

---

### **6\. 小結**

-   中間件可以用於各種用途，例如：
    -   請求日誌、驗證、錯誤處理、數據解析。
-   正確的中間件順序是關鍵：
    -   **JSON 解析** (`express.json`) 應先於需要訪問 `request.body` 的中間件。
    -   **未知端點處理** 應置於所有路由之後。
### 特別解釋
```javascript!
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next() // 將控制權傳遞給下一個中間件
}
```
這段程式碼的核心目的是建立一個**中間件函數**，用來記錄每次進入伺服器的請求資訊，並透過 `next()` 傳遞控制權給下一個中間件或路由處理器。

---

### **程式碼解析**

1.  **函數宣告**：
    
    ```javascript
    const requestLogger = (request, response, next) => { ... }
    
    ```
    
    -   **`request`**：代表 HTTP 請求對象，包含請求的詳細資訊（如方法、路徑、主體內容等）。
    -   **`response`**：代表 HTTP 回應對象，允許對請求進行回應。
    -   **`next`**：是一個函數，用來將控制權傳遞給下一個中間件。

---

2.  **功能：記錄請求資訊**
    
    ```javascript
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    
    ```
    
    -   **`request.method`**：記錄 HTTP 方法，例如 `GET`、`POST` 等。
    -   **`request.path`**：記錄請求的路徑，例如 `/api/notes`。
    -   **`request.body`**：記錄請求的主體內容，這需要搭配 `express.json()` 中間件進行 JSON 解析，否則會是 `undefined`。
    -   **分隔線 `---`**：純粹用來分隔日誌輸出，方便檢視。

---

3.  **傳遞控制權**
    
    ```javascript
    next()
    
    ```
    
    -   調用 `next()` 告訴 Express，這個中間件的任務完成，並將控制權傳遞給下一個中間件或匹配的路由處理器。
    -   如果忘記調用 `next()`，請求將會卡在這個中間件，後續處理無法執行。

---

4.  **啟用中間件**
    
    ```javascript
    app.use(requestLogger)
    
    ```
    
    -   使用 `app.use()` 將中間件加入 Express 應用中。
    -   **作用範圍**：適用於所有進入伺服器的請求，無論路由是否匹配。

---

### **範例輸出**

假設有一個 `POST` 請求到 `/api/notes`，其主體內容為：

```json
{
  "content": "Learn middleware",
  "important": true
}

```

在伺服器端的控制台輸出：

```
Method: POST
Path:   /api/notes
Body:   { content: 'Learn middleware', important: true }
---

```

---

### **應用場景**

1.  **除錯與日誌**：
    
    -   記錄請求的方法、路徑、主體，方便開發者檢查伺服器接收到的資料是否正確。
2.  **請求監控**：
    
    -   在實際運行中，可以用來記錄使用者的請求行為，協助分析與排查問題。
3.  **基礎教學**：
    
    -   展示中間件的基本結構與 `next()` 的使用方式。

---

### **注意事項**

1.  必須在其他需要處理請求的中間件或路由之前定義此中間件。
2.  如果要記錄 `request.body`，必須確保在此中間件之前啟用 `express.json()`。


# b. Deploying app to internet
## Same origin policy and CORS
### **Same-Origin Policy and CORS**

#### **背景介紹**

1.  **同源政策 (Same-Origin Policy)**：
    
    -   瀏覽器的安全機制，用來防止某些安全漏洞（如會話劫持）。
    -   **同源的定義**：協議 (protocol)、主機名 (hostname)、以及埠號 (port) 都相同。
        -   例如：
            
            ```
            URL: http://example.com:80/index.html
            - 協議: http
            - 主機名: example.com
            - 埠號: 80
            
            ```
            
    -   瀏覽器從伺服器請求資源時，如果資源的 URL 與原始 HTML 文件的 URL 共享相同的來源，則瀏覽器會正常處理回應。
    -   如果資源的來源不同，瀏覽器會檢查回應中的 **`Access-Control-Allow-Origin`** 標頭：
        -   如果標頭允許跨域（例如設為 `*` 或指定的來源），則瀏覽器處理該資源。
        -   否則，瀏覽器拒絕該回應並拋出錯誤。
2.  **跨來源資源共享 (CORS)**：
    
    -   為了允許合法的跨來源請求（如 AJAX 請求），W3C 定義了 **CORS** 機制。
    -   根據 Wikipedia 的定義：
        
        > 跨來源資源共享（CORS）是一種機制，允許網頁從不同來源請求受限制的資源。
        
    -   某些跨來源請求默認被禁止，例如 Ajax 請求，而 CORS 允許我們在伺服器端設置策略，允許特定的來源進行請求。

---

#### **問題描述**

-   我們的 React 前端執行在 `localhost:5173`，而後端伺服器執行在 `localhost:3001`。
-   因為協議、主機名和埠號不完全相同，這些請求屬於跨來源請求，會被瀏覽器的同源政策阻止。

---

#### **解決方案：使用 CORS 中間件**

1.  **安裝 cors 套件**：
    
    ```bash
    npm install cors
    
    ```
    
2.  **啟用 CORS 中間件**：
    
    -   在後端程式中引入並啟用 CORS：
        
        ```javascript
        const cors = require('cors')
        app.use(cors())
        
        ```
        
    -   這樣會允許來自所有來源的請求（不推薦在生產環境中使用）。
3.  **設定特定來源**：
    
    -   如果後端僅需允許特定的前端進行請求，可以進一步配置：
        
        ```javascript
        app.use(cors({
          origin: 'http://localhost:5173' // 僅允許來自此來源的請求
        }))
        
        ```
        

---

#### **注意事項**

-   啟用 CORS 時應仔細考慮配置，避免不必要的安全風險。
-   在生產環境中，應僅允許特定來源訪問後端。

---

#### **目前應用架構**

-   **前端**：
    -   React 應用運行於瀏覽器，從 `localhost:3001` 的 Node.js/Express 伺服器獲取數據。
-   **後端**：
    -   使用 Express 提供 API，並啟用了 CORS 中間件，允許跨來源請求。

---

#### **結論**

-   **同源政策**是瀏覽器的一個安全限制，限制跨來源的請求。
-   **CORS** 是一種機制，允許伺服器端控制哪些來源可以合法地訪問資源。
-   我們透過啟用 `cors` 中間件，解決了前後端在不同來源下的跨域請求問題。

此時，我們的應用大部分功能已經正常運作。
![截圖 2024-12-15 下午6.04.29](https://hackmd.io/_uploads/Sy_nF7hE1e.jpg)
:::info
### **深入解釋同源政策和 CORS**

#### **什麼是同源政策？**

**同源政策 (Same-Origin Policy)** 是一個瀏覽器的安全機制，用來保護用戶的數據不被未授權的網站訪問。

**同源的條件**：兩個 URL 的 **協議 (protocol)**、**主機名 (hostname)**、**埠號 (port)** 都要完全相同。 例如：

-   `http://example.com:80` 和 `http://example.com:80` 是 **同源**。
-   `http://example.com` 和 `https://example.com` 因為協議不同，所以 **不同源**。
-   `http://example.com:3001` 和 `http://example.com:3002` 因為埠號不同，所以 **不同源**。

**為什麼需要同源政策？** 假設沒有同源政策：

1.  **場景：**
    -   你登入了一個網站，例如網銀，這個網站有你的敏感信息和操作權限。
    -   如果同源政策不存在，其他網站（如惡意網站）可以通過你的瀏覽器直接向網銀的 API 發送請求，竊取數據或者進行未授權的操作。
2.  **解決：**
    -   同源政策限制了網頁的 JavaScript，只能向與它相同來源的 API 發送請求，這樣可以防止數據被未授權的網站訪問。

#### **CORS 是什麼？**

**CORS (Cross-Origin Resource Sharing)** 是為了解決合法的跨來源請求問題而提出的機制。

例如，假設我們的應用前端和後端運行在不同的端口：

-   **前端**：`http://localhost:5173`
-   **後端**：`http://localhost:3001`

由於端口不同，這兩者是 **不同源**，瀏覽器會阻止前端向後端發送請求。

但這種情況下，我們明知道這個請求是合法的，因為我們開發了前端和後端。  
**CORS** 機制允許後端伺服器明確告訴瀏覽器：「這個來源的請求是安全的，可以被允許。」

---

#### **同源政策和 CORS 的運作過程**

1.  **請求流程：**
    
    -   瀏覽器檢測到跨來源請求時，不會立即允許請求。
    -   瀏覽器會向伺服器發送一個「**預檢請求 (Preflight Request)**」。
        -   方法：HTTP OPTIONS 請求
        -   功能：詢問伺服器是否允許這個跨來源請求。
    -   伺服器通過 CORS 設置響應，告訴瀏覽器是否允許請求。
2.  **伺服器回應的關鍵頭部：**
    
    -   `Access-Control-Allow-Origin`：指定允許的來源，例如：
        -   `*`：允許所有來源（開發中可用，生產環境不建議）。
        -   `http://localhost:5173`：僅允許這個來源。
    -   `Access-Control-Allow-Methods`：允許的 HTTP 方法（如 GET, POST）。
    -   `Access-Control-Allow-Headers`：允許的自定義頭部。

---

#### **如何在 Node.js 後端中使用 CORS？**

1.  **安裝 CORS 中間件：**
    
    ```bash
    npm install cors
    
    ```
    
2.  **引入並啟用 CORS：**
    
    ```javascript
    const cors = require('cors');
    app.use(cors());
    
    ```
    
    這將允許所有來源進行跨域請求。
    
3.  **限制允許的來源（更安全的做法）：**
    
    ```javascript
    app.use(cors({
        origin: 'http://localhost:5173', // 僅允許來自這個來源的請求
    }));
    
    ```
    

---

#### **前後端交互示例**

1.  **後端設置**：
    
    ```javascript
    const express = require('express');
    const cors = require('cors');
    const app = express();
    
    app.use(cors()); // 啟用 CORS
    app.get('/api/data', (req, res) => {
        res.json({ message: 'Hello from backend!' });
    });
    
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
    ```
    
2.  **前端請求**：
    
    ```javascript
    fetch('http://localhost:3001/api/data')
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    
    ```
    

---

#### **為什麼需要 CORS？**

-   **防止惡意跨來源請求：**
    -   惡意網站無法在用戶不知情的情況下操作合法的後端。
-   **允許合法的跨來源請求：**
    -   我們的前端和後端通常位於不同的域名或端口下，CORS 可以解決這個問題。

#### **注意事項**

-   **開發環境**：
    -   可以允許所有來源（`*`），方便測試。
-   **生產環境**：
    -   僅允許可信來源，並限制允許的方法和頭部。

#### **總結**

-   **同源政策**：瀏覽器的安全機制，限制跨來源請求。
-   **CORS**：伺服器設置的機制，允許特定來源的跨域請求。
-   **實現方式**：
    -   使用 CORS 中間件，靈活配置允許的來源和請求方式。

:::

## Application to the Internet
### 部署應用程式到互聯網 (Application to the Internet)

#### 部署背景
在這一節中，我們將完整堆疊應用程式部署到互聯網，使用的平台是 **Fly.io** 或 **Render**。這些 PaaS (Platform as a Service) 平台提供 Node.js 執行環境，並可能提供額外的功能如資料庫等。

#### 選擇平台
1. **Fly.io**（官方推薦）：
   - 支援本課程的所有章節，包括 CI/CD 和更多進階內容。
   - 免費層提供兩個虛擬機（VM）。
   - 可能需要信用卡資訊，但某些情況下可以不提供。
2. **Render**：
   - 不需要安裝額外軟體。
   - 免費層無需信用卡資訊。
   - 適合本課程的大部分章節（但可能不支援進階的 CI/CD 部分）。
3. **其他選項**：
   - **Replit** 和 **CodeSandBox** 也適合作為 Node.js 應用的簡易部署服務。

---

### 部署準備

1. 修改 **後端伺服器的端口設定**，確保應用可以讀取環境變數設定的 `PORT`：
   ```javascript
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **環境變數的重要性**：
   - Fly.io 和 Render 等平台會自動設置 `PORT` 環境變數，用於指引應用在哪個端口上運行。
   - 如果 `process.env.PORT` 未定義，則使用本地開發環境的預設端口（如 3001）。

---

### Fly.io 部署

#### 1. 安裝 Fly.io CLI 工具
參考官方指引安裝 `flyctl` 工具並創建帳號。

#### 2. 認證 Fly.io 帳戶
執行以下指令登入 Fly.io 帳戶：
```bash
fly auth login
```

#### 3. 初始化應用
在後端應用的根目錄執行以下指令初始化 Fly.io 應用：
```bash
fly launch --no-deploy
```
在此過程中：
- 為應用命名（或使用自動生成的名稱）。
- 選擇應用運行的地區。
- **不要**創建 PostgreSQL 或 Upstash Redis 資料庫，這些並非本課程所需。

此指令會生成一個 `fly.toml` 配置檔案。

#### 4. 配置 `fly.toml`
編輯 `fly.toml`，確保以下設定正確：
```toml
[env]
  PORT = "3000" # 設定環境變數 PORT
[http_service]
  internal_port = 3000 # 確保與 PORT 一致
  force_https = true
```

#### 5. 部署應用
執行以下指令將應用部署到 Fly.io：
```bash
fly deploy
```

#### 6. 查看應用運行情況
- 開啟應用：
  ```bash
  fly apps open
  ```
- 檢視伺服器日誌（建議部署時隨時查看）：
  ```bash
  fly logs
  ```

#### 7. 機器數量調整（避免資料不一致）
Fly.io 默認可能會為應用創建兩台虛擬機（VM），這可能導致資料不同步。檢查機器數量：
```bash
fly scale show
```
如果 `COUNT > 1`，請執行以下指令限制為一台：
```bash
fly scale count 1
```

#### 8. 部署更新
每當應用程式有新變更時，使用以下指令重新部署：
```bash
fly deploy
```

---

### Render 部署（備選）
1. **創建 Render 帳號**
   - 登錄 Render，選擇創建新的 Web Service。
2. **選擇後端應用的 GitHub 儲存庫**
   - 連接應用的 GitHub 儲存庫。
3. **設置應用的環境變數**
   - 將 `PORT` 環境變數設置為 `3000`。
4. **自動部署**
   - Render 支持自動部署，無需額外操作。

---

### 小結
1. Fly.io 和 Render 是適合學習的免費選擇。
2. Fly.io 提供更進階的功能，但可能需要信用卡驗證。
3. 部署後，務必查看伺服器日誌以檢查運行情況。
4. 確保後端應用正確讀取 `PORT` 環境變數，以適應部署平台的要求。

## Frontend produciton build
### **Frontend Production Build**

#### **什麼是 Production Build？**
到目前為止，我們的 React 應用程式一直在 **開發模式 (development mode)** 下運行。這種模式的目的是提供清晰的錯誤訊息、即時的代碼變更反應等功能。

然而，在應用程式部署時，我們需要一個 **生產環境版本 (production build)**，這個版本經過優化，更適合正式運行，並且會移除開發模式的調試功能。

---

#### **如何建立 Production Build**
1. **執行指令**
   - 在 Vite 創建的 React 專案中，可以使用以下指令生成生產環境版本：
     ```bash
     npm run build
     ```

2. **生成的檔案**
   - **執行完畢後**，會在專案根目錄生成一個名為 `dist` 的目錄。
   - `dist` 目錄包含：
     - **index.html**：應用程式的入口 HTML 文件。
     - **assets 資料夾**：包含應用程式的壓縮 JavaScript 和 CSS 檔案。

3. **代碼壓縮與優化**
   - 所有的應用程式 JavaScript 文件會壓縮 (minify) 成單個文件。
   - 所有依賴項的代碼也會合併並壓縮到此單一文件中。
   - 這樣可以縮短加載時間，並提升瀏覽器運行效率。

4. **壓縮代碼範例**
   - 壓縮後的代碼不再可讀，類似於以下內容：
     ```javascript
     !function(e){function r(r){for(var n,f,i=r[0],l=r[1],a=r[2],c=0,s=[];c<i.length;c++)f=i[c],o[f]&&s.push(o[f][0]),o[f]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(p&&p(r);s.length;)s.shift()();return u.push.apply(u,a||[]),t()} ...
     ```
   - 壓縮的目的是減小文件大小，提升性能。

---

#### **Production Build 的用途**
1. **部署**
   - `dist` 資料夾是應用程式的 **部署版本**。
   - 這些檔案可以上傳到網頁伺服器（如 Fly.io、Render 或其他部署平台）。

2. **優化特性**
   - 生產版本的代碼無法直接被人類閱讀，降低了代碼被抄襲或竊取的風險。
   - 適合大規模分發或公開使用的應用程式。

---

#### **小結**
- **開發階段**使用開發模式以獲得快速迭代和即時反饋。
- **部署階段**必須生成 Production Build (`npm run build`)，以獲得更小的文件體積和更高的執行效率。
- **`dist` 資料夾**是正式部署的核心文件，將其上傳到伺服器即可完成前端應用程式的部署。