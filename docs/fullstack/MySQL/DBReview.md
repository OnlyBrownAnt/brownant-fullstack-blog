# 数据库-基础概念介绍

### 数据库
数据库(Database，DB)是将大量数据经过计算机加工处理得到的按照一定方式组合的可以高效访问的数据集合。

#### 常见数据库
- 层级数据库(Hierarchical Database，HDB)
- 关系数据库(Relational Database，RDB)
    > 采用`行和列组成的二维表`来**管理数据**，使用`Sql(Structured Quary Language)结构化语言`来**操作数据**。
- 键值存储系统(Key-Value Store，KVS)

### 数据库管理系统
数据库管理系统(Database Management System，DBMS)是管理数据库的系统，根据所管理的数据库类型不同有不同的管理系统。提供对数据库的输入，访问，存储，管理等功能。

#### 常见数据库管理系统
- 关系数据库管理系统(Relational Database Management System，RDBMS)

### SQL
SQL(Strutured Query Language)是一种可以操作关系型数据库(RDB)的语言。
> 但是在不同数据库SQL标准并不完全相同，这里的内容参考于[Structured Query Language](https://en.wikibooks.org/wiki/Structured_Query_Language)。
>
> 介绍SQL常用分类是为了更方便了解SQL语言的组成，平常我们应该更加关注于具体指令的使用或者类型问题的解决。

#### SQL语句
由关键字、表名、列名组成的一条语句，用于描述操作的内容。

#### SQL语句种类
根据关系数据库(RDB)的赋予的指令种类不同，SQL语句通常分为以下四类。

- `DDL`(Data Definition language，数据定义语言)
    > **创建**或者**修改**以及**删除**数据库或者数据库中的表等对象。
    > 
    > 常用指令：CREATE、DROP、ALTER
    
- `DML`(Data Manipulation language，数据操纵语言)
    > **更改**或者**删除**表中的记录，**确认**或者**取消**数据库中的数据变更。
    > 
    > 常用指令：INSERT、UPDATE、DELETE、COMMIT、ROLLBACK
    
- `DQL`(Data Query Language，数据查询语言）
    > **查询**数据库中的数据
    > 
    > 常用指令：SELECT
    
- `DCL`(Data Control language，数据控制语言)
    > 可以**控制**用户的访问控制权限。
    > 
    > 常用指令：GRANT、REVOKE
### 关系型数据库
`关系数据库`是以`关系模型`为基础创建的数据库。关系数据库设计的目标是为了生成一组`关系模式`，来避免不必要的冗余，能够更方便的访问信息。因为`关系模型`允许设计者通过对`数据库规范化`的提炼去建立一个`信息一致性`的模型，所以我们可以设计满足适当的`范式`的模式来实现关系数据库设计的目标。
#### 附加概念
- 关系模型
关系模型是采用二维表格结构表达实体类型及实体间联系的数据模型
- 关系模式
关系模式是指关系的描述。
- 数据库规范化
数据库规范化，又称正规化、标准化，是数据库设计的一系列原理和技术，以减少数据库中数据冗余，增进数据的一致性。范式是数据库正规化所使用的正规形式，常见的有第一范式，第二范式，第三范式。
- 数据库表
在关系数据库，`数据库表`，又称表格，是一系列二维数组的集合，用来代表和储存数据对象之间的关系。表是构成表空间的基本结构，由区间构成。它由纵向的`列`和横向的`行`组成。

#### 常用范式
- 第一范式(`1NF`)
第一范式是为了要排除重复组的出现，要求数据库的每个列的论域都是由不可分割的原子值组成；每个字段的值都只能是单一值。简单来说就是表中不允许有重复的组或者列。
- 第二范式(`2NF`)
第二范式规则是要求资料表里的所有资料都要和该资料表的键（主键与候选键）有完全依赖关系：每个非键属性必须独立于任意一个候选键的任意一部分属性。简单来说就是表中的非主键属性只能依赖于主键，不能依赖于其他候选键。
- 第三范式(`3NF`)
要求所有非主键属性都只和候选键有相关性，也就是说非主键属性之间应该是独立无关的。简单来说，非主键属性不能依赖于其他非主键属性。

### 常见问题
- 在日常使用中术语"数据库"常指数据库管理系统(DBMS)和数据库(DB)的集合。

### 附录一
- [Database - wikipedia](https://en.wikipedia.org/wiki/Database)

### 附录二
[《数据库系统概念第六版》P323](https://brownant.top)

[关系模型-wikipedia](https://zh.wikipedia.org/wiki/%E5%85%B3%E7%B3%BB%E6%A8%A1%E5%9E%8B)

[关系模式-百度百科](https://baike.baidu.com/item/%E5%85%B3%E7%B3%BB%E6%A8%A1%E5%BC%8F)

[数据库规范化-wikipedia](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A7%84%E8%8C%83%E5%8C%96)

[第一范式-wikipedia](https://zh.wikipedia.org/wiki/%E7%AC%AC%E4%B8%80%E6%AD%A3%E8%A6%8F%E5%8C%96)

[第二范式-wikipedia](https://zh.wikipedia.org/wiki/%E7%AC%AC%E4%BA%8C%E6%AD%A3%E8%A6%8F%E5%8C%96)

[第三范式-wikipedia](https://zh.wikipedia.org/wiki/%E7%AC%AC%E4%B8%89%E6%AD%A3%E8%A6%8F%E5%8C%96)

[数据库表-wikipedia](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8)