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
