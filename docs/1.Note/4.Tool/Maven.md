---
title : Maven
order : 1
---

# Maven基础

## 是什么

Maven 是一个**基于 Java 的项目管理和构建工具**，它的核心作用是**统一管理项目的依赖、构建过程和生命周期**。通过 Maven，我们可以方便地引入第三方库，自动处理依赖冲突，并通过标准化的目录结构和 POM 文件来管理整个项目。

在实际开发中，Maven 帮助我们自动下载依赖、编译打包、运行测试、生成文档、发布构件等，提高了开发效率和项目的可维护性。它还支持多模块项目管理，便于大型系统的模块化开发

------

**什么是 POM？** 每一个 Maven 工程都有一个 `pom.xml` 文件，位于根目录中，包含项目构建生命周期的详细信息。通过 `pom.xml` 文件，我们可以定义项目的坐标、项目依赖、项目信息、插件信息等等配置

------

## 有什么用

对于开发者来说，Maven 的主要作用主要有 3 个：

1. **项目构建**：提供标准的、跨平台的自动化项目构建方式。
2. **依赖管理**：方便快捷的管理项目依赖的资源（jar 包），避免资源间的版本冲突问题。
3. **统一开发结构**：提供标准的、统一的项目结构。

------

## 坐标

Maven 坐标是用来**唯一标识一个构件（artifact）**的信息组合，它由多个字段组成，主要包括：

- **groupId**：组织或公司名，标识项目归属；
- **artifactId**：具体模块名或项目名；
- **version**：版本号；
- （可选）**packaging**：打包方式，如 jar、war；
- （可选）**classifier**：附加标识，如 sources、javadoc。

这些信息共同组成了 Maven 仓库中一个依赖的完整地址，相当于它的“身份证”，Maven 就是通过坐标来定位并下载对应的依赖包的。

---

# Maven依赖

[依赖配置](https://javaguide.cn/tools/maven/maven-core-concepts.html#依赖配置)

[依赖范围](https://javaguide.cn/tools/maven/maven-core-concepts.html#依赖范围)

## 依赖冲突

**1、对于 Maven 而言，同一个 groupId 同一个 artifactId 下，只能使用一个 version。**若相同类型但版本不同的依赖存在于同一个 pom 文件，只会引入后一个声明的依赖。

**2、项目的两个依赖同时引入了某个依赖。**如：依赖链路一：A -> B -> C -> X(1.0)   依赖链路二：A -> D -> X(2.0)。Maven 在遇到这种问题的时候，会遵循 **路径最短优先** 和 **声明顺序优先** 两大原则。解决这个问题的过程也被称为 **Maven 依赖调解** 。在依赖路径长度相等的前提下，在 `pom.xml` 中依赖声明的顺序决定了谁会被解析使用，顺序最前的那个依赖优胜。

## 排除依赖

Maven 提供了**依赖排除（exclusion）机制**，允许我们在引入某个依赖的同时，明确排除它传递过来的某些依赖。排除操作通常发生在 `<dependency>` 标签的内部，通过 `<exclusions>` 标签指定需要剔除的依赖坐标，从而避免依赖冲突或包冗余。

这个机制在解决依赖冲突、控制依赖范围、保持项目构建稳定性方面非常重要，是实际开发中非常常见的用法。

---

# Maven仓库

在 Maven 世界中，任何一个依赖、插件或者项目构建的输出，都可以称为 **构件** 。

坐标和依赖是构件在 Maven 世界中的逻辑表示方式，构件的物理表示方式是文件，Maven 通过仓库来统一管理这些文件。 任何一个构件都有一组坐标唯一标识。有了仓库之后，无需手动引入构件，我们直接给定构件的坐标即可在 Maven 仓库中找到该构件。

Maven 仓库分为：

- **本地仓库**：运行 Maven 的计算机上的一个目录，它缓存远程下载的构件并包含尚未发布的临时构件。`settings.xml` 文件中可以看到 Maven 的本地仓库路径配置，默认本地仓库路径是在 `${user.home}/.m2/repository`。
- **远程仓库**：官方或者其他组织维护的 Maven 仓库。

Maven 远程仓库可以分为：

- **中央仓库**：这个仓库是由 Maven 社区来维护的，里面存放了绝大多数开源软件的包，并且是作为 Maven 的默认配置，不需要开发者额外配置。另外为了方便查询，还提供了一个[查询地址](https://search.maven.org/)，开发者可以通过这个地址更快的搜索需要构件的坐标。
- **私服**：私服是一种特殊的远程 Maven 仓库，它是架设在局域网内的仓库服务，私服一般被配置为互联网远程仓库的镜像，供局域网内的 Maven 用户使用。
- **其他的公共仓库**：有一些公共仓库是为了加速访问（比如阿里云 Maven 镜像仓库）或者部分构件不存在于中央仓库中。

Maven 依赖包寻找顺序：

1. 先去本地仓库找寻，有的话，直接使用。
2. 本地仓库没有找到的话，会去远程仓库找寻，下载包到本地仓库。
3. 远程仓库没有找到的话，会报错。

------

# Maven生命周期

Maven 定义了 3 个生命周期：

- `default` 生命周期
- `clean`生命周期
- `site`生命周期

## default生命周期

Maven 的 `default` 生命周期是最核心、最常用的构建生命周期，它定义了**从项目编译到打包、安装、部署的整个过程**，贯穿了一个 Java 项目的标准构建流程。

这个生命周期包含多个阶段，按顺序执行，常见的重要阶段有：

- **validate**：验证项目结构是否正确，所需信息是否完整。
- **compile**：将 `src/main/java` 目录下的源代码编译成 `.class` 文件。
- **test**：执行 `src/test/java` 中的单元测试，测试代码会被编译并运行，但不会打包。
- **package**：将编译好的代码打包成 jar 或 war 文件。
- **verify**：执行检查，如运行集成测试、校验包的完整性。
- **install**：将打好的构件安装到本地 Maven 仓库，供本地其他项目使用。
- **deploy**：将构件部署到远程仓库，供团队或其他系统共享。

Maven 会从上往下依次执行每个阶段，比如执行 `mvn install`，它会自动完成从 validate 到 install 的所有阶段。

## clean 生命周期

Maven 的 `clean` 生命周期用于**清理项目的构建产物**，主要负责在重新构建前，删除上一次构建生成的文件，避免旧文件干扰新的构建过程。

这个生命周期很简单，只包含三个阶段：

- **pre-clean**：构建清理前的准备工作；
- **clean**：执行正式的清理操作，默认删除 `target` 目录；
- **post-clean**：清理完成后的收尾工作。

在实际开发中，常用的命令是 `mvn clean`，它会删除项目中的 `target` 目录，确保下一次构建是干净的。这通常会与其他生命周期一起使用，比如 `mvn clean install`，表示先清理，再重新构建、打包并安装到本地仓库。

## site 生命周期

Maven 的 `site` 生命周期用于**生成项目的站点文档**，主要服务于团队协作和项目管理。通过这个生命周期，Maven 可以根据 `POM` 文件中的配置信息，自动生成项目的文档页面，包括依赖信息、插件列表、项目描述、变更记录、测试报告等内容。

`site` 生命周期的主要阶段包括：

- **pre-site**：生成站点前的准备工作；
- **site**：根据 `POM` 和配置生成项目站点；
- **post-site**：生成后的处理操作，如调整资源路径；
- **site-deploy**：将生成好的站点文档发布到远程服务器或共享位置，便于团队访问。

通常使用 `mvn site` 命令生成站点，使用 `mvn site-deploy` 发布。它依赖于一些插件，如 `maven-site-plugin` 和 `maven-project-info-reports-plugin`。

# Maven多模块管理

多模块管理简单地来说就是将一个项目分为多个模块，每个模块只负责单一的功能实现。直观的表现就是一个 Maven 项目中不止有一个 `pom.xml` 文件，会在不同的目录中有多个 `pom.xml` 文件，进而实现多模块管理。

多模块管理除了可以更加便于项目开发和管理，还有如下好处：

1. 降低代码之间的耦合性（从类级别的耦合提升到 jar 包级别的耦合）；
2. 减少重复，提升复用性；
3. 每个模块都可以是自解释的（通过模块名或者模块文档）；
4. 模块还规范了代码边界的划分，开发者很容易通过模块确定自己所负责的内容。

多模块管理下，会有一个父模块，其他的都是子模块。父模块通常只有一个 `pom.xml`，没有其他内容。父模块的 `pom.xml` 一般只定义了各个依赖的版本号、包含哪些子模块以及插件有哪些。不过，要注意的是，如果依赖只在某个子项目中使用，则可以在子项目的 pom.xml 中直接引入，防止父 pom 的过于臃肿。

---

# 最佳实践

[Maven最佳实践 | JavaGuide](https://javaguide.cn/tools/maven/maven-best-practices.html)
