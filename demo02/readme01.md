## 项目说明

### 1.0.额外知识

#### 1.1.数组操作

在ES5中提供了五种方法对数据进行操作，分别是every，some，filter，map以及forEach。

- every

```javascript
// 对数据进行遍历，如果数组中所有的项数都满足条件则返回true
var arr = [1,2,3,4,5];
var bool = arr.every(function(item){
    return item > 2
})
console.log(bool)  // false
```

内部实现

```javascript
// 如果回调函数中有一个为false 则返回 false，如果其中全部都是 true 则返回 true
Array.prototype.myEvery = function(callback){
    for(var i=0; i<this.length; i++){
        if(!callback(this[i],i,this)){ //这是因为callback中有三个参数
            return false
        }
    }
    return true
}
```

- some

```javascript
// 对数据进行遍历，如果数组中所有的项数中有一项满足则返回true
var arr = [1,2,3,4,5];
var bool = arr.every(function(item){
    return item > 2
})
console.log(bool)  // true
```

内部实现

```javascript
Array.prototype.mySome = function(callback){
    for(var i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            return true
        }
    }
    return false
}
```

- filter

```javascript
// 对数据进行条件过滤
var arr = [1,2,3,4,5]
var newArr = arr.filter(function(item){
    return item > 2
})
console.log(newArr)
```

内部实现

```javascript
Array.prototype.myFilter = function(callback){
    var newArr = []
    for(var i=0; i<this.length; i++){
         if(callback(this[i],i,this)){
        	newArr.push(this[i])
    	}
    }
    return newArr
}
```

- forEach

```javascript
// 对数据进行操作
var arr = [1,2,3,4,5]
var arr2 = []
var newArr = arr.forEach(function(item){
    arr2 = item + 2
})
console.log(arr) //[1,2,3,4,5]
console.log(arr2) //[3,4,5,6,7]
```

内部实现

```javascript
Array.prototype.myForEach=function(callback){
    for(var i=0;i<this.length;i++){
        callback(this[i],i,this)
    }
}
```

- map



#### 1.2.鼠标事件

mouseenter、mouseleave、mouseover和mouseout。

- mouseenter和mouseleave
  - 当鼠标进入和鼠标离开时触发，如果该元素有子元素，那么进入子元素会判定为mouseleave

- mouseover和mouseout
  - 当鼠标在元素上面，即使进入到子元素上依然判定为mouseover

#### 1.3.赋值

在javascript中，数组和对象的赋值其实是引用。如果学过c语言或java语言，便能很清楚地理解数组和对象赋值其实是指针的赋值。

```javascript
// 字符串和数字赋值，变量之间没有联系，为独立的数据
var a = 'hello'
var b = a
var a = 'world'
console.log(a)  // 打印 world
console.log(b)  // 打印 hello

// 数组和对象的赋值，变量的内存其实是一个指向数据空间的地址，也就是说彼此数据是存在关联的
var c = {like:'fish'}
var d = c
c.like = 'egg'
console.log(c.like) // egg
console.log(d.like) // egg
```

**在 vue 中由于指针赋值带来的变化**

如果父组件传递给子组件的数据为一个对象或数组的话，当在子组件中修改props的值，实际上父组件的值也发生了变化。

```html
<div id="app">
    <h1>
        {{ msg.content }}
    </h1>
    <show :msg='msg'></show>
</div>
<template id='myTemplate'>
    <button @click='change'>
        改变内容
    </button>
    <h2>
        {{ msg.content }}
    </h2>
</template>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            msg:{
                content:'i am father'
            }
        }
        components:{
            show:{
        		props:['msg'],
                template:'#myTemplate',
                methods:{
                    change(){
						this.msg.content = 'i am son'
                	}
            	}
            }
        }
    })
</script>
<!--
在 vue 中，组件之间的数据是单向传递的，但在这种情况下，当改变子组件中的数据，父组件的数据也发生了改变。也就是对象或数组的引用造就了此时数据的双向流动。
如果想要保持数据的单向流动，也就是数据只能从父组件传递到子组件的话，只需将props的值传递给data
-->
```

**数据操作由于指针赋值带来的变化**

数组中的 forEach 方法是无法改变原数组中的内容，不包括数组和对象。

- 普通数值

```javascript
var arr = [1,2,3,4,5]
arr.forEach(function(item){
    item = 10
})
console.log(arr) // [1,2,3,4,5]
```

- 数组或对象

```javascript
var arr=[
    {name:'zhangsan',age:18},
    {name:'lisi',age:19}
]
arr.forEach(function(item){
    item.name = 'wanger'
})
console.log(JSON.stringify(arr))  // "{name:'wanger',age:18},{name:'wanger',age:19}"
```

之所以出现这种情况，是因为在函数实现内部中，当调用回调函数并进行参数赋值，由于普通数值的参数赋值并不是引用，故无法产生关联，如下：

```javascript
var a = 5;
function change(a){
    a = 10
}
change(a);
console.log(a); //5
```



