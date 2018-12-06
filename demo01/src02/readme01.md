## 文件说明
vue 中的 ajax 怎么用，该文件主要用 axios 插件实现。
### axios
不同于 jquery 封装的 ajax，在处理异步的问题上，该插件主要依赖与ES6中提出 promise ，其次对于请求的数据 axios 也做了一定的封装, axios 中 promise 返回的数据是包含：
- config
- data
- headers
- request
- 等

也就是说通过 axios 获取的数据，需要通过`.data`才能拿到实体内容。
