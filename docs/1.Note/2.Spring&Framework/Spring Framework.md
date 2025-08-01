---
title : Spring Framework
order : 1
---

# Spring框架

Spring 是一个开源的、轻量级的**Java 企业级开发框架**，主要用于简化 Java 应用的开发过程，尤其是在企业级项目中对**对象创建、依赖管理、事务控制、AOP（面向切面编程）**等方面提供了强大支持。

Spring 的核心是 **IoC（控制反转）** 和 **AOP（面向切面编程）** 两大思想。IoC 通过依赖注入（DI）管理对象生命周期，解耦业务组件，提高代码的可维护性；AOP 则用于横切关注点的处理，比如日志、权限、事务控制等，避免重复代码。

除了核心功能，Spring 还提供了大量子模块，支持 Web 开发（Spring MVC）、数据访问（Spring JDBC、Spring Data）、事务管理、安全控制（Spring Security）等。配合 Spring Boot，开发效率和部署体验进一步提升。

---

## 核心模块

Spring 框架本身是一个模块化体系，按照功能主要包含以下几个核心模块：

1. **Core Container（核心容器）**：包括
   - **Core** 和 **Beans**：提供 IoC 和依赖注入的基础功能。
   - **Context**：构建在 Core 和 Beans 之上，提供类似于应用上下文的功能。
   - **Expression Language（SpEL）**：支持在配置中使用表达式语法。
2. **AOP（面向切面编程）模块**：支持 AOP 的实现，用于解耦横切逻辑，如日志、权限控制、事务等。
3. **Data Access / Integration（数据访问与集成）模块**：
   - **JDBC**：简化 JDBC 编程。
   - **ORM**：整合 Hibernate、JPA、MyBatis 等 ORM 框架。
   - **JMS**：支持消息中间件的集成。
   - **Transactions**：统一的声明式事务管理。
4. **Web 模块**：
   - **Web**：提供基础的 Web 开发功能。
   - **Web MVC**：实现了 MVC 架构的 Spring Web 框架，是开发 Web 应用的核心模块。
5. **Test 模块**：提供对 JUnit、TestNG 的集成，支持对 Spring 组件进行单元测试和集成测试。

---

## Spring vs Spring MVC vs Spring Boot 

**Spring Framework** 是基础，提供了 IoC（控制反转）和 AOP（面向切面编程）等核心功能，用于管理对象的生命周期和解耦业务逻辑，是整个 Spring 生态的根基。

**Spring MVC** 是 Spring 的一个子模块，用于构建基于 Servlet 的 Web 应用。它实现了 MVC 架构模式，提供了请求分发、参数绑定、视图解析等功能，专注于 Web 层开发。

**Spring Boot** 是对 Spring 全家桶的进一步封装，目的是简化 Spring 应用的配置和部署。它提供了自动配置、内嵌服务器、开箱即用的依赖管理，让开发者能够更快地搭建和运行 Spring 应用，无需编写大量 XML 或繁杂配置。

# IOC

**控制**指的是对象创建（实例化、管理）的权力。**反转**是指控制权交给外部环境（Spring 框架、IoC 容器）。

IoC 的思想就是将原本在程序中手动创建对象的控制权，交由 Spring 框架来管理。

## IOC容器

IoC 容器是 Spring 框架的核心组件，它负责**创建、管理和装配 Bean（即对象）**，并处理它们之间的依赖关系。所谓 IoC（控制反转），就是将原本由程序员控制的对象创建和依赖注入工作，交给容器来完成。

Spring 提供了两种主要的 IoC 容器实现：

1. **BeanFactory**：是最基础的容器接口，延迟加载（懒加载）Bean，适用于资源受限场景，但功能相对简单。
2. **ApplicationContext**：是 BeanFactory 的子接口，功能更强大，支持国际化、事件发布、自动装配、AOP 等，是实际开发中使用最广泛的容器。

IoC 容器的工作过程大致如下：

- 启动时读取配置（XML 或注解）；
- 扫描并实例化 Bean；
- 根据依赖关系自动装配；
- 管理 Bean 的生命周期。

通过 IoC 容器，Spring 实现了应用组件的松耦合，并为后续的 AOP、事务、声明式配置等提供了基础支持。

---

## Bean类

Spring Bean 是指由 **Spring IoC 容器管理的对象**。在 Spring 中，所有被注册到容器中、由容器进行创建、初始化、装配和销毁的组件，统称为 Bean。Spring Bean 通常是 Java 类实例，但也可以是接口的代理对象、工厂方法生成的对象等，只要是由容器管理的对象，都属于 Spring Bean。

---

### 声明Bean的注解

- `@Component`：通用的注解，可标注任意类为 `Spring` 组件。如果一个 Bean 不知道属于哪个层，可以使用`@Component` 注解标注。
- `@Repository` : 对应持久层即 Dao 层，主要用于数据库相关操作。
- `@Service` : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。
- `@Controller` : 对应 Spring MVC 控制层，主要用于接受用户请求并调用 `Service` 层返回数据给前端页面。

------

### 注入Bean的注解

在 Spring 中，注入 Bean（即依赖注入）常用的注解主要有以下几种：

1. **@Autowired**：最常用的注解，按类型自动注入，默认是按类型匹配，也可以配合 `@Qualifier` 指定 Bean 名称。当容器中存在多个匹配时，可能导致注入冲突。
2. **@Qualifier**：与 `@Autowired` 一起使用，用于按名称精确注入，解决多个同类型 Bean 的冲突。
3. **@Resource（JDK 提供，Spring 支持）**：按名称注入，找不到再按类型匹配。可选参数 `name` 明确指定要注入的 Bean 名称。
4. **@Inject（JSR-330）**：类似于 `@Autowired`，但属于 Java 标准，不支持 `@Qualifier` 的 value 属性，只能搭配 `@Named` 使用，Spring 同样支持。
5. **@Value**：用于注入基本类型、字符串、表达式或配置文件中的值，如 `@Value("${server.port}")`。

----

### 注入Bean的方法

依赖注入 (Dependency Injection, DI) 的常见方式：

1. 构造函数注入：通过类的构造函数来注入依赖项。
2. Setter 注入：通过类的 Setter 方法来注入依赖项。
3. Field（字段） 注入：直接在类的字段上使用注解（如 `@Autowired` 或 `@Resource`）来注入依赖项。

------

**Spring 官方推荐构造函数注入**，这种注入方式的优势如下：

1. 依赖完整性：确保所有必需依赖在对象创建时就被注入，避免了空指针异常的风险。
2. 不可变性：有助于创建不可变对象，提高了线程安全性。
3. 初始化保证：组件在使用前已完全初始化，减少了潜在的错误。
4. 测试便利性：在单元测试中，可以直接通过构造函数传入模拟的依赖项，而不必依赖 Spring 容器进行注入。

------

### Bean的作用域

Spring 中 Bean 的作用域通常有下面几种：

- **singleton** : IoC 容器中只有唯一的 bean 实例。Spring 中的 bean 默认都是单例的，是对单例设计模式的应用。
- **prototype** : 每次获取都会创建一个新的 bean 实例。也就是说，连续 `getBean()` 两次，得到的是不同的 Bean 实例。
- **request** （仅 Web 应用可用）: 每一次 HTTP 请求都会产生一个新的 bean（请求 bean），该 bean 仅在当前 HTTP request 内有效。
- **session** （仅 Web 应用可用） : 每一次来自新 session 的 HTTP 请求都会产生一个新的 bean（会话 bean），该 bean 仅在当前 HTTP session 内有效。
- **application/global-session** （仅 Web 应用可用）：每个 Web 应用在启动时创建一个 Bean（应用 Bean），该 bean 仅在当前应用启动时间内有效。
- **websocket** （仅 Web 应用可用）：每一次 WebSocket 会话产生一个新的 bean。

------

### Bean是否线程安全

Spring 本身**并不保证 Bean 是线程安全的**。默认情况下，Spring Bean 是 **单例（singleton）** 的，也就是说整个容器中只有一个实例会被多个线程共享使用。如果这个 Bean 中存在可变的状态（如成员变量）且没有做好并发控制，就可能出现线程安全问题。

线程安全与否取决于**Bean 的具体实现**。如果 Bean 是无状态的，比如只包含方法逻辑或只依赖局部变量，通常是线程安全的；但如果 Bean 维护了可变的全局状态，就需要开发者自行通过加锁、使用并发工具类等方式来保证线程安全。

---

对于有状态单例 Bean 的线程安全问题，常见的三种解决办法是：

1. **避免可变成员变量**: 尽量设计 Bean 为无状态。
2. **使用`ThreadLocal`**: 将可变成员变量保存在 `ThreadLocal` 中，确保线程独立。
3. **使用同步机制**: 利用 `synchronized` 或 `ReentrantLock` 来进行同步控制，确保线程安全。

---

### Bean生命周期

1. **创建 Bean 的实例**：Bean 容器首先会找到配置文件中的 Bean 定义，然后使用 Java 反射 API 来创建 Bean 的实例。
2. **Bean 属性赋值/填充**：为 Bean 设置相关属性和依赖，例如`@Autowired` 等注解注入的对象、`@Value` 注入的值、`setter`方法或构造函数注入依赖和值、`@Resource`注入的各种资源。
3. **Bean 初始化**： 
   - 如果 Bean 实现了 `BeanNameAware` 接口，调用 `setBeanName()`方法，传入 Bean 的名字。
   - 如果 Bean 实现了 `BeanClassLoaderAware` 接口，调用 `setBeanClassLoader()`方法，传入 `ClassLoader`对象的实例。
   - 如果 Bean 实现了 `BeanFactoryAware` 接口，调用 `setBeanFactory()`方法，传入 `BeanFactory`对象的实例。
   - 与上面的类似，如果实现了其他 `*.Aware`接口，就调用相应的方法。
   - 如果有和加载这个 Bean 的 Spring 容器相关的 `BeanPostProcessor` 对象，执行`postProcessBeforeInitialization()` 方法
   - 如果 Bean 实现了`InitializingBean`接口，执行`afterPropertiesSet()`方法。
   - 如果 Bean 在配置文件中的定义包含 `init-method` 属性，执行指定的方法。
   - 如果有和加载这个 Bean 的 Spring 容器相关的 `BeanPostProcessor` 对象，执行`postProcessAfterInitialization()` 方法。
4. **销毁 Bean**：销毁并不是说要立马把 Bean 给销毁掉，而是把 Bean 的销毁方法先记录下来，将来需要销毁 Bean 或者销毁容器的时候，就调用这些方法去释放 Bean 所持有的资源。 
   - 如果 Bean 实现了 `DisposableBean` 接口，执行 `destroy()` 方法。
   - 如果 Bean 在配置文件中的定义包含 `destroy-method` 属性，执行指定的 Bean 销毁方法。或者，也可以直接通过`@PreDestroy` 注解标记 Bean 销毁之前执行的方法。

---

# AOP

AOP(Aspect-Oriented Programming:面向切面编程)能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

Spring AOP 就是基于动态代理的，如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 **JDK Proxy**，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 **Cglib** 生成一个被代理对象的子类来作为代理。

## Spring AOP vs AspectJ AOP 

| 特性           | Spring AOP                                               | AspectJ                                    |
| -------------- | -------------------------------------------------------- | ------------------------------------------ |
| **增强方式**   | 运行时增强（基于动态代理）                               | 编译时增强、类加载时增强（直接操作字节码） |
| **切入点支持** | 方法级（Spring Bean 范围内，不支持 final 和 staic 方法） | 方法级、字段、构造器、静态方法等           |
| **性能**       | 运行时依赖代理，有一定开销，切面多时性能较低             | 运行时无代理开销，性能更高                 |
| **复杂性**     | 简单，易用，适合大多数场景                               | 功能强大，但相对复杂                       |
| **使用场景**   | Spring 应用下比较简单的 AOP 需求                         | 高性能、高复杂度的 AOP 需求                |

---

## AOP常见的通知类型

- **Before**（前置通知）：目标对象的方法调用之前触发

- **After** （后置通知）：目标对象的方法调用之后触发

- **AfterReturning**（返回通知）：目标对象的方法调用完成，在返回结果值之后触发

- **AfterThrowing**（异常通知）：目标对象的方法运行中抛出 / 触发异常后触发。AfterReturning 和 AfterThrowing 两者互斥。如果方法调用成功无异常，则会有返回值；如果方法抛出了异常，则不会有返回值。

- **Around** （环绕通知）：编程式控制目标对象的方法调用。环绕通知是所有通知类型中可操作范围最大的一种，因为它可以直接拿到目标对象，以及要执行的方法，所以环绕通知可以任意的在目标对象的方法调用前后搞事，甚至不调用目标对象的方法

------

## 切面执行顺序

1、通常使用`@Order` 注解直接定义切面顺序

2、实现`Ordered` 接口重写 `getOrder` 方法。

------

# Spring MVC

MVC 是模型(Model)、视图(View)、控制器(Controller)的简写，其核心思想是通过将业务逻辑、数据、显示分离来组织代码。

## 核心组件

- **`DispatcherServlet`**：**核心的中央处理器**，负责接收请求、分发，并给予客户端响应。
- **`HandlerMapping`**：**处理器映射器**，根据 URL 去匹配查找能处理的 `Handler` ，并会将请求涉及到的拦截器和 `Handler` 一起封装。
- **`HandlerAdapter`**：**处理器适配器**，根据 `HandlerMapping` 找到的 `Handler` ，适配执行对应的 `Handler`；
- **`Handler`**：**请求处理器**，处理实际请求的处理器。
- **`ViewResolver`**：**视图解析器**，根据 `Handler` 返回的逻辑视图 / 视图，解析并渲染真正的视图，并传递给 `DispatcherServlet` 响应客户端

---

## 工作流程

Spring MVC 是基于 MVC（Model-View-Controller）架构设计的 Web 框架，其工作流程可以概括为一个请求从前端到后端再返回响应的完整闭环。核心流程如下：

1. **用户发起请求**：浏览器发送 HTTP 请求，首先被 Spring 的前端控制器 `DispatcherServlet` 接收。
2. **请求分发**：`DispatcherServlet` 通过 `HandlerMapping` 查找与请求路径对应的处理器（Controller 方法）及其执行链。
3. **调用处理器方法**：`DispatcherServlet` 将请求委托给对应的 `HandlerAdapter`，适配并调用目标 Controller 方法。
4. **业务逻辑处理**：Controller 处理业务逻辑后，返回一个 `ModelAndView` 对象（或数据对象），包含视图名和模型数据。
5. **视图解析**：`DispatcherServlet` 调用 `ViewResolver`，根据视图名解析出具体的视图资源（如 JSP、HTML）。
6. **渲染视图**：视图渲染引擎将模型数据填充到页面模板，生成最终的 HTML 页面。
7. **响应返回客户端**：最终 HTML 被返回到浏览器，完成一次完整的请求处理过程。

前后端分离时，后端通常不再返回具体的视图，而是返回**纯数据**（通常是 JSON 格式），由前端负责渲染和展示。

怎么做到呢？

- 使用 `@RestController` 注解代替传统的 `@Controller` 注解，这样所有方法默认会返回 JSON 格式的数据，而不是试图解析视图。
- 如果你使用的是 `@Controller`，可以结合 `@ResponseBody` 注解来返回 JSON。

------

## 统一异常处理

**Spring 中如何做统一异常处理**

在 Spring 或 Spring Boot 应用中，统一异常处理常通过 `@ControllerAdvice` 配合 `@ExceptionHandler` 注解实现。这样可以集中管理异常逻辑，避免在每个 Controller 中重复写 try-catch，提高代码整洁性和可维护性。

`@ControllerAdvice` 是一个全局控制器增强注解，标识的类会对所有 Controller 生效。它内部的方法用 `@ExceptionHandler` 注解标明要处理的异常类型。Spring 会在出现指定异常时自动调用对应的方法进行处理，并返回统一的响应格式。

此外，还可以结合 `@ResponseBody` 或让处理方法返回 `ResponseEntity`，从而将异常信息转为标准的 JSON 格式返回给前端，便于前后端通信。

----

# Spring 循环依赖

循环依赖是指 Bean 对象循环引用，是两个或多个 Bean 之间相互持有对方的引用。

## 三级缓存

Spring 框架通过使用三级缓存来解决这个问题：

Spring 的三级缓存包括：

1. **一级缓存（singletonObjects）**：存放最终形态的 Bean（已经实例化、属性填充、初始化），单例池，为“Spring 的单例属性”⽽⽣。一般情况我们获取 Bean 都是从这里获取的，但是并不是所有的 Bean 都在单例池里面，例如原型 Bean 就不在里面。
2. **二级缓存（earlySingletonObjects）**：存放过渡 Bean（半成品，尚未属性填充），也就是三级缓存中`ObjectFactory`产生的对象，与三级缓存配合使用的，可以防止 AOP 的情况下，每次调用`ObjectFactory#getObject()`都是会产生新的代理对象的。
3. **三级缓存（singletonFactories）**：存放`ObjectFactory`，`ObjectFactory`的`getObject()`方法（最终调用的是`getEarlyBeanReference()`方法）可以生成原始 Bean 对象或者代理对象（如果 Bean 被 AOP 切面代理）。三级缓存只会对单例 Bean 生效。

------

整个解决循环依赖的**流程**如下：

- 当 Spring 创建 A 之后，发现 A 依赖了 B ，又去创建 B，B 依赖了 A ，又去创建 A；
- 在 B 创建 A 的时候，那么此时 A 就发生了循环依赖，由于 A 此时还没有初始化完成，因此在 **一二级缓存** 中肯定没有 A；
- 那么此时就去三级缓存中调用 `getObject()` 方法去获取 A 的 **前期暴露的对象** ，也就是调用上边加入的 `getEarlyBeanReference()` 方法，生成一个 A 的 **前期暴露对象**；
- 然后就将这个 `ObjectFactory` 从三级缓存中移除，并且将前期暴露对象放入到二级缓存中，那么 B 就将这个前期暴露对象注入到依赖，来支持循环依赖。

**只用两级缓存够吗？** 在没有 AOP 的情况下，确实可以只使用一级和二级缓存来解决循环依赖问题。但是，当涉及到 AOP 时，三级缓存就显得非常重要了，因为它确保了即使在 Bean 的创建过程中有多次对早期引用的请求，也始终只返回同一个代理对象，从而避免了同一个 Bean 有多个代理对象的问题。

------

不过，这种机制也有一些**缺点**，比如增加了内存开销（需要维护三级缓存，也就是三个 Map），降低了性能（需要进行多次检查和转换）。并且，还有少部分情况是不支持循环依赖的，比如非单例的 bean 和`@Async`注解的 bean 无法支持循环依赖。

------

## @Lazy能不能解决循环依赖问题

`@Lazy` 注解的作用是**延迟初始化**，即当第一次使用 Bean 时才进行实例化，而不是在容器启动时立即创建。`@Lazy` 可以用于解决某些场景下的循环依赖，但并不是完全解决所有的循环依赖问题。

**在循环依赖场景下，`@Lazy` 如何工作：**

假设有两个单例 Bean A 和 B，其中 A 依赖 B，B 依赖 A。如果在其中一个 Bean 上加上 `@Lazy` 注解，那么 Spring 容器会延迟该 Bean 的初始化，直到它真正被需要时才去创建。

1. **A 依赖 B，B 依赖 A**：当 Spring 初始化 A 时，A 会看到 B 被标记为 `@Lazy`，因此不会立即尝试创建 B，而是将 B 延迟到后续需要时再创建。
2. **B 的初始化被延迟**：当 B 被第一次访问时，Spring 会实例化 B，随后通过 A 注入 B。此时，B 依赖 A，但由于 A 已经是一个 "半初始化" 的对象，Spring 可以通过二级缓存来解决这一问题。

关键点：

- `@Lazy` 可以让 Spring 延迟某个 Bean 的初始化，从而避免在构造函数注入时出现循环依赖。
- 然而，`@Lazy` 只对**延迟加载**有效，它的作用是推迟 Bean 的初始化时机，而不是根本解决循环依赖。实际的循环依赖问题仍然需要通过 Spring 容器的缓存机制（三级缓存）来解决。

---

# Spring 事务

## 事务管理方式

**编程式事务**：在代码中硬编码(在分布式系统中推荐使用) : 通过 `TransactionTemplate`或者 `TransactionManager` 手动管理事务，事务范围过大会出现事务未提交导致超时，因此事务要比锁的粒度更小。

**声明式事务**：在 XML 配置文件中配置或者直接基于注解（单体应用或者简单业务系统推荐使用） : 实际是通过 AOP 实现（基于`@Transactional` 的全注解方式使用最多）

------

## 事务传播行为

**事务传播行为是为了解决业务层方法之间互相调用的事务问题**。

当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行。

正确的事务传播行为可能的值如下:

**1.`TransactionDefinition.PROPAGATION_REQUIRED`**

使用的最多的一个事务传播行为，我们平时经常使用的`@Transactional`注解默认使用就是这个事务传播行为。如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。

**`2.TransactionDefinition.PROPAGATION_REQUIRES_NEW`**

创建一个新的事务，如果当前存在事务，则把当前事务挂起。也就是说不管外部方法是否开启事务，`Propagation.REQUIRES_NEW`修饰的内部方法会新开启自己的事务，且开启的事务相互独立，互不干扰。

**3.`TransactionDefinition.PROPAGATION_NESTED`**

如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于`TransactionDefinition.PROPAGATION_REQUIRED`。

**4.`TransactionDefinition.PROPAGATION_MANDATORY`**

如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

这个使用的很少。

------

## 事务的隔离级别

**`TransactionDefinition.ISOLATION_DEFAULT`** :使用后端数据库默认的隔离级别，MySQL 默认采用的 `REPEATABLE_READ` 隔离级别 Oracle 默认采用的 `READ_COMMITTED` 隔离级别.

**`TransactionDefinition.ISOLATION_READ_UNCOMMITTED`** :最低的隔离级别，使用这个隔离级别很少，因为它允许读取尚未提交的数据变更，**可能会导致脏读、幻读或不可重复读**

**`TransactionDefinition.ISOLATION_READ_COMMITTED`** : 允许读取并发事务已经提交的数据，**可以阻止脏读，但是幻读或不可重复读仍有可能发生**

**`TransactionDefinition.ISOLATION_REPEATABLE_READ`** : 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，**可以阻止脏读和不可重复读，但幻读仍有可能发生。**

**`TransactionDefinition.ISOLATION_SERIALIZABLE`** : 最高的隔离级别，完全服从 ACID 的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，**该级别可以防止脏读、不可重复读以及幻读**。但是这将严重影响程序的性能。通常情况下也不会用到该级别。

------

## @Transactional

`@Transactional` 的作用范围

1. **方法**：推荐将注解使用于方法上，不过需要注意的是：**该注解只能应用到 public 方法上，否则不生效。**
2. **类**：如果这个注解使用在类上的话，表明该注解对该类中所有的 public 方法都生效。
3. **接口**：不推荐在接口上使用。

------

**原理**

`@Transactional` 的工作机制是基于 AOP 实现的，AOP 又是使用动态代理实现的。如果目标对象实现了接口，默认情况下会采用 JDK 的动态代理，如果目标对象没有实现了接口,会使用 CGLIB 动态代理。

---

# 设计模式

[Spring 中的设计模式详解 | JavaGuide](https://javaguide.cn/system-design/framework/spring/spring-design-patterns-summary.html)

---

# 其他

### @Component vs @Bean 

`@Component` 注解作用于类，而`@Bean`注解作用于方法。

`@Component`通常是通过类路径扫描来自动侦测以及自动装配到 Spring 容器中（我们可以使用 `@ComponentScan` 注解定义要扫描的路径从中找出标识了需要装配的类自动装配到 Spring 的 bean 容器中）。`@Bean` 注解通常是我们在标有该注解的方法中定义产生这个 bean,`@Bean`告诉了 Spring 这是某个类的实例，当我需要用它的时候还给我。

`@Bean` 注解比 `@Component` 注解的自定义性更强，而且很多地方我们只能通过 `@Bean` 注解来注册 bean。比如当我们引用第三方库中的类需要装配到 `Spring`容器时，则只能通过 `@Bean`来实现。

------

### @Autowired vs @Resource 

`@Autowired` 是 Spring 提供的注解，`@Resource` 是 JDK 提供的注解。

`Autowired` 默认的注入方式为`byType`（根据类型进行匹配），`@Resource`默认注入方式为 `byName`（根据名称进行匹配）。

当一个接口存在多个实现类的情况下，`@Autowired` 和`@Resource`都需要通过名称才能正确匹配到对应的 Bean。`Autowired` 可以通过 `@Qualifier` 注解来显式指定名称，`@Resource`可以通过 `name` 属性来显式指定名称。

`@Autowired` 支持在构造函数、方法、字段和参数上使用。`@Resource` 主要用于字段和方法上的注入，不支持在构造函数或参数上使用。

------



IoC/AOP、Spring MVC、事务管理

spring 框架有四大核心特性：

>Ioc，就是控制反转，是为了解决对象创建和依赖的高耦合的问题，是一种创建和获取对象的技术思想，是通过DI，也就是依赖注入实现的,传统开发我们需要new出新对象，而通过IOC我们通过ioc容器来实例化对象，大大降低对象之间的耦合。
>
>通过反射，依赖注入，设计模式（工厂模式），容器实现的，其中，反射就是java反射机制，允许Ioc容器在运行时加载类和创建对象实例以及调用对象方法；依赖注入是ioc的核心概念；容器作为工厂来实例化bean并管理他们的生命周期；IOC容器通常使用BeanFactory或者ApplicationContext来管理Bean，依赖关系的硬编码问题

>AOP，就是面向切面编程,允许开发者定义横切关注点，比如说事务管理，日志管理和权限控制。把那些与对象无关的，但是被业务代码共同调用的逻辑封装起来，减少重复代码，降低了模块间的耦合，有利于未来的扩展和维护。AOP是依赖于**动态代理技术**，动态代理是在运行时动态生成代理对象，而不是在编译时。它允许开发者在允许时指定要代理的接口和行为，从而实现在不修改源码的情况下增强或者拦截方法。

>事务处理，

>MVC，是指模型，视图，控制器，是一种软件设计典范，是一种把业务逻辑、数据、界面显示分离的方法组织代码。流程步骤就是用户通过view页面向服务端提出请求，controller控制器接收到解析，找到相应的model来处理，处理结果由controller返回给用户的view界面，界面渲染之后呈现。

>DI，依赖注入，为了解决依赖关系的硬编码问题和类依赖问题导致的高耦合，容器负责管理应用程序组件之间的依赖问题，是一种具体的编码技巧。不再通过new来在类的内部创建依赖类的对象，而是将对象的创建和依赖关系交给容器，类只需要声明自己依赖的对象，容器就会在运行的时候把依赖注入到类种，从而降低类与类的耦合度，实现方式有构造器注入、Setter方法注入，还有字段注入。

>自动装配：

