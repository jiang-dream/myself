# Node.js

## 一、Node介绍

Node.js是建立在Chrome的V8引擎的JavaScript的运行时，可方便地构建快速，可扩展的网络应用程序的平台。Node.js使用事件驱动，非阻塞I/O模型，轻量、高效，可以完美地处理时时数据，运行在不同的设备上。



## 二、 全局对象

+ 在浏览器中的全局对象是 window； 在node中的全局变量是 global
+ 直接挂载在global下的方法和属性都是全局成员
+ 调用全局成员可以使用 global 也可以不使用global

```js
global.console.log('123')；
console.log('Hello Nodejs');
```



## 三、 模块化

==每一个js文件都是一个模块,需要暴露才能让其他js模块引入使用;==

==因为每一个js文件都是一个闭包作用域,避免全局变量污染==

### 1. 模块系统

#### 1）核心模块

核心模块部分在 Node 源代码的编译过程中，编译进了二进制执行文件。在 Node 进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。
如：HTTP  模块  、URL  模块、Fs  模块都是 nodejs  内置的核心模块。 ，可以直接引入使用。

#### 2）文件模块

是存储为单独的文件（或文件夹）的模块，可能是JavaScript代码、JSON或编译好的C/C++代码。在不显式指定文件模块扩展名的时候，Node.js会分别试图加上.js、.json、.node(编译好的C/C++代码)。

+ js。通过fs模块同步读取js文件并编译执行。
+ node。通过C/C++进行编写的Addon。通过dlopen方法进行加载。
+ json。读取json文件，调用JSON.parse解析加载。



#### 3）第三方模块

别人写好的，具有特定功能的、能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并放置在一个文件夹中，所以又名包。

两种存在形式：

+ 以 js 文件的形式存在，提供实现项目具体功能的API接口
+ 以命令行工具形式存在，辅助项目开发



#### 4）npm 第三方模块管理工具

==npm 第三方模块的存储和分发仓库，（node package  manager ）node的第三方模块管理工具==

使用命令：

> 下载安装：   npm  install  模块名称
>
> 卸载：  npm  uninstall  package   模块名称
>
> 更新：  npm  update 模块名称
>
> 查版本：  npm  search 模块名称

本地安装和全局安装：

> 命令行工具  ：全局安装   -g
>
> 库文件 ：  本地安装

常用命令行工具：

> nodemon 文件保存后，自动在命令行执行
>
>  npm  install nodemon  -g
>  nodemon  执行文件名称 
>
> 
>
> nrm     npm 下载地址切换工具
> npm install nrm  -g
> nrm ls 
> nrm use  下载地址名称



### 2. 模块通信

> ==require== 	用来引入外部的模块
>
> ==exports==	用来将函数内部的局部变量和拒不函数暴露到外部;
>
> ==module==	表示当前模块
>
> ==__filename==	是本js文件的绝对路径
>
> ==__dirname==	是本js文件的路径

exports 和 module.exports   存在时以module为准   



### 3. 模块加载机制

+ 模块有路径，但没有后缀时

> 1.如果路径完整，直接引入模块
> 2.如果模块后缀省略，先找同名js文件再找同名js文件夹
> 3.如果找到了同名文件夹，找文件夹中的index.js
> 4.如果文件夹中没有index.js 就会去当前文件夹中的package.json文件中查找main选项中的入口文件
> 5.如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

+ 模块没有路径，也没有后缀

> 1.Node.js 会假设它是系统模块
> 2.Node.js回去node_modules文件夹中
> 3.首先看是否有该名字的js 文件
> 4.再看是否有该名字的文件夹
> 5.如果是文件夹看里面是否有index.js
> 6.如果没有index.js 查看该文件夹中package.json中的main选项确定模块入口文件
> 7.否则找不到报错



### 4. node_modules 文件夹

+ 当前项目安装的第三模块，库文件，包
+ 问题
  + 文件夹及文件太多，拷贝速度慢 
  + 复杂的模块依赖过多需要被记录，确保模块的版本与当前的一致，否则会报错

###  5. package.json 文件

+ 项目描述文件，记录了当前项目信息，例项目名称，版本，作者，GitHub地址，当前 项目依赖了那些第三方模块等
+ 使用npm init  -y  命令生成

~~~js
{
"name": "students",    // 项目名称
"version": "1.0.0",        //项目版本
"main": "index.js",      // 入口文件
"scripts": {          // 支持的脚本，默认是一个空对象
  "test": "echo \"Error: no test specified\"
   },
"keywords": [],   //关键字，有助于在使用npm搜索时发现项目
"author": "",    // 作者
"license": "ISC",    // 授权方式
"dependencies": {               // 生产环境项目依赖类和包
  "art-template": "^4.13.2",
  "dateformat": "^3.0.3",
  "mongoose": "^5.7.11",
  "router": "^1.3.3",
  "serve-static": "^1.14.1"
    },
"devDependencies": {},   // 开发环境项目依赖类和包的版本
"description": ""    // 项目描述
}
~~~



## 四、异步函数

### 1. node执行顺序

+ ==同步 sync==： 代码一行一行执行，下一行的代码必须等待上一行代码执行完成以后才能执行
+ ==异步 async==： 代码在执行过程中某行代码需要耗时，代码的执行不会等待耗时操作完成以后再去执行下一行代码，而是不等待直接向后执行，异步代码的执行结果需要通过回调函数的方式处理
  + 1、定时器都是异步操作
  + 2、事件绑定都是异步操作
  + 3、AJAX中一般我们都采取异步操作（也可以同步）
  + 4、回调函数可以理解为异步（不是严谨的异步操作）
  + 剩下的都是同步处理

### 2.回调地狱

回调函数嵌套层数过多，造成代码不易维护，这种现象叫做回调地狱



### 3.promise

+ ==promise 本身是一个构造函数==，使用promise解决回调地狱，需要使用关键字new 实例对象，在创建对象的时候需要传入一个匿名函数，匿名函数中有两个参数resolve，reject
+ Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

```js
const promise = new Promise( (resolve,reject ) => {  
                                                     resolve（）  
                                                     reject（）   
                                                    } )
```

+ 链式调用方法
  + then(  )   第一个参数是成功回调，第二个参数是失败回调		
  + catch( )  异常捕获，后面可以继续执行then	
  + finally( )  不管怎么样，都会执行方法，即使抛出异常
+ 链式调用方法可以看做是在，调用promise对象，



### 4.异步函数

异步函数是异步编程语法的终极解决方案，可以让我们将异步代码写成同步的形式，让代码不再有回调函数嵌套，使代码变得清晰明了

#### 1）async

+ 普通函数定义前加async关键字 普通函数变成异步函数

+ 异步函数默认返回promise对象

+ 在异步函数内部使用return关键字进行结果返回 结果会被包裹的promise对象中 return关键字代替了resolve方法

+ 在异步函数内部使用throw关键字抛出程序异常

+ 调用异步函数再链式调用then方法获取异步函数执行结果

+ 调用异步函数再链式调用catch方法获取异步函数执行的错误信息

#### 2) await 关键字

+ await关键字只能出现在异步函数中

+ await promise await后面只能写promise对象 写其他类型的API是不不可以的

+ await关键字可是暂停异步函数向下执行直到promise返回结果

#### 3）promisify 改造函数
```js
// 改造现有异步函数api 让其返回promise对象 从而支持异步函数语法
const promisify = require('util').promisify;

// 调用promisify方法改造现有异步API 让其返回promise对象
const readFile = promisify(fs.readFile);


```
#### 4）错误捕获 try  catch

```js
try {  
    // 可能出现错误的代码块 
} 
catch (ex) { 
    // 出错时，执行代码块 
}
```

try  catch 可以捕获一步函数以及其他同步代码执行过程中发生的错误，但是不能捕获其他类型的API发生的错误



## 五、cookie 和 session

HTTP是一种无状态的协议，为了分辨链接是谁发起的，就需要我们自己去解决这个问题。不然有些情况下即使是同一个网站我们每打开一个页面也都要登录一下。而Session和Cookie就是为解决这个问题而提出来的两个机制。

#### 应用场景

日常登录一个网站，今天输入用户名密码登录了，第二天再打开很多情况下就直接打开了。这个时候用到的一个机制就是cookie。

session的一个场景是购物车，添加了商品之后客户端处可以知道添加了哪些商品，而服务器端如何判别呢，所以也需要存储一些信息，这里就用到了session。

#### Cookie

通俗讲，Cookie是访问某些网站以后在本地存储的一些网站相关的信息，下次再访问的时候减少一些步骤。另外一个更准确的[说法](http://www.lai18.com/content/407204.html)是：Cookies是服务器在本地机器上存储的小段文本并随每一个请求发送至同一个服务器，是一种在客户端保持状态的方案。

Cookie的主要内容包括：名字，值，过期时间，路径和域。使用Fiddler抓包就可以看见，比方说我们打开百度的某个网站可以看到Headers包括Cookie，

==name==：cookie的名字，一旦创建，名称不可更改。

==value==：cookie的值，如果值为Unicode字符，需要为字符编码。如果为二进制数据，则需要使用BASE64编码.

==maxAge==：cookie失效时间，单位秒。如果为正数，则该cookie在maxAge后失效。如果为负数，该cookie为临时cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该cookie。如果为0，表示删除该cookie。默认为-1

==path==：该cookie的使用路径。如果设置为"/sessionWeb/"，则只有ContextPath为“/sessionWeb/”的程序可以访问该cookie。如果设置为“/”，则本域名下ContextPath都可以访问该cookie。

==domain== :域.可以访问该Cookie的域名。第一个字符必须为".",如果设置为".google.com",则所有以"google.com结尾的域名都可以访问该cookie",如果不设置,则为所有域名

==secure==：该cookie是否仅被使用安全协议传输。

如下：

````js
BIDUPSID: 9D2194F1CB8D1E56272947F6B0E5D47E
PSTM: 1472480791
BAIDUID: 3C64D3C3F1753134D13C33AFD2B38367:FG
ispeed_lsm: 2
MCITY: -131:
pgv_pvi: 3797581824
pgv_si: s9468756992
BDUSS: JhNXVoQmhPYTVENEdIUnQ5S05xcHZMMVY5QzFRNVh5SzZoV0xMVDR6RzV-bEJZSVFBQUFBJCQAAAAAAAAAAAEAAACteXsbYnRfY2hpbGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALlxKVi5cSlYZj
BD_HOME: 1
H_PS_PSSID: 1423_21080_17001_21454_21408_21530_21377_21525_21193_21340
BD_UPN: 123253
sug: 3
sugstore: 0
ORIGIN: 0
bdime: 0
````

#### Session

Session是存在服务器的一种用来存放用户数据的类HashTable结构。

Session机制是一种服务端的机制，服务器使用一种类似散列表的结构来保存信息。当程序需要为某个客户端的请求创建一个session的时候，服务器首先检查这个客户端里的请求里是否已包含了一个session标识--sessionID，如果已经包含一个sessionID，则说明以前已经为此客户端创建过session，服务器就按照sessionID把这个session检索出来使用（检索不到，可能会新建一个），如果客户端请求不包含sessionID，则为此客户端创建一个session并且声称一个与此session相关联的sessionID，sessionID的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串(服务器会自动创建),这个sessionID将被在本次响应中返回给客户端保存。

当浏览器 第一次发送请求时，服务器自动生成了一个HashTable和一个Session ID用来唯一标识这个HashTable，并将其通过响应发送到浏览器。当浏览器第二次发送请求，会将前一次服务器响应中的Session ID放在请求中一并发送到服务器上，服务器从请求中提取出Session ID，并和保存的所有Session ID进行对比，找到这个用户对应的HashTable。

#### Cookie 和 Session 的区别

1. **cookie数据存放在客户的浏览器上，session数据放在服务器上.**
2. **Session比Cookie更具有安全性**
3. **Session占用服务器性能，Session过多，增加服务器压力**
4. **单个Cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个Cookie**



> # **Cookie**
>
> cookie 是一个非常具体的东西，指的就是浏览器里面能永久存储的一种数据，仅仅是浏览器实现的一种数据存储功能。
>
> **cookie由服务器生成，发送给浏览器，浏览器把cookie以 K-V 形式保存到某个目录下的文本文件内**，下一次请求同一网站时会把该cookie发送给服务器。由于cookie是存在客户端上的，所以浏览器加入了一些限制确保cookie不会被恶意使用，同时不会占据太多磁盘空间，所以每个域的cookie数量是有限的。
>
> # **Session**
>
> session 从字面上讲，就是会话。这个就类似于你和一个人交谈，你怎么知道当前和你交谈的是张三而不是李四呢？对方肯定有某种特征（长相等）表明他就是张三。
>
> session 也是类似的道理，服务器要知道当前发请求给自己的是谁。为了做这种区分，服务器就要给每个客户端分配不同的“身份标识”，然后客户端每次向服务器发请求的时候，都带上这个“身份标识”，服务器就知道这个请求来自于谁了。至于客户端怎么保存这个“身份标识”，可以有很多种方式，对于浏览器客户端，大家都默认采用 cookie 的方式。
>
> 服务器使用session把用户的信息临时保存在了服务器上，用户离开网站后session会被销毁。这种用户信息存储方式相对cookie来说更安全，可是session有一个缺陷：如果web服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候session会丢失。
>
> > # **cookie和session的区别**
> >
> > session是存储服务器端，cookie是存储在客户端，所以session的安全性比cookie高。
> >
> > 获取session里的信息是通过存放在会话cookie里的session id获取的。而session是存放在服务器的内存中里，所以session里的数据不断增加会造成服务器的负担，所以会把很重要的信息存储在session中，而把一些次要东西存储在客户端的cookie里。
> >
> > **cookie确切的说分为两大类**：会话cookie和持久化cookie。
> >
> > **会话cookie**是存放在客户端浏览器的内存中，他的生命周期和浏览器是一致的，当浏览器关闭会话cookie也就消失了
> >
> > **持久化cookie**是存放在客户端硬盘中，持久化cookie的生命周期是我们在设置cookie时候设置的那个保存时间，session的信息是通过sessionid获取的，而sessionid是存放在会话cookie当中的，当浏览器关闭的时候会话cookie消失，所以sessionid也就消失了，但是session的信息还存在服务器端，只是查不到所谓的session但它并不是不存在。所以session在服务器关闭的时候，或者是sessio过期，又或者调用了invalidate()，再或者是session中的某一条数据消失调用session.removeAttribute()方法，session在通过调用session.getsession来创建的。

