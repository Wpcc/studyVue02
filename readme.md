## Vue 的深入学习
主要涉及到项目中的组件开发，以及 vue 浅显的源码分析。该章节建立在 vue-cli3.0 工具，以及 vue-router 和 vuex 工具上。

[cli3.0视频学习地址](https://ke.qq.com/course/323614)



### 0.0.目录说明

- cli-plugin
  - vue.config.js配置
    - 通过vue.config.js中的配置，可以有选择的定义入口文件，即`main.js`文件
- demo01
  - src：组件在模块中的传参
  - src02：通过`axios` 进行ajax访问
  - src03：Pubsub 组件传参
- demo02
  - url：组件传参案例
  - url02：webStorage封装后的组件传参案例
- demo03
  - 路由
- demo04
  - src：vuex 将数据挂载在data上
  - src02：vuex 将数据挂载在data上，需要通过watch监听才能更新数据改变
  - src03：真实的vuex 是将数据挂载在computed
  - src04：vuex管理状态实例演示
  - src05：通过mapState，mapActions，mapGetters 简化在组件中的数据、方法引用

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



#### 基本使用

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



#### 文件说明

```javascript
// main.js
Vue.config.productionTip = flase

/*
	在main.js中新增关于vue配置生成的建议默认为false，这样会自动取消浏览器中 Console里面的如下提示：
	You are running Vue in development mode.
	Make sure to turn on production mode when deploying for 		production.
	See more tips at https://vuejs.org/guide/deployment.html
*/
```





#### 插件使用

在 vue-cli3.0 中，可以通过 CLI 来安装插件，这和直接用 `npm install <插件名如 | axios>`是有区别的。

当用 npm 安装插件的时候，往往需要修改 webpack 配置，以及在文件中根据插件的使用重新编码，这些问题通过 CLI 安装有很大的改善。

在 CLI 插件中都会包含一个（用来创建文件的）生成器和一个（用来调整 webpack 核心配置和注入命令的）运行时插件，当使用`vue create`来创建一个新项目的时候，有些插件便会根据之前的选择特性被预安装。

当在一个创建好的项目中安装一个插件，可以使用`vue add <插件名>`命令：

```shell
vue add vuetify
```



#### 小型服务器

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



#### 配置文件

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



#### 全局变量

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



#### pubsub

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



### 3.0.路由

#### 基本用法

#### 子路由

#### 缓存路由

如果在一个组件中的input输入内容，当用路由切换组件，该内容会消失。也就是路由的切换其实是重新创建一个组件。

通过以下代码可以保证组件的原有内容：

```vue
<keep-alive>
	<router-view></router-view>
</keep-alive>
```

#### 数据传递

- 通过 url 链接，这种方式可以在 vm 实例中的 $route 中得到
  - params

  ```html
  <!-- 以浏览器形式来显示 -->
  <div id="app">
      <route-link to="/show/1">1</route-link>
      <route-link to="/show/2">2</route-link>
      <route-link to="/show/3">3</route-link>
  </div>
  <template id='myTemplate'>
  	<div>
          id:{{id}}
      </div>
  </template>
  <script>
      var comp  = {
          template:'#myTemplate',
          data () {
              return {
                  id: this.$route.params.id
              }
          }
      }
      var router = new VueRouter({
          routes:[
              {
                  path: '/show/:id', component: comp
              }
          ]
      })
      var vm = new Vue({
         
      })
  </script>
  ```

  - query



- 通过组件名也就是 `<router-view>`,之后在组件中的props中可以拿到

### 4.0.VueX

#### 数据流

- 双向的数据流

  在 vue 中通过 v-model 来进行双向数据绑定，也就是说当视图层去更新数据层的时候，数据层同时也更新了视图层。

  双向数据流的原理是通过 js 中的 defineProperty 来定义的。

  ```html
  <div id="app">
      <input type='text' id='a'/>
      <p id='b'></p>
  </div>
  <script>
  // 模拟双向数据流
  var vue = {}
  vue.definePropery('data', {
      set: function(newValue){
          document.querySelector('#b').innerHTML = newValue
          document.querySelector('#a').value = newValue
      }
  })
  document.querySelector('#a').addEventListener('keyup',function(){
  	vue.data = this.value        
  })
  </script>
  ```

- 单向数据流

  在 vue 中通常通过单向数据流来进行数据与页面之间的交互。也就是通过 view => actions => model =>view

  整个体系呈现出一个循环的环形结构。

  **需要详细说明地是，数据的双向绑定是发生在单向数据流中的 model 与 view 之间，也就是单向数据流本身是包括双向绑定，而不是两者为对应关系。**

  [官方文档](https://vuex.vuejs.org/zh/) 

#### 基本概念

通过单向数据流，可以知道各部件之间的流向。在模块化开发中，数据与数据操作一旦涉及到多层组件往往会显得异常繁杂，比如a>b>c, b>d>e, c>f>g。如果要在e和g之间传递数据，那么数据的传递必定是层层递套关系。为了简化组件之间的传递，从而但是了VueX。

- VueX 其实是将数据之间的传递抽离出来，放在一个 store 容器中。
  - 比如将数据抽离放在 states 中
  - 将actions抽离放在 mutations 中

- 当然由于 VueX 是插件，自然而然也就少不了插件使用的流程。

```javascript
// 模块化开发中的 main.js
const Vue from 'vue'
const App from 'App.vue'
const store from 'store'

new Vue({
   	store,
    render: h => h(App)
}).$mount('#app')
/*
当将store挂载到vm实例上，vm可以通过$store方法访问Vuex.Store生成的管理对象
*/

```

```javascript
// store.js
const Vue from 'vue'
const VueX from 'vuex'
Vue.use(VueX)

export defaulf new VueX.Store({
    state: {
        msg: 'hello'
    },
    mutations: {
    // 所有mutations中的方法，都会默认传递一个state对象
        change(state){
            state.msg = 'world'
        }
    }
})
```

```vue
<!-- App.vue -->
<template>
	<div id="app">
        <button @click="change">change</button>
    </div>
</template>
<script>
    export default {
        computed : {
            msg () {
                return this.$store.state
            }
        },
        methods: {
            change(){
                this.$store.emit('change')
            }
        }
    }
</script>
```

需要注意地是 store 的数据是挂载 computed 上 而不是 data 。



#### 完整实例

真实的vuex并不会直接触发mutations，而是通过触发actions去触发mutations。之所以这样，是因为mutations并不支持异步，这是因为devtool对mutations存在状态记录，从而不允许异步操作的进行。

```javascript
// 模块化开发中的 main.js
const Vue from 'vue'
const App from 'App.vue'
const store from 'store'

new Vue({
   	store,
    render: h => h(App)
}).$mount('#app')
/*
当将store挂载到vm实例上，vm可以通过$store方法访问Vuex.Store生成的管理对象
*/

```

```javascript
// store.js
const Vue from 'vue'
const VueX from 'vuex'
Vue.use(VueX)

export defaulf new VueX.Store({
    state: {
        msg: 'hello'
    },
    mutations: {
    // 所有mutations中的方法，都会默认传递一个state对象
        change(state){
            state.msg = 'world'
        }
    },
    actions: {
        change(context){
            context.commit('change')
        }
    }
})
```

```vue
<!-- App.vue -->
<template>
	<div id="app">
        <button @click="change">change</button>
    </div>
</template>
<script>
    export default {
        computed : {
            msg () {
                return this.$store.state
            }
        },
        methods: {
            change(){
                // action的触发是通过 dispatch
                this.$store.dispatch('change')
            }
        }
    }
</script>
```

#### 镜像辅助函数简化

通过 mapState , mapGetters , mapActions 可以进行更加简单的开发。故以上 app.vue 实例可以改写成如下内容：

```vue
<!-- App.vue -->
<template>
	<div id="app">
        <button @click="change">change</button>
    </div>
</template>
<script>
    import {mapState} from './store'
    export default {
        computed : {
            ...mapState(['msg'])
            /*
            通过ES7中的对象解构操作符，实际上内容等于以下内容：
            msg () {
                return this.$store.state
            }
            */
        },
        methods: {
            ...mapActions(['change'])
            /*
            change(){
                通过ES7中的对象解构操作符，实际上内容等于以下内容：
                this.$store.dispatch('change')
            }
            */
        }
    }
</script>
```

 #### 总结

![vuex](.\readme\vuex.png)

需要补充的是 4.0 章节，也就是除了 dispatch 去触发 Actions ， 其实也可以通过 map 这种镜像对象的方式与 vuex 进行通讯。

![vuex](.\readme\vuex02.png)



### 5.0.框架及组件

#### Weex

**Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。**可以用来搭配vue进行hybrid app 开发。

[官方文档](http://weex.apache.org/cn/guide/index.html)

####  Mint UI

[官网](http://mint-ui.github.io/#!/zh-cn)

简要说明：饿了么开源的基于 vue 的移动端 UI 组件库

####  Element

[官网](http://element-cn.eleme.io/#/zh-CN)

简要说明：饿了么开源的基于 vue 的 PC 端 UI 组件库

#### Vue-Lazyload(图片懒加载)

[使用说明](https://www.npmjs.com/package/vue-lazyload)

原理：

图片懒加载的原理基本都一样，都是先将所有的图片请求都指向一个地址，然后通过滑动显示出来的页面区域，去重新加载正确的图片路径，这样也就避免了大量的静态资源请求，从而阻塞网页显示和浪费带宽。

基本使用：

```javascript
// 在main中定义
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload, {
  loading: 'dist/loading.gif',
})
```

```vue
<!-- 
	在模板中使用，如app.vue
-->
v-lazy="<图片真实路径>"
```





### 6.0.项目

#### PC商城

**额外知识补充：**

- 静态资源

​	对于静态的资源处理一般分为两种情况，如果静态资源需要webpack处理，那么则直接在src文件夹中定义。如果是图片，那么webpack会通过url-loader进行处理，具体处理细节可以通过webpack配置进行了解。

​	如果静态资源不需要webpack处理，那么则放在public文件夹下，并用绝对路径引用即可。

- @符号

​	如果 URL 以 `@` 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 `<projectRoot>/src` 的别名 `@`。**(仅作用于模版中)**

- 组件命名

  具体查看vue学习第一章节。

- 虚拟数据

  项目中的虚拟数据一般都放在mock文件夹中，并且需要进行额外的路由配置。在vueCLI2.0中通过暴露出来的`webpack.config.js`文件进行配置，但是在vueCLI3.0中由于对`webpack.config.js`进行了封装，故只能通过`vue.config.js`进行配置。

  ```javascript
  // vue.config.js
  const mockData = require('./mock/productsList.json')
  module.exports = {
    lintOnSave: false,
    devServer: {
      before(app){
        app.get('/api/list', (req, res) => {
          res.json(mockData)
        })
      }
    }
  }
  /*
  其实说白了就是对devServer中node搭配的后台路由进行配置
  */
  ```

- 图片懒加载

  通过下载vue-lazyload去实现

---

**项目构建说明：**

goodsList页面：

- 价格区间的切换主要通过点击事件去更改目标元素的`cur`类
- 当页面适用移动端后，价格区间是隐藏的，需要通过点击事件去给价格区间添加`filterby-show`类，同时给整个元素添加遮罩层，遮罩层的类为`md-overlay`通过v-show进行显示 和隐藏。
- 通过插件`vue-lazyload`实现图片懒加载