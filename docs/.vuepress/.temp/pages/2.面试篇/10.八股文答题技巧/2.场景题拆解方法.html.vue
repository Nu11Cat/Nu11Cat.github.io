<template><div><hr>
<h2 id="✅-一、什么是场景题-为什么难" tabindex="-1"><a class="header-anchor" href="#✅-一、什么是场景题-为什么难"><span>✅ 一、什么是场景题？为什么难？</span></a></h2>
<p><strong>场景题</strong>是指不问你一个定义，而是丢给你一个“现实问题”，让你设计系统、排查故障、选择技术方案，或者解决性能/稳定性问题。</p>
<p>比如：</p>
<ul>
<li>假设你负责某个电商平台的秒杀接口，如何设计才能保证高并发下的稳定性和一致性？</li>
<li>某个服务上线后 QPS 急增，CPU 暴涨，如何定位问题？</li>
<li>如果你要设计一个大并发下的数据统计系统，你会如何拆分？</li>
</ul>
<p>这类题目 <strong>没有唯一答案</strong>，但有一类「优秀回答方式」。</p>
<hr>
<h2 id="✅-二、通用的场景题拆解五步法-p-m-d-s-r" tabindex="-1"><a class="header-anchor" href="#✅-二、通用的场景题拆解五步法-p-m-d-s-r"><span>✅ 二、通用的场景题拆解五步法（P-M-D-S-R）</span></a></h2>
<blockquote>
<p><strong>记住这个公式</strong>：P-M-D-S-R
适用于 90% 场景题，用它，你的回答会比大多数人更清晰、更专业。</p>
</blockquote>
<hr>
<h3 id="_1-p-problem-clarification-澄清问题" tabindex="-1"><a class="header-anchor" href="#_1-p-problem-clarification-澄清问题"><span>1. <strong>P - Problem Clarification（澄清问题）</strong></span></a></h3>
<p>先别急着答题，要<strong>确认上下文、明确目标和边界条件</strong>，这样才能回答到点子上。</p>
<p><strong>常见问题：</strong></p>
<ul>
<li>这是线上问题还是设计题？实时性重要吗？</li>
<li>核心诉求是高可用？低延迟？高吞吐？一致性？</li>
<li>请求量级？数据量级？用户量级？</li>
<li>有哪些系统依赖？有哪些不可动的约束？</li>
</ul>
<p>🧠 <strong>加分动作：主动问清楚边界，体现你的工程意识。</strong></p>
<hr>
<h3 id="_2-m-module-decomposition-模块拆解" tabindex="-1"><a class="header-anchor" href="#_2-m-module-decomposition-模块拆解"><span>2. <strong>M - Module Decomposition（模块拆解）</strong></span></a></h3>
<p>任何复杂问题都可以拆成几个核心模块。</p>
<p>比如设计一个接口高并发系统，你可以拆成：</p>
<ul>
<li>接口层（限流、防刷）</li>
<li>服务层（异步处理、幂等控制）</li>
<li>数据层（库存处理、缓存预热）</li>
<li>安全层（鉴权、防重）</li>
<li>运维层（监控、熔断、灰度）</li>
</ul>
<p>🧠 <strong>加分动作：明确哪些模块会有“热点瓶颈”，哪些是优化重点。</strong></p>
<hr>
<h3 id="_3-d-design-strategy-设计策略" tabindex="-1"><a class="header-anchor" href="#_3-d-design-strategy-设计策略"><span>3. <strong>D - Design Strategy（设计策略）</strong></span></a></h3>
<p>对于每一个模块，说明你的核心设计原则和技术选型。</p>
<p><strong>示例问题</strong>：设计一个高并发下的商品详情页系统</p>
<p><strong>设计策略可以这么回答</strong>：</p>
<ul>
<li><strong>缓存优先</strong>：商品详情走 Redis 缓存，热点数据设置短 TTL + 自动刷新策略。</li>
<li><strong>异步加载</strong>：图片、评论等数据通过前端懒加载 + 后台异步请求。</li>
<li><strong>接口隔离</strong>：主数据和非核心模块拆成不同接口，减少互相影响。</li>
<li><strong>服务降级</strong>：当某个依赖服务超时或失败，提供默认数据或空视图。</li>
<li><strong>数据库优化</strong>：主从读写分离，热点表做分库分表或数据预计算。</li>
</ul>
<hr>
<h3 id="_4-s-stability-scalability-稳定性与扩展性" tabindex="-1"><a class="header-anchor" href="#_4-s-stability-scalability-稳定性与扩展性"><span>4. <strong>S - Stability &amp; Scalability（稳定性与扩展性）</strong></span></a></h3>
<p>解释你的方案在遇到高并发、故障、扩容时，如何保证稳定和性能。</p>
<p>可涉及的内容包括：</p>
<ul>
<li><strong>限流</strong>：令牌桶/漏桶/滑动窗口</li>
<li><strong>熔断降级</strong>：Hystrix、Sentinel、自定义容错逻辑</li>
<li><strong>重试机制</strong>：避免雪崩但防止风暴</li>
<li><strong>容量规划</strong>：通过压测+指标分析，合理预估系统负载</li>
<li><strong>灰度发布</strong>：渐进式上线避免服务炸裂</li>
</ul>
<p>🧠 <strong>加分动作：提到“自我恢复能力”和“故障演练机制”，展现架构韧性意识。</strong></p>
<hr>
<h3 id="_5-r-risk-reflection-风险与思辨" tabindex="-1"><a class="header-anchor" href="#_5-r-risk-reflection-风险与思辨"><span>5. <strong>R - Risk &amp; Reflection（风险与思辨）</strong></span></a></h3>
<p>优秀的候选人不仅给出方案，还能指出“可能存在的问题”和“未来可优化方向”。</p>
<p>可以从这几个角度思考：</p>
<ul>
<li>哪些地方是性能瓶颈？</li>
<li>你的方案能否兼顾一致性与可用性？</li>
<li>如果有网络抖动或第三方异常，系统怎么自救？</li>
<li>可维护性如何？是否对业务侵入过多？</li>
</ul>
<p>🧠 <strong>加分动作：表达你对“工程理性”的理解——没有完美方案，只有权衡取舍。</strong></p>
<hr>
<h2 id="✅-三、实战示例-一道经典设计题的高质量回答" tabindex="-1"><a class="header-anchor" href="#✅-三、实战示例-一道经典设计题的高质量回答"><span>✅ 三、实战示例：一道经典设计题的高质量回答</span></a></h2>
<blockquote>
<p><strong>题目：设计一个支持百万并发访问的商品秒杀系统，你会怎么做？</strong></p>
</blockquote>
<p><strong>回答结构化分解如下：</strong></p>
<hr>
<p><strong>P - 澄清问题：</strong></p>
<ul>
<li>秒杀业务本质是“高并发下的限量争抢”，重点是<strong>数据一致性 + 高可用性 + 抗压能力</strong>。</li>
<li>用户量级百万级，商品库存极少，需避免超卖、重复下单、接口打垮。</li>
<li>读多写少，但写的结果必须可靠。</li>
</ul>
<hr>
<p><strong>M - 拆解模块：</strong></p>
<ol>
<li><strong>接口层</strong>：请求入口，是否要限流、防刷？</li>
<li><strong>服务层</strong>：请求分发、幂等控制、消息中间件</li>
<li><strong>库存层</strong>：如何减库存，先减还是后减？如何防止超卖？</li>
<li><strong>下单模块</strong>：订单写入时保证幂等和一致性</li>
<li><strong>数据层</strong>：缓存和数据库如何协同？事务处理如何设计？</li>
</ol>
<hr>
<p><strong>D - 设计策略：</strong></p>
<ul>
<li><strong>秒杀资格提前下发</strong>：用户秒杀资格预分配，接口层快速验证 token。</li>
<li><strong>接口限流 + 验签</strong>：基于滑动窗口限流 + 黑名单机制 + CAPTCHA 校验。</li>
<li><strong>异步削峰</strong>：请求进入 MQ，服务端异步消费处理下单逻辑。</li>
<li><strong>缓存预减库存</strong>：Redis 做库存预扣减，成功再写数据库。</li>
<li><strong>防重机制</strong>：用户下单前检查 Redis 中是否已经下单。</li>
<li><strong>失败补偿</strong>：落库失败通过异步补偿机制或定时任务回滚 Redis 库存。</li>
</ul>
<hr>
<p><strong>S - 稳定性保障：</strong></p>
<ul>
<li><strong>Redis 加锁/乐观锁防超卖</strong>。</li>
<li><strong>MQ 保证消息至少一次投递 + 去重机制</strong>。</li>
<li><strong>多层监控告警体系</strong>（接口耗时、失败率、库存变化等）。</li>
<li><strong>接口限速 + 灰度策略上线 + 自动扩容</strong>。</li>
</ul>
<hr>
<p><strong>R - 风险与反思：</strong></p>
<ul>
<li>异步架构带来一致性挑战（如库存扣减失败但 Redis 已减）。</li>
<li>Redis 崩溃/穿透可能导致秒杀逻辑不可用。</li>
<li>用户体验上的公平性问题仍需进一步优化。</li>
</ul>
<hr>
<h2 id="✅-四、总结-场景题的本质" tabindex="-1"><a class="header-anchor" href="#✅-四、总结-场景题的本质"><span>✅ 四、总结：场景题的本质</span></a></h2>
<ul>
<li><strong>不是考你记忆力</strong>，是考你拆解问题和系统性思考的能力。</li>
<li><strong>不是一个人的战斗</strong>，是让你展现“技术决策人”的视角。</li>
<li><strong>不是答得多就赢了</strong>，而是答得“清晰、有章法、有洞察”才是高手。</li>
</ul>
<hr>
</div></template>


