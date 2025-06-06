<template><div><hr>
<p><strong>问：TCP 协议的核心特性有哪些？</strong></p>
<p>答：TCP（Transmission Control Protocol）是一种面向连接、可靠传输的传输层协议，其核心特性包括：</p>
<ul>
<li><strong>面向连接</strong>：通信前需三次握手建立连接。</li>
<li><strong>可靠传输</strong>：通过确认应答（ACK）、重传机制、序列号等保证数据不丢失、不乱序、不重复。</li>
<li><strong>有序传输</strong>：接收方按序列号重组数据，保证字节流顺序一致。</li>
<li><strong>全双工通信</strong>：双方可同时读写数据，互不影响。</li>
<li><strong>流量控制</strong>：通过滑动窗口机制避免发送方发送速度过快。</li>
<li><strong>拥塞控制</strong>：通过慢启动、拥塞避免等算法，调节网络负载。</li>
</ul>
<hr>
<p><strong>问：TCP 三次握手的过程是什么？为什么需要三次？</strong></p>
<p>答：三次握手的过程：</p>
<ol>
<li><strong>客户端 → 服务端：SYN</strong>（同步序列号）报文，请求建立连接；</li>
<li><strong>服务端 → 客户端：SYN + ACK</strong> 报文，确认并回应连接请求；</li>
<li><strong>客户端 → 服务端：ACK</strong> 报文，确认接收服务端回应，连接建立。</li>
</ol>
<p>三次的目的：</p>
<ul>
<li>第一次确认客户端发送能力；</li>
<li>第二次确认服务端接收并具备响应能力；</li>
<li>第三次确认客户端接收服务端响应，连接建立双向可通信。</li>
</ul>
<hr>
<p><strong>问：TCP 四次挥手的过程是什么？为什么需要四次？</strong></p>
<p>答：四次挥手的过程：</p>
<ol>
<li><strong>客户端发送 FIN</strong> 报文，表示数据发送完毕，请求断开连接；</li>
<li><strong>服务端返回 ACK</strong>，表示收到断开请求；</li>
<li><strong>服务端发送 FIN</strong> 报文，请求自身断开；</li>
<li><strong>客户端返回 ACK</strong>，连接彻底关闭。</li>
</ol>
<p>原因是 TCP 是全双工通信，连接断开需要双方都发送 FIN 并确认 ACK，拆分为四步完成。</p>
<hr>
<p><strong>问：TIME_WAIT 状态的作用是什么？为什么必须等 2 倍 MSL？</strong></p>
<p>答：TIME_WAIT 是连接断开后客户端保留的状态，持续时间为 2 倍的最大报文生存时间（MSL）。作用包括：</p>
<ul>
<li><strong>确保对方收到 ACK</strong>：最后一个 ACK 报文可能丢失，对方会重发 FIN，TIME_WAIT 状态可接收并响应；</li>
<li><strong>避免历史报文污染新连接</strong>：老连接的报文在网络中滞留，必须等待其过期，避免影响下一次相同端口连接。</li>
</ul>
<hr>
<p><strong>问：粘包与拆包问题是什么？如何解决？</strong></p>
<p>答：TCP 是流式协议，不区分消息边界，导致多个消息在一次接收中合并（粘包）或一个消息被分割（拆包）。解决方法：</p>
<ul>
<li><strong>定长消息</strong>：固定长度数据包，接收方按长度解析。</li>
<li><strong>分隔符</strong>：使用特定字符（如 <code v-pre>\n</code>）标识消息结束。</li>
<li><strong>消息头部带长度</strong>：包头标识正文长度，按长度读取。</li>
<li><strong>更高级的协议</strong>：如 HTTP/2、Netty 提供编解码器机制解决。</li>
</ul>
<hr>
<p><strong>问：TCP 的滑动窗口机制原理是什么？</strong></p>
<p>答：滑动窗口机制用于<strong>实现流量控制</strong>，防止发送端过快发送数据：</p>
<ul>
<li><strong>窗口大小</strong>由接收端决定，表示它还能接收的字节数。</li>
<li>发送方仅发送窗口范围内的数据。</li>
<li>每当接收方确认收到数据，窗口向前滑动。</li>
<li>若接收方处理缓慢，可将窗口缩小，甚至设为 0（通知暂停发送）。</li>
</ul>
<hr>
<p><strong>问：TCP 拥塞控制机制有哪些？</strong></p>
<p>答：TCP 拥塞控制通过调节发送速率来适应网络状况，主要算法包括：</p>
<ol>
<li><strong>慢启动</strong>：初始拥塞窗口小，指数级增长。</li>
<li><strong>拥塞避免</strong>：窗口达到阈值后线性增长。</li>
<li><strong>快重传</strong>：收到多个重复 ACK 即推测丢包，提前重传。</li>
<li><strong>快恢复</strong>：部分丢包时避免回退到慢启动，快速恢复传输能力。</li>
</ol>
<p>这些算法共同减少网络拥堵、提升传输效率。</p>
<hr>
<p><strong>问：Java 中常见的 IO 模型有哪些？</strong></p>
<p>答：Java 提供的 I/O 模型分为以下几种：</p>
<ol>
<li><strong>BIO（Blocking IO）</strong>：
<ul>
<li>每个请求对应一个线程；</li>
<li>线程阻塞在 read/write 操作；</li>
<li>实现简单但性能差，适合小并发场景。</li>
</ul>
</li>
<li><strong>NIO（Non-blocking IO）</strong>：
<ul>
<li>基于通道（Channel）和缓冲区（Buffer）；</li>
<li>Selector 轮询通道状态，无需线程阻塞；</li>
<li>可单线程处理多个连接，适合中高并发场景。</li>
</ul>
</li>
<li><strong>AIO（Asynchronous IO）</strong>：
<ul>
<li>JDK 7 引入，基于操作系统支持的异步 IO；</li>
<li>提供回调机制，真正异步通知；</li>
<li>适用于对延迟敏感、高吞吐的场景，但实现复杂。</li>
</ul>
</li>
</ol>
<hr>
<p><strong>问：Java NIO 的核心组件有哪些？各自作用是什么？</strong></p>
<p>答：</p>
<ul>
<li><strong>Channel</strong>：类似传统 IO 的 Stream，是双向、非阻塞的数据通道。</li>
<li><strong>Buffer</strong>：数据读写的内存容器，NIO 不直接读写 Channel，而是读写 Buffer。</li>
<li><strong>Selector</strong>：监控多个 Channel 的事件（如可读、可写），实现单线程多连接。</li>
</ul>
<hr>
<p><strong>问：NIO 与 BIO 的区别是什么？</strong></p>
<p>答：</p>
<table>
<thead>
<tr>
<th>特性</th>
<th>BIO</th>
<th>NIO</th>
</tr>
</thead>
<tbody>
<tr>
<td>编程模型</td>
<td>同步阻塞</td>
<td>同步非阻塞</td>
</tr>
<tr>
<td>线程模型</td>
<td>一连接一线程</td>
<td>一线程多连接（通过 Selector）</td>
</tr>
<tr>
<td>性能</td>
<td>并发差，线程资源浪费</td>
<td>并发强，资源消耗小</td>
</tr>
<tr>
<td>控制复杂度</td>
<td>简单易懂</td>
<td>逻辑复杂</td>
</tr>
<tr>
<td>使用场景</td>
<td>小并发、业务阻塞场景</td>
<td>高并发、低延迟应用</td>
</tr>
</tbody>
</table>
<hr>
<p><strong>问：Selector 是如何工作的？为什么它能提升并发性能？</strong></p>
<p>答：</p>
<ul>
<li>Selector 是 Java NIO 的核心，用于监视多个通道的状态（读、写、连接等）。</li>
<li>它允许一个线程注册多个通道，通过 <code v-pre>select()</code> 方法轮询活跃事件。</li>
<li><strong>优点</strong>：避免线程阻塞等待 I/O，使单线程即可处理成百上千个连接，极大提升并发性能。</li>
<li><strong>原理底层</strong>：依赖 OS 提供的 epoll/kqueue/poll 等系统调用实现事件通知。</li>
</ul>
<hr>
<p><strong>问：Netty 是什么？相比 Java NIO 有什么优势？</strong></p>
<p>答：</p>
<p>Netty 是一个高性能、事件驱动的异步网络通信框架，基于 Java NIO 封装，具有以下优势：</p>
<ul>
<li><strong>更易用的 API</strong>：抽象复杂底层，编程友好。</li>
<li><strong>内存管理优化</strong>：ByteBuf 替代 NIO Buffer，使用更高效。</li>
<li><strong>线程模型灵活</strong>：支持多种事件循环组（如 boss/worker 分离）。</li>
<li><strong>内置协议支持</strong>：提供编解码器、心跳、重连机制等。</li>
<li><strong>零拷贝支持</strong>：结合 <code v-pre>DirectBuffer</code> 和 <code v-pre>FileRegion</code> 提升 IO 性能。</li>
</ul>
<p>Netty 已广泛应用于 RPC、消息中间件、游戏服务器等高并发领域。</p>
<hr>
</div></template>


