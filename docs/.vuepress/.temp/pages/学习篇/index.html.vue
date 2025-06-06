<template><div><p>本模块是我构建整个站点的核心部分，旨在系统性梳理 Java 后端开发所需的关键知识点，从基础语言特性，到主流框架、分布式、高并发、架构设计、云原生等全链路内容，覆盖后端开发成长全过程。</p>
<blockquote>
<p>🎯 目标是“构建体系”，而非“堆积笔记”。</p>
</blockquote>
<p>内容分为九大模块，循序渐进，既可查阅，也可精读，适合个人长期学习与复习使用，也欢迎其他学习者参考借鉴。</p>
<hr>
<h2 id="🧱-模块结构一览" tabindex="-1"><a class="header-anchor" href="#🧱-模块结构一览"><span>🧱 模块结构一览</span></a></h2>
<h3 id="_1️⃣-java基础与核心概念" tabindex="-1"><a class="header-anchor" href="#_1️⃣-java基础与核心概念"><span>1️⃣ Java基础与核心概念</span></a></h3>
<blockquote>
<p>语言层面基础 &amp; 核心原理构建</p>
</blockquote>
<ul>
<li>面向对象、异常处理、泛型、注解</li>
<li>集合框架源码精读</li>
<li>多线程与并发模型</li>
<li>JVM 内存模型、垃圾回收、类加载机制</li>
</ul>
<p>👉 适合打基础 + 夯实语言底层能力</p>
<hr>
<h3 id="_2️⃣-spring生态系统" tabindex="-1"><a class="header-anchor" href="#_2️⃣-spring生态系统"><span>2️⃣ Spring生态系统</span></a></h3>
<blockquote>
<p>从 Spring 基础到 Boot / Cloud 全家桶</p>
</blockquote>
<ul>
<li>IOC/AOP 核心原理</li>
<li>Spring Boot 自动配置机制</li>
<li>Spring MVC 工作流程</li>
<li>Spring Cloud 微服务组件（注册中心、配置中心、网关等）</li>
</ul>
<p>👉 适合理解主流后端框架原理与应用</p>
<hr>
<h3 id="_3️⃣-数据库与持久化" tabindex="-1"><a class="header-anchor" href="#_3️⃣-数据库与持久化"><span>3️⃣ 数据库与持久化</span></a></h3>
<blockquote>
<p>数据存储、查询与缓存基础</p>
</blockquote>
<ul>
<li>MySQL：索引原理、执行计划、事务隔离、性能调优</li>
<li>JDBC、ORM（MyBatis / JPA）</li>
<li>Redis 常用数据结构与高频应用场景</li>
<li>数据一致性、分库分表、缓存一致性问题</li>
</ul>
<p>👉 适合理解数据层性能与设计策略</p>
<hr>
<h3 id="_4️⃣-web-开发与网络编程" tabindex="-1"><a class="header-anchor" href="#_4️⃣-web-开发与网络编程"><span>4️⃣ Web 开发与网络编程</span></a></h3>
<blockquote>
<p>后端与前端之间的桥梁</p>
</blockquote>
<ul>
<li>HTTP 协议、状态码、报文结构</li>
<li>Cookie、Session、Token 等认证机制</li>
<li>Servlet 生命周期</li>
<li>WebSocket、RESTful API 设计规范</li>
</ul>
<p>👉 适合打通服务与客户端之间的连接逻辑</p>
<hr>
<h3 id="_5️⃣-分布式系统与微服务" tabindex="-1"><a class="header-anchor" href="#_5️⃣-分布式系统与微服务"><span>5️⃣ 分布式系统与微服务</span></a></h3>
<blockquote>
<p>架构演进与系统拆分思维</p>
</blockquote>
<ul>
<li>分布式基础理论（CAP、BASE）</li>
<li>服务注册与发现、配置中心、链路追踪</li>
<li>微服务拆分原则与接口设计</li>
<li>服务间通信：REST、RPC、消息队列（Kafka / RabbitMQ）</li>
</ul>
<p>👉 适合拓展后端系统设计格局</p>
<hr>
<h3 id="_6️⃣-缓存与高并发优化" tabindex="-1"><a class="header-anchor" href="#_6️⃣-缓存与高并发优化"><span>6️⃣ 缓存与高并发优化</span></a></h3>
<blockquote>
<p>性能优化的“重武器”</p>
</blockquote>
<ul>
<li>本地缓存 vs 分布式缓存</li>
<li>缓存穿透、击穿、雪崩及其应对</li>
<li>限流、熔断、降级机制（Sentinel、Hystrix 等）</li>
<li>并发编程与线程池调优</li>
</ul>
<p>👉 适合面向性能问题定位与优化实践</p>
<hr>
<h3 id="_7️⃣-系统安全与合规" tabindex="-1"><a class="header-anchor" href="#_7️⃣-系统安全与合规"><span>7️⃣ 系统安全与合规</span></a></h3>
<blockquote>
<p>构建可上线的真实服务所必备</p>
</blockquote>
<ul>
<li>常见 Web 安全漏洞：XSS、CSRF、SQL 注入等</li>
<li>鉴权与权限控制（JWT / OAuth2）</li>
<li>HTTPS / 加密协议</li>
<li>合规性设计（日志、隐私数据处理）</li>
</ul>
<p>👉 适合避免“能跑起来但不安全”的系统</p>
<hr>
<h3 id="_8️⃣-云原生与-devops" tabindex="-1"><a class="header-anchor" href="#_8️⃣-云原生与-devops"><span>8️⃣ 云原生与 DevOps</span></a></h3>
<blockquote>
<p>运维能力逐渐成为后端的必修课</p>
</blockquote>
<ul>
<li>Docker 基础与镜像构建</li>
<li>Kubernetes 核心概念与 YAML 编排</li>
<li>CI/CD 流程：GitHub Actions / Jenkins</li>
<li>云服务平台（阿里云、AWS、GCP 简析）</li>
</ul>
<p>👉 适合了解从代码 → 生产的完整链路</p>
<hr>
<h3 id="_9️⃣-架构设计与大厂实战" tabindex="-1"><a class="header-anchor" href="#_9️⃣-架构设计与大厂实战"><span>9️⃣ 架构设计与大厂实战</span></a></h3>
<blockquote>
<p>从“会写代码”到“理解系统”的跃迁</p>
</blockquote>
<ul>
<li>系统设计入门：高可用、可扩展、可维护</li>
<li>常见架构模式：分层、CQRS、DDD 简介</li>
<li>真实大厂题型场景复盘</li>
<li>架构演进中的权衡分析</li>
</ul>
<p>👉 适合面试冲刺 &amp; 认知提升</p>
<hr>
<h2 id="✅-使用建议" tabindex="-1"><a class="header-anchor" href="#✅-使用建议"><span>✅ 使用建议</span></a></h2>
<ul>
<li>按模块学习：结合自己当前阶段有针对性地选择；</li>
<li>搜索回顾：复习时按关键词快速定位；</li>
<li>深入探索：每个模块内都配有图示、案例、代码、笔记，适合精读；</li>
<li>实战结合：建议与项目实践、刷题同步推进，形成内化理解。</li>
</ul>
<hr>
<h2 id="🧭-推荐人群" tabindex="-1"><a class="header-anchor" href="#🧭-推荐人群"><span>🧭 推荐人群</span></a></h2>
<ul>
<li>想建立系统知识体系的 Java 后端学习者</li>
<li>想突破瓶颈、进阶为高级工程师的开发者</li>
<li>正在备战后端面试的同学</li>
<li>希望提升技术深度与认知视野的技术人</li>
</ul>
<hr>
<blockquote>
<p>知识无边，但需要结构。愿这份体系，能帮你少走一些弯路。</p>
</blockquote>
</div></template>


