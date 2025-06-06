<template><div><hr>
<p><strong>问：Java 中的线程同步机制有哪些？</strong></p>
<p>答：Java 提供了多种线程同步机制，主要包括：</p>
<ul>
<li><strong>synchronized 关键字</strong>：用于方法或代码块，确保同一时间只有一个线程执行。</li>
<li><strong>Lock 接口及其实现类</strong>：如 ReentrantLock，提供更灵活的锁操作。</li>
<li><strong>volatile 关键字</strong>：保证变量的可见性，防止指令重排序。</li>
<li><strong>原子变量类</strong>：如 AtomicInteger，提供原子操作。</li>
<li><strong>并发工具类</strong>：如 CountDownLatch、Semaphore、CyclicBarrier 等。</li>
</ul>
<hr>
<p><strong>问：synchronized 的底层实现原理是什么？</strong></p>
<p>答：synchronized 是基于 JVM 的 Monitor 实现的，每个对象都有一个 Monitor。当线程进入 synchronized 块时，必须获得对应对象的 Monitor。synchronized 的实现经历了以下几个阶段：</p>
<ol>
<li><strong>偏向锁</strong>：当一个线程访问同步块时，会在对象头中记录该线程的 ID，之后该线程再次访问时，无需加锁。</li>
<li><strong>轻量级锁</strong>：当有其他线程尝试获取锁时，偏向锁会升级为轻量级锁，使用 CAS 操作尝试获取锁。</li>
<li><strong>重量级锁</strong>：当轻量级锁竞争失败时，锁会升级为重量级锁，线程会被阻塞。</li>
</ol>
<p>这种锁的升级机制旨在在不同的竞争情况下提供最佳性能。</p>
<hr>
<p><strong>问：什么是偏向锁、轻量级锁和重量级锁？</strong></p>
<p>答：</p>
<ul>
<li><strong>偏向锁</strong>：适用于只有一个线程访问同步块的场景，避免了无竞争情况下的同步开销。</li>
<li><strong>轻量级锁</strong>：适用于多个线程交替执行同步块的场景，使用自旋方式尝试获取锁，避免了线程阻塞。</li>
<li><strong>重量级锁</strong>：适用于多个线程同时竞争锁的场景，线程会被阻塞，直到获取到锁。</li>
</ul>
<p>锁的升级是从偏向锁到轻量级锁，再到重量级锁，逐步增加开销，以适应不同的并发场景。</p>
<hr>
<p><strong>问：synchronized 和 Lock 有哪些区别？</strong></p>
<p>答：</p>
<ul>
<li><strong>实现机制</strong>：synchronized 是 JVM 层面的实现，Lock 是基于 Java 实现的。</li>
<li><strong>功能特性</strong>：Lock 提供了更多的功能，如可中断、公平锁、可重入等。</li>
<li><strong>性能表现</strong>：在高并发场景下，Lock 的性能通常优于 synchronized。</li>
<li><strong>使用方式</strong>：synchronized 是隐式获取和释放锁，Lock 需要显式获取和释放锁。</li>
</ul>
<hr>
<p><strong>问：什么是 ReentrantLock？</strong></p>
<p>答：ReentrantLock 是 Lock 接口的一个实现类，支持可重入特性，即同一个线程可以多次获取同一把锁而不会被阻塞。它还提供了可中断、公平锁等功能，适用于复杂的并发控制场景。</p>
<hr>
<p><strong>问：什么是读写锁？</strong></p>
<p>答：读写锁是一种特殊的锁机制，允许多个线程同时读操作，但写操作是互斥的。Java 提供了 ReentrantReadWriteLock 类，实现了读写锁机制，适用于读多写少的场景，提高了并发性能。</p>
<hr>
<p><strong>问：什么是 AQS（AbstractQueuedSynchronizer）？</strong></p>
<p>答：AQS 是一个用于构建锁和同步器的框架，提供了一个 FIFO 队列来管理获取锁的线程。ReentrantLock、Semaphore、CountDownLatch 等都是基于 AQS 实现的。AQS 通过一个 int 类型的状态变量和一个等待队列来实现线程的同步。</p>
<hr>
<p><strong>问：什么是可重入锁？</strong></p>
<p>答：可重入锁是指同一个线程可以多次获取同一把锁而不会被阻塞。synchronized 和 ReentrantLock 都是可重入锁，避免了死锁的发生。</p>
<hr>
<p><strong>问：什么是公平锁和非公平锁？</strong></p>
<p>答：</p>
<ul>
<li><strong>公平锁</strong>：按照线程请求锁的顺序来获取锁，先请求的线程先获取锁。</li>
<li><strong>非公平锁</strong>：线程获取锁的顺序不一定按照请求的顺序，可能会导致某些线程长时间得不到锁。</li>
</ul>
<p>ReentrantLock 默认是非公平锁，但可以通过构造函数设置为公平锁。</p>
<hr>
<p><strong>问：什么是死锁？如何避免死锁？</strong></p>
<p>答：死锁是指两个或多个线程互相等待对方释放资源，导致所有线程都无法继续执行。避免死锁的方法包括：</p>
<ul>
<li><strong>资源有序分配</strong>：按照一定的顺序获取锁，避免循环等待。</li>
<li><strong>加锁时设置超时时间</strong>：使用 tryLock 方法设置超时时间，避免无限等待。</li>
<li><strong>避免嵌套锁</strong>：尽量减少嵌套锁的使用，降低死锁的风险。</li>
</ul>
<hr>
<p><strong>问：什么是自旋锁？</strong></p>
<p>答：自旋锁是指线程在获取锁时，不会被阻塞，而是在循环中不断尝试获取锁。自旋锁适用于锁的持有时间较短的场景，可以减少线程上下文切换的开销。</p>
<hr>
<p><strong>问：什么是可中断锁？</strong></p>
<p>答：可中断锁是指线程在等待锁的过程中，可以响应中断操作。ReentrantLock 提供了 lockInterruptibly 方法，支持可中断锁，synchronized 不支持可中断。</p>
<hr>
<p><strong>问：什么是 Condition？</strong></p>
<p>答：Condition 是 Lock 接口中的一个内部接口，提供了类似于 Object 的 wait、notify、notifyAll 方法的功能。通过 Condition，可以实现线程之间的通信和协调。</p>
<hr>
<p><strong>问：什么是 volatile 关键字？</strong></p>
<p>答：volatile 是一个轻量级的同步机制，保证了变量的可见性和禁止指令重排序。使用 volatile 修饰的变量，在多线程环境下可以确保每次读取都是最新的值，但不能保证原子性。</p>
<hr>
<p><strong>问：什么是原子变量类？</strong></p>
<p>答：原子变量类是指 Java 提供的一组类，如 AtomicInteger、AtomicLong 等，提供了原子性的操作，避免了使用锁的开销，适用于高并发场景下的计数器等。</p>
<hr>
<p><strong>问：什么是 CountDownLatch？</strong></p>
<p>答：CountDownLatch 是一个同步辅助类，允许一个或多个线程等待其他线程完成操作。通过一个计数器来控制线程的等待和释放，适用于多线程协作的场景。</p>
<hr>
<p><strong>问：什么是 Semaphore？</strong></p>
<p>答：Semaphore 是一个计数信号量，用于控制同时访问某个资源的线程数量。适用于限制并发访问的场景，如连接池、限流等。</p>
<hr>
<p><strong>问：什么是 CyclicBarrier？</strong></p>
<p>答：CyclicBarrier 是一个同步辅助类，允许一组线程互相等待，直到所有线程都到达某个公共屏障点。适用于多线程并发计算的场景。</p>
<hr>
<p><strong>问：什么是 Exchanger？</strong></p>
<p>答：Exchanger 是一个用于线程之间交换数据的同步点，两个线程可以在这个同步点交换数据。适用于两个线程之间的数据交换场景。(<a href="https://tech.meituan.com/2018/11/15/java-lock.html?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">美团技术</a>)</p>
<hr>
<p><strong>问：什么是 StampedLock？</strong></p>
<p>答：StampedLock 是 Java 8 引入的一种锁机制，支持三种模式：写锁、悲观读锁和乐观读锁。适用于读多写少的场景，提供了更高的并发性能。</p>
<hr>
<p><strong>问：什么是锁的升级和降级？</strong></p>
<p>答：锁的升级是指在竞争激烈的情况下，锁从偏向锁升级为轻量级锁，再升级为重量级锁。锁的降级是指在某些情况下，锁从重量级锁降级为轻量级锁或偏向锁，以提高性能。</p>
<hr>
<p><strong>问：什么是锁粗化和锁消除？</strong></p>
<p>答：</p>
<ul>
<li><strong>锁粗化</strong>：将多个连续的加锁操作合并为一个范围更大的加锁操作，减少加锁次数，提高性能。</li>
<li><strong>锁消除</strong>：JVM 在 JIT 编译时，发现某些加锁操作是冗余的，可以安全地移除，从而提高性能。</li>
</ul>
<hr>
<p><strong>问：什么是 ThreadLocal？</strong></p>
<p>答：ThreadLocal 是一个线程本地变量，为每个线程提供独立的变量副本，避免了多线程之间的共享和竞争。适用于线程安全的场景，如数据库连接、用户会话等。</p>
</div></template>


