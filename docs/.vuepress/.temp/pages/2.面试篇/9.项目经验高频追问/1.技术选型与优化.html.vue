<template><div><hr>
<p><strong>问：进行技术选型时应考虑哪些核心维度？</strong></p>
<p>答：技术选型应综合考虑以下几个维度：</p>
<ul>
<li><strong>业务场景契合度</strong>：技术是否能满足当前及未来业务需求，是否支持可扩展性和稳定性。</li>
<li><strong>团队技术栈熟悉度</strong>：选型应兼顾团队当前能力，避免学习成本过高影响效率。</li>
<li><strong>社区活跃度与生态成熟度</strong>：选型应倾向于主流、活跃、更新频繁的技术，有利于问题排查和社区支持。</li>
<li><strong>性能表现</strong>：技术在高并发、高吞吐、低延迟等指标上的能力是否满足目标要求。</li>
<li><strong>可维护性与可测试性</strong>：架构是否清晰，是否支持分层解耦，便于测试和维护。</li>
<li><strong>与现有系统兼容性</strong>：是否易于集成现有系统，是否能复用已有组件。</li>
<li><strong>学习曲线与人员成本</strong>：技术是否具备良好的文档与培训资源，新人是否易于上手。</li>
<li><strong>商业支持与许可证限制</strong>：部分开源技术存在许可证要求或商业版本限制，需提前评估。</li>
</ul>
<hr>
<p><strong>问：在微服务架构中选择 RPC 框架时，如何进行技术选型？</strong></p>
<p>答：选择 RPC 框架时主要考虑以下方面：</p>
<ul>
<li><strong>通信协议</strong>：是否支持高效的二进制协议（如 gRPC 的 HTTP/2 vs Dubbo 的自定义协议）。</li>
<li><strong>序列化机制</strong>：Protobuf、Hessian、JSON 等影响传输效率。</li>
<li><strong>服务治理能力</strong>：如服务注册发现、负载均衡、熔断限流、服务降级等。</li>
<li><strong>异构语言支持</strong>：是否支持跨语言通信（如 gRPC 多语言，Dubbo 原生 Java）。</li>
<li><strong>生态与集成能力</strong>：与 Spring Cloud、K8s、Nacos 等中间件的集成是否成熟。</li>
<li><strong>调试与监控能力</strong>：是否支持链路追踪、调用链监控、日志追踪等功能。</li>
<li><strong>性能表现</strong>：在不同并发级别、网络延迟场景下的性能测试结果。</li>
<li><strong>安全机制</strong>：是否支持认证、加密等安全协议。</li>
</ul>
<hr>
<p><strong>问：技术选型后发现不适配项目，该如何优化或替换？</strong></p>
<p>答：</p>
<ul>
<li><strong>成本评估</strong>：权衡替换带来的收益与成本（开发时间、人员培训、业务影响等）。</li>
<li><strong>渐进式替换</strong>：采用双轨制策略（新旧系统并存），逐步迁移功能模块。</li>
<li><strong>兼容适配层</strong>：设计接口适配层，减少对业务层的改动。</li>
<li><strong>聚焦核心问题</strong>：如性能瓶颈点、可维护性差、扩展能力不足等，明确优化目标。</li>
<li><strong>建立技术预选机制</strong>：下一次避免盲目选型，建立技术验证、PoC 和技术评审流程。</li>
</ul>
<hr>
<p><strong>问：系统性能优化的一般流程是什么？</strong></p>
<p>答：系统性能优化可分为以下流程：</p>
<ol>
<li><strong>性能指标定义</strong>：明确目标，如 QPS、TP99、RT、系统负载等。</li>
<li><strong>性能瓶颈定位</strong>：使用工具如 JProfiler、Arthas、Skywalking 进行分析。</li>
<li><strong>问题归类与分层分析</strong>：从 CPU、内存、GC、数据库、网络、缓存层分层查找。</li>
<li><strong>优化方案设计</strong>：基于数据分析优化线程池、缓存策略、数据库索引等。</li>
<li><strong>验证与压测</strong>：使用 JMeter、Locust、wrk 等工具验证效果。</li>
<li><strong>回归测试与上线</strong>：评估副作用并逐步上线优化版本。</li>
</ol>
<hr>
<p><strong>问：常见的性能优化点有哪些？</strong></p>
<p>答：</p>
<ul>
<li><strong>数据库优化</strong>：如合理使用索引、避免 N+1 查询、分库分表、SQL 缓存。</li>
<li><strong>缓存优化</strong>：使用本地缓存（如 Caffeine）、分布式缓存（如 Redis），合理设置 TTL。</li>
<li><strong>异步化处理</strong>：将不影响主流程的任务（如日志记录、消息发送）改为异步执行。</li>
<li><strong>线程池优化</strong>：根据业务模型合理配置核心线程数、队列容量，避免线程创建频繁。</li>
<li><strong>连接池优化</strong>：如 HikariCP 连接池调优，减少连接创建与关闭的开销。</li>
<li><strong>GC 调优</strong>：通过 JVM 参数调整 GC 策略，减少 STW（Stop-The-World）时间。</li>
<li><strong>限流与熔断</strong>：避免雪崩式失败，提升系统鲁棒性。</li>
</ul>
<hr>
<p><strong>问：缓存穿透、击穿与雪崩问题如何应对？</strong></p>
<p>答：</p>
<ul>
<li><strong>缓存穿透</strong>：查询的数据不存在，数据库每次都被访问。应使用布隆过滤器或缓存空值。</li>
<li><strong>缓存击穿</strong>：热点数据刚好过期，多个请求同时访问 DB。应使用互斥锁或提前预热。</li>
<li><strong>缓存雪崩</strong>：大量缓存同时失效，导致数据库压力骤增。应设置不同 TTL 或使用多级缓存。</li>
</ul>
<hr>
<p><strong>问：技术选型后如何衡量效果是否达标？</strong></p>
<p>答：</p>
<ul>
<li><strong>性能指标是否改善</strong>：如 QPS 提升、响应时间降低、GC 时间下降等。</li>
<li><strong>系统稳定性是否增强</strong>：是否解决了原有的稳定性或扩展性问题。</li>
<li><strong>团队掌控力是否提高</strong>：是否减少了研发成本，提高了开发效率。</li>
<li><strong>用户体验是否改善</strong>：如访问速度提升、错误率下降。</li>
<li><strong>维护成本是否下降</strong>：是否减少了系统复杂性、提升了可观测性。</li>
</ul>
<hr>
<p><strong>问：如何在技术选型中平衡前沿性与稳定性？</strong></p>
<p>答：</p>
<ul>
<li><strong>验证成熟度</strong>：参考技术的版本迭代历史、重大 bug 数量、活跃社区。</li>
<li><strong>对比替代方案</strong>：是否有更成熟、可靠但略旧的方案能达到类似效果。</li>
<li><strong>小范围验证</strong>：新技术先应用于非核心模块，观察效果后再推广。</li>
<li><strong>灰度发布与可回滚性</strong>：降低选型失败带来的风险。</li>
</ul>
<hr>
</div></template>


