<template><div><hr>
<p><strong>问：Java 线程池的核心参数有哪些？</strong></p>
<p>答：Java 线程池的核心参数主要包括：</p>
<ul>
<li><strong>corePoolSize</strong>：线程池中保持活动的核心线程数，即使它们处于空闲状态，也不会被回收，除非设置了 <code v-pre>allowCoreThreadTimeOut</code>。</li>
<li><strong>maximumPoolSize</strong>：线程池中允许的最大线程数。</li>
<li><strong>keepAliveTime</strong>：非核心线程空闲时的存活时间，超过该时间，线程会被回收。</li>
<li><strong>unit</strong>：<code v-pre>keepAliveTime</code> 的时间单位。</li>
<li><strong>workQueue</strong>：用于保存待执行任务的阻塞队列。</li>
<li><strong>threadFactory</strong>：用于创建新线程的工厂。</li>
<li><strong>handler</strong>：当线程池无法处理请求时所使用的拒绝策略。</li>
</ul>
<hr>
<p><strong>问：Java 线程池的工作流程是怎样的？</strong></p>
<p>答：Java 线程池的工作流程如下：</p>
<ol>
<li>当线程池中的线程数小于 <code v-pre>corePoolSize</code> 时，创建新线程来执行任务。</li>
<li>当线程池中的线程数大于等于 <code v-pre>corePoolSize</code> 且任务队列 <code v-pre>workQueue</code> 未满时，将任务放入队列中等待执行。</li>
<li>当线程池中的线程数大于等于 <code v-pre>corePoolSize</code> 且任务队列已满时，且线程数小于 <code v-pre>maximumPoolSize</code> 时，创建新线程来执行任务。</li>
<li>当线程池中的线程数大于等于 <code v-pre>maximumPoolSize</code> 时，使用拒绝策略处理新提交的任务。</li>
</ol>
<hr>
<p><strong>问：Java 线程池的拒绝策略有哪些？</strong></p>
<p>答：Java 线程池提供了四种常见的拒绝策略：</p>
<ul>
<li><strong>AbortPolicy</strong>：默认策略，直接抛出 <code v-pre>RejectedExecutionException</code>。</li>
<li><strong>CallerRunsPolicy</strong>：由调用线程处理该任务，若线程池已关闭，则抛出异常。</li>
<li><strong>DiscardPolicy</strong>：直接丢弃该任务，不抛出异常。</li>
<li><strong>DiscardOldestPolicy</strong>：丢弃任务队列中最旧的一个任务，并执行当前任务。</li>
</ul>
<hr>
<p><strong>问：Java 线程池中的阻塞队列有哪些类型？</strong></p>
<p>答：Java 线程池中的常用阻塞队列类型包括：</p>
<ul>
<li><strong>ArrayBlockingQueue</strong>：基于数组的有界阻塞队列，插入操作和删除操作都可能会被阻塞。</li>
<li><strong>LinkedBlockingQueue</strong>：基于链表的阻塞队列，容量可以指定，插入操作和删除操作都可能会被阻塞。</li>
<li><strong>SynchronousQueue</strong>：每个插入操作必须等待一个删除操作，反之亦然，不能有任何元素存储。</li>
</ul>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>allowCoreThreadTimeOut</code> 参数有什么作用？</strong></p>
<p>答：<code v-pre>allowCoreThreadTimeOut</code> 是一个布尔值参数，默认为 <code v-pre>false</code>。</p>
<ul>
<li><strong>false</strong>：核心线程即使空闲也不会被回收。</li>
<li><strong>true</strong>：核心线程在空闲超过 <code v-pre>keepAliveTime</code> 时会被回收。</li>
</ul>
<p>设置为 <code v-pre>true</code> 可以更灵活地管理线程池中的线程数量，避免资源浪费。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>ThreadPoolExecutor</code> 类是如何实现任务的执行的？</strong></p>
<p>答：<code v-pre>ThreadPoolExecutor</code> 类通过以下方式实现任务的执行：</p>
<ol>
<li>当线程池中的线程数小于 <code v-pre>corePoolSize</code> 时，创建新线程来执行任务。</li>
<li>当线程池中的线程数大于等于 <code v-pre>corePoolSize</code> 且任务队列 <code v-pre>workQueue</code> 未满时，将任务放入队列中等待执行。</li>
<li>当线程池中的线程数大于等于 <code v-pre>corePoolSize</code> 且任务队列已满时，且线程数小于 <code v-pre>maximumPoolSize</code> 时，创建新线程来执行任务。</li>
<li>当线程池中的线程数大于等于 <code v-pre>maximumPoolSize</code> 时，使用拒绝策略处理新提交的任务。</li>
</ol>
<p><code v-pre>ThreadPoolExecutor</code> 还提供了 <code v-pre>execute()</code> 和 <code v-pre>submit()</code> 方法来提交任务，<code v-pre>execute()</code> 方法用于提交不需要返回结果的任务，<code v-pre>submit()</code> 方法用于提交需要返回结果的任务。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>newFixedThreadPool</code> 方法是如何工作的？</strong></p>
<p>答：<code v-pre>newFixedThreadPool</code> 方法返回一个固定大小的线程池，线程池中的线程数始终保持在指定的数量。</p>
<ul>
<li>当线程池中的线程数小于指定数量时，创建新线程来执行任务。</li>
<li>当线程池中的线程数等于指定数量时，将任务放入任务队列中等待执行。</li>
</ul>
<p>该方法适用于处理负载比较均衡的任务场景。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>newCachedThreadPool</code> 方法是如何工作的？</strong></p>
<p>答：<code v-pre>newCachedThreadPool</code> 方法返回一个可缓存的线程池，线程池中的线程数根据需要动态调整。</p>
<ul>
<li>当线程池中的线程数小于 <code v-pre>corePoolSize</code> 时，创建新线程来执行任务。</li>
<li>当线程池中的线程数大于等于 <code v-pre>corePoolSize</code> 时，且任务队列已满时，创建新线程来执行任务。</li>
<li>当线程空闲超过 <code v-pre>keepAliveTime</code> 时，线程会被回收。</li>
</ul>
<p>该方法适用于处理负载较轻或任务执行时间较短的任务。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>newSingleThreadExecutor</code> 方法是如何工作的？</strong></p>
<p>答：<code v-pre>newSingleThreadExecutor</code> 方法返回一个单线程的线程池，线程池中只有一个线程。</p>
<ul>
<li>所有提交的任务都由同一个线程依次执行。</li>
<li>如果线程异常终止，会创建一个新的线程来执行后续任务。</li>
</ul>
<p>该方法适用于需要保证任务顺序执行的场景。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>newScheduledThreadPool</code> 方法是如何工作的？</strong></p>
<p>答：<code v-pre>newScheduledThreadPool</code> 方法返回一个定时任务线程池，线程池中可以有多个线程。</p>
<ul>
<li>可以在指定的延迟后执行任务，或者定期执行任务。</li>
<li>适用于需要定时或周期性执行任务的场景。</li>
</ul>
<p>该方法适用于定时任务调度的场景，如定时清理缓存、定时发送通知等。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>submit()</code> 方法和 <code v-pre>execute()</code> 方法有什么区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>submit()</strong>：用于提交一个任务，返回一个 <code v-pre>Future</code> 对象，可以通过 <code v-pre>Future</code> 获取任务的执行结果或取消任务。</li>
<li><strong>execute()</strong>：用于提交一个任务，不返回任何结果，无法获取任务的执行状态或结果。</li>
</ul>
<p>一般来说，<code v-pre>submit()</code> 方法适用于需要获取任务执行结果的场景，而 <code v-pre>execute()</code> 方法适用于不需要获取任务执行结果的场景。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>shutdown()</code> 和 <code v-pre>shutdownNow()</code> 方法有什么区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>shutdown()</strong>：平稳地关闭线程池，停止接收新的任务，等待已提交的任务执行完毕后关闭。</li>
<li><strong>shutdownNow()</strong>：立即关闭线程池，尝试停止正在执行的任务，返回尚未执行的任务列表。</li>
</ul>
<p>一般来说，<code v-pre>shutdown()</code> 方法适用于需要平稳关闭线程池的场景，而 <code v-pre>shutdownNow()</code> 方法适用于需要立即关闭线程池的场景。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>isShutdown()</code> 和 <code v-pre>isTerminated()</code> 方法有什么区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>isShutdown()</strong>：判断线程池是否已被关闭，调用了 <code v-pre>shutdown()</code> 或 <code v-pre>shutdownNow()</code> 方法后返回 <code v-pre>true</code>。</li>
<li><strong>isTerminated()</strong>：判断线程池是否已完全终止，所有任务都已完成或被取消后返回 <code v-pre>true</code>。</li>
</ul>
<p>一般来说，<code v-pre>isShutdown()</code> 方法用于判断线程池是否已被关闭，而 <code v-pre>isTerminated()</code> 方法用于判断线程池是否已完全终止。</p>
<hr>
<p><strong>问：Java 线程池的 <code v-pre>getPoolSize()</code> 和 <code v-pre>getActiveCount()</code> 方法有什么区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>getPoolSize()</strong>：返回线程池中当前线程的总数，包括正在执行任务的线程和空闲线程。</li>
<li><strong>getActiveCount()</strong>：返回当前正在执行任务的线程数，即处于活动状态的线程数。</li>
</ul>
<p>这两个方法的区别在于，<code v-pre>getPoolSize()</code> 包括所有线程，而 <code v-pre>getActiveCount()</code> 仅包括正在执行任务的线程。</p>
<p>例如，如果线程池的核心线程数为 4，最大线程数为 10，当前有 4 个线程正在执行任务，其他线程处于空闲状态，那么：</p>
<ul>
<li><strong>getPoolSize()</strong> 返回 4（核心线程数）或更多，取决于线程池的配置和当前的线程池状态。</li>
<li><strong>getActiveCount()</strong> 返回 4，表示当前有 4 个线程正在执行任务。</li>
</ul>
<p>需要注意的是，<code v-pre>getPoolSize()</code> 的返回值可能会大于 <code v-pre>getActiveCount()</code>，因为线程池可能会根据任务的需求创建额外的线程，而这些线程可能处于空闲状态。</p>
<p>因此，<code v-pre>getPoolSize()</code> 反映了线程池的当前大小，而 <code v-pre>getActiveCount()</code> 反映了线程池中正在执行任务的线程数。</p>
<p>在实际应用中，<code v-pre>getActiveCount()</code> 可以用于监控线程池的负载情况，而 <code v-pre>getPoolSize()</code> 可以用于了解线程池的规模。</p>
</div></template>


