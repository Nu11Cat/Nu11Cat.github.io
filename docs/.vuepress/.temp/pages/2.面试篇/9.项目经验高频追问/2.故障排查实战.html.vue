<template><div><hr>
<p><strong>问：线上系统突然响应变慢，如何排查性能瓶颈？</strong></p>
<p>答：排查性能瓶颈应采取系统化的方法：</p>
<ul>
<li><strong>确认问题现象</strong>：从监控系统中查看请求响应时间是否异常，是否集中在某个接口或全局。</li>
<li><strong>分析系统负载</strong>：通过 top、vmstat、iostat 等命令检查 CPU、内存、磁盘 IO、网络是否存在瓶颈。</li>
<li><strong>线程状态检查</strong>：使用 jstack 查看是否存在大量线程处于 BLOCKED、WAITING 状态，排查是否有死锁或锁竞争。</li>
<li><strong>GC 行为分析</strong>：通过 jstat 或 GC 日志查看是否存在频繁 Full GC 或 GC 时间过长，是否为内存回收问题。</li>
<li><strong>数据库压力排查</strong>：查看慢 SQL 日志、数据库连接数、执行时间，是否存在连接泄漏、表锁、索引缺失等问题。</li>
<li><strong>第三方依赖排查</strong>：如调用外部服务、消息队列、缓存是否出现延迟、失败重试等异常。</li>
<li><strong>逐级定位代码热点</strong>：可使用 Arthas trace/watch/monitor 观察函数调用耗时，定位慢点。</li>
</ul>
<hr>
<p><strong>问：如何处理线程死锁问题？</strong></p>
<p>答：</p>
<ul>
<li><strong>识别死锁</strong>：使用 jstack 工具导出线程栈，搜索是否有 <code v-pre>Found one Java-level deadlock</code> 提示。</li>
<li><strong>分析死锁原因</strong>：通常是两个线程互相等待对方持有的锁，形成循环等待。</li>
<li><strong>常见场景</strong>：多个 synchronized 嵌套、多个 ReentrantLock 顺序不一致、多个线程间共享资源交错加锁。</li>
<li><strong>解决方案</strong>：
<ul>
<li>统一加锁顺序，避免循环等待；</li>
<li>使用 <code v-pre>tryLock()</code> 避免永久阻塞；</li>
<li>引入超时机制避免无限等待；</li>
<li>审查业务逻辑中锁的粒度，降低锁冲突。</li>
</ul>
</li>
</ul>
<hr>
<p><strong>问：如何排查频繁 Full GC 的原因？</strong></p>
<p>答：</p>
<ul>
<li><strong>检查堆内存设置</strong>：是否堆过小（如 -Xmx 设置太低），导致频繁 Full GC。</li>
<li><strong>分析对象生命周期</strong>：是否存在大量对象被频繁创建且未被及时释放，尤其是大对象进入老年代。</li>
<li><strong>监控 GC 日志</strong>：使用 -Xlog:gc* 或 GCViewer 工具分析 GC 次数、耗时、晋升频率。</li>
<li><strong>查找内存泄漏</strong>：使用 MAT、VisualVM 等工具分析堆 dump，识别无法被回收的大对象或强引用链。</li>
<li><strong>排查缓存滥用</strong>：是否使用了全局静态缓存但未设置容量限制或 TTL。</li>
</ul>
<hr>
<p><strong>问：如何定位接口响应慢的问题？</strong></p>
<p>答：</p>
<ul>
<li><strong>从日志入手</strong>：查看 access log、trace log 是否记录请求时间、参数、耗时。</li>
<li><strong>使用链路追踪系统</strong>：如 SkyWalking、Zipkin、Jaeger 追踪接口调用链，定位慢在哪一层。</li>
<li><strong>排查依赖资源</strong>：如数据库、Redis、HTTP 第三方服务等调用耗时。</li>
<li><strong>逐层下钻</strong>：
<ul>
<li>控制层是否有数据转换、权限处理耗时；</li>
<li>服务层是否有业务逻辑复杂度高；</li>
<li>DAO 层是否有 N+1 查询、未命中索引、锁等待；</li>
</ul>
</li>
<li><strong>代码级别分析</strong>：结合 Arthas <code v-pre>trace</code> 或 <code v-pre>profiler</code> 工具，查看具体哪个方法调用慢。</li>
</ul>
<hr>
<p><strong>问：服务频繁抛出 <code v-pre>OutOfMemoryError</code>，如何排查？</strong></p>
<p>答：</p>
<ul>
<li><strong>明确 OOM 类型</strong>：是 Java heap space、Metaspace、Direct buffer 还是 GC overhead limit exceeded。</li>
<li><strong>查看 JVM 参数</strong>：确认堆/非堆大小是否设置合理，如 Metaspace 太小易导致类加载溢出。</li>
<li><strong>收集堆转储</strong>：设置 -XX:+HeapDumpOnOutOfMemoryError 并分析 .hprof 文件，查看哪些类实例占用大量内存。</li>
<li><strong>排查泄漏来源</strong>：
<ul>
<li>ThreadLocal 未清理；</li>
<li>静态集合无限增长；</li>
<li>缓存未设置上限；</li>
<li>第三方连接池资源未释放。</li>
</ul>
</li>
<li><strong>内存调优</strong>：如优化缓存策略、缩短生命周期、减少对象创建。</li>
</ul>
<hr>
<p><strong>问：如何排查接口高并发下的请求超时或失败问题？</strong></p>
<p>答：</p>
<ul>
<li><strong>先看限流熔断</strong>：是否触发了 Hystrix、Sentinel、Resilience4j 等降级策略。</li>
<li><strong>排查线程池耗尽</strong>：服务端是否线程池队列满，触发拒绝策略。</li>
<li><strong>排查数据库连接耗尽</strong>：连接池是否配置过小，连接泄露导致新请求无连接可用。</li>
<li><strong>查看网络栈指标</strong>：是否存在网络丢包、RTT 增高，导致 Socket 超时。</li>
<li><strong>查看服务端 GC 行为</strong>：是否因 Full GC 暂停导致请求超时。</li>
<li><strong>综合压力测试验证瓶颈</strong>：使用 JMeter、wrk 等模拟高并发重现问题。</li>
</ul>
<hr>
<p><strong>问：系统频繁重启，如何定位问题原因？</strong></p>
<p>答：</p>
<ul>
<li><strong>查看日志</strong>：排查是否有 <code v-pre>OutOfMemoryError</code>、<code v-pre>Fatal Error</code> 或 Spring 容器初始化失败等致命错误。</li>
<li><strong>排查容器/平台</strong>：如 Kubernetes 是否因健康检查失败触发自动重启。</li>
<li><strong>系统资源检查</strong>：如进程占用 CPU 或内存过高被操作系统 kill（dmesg 查看 OOM Killer）。</li>
<li><strong>查看配置中心/依赖服务</strong>：初始化依赖服务不可用导致启动失败。</li>
</ul>
<hr>
<p><strong>问：日志排查时有哪些常见误区？</strong></p>
<p>答：</p>
<ul>
<li><strong>无结构化日志</strong>：不使用统一格式记录请求 ID、用户信息，导致无法串联调用链。</li>
<li><strong>日志级别不合理</strong>：调试信息用 info，错误信息未用 error，导致日志信噪比低。</li>
<li><strong>日志输出不完整</strong>：异常堆栈只记录 message，未输出 stack trace。</li>
<li><strong>忽略日志量与性能的权衡</strong>：频繁记录大日志会影响系统性能甚至触发磁盘写满。</li>
</ul>
<hr>
<p><strong>问：如何构建可观测性强的系统以便故障快速定位？</strong></p>
<p>答：</p>
<ul>
<li><strong>日志完善</strong>：统一日志格式，引入 traceId，配合链路追踪。</li>
<li><strong>指标监控</strong>：使用 Prometheus + Grafana，暴露 JVM、线程池、GC、业务指标。</li>
<li><strong>链路追踪</strong>：集成 SkyWalking、Zipkin 实现调用链追踪。</li>
<li><strong>告警系统</strong>：构建实时告警系统，基于异常率、RT、QPS、系统资源设定告警规则。</li>
<li><strong>灰度与回滚机制</strong>：避免大规模影响，快速定位问题版本。</li>
<li><strong>自动诊断脚本</strong>：如一键收集 jstack、GC 日志、容器日志等信息。</li>
</ul>
</div></template>


