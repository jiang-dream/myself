---
typora-root-url: images

---

# react

React是一个用于构建用户界面的javaScript库，起源于facebook的内部项目，后续在13年开源了出来

### 一、基本使用

#### React安装

````shell
npm install react react-dom

# react 包是核心提供创建元素，组件等功能
# react-dom 包提供DOM相关功能
````

#### React使用

+ 引入react和react-dom

  ````html
  <script src="./node_modules/react/umd/react.development.js"></script>
  <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
  ````

+ 创建React 元素

  ````js
  // 创建元素节点
  // 1. 元素名称
  // 2. 元素属性 传递的是个对象
  // 3. 元素内容
  let title = React.createElement('li', null, 'hellow react');
  ````

+ 渲染到页面

  ````js
  // 渲染到页面
  ReactDOM.render(title, root)
  ````

  

### 二、脚手架

####  React脚手架意义

- 脚手架是开发现代Web应用的必备
- 充分利用 Webpack，Babel，ESLint等工具辅助项目开发
- 零配置，无需手动配置繁琐的工具即可使用
- 关注业务，而不是工具配置

#### 使用React脚手架初始化项目

- 初始化项目，命令： ``npx create-react-app my-pro``
  - npx 目的：提升包内提供的命令行工具的使用体验
  - 原来：先安装脚手架包，再使用这个包中提供的命令
  - 现在：无需安装脚手架包，就可以直接使用这个包提供的命令
  - create-react-app  这个是脚手架名称 不能随意更改
  - my-pro  自己定义的项目名称
- 启动项目，在项目根目录执行命令： npm start

==yarn命令简介==

- yarn 是Facebook发布的包管理器，可以看做是npm的替代品，功能与npm相同
- yarn具有快速，可靠和安全的特点
- 初始化新项目：yarn init
- 安装包： yarn add 包名称
- 安装项目依赖： yarn

#### 脚手架中使用React

````react
// 导入react  react-dom 包
import React from 'react'
import ReactDOM from 'react-dom'

// 创建元素
let h1 = React.createElement('h1',null,'我是标题')

// 渲染页面
ReactDOM.render(h1,document.getElementById('root'))

````

### 三、JSX

#### 概述

由于通过createElement()方法创建的React元素有一些问题，代码比较繁琐，结构不直观，无法一眼看出描述的结构，不优雅，用户体验不爽

JSX是JavaScript XML 的简写，表示在JavaScript代码中写HTML格式的代码

优势：声明式语法更加直观，与HTML结构相同，降低了学习成本，提升开发效率

#### 使用

````react
// 创建react元素
let h1 = <h1>我是通过jsx创建的元素</h1>
    
// 渲染元素
ReactDOM.render(h1,document.getElementById('root'))
````

==为什么在脚手架中可以使用JSX语法==

+ JSX 不是标准的ECMAScript语法，它是ECMAScript的语法拓展
+ 需要使用babel编译处理后，才能在浏览器环境中使用
+ create-react-app脚手架中已经默认有该配置，无需手动配置
+ 编译JSX语法的包： @bable/preset-react

==注意点==

- React元素的属性名使用驼峰命名法
- 特殊属性名：class -> className，for -> htmlFor，tabindex -> tabIndex
- 如果没有子节点的React元素可以用 `/>` 来结束
- 推荐：使用 小括号包裹JSX，从而避免JS中自动插入分号报错

#### 语法

JSX是来描述页面的结构，我们一般在编写业务逻辑渲染页面的时候，需要涉及到传递值，调用函数，判断条件，循环等，这一些在JSX中都能得到支持

###### 嵌入表达式

````react
// 语法 ：  {JavaScript表达式}
let content = '内容'
let h1 = <h1>我是jsx创建的元素 + {content}</h1>
````

==注意==

- 只要是合法的js表达式都可以进行嵌入
- JSX自身也是js表达式
- 注意：js中的对象是一个例外，一般只会出现在style属性中
- 注意：在{}中不能出现语句

###### 条件渲染

````react
let isLoading = true
let loading = () => {
    if(isLoading){
        return <div>Loading...</div>
    }
    return <div>加载完成</div>
}
````

可以发现，写JSX的条件渲染与我们之前编写代码的逻辑是差不多的，根据不同的判断逻辑，返回不同的 JSX结构，然后渲染到页面中

###### 列表渲染

- 如果需要渲染一组数据，我们应该使用数组的 map () 方法
- 注意：渲染列表的时候需要添加key属性，key属性的值要保证唯一
- 原则：map()遍历谁，就给谁添加key属性
- 注意：尽量避免使用索引号作为key

````react
let arr = [{
    id:1,
    name: '张三'
},{
    id:2,
    name: '李四'
}]

let ul = (<ul>
    	{arr.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>)

ReactDOM.render(ul,document.getElementById('root'))
````

###### 样式处理

+ 行内样式 -style

  ````react
  <li key={item.id} style={{'color': 'red'}}>{item.name}</li>
  ````

+ 类名 - className

  创建CSS文件，编写样式

  ````styus
  .container {
      text-align: center
  }
  ````

  在js中进行引入，设置类名

  ````react
  import './css/index.css'
  
  let content = <div className="container">内容</div>
  ````

###### 小结

- JSX是React的核心内容
- JSX表示在JS代码中写HTML结构，是React声明式的体现
- 使用JSX配合嵌入的JS表达式、条件渲染、列表渲染、可以描述任意UI结构
- 推荐使用className的方式给JSX添加样式
- React完全利用JS语言自身的能力来编写UI，而不是造轮子增强HTML功能

### 三、组件

#### 介绍

- 组件是React的一等公民，使用React就是在用组件
- 组件表示页面中的部分功能
- 组合多个组件实现完整的页面功能
- 特点：可复用、独立、可组合

#### 组件创建

###### 函数组件

- 函数组件：使用JS的函数创建组件

- **约定1：**函数名称必须以大写字母开头

- **约定2：**函数组件必须有返回值，表示该组件的结构

- 如果返回值为null，表示不渲染任何内容

  ````react
  // 创建函数组件
  function Hello() {
      return {
          <div>这是一个函数组件</div>
      }
  }
  // 渲染页面
  ReactDOM.render(<Hello />,document.getElementById('root'))
  ````

###### 类组件

- 使用ES6语法的class创建的组件

- 约定1：类名称也必须要大写字母开头

- 约定2：类组件应该继承React.Component父类，从而可以使用父类中提供的方法或者属性

- 约定3：类组件必须提供 render 方法

- 约定4：render方法中必须要有return返回值

  ````react
  class Hello extends React.compenont {
      render() {
          return (
          <div>这是类组件</div>
          )
      }
  }
  
  ReactDOM.render(<Hello />,document.getElementById('root'))
  ````

#### 事件处理

###### 事件绑定

- React事件绑定语法与DOM事件语法相似

- 语法：on+事件名称=事件处理函数，比如  onClick = function(){}

- 注意：React事件采用驼峰命名法

  ````react
  export default class extends React.component {
      clickHandle(e) {
          console.log('点击')
      }
      
      render() {
          return {
              <div><button onClick={this.clickHandle}>按钮</button></div>
          }
      }
  }
  ````

  ==注意==

  - 在React中绑定事件与原生很类似
  - 需要注意点在于，在React绑定事件需要遵循驼峰命名法
  - 类组件与函数组件绑定事件是差不多的，只是在类组件中绑定事件函数的时候需要用到this，代表指向当前的类的引用，在函数中不需要调用this

###### 事件对象

- 可以通过事件处理函数的参数获取到事件对象
- React中的事件对象叫做：合成事件
- 合成事件：兼容所有浏览器，无需担心跨浏览器兼容问题
- 除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()`和 `preventDefault()`
- 如果你想获取到原生事件对象，可以通过 `nativeEvent` 属性来进行获取

````react
export default class extends React.Component {
    clickHandle(e){
        // 获取原生事件对象
        console.log(e.nativeEvent)
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
````

###### 事件

- Clipboard Events  剪切板事件

  - 事件名 ：onCopy onCut onPaste
  - 属性     ：DOMDataTransfer clipboardData

- compositionEvent  复合事件

  - 事件名： onCompositionEnd onCompositionStart onCompositionUpdate
  - 属性： string data

- Keyboard Events  键盘事件

  - 事件名：onKeyDown onKeyPress onKeyUp
  - 属性： 例如 number keyCode  太多就不一一列举

- Focus Events  焦点事件  （这些焦点事件在 React DOM 上的所有元素都有效，不只是表单元素）

  - 事件名： onFocus onBlur
  - 属性： DOMEventTarget relatedTarget

- Form Events  表单事件

  - 事件名： onChange onInput onInvalid onSubmit

- Mouse Events  鼠标事件

  - 事件名：

    ```react
    onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
    onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
    onMouseMove onMouseOut onMouseOver onMouseUp
    ```

- Pointer Events  指针事件

  - 事件名：

    ```react
    onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
    onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
    ```

- Selection Events  选择事件

  - 事件名：onSelect

- Touch Events  触摸事件

  - 事件名：onTouchCancel onTouchEnd onTouchMove onTouchStart

- UI Events  UI 事件

  - 事件名： onScroll

- Wheel Events  滚轮事件

  - 事件名：onWheel

  - 属性： 

    ```react
    number deltaMode
    number deltaX
    number deltaY
    number deltaZ
    ```

- Media Events  媒体事件

  - 事件名：

    ```react
    onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
    onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
    onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
    onTimeUpdate onVolumeChange onWaiting
    ```

- Image Events 图像事件

  - 事件名：onLoad onError

- Animation Events 动画事件

  - 事件名：onAnimationStart onAnimationEnd onAnimationIteration

- Transition Events 过渡事件

  - 事件名：onTransitionEnd

- Other Events  其他事件

  - 事件名： onToggle

#### 状态组件

- 函数组件又叫做 ==无状态组件==，类组件又叫做 ==有状态组件==
- 状态(state) 即数据
- 函数组件没有自己的状态，只负责数据展示
- 类组件有自己的状态，负责更新UI，让页面动起来

#### State和SetState

###### state使用

- 状态(state)即数据，是组件内部的私有数据，只能在组件内部使用

- state的值是对象，表示一个组件中可以有多个数据

- 通过this.state来获取状态

  ````react
  export default class extends React.Component {
      constructor(){
          super()
  
          // 第一种初始化方式
          this.state = {
              count : 0
          }
      }
      // 第二种初始化方式
      state = {
          count:1
      }
      render(){
          return (
              <div>计数器 :{this.state.count}</div>
          )
      }
  }
  ````

###### setState修改状态

+ 状态是可变的
+ 语法：this.setState({要修改的数据})
+ **注意：不要直接修改state中的值，这是错误的**
+ setState() 作用：1.修改 state 2.更新UI
+ 思想：数据驱动视图

````react
export default class extends React.Component {
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
                <button onClick={() => {
                     this.setState({
            	 		count: this.state.count+1
           			  })   
                }}>+1</button>
            </div>
        )
    }
}
````

###### 小结

- 修改state里面的值我们需要通过 this.setState() 来进行修改
- React底层会有监听，一旦我们调用了setState导致了数据的变化，就会重新调用一次render方法，重新渲染当前组件

#### 事件绑定this指向

###### 箭头函数

````react
class Hello extends React.compenont {
    state: {
        count: 1
    }
    clickHanle() {
        this.setState({
            count : this.state.count + 1
        })
    }
	render() {
        return (
        	<div>
            	<div>{this.state.count}</div>
                <button click={()=>{this.clickHandle()}}>+1</button>
            </div>
        )
    }
}
````

###### bind方法

````react
class Hello extends React.compenont {
    constructor() {
        super()
        ....
        this.clickHandle = this.clickHandle.bind(this)
    }
    clickHandle() {}
    render() {}
}
````

###### class实例方法

````react
 clickHandle = () => {
     this.setState({
         count: this.state.count + 1
     })
 }
````



### 四、组件传值

#### 组件通信

组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据。为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通，这个过程就是组件通讯

#### 组件的props

- 组件时封闭的，要接受外部数据应该通过props来实现
- props的作用：接收传递给组件的数据
- 传递数据：给组件标签添加属性

+ 接收数据：函数组件通过 参数 props接收数据，类组件通过 this.props接收数据

  + 函数组件获取

    ````react
    function Hello(props){
        return (
        <div>接受的数据：{props}</div>
        )
    }
    ````

  + 类组件获取

    ````react
    class Hello extends React.component {
        render() {
            return (
            	<div>接收到的数据：{this.props}</div>
            )
        }
    }
    ````

  ==特点==

  - 可以给组件传递任意类型的数据
  - props是只读属性，不能对值进行修改
  - 注意：使用类组件时，如果写了构造函数，应该将props传递给super(),否则，无法在构造函数中获取到props，其他的地方是可以拿到的

  ````react
  class Hello extends React.Component {
      constructor(props){
          super(props)
      }
      render() {
          return (
          	<div>接受的数据：{this.props}</div>
          )
      }
  }  
  ````

#### 父传子

- 父组件提供要传递的state数据

- 给子组件标签添加属性，值为state中的数据

- 子组件中通过props接收父组件中传递的数据

  ````react
  class Parent extends React.Component {
      state = {
          name: '张三'
      }
  	render() {
          return (
          	<div>给子组件传值：<Child name={this.state.name} /></div>
          )
      }
  }
  
  function Child(props) {
      return <div>子组件接受数据：{props.name}</div>
  }
  ````

#### 子传父

- 利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数

- 父组件提供一个回调函数，用来接收数据

- 将该函数作为属性的值，传递给子组件

  ````react
  class Parent extends React.Component {
      getChildMsg = (msg) => {
          console.log('接受父组件数据',msg)
      }
      render() {
          return <div><Child fn={this.getChildMsg} /></div>
      }
  }
  
  class Child extends React.Component {
      toParent = () => {
          this.props.fn('哈哈')
      }
      render() {
          return <div><button click={this.ToParent}>给父组件传值</button></div>
      }
  }
  ````

#### 兄弟传值

- 将共享状态(数据)提升到最近的公共父组件中，由公共父组件管理这个状态，这个称为状态提升
- 公共父组件职责：1. 提供共享状态 2.提供操作共享状态的方法
- 要通讯的子组件只需要通过props接收状态或操作状态的方法

````react
// 公共父组件
class Counter extends React.Component {
    state = {
        count: 1
    }
	
	addCount = (num) => {
    	this.setState({
            count: this.state.count + num
        })    
    }
    
    render() {
        return (<div>
            	<child num={this.state.count}/>
                <child fn={this.addCount}/>
            </div>)
    }
}
// 子组件1
class Child1 extends React.component {
    render() {
        return (
        <div>计数器：{this.props.num}</div>
        )
    }
}
// 子组件2
class child2 extends React.Component {
    addHandle = () => {
        this.props.fn(2)
    }
    render() {
        return (
        	<button click={this.addHandle}>+1</button>
        )
    }
}
````

#### Context

如果出现层级比较多的情况下（例如：爷爷传递数据给孙子），我们会使用Context来进行传递

作用： 跨组件传递数据

````react
// 调用React.createContext()创建Provider(提供数据)和Consumer(消费数据)两个组件
const { Provider, Consumer } = React.createContext()

// 使用provider组件作为父组件
class Parent extends React.Component {
    render() {
       return (
        <Provider>
        	<div value="pink"> //设置value属性，表示要传递的数据
            	<child />
            </div>    
        </Provider>
       )
    }
}

// 哪一层想要接收数据，就用Consumer进行包裹，在里面回调函数中的参数就是传递过来的值
class Child extends React.Component {
    render() {
        return (
         <Consmer>
         	{data => <span>data参数表示要接受的数据 {data}</span>}   
         </Consmer>
        )
    }
}
````

- 如果两个组件相隔层级比较多，可以使用Context实现组件通讯
- Context提供了两个组件：Provider 和 Consumer
- Provider组件： 用来提供数据
- Consumer组件： 用来消费数据

#### children 属性

- children属性： 表示组件标签的子节点，当组件标签有子节点时，props就会有该属性
- children属性与普通的props一样，值可以使任意值（文本、react元素、组件、甚至是函数）

````react
function Hello(props) {
    return (
    	<div>组件的子节点：{props.chilren}</div>
    )
}

<Hello>我是子节点</Hello>
````

#### props效验

- 对于组件来说，props是外来的，无法保证组件使用者传入什么格式的数据，简单来说就是组件调用者可能不知道组件封装着需要什么样的数据
- 如果传入的数据不对，可能会导致报错
- 关键问题：组件的使用者不知道需要传递什么样的数据
- props校验：允许在创建组件的时候，指定props的类型、格式等

+ 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性

###### 使用

- 安装包  `prop-types (yarn add prop-types | npm i props-types)`
- 导入prop-types 包
- 使用`组件名.propTypes={}` 来给组件的props添加校验规则
- 校验规则通过PropTypes对象来指定

````react
import PropTypes from 'prop-types'

function App(props) {
    return <h1>哈哈，{props.colors}</h1>
}

App.propTypes = {
    // 约定colors属性为array类型
    // 如果类型不对，则报出明确错误，便于分析错误
    colors: PropTypes.array
}
````

###### 约束规则

- 创建的类型： `array、bool、func、number、object、string`
- React元素类型：`element`
- 必填项：`isRequired`
- 特定结构的对象： `shape({})`
- 更多的[约束规则](<https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes>)

````react
// 常见类型
optionalFunc: PropTypes.func,
// 必选
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithSShape: PropTypes.shap({
    color: PropTypes.string,
    fontSize: PropTypes.number
})
````

#### props默认值

场景：分页组件 --> 每页显示条数

````react
function App(props) {
    return (
    	<div>此处展示props的默认值：{props.pageSize}</div>
    )
}
// 设置默认值
App.defaultProps = {
    pageSize: 10
}
// 不传入pageSize属性
<App />
````

### 五、组件生命周期

#### 概述

意义：组件的生命周期有助于理解组件的运行方式，完成更复杂的组件功能、分析组件错误原因等

组件的生命周期： 组件从被创建到挂载到页面中运行，再到组件不在时卸载的过程

生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数

构造函数的作用：为开发人员在不同阶段操作组件提供了实际

#### 生命周期阶段

<img src="/生命周期.png" alt="生命周期" style="zoom:80%;" />

###### 创建时

- 执行时机：组件创建时（页面加载时）
- 执行顺序

<img src="/创建时-函数执行顺序.png" alt="创建时-函数执行顺序" style="zoom: 67%;" />

<img src="/创建时-函数的作用.png" alt="创建时-函数的作用" style="zoom:80%;" />

###### 更新时

执行时机：`setState()、 forceUpdate()、 组件接收到新的props`

说明：以上三者任意一种变化，组件就会重新渲染

执行顺序：

<img src="/更新时.png" alt="更新时" style="zoom: 80%;" />

<img src="/更新时-函数作用.png" alt="更新时-函数作用" style="zoom:80%;" />

###### 卸载时

执行时机：组件从页面中消失

作用：用来做清理操作

<img src="/卸载时.png" alt="卸载时" style="zoom:80%;" />

#### 钩子函数

###### 旧版钩子函数

<img src="/旧版生命周期函数.png" alt="旧版生命周期函数" style="zoom:80%;" />

###### 新版钩子函数

<img src="/新版生命周期函数.png" alt="新版生命周期函数" style="zoom:80%;" />

##### `getDerivedStateFromProps()`

- **`getDerivedStateFromProps`** 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- 不管原因是什么，都会在**每次**渲染前触发此方法

##### `shouldComponentUpdate()`

- 根据 **`shouldComponentUpdate()`** 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
- 当 props 或 state 发生变化时，**`shouldComponentUpdate()`** 会在渲染执行之前被调用。返回值默认为 true

##### `getSnapshotBeforeUpdate()`

- **`getSnapshotBeforeUpdate()`** 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 **`componentDidUpdate()`**
- 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等



### 六、render-props

#### 概述

- 思考：如果两个组件中的部分功能相似或相同，该如何处理？
- 处理方式：复用相似的功能
- 复用什么？
  - state
  - 操作state的方法
- 两种方式：
  - render props模式
  - 高阶组件（HOC）
- 注意： 这两种方式不是新的API，而是利用React自身特点的编码技巧，演化而成的固定模式

#### 使用

- 创建Mouse组件，在组件中提供复用的逻辑代码
- 将要复用的状态作为 props.render(state)方法的参数，暴露到组件外部
- 使用props.render() 的返回值作为要渲染的内容

````react
class Mouse extends React.Component {
    // 鼠标位置状态
    state = {
        x: 0,
        y: 0
    }

    // 监听鼠标移动事件
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMouseMove)
    }
    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    render(){
        // 向外界提供当前子组件里面的数据
        return this.props.render(this.state)
    }
}
class App extends React.Component {
    render() {
        return (
            <div>
                App
                <Mouse render={mouse => {
                    return <p>X{mouse.x}Y{mouse.y}</p>
                }}/>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
````

#### children代替render

- 注意：并不是该模式叫 render props就必须使用名为render的prop，实际上可以使用任意名称的prop
- 把prop是一个函数并且告诉组件要渲染什么内容的技术叫做： render props模式
- 推荐：使用childre代替render属性

````react
<Mouse>
	{({x,y}) => <p>鼠标的位置{x},{y}</p>}
</Mouse>

// 组件内部
this.props.children(this.state)
````

### 七、高阶组件

+ 高阶组件(HOC、Higher-Order Component) 是一个函数，接收要包装的组件，返回增强后的组件
+ 高阶组件内部创建了一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态传递给被包装组件

#### 使用步骤

- 创建一个函数，名称约定以with开头
- 指定函数参数，参数应该以大写字母开头
- 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
- 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
- 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面

````react
// 定义一个函数，在函数内部创建一个相应类组件
function withMouse(WrappedComponent) {
    // 该组件提供复用状态逻辑
    class Mouse extends React.Component {
        state = {
            x: 0,
            y: 0
        }
        // 事件的处理函数
        handleMouseMove = (e) => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
        // 当组件挂载的时候进行事件绑定
        componentDidMount() {
            window.addEventListener('mousemove', this.handleMouseMove)
        }
        // 当组件移除时候解绑事件
        componentWillUnmount() {
            window.removeEventListener('mousemove', this.handleMouseMove)
        }
        render() {
            // 在render函数里面返回传递过来的组件，把当前组件的状态设置进去
            return <WrappedComponent {...this.state} />
        }
    }
    return Mouse
}
````

**哪个组件需要加强，通过调用`withMouse`这个函数，然后把返回的值设置到父组件中即可**

````react
function Position(props) {
    return (
        <p>
            X:{props.x}
            Y:{props.y}
        </p>
    )
}
// 把position 组件来进行包装
let MousePosition = withMouse(Position)

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (   
            <div>
                高阶组件
                <MousePosition></MousePosition>
            </div>
        )
    }
}
````

#### 设置display

- 使用高阶组件存在的问题：得到两个组件的名称相同
- 原因：默认情况下，React使用组件名称作为`displayName`
- 解决方式：为高阶组件设置`displayName`，便于调试时区分不同的组件
- `displayName的作用：用于设置调试信息(React Developer Tools信息)`
- 设置方式：

````react
Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
````

#### 传递props

- 问题：如果没有传递props，会导致props丢失问题
- 解决方式： 渲染`WrappedComponent`时，将state和props一起传递给组件

````react
<WarppedComponent {...this.state} {...this.props} />
````

==总结==

- 组件通讯是构建React应用必不可少的一环
- props的灵活性让组件更加强大
- 状态提升是React组件的常用模式
- 组件生命周期有助于理解组件的运行过程
- 钩子函数让开发者可以在特定的时机执行某些功能
- `render props` 模式和高阶组件都可以实现组件状态逻辑的复用
- 组件极简模型： `(state,props) => UI`



### 八、React原理

#### setState()

###### 更新数据

- `setState()`更新数据是异步的
- 注意：使用该语法，后面的`setState`不要依赖前面`setState`的值
- 多次调用`setState`，只会触发一次render

###### 推荐语法

- 推荐：使用 `setState((state,props) => {})` 语法

- 参数state： 表示最新的state

- 参数props： 表示最新的props

  ````react
  this.setState((state,props) => {
      return {
          count: state.count++
      }
  })
  ````

###### 第二个参数

- 场景：在状态更新(页面完成重新渲染)后立即执行某个操作

- 语法：`setState(update[,callback])`

  ````react
  this.setState(
  	(state,props) => {},
      () => {console.log('这个回调函数在状态更新后立即执行')}
  )
  ````

#### JSX语法转化

- JSX仅仅是`createElement()` 方法的语法糖(简化语法)
- JSX语法被 @babel/preset-react 插件编译为`createElement()` 方法
- React 元素： 是一个对象，用来描述你希望在屏幕上看到的内容

<img src="/语法糖.png" alt="语法糖" style="zoom:80%;" />

#### 组件更新机制

- setState() 的两个作用
  - 修改state
  - 更新组件
- 过程：父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树（当前组件以其所有子组件）

<img src="/组件更新.png" alt="组件更新" style="zoom:80%;" />

#### 组件性能优化

###### 减轻state

- 减轻state：只存储跟组件渲染相关的数据（比如：count/ 列表数据 /loading等）
- 注意：不用做渲染的数据不要放在state中
- 对于这种需要在多个方法中用到的数据，应该放到this中

````react
class Hello extends React.Component {
    componentDidMount() {
        // timerId 存储到this中，而不是state中
        this.timerId = setInterval(() => {},1)
    }
    
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    
    render() {...}
}
````

###### 避免不必要的重新渲染

- 组件更新机制：父组件更新会引起子组件也被更新，这种思路很清晰
- 问题：子组件没有任何变化时也会重新渲染
- 如果避免不必要的重新渲染？
- 解决方式：使用钩子函数 shouldComponentUpdate(nextProps, nextState)
  - 在这个函数中，nextProps和nextState是最新的状态以及属性
- 作用：这个函数有返回值，如果返回true，代表需要重新渲染，如果返回false，代表不需要重新渲染
- 触发时机：更新阶段的钩子函数，组件重新渲染前执行(shouldComponentUpdate => render)

````react
class App extends React.Component {
    state = {
        number: 0
    }
    // 点击事件，每次点击生成一个随机数
    hanldeBtn = () => {
        this.setState({
            number: Math.floor(Math.random() * 3)
        })
    }

    render() {
        return (
            <div>
                <NumberBox number={this.state.number} />
                <button onClick={this.hanldeBtn}>生成随机数</button>
            </div>
        )
    }
}
class NumberBox extends React.Component {
    // 将要更新UI的时候会执行这个钩子函数
    shouldComponentUpdate(nextProps, nextState) {
        // 判断一下当前生成的 值是否与页面的值相等
        if (nextProps.number !== this.props.number) {
            return true
        }
        return false
    }
    render() {
        return (
            <h1>随机数：{this.props.number} </h1>
        )
    }
}
````

###### 纯组件

+ 作用及使用

  + 纯组件： PureComponent 与 React.Component 功能相似
  + 区别： PureComponent 内部自动实现了 shouldComponentUpdate钩子，不需要手动比较
  + 原理：纯组件内部通过分别比对前后两次 props和state的值，来决定是否重新渲染组件

  ````react
  class Hello extends React.PureComponent {
      render() {
          return (
          	<div>纯组件</div>
          )
      }
  }
  ````

  

+ 实现原理

  + 说明：纯组件内部的对比是 shallow compare（浅层对比）
  + 对于值类型来说：比较两个值是否相同
  + 引用类型：只比对对象的引用地址是否相同
  + 注意：state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据

#### 虚拟DOM

- React更新视图的思想是：只要state变化就重新渲染视图
- 特点：思路非常清晰
- 问题：组件中只有一个DOM元素需要更新时，也得把整个组件的内容重新渲染吗？ 不是这样的
- 理想状态：部分更新，只更新变化的地方
- React运用的核心点就是 虚拟DOM 配合 Diff 算法

本质上就是一个JS对象，用来描述你希望在屏幕上看到的内容

<img src="/虚拟DOM.png" alt="虚拟DOM" style="zoom:80%;" />

#### Diff算法

###### 执行过程

- 初次渲染时，React会根据初始化的state（model），创建一个虚拟DOM对象（树）
- 根据虚拟DOM生成真正的DOM，渲染到页面
- 当数据变化后(setState())，会重新根据新的数据，创建新的虚拟DOM对象（树）
- 与上一次得到的虚拟DOM对象，使用Diff算法比对（找不同），得到需要更新的内容
- 最终，React只将变化的内容更新（patch）到DOM中，重新渲染到页面

<img src="/diff算法.png" alt="diff算法" style="zoom: 67%;" />

###### 代码演示

- 组件render()调用后，根据状态和JSX结构生成虚拟DOM对象(render()方法的调用并不意味着浏览器进行渲染，render方法调用时意味着Diff算法开始比对了)
- 示例中，只更新p元素的文本节点内容
- 初次渲染的DOM对象

````react
{
    type: 'div',
    props: {
        children: [
            {type: 'h1',props:{children: '随机数'}},
            {type: 'p' , props:{children: 0}}
        ]
        
    }
}
````

+ 数据更新之后的虚拟DOM对象

````react
// ...其他结构省略
{type: 'p',props: {children: 2}
````

#### 小结

- 工作角度：应用第一，原理第二
- 原理有助于更好的理解React的自身运行机制
- setState() 异步更新数据
- 父组件更新导致子组件更新，纯组件提升性能
- 思路清晰简单为前提，虚拟DOM和Diff保效率（渲染变化的组件）
- 虚拟DOM -> state + JSX
- 虚拟DOM最大的特点是 脱离了浏览器的束缚，也就是意味着只要是能支持js的地方都可以用到react，所以为什么说react是可以进行跨平台的开发

### 九、React路由

现代的前端应用大多数是SPA（单页应用程序），也就是只有一个HTML页面的应用程序。因为它的用户体验更好、对服务器压力更小，所以更受欢迎。为了有效的使用单个页面来管理多页面的功能，前端路由应运而生。

- 前端路由功能：让用户从一个视图（页面）导航到另一个视图（页面）
- 前端路由是一套映射规则，在React中，是URL路径与组件的对应关系
- 使用React路由简单来说，就是配置路径和组件

#### 使用步骤

+ 安装： ``yarn add react-router-dom``

+ 导入路由的三个核心组件： Router / Route / Link

  ````react
  import {BrowserRouter as Router , Route , Link} from 'react-router-dom'
  ````

+ 使用Router 组件包裹整个应用

  ````react
  <Router>
  	<div className="App">
      	// ...省略页面内容
      </div>
  </Router>
  ````

+ 使用Link组件作为导航菜单（路由入口）

  ````react
  <Link to='/first'>页面一</Link>
  ````

+ 使用Route组件配置路由规则和要展示的组件（路由出口）

  ````react
  const First = () => <p>页面一的页面内容</p>
  
  <Router>
  	<div className="App">
          <Link to="/first">页面一</Link>
          <Route path="/first" component={first} />
      </div>
  </Router>
  ````

#### 常用组件说明

- **Router组件：**包裹整个应用，一个React应用只需要使用一次
  - 两种常用的Router： HashRouter和BrowserRouter
  - HashRouter： 使用URL的哈希值实现 （localhost:3000/#/first）
  - 推荐 BrowserRouter：使用H5的history API实现（localhost3000/first）
- **Link组件：**用于指定导航链接（a标签）
  - 最终Link会编译成a标签，而to属性会被编译成 a标签的href属性
- **Route组件：**指定路由展示组件相关信息
  - path属性：路由规则，这里需要跟Link组件里面to属性的值一致
  - component属性：展示的组件
  - Route写在哪，渲染出来的组件就在哪

#### 执行过程

- 当我们点击Link组件的时候，修改了浏览器地址栏中的url
- React路由监听地址栏url的变化
- React路由内部遍历所有的Route组件，拿着Route里面path规则与pathname进行匹配
- 当路由规则（path）能够匹配地址栏中的pathname时，就展示该Route组件的内容

#### 编程式导航

- **场景：**点击登陆按钮，登陆成功后，通过代码跳转到后台首页，如何实现？
- **编程式导航：**通过JS代码来实现页面跳转
- history是React路由提供的，用于获取浏览器历史记录的相关信息
- **push(path)：**跳转到某个页面，参数path表示要跳转的路径
- go(n)：前进或后退功能，参数n表示前进或后退页面数量

````react
class Login extends Component {
    handleLogin = () => {
        // .....
        this.props.histroy.push('/home')
    }
}
````

#### 默认路由

- 现在的路由都是通过点击导航菜单后展示的，如果进入页面的时候就主动触发路由呢
- 默认路由：表示进入页面时就会匹配的路由
- 默认路由：只需要把path设置为 `'/'`

````react
<Route path="/" component={Hello} />
````

#### 匹配模式

###### 模糊匹配模式

- 当Link组件的to属性值为 '/login' 时候，为什么默认路由也被匹配成功？
- 默认情况下，React路由是模糊匹配模式
- 模糊匹配规则：只要pathname以path开头就会匹配成功

<img src="/模糊匹配模式.png" alt="模糊匹配模式" style="zoom:80%;" />

###### 精准匹配模式

- 默认路由认可情况下都会展示，如果避免这种问题？
- 给Route组件添加exact属性，让其变为**精准匹配模式**
- 精确匹配：只有当path和pathname完全匹配时才会展示改路由

````react
// 此时，该组件只能匹配pathname="/" 这一种情况
<Route exact path="/" component={} />
````

#### 小结

- React路由可以有效的管理多个视图实现 SPA
- 路由先需要通过安装
- Router组件包裹整个应用，只需要使用一次
- Link组件是入口，Route组件是出口
- 通过props.history实现编程式导航
- 默认是模糊匹配，添加exact编程精确匹配
- React路由的一切都是组件，可以像思考组件一样思考路由