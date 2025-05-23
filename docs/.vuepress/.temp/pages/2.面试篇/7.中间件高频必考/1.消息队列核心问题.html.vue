<template><div><hr>
<p><strong>问：使用消息队列的核心目的是什么？</strong></p>
<p>答：使用消息队列的核心目的包括：</p>
<ul>
<li><strong>解耦</strong>：生产者与消费者异步解耦，减少系统间依赖。</li>
<li><strong>削峰填谷</strong>：应对高并发请求，将流量缓冲至队列中异步处理。</li>
<li><strong>异步处理</strong>：提升系统响应速度，如下单后异步发短信、邮件。</li>
<li><strong>流量削减</strong>：限流和延迟消费可以平滑处理瞬时高并发流量。</li>
<li><strong>可靠传输</strong>：确保关键消息按序、至少一次或精确一次送达。</li>
</ul>
<hr>
<p><strong>问：常见的消息队列有哪些？它们各自适合什么场景？</strong></p>
<p>答：</p>
<ul>
<li><strong>Kafka</strong>：高吞吐、高可用、分区存储，适合日志收集、流处理、大数据场景。</li>
<li><strong>RabbitMQ</strong>：支持多种协议，功能强大，适合金融、电商、延迟队列等场景。</li>
<li><strong>RocketMQ</strong>：事务消息支持强，适合对可靠性要求高的分布式系统。</li>
<li><strong>ActiveMQ</strong>：老牌中间件，功能齐全但性能一般，适合中小系统。</li>
</ul>
<hr>
<p><strong>问：消息队列如何保证消息不丢失？</strong></p>
<p>答：</p>
<ul>
<li><strong>生产者保障</strong>：
<ul>
<li>开启发送确认机制（如 RabbitMQ 的 confirm 模式）。</li>
<li>消息落盘成功后再确认发送成功。</li>
</ul>
</li>
<li><strong>Broker 保障</strong>：
<ul>
<li>异步转同步写磁盘（Kafka 使用 <code v-pre>acks=all</code> + <code v-pre>replication</code>）。</li>
<li>多副本备份与 Leader-Follower 机制。</li>
</ul>
</li>
<li><strong>消费者保障</strong>：
<ul>
<li>手动 ack（避免消费后未处理完即 ack）。</li>
<li>消费幂等性设计，确保重复消息不会造成副作用。</li>
<li>设置消息重试与死信队列。</li>
</ul>
</li>
</ul>
<hr>
<p><strong>问：如何保证消息的顺序性？</strong></p>
<p>答：</p>
<ul>
<li><strong>单分区消费</strong>：Kafka 中，将同一类消息发到同一个分区，由单线程消费保持顺序。</li>
<li><strong>有序队列设计</strong>：RocketMQ 提供顺序消息支持。</li>
<li><strong>业务层控制</strong>：通过某个 Key（如订单号）分片路由到同一队列。</li>
<li><strong>避免并行处理</strong>：序列相关业务需单线程或加锁处理，牺牲吞吐换顺序。</li>
</ul>
<hr>
<p><strong>问：如何处理消息重复消费的问题？</strong></p>
<p>答：</p>
<ul>
<li><strong>消费幂等性设计</strong>：如订单状态先检查再更新；数据库加唯一约束。</li>
<li><strong>消费去重机制</strong>：记录消费日志，避免重复执行。</li>
<li><strong>业务层幂等保障</strong>：如支付接口查订单状态，不重复扣款。</li>
</ul>
<hr>
<p><strong>问：如何处理消息积压问题？</strong></p>
<p>答：</p>
<ul>
<li><strong>快速排查阻塞点</strong>：检查消费者消费是否异常、线程是否挂起。</li>
<li><strong>增加消费者实例数</strong>：提升并发消费能力。</li>
<li><strong>消息批量消费</strong>：一次取多条，提升吞吐。</li>
<li><strong>丢弃过期消息</strong>：非关键消息可丢弃或限时消费。</li>
<li><strong>告警与限流</strong>：当堆积超过阈值自动报警并限流上游生产。</li>
</ul>
<hr>
<p><strong>问：如何保证消息不被重复投递？</strong></p>
<p>答：</p>
<ul>
<li>Kafka 中设置 <code v-pre>acks=all</code> 和开启 <code v-pre>idempotent producer</code>。</li>
<li>RabbitMQ 中使用消息 ID + confirm 机制，确认后再投递。</li>
<li>RocketMQ 提供事务消息，确认后发送。</li>
</ul>
<hr>
<p><strong>问：事务消息的实现原理是什么？</strong></p>
<p>答：</p>
<ul>
<li>RocketMQ 的事务消息通过两阶段提交实现：
<ol>
<li>发送 <strong>半消息（prepare message）</strong> 到队列，消费者不可见。</li>
<li>执行业务操作，成功后发送 <strong>确认提交</strong> 或 <strong>回滚</strong> 消息。</li>
<li>若消息长时间未确认，Broker 会通过回查机制检查生产者状态。</li>
</ol>
</li>
</ul>
<p>这种机制保证了消息与本地事务的一致性，但复杂度高、需要幂等支持。</p>
<hr>
<p><strong>问：消息队列中如何实现延迟消息/定时消息？</strong></p>
<p>答：</p>
<ul>
<li><strong>RabbitMQ</strong>：
<ul>
<li>使用 TTL + DLX（死信交换机）实现延迟消息。</li>
</ul>
</li>
<li><strong>RocketMQ</strong>：
<ul>
<li>内置定时等级支持（如延迟10s、30s、1min…）。</li>
</ul>
</li>
<li><strong>Kafka</strong>：
<ul>
<li>原生不支持延迟消息，需要业务层逻辑或调度系统处理。</li>
</ul>
</li>
</ul>
<hr>
<p><strong>问：如何选择合适的消息队列？</strong></p>
<p>答：</p>
<ul>
<li>对于 <strong>高吞吐、海量数据</strong>：优先选择 Kafka。</li>
<li>对于 <strong>业务灵活性、协议多样性</strong>：优先选择 RabbitMQ。</li>
<li>对于 <strong>分布式事务、可靠性强依赖</strong>：使用 RocketMQ。</li>
<li>对于 <strong>轻量化或简单系统</strong>：ActiveMQ 可作为选择。</li>
</ul>
<p>选择依据应从：吞吐量、可用性、顺序需求、事务性、社区活跃度等多方面综合评估。</p>
<hr>
<p><strong>问：什么是死信队列（DLQ），应用场景是什么？</strong></p>
<p>答：</p>
<p>死信队列用于存储消费失败、过期、被拒绝等不能被正常消费的消息。</p>
<ul>
<li><strong>应用场景</strong>：
<ul>
<li>消费者处理失败，消息多次重试后仍失败。</li>
<li>消息过期未被及时消费。</li>
<li>消费者拒绝消费（如业务逻辑判断非法）。</li>
</ul>
</li>
<li><strong>好处</strong>：
<ul>
<li>提高系统稳定性，避免失败消息阻塞主队列。</li>
<li>提供问题排查入口，可人工介入或定期清理。</li>
</ul>
</li>
</ul>
<hr>
</div></template>


