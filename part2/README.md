[課程](https://fullstackopen.com/en/part2/rendering_a_collection_modules)
# Rendering a collection, modules
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