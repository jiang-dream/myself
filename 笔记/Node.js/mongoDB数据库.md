# MongoDB数据库



## 1. 安装MongoDB

​	mongodb官网：**https://www.mongodb.com/download-center#community** 下载安装包（傻瓜式安装）

​	==选择Custom自定义安装，取消compass可视化软件安装==



## 2.环境变量配置

​		将mongodb安装路径添加到计算机环境变量==path==中

​		==D:/mongodb/bin==



## 3. 启动MongoDB服务

​		1）在mongodb安装文件夹先创建data 文件夹(启动服务之前需要创建数据库文件的存放文件夹，否则命令不会自动创建，而且不能启动成功)

​		2）在命令行启动mongodb服务

~~~cmd
mongod --dbpath D:\MongoDB\data\db
~~~

​		3）手动开启关闭服务

```cmd
// 启动服务
net start mongo

// 停止服务
net stop mongo
```



## 4.配置本地windows mongodb服务

​		1）先在mongodb安装==根目录==下创建一个新的文件夹==log== (用来存放日志文件)

​		2）在mongodb安装==根目录==下新建配置文件==mongo.config==，这个文件和bin目录是同级。

​		3）在mongo.config文件中，输入两个命令，然后保存

~~~cmd
dbpath=D:\mongodb\data\db
logpath=D:\mongodb\log\mongo.log  
~~~

​		4) 使用管理员身份打开cmd，进入到 ==D:\mongodb\bin==目录下执行下面命令 创建服务

```cmd
 mongod --dbpath "d:\mongodb\data\db" --logpath "d:\mongodb\log\mongo.log" --install   --serviceName "MongoDB" (--auth 开启权限登陆)
```

​		5）服务卸载

​				先停止服务 `` net stop mongodb``

​				卸载服务 ``mongodb --remove``

​		6）文件及文件夹说明

​				1. 创建D:\mongodb\log目录，用来存放日志文件；

​				2. 在D:\mongodb\log目录里新建mongodb.log，用来存放日志信息；

​				3.  创建D:\mongodb\data\db目录，用来存放数据库数据，

​				4. 并在D:\mongodb目录下创建mongo.config，在文件内部复制如下文本：

````markdown
## 数据文件  此处=后对应到数据所存放的目录
dbpath=d:\mongodb\data\db

## 日志文件  此处=后对应到日志文件所在路径
logpath=d:\mongodb\data\log\mongodb.log

## 错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件
logappend=true 

# 启用日志文件，默认启用
journal=true 

# 这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=true 

# 端口号 默认为27017
port=27017 

````



## 5. 权限角色说明

### 	内置角色

#### （1）数据库用户角色

针对每一个数据库进行控制。

**read** :提供了读取所有非系统集合，以及系统集合中的system.indexes, system.js, system.namespaces

​		（允许用户读取指定数据库）

**readWrite**: 包含了所有read权限，以及修改所有非系统集合的和系统集合中的system.js的权限.

​		（允许用户读写指定数据库）

#### （2）数据库管理角色

每一个数据库包含了下面的数据库管理角色。

**dbOwner**：该数据库的所有者，具有该数据库的全部权限。

**dbAdmin**：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile

**userAdmin**：为当前数据库创建、修改用户和角色。拥有userAdmin权限的用户可以将该数据库的任意权限赋予任意的用户。（允许用户向system.users集合写入，可以在指定数据库里创建、删除和管理用户）

#### （3）集群管理角色

admin数据库包含了下面的角色，用户管理整个系统，而非单个数据库。这些权限包含了复制集和共享集群的管理函数。

**clusterAdmin**：提供了最大的集群管理功能。相当于clusterManager, clusterMonitor, and hostManager和dropDatabase的权限组合。

**clusterManager**：提供了集群和复制集管理和监控操作。拥有该权限的用户可以操作config和local数据库（即分片和复制功能）

**clusterMonitor**：仅仅监控集群和复制集。

**hostManager**：提供了监控和管理服务器的权限，包括shutdown节点，logrotate, repairDatabase等。

==注意：这些角色只能在Admin数据库下创建==

#### （4）备份还原角色

**backup** : 该角色拥有备份数据的权限。

**restore** : 该角色拥有还原备份数据的权限。

==注意：这些角色只能在Admin数据库下创建==

#### （5）所有数据库角色

admin数据库提供了一个mongod实例中所有数据库的权限角色：

**readAnyDatabase**：具有read每一个数据库权限。但是不包括应用到集群中的数据库。和read相似，但它是全局的。（只在admin数据库中可用，赋予用户所有数据库的读权限）

**readWriteAnyDatabase**：具有readWrite每一个数据库权限。但是不包括应用到集群中的数据库。

​		（只在admin数据库中可用，赋予用户所有数据库的读写权限）

**userAdminAnyDatabase**：具有userAdmin每一个数据库权限，但是不包括应用到集群中的数据库。

​		（只在admin数据库中可用，赋予用户所有数据库的userAdmin权限）

**dbAdminAnyDatabase**：提供了dbAdmin每一个数据库权限，但是不包括应用到集群中的数据库。

​		（只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限）

==注意：这些角色只能在Admin数据库下创建==

#### （6）超级管理员角色

**root ** : dbadmin到admin数据库、useradmin到admin数据库以及UserAdminAnyDatabase。但它不具有备份恢复、直接操作system.*集合的权限，但是拥有root权限的超级用户可以自己给自己赋予这些权限。

该角色拥有所有权限,该角色包含readWriteAnyDatabase, dbAdminAnyDatabase, userAdminAnyDatabase, clusterAdmin roles, restore, and backup角色。

==注意：这些角色只能在Admin数据库下创建==

#### （7）内部角色

**_system** ： 该角色为系统内部角色，比如复制集成员、mongos使用。



### 自定义角色

MongoDB除了内置角色外，还有可以自定义角色。





## 6 . 用户账户管理

> ==用户管理员==账户和==数据库管理员==账户都是在数据库 admn 中创建的。在 MongoDB 服务器中启用身份验证后，要以用户管理员或数据库管理员的身份连接到服务器，必须向 admin 数据库验证身份，您还需在每个数据库中创建用户账户，让这些用户能够访问该数据库。

###		1）创建账户

#### 					（1） 创建用户管理员账户

> 1 . 配置访问控制的第一步是创建用户管理员账户。用户管理员应只有创建用户账户的权限，而不能管理数据库或执行其他管理任务。这确保数据库管理和用户账户管理之间有清晰的界限。
>
> 2 . 在 admin 数据库中，添加一个用户并赋予`userAdminAnyDatabase`角色，`userAdminAnyDatabase`只在`admin`数据库中可用，赋予用户所有数据库的userAdmin权限。
>
> 3 . userAdmin、userAdminAnyDatabase 

```cmd
// 先进入 admin 库
use admin 

// 创建用户管理员账号
db.createUser(
	{
		user : 'userAdmin', // 账户名
		pwd: 'xxxxx',   // 密码
		roles: [{ role: 'userAdminAnyDatabase' ,db: 'admin'}] // 账户权限（角色）
	}
)
// user : 用户名
// pwd  : 密码
// db	: 指定该用户的数据库，admin是用于权限控制的数据库
// roles: 制定用户的角色，可以用一个空数组给新用户设定空角色；在roles字段可以指定内置角色和用户定义的角色
```

> 用户管理员应只有创建用户账户的权限，而不能管理数据库或执行其他管理任务。
> 要创建某个库的管理用户，必须在 admin 进行认证，给哪个库创建用户就先切换到哪个库下面。

#### 					（2）创建数据库管理员账户

> 要创建数据库管理员，可在 MongoDB shell 中切换到数据库 admin，再使用方法`createUser`添加角色为`readWriteAnyDatabase`、`dbAdminAnyDatabase`和`clusterAdmin`的用户。这让这名用户能够访问系统中的所有数据库、创建新的数据库以及管理 MongoDB 集群和副本集。

~~~cmd
> use admin
switched to db admin
> db.createUser(
...    {
...      user: "dbadmin",
...      pwd: "abc123",
...      roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase","clusterAdmin" ]
...    }
... )
~~~

> 数据库管理员能够访问系统中的所有数据库、创建新的数据库以及管理 MongoDB 集群和副本集。
> 如果要求管理其他数据库，首先要去 admin 库里面去认证。

#### 				（3）创建普通用户

> 一旦经过认证的用户管理员，可以使用`db.createUser()`去创建额外的用户。
> 你可以分配mongodb内置的角色或用户自定义的角色给用户。
>
> 这个 myUserAdmin 用户仅仅只有特权去管理用户和角色，如果你试图执行其他任何操作，例如在 test 数据库中的foo集合中去读数据，mongodb将返回错误。
>
> 你创建用户的数据库（这里就是test数据库）是该用户认证数据库。尽管用户认证是这个数据库，用户依然可以有其他数据库的角色。即用户认证数据库不限制用户权限。

```cmd
use school

db.createUser(
	{
		user: "student",
		pwd: "student",
		roles:[
			{role:"readWrite",db:"school"}
		]
	}
)
```



###		2）查看用户

~~~cmd
// 查看当前数据库用户
show users

// 查看系统所有用户
db.system.users.find()

// 或这样
db.runCommand({usersInfo:"userName"})

~~~



### 		3）修改密码

~~~cmd
// 进入数据库
use admin

// 修改用户密码(必须是userAdmin账户验证)
// 方法1
db.changeUserPassword('username','xxxx')

// 方法2
db.updateUser('username',{pwd:'xxxxx'})
~~~



### 		4）修改用户权限

~~~cmd
// updateuser它是完全替换之前的值
db.updateUser('username',{roles:[{role:"read",db:"database"}]})

// 修改权限  grant 授权
db.grantRolesToUser('username',
	[
		{role:"readWrite",db:"database"},
		{roles:"read",db:"database"}
	]	
)

// 删除权限  revoke 撤回，取消
db.revokeRolesFromUser("username",
	[
		{role:"read",db:"database"}
	]
)
~~~



### 		5）删除数据库用户

~~~cmd
use admin 

db.dropUser('user001')
~~~



> 1. 和用户管理相关的操作基本都要在admin数据库下运行，要先use admin;
> 2. 如果在某个单一的数据库下，那只能对当前数据库的权限进行操作;
> 3. db.addUser是老版本的操作，现在版本也还能继续使用，创建出来的user是带有root role的超级管理员。



## 7. CRUD操作

​		==CRUD操作可创建、读取、更新、删除 文档数据==

### 		create 

```cmd
// 方法一  
db.collections.insert({"_id:1",name:"zhangsan",age:18})

// 方法二
db.collections.save({"_id:1",name:"zhangsan",age:18})

// 区别  
insert	如果存在主键则会报主键重复的错误
save   会修改值
// 相同点
如果没有主键，则都会增加一条数据
```

### read

```cmd
// 语法格式（pretty 以更利于查看的方式输出）
db.collection.find().pretty()

//查询集合所有数据
db.collection.find()

//查询一个数据
db.collection.findOne()

//查询与条件相同的值
db.collection.find({"name":"zhangsan"})

//查询大于条件的数据
db.collection.find({"age":{$gt:20}})

//查询小于条件的数据
db.collection.find({"age":{$lt:20}})

// 跳过插询
db.collection.find().skip(10)

// 限定插询
db.collection.find().limit(5)

// and查询
db.collection.find($and:[{条件一}，{条件二}])

// or 查询
db.collection.find($or:[{条件一}，{条件二}])

// 查询结果排序
//降序
db.collection.find().sort({列名: -1})
// 升序
db.collection.find().sort({列名: 1})
```



### 		update

~~~cmd
// 修改单个数据
db.collection.update({条件}，{$set:{新数据}})

// 修改多个数据
db.collection.update({条件}，{$set:{新数据}}，{multi:true})
~~~



### 		delete

~~~cmd
// 删除符合条件的数据
db.collection.remove({条件})

// 删除所有的数据
db.collection.remove({})

// 删除满足条件的第一条数据
db.collection.remove({条件}，1)
db.collection.remove({条件}，true)
~~~



## 7. MongoDB基础操作

#### 命令行导入JSON数据

~~~shell
mongoimport -d 数据库名字 -c 集合名字 --file 导入文件路径
~~~



#### 连接数据库

~~~cmd
mongo
~~~

#### 切换/创建数据库

~~~cmd
use database  // 选择数据库，如果没有数据库，则会新创建
~~~

#### 查看数据库

~~~cmd
db  
db.getName() // 查看当前选择的数据库 和 db 方法一样

show dbs // 查看所有数据库

db.stats()  // 查看当前数据库的状态

db.version()  // 查看数据可的版本

db.getMongo()  // 查看当前数据库的链接机器地址
~~~

#### 删除数据库

~~~cmd
db.dropDatebase()   //删除当前数据库
~~~

#### 创建集合

~~~cmd
db.createCollection("集合名字")  //显示创建集合
~~~

#### 查看集合

~~~ cmd
show collections  // 查询当前数据库的所有集合

show tables

db.collection.stats()  // 查看集合的状态

db.collection.count()  // 查询集合的数据条数

db.collection.dataSize()  //查询数据空间大小

db.userInfo.renameCollection('新命名')   // 重命名userInfo
~~~

#### 删除集合

~~~~cmd
db.collection.drop() 
~~~~

#### 数据库认证

~~~cmd
db.auth('username','password')
~~~

#### 显示当前数据所有用户

~~~~cmd
show users

db.system.users.find() // 在admin数据库中用
~~~~



#### 查看命令提示

~~~cmd
help
db.help()
db.collection.help()

~~~















1. 以系统管理员的方式运行powershell
2. 连接数据库 mongo
3. 查看数据库 show dbs
4. 切换到admin数据库 use admin
5. 创建超级管理员账户 db.createUser()
6. 切换到blog数据 use blog
7. 创建普通账号 db.createUser()
8. 卸载mongodb服务

​        停止服务 net stop mongodb

​	mongod --remove

9. 创建mongodb服务

​          mongod --logpath="C:\Program
Files\MongoDB\Server\4.1\log\mongod.log" --dbpath="C:\Program
Files\MongoDB\Server\4.1\data" --install –-auth

10. 启动mongodb服务 net start mongodb
11. 在项目中使用账号连接数据库

​          mongoose.connect('mongodb://user:pass@localhost:port/database')