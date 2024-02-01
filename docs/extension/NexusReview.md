# Nexus快速教程

> Nexus是一种开源的仓库管理系统，用于存储、管理和分发软件组件和构件。它允许开发团队在构建和部署应用程序时有效地管理和访问所需的各种依赖项。Nexus提供了一个集中化的平台，可用于托管和共享各种类型的构件，如Java JAR文件、Python包、Docker镜像等。
>
> 通过使用Nexus，开发人员可以更轻松地管理和控制构件的版本、权限和访问，并减少对外部存储库的依赖。它还提供了强大的搜索和元数据功能，使开发人员能够快速找到所需的构件，并确保只使用受信任和验证的构件。
> -- chatgpt AI

## DOCS

- [nexus-home](https://www.sonatype.com/products/sonatype-nexus-repository)
- [docker-sonatype/nexus3](https://hub.docker.com/r/sonatype/nexus3/)
- [优质教程-掘金](https://juejin.cn/post/6911642325559017480)

## Reviews

### Nexus基础信息

#### 常见仓库类型

> 创建仓库和推送依赖包和仓库类型有关联。不同类型仓库权限和作用也不尽相同。
>
> 对于用户而言，三个类型关系使用优先级顺序是 proxy \<- group \<- hosted
>
> 以下内容解释来自于chatgpt AI

- group
  Nexus Group（仓库组）：Nexus Group是一个虚拟仓库，将多个仓库组合成一个单一的逻辑单元。它允许你聚合多个仓库，例如托管仓库和代理仓库，在统一的URL下进行访问。仓库组的主要目的是提供对多个仓库的集成视图，并简化客户端的配置。

- hosted
  Nexus Hosted（托管）仓库：Nexus Hosted是一个你可以存储和管理自己的构件的仓库。它作为你内部开发包和库的集中存储位置。你可以直接发布构件到托管仓库，使其可供组织内其他开发人员或项目使用。

- proxy
  Nexus Proxy（代理）仓库：Nexus Proxy是一个远程仓库，用于代理和缓存来自外部来源的构件。它充当本地开发环境与远程构件源（如公共Maven Central或npm registry）之间的中间层。当请求构件时，代理仓库首先检查是否有本地缓存副本。如果没有，它会从远程源获取构件，将其缓存到本地，并将其提供给客户端。这有助于更快地获取构件并减少对外部依赖。

#### 常见命令

```shell
# 约定
# <hosted-repository> hosted类型仓库地址
# <file-name> 包名称(有尾缀)

# 修改本地依赖仓库地址
npm config set registry <hosted-repository>

# 登录nexus仓库
npm login --registory=<hosted-repository>

# 推送包到nexus仓库
npm publish --registory=<hosted-repository> <file-name>
```

### 技巧

#### node项目批量下载和推送node包到私服

1. 下载所有node包
   > 通过脚本匹配package-lock.json文件，对于存在tgz地址的包进行下载。

- downloads.sh

```shell
#!/bin/bash

# 递归解析 package-lock.json 并获取所有 tarball URL
parse_package_lock() {
    local file=$1
    local indent=$2

    local content=$(cat "$file")
    local regex='\"resolved\": \"(http[s]?:\/\/[^"]+)\"'

    while [[ $content =~ $regex ]]; do
        local url=${BASH_REMATCH[1]}
        echo "$url"
        content=${content#*"\"resolved\": \"$url\""}
    done

    local dependencies_regex='\"dependencies\": \{([^}]*)\}'
    if [[ $content =~ $dependencies_regex ]]; then
        local dependencies=${BASH_REMATCH[1]}
        local dep_regex='\"([^"]+)\": \{'
        while [[ $dependencies =~ $dep_regex ]]; do
            local dependency=${BASH_REMATCH[1]}
            local subfile="${file%/*}/${dependency}/package-lock.json"
            parse_package_lock "$subfile" "${indent}.${dependency}"
            dependencies=${dependencies#*\"${dependency}\": \{}
        done
    fi
}

# 创建一个目录用于保存下载的 .tgz 包
mkdir -p tgz-packages

# 解析 package-lock.json 并获取所有 tarball URL
tarballUrls=$(parse_package_lock "package-lock.json" "")

# 迭代获取每个 tarball 的文件名并下载
for url in $tarballUrls; do
    filename=$(basename "$url")
    echo "Downloading $filename"
    curl --silent -L "$url" -o "tgz-packages/$filename"
done

echo "All .tgz packages downloaded successfully."
```

2. 推送所有node包
   > 将所有tgz包放在一个文件夹，获取文件列表并脚本遍历推送到nexus

- create-tgz-list.sh
  > 生成文件列表

```shell
#!/bin/bash
ls *.tgz > tgz.txt
```

- publish.sh
  > 遍历文件列表执行推送

```shell
#!/bin/bash
path=<hosted-repository>
while IFS= read -r line;
do
  npm publish --registry=$path $line
done < tgz.txt
```

### 常见问题

#### Unable to authenticate, need: BASIC realm="SOnatype nexus Repository Manager"

管理员进入Settings -> Realms，选择Security下的Realms，将npm Bearer Token Realm从Available移到Active中，并保存。

#### Deploying to groups is a PRO-licensed feature. See https://links.sonatype.com/product-nexus-repository

publish的仓库地址错误，不支持向group仓库推送包，需要切换到hosted托管仓库进行推送。
