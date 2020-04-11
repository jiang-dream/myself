---
typora-root-url: img
typora-copy-images-to: img
---

# git 笔记

## 一、Windows安装Git

下载地址： https://git-scm.com/downloads

安装过程傻瓜式安装，全部next即可

安装路径不能包含中文



## 二、git工作流程

![06](/06.png)

### git仓库

==用来保存编写好的文件==

### 暂存区

==存放临时修改的文件==

### 工作目录

==项目目录==



## 三、git配置

#### 1.配置账户

~~~shell
$ git config --global user.name 'your_name'  // 设置用户名

$ git config --global user.email 'your_email'  // 设置邮箱

$ git config --list  // 查看配置项信息
~~~



## 四、git基本使用

#### 1.创建版本库

什么是版本库呢？版本库又名仓库，英文名**repository**，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

~~~shell
# 创建一个空目录，在当前空目录下启动 Git Bash Here 

# 初始化仓库 ,把这个目录变成Git可以管理的仓库
$ git init
Initialized empty Git repository in /Users/michael/learngit/.git/
~~~

瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个`.git`的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到`.git`目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

#### 2.将文件添加到仓库中

~~~shell
# 将文件从工作目录添加到暂存区
$ git add '文件'

# 将暂存区的文件添加到仓库中
$ git commit -m '提交说明'

# 查看当前仓库的状态
$ git status

# 查看修改内容
$ git diff

# 查看提交记录（--pretty=oneline)
$ git log 
~~~

#### 3.覆盖/删除/回复

##### 用暂存区中的文件覆盖工作目录中的文件

场景：当工作目录中添加的一些代码存在一些问题，但是又不记得修改了哪一些地方了，此时就可以用暂存区的文件来覆盖我们工作目录的文件

~~~~shell
$ git checkout -- 文件
~~~~

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。



##### 将文件从暂存区中删除

场景：当我们不小心把其他的一些测试代码或者是一些没用的文件添加到了暂存区后，我们可以通过命令进行移除

~~~~shell
$ git rm --cached 文件名
~~~~



##### 恢复git仓库中指定版本的项目

场景：一般是用于恢复到某一个正常的版本

~~~~shell
$ git reset --hard 提交Id

# HEAD 指向当前的版本就是当前版本 HEAD^上一个版本
$ git reset --hard HEAD^

# 可以把暂存区的修改撤销调（UNstage），重新放回工作区
$ git reset HEAD <file>

# 记录每一次的命令
$ git reflog
~~~~



## 五、工作区和暂存区

#### 工作区（Working Directory）

就是在电脑里能看到的目录

#### 版本库（Repository）

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。



![git-repo](/0.jpg)



文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。



## 六、远程仓库（github)

#### 1. 创建SSH Key

创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

~~~shell
$ ssh-keygen -t rsa -C "youremail@example.com"
~~~

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可

如果一切顺利的话，可以在用户主目录里找到`.ssh`目录，里面有`id_rsa`和`id_rsa.pub`两个文件，这两个就是SSH Key的秘钥对，`id_rsa`是私钥，不能泄露出去，`id_rsa.pub`是公钥，可以放心地告诉任何人。

#### 2. 登陆GitHub

登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴`id_rsa.pub`文件的内容：点击“Add Key”，就可以看到已经添加的可以

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。

如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。这个方法我们后面会讲到的，相当简单，公司内部开发必备。

#### 3.创建仓库

在Github上创建的这个仓库是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

在本地仓库运行命令

~~~~shell
 git remote add origin https://github.com/lonely-zero/repository.git
~~~~

请千万注意，把上面的`michaelliao`替换成你自己的GitHub账户名，否则，你在本地关联的就是我的远程库，关联没有问题，但是你以后推送是推不上去的，因为你的SSH Key公钥不在我的账户列表中。

添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库。

下一步，就可以把本地库的所有内容推送到远程库上：

~~~~shell
$ git push -u origin master

Counting objects: 20, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (15/15), done.
Writing objects: 100% (20/20), 1.64 KiB | 560.00 KiB/s, done.
Total 20 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), done.
To github.com:michaelliao/learngit.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
~~~~

把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样：

从现在起，只要本地作了提交，就可以通过命令：

~~~shell
$ git push origin master
~~~

把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！



## 七、分支

#### 分支概述

分支概念： 为项目创建多个副本，每个副本完成一个独立的工作。 分支能够做到多件事情同时进行，且互不影响

![](E:\web前端资料\学习总结\_git\img\08.png)



- 主分支（master）

第一次向 git 仓库中提交更新记录时自动产生的一个分支。这个属于是主分支，主分支中的代码是很稳定的代码，所以我们在开发的时候一般都不会把代码直接提交到主分支中，主分支中的代码一般都是用于线上的项目；我们一般在开发的时候，会把代码先同步到开发分支上，等功能完成并且测试没有问题了，我们才会同步到主分支上

![](E:\web前端资料\学习总结\_git\img\077.png)

- 开发分支（develop）

作为开发的分支，基于 master 分支创建，这条分支就是用于我们日常开发的分支

![](E:\web前端资料\学习总结\_git\img\09.png)

- 功能分支（feature）

作为开发具体功能的分支，基于开发分支创建，为了不影响整体的开发项目，我们在实现某一些有难度的功能时候，会创建功能分支，等到功能实现完毕，没有问题了我们才会同步到开发分支上

![](E:\web前端资料\学习总结\_git\img\10.png)

小结

- 主分支是Git自动帮我们创建的 master，这条分支上的代码一般用于都是线上的项目

- 开发分支，在主分支上进行创建，一般用于我们开发的时候使用，也需要尽量保证其稳定性

- 功能分支，在开发分支上进行创建，用于实现某一个难度较大功能的时候使用

- 三者的合并流程为：功能分支 -> 开发分支 -> 主分支

  

#### 分支命令

- 查看分支: `git branch`   

- 创建分支: `git branch  分支名`

  - 在哪条分支上输入的命令，就是在哪条分支上进行的创建
  - ``git branch develop``  -创建了一个develop的分支

- 切换分支: `git checkout 分支名`

  - ``git checkout develop``  -切换到develop分支
  - 注意：当切换分支的时候，需要把暂存区里面的文件进行提交，不然会暂存区里面的文件会跟着到切换的这条分支上
  - 当切换会主分支的时候，就看不到其他分支里面的文件了

- 合并分支: `git merge 分支名`   (将指定分支与当前分支合并)

  - 如果当前分支的工作已经完成，就可以合并到到其他分支
  - 需要分清谁要合并谁，例如我们在开发分支上完成了功能，应该合并到主分支上，所以我们要站在主分支角度来进行合并
  - 虽然进行了合并，但是开发分支还是存在

- 删除分支: `git branch -d/-D 分支名`     （分支被合并后才允许删除）（-D 强制删除）

  - 分支工作已经完成，就可以进行删除

  - ``git branch -d develop``

  - 如果分支没有进行合并，那么默认是不能被删除，这是由于git有分支保护机制

  - 如果想强行删除，把-d 改成-D ： git branch -D develop

    

==注意： 切换分支时，必须保证当前分支的文件全部提交到仓库。==

#### 暂时保存更改

在git中，可以暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其他工作。

应用场景：分支的临时切换

- 存储临时改动： git stash
- 恢复改动： git stash pop

注意：

- 在其他的分支中也能执行恢复改动，但是会把这些文件恢复到当前命令的分支，所以我们在恢复的时候需要注意，我们当时在哪个分支进行的开发





## 常用命令大全

````js
#### **查看、添加、提交、删除、找回，重置修改文件**

git help <command>  # 显示command的help

git show # 显示某次提交的内容 git show $id

git co -- <file> # 抛弃工作区修改

git co . # 抛弃工作区修改

git add <file> # 将工作文件修改提交到本地暂存区

git add . # 将所有修改过的工作文件提交暂存区

git rm <file> # 从版本库中删除文件

git rm <file> --cached # 从版本库中删除文件，但不删除文件

git reset <file> # 从暂存区恢复到工作文件

git reset -- . # 从暂存区恢复到工作文件

git reset --hard # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git ci <file> git ci . git ci -a # 将git add, git rm和git ci等操作都合并在一起做

git ci -am "some comments"

git ci --amend # 修改最后一次提交记录

git revert <$id> # 恢复某次提交的状态，恢复动作本身也创建次提交对象

git revert HEAD # 恢复最后一次提交的状态

#### **查看文件diff**

git diff <file> ``# 比较当前文件和暂存区文件差异 git diff

git diff <id1><id1><id2> ``# 比较两次提交之间的差异

git diff <branch1>..<branch2>`` # 在两个分支之间比较

git diff --staged ``# 比较暂存区和版本库差异

git diff --cached ``# 比较暂存区和版本库差异

git diff --stat # 仅仅比较统计信息

#### **查看提交记录**

git log git log <file> # 查看该文件每次提交记录

git log -p <file> # 查看每次详细修改内容的diff

git log -p -2 # 查看最近两次详细修改内容的diff

git log --stat #查看提交统计信息
````



````js
Git 本地分支管理

# 查看、切换、创建和删除分支

git br -r # 查看远程分支

git br <new_branch> # 创建新的分支

git br -v # 查看各个分支最后提交信息

git br --merged # 查看已经被合并到当前分支的分支

git br --no-merged # 查看尚未被合并到当前分支的分支

git co <branch> # 切换到某个分支

git co -b <new_branch> # 创建新的分支，并且切换过去

git co -b <new_branch> <branch> # 基于branch创建新的new_branch

git co $id # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除

git co $id -b <new_branch> # 把某次历史提交记录checkout出来，创建成一个分支

git br -d <branch> # 删除某个分支

git br -D <branch> # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)

# 分支合并和rebase

git merge <branch> # 将branch分支合并到当前分支

git merge origin/master --no-ff # 不要Fast-Foward合并，这样可以生成merge提交

git rebase master <branch> # 将master rebase到branch，相当于： git co <branch> && git rebase master && git co master && git merge <branch>

#Git补丁管理(方便在多台机器上开发同步时用)

git diff > ../sync.patch # 生成补丁

git apply ../sync.patch # 打补丁

git apply --check ../sync.patch #测试补丁能否成功

#Git暂存管理

git stash # 暂存

git stash list # 列所有stash

git stash apply # 恢复暂存的内容

git stash drop # 删除暂存区

#Git远程分支管理

git pull # 抓取远程仓库所有分支更新并合并到本地

git pull --no-ff # 抓取远程仓库所有分支更新并合并到本地，不要快进合并

git fetch origin # 抓取远程仓库更新

git merge origin/master # 将远程主分支合并到本地当前分支

git co --track origin/branch # 跟踪某个远程分支创建相应的本地分支

git co -b <local_branch> origin/<remote_branch> # 基于远程分支创建本地分支，功能同上

git push # push所有分支

git push origin master # 将本地主分支推到远程主分支

git push -u origin master # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)

git push origin <local_branch> # 创建远程分支， origin是远程仓库名

git push origin <local_branch>:<remote_branch> # 创建远程分支

git push origin :<remote_branch> #先删除本地分支(git br -d <branch>)，然后再push删除远程分支

# Git远程仓库管理

GitHub

git remote -v # 查看远程服务器地址和仓库名称

git remote show origin # 查看远程服务器仓库状态

git remote add origin git@ github:robbin/robbin_site.git # 添加远程仓库地址

git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址) git remote rm <repository> # 删除远程仓库

#创建远程仓库

git clone --bare robbin_site robbin_site.git # 用带版本的项目创建纯版本仓库

scp -r my_project.git git@ git.csdn.net:~ # 将纯仓库上传到服务器上

mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库

git remote add origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址

git push -u origin master # 客户端首次提交

git push -u origin develop # 首次将本地develop分支提交到远程develop分支，并且track

git remote set-head origin master # 设置远程仓库的HEAD指向master分支

#也可以命令设置跟踪远程库和本地库

git branch --set-upstream master origin/master

git branch --set-upstream develop origin/develop
````



## git常用命令速查表

![git常用命令速查表](/git常用命令速查表.jpg)