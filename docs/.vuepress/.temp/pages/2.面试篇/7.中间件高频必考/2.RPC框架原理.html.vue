<template><div><hr>
<p><strong>问：什么是 RPC？它的核心目的是什么？</strong></p>
<p>答：RPC（Remote Procedure Call，远程过程调用）是一种跨进程通信机制，允许调用远程服务器上的函数/方法，就像调用本地方法一样。它的核心目的是<strong>隐藏网络通信细节，实现系统间解耦与服务化调用</strong>，是微服务架构中的基础能力。</p>
<hr>
<p><strong>问：RPC 框架的核心组成有哪些？</strong></p>
<p>答：典型 RPC 框架包含以下几个核心组件：</p>
<ul>
<li><strong>服务注册中心</strong>：维护服务提供者与消费者的映射关系，支持动态上下线（如 ZooKeeper、Nacos）。</li>
<li><strong>服务提供者（Provider）</strong>：发布远程服务，处理来自消费者的请求。</li>
<li><strong>服务消费者（Consumer）</strong>：调用远程服务的客户端，通过代理发起请求。</li>
<li><strong>通信模块</strong>：负责网络协议、序列化与传输（如 Netty）。</li>
<li><strong>序列化模块</strong>：将方法参数和返回值转为字节流进行传输（如 Hessian、Protobuf）。</li>
<li><strong>负载均衡器</strong>：从多个提供者中选择一个调用目标（如随机、轮询、最少连接等策略）。</li>
</ul>
<hr>
<p><strong>问：RPC 与 HTTP 接口调用有何区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>通信协议</strong>：RPC 使用二进制私有协议，性能更高；HTTP 基于文本协议，兼容性好但效率较低。</li>
<li><strong>调用方式</strong>：RPC 支持透明调用（本地代理），HTTP 需要构造 URL 与参数。</li>
<li><strong>序列化方式</strong>：RPC 支持高效的二进制序列化（如 Protobuf），HTTP 通常使用 JSON。</li>
<li><strong>强类型支持</strong>：RPC 通常是强类型调用（IDL 定义），HTTP 是弱类型交互。</li>
</ul>
<hr>
<p><strong>问：Dubbo 是如何实现服务调用的？</strong></p>
<p>答：Dubbo 的服务调用过程如下：</p>
<ol>
<li><strong>服务暴露</strong>：服务提供者启动时将服务注册到注册中心（如 ZooKeeper）。</li>
<li><strong>服务订阅</strong>：服务消费者启动时订阅需要调用的服务地址，并本地缓存。</li>
<li><strong>代理调用</strong>：消费者调用接口时，实际通过代理对象将请求转化为远程调用。</li>
<li><strong>负载均衡 + 路由</strong>：Dubbo 客户端选择合适的提供者进行调用。</li>
<li><strong>网络通信</strong>：通过 Netty 框架传输数据，使用 Dubbo 私有协议 + Hessian 序列化。</li>
<li><strong>服务返回</strong>：服务端处理后将结果返回，客户端接收并解析为 Java 对象。</li>
</ol>
<hr>
<p><strong>问：Dubbo 如何实现异步调用？</strong></p>
<p>答：Dubbo 支持异步调用方式，调用接口时不会阻塞主线程，而是返回一个 <code v-pre>Future</code> 或 <code v-pre>CompletableFuture</code> 对象，支持回调函数。使用 <code v-pre>setAsync(true)</code> 标注接口方法即可开启异步特性。这对于高并发下提升吞吐量非常关键。</p>
<hr>
<p><strong>问：RPC 中如何实现序列化与反序列化？常见方式有哪些？</strong></p>
<p>答：</p>
<ul>
<li><strong>序列化</strong>是将方法参数、返回值等对象转换为可传输的字节流；</li>
<li><strong>反序列化</strong>是接收字节流后恢复为原始对象。</li>
</ul>
<p>常见序列化协议：</p>
<ul>
<li><strong>Java 自带序列化</strong>：性能差，占用空间大。</li>
<li><strong>Hessian</strong>：跨语言二进制协议，Dubbo 默认使用，兼容性好。</li>
<li><strong>Protobuf</strong>：Google 提出，性能高、体积小，广泛用于 gRPC。</li>
<li><strong>JSON/XML</strong>：易读，适合调试，但性能较差。</li>
</ul>
<p>选择依据：性能、跨语言能力、传输体积、安全性等。</p>
<hr>
<p><strong>问：RPC 框架如何实现服务注册与发现？</strong></p>
<p>答：</p>
<ul>
<li><strong>服务注册</strong>：服务提供者在启动时将自身服务的 IP、端口、服务名等信息注册到注册中心。</li>
<li><strong>服务发现</strong>：消费者启动时向注册中心订阅服务变化，并本地缓存可用服务列表。</li>
<li><strong>动态感知</strong>：当服务上下线或配置变更时，注册中心会通知消费者刷新缓存。</li>
</ul>
<p>常见注册中心：ZooKeeper、Nacos、Consul、Etcd。</p>
<hr>
<p><strong>问：如何在 RPC 中实现负载均衡？Dubbo 提供了哪些策略？</strong></p>
<p>答：RPC 中负载均衡用于在多个服务实例中选择合适目标以提高可用性与响应速度。Dubbo 提供的策略包括：</p>
<ul>
<li><strong>随机（Random）</strong>：默认策略，简单高效。</li>
<li><strong>轮询（RoundRobin）</strong>：依次调用，不考虑处理能力差异。</li>
<li><strong>最少活跃调用数（LeastActive）</strong>：优先选择当前处理请求最少的服务。</li>
<li><strong>一致性哈希（ConsistentHash）</strong>：同一参数（如 userId）总是路由到同一节点，常用于缓存绑定等场景。</li>
</ul>
<hr>
<p><strong>问：gRPC 的核心原理是什么？</strong></p>
<p>答：gRPC 是 Google 开源的高性能跨语言 RPC 框架，基于 HTTP/2 + Protobuf，核心原理包括：</p>
<ul>
<li><strong>IDL 定义接口</strong>：使用 <code v-pre>.proto</code> 文件定义服务与消息结构。</li>
<li><strong>自动代码生成</strong>：根据 proto 文件生成服务端和客户端代码。</li>
<li><strong>双向流式通信</strong>：基于 HTTP/2 实现多路复用、流控、头部压缩等特性。</li>
<li><strong>高效序列化</strong>：使用 Protobuf 极大提升性能。</li>
<li><strong>支持多语言</strong>：支持 Java、Go、Python、C++ 等主流语言。</li>
</ul>
<hr>
<p><strong>问：RPC 框架如何保证服务的高可用性？</strong></p>
<p>答：</p>
<ul>
<li><strong>服务注册发现机制</strong>：避免 IP 写死，支持动态感知服务变更。</li>
<li><strong>负载均衡机制</strong>：多实例部署 + 负载均衡降低单点压力。</li>
<li><strong>服务容错机制</strong>：Dubbo 提供 failover、failfast、failsafe 等策略应对调用失败。</li>
<li><strong>连接池与重试机制</strong>：优化网络连接复用，异常时重试调用。</li>
<li><strong>限流与熔断降级</strong>：结合 Sentinel、Hystrix 控制流量、避免雪崩。</li>
<li><strong>链路追踪与监控</strong>：配合 Zipkin、SkyWalking 实现调用链追踪与性能瓶颈识别。</li>
</ul>
<hr>
<p><strong>问：RPC 的缺点或风险有哪些？</strong></p>
<p>答：</p>
<ul>
<li><strong>部署复杂度高</strong>：依赖注册中心、序列化、网络传输等多个组件。</li>
<li><strong>排查困难</strong>：出错时难以快速定位调用链问题。</li>
<li><strong>测试困难</strong>：需要模拟远程环境，无法简单单测。</li>
<li><strong>跨服务异常传播问题</strong>：远程异常栈信息丢失，需特别处理。</li>
<li><strong>不适合高频次短请求</strong>：网络开销与序列化反序列化代价高。</li>
</ul>
</div></template>


