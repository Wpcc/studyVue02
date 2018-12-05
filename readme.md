## Vue 的深入学习
主要涉及到项目中的组件开发，以及 vue 浅显的源码分析。该章节建立在 vue-cli3.0 工具，以及 vue-router 和 vuex 工具上。

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