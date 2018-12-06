## Vue 的深入学习
主要涉及到项目中的组件开发，以及 vue 浅显的源码分析。该章节建立在 vue-cli3.0 工具，以及 vue-router 和 vuex 工具上。

[cli3.0视频学习地址](https://ke.qq.com/course/323614)



### 0.0.目录说明

- cli-plugin
  - vue.config.js配置
    - 通过vue.config.js中的配置，可以有选择的定义入口文件，即`main.js`文件
- demo01
  - src
    - 组件在模块中的传参
  - src02
    - 通过`axios` 进行ajax访问
  - src03
    - Pubsub 组件传参

- demo02
  - url
    - 组件传参案例
  - url02
    - webStorage封装后的组件传参案例

```javascript
/*
如果要调整项目的入口文件也就是main.js的话，在cli3.0中需要通过vue.config.js
*/
const path = require('path')
module.exports = {
    configureWebpack: {
        entry: path.join(__dirname, <项目入口地址：如'src/main.js'>)
    }
}
```



### 1.0.vue-cli3.0

vue-cli 从2.0版本升级到3.0版本，这之间发生了不少的变化，以下会详细介绍 vue-cli3.0 更新内容：



#### 1.1.安装

命令语句如下：

```shell
npm i @vue/cli -g
```

当安装好`vue-cli`脚手架工具之后，我们就可以利用它来生成项目的基本构架。通过命令语句：

```shell
vue create <项目名>
```

安装配置：
在输入命令行语句之后，`vue-cli`会提供一些选择项让我们对其进行筛选，你可以通过[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html)进行更详细查看。

- 第一步：关于预设的两个选择
  - 默认的选项（一般包括babel：对es6语法的处理。eslint对js语法的检测）
  - 手动设置选项

```shell
Please pick a preset:(Use arrow keys)
> default (bable, eslint)
> Manually select features
```

- 第二步（一般选择手动设置，如有如下选择配置）：
  - Babel：对ES6进行转译
  - TypeScript：一种js语法
  - Progressive Web APP （PWA） Support ：对移动响应式的支持
  - Router：路由
  - Vuex：状态管理
  - CSS Pre-processors：css预处理器，翻译less和scss
  - Linter / Formatter：JS代码规范检测
  - Unit Testing：单元检测
  - E2E Testing：端对端检测

```shell
Check the features needed for your project:(Press <space> to select, <a> to goggle all, <i> to invert selection)
// 翻译过来就是：空格键进行选择，a键进行全选，i键可以反向
> (*) Babel
  ( ) TypeScript
  ( ) Progressive Web App (PWA) Support
  ( ) Router
  ( ) Vuex
  ( ) CSS pre-processors
  ( ) Linter / Formatter
  ( ) Unit Testing
  ( ) E2E Testing
```

- 第三步：是否将`router`模式设置为History模式，这种模式区别于正常的hash模式，会将URL的地址更改为正常的模式，如`http://yoursite.com/user/id`。当然，这种模式后台也将会有特殊的配置。详情可通过[官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)查看

```shell
Use history mode for router?(Requires proper server setup for index fallback in production) (Y/n)
# 一般选择n
```

- 第四步：选择CSS-processer模式
  - Sass/Scss
  - Less
  - Stylus

```shell
Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):(Use arrow keys)
> Sass/SCSS
  Less
  Stylus
# 我选择less
```

- 第五步：选择ESLint的语法检测

```shell
Pick a linter / formatter config:(Use arrow keys)
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard confg
  ESLint + Prettier
```

- 第六步：选择语法检测在什么时候触发
  - Lint on save：在存储的时候触发
  - Lint and fix on commit：在提交的时候才触发

```shell
(*) Lint on save
( ) Lint and fix on commit
# 一般选择在存储中触发，即选择第一个
```

- 第七步：对选择的包的配置项是独立的建立文件，还是综合的设置到`package.json`

```shell
Where do you perfer placing config for Babel, PostCss, ESLint, etc.? (Use arrow keys)
> In dedicated config files
  In package.json
```

- 第八步：是否将预设存储为下一次的计划

```shell
Save this as a preset for future projects? (y/N)
```

当一切选择完毕之后，vue 脚手架会将选择安装的配置下载到本地，同时自动配置好选择的配置文件。也就是一些基础的 webpack 配置在3.0版本的时候已经集成到node_modules 中的 @vue 文件夹中，并不暴露在外部让我们修改。

#### 1.2.插件使用

在 vue-cli3.0 中，可以通过 CLI 来安装插件，这和直接用 `npm install <插件名如 | axios>`是有区别的。

当用 npm 安装插件的时候，往往需要修改 webpack 配置，以及在文件中根据插件的使用重新编码，这些问题通过 CLI 安装有很大的改善。

在 CLI 插件中都会包含一个（用来创建文件的）生成器和一个（用来调整 webpack 核心配置和注入命令的）运行时插件，当使用`vue create`来创建一个新项目的时候，有些插件便会根据之前的选择特性被预安装。

当在一个创建好的项目中安装一个插件，可以使用`vue add <插件名>`命令：

```shell
vue add vuetify
```



#### 1.3.小型服务器

- vue-cli3.0 脚手架服务器

vue-cli3.0为所有的其它vue模板提供一个小型的本地服务器构建，这需要我们在全局安装一个扩展包`@vue/cli-service-global`。当安装好该扩展包后，只需要在`app.vue`文件所在的目录下运行`vue serve`和`vue build`命令就可以对单个`*vue`文件进行快速原型开发。

通过[官方文档](https://cli.vuejs.org/zh/guide/prototyping.html)，可以了解更加详细的内容。

实例展示：

例如，在demo01目录下有如下的app.vue页面。

```vue
<template>
	<div>
        hello world
    </div>
</template>
```

只需要进入到该目录所在文件夹下的命令行，然后输入如下命令行语句：

```shell
vue serve
# 以本地服务器的方式打开vue页面
```

需要注意地是该命令打包的地址会以`/`开头，也就是将文件引导到根目录，如果通过文件的形式浏览网页，资源链接的加载会报错。

- 打包后的服务器

在本地预览生成环境构建最简单的方式就是使用一个 Node.js 静态文件服务器。例如 serve:

```shell
npm i -g serve
# -s 参数的意思就是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist
```



#### 1.4.配置文件

在 cli3.0 中由于对webpack基本配置做了封装，以致于很多配置项都无法再通过 webpack.config.js 文件进行配置。

不过通过 vue.config.js 对外提供的 API 依旧可以对文件进行简单配置，这是因为如果 vue.config.js 和 package.json 同级的话，那么它会被 @vue/cli-service 自动加载。

[官方文档](https://cli.vuejs.org/zh/config/#vue-config-js)对此有更加详细地说明。

以下是对 vue.config.js 配置项的基本解释说明：

```javascript
module.exports = {
 // 基本路径
 baseUrl: '/',
 // 输出文件目录
 outputDir: 'dist',
 // eslint-loader 是否在保存的时候检查
 lintOnSave: true,
 // use the full build with in-browser compiler?
 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
 compiler: false,
 // webpack配置
 // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
 chainWebpack: () => {},
 configureWebpack: () => {},
 // vue-loader 配置项
 // https://vue-loader.vuejs.org/en/options.html
 vueLoader: {},
 // 生产环境是否生成 sourceMap 文件
 productionSourceMap: true,
 // css相关配置
 css: {
  // 是否使用css分离插件 ExtractTextPlugin
  extract: true,
  // 开启 CSS source maps?
  sourceMap: false,
  // css预设器配置项
  loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  modules: false
 },
 // use thread-loader for babel & TS in production build
 // enabled by default if the machine has more than 1 cores
 parallel: require('os').cpus().length > 1,
 // 是否启用dll
 // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
 dll: false,
 // PWA 插件相关配置
 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 pwa: {},
 // webpack-dev-server 相关配置
 devServer: {
  open: process.platform === 'darwin',
  host: '0.0.0.0',
  port: 8080,
  https: false,
  hotOnly: false,
  proxy: null, // 设置代理
  before: app => {}
 },
 // 第三方插件配置
 pluginOptions: {
  // ...
 }
}
```



#### 1.5.全局变量

在整个项目中，当我们生成一个 .env 文件，在该文件中定义的变量，通过 `process.env.<变量名>`可以直接获取。

关于全局变量的定义，cli3.0 提供三个文件，分别是：

- 基础全局变量定义文件 .env
- 开发全局变量定义文件 .env.development
- 生成全局变量定义文件 .env.production

cli3.0 的工作方式，如果项目中同时定义了以上三个文件的话，那么会通过项目环境来确定到底调用哪个文件里的内容。

关于 .env 文件中的代码使用，具体如下：

```javascript
// .env
VUE_APP_URL = 'www.baidu.com'
```

```vue
<!-- 在App.vue中使用，需要通过data定义 -->
<script>
    export default {
        data(){
            return{
                url: process.env.VUE_APP_URL
            }
        }
    }
</script>
```





### 2.0.组件传参

在浏览器中已经学过基本的组件传参，如 props 和 $emit(自定义事件)，不过在大型项目中，依旧解决不了复杂的数据传递问题。



#### 2.1.pubsub

pub：publish（发布），sub：subscribe（订阅）。这里其实设计到项目构建中的设计模式，该模块通过发布订阅这种模式来引导数据在组件之间的传递。

发布订阅模式：

其实说白了也就类似于 js 最初的函数定义和触发函数，即订阅相当于定义函数，而发布则相当于触发函数。

具体代码：

```javascript
var Pubsub from 'pubsub-js'
// 订阅：实际上通过subcribe在Pubsub上定义一个回调函数，命名为my_topic
Pubsub.subcribe('my_topic', function(msg, data){
    console.log(msg, data)
})

//发布:通过publish触发定义在Pubsub上的回调函数，并传入数据
Pubsub.publish('my_topic', 'hello world!')
```

需要说明地是，订阅消息一般都放在组件的生命周期内，如 mounted。

通过[官方文档](https://www.npmjs.com/package/pubsub-js)了解更详细内容。