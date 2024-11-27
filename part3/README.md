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
