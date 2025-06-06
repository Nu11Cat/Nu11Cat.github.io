<template><div><h1 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h1>
<h2 id="第一部分-异常的基础与核心概念" tabindex="-1"><a class="header-anchor" href="#第一部分-异常的基础与核心概念"><span><strong>第一部分：异常的基础与核心概念</strong></span></a></h2>
<ol>
<li><strong>异常体系结构概览</strong> • Java 中的异常层次结构：Error 与 Exception
• 异常的分类：检查型异常（Checked Exception）与非检查型异常（Unchecked Exception）
• RuntimeException 和 IOException 的区别与使用场景</li>
<li><strong>异常处理的基本语法</strong> • try-catch-finally 语句的基本用法
• throw 语句的使用：抛出异常
• throws 语句的使用：声明异常
• finally 语句的作用与执行顺序</li>
<li><strong>异常的捕获与传播</strong> • 异常的捕获：多个 catch 与多重异常类型
• 异常的传播：throws 的使用与方法声明
• 异常链：嵌套异常与根本原因的追踪</li>
</ol>
<h2 id="第二部分-自定义异常与最佳实践" tabindex="-1"><a class="header-anchor" href="#第二部分-自定义异常与最佳实践"><span><strong>第二部分：自定义异常与最佳实践</strong></span></a></h2>
<ol>
<li><strong>自定义异常的创建</strong> • 如何创建自定义异常类（继承 Exception 或 RuntimeException）
• 自定义异常的设计哲学：包含错误代码、消息、异常栈信息
• 自定义异常的构造方法与属性</li>
<li><strong>异常处理的设计原则</strong> • 不滥用异常：避免用异常控制流程
• 只捕获必要的异常：局部捕获与全局捕获的区别
• 异常的语义化：明确捕获的异常含义</li>
<li><strong>日志与异常的结合</strong> • 异常日志的记录：使用日志框架（Log4j、SLF4J等）记录异常
• 异常堆栈的打印与追踪
• 异常追踪工具的使用（如 Sentry）</li>
</ol>
<h2 id="第三部分-高级异常处理技巧与优化" tabindex="-1"><a class="header-anchor" href="#第三部分-高级异常处理技巧与优化"><span><strong>第三部分：高级异常处理技巧与优化</strong></span></a></h2>
<ol>
<li><strong>多线程中的异常处理</strong> • 线程的异常捕获与传递
• ExecutorService 的异常处理机制
• Future 和 Callable 中异常的处理</li>
<li><strong>反射与异常处理</strong> • 使用反射时的异常捕获与处理
• 如何避免反射中的异常对系统造成影响</li>
<li><strong>与框架的集成：Spring 异常处理</strong> • Spring 中的异常处理机制（如 @ControllerAdvice）
• 事务管理中的异常回滚与处理策略
• AOP 异常处理的实现</li>
</ol>
<hr>
<h1 id="第一部分-异常的基础与核心概念-1" tabindex="-1"><a class="header-anchor" href="#第一部分-异常的基础与核心概念-1"><span><strong>第一部分：异常的基础与核心概念</strong></span></a></h1>
<h2 id="_1-异常体系结构概览" tabindex="-1"><a class="header-anchor" href="#_1-异常体系结构概览"><span>1. <strong>异常体系结构概览</strong></span></a></h2>
<p>• <strong>Java 中的异常层次结构：Error 与 Exception</strong>
在 Java 中，异常分为两类：<code v-pre>Error</code> 和 <code v-pre>Exception</code>。<code v-pre>Error</code> 是 JVM 层面的问题，通常无法恢复，如内存溢出；而 <code v-pre>Exception</code> 则是程序运行时可能发生的错误，可以通过代码捕获和处理。
- <code v-pre>Throwable</code> 是所有错误和异常的基类，包含了 <code v-pre>Error</code> 和 <code v-pre>Exception</code>。 - <code v-pre>Error</code> 是由 JVM 抛出的错误，表示系统级错误，一般不由程序处理。 - <code v-pre>Exception</code> 是程序级错误，分为检查型异常（Checked Exception）和非检查型异常（Unchecked Exception）。</p>
<p>• <strong>异常的分类：检查型异常（Checked Exception）与非检查型异常（Unchecked Exception）</strong>
- <strong>检查型异常（Checked Exception）</strong>：继承自 <code v-pre>Exception</code>，编译器要求必须处理，常见如 <code v-pre>IOException</code>、<code v-pre>SQLException</code> 等。这类异常需要使用 <code v-pre>try-catch</code> 或 <code v-pre>throws</code> 来进行处理。 - <strong>非检查型异常（Unchecked Exception）</strong>：继承自 <code v-pre>RuntimeException</code>，编译器不强制要求捕获或声明，常见如 <code v-pre>NullPointerException</code>、<code v-pre>IndexOutOfBoundsException</code> 等。这类异常一般是编程错误引起的。</p>
<p>• <strong>RuntimeException 和 IOException 的区别与使用场景</strong>
- <strong>RuntimeException</strong>：通常表示程序逻辑错误，比如数组越界、空指针引用等，这些错误通常不需要显式处理。 - <strong>IOException</strong>：通常表示与 I/O 操作相关的错误，需要在程序中显式捕获。</p>
<hr>
<h2 id="_2-异常处理的基本语法" tabindex="-1"><a class="header-anchor" href="#_2-异常处理的基本语法"><span>2. <strong>异常处理的基本语法</strong></span></a></h2>
<p>• <strong>try-catch-finally 语句的基本用法</strong>
在 Java 中，<code v-pre>try-catch-finally</code> 用于捕获和处理异常： <code v-pre>java      try {          // 可能抛出异常的代码      } catch (ExceptionType e) {          // 异常处理代码      } finally {          // 总会执行的代码，常用于资源释放      }      </code> - <code v-pre>try</code> 块中放置可能发生异常的代码。 - <code v-pre>catch</code> 块用于捕获特定类型的异常。 - <code v-pre>finally</code> 块用于清理资源，不论是否发生异常，<code v-pre>finally</code> 块总是会被执行。</p>
<p>• <strong>throw 语句的使用：抛出异常</strong>
<code v-pre>throw</code> 语句用于主动抛出异常： <code v-pre>java      throw new ExceptionType(&quot;Error message&quot;);      </code> - 通过 <code v-pre>throw</code> 可以在程序中某些逻辑错误发生时手动抛出异常。 - 需要注意的是，抛出的异常必须是 <code v-pre>Throwable</code> 的子类。</p>
<p>• <strong>throws 语句的使用：声明异常</strong>
如果方法内部可能会抛出检查型异常，但方法本身并不处理这些异常，那么需要使用 <code v-pre>throws</code> 声明异常： <code v-pre>java      public void someMethod() throws IOException {          // 方法体      }      </code> - <code v-pre>throws</code> 用于方法声明中，告知调用者该方法可能抛出哪些异常。</p>
<p>• <strong>finally 语句的作用与执行顺序</strong>
<code v-pre>finally</code> 块总是会执行，除非在 JVM 层面发生致命错误或调用 <code v-pre>System.exit()</code>。无论是否发生异常，<code v-pre>finally</code> 都会执行，通常用于资源的释放（如关闭文件流、数据库连接等）。</p>
<hr>
<h2 id="_3-异常的捕获与传播" tabindex="-1"><a class="header-anchor" href="#_3-异常的捕获与传播"><span>3. <strong>异常的捕获与传播</strong></span></a></h2>
<p>• <strong>异常的捕获：多个 catch 与多重异常类型</strong>
在 <code v-pre>try-catch</code> 中，可以使用多个 <code v-pre>catch</code> 块来捕获不同类型的异常： <code v-pre>java      try {          // 可能抛出异常的代码      } catch (IOException e) {          // 处理 IOException      } catch (SQLException e) {          // 处理 SQLException      }      </code> - 还可以捕获多个异常类型并通过管道 <code v-pre>|</code> 分隔，简化代码： <code v-pre>java      catch (IOException | SQLException e) {          // 处理 IOException 和 SQLException      }      </code></p>
<p>• <strong>异常的传播：throws 的使用与方法声明</strong>
当方法抛出异常并且该异常无法在当前方法内处理时，方法会通过 <code v-pre>throws</code> 关键字将异常抛给调用者，由调用者处理： <code v-pre>java      public void someMethod() throws IOException {          // 可能抛出异常的代码      }      </code> - 调用此方法的代码必须捕获异常或声明继续传播。</p>
<p>• <strong>异常链：嵌套异常与根本原因的追踪</strong>
在捕获异常时，可以将一个异常作为另一个异常的原因： <code v-pre>java      try {          // 代码块      } catch (IOException e) {          throw new CustomException(&quot;Custom exception occurred&quot;, e);      }      </code> - 这样做可以保留原始异常的堆栈信息，方便调试。</p>
<hr>
<h1 id="第二部分-自定义异常与最佳实践-1" tabindex="-1"><a class="header-anchor" href="#第二部分-自定义异常与最佳实践-1"><span><strong>第二部分：自定义异常与最佳实践</strong></span></a></h1>
<h2 id="_1-自定义异常的创建" tabindex="-1"><a class="header-anchor" href="#_1-自定义异常的创建"><span>1. <strong>自定义异常的创建</strong></span></a></h2>
<p>• <strong>如何创建自定义异常类（继承 Exception 或 RuntimeException）</strong>
自定义异常可以通过继承 <code v-pre>Exception</code> 或 <code v-pre>RuntimeException</code> 创建： <code v-pre>java      public class MyCustomException extends Exception {          public MyCustomException(String message) {              super(message);          }      }      </code> - 自定义异常类可以添加构造方法、错误代码、消息等。</p>
<p>• <strong>自定义异常的设计哲学：包含错误代码、消息、异常栈信息</strong>
自定义异常通常包含错误码和详细消息，以帮助定位问题： <code v-pre>java      public class MyCustomException extends Exception {          private int errorCode;          public MyCustomException(String message, int errorCode) {              super(message);              this.errorCode = errorCode;          }          public int getErrorCode() {              return errorCode;          }      }      </code></p>
<p>• <strong>自定义异常的构造方法与属性</strong>
可以通过多个构造方法支持不同类型的异常传递： <code v-pre>java      public MyCustomException(String message, Throwable cause) {          super(message, cause);      }      </code></p>
<hr>
<h2 id="_2-异常处理的设计原则" tabindex="-1"><a class="header-anchor" href="#_2-异常处理的设计原则"><span>2. <strong>异常处理的设计原则</strong></span></a></h2>
<p>• <strong>不滥用异常：避免用异常控制流程</strong>
异常不应当用于控制程序的正常流程，而应该用于处理真正的错误情况。避免在循环或条件判断中使用异常来控制流程。</p>
<p>• <strong>只捕获必要的异常：局部捕获与全局捕获的区别</strong>
局部捕获异常能够使异常处理更精细，只捕获具体需要处理的异常类型，而全局捕获可能会忽略重要信息： <code v-pre>java      try {          // 代码      } catch (IOException e) {          // 处理 IOException      }      </code></p>
<p>• <strong>异常的语义化：明确捕获的异常含义</strong>
捕获异常时，应该清晰地理解异常的含义，并提供有意义的处理逻辑。避免简单的 <code v-pre>catch (Exception e)</code>。</p>
<hr>
<h2 id="_3-日志与异常的结合" tabindex="-1"><a class="header-anchor" href="#_3-日志与异常的结合"><span>3. <strong>日志与异常的结合</strong></span></a></h2>
<p>• <strong>异常日志的记录：使用日志框架（Log4j、SLF4J等）记录异常</strong>
记录日志能够帮助开发者快速定位问题，通过日志框架（如 Log4j、SLF4J）记录异常信息： <code v-pre>java      private static final Logger logger = LoggerFactory.getLogger(MyClass.class);      try {          // 代码      } catch (IOException e) {          logger.error(&quot;IOException occurred&quot;, e);      }      </code></p>
<p>• <strong>异常堆栈的打印与追踪</strong>
使用 <code v-pre>e.printStackTrace()</code> 可以打印堆栈信息，但在生产环境中，建议使用日志记录工具来获取堆栈信息。</p>
<p>• <strong>异常追踪工具的使用（如 Sentry）</strong>
使用像 Sentry 这样的工具，可以集中管理和追踪异常，帮助开发者及时发现问题并解决。</p>
<hr>
<h1 id="第三部分-高级异常处理技巧与优化-1" tabindex="-1"><a class="header-anchor" href="#第三部分-高级异常处理技巧与优化-1"><span><strong>第三部分：高级异常处理技巧与优化</strong></span></a></h1>
<h2 id="_1-多线程中的异常处理" tabindex="-1"><a class="header-anchor" href="#_1-多线程中的异常处理"><span>1. <strong>多线程中的异常处理</strong></span></a></h2>
<p>• <strong>线程的异常捕获与传递</strong>
在多线程环境下，主线程无法直接捕获子线程的异常。可以通过 <code v-pre>Thread.setUncaughtExceptionHandler</code> 设置全局异常处理： <code v-pre>java      Thread.currentThread().setUncaughtExceptionHandler((t, e) -&gt; {          // 处理线程异常      });      </code></p>
<p>• <strong>ExecutorService 的异常处理机制</strong>
使用 <code v-pre>ExecutorService</code> 执行任务时，如果任务抛出异常，可以通过 <code v-pre>Future.get()</code> 捕获： <code v-pre>java      Future&lt;?&gt; future = executor.submit(() -&gt; { throw new RuntimeException(); });      try {          future.get();      } catch (ExecutionException e) {          // 处理任务异常      }      </code></p>
<p>• <strong>Future 和 Callable 中异常的处理</strong>
<code v-pre>Callable</code> 返回的结果可以通过 <code v-pre>Future</code> 获取，若 <code v-pre>Callable</code> 任务抛出异常，<code v-pre>get()</code> 会包装在 <code v-pre>ExecutionException</code> 中。</p>
<hr>
<h2 id="_2-反射与异常处理" tabindex="-1"><a class="header-anchor" href="#_2-反射与异常处理"><span>2. <strong>反射与异常处理</strong></span></a></h2>
<p>• <strong>使用反射时的异常捕获与处理</strong>
反射在操作类、方法时，可能会抛出异常。应当处理这些异常并给出有意义的错误信息： <code v-pre>java      try {          Method method = clazz.getMethod(&quot;methodName&quot;);          method.invoke(object);      } catch (NoSuchMethodException | IllegalAccessException e) {          // 处理异常      }      </code></p>
<p>• <strong>如何避免反射中的异常对系统造成影响</strong>
避免在反射代码中直接抛出异常，尽量用适当的异常处理或回退机制处理。</p>
<hr>
<h2 id="_3-与框架的集成-spring-异常处理" tabindex="-1"><a class="header-anchor" href="#_3-与框架的集成-spring-异常处理"><span>3. <strong>与框架的集成：Spring 异常处理</strong></span></a></h2>
<p>• <strong>Spring 中的异常处理机制（如 @ControllerAdvice）</strong>
Spring 提供了全局异常处理机制，可以通过 <code v-pre>@ControllerAdvice</code> 注解集中处理异常： <code v-pre>java      @ControllerAdvice      public class GlobalExceptionHandler {          @ExceptionHandler(Exception.class)          public ResponseEntity&lt;String&gt; handleException(Exception e) {              return new ResponseEntity&lt;&gt;(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);          }      }      </code></p>
<p>• <strong>事务管理中的异常回滚与处理策略</strong>
Spring 的声明式事务支持对异常进行回滚处理，可以在 <code v-pre>@Transactional</code> 注解中定义回滚规则： <code v-pre>java      @Transactional(rollbackFor = SQLException.class)      public void someTransactionalMethod() {          // 代码      }      </code></p>
<p>• <strong>AOP 异常处理的实现</strong>
使用 AOP 可以集中处理各种切面中的异常，方便统一的异常日志和处理： <code v-pre>java      @Aspect      @Component      public class ExceptionAspect {          @AfterThrowing(value = &quot;execution(* com.example.*.*(..))&quot;, throwing = &quot;ex&quot;)          public void logException(Exception ex) {              // 异常日志记录          }      }      </code></p>
</div></template>


