<template><div><hr>
<p><strong>问：Java 内存模型（Java Memory Model, JMM）是什么？</strong></p>
<p>答：Java 内存模型定义了多线程环境下变量的访问规则，即一个线程对共享变量的写入何时对另一个线程可见。它规定了主内存（Main Memory）与线程工作内存（Working Memory）之间的交互方式，确保了线程间的可见性、有序性和原子性。</p>
<hr>
<p><strong>问：Java 内存模型中的“happens-before”原则是什么？</strong></p>
<p>答：“happens-before”是 Java 内存模型中的核心概念，用于描述操作之间的执行顺序。若操作 A “happens-before” 操作 B，则 A 的结果对 B 可见，且 A 的执行先于 B。常见的“happens-before”关系包括：</p>
<ul>
<li>程序顺序规则：同一个线程内，前面的操作先于后面的操作。</li>
<li>监视器锁规则：对一个锁的解锁先于随后对该锁的加锁。</li>
<li>volatile 变量规则：对一个 volatile 变量的写操作先于后续对该变量的读操作。</li>
<li>线程启动规则：Thread.start() 方法先于该线程中的任何操作。</li>
<li>线程终止规则：线程中的所有操作先于其他线程检测到该线程已经终止（如通过 Thread.join()）。</li>
</ul>
<hr>
<p><strong>问：JVM 的内存结构包括哪些区域？</strong></p>
<p>答：Java 虚拟机（JVM）的内存结构主要包括以下几个区域：</p>
<ul>
<li><strong>堆（Heap）</strong>：用于存储对象实例，是垃圾回收的主要区域。</li>
<li><strong>方法区（Method Area）</strong>：存储类的元数据，如类信息、常量池、静态变量等。Java 8 之前称为永久代（PermGen），Java 8 之后被元空间（Metaspace）取代。</li>
<li><strong>虚拟机栈（JVM Stack）</strong>：每个线程私有，存储方法的局部变量、操作数栈等。</li>
<li><strong>程序计数器（Program Counter Register）</strong>：每个线程私有，指示当前线程所执行的字节码行号。</li>
<li><strong>本地方法栈（Native Method Stack）</strong>：为 JVM 使用的本地方法服务。</li>
</ul>
<hr>
<p><strong>问：Java 堆内存是如何划分的？</strong></p>
<p>答：Java 堆内存主要划分为以下几个区域：</p>
<ul>
<li><strong>新生代（Young Generation）</strong>：存储新创建的对象，分为 Eden 区和两个 Survivor 区（S0 和 S1）。大多数新对象在 Eden 区分配，经过一次 Minor GC 后存活的对象被移动到 Survivor 区，经过多次 Minor GC 后仍存活的对象将被提升到老年代。</li>
<li><strong>老年代（Old Generation）</strong>：存储生命周期较长的对象，如缓存、线程池等。</li>
<li><strong>元空间（Metaspace）</strong>：存储类的元数据，位于本地内存中，不再受堆大小限制。</li>
</ul>
<hr>
<p><strong>问：什么是垃圾回收（Garbage Collection, GC）？</strong></p>
<p>答：垃圾回收是 JVM 自动管理内存的机制，负责回收不再被引用的对象，释放内存空间，防止内存泄漏。GC 的主要目标是识别和清除无用对象，优化内存使用，提高应用性能。</p>
<hr>
<p><strong>问：Java 中有哪些类型的垃圾回收器？</strong></p>
<p>答：Java 提供了多种垃圾回收器，以适应不同的应用需求：</p>
<ul>
<li><strong>Serial GC</strong>：单线程执行垃圾回收，适用于小型应用。</li>
<li><strong>Parallel GC</strong>：使用多线程并行执行垃圾回收，适用于多核处理器和对吞吐量有要求的应用。</li>
<li><strong>Concurrent Mark-Sweep (CMS) GC</strong>：并发执行标记和清除操作，减少停顿时间，适用于对响应时间敏感的应用。</li>
<li><strong>G1 (Garbage-First) GC</strong>：将堆划分为多个区域，优先回收垃圾最多的区域，兼顾吞吐量和停顿时间，适用于大内存、多处理器的应用。</li>
</ul>
<hr>
<p><strong>问：什么是 Minor GC 和 Major GC？</strong></p>
<p>答：</p>
<ul>
<li><strong>Minor GC</strong>：发生在新生代的垃圾回收，回收 Eden 区和一个 Survivor 区中的无用对象，速度较快，但仍会导致短暂的停顿。</li>
<li><strong>Major GC（或 Full GC）</strong>：发生在老年代的垃圾回收，回收老年代中的无用对象，通常伴随着新生代的回收，停顿时间较长。</li>
</ul>
<hr>
<p><strong>问：Java 中的垃圾回收算法有哪些？</strong></p>
<p>答：常见的垃圾回收算法包括：</p>
<ul>
<li><strong>标记-清除（Mark-Sweep）</strong>：首先标记所有可达对象，然后清除未被标记的对象。</li>
<li><strong>标记-整理（Mark-Compact）</strong>：在标记阶段后，移动存活对象，使其在内存中连续排列，减少内存碎片。</li>
<li><strong>复制算法（Copying）</strong>：将存活对象从一个区域复制到另一个区域，适用于新生代。</li>
<li><strong>分代收集（Generational Collection）</strong>：根据对象的生命周期将堆划分为新生代和老年代，分别采用不同的回收策略。</li>
</ul>
<hr>
<p><strong>问：如何判断一个对象是否可以被垃圾回收？</strong></p>
<p>答：JVM 通过可达性分析（Reachability Analysis）判断对象是否可被回收。若一个对象从 GC Roots（如静态变量、栈帧中的局部变量、活动线程等）不可达，则认为该对象是“垃圾”，可以被回收。</p>
<hr>
<p><strong>问：什么是“Stop-The-World”事件？</strong></p>
<p>答：“Stop-The-World”是指在垃圾回收过程中，JVM 会暂停所有应用线程，直到垃圾回收完成。这种暂停会导致应用响应变慢，特别是在 Full GC 时，停顿时间可能较长。因此，优化垃圾回收策略以减少停顿时间是性能调优的重要方面。</p>
<hr>
<p><strong>问：如何手动触发垃圾回收？</strong></p>
<p>答：可以通过调用 <code v-pre>System.gc()</code> 或 <code v-pre>Runtime.getRuntime().gc()</code> 方法请求 JVM 执行垃圾回收。但这只是建议，JVM 可能会忽略该请求，实际的垃圾回收时机由 JVM 自行决定。</p>
<hr>
<p><strong>问：Java 8 中对内存管理做了哪些改进？</strong></p>
<p>答：Java 8 引入了以下内存管理方面的改进：</p>
<ul>
<li><strong>Metaspace 替代 PermGen</strong>：PermGen 区被废弃，取而代之的是 Metaspace，位于本地内存中，不再受堆大小限制，减少了内存溢出的风险。</li>
<li><strong>默认垃圾回收器</strong>：在 Java 9 中，G1 GC 成为默认的垃圾回收器，提供更好的性能和平衡的停顿时间。</li>
</ul>
<hr>
<p><strong>问：如何监控和分析垃圾回收的性能？</strong></p>
<p>答：可以使用以下工具和方法监控和分析垃圾回收性能：</p>
<ul>
<li><strong>JConsole 和 VisualVM</strong>：实时监控 JVM 的内存使用情况和垃圾回收活动。</li>
<li><strong>GC 日志</strong>：通过 JVM 参数（如 <code v-pre>-Xlog:gc</code>）启用垃圾回收日志，分析垃圾回收的频率和停顿时间。</li>
<li><strong>Java Mission Control（JMC）</strong>：提供详细的性能分析和垃圾回收监控功能。</li>
</ul>
<hr>
<p><strong>问：如何避免内存泄漏？</strong></p>
<p>答：避免内存泄漏的策略包括：</p>
<ul>
<li>及时释放不再使用的对象引用。</li>
<li>避免使用静态集合类（如 HashMap、List）持有大量对象引用。</li>
<li>使用弱引用（WeakReference）管理缓存，允许垃圾回收器回收不再使用的对象。</li>
<li>定期使用内存分析工具（如 Eclipse MAT）检测潜在的内存泄漏。</li>
</ul>
<hr>
</div></template>


