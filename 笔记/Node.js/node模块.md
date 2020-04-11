#	node模块

 ## 1. http系统模块

​	==创建http服务器==

```js
// 导入模块
const http = require('http')

// 创建http服务器
const server = http.createServer()

// 绑定端口
server.listen(3000,callback)

// 事件请求
server.on('request', (request,response) => {
	// request, 请求对象
    	// 1) request.url 获取请求地址url
    	// 2) request.headers 获取请求报文
    	// 3) request.method 获取请求方式
    
    // response, 响应对象
    	// response.writeHeader(状态码，响应头对象) 设置响应头
    		1) 状态码：200请求成功，301重定向，400客户端错误，404请求资源没找到，500服务器顿错误
    		2) 响应头：内容类型content-type，响应内容长度content-length
})
```



## 2. url系统模块

​	==将 url的字符串解析成对象形式==

```js
// 导入模块
const url = require('url')

// 解析request.url 的各个参数
url.parse(urlString，Boolean，Boolean)
	// urlstring url字符串
	// 第二个参数（可省） 默认false， true 时，将query解析成对象
```



## 3. path系统模块

​	==路径处理==

```js
// 导入模块
const path = require('path')

// 使用path.join根据当前计算机操作系统拼接路径
path.join(__dirname,'index.html')
```



## 4. fs系统模块

​		==文件操作模块==

```js
// 导入模块
const fs = require('fs')

// 读文件 
fs.readFile(path [, options],callback)
	// path  文件路径
	// options 要读取文件的编码格式  utf-8
// 写文件 
fs.writeFile(path [,options],callback)
```



## 5. querystring 系统模块

​		==解析请求参数，将字符串转换为对象==

```js
// 模块导入
const querystring = require('querystring')

// parse 方式，将请求参数装换为对象
let query = querystring.parse(str,separator,eq,options)
	// str  要解析的字符串
	// separator 要将str字符串分隔的字符或字符串 ‘&’
	// eq 要分隔的键值对的字符或字符串   ‘=’
	// options 该参数是一个对象，可省，里面可设置maxKeys和decodeURIComponent这两个属性
```



## 6. art-template 模板引擎模块

​	==模板引擎==

```js
// 模块导入
const template = require('art-template')

//设置模板引擎目录
template.defaults.root = '路径'

// 拼接模块字符串和数据
let html = template('文件路径'，'拼接数据，数据格式只能是对象')

// 向模板内添加方法
template.defaluts.imports.方法 = 方法
```



## 7. mongoose 模块

​	==操作MongoDB数据库==

```js
// 导入模块
const mongoose = require('mongoose')

// 设置数据库集合规则
const userSchema = mongoose.Schema({
    user: String,
    age: Number
})

// 创建数据库集合构造函数
const User = mongoose.medol('User',userSchema)

// 链接数据库 
mongoose.connect('mongodb://localhost:27017/database')
	.then((data) => console.log('数据库链接成功'))
	.catch((err) => console.log('数据库链接失败'))
```



## 8. dateformat模块

​	==处理事件格式==

```js
// 导入模块
const dateformat = require('dateformat')

// 处理时间格式
dateformat(需要处理的时间，格式)
	// 格式： 
		yyyy-mm-dd： 年-月-日
		hh:MM:ss  时：分：秒
        yyyy-mm-dd hh：MM：ss  年-月-日 时：分：秒
```



## 9. router模块

​	==路由处理模块==

```js	
// 导入模块
const getRouter = require('router') 

// 创建路由对象
const router = getRouter()

// 调用路由对象的方法创建路由
router.get('请求路径'，(req,res)=>{res.end()})
router.post('请求路径'，(req,res)=>{res.end()})

// 启用路由，使路由生效，在服务器请求回调函数中使用
server.on('request',(req,res) => {
    router(req,res)
})
```



## 10. Gulp 项目构建工具

​	==Gulp 基于node平台开发的前端构建工具==



## 11. body-parser模块

​	==获取请求方式为post时，传递的参数==

```js
// 引入模块
const bodyParser = require('body-parser')

// 拦截所有请求，并处理请求参数，数据格式为 appliction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
	// extended:false  使用querystring模块处理请求参数的格式
	// extended:true	使用第三方模块qs处理请求参数的格式

// 解析数据格式为 application/json
app.use(bodyParser.json({extended:false}))

// 获取post请求参数
req.body
```

==body-parser 核心原理代码==

```js
var bodyParser = {
	urlencoded: function(obj){
        
		return function(req,res,next){
			let str = '';
			let obj = {}
            
			req.on('data',(data)=>{
				str += data;
			})
            
			req.on('end',() => {
				if(obj.extended == false){
					let querystring = require('querystring')
					result = querystring.parse(str,'&','=')
				}else if(obj.extended == true){
					// let qs = require('qs')
					// result = qs('使用qs模块将参数进行处理')
				}
				req.body = result;
				next();
			}
		}
	
	}
 }
 
 app.use(bodyParser.urlencoded({extended:false})
```



## 12.  Joi模块

​	==验证信息==

~~~JavaScript
// 导入模块
const Joi = require('JOi')

// 创建验证规则
const schema = {
	name: Joi.string().min(1).max(10).required().error(new Error('抛出错误'))
    email: Joi.email()
    age: Joi.number()
	password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required()
}

// 使用验证规则验证 , 放回布尔值，true false
let isTrue = Joi.validate(obj,schema)
~~~



## 13. mongoose-sex-page模块

​	==MongoDB数据库查询分页==

~~~js
// 导入模块
const pagination = require('mongoose-sex-page')

// 查询数据库
pagination(数据库集合).page(1).size(10).display(3).exec()
	page : 当前页
    size : 每页显示数据条数
    display ： 显示几个页码
    exec ： 向数据库发送查询请求
  
// 查询返回结果是一个对象
    {
        page： 当前页
        size： 每页显示的数据条数
        total： 总共的数据条数
        records： { 查询出来的具体数据 }
        pages： 总共的页数
        display： [ 1,2,3]   显示的页码    
    }
~~~



## 14. bcryptjs 模块

​	==哈希加密模块==

~~~js
// 导入模块
const bcrypt = require('bcryptjs')

// 生成随机字符串（生成盐） generate生成
let salt = await bcrypt.genSalt(10) // 参数越大，加密越复杂

// 使用生成的（盐）随机字符串对密码进行加密
let pass = await bcrypt.hash('明文密码'， salt)

// 密码对比，返回布尔值
let isEqual = await bcrypt.compare('明文密码'，'加密的密码')
~~~



## 15. express 框架

​	==Express 框架是由 **路由** 和 **中间件** 构成一个web开发框架==

特点：

  + 实现了路由功能
  + 中间件功能
  + 扩展了req和res对象
  + 可以集成其他模板引擎

使用：

+ req.query     GET 方式获取参数
+ req.body     POST 方式获取参数   （需导入body-parser模块，并设置请求参数解析）
+ res.redirect ()  重定向

		#### 1）. 创建服务器

~~~js
// 导入模块
const express = require('express')

// 生成express实例
const app = express()

// 监听端口
app.listen(3000)
~~~



#### 2）. 中间件

```js
// 1.应用中间件  app.use 和 app.METHOD (get , post 等方法)
// get请求
app.get('/index?name=lisi', (req,res) => {})
// post请求
app.post('/index', (req,res) => {})
// use 
app.use('/', (req,res) => {})


// 2.路由级别中间件
// 同应用级别的中间件用法相同，不同之处的是它是绑定在router实例（express.Router()）上的
let router = express.Router()
router.use('/login',(req,res) =>{})


// 3.错误处理中间件
app.use((err,req,res,next) => {
    if(err){
        console.log(err)  // 错误信息
    }else{
        next()
})


// 4.内置中间件
// 静态资源管理 
express.static('静态资源路径')
// 
express.json()
// 
express.urlencoded()
 
    
// 5. 第三方中间件
//  express-session
    // 导入模块
    const session = require('express-session')
    // 拦截请求，生成sessionId，保存在服务器端
    app.use(session({secret:'secret key'}))
    
//  express-art-template
```



#### 3）. 模板引擎

```js
// 安装模板引擎
npm install art-template express-art-template

//导入模板引擎
const template = require('art-template')

// 设置渲染模板使用的模板引擎
app.engine('art', require('express-art-template'))

// 设置模板存放目录
app.set('views','模板存放路径')

// 设置默认拼接后缀
app.set('view engine','art')

// 渲染模板
res.render('模板文件'，'模板拼接数据(对象格式)')

```



## 16. config 模块

​		==允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中，模块内部会自动判断当前应用的运行环境，并读取对应的配置信息==

使用：

1. 在项目根目录下新建  ==config== 文件夹
2. 在config文件夹下面新建 ==default.js== 、==development.js==、==production.js== 、文件
3. 在项目中通过 require 方法，将模块导入  require( ' config ' )
4. 使用模块内部提供的get方法获取配置信息

==可以将敏感信息保存到环境变量中，通过get方法导入==



## 17. fromidable 模块

​		==解析表单，支持get，post请求参数，文件上传==

~~~js
// 导入模块
const formidable = require('formidable')

// 创建表单解析对象
const form = new formidable.IncomingForm()

// 设置文件上传路径
form.uploadDir = '/my/dir'

// 是否保留表单上传文件的扩展名
form.keepExtensions = false 

// 解析请求参数
form.parse(req, (err,fields,files) => {
    // req  请求对象
    // err  表单解析失败错误对象
    // fields  存储普通请求参数
    // files  存储上传的文件信息
})
~~~



## 18. serve-static 模块

​		==静态资源访问==

~~~js
// 导入模块
const serveStatic = require('serve-static')

// 设置静态资源目录 ,目录路径（绝对路径）
const serve = serveStatic('public')

// 调用方法
server.on('request',(req,res) => {
    // 第三个参数是回调函数，
    serve(req,res,()=>{})
})
~~~



## 19.request模块

==可以实现服务器向另一个服务器发送请求==

~~~js
// 导入模块
const request = require('request')

// 请求另一个服务器
request('http://localhost:3001',(err,response,body) => {
    err // 请求错误信息
    response // 响应头信息
    body  // 响应数据
})
~~~



## 20. express-session模块

==实现session技术==

~~~js
// 导入模块
const session = require('express-session')

// 设置中间件
app.use(session({
    secriet: 'key',              //加密字符串,对响应给浏览器的cookie进行加密
    resave: false,		        // 强制保存session即使它没有变化  
    saveUninitialized： flse    //强制将未初始化的session存储。当新建了一个session且未
    							 //设定属性或值时，它就处于未初始化状态。
}))

// 在session中添加信息
app.get('/get',(req,res)=>{
    req.session.userName = 'zhangsan'
    res.send('ok')
})

// 读取session信息
app.get('/get',(req,res)=> {
    var userName = req.session.userName
    res.send('ok')
})

// 清除session
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
		//删除cookie
        res.clearCookie('connect.sid')
    })
})
~~~

