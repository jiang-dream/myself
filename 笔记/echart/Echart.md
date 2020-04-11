# Echarts

### 一、使用步骤

+ 引入Echarts.js
+ 准备一个容器
+ 初始化Echarts对象(echarts.init())
+ 设置配置项(option)
+ 使用配置项（setOption)

````html
<script src="echarts.js"></script>
<body>
    <div id="box" style="width:450px;height:450px;"></div>
    
    <script>
    	var myChart = echarts.init(document.getElementById("box"))
        var option = {
            //.....
        }
        myChart.setOption(option)
    </script>
</body>


````



### 二、配置项

#### 1.title

==标题组件，包含主标题和副标题==

+ show : 是否显示标题组件
+ text : 主标题文本
+ link : 主标题文本超链接
+ target：指定窗口打开主标题超链接。self 、blank
+ textStyle: 主标题文字的样式
  + color :
  + fontStyle :
  + fontWeight :
  + fontFamily :
  + width :
  + height :
+ subtext : 副标题文本
+ sublink : 副标题文本超链接
+ subtarget : 指定窗口打开副标题超链接
+ subtextStyle : 副标题样式
+ textAlign : 整体（包括 text 和 subtext）的水平对齐。`'auto'`、`'left'`、`'right'`、`'center'`

#### 2.legend

==图例组件。==

图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。

+ type: 图例的类型

+ data : 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 `name`（如果是[饼图](https://www.echartsjs.com/zh/option.html#series-pie)，也可以是饼图单个数据的 `name`）。图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，特殊字符串 `''`（空字符串）或者 `'\n'`（换行字符串）用于图例的换行。

  如果 `data` 没有被指定，会自动从当前系列中获取。多数系列会取自 [series.name](https://www.echartsjs.com/zh/option.html#series.name) 或者 [series.encode](https://www.echartsjs.com/zh/option.html#series.encode) 的 `seriesName` 所指定的维度。如 [饼图](https://www.echartsjs.com/zh/option.html#series-pie) and [漏斗图](https://www.echartsjs.com/zh/option.html#series-funnel) 等会取自 series.data 中的 name。

  + name: 图例项的名称，应等于某系列的`name`值（如果是饼图，也可以是饼图单个数据的 `name`）。

#### 3.grid

==直角坐标系内绘图网格==

单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制[折线图](https://www.echartsjs.com/zh/option.html#series-line)，[柱状图](https://www.echartsjs.com/zh/option.html#series-bar)，[散点图（气泡图）](https://www.echartsjs.com/zh/option.html#series-scatter)。

+ show : 是否显示直角坐标系网格。
+ left : grid 组件离容器左侧的距离。
+ right : grid 组件离容器右侧的距离。
+ bottom : grid 组件离容器下侧的距离。
+ top : grid 组件离容器上侧的距离。
+ containLabel ： grid 区域是否包含坐标轴的[刻度标签](https://www.echartsjs.com/zh/option.html#yAxis.axisLabel)。

#### 4.xAxis

==直角坐标系 grid 中的 x 轴==

一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 [offset](https://www.echartsjs.com/zh/option.html#xAxis.offset) 属性防止同个位置多个 x 轴的重叠。

+ type : 坐标轴类型
  + `'value'` 数值轴，适用于连续数据。
  + `'category'` 类目轴，适用于离散的类目数据，为该类型时必须通过 [data](https://www.echartsjs.com/zh/option.html#xAxis.data) 设置类目数据。
  + `'time'` 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
  + `'log'` 对数轴。适用于对数数据
+ name : 坐标轴名称
+ data : 类目数据,在类目轴（[type](https://www.echartsjs.com/zh/option.html#xAxis.type): `'category'`）中有效。如果没有设置 [type](https://www.echartsjs.com/zh/option.html#xAxis.type)，但是设置了 `axis.data`，则认为 `type` 是 `'category'`。
+ nameTextStyle: 坐标轴名称的文字样式。
+ boundarGap : 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
+ min : 坐标轴刻度最小值。
+ max : 坐标轴刻度最大值。
+ axisLine : 坐标轴轴线相关设置
+ axisTick : 坐标轴刻度相关设置。
+ axisLabel : 坐标轴刻度标签的相关设置

#### 5.yAxis

==直角坐标系 grid 中的 y 轴==

一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 [offset](https://www.echartsjs.com/zh/option.html#yAxis.offset) 属性防止同个位置多个 Y 轴的重叠。



#### 6.visualMap



#### 7.tooltip

==提示框组件==

**提示框组件的通用介绍：**

提示框组件可以设置在多种地方：

- 可以设置在全局，即 [tooltip](https://www.echartsjs.com/zh/option.html#tooltip)
- 可以设置在坐标系中，即 [grid.tooltip](https://www.echartsjs.com/zh/option.html#grid.tooltip)、[polar.tooltip](https://www.echartsjs.com/zh/option.html#polar.tooltip)、[single.tooltip](https://www.echartsjs.com/zh/option.html#single.tooltip)
- 可以设置在系列中，即 [series.tooltip](https://www.echartsjs.com/zh/option.html#series.tooltip)
- 可以设置在系列的每个数据项中，即 [series.data.tooltip](https://www.echartsjs.com/zh/option.html#series.data.tooltip)

属性

+ show : 是否显示提示框组件，包括提示框浮层和 [axisPointer](https://www.echartsjs.com/zh/option.html#tooltip.axisPointer)。

+ trigger : 触发类型。

  - `'item'`

    数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。

  - `'axis'`

    坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。

    在 ECharts 2.x 中只支持类目轴上使用 axis trigger，在 ECharts 3 中支持在[直角坐标系](https://www.echartsjs.com/zh/option.html#grid)和[极坐标系](https://www.echartsjs.com/zh/option.html#polar)上的所有类型的轴。并且可以通过 [axisPointer.axis](https://www.echartsjs.com/zh/option.html#tooltip.axisPointer.axis) 指定坐标轴。

  - `'none'`

    什么都不触发

+ axisPointer : 坐标轴指示器配置项。坐标轴指示器是指示坐标轴当前刻度的工具。

+ position : 提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。

+ formatter : 提示框浮层内容格式器，支持字符串模板和回调函数两种形式。

+ textStyle : 提示框浮层的文本样式

#### 8.toolbox

==工具栏==

内置有[导出图片](https://www.echartsjs.com/zh/option.html#toolbox.feature.saveAsImage)，[数据视图](https://www.echartsjs.com/zh/option.html#toolbox.feature.dataView)，[动态类型切换](https://www.echartsjs.com/zh/option.html#toolbox.feature.magicType)，[数据区域缩放](https://www.echartsjs.com/zh/option.html#toolbox.feature.dataZoom)，[重置](https://www.echartsjs.com/zh/option.html#toolbox.feature.reset)五个工具。

+ show ： 是否显示工具栏组件。
+ orient : 工具栏 icon 的布局朝向。horizontal 、vertical
+ itemSize : 工具栏 icon 的大小
+ itemGap : 工具栏 icon 每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
+ showTitle : 是否在鼠标 hover 的时候显示每个工具 icon 的标题。
+ feature : 各工具配置项。除了各个内置的工具按钮外，还可以自定义工具按钮。
  + saveAsImage ：保存为图片。
  + restore ： 配置项还原
  + dataView ：数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
  + dataZoom : 数据区域缩放。目前只支持直角坐标系的缩放。
+ iconStyle : 公用的 icon 样式设置。由于 icon 的文本信息只在 icon hover 时候才显示，所以文字相关的配置项请在 `emphasis` 下设置。



#### 9.color

==调色盘颜色列表==

如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。



#### 10.series

==系列列表==   每个系列通过 `type` 决定自己的图表类型



### 11.dataset

ECharts 4 开始支持了 `数据集`（`dataset`）组件用于单独的数据集声明，从而数据可以单独管理，被多个组件复用，并且可以自由指定数据到视觉的映射。这在不少场景下能带来使用上的方便。







