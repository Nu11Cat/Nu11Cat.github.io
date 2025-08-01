---
title : Java多线程
order: 4
---

# 多线程

## 线程

### 进程与线程

**进程（Process）** 是操作系统资源分配的最小单位，每个进程拥有独立的内存空间、代码、数据和系统资源。进程之间相互独立，数据不共享，通信成本较高。

**线程（Thread）** 是程序执行的最小单位，是进程内部的一个执行流。一个进程可以包含多个线程，它们共享同一块内存（代码、堆等），但每个线程有自己的栈空间和程序计数器。由于共享资源，线程之间通信开销小，切换快，但也更容易出现并发问题。

进程是容器，线程是容器中的执行单元。线程必须依附于进程存在，离开进程线程无法单独存在。

### 线程安全

线程安全和不安全是在多线程环境下对于同一份数据的访问是否能够保证其正确性和一致性的描述。

- 线程安全指的是在多线程环境下，对于同一份数据，不管有多少个线程同时访问，都能保证这份数据的正确性和一致性。
- 线程不安全则表示在多线程环境下，对于同一份数据，多个线程同时访问时可能会导致数据混乱、错误或者丢失。

### 线程间同步

下面是几种常见的线程同步的方式：

1. **互斥锁(Mutex)** ：采用互斥对象机制，只有拥有互斥对象的线程才有访问公共资源的权限。因为互斥对象只有一个，所以可以保证公共资源不会被多个线程同时访问。比如 Java 中的 `synchronized` 关键词和各种 `Lock` 都是这种机制。
2. **读写锁（Read-Write Lock）** ：允许多个线程同时读取共享资源，但只有一个线程可以对共享资源进行写操作。
3. **信号量(Semaphore)** ：它允许同一时刻多个线程访问同一资源，但是需要控制同一时刻访问此资源的最大线程数量。
4. **屏障（Barrier）** ：屏障是一种同步原语，用于等待多个线程到达某个点再一起继续执行。当一个线程到达屏障时，它会停止执行并等待其他线程到达屏障，直到所有线程都到达屏障后，它们才会一起继续执行。比如 Java 中的 `CyclicBarrier` 是这种机制。
5. **事件(Event)** :Wait/Notify：通过通知操作的方式来保持多线程同步，还可以方便的实现多线程优先级的比较操作。

### 创建线程的方式

第一种是**继承 Thread 类**，重写它的 `run()` 方法，然后创建实例调用 `start()` 方法启动线程。这种方式简单直观，但因为 Java 不支持多继承，所以灵活性较差。

第二种是**实现 Runnable 接口**，把线程逻辑写在 `run()` 方法中，再把这个实现类传给 Thread 构造器。这种方式更灵活，适合资源共享，也更符合面向接口编程的思想。

第三种是**实现 Callable 接口并结合 FutureTask 使用**。这个方式的优势是可以有返回值，且可以抛出异常，更适合需要拿到线程执行结果的场景。

如果使用**线程池**，比如通过 `ExecutorService` 来提交任务，那底层其实也是通过 Callable 或 Runnable 实现的，只是线程的创建和管理交给了线程池，效率更高、控制力更强，但也增加了程序的复杂度。

---

### 生命周期和状态

Java线程大致有 **六种状态**，定义在 `Thread.State` 枚举中，整个生命周期如下：

**1. 新建（New）**
 线程对象刚创建，还没调用 `start()` 方法。

**2. 就绪（Runnable）**
 调用 `start()` 后，线程进入就绪队列，等待 CPU 调度。此时并没有运行。

**3. 运行中（Running）**
 线程真正获得 CPU 时间片，开始执行 `run()` 方法的代码。

**4. 阻塞（Blocked）**
 线程尝试获取某个被别的线程持有的锁（比如 synchronized），获取不到就进入阻塞状态，直到拿到锁。

**5. 等待（Waiting）**
 线程主动等待别的线程的通知，例如调用了 `wait()`、`join()`，没有设置超时。必须通过 `notify()` 或 `join()` 结束才会被唤醒。

**6. 计时等待（Timed Waiting）**
 和等待类似，但设置了超时时间，比如 `sleep(1000)`、`wait(1000)`、`join(1000)`。

**7. 终止（Terminated）**
 线程运行完了，或者抛异常终止了，生命周期结束。

---

**阻塞（Blocked）和 等待（Waiting）有什么区别**

**Blocked 状态** 表示线程**正在等待获取某个锁**，也就是**被阻塞在同步块或同步方法上**。它是由 Java 的内置锁（synchronized）竞争引起的。当一个线程试图进入一个被其他线程锁住的 synchronized 代码块时，就会进入 Blocked 状态，直到锁可用。

**Waiting 状态** 表示线程**主动进入等待**，等待其他线程执行特定操作来唤醒它，比如调用 `wait()`、`join()` 或 `LockSupport.park()` 方法。处于 Waiting 状态的线程不占用 CPU，也不在竞争锁，只有被显式唤醒（如 `notify()`、`unpark()`）才会继续执行。

- BLOCKED是锁竞争失败后被被动触发的状态，WAITING是人为的主动触发的状态
- BLCKED的唤醒时自动触发的，而WAITING状态是必须要通过特定的方法来主动唤醒

---

### 停止线程的运行

在 Java 中，**停止线程的方式主要有以下几种**：

第一，调用 `Thread.stop()` 方法强行终止线程，不推荐，会导致线程突然释放所有锁，可能造成数据不一致等问题。
第二，使用 `volatile` 或标志变量自定义停止逻辑，我们可以在线程类中定义一个volatile布尔类型的标志位，通过修改这个标志位的值来控制线程是否继续执行。线程在运行时定期检查这个标志位，当标志位变为false时，线程就会自然退出run方法。
第三，通过调用 `interrupt()` 方法进行协商式中断，Java提供了interrupt()方法来请求中断线程。线程可以通过isInterrupted()方法检查中断状态，或者在执行可中断的阻塞操作（如sleep、wait等）时捕获InterruptedException来响应中断请求。

更推荐第三种。

---

### 线程上下文切换

线程在执行过程中会有自己的运行条件和状态（也称上下文），比如上文所说到过的程序计数器，栈信息等。当出现如下情况的时候，线程会从占用 CPU 状态中退出。

- 主动让出 CPU，比如调用了 `sleep()`, `wait()` 等。
- 时间片用完，因为操作系统要防止一个线程或者进程长时间占用 CPU 导致其他线程或者进程饿死。
- 调用了阻塞类型的系统中断，比如请求 IO，线程被阻塞。
- 被终止或结束运行

这其中前三种都会发生线程切换，线程切换意味着需要保存当前线程的上下文，留待线程下次占用 CPU 的时候恢复现场。并加载下一个将要占用 CPU 的线程上下文。这就是所谓的 **上下文切换**。

---

### interrupt方法

在 Java 中，`interrupt()` 是一种用于**中断线程**的机制，但它并不会强制终止线程，而是通过**设置中断标志位**来通知线程“你该停下来了”，属于一种协商式中断。

当调用某个线程的 `interrupt()` 方法时，线程的中断标志会被置为 `true`。这个标志不会自动影响线程的运行状态，因此需要在线程内部通过检查 `Thread.currentThread().isInterrupted()`，或在阻塞方法（如 `sleep()`、`wait()`、`join()`）中捕获 `InterruptedException` 来响应中断请求。

也就是说，**线程是否中断取决于线程自己是否响应中断信号。**
 此外，调用 `interrupt()` 也不会中断处于运行状态的线程，只会对处于阻塞状态的线程产生影响。

所以 `interrupt()` 的正确使用方式是：**在外部发出中断信号，在线程内部主动检查和处理。**这样既安全又可控，符合线程的生命周期管理原则。

---

### notify 方法

在 Java 中，`notify` 是 `Object` 类提供的方法，用于**唤醒一个正在等待该对象监视器（monitor）的线程**。它通常与 `wait` 搭配使用，实现线程间的协作。

当一个线程调用了某个对象的 `wait()` 方法后，会释放该对象的锁并进入 Waiting 状态，等待其他线程调用 `notify()` 或 `notifyAll()`。而 `notify()` 的作用就是**随机唤醒一个**正在等待这个对象锁的线程，让它从 `wait` 中恢复，进入阻塞队列，等待重新获取锁。

- `notify()` **不会立刻让被唤醒的线程执行**，它只是把线程唤醒并放入锁的等待队列中，线程仍需竞争锁。
- `notify()` 必须在 **同步块或同步方法中调用**，否则会抛出 `IllegalMonitorStateException`。
- **`notifyAll()`** 会唤醒所有等待线程，适用于多个线程可能都需要重新判断条件的场景，比如多线程并发依赖同一个共享状态时更为安全。

---

### Thread 类的 run 方法

**可以直接调用 Thread 类的 run 方法吗？**

可以，但是一般不会直接调用 `run()`，而是使用 `start()` 来正确启动线程。

直接调用 `run()` 并不会启动一个新线程，它只是一个普通的方法调用，会在当前线程中执行，不具备多线程的效果。

正常启动线程，应该调用 `start()` 方法。`start()` 会由 JVM 创建新的线程，然后自动调用该线程的 `run()` 方法，真正实现多线程并发。

---

### sleep() 方法和 wait() 方法

在Java中，`sleep()` 和 `wait()` 都是控制线程执行流程的方法，两者都可以暂停线程的执行。

**`sleep()`** 是 `Thread` 类的方法，用于让当前线程暂停执行指定的时间。线程在暂停期间不会释放持有的锁。它通常用于线程执行的延时，比如定时任务或控制任务的执行频率。当线程调用 `sleep()` 后，它会进入 **“Timed Waiting”** 状态，直到指定时间过去后自动唤醒。需要注意的是，`sleep()` 会抛出 `InterruptedException`，如果线程在睡眠过程中被中断。

**`wait()`** 是 `Object` 类的方法，必须在同步块或同步方法中调用，因为它需要持有对象的锁。当线程调用 `wait()` 后，它会进入 **“Waiting”** 状态，直到其他线程通过调用 `notify()` 或 `notifyAll()` 来唤醒它。与 `sleep()` 不同，`wait()` 会释放持有的锁，允许其他线程访问共享资源。这种机制通常用于线程间的通信，例如生产者-消费者问题。

简单来说，`sleep()` 用于让线程休眠一段时间，而 `wait()` 用于线程间的协调和同步，通常结合 `notify()` 或 `notifyAll()` 一起使用。

>**为什么不属一个类？**
>
>**`wait()`属于`Object` 类**：`wait()` 是让获得对象锁的线程实现等待，会自动释放当前线程占有的对象锁。每个对象（`Object`）都拥有对象锁，既然要释放当前线程占有的对象锁并让其进入 WAITING 状态，自然是要操作对应的对象（`Object`）而非当前的线程（`Thread`）。
>
>**`sleep()` 属于 `Thread`** ：因为 `sleep()` 是让当前线程暂停执行，不涉及到对象类，也不需要获得对象锁。

---

## 多线程

### 并发与并行

**并发（Concurrency）** 指的是多个任务在同一时间段内交替执行，可能只用一个 CPU 核心，通过任务切换实现“同时进行”的效果。本质是**逻辑上的同时**，底层依靠时间片轮转。

**并行（Parallelism）** 是指多个任务在**同一时刻真正同时运行**，必须依赖多核 CPU。每个任务在不同的核心上同时执行，实现**物理上的同时**。

举个例子，如果一个厨房只有一个人做饭，但能快速切换做饭、洗菜、炒菜的动作，那是并发；如果厨房有三个人分别同时做这三件事，那是并行。

并发更关注**任务切换效率**，并行更关注**处理能力最大化**。

### 同步与异步

同步和异步是描述任务执行时的等待与通知机制。

**同步（Synchronous）** 是指调用方发起请求后，**必须等待任务执行完毕才能继续**执行后续操作。调用过程是阻塞的。

**异步（Asynchronous）** 是指调用方发起请求后，**不等待任务完成，立即返回**，任务在后台执行，完成后通过回调、通知或轮询的方式获取结果。调用过程是非阻塞的。

举个例子，打电话让别人帮你查快递并等他查完再挂电话，这是同步；而发个微信让他查，等查完再告诉你，是异步。

在 Java 中，普通方法调用是同步的；使用 `CompletableFuture`、`Future`、线程池提交任务时，就是异步执行，主线程可以继续做其他事。

**同步编程**简单直观，但可能导致资源浪费和线程阻塞；**异步编程**提高了程序响应性和资源利用率，常用于 I/O 密集型或高并发场景。

### 为什么要使用多线程?

使用多线程的核心目的是**提升程序的效率和响应能力**

第一，**提高资源利用率**。现代 CPU 都是多核的，多线程可以让多个核心同时工作，实现真正的并行，提高处理能力。如果单线程运行，只能用到一个核心，浪费硬件资源。

第二，**提升程序响应性**。比如在图形界面或 Web 应用中，一个线程处理用户输入，另一个线程处理后台逻辑，可以避免界面卡顿，提升用户体验。

第三，**简化模型结构**。像生产者-消费者、事件驱动、定时任务等，如果用多线程实现，会比纯粹的轮询或状态机更自然、清晰。

第四，**加快任务处理速度**。比如同时处理多个客户端请求，或者将一个大任务拆分为多个线程并发处理，能够显著缩短整体耗时。

---

### 多线程使用的注意事项

**原子性**：提供互斥访问，同一时刻只能有一个线程对数据进行操作，在Java中使用了atomic包（这个包提供了一些支持原子操作的类，这些类可以在多线程环境下保证操作的原子性）和synchronized关键字来确保原子性；

**可见性**：一个线程对主内存的修改可以及时地被其他线程看到，在Java中使用了synchronized和volatile这两个关键字确保可见性；

**有序性**：一个线程观察其他线程中的指令执行顺序，由于指令重排序，该观察结果一般杂乱无序，在Java中使用了happens-before原则来确保有序性。

---

### 多线程间通信

线程间通信方式主要有以下几类：
 一是**共享内存加同步机制**，如 `synchronized`、`Lock`、`volatile` 等；
 二是**对象监视器方法**，如 `wait()`、`notify()`、`notifyAll()`；
 三是**并发工具类**，如 `BlockingQueue`、`CountDownLatch`、`Semaphore`、`CyclicBarrier` 等；
 四是**线程池与消息传递机制**，如 `Future`、`CompletableFuture` 实现结果回传。

---

### juc包常用类

首先是**锁相关的类**，如 `ReentrantLock` 和 `ReentrantReadWriteLock`，它们提供了比 `synchronized` 更灵活的锁机制，比如可重入、可中断、公平锁等特性，适用于需要精细控制同步的场景。

其次是**并发容器**，如 `ConcurrentHashMap`、`CopyOnWriteArrayList`，它们在多线程环境下能保证线程安全，且性能优于传统的 `Hashtable`、同步集合包装类。

然后是**线程协调类**，比如 `CountDownLatch`、`CyclicBarrier` 和 `Semaphore`，适合用于线程之间的等待、限流和阶段控制等场景。

我还经常使用 `BlockingQueue`，比如 `LinkedBlockingQueue` 和 `ArrayBlockingQueue`，它们是实现生产者消费者模式的基础。

此外，`ThreadPoolExecutor` 是线程池的核心类，并发任务管理中也经常使用。

最后还有 `Future`、`CompletableFuture` 等，用于异步任务执行和结果处理。

---

### 如何保证线程安全

在多线程环境下，线程安全的本质是**避免共享数据的竞争访问**。常见的保证线程安全的方式有以下几种：

第一，**使用互斥同步机制**，比如 `synchronized` 或 `Lock`（如 `ReentrantLock`），通过加锁保证同一时刻只有一个线程访问共享资源，从而避免并发冲突。

第二，**使用原子类**，如 `AtomicInteger`、`AtomicReference` 等，它们基于 CAS 实现无锁线程安全，适合高并发下的轻量级同步。

第三，**使用线程安全的并发容器**，如 `ConcurrentHashMap`、`CopyOnWriteArrayList`，这些容器内部已做了同步控制，适合多线程读写场景。

第四，**使用局部变量或线程封闭**，比如通过 `ThreadLocal` 为每个线程提供独立变量副本，从根本上避免共享。

第五，**使用合适的线程协调工具类**，如 `CountDownLatch`、`Semaphore`、`BlockingQueue` 等，能在控制并发流程的同时避免线程安全问题。

---

### 单核CPU

单核 CPU 是支持 Java 多线程的。操作系统通过时间片轮转的方式，将 CPU 的时间分配给不同的线程。（并发）

**单核 CPU 上运行多个线程效率一定会高吗？**

不一定。在单核 CPU 上运行多个线程时，线程是通过时间片轮转来切换执行的，并不是真正的同时运行，而是快速切换看起来“像是”并发。

这种切换会带来上下文切换开销，包括保存和恢复线程状态、缓存失效、内存切换等。如果线程数量过多或者频繁切换，反而会导致效率下降，甚至不如单线程执行。

另外，多线程引入了线程同步、锁竞争、死锁等问题，在单核环境下，这些问题的代价会更明显，降低程序整体性能。

所以在单核 CPU 上，是否使用多线程，取决于具体场景：

- 适合多线程的情况：比如大量 I/O 操作（读写文件、网络请求等），CPU 在等待时可以切到其他线程，提升资源利用率。

- 不适合多线程的情况：如果是 CPU 密集型运算，多线程反而因为频繁切换和锁竞争导致更低的效率。

# 锁

## 有哪些锁



---

## 死锁

**死锁（Deadlock）** 是指两个或多个线程在执行过程中，因争夺资源而导致**相互等待对方释放资源**，从而使得所有线程都无法继续执行的情况。

Java 线程的 `jstack` 工具**检测死锁**：如果有死锁，`jstack` 的输出中通常会有 `Found one Java-level deadlock:`的字样，后面会跟着死锁相关的线程信息。

**死锁的四个必要条件**：

1. **互斥**：至少有一个资源是处于**独占模式**的，即某一时刻只能有一个线程使用该资源。
2. **持有并等待**：一个线程已经持有了至少一个资源，但又在等待其他线程持有的资源。
3. **非抢占**：资源不能被强制抢占，只有线程自己释放资源。
4. **循环等待**：一组线程之间存在一种“环形等待”关系，即线程A等待线程B持有的资源，线程B又在等待线程A持有的资源。

**防止和避免死锁的方法**：

1. **避免循环等待**：通过一定的策略（比如按顺序加锁）来避免出现循环等待。
2. **使用 `tryLock`**：例如 `ReentrantLock` 提供的 `tryLock()` 方法，能够尝试获得锁，如果无法获得就放弃，避免死锁。
3. **锁超时机制**：通过设置锁的最大等待时间，避免无限等待。
4. **减少锁的粒度**：尽量减少持有锁的时间，并且尽可能避免嵌套锁。

## 可重入锁

**可重入锁（Reentrant Lock）\**指的是\**同一个线程在获取锁之后，可以再次获取这把锁而不会发生死锁**。

换句话说，如果一个线程已经获得了某个锁，它可以在没有释放该锁的情况下再次进入同一个锁保护的代码块，系统会自动记录**锁的重入次数**，等线程退出时再逐层释放。

Java 中的 `synchronized` 和 `ReentrantLock` 都是**可重入锁**的实现。

举个例子说明：如果一个线程调用一个加了锁的方法，而这个方法内部又调用了另一个加了相同锁的方法，由于同一个线程已经持有了锁，所以可以顺利进入内层方法，不会被自己阻塞。

可重入锁的好处是**避免了递归调用或内部方法调用时死锁的问题**，也让程序结构更加清晰。

## 乐观锁和悲观锁

乐观锁和悲观锁本质上是两种并发控制策略，它们的核心区别在于对**数据冲突的预期不同**。

**悲观锁**认为并发冲突是很常见的，因此每次访问共享资源时都会**先加锁**，比如使用 `synchronized` 或 `ReentrantLock` 来保证同一时刻只有一个线程访问资源。这种方式安全性高，适用于并发写多、冲突频繁的场景，比如转账、订单扣库存等。

而**乐观锁**则认为并发冲突是少数，它**不加锁**，而是每次读取数据时带上一个版本号或时间戳，修改时再比对当前版本是否一致。如果一致就更新成功，否则就重试。像 Java 中的 `AtomicInteger`、`AtomicReference`，底层就是基于 CAS 实现的乐观锁。数据库中也常用乐观锁，比如用 `version` 字段控制更新。

简单来说，**悲观锁重在预防，乐观锁重在事后校验**。

悲观锁通常多用于写比较多的情况（多写场景，竞争激烈），这样可以避免频繁失败和重试影响性能，悲观锁的开销是固定的。不过，如果乐观锁解决了频繁失败和重试这个问题的话（比如`LongAdder`），也是可以考虑使用乐观锁的，要视实际情况而定。

乐观锁通常多用于写比较少的情况（多读场景，竞争较少），这样可以避免频繁加锁影响性能。不过，乐观锁主要针对的对象是单个共享变量。

**版本号机制**

版本号机制是实现乐观锁的常见方式之一，主要用于解决并发修改共享数据的问题。

它的核心思路是：每条数据都加一个版本号字段（如 version），每次读取数据时一并读取当前版本号，更新时也携带这个版本号。

当进行更新操作时，系统会检查当前数据库中的版本号是否与之前读取的一致：

- 如果一致，说明这段时间内没人改动过这条数据，就允许更新，并把版本号 +1；
- 如果不一致，说明其他线程已经修改过了，当前更新失败，可以选择重试或提示用户。

这个机制避免了加锁，也能有效防止脏写（Lost Update）问题。

**CAS算法**

[CAS 详解 | JavaGuide](https://javaguide.cn/java/concurrent/cas.html)

CAS，全称是 Compare-And-Swap（比较并交换），是一种常见的无锁并发原子操作，底层由硬件指令支持。

它的核心思想是：在更新某个共享变量时，先比较它的当前值是否是预期值，如果是，则更新为新值；如果不是，说明已经被其他线程修改过，更新失败，通常会进行重试。

在 Java 中，`java.util.concurrent.atomic` 包下的原子类，比如 `AtomicInteger`、`AtomicReference`，就是基于 CAS 实现的乐观锁。

**ABA 问题**是 CAS 算法中一个典型的并发陷阱。

CAS 只比较当前值和预期值是否相等，但**并不知道这个值在期间是否发生过变化又被改回来了**，也就是说，它只能比较“值”，但不知道“过程”。为了避免 ABA 问题，Java 提供了带版本号的原子引用类：`AtomicStampedReference`：每次更新时不仅比较值，还比较一个“版本号”或“时间戳”，确保值和版本都没变，从而检测到中间的变化。

## 公平锁和非公平锁

**公平锁** : 锁被释放之后，先申请的线程先得到锁。性能较差一些，因为公平锁为了保证时间上的绝对顺序，上下文切换更频繁。

**非公平锁**：锁被释放之后，后申请的线程可能会先获取到锁，是随机或者按照其他优先级排序的。性能更好，但可能会导致某些线程永远无法获取到锁。

## 可中断锁和不可中断锁

**可中断锁**，指的是**线程在等待获取锁的过程中，可以被中断，从而提前退出等待**；而**不可中断锁**则不支持这种机制，一旦开始等待锁，就必须等到锁可用才能继续执行，期间不能响应中断。

在 Java 中，`synchronized` 是一种**不可中断锁**。如果一个线程在尝试进入 `synchronized` 块时被阻塞，那么它只能无限等待下去，除非获取到锁或者线程被强制终止，中间无法通过中断机制来提前结束。

而 `ReentrantLock` 支持**可中断锁**，它提供了一个方法叫做 `lockInterruptibly()`，线程在调用这个方法加锁时，如果被其他线程中断，会立刻抛出 `InterruptedException`，从而退出等待。这种机制在高并发或者死锁预防场景中非常有用。

## 共享锁和独占锁

区别主要体现在是否允许多个线程同时持有锁。

**独占锁**指的是**同一时刻只能被一个线程持有**，其他线程必须等待锁释放后才能继续执行。这种锁常用于写操作，目的是防止多个线程同时修改共享资源，从而确保数据一致性。Java 中的 `synchronized` 和 `ReentrantLock` 都属于独占锁的典型实现。

而**共享锁**允许**多个线程同时持有**，只要它们执行的操作不会互相冲突。共享锁通常用于读操作，也叫“读锁”。多个线程可以同时读取共享数据，只要没有线程进行写操作，这种方式可以显著提高读密集型场景下的并发性能。

# JMM

[JMM（Java 内存模型）详解 | JavaGuide](https://javaguide.cn/java/concurrent/jmm.html)

# 线程池

线程池（Thread Pool）是 Java 并发编程中一种\线程管理机制，它的作用是：**预先创建一组线程并重复利用，避免频繁创建和销毁线程的开销**，从而提升系统性能和资源利用率。

在没有线程池的情况下，每次执行任务都要新建线程，而线程的创建和销毁是昂贵的系统操作，频繁使用会导致性能下降，甚至资源耗尽。线程池通过**复用已存在的线程来执行多个任务**，大大降低了系统开销。

## 好处

- 复用线程，避免频繁创建销毁，提高性能；
- 统一调度任务，便于控制并发量和资源使用；
- 支持任务排队**、**定时执行**、**取消等高级特性；
- 适用于高并发、高吞吐量的服务端程序。

## 如何创建线程池

在 Java 中，创建线程池主要有两种方式：

第一种是使用 JDK 提供的 `Executors` 工具类。它封装了几种常见的线程池类型，比如固定大小的线程池、缓存线程池、单线程池和支持定时任务的线程池。这种方式创建线程池非常方便，适合快速开发和一般业务场景。

第二种是直接使用 `ThreadPoolExecutor` 类进行自定义创建。它是线程池的核心实现类，可以精细地配置核心线程数、最大线程数、任务队列、线程存活时间以及拒绝策略等参数。相比 `Executors`，`ThreadPoolExecutor` 更灵活，也更适合在复杂或高并发场景中使用。

## 线程池的大小

线程池并不是越大越好，它的大小应该根据业务特性、系统资源和任务类型来合理设定。过小的线程池会导致并发能力不足，处理速度慢；但过大的线程池会消耗大量系统资源，甚至引发线程切换频繁、内存压力大或系统崩溃等问题。

设定线程池大小时，通常要区分任务是**CPU 密集型**还是**IO 密集型**。

对于 **CPU 密集型任务**，例如大量计算、加密等，这类任务几乎不涉及阻塞，CPU 是主要瓶颈。线程数设置得太多反而导致频繁上下文切换，反而降低效率。比较合理的配置是：

> 线程数 ≈ CPU 核心数 或 CPU 核心数 + 1

对于 **IO 密集型任务**，比如读写文件、访问数据库、网络请求等，线程大部分时间都在等待 IO 完成。这种情况下线程是“阻塞多、运行少”，可以适当增加线程数来提高吞吐。常见经验值是：

> 线程数 ≈ CPU 核心数 × 2 或更高（甚至 2~4 倍）

当然这些只是经验估算，实际项目中最好通过 **压测** 和 **监控指标**进行动态调整，找到一个平衡点。还要结合服务器内存、上下文切换成本、业务响应时间要求等因素。

此外，对于不同类型的业务，建议**将线程池拆分多个子池**分别管理，避免一个高延迟业务拖慢其他任务处理，提升系统整体可控性。

## 如何动态修改线程池参数

在 Java 中，`ThreadPoolExecutor` 提供了多个 **set 方法**，允许我们在运行过程中动态修改线程池的关键参数，比如核心线程数、最大线程数、线程空闲时间等。这意味着线程池的行为可以根据系统负载、业务波动动态调整，从而提升系统的弹性和稳定性。

具体来说，常用的方法包括：

- `setCorePoolSize(int)`：动态修改核心线程数；
- `setMaximumPoolSize(int)`：修改最大线程数；
- `setKeepAliveTime(long, TimeUnit)`：修改线程空闲存活时间；
- `allowCoreThreadTimeOut(boolean)`：设置核心线程是否允许回收。

比如，在高峰时段我们可以适当调高线程数，提升处理能力；低负载时调低线程数，减少资源占用。线程池会自动根据新配置调整行为，比如释放多余线程或允许创建新线程。

除了手动调用 `set` 方法，实际项目中也可以结合 **配置中心** 或 **动态监控系统**，实现线程池参数的自动调节。例如，结合 Apollo、Nacos 或 Spring Cloud Config 等，可以做到线程池参数热更新，无需重启应用。

## 处理任务的流程

线程池处理任务的过程，其实可以分为几个阶段，按照“能否创建线程”、“队列是否有空间”、“是否超过最大线程数”这样的判断逻辑来一步步决定任务的去向。

当线程池调用 `execute()` 提交一个任务时，它会按照以下顺序处理：

第一步，线程池会判断当前运行的线程数量是否小于核心线程数。如果还没达到核心数，就会直接创建一个新的线程来执行这个任务，这样可以快速响应初始请求。

第二步，如果核心线程已经满了，线程池会尝试将任务放入任务队列中。如果队列还有空间，任务就会被缓存等待，由已有的线程来逐个处理。

第三步，如果队列也满了，说明线程池已经有压力了，此时线程池会判断当前线程数是否还没达到最大线程数。如果还没到上限，就会继续创建新的线程来处理任务。

第四步，如果最大线程数也达到了，并且队列也满了，这时就说明线程池完全饱和了，新的任务将会被拒绝，具体怎么拒绝则由拒绝策略决定。

从这个流程可以看出，线程池会优先使用核心线程快速响应，其次是队列缓冲，最后才是扩容线程，目的是在保证性能的同时，尽可能避免资源过度使用。

>在 Java 的线程池中，**线程的复用**是通过任务队列配合工作线程机制实现的。线程池中的每个工作线程在执行完一个任务后，不会立即销毁，而是从任务队列中继续取出下一个任务执行。只要线程还处于存活状态，线程池就会不断复用它来处理多个任务，从而避免频繁创建销毁线程所带来的性能损耗。
>
>关于**任务调度是否公平**，这取决于线程池所使用的任务队列类型。比如 `ArrayBlockingQueue` 和 `LinkedBlockingQueue` 默认采用 FIFO（先进先出）策略，因此任务提交顺序与执行顺序基本一致，调度相对公平。但如果使用了优先级队列 `PriorityBlockingQueue`，任务会根据优先级进行排序，这时调度就不是严格的 FIFO，而是按优先级“择优执行”，这属于业务驱动的不公平调度。
>
>至于**如何避免线程泄漏**，核心在于合理管理线程的生命周期以及及时清理任务和资源。首先要避免无界队列，因为它可能导致大量任务堆积，线程池长时间保持活跃线程不回收。其次要设置合理的线程空闲回收时间（keepAliveTime），并允许核心线程超时回收（`allowCoreThreadTimeOut`）。此外，还要确保任务内部不阻塞、不死锁，比如避免任务内部调用同步锁等待、IO 长时间卡住，防止线程一直挂起导致无法复用。
>
>如果是使用线程池处理数据库连接或网络调用等敏感资源，也建议在线程执行完任务后，显式关闭资源，防止任务代码自身导致资源泄漏从而间接拖住线程。

## 线程池线程异常

**线程池中线程异常后，销毁还是复用？**

在线程池中，如果某个线程在执行任务时发生了**未捕获的运行时异常**，这个线程会被**线程池自动移除，不再复用**。也就是说，**该线程会被销毁**，线程池会根据需要创建一个新的线程来补充，保持线程池的基本运行能力。

这是因为线程在发生未捕获异常时，会中断执行流程，处于不可预期的状态。为了保证线程池后续任务的安全性，JDK 的设计是让线程直接退出，由线程池自行维护线程数量。

不过如果任务内部**捕获了异常并处理**，线程就不会退出，仍然可以继续复用。这就说明：**线程是否被销毁，取决于异常是否被吞掉或处理掉**。

因此，在实际开发中，一个良好的实践是：**在线程池中的任务内部要做好异常捕获和日志记录**，避免线程因异常退出，造成线程池频繁创建新线程，甚至影响整体性能或日志难以排查。

```text
线程池中的线程如果执行任务时抛出未捕获异常，会被销毁，不再复用；如果异常被任务代码内部捕获处理，则线程仍会被复用。
```

## 线程池命名

在线程池中给线程命名，主要是为了在调试、日志、监控或出错时，能够快速识别是哪个线程池、哪类业务出了问题。默认情况下线程池创建的线程名字是没有业务含义的，调试时非常不方便。

为了给线程池命名，我们通常会**自定义 ThreadFactory**。这个接口负责线程的创建逻辑，可以在创建线程时给它设置有意义的名称，比如加上业务前缀、线程编号等。

在实际项目中，比较常见的做法是使用 `Executors.defaultThreadFactory()` 的包装类，或者使用像 Google 的 Guava、阿里的 `ThreadFactoryBuilder` 工具类，来自动生成带前缀的线程名，比如 `"order-service-pool-1-thread-3"` 这样的格式。这样当我们通过日志、JStack 或线程监控工具查看线程状态时，可以一眼看出是哪个模块的线程出了问题。

合理命名线程不仅有利于排查 bug，也有利于系统运维监控和日志归类，是构建稳定可维护系统的一种好习惯。



## 不推荐使用内置线程池

实际开发中，不推荐直接使用`Executors` 工具类来快速创建线程池（内置线程池）。

1. **隐藏的资源风险：任务队列无界**

例如，`newFixedThreadPool` 和 `newSingleThreadExecutor` 内部使用的是**无界队列**，也就是说如果任务提交得太快，超过线程处理能力，任务会无限堆积，导致内存占用不断上升，严重时甚至引发 **OOM（内存溢出）**。

而开发者往往不易察觉，因为这些方法对参数封装太多，**不透明、不可控**。

2. **最大线程数不可控**

像 `newCachedThreadPool` 会根据任务数量**无限制地创建新线程**，如果短时间内有大量并发请求，可能导致系统创建大量线程，占满 CPU 和内存资源，甚至把系统压垮。

3. **拒绝策略不明确**

内置线程池默认使用的是 `AbortPolicy` 拒绝策略，也就是说，当线程池满了并且队列也满时，会**直接抛出异常**，如果业务代码没有处理好，就可能导致任务丢失或程序崩溃。

4. **不符合实际业务需求**

实际业务中往往需要根据具体场景调整线程池参数，比如控制最大并发量、设置有界队列、限制任务等待时间等。而内置线程池不支持这种精细化配置，不适合复杂场景。

**推荐做法：**

在生产环境中，更推荐**手动使用 `ThreadPoolExecutor` 来创建线程池**，明确指定核心线程数、最大线程数、队列容量和拒绝策略，从而在性能、安全性和资源使用之间做出合理权衡。

## 常见参数

常见的几个参数包括：核心线程数、最大线程数、线程存活时间、任务队列、线程工厂和拒绝策略。

首先是核心线程数，也就是 corePoolSize。它表示线程池中始终保留的线程数量，即使这些线程空闲，也不会被销毁。当有新任务到来时，如果当前线程数还没达到这个值，就会优先创建新线程来处理任务。

接着是最大线程数，也就是 maximumPoolSize。它定义了线程池允许创建的最大线程数量。当任务很多，核心线程都在忙，并且任务队列也满了，线程池才会创建超过核心数量的线程，但不会超过这个最大值。

然后是 keepAliveTime，它表示线程在空闲状态下的最大存活时间。超过这个时间没有新任务时，非核心线程会被回收掉。如果配置了允许核心线程超时，这个参数对核心线程也生效。

任务队列是线程池内部用于缓存等待执行任务的数据结构。比较常见的有有界队列和无界队列。如果使用无界队列，比如默认的 LinkedBlockingQueue，在任务堆积过多时容易导致内存溢出。生产环境中更推荐使用有界队列，能更好地控制系统负载。

线程工厂用于定制线程的创建方式，比如给线程起个有意义的名字，设置是否为守护线程等。合理命名线程有助于排查问题和监控线程状态。

最后是拒绝策略。当线程池达到最大线程数并且任务队列已满时，新的任务就无法被接受，这时就会触发拒绝策略。常见的策略包括直接抛出异常、由调用线程执行任务、丢弃任务，或者丢弃最旧的任务。

整体来看，线程池参数的配置需要根据具体业务场景来调整。核心线程数决定基本并发能力，最大线程数控制系统极限，队列影响任务调度方式，拒绝策略则决定在资源耗尽时如何应对。合理配置这些参数，才能构建出稳定、高效、可控的并发系统。

## 核心线程

`ThreadPoolExecutor` 默认不会回收核心线程，即使它们已经空闲了。

核心线程空闲时，其状态分为以下两种情况：

- **设置了核心线程的存活时间** ：核心线程在空闲时，会处于 `WAITING` 状态，等待获取任务。如果阻塞等待的时间超过了核心线程存活时间，则该线程会退出工作，将该线程从线程池的工作线程集合中移除，线程状态变为 `TERMINATED` 状态。
- **没有设置核心线程的存活时间** ：核心线程在空闲时，会一直处于 `WAITING` 状态，等待获取任务，核心线程会一直存活在线程池中。

当队列中有可用任务时，会唤醒被阻塞的线程，线程的状态会由 `WAITING` 状态变为 `RUNNABLE` 状态，之后去执行对应任务。

## 拒绝策略

线程池的拒绝策略是指，当线程池中的线程数量已经达到最大限制，任务队列也满了，这时再有新任务提交，线程池该如何处理。这种情况通常出现在高并发或任务堆积时，是系统的一种保护机制。

Java 提供了四种内置的拒绝策略。第一种是默认的策略，叫做 AbortPolicy，它的行为是直接抛出异常，告诉调用者任务提交失败。这种方式可以让系统快速感知到线程池的饱和状态，适合对任务执行可靠性要求高的场景。

第二种是 CallerRunsPolicy，它不会抛异常，而是把任务交给调用线程自己去执行。也就是说，谁提交的任务，谁来处理。这种方式会拖慢任务提交速度，相当于起到一个自动限流的作用，能在一定程度上保护线程池不被压垮。（如果想要保证任何一个任务请求都要被执行的话选择）

>**CallerRunsPolicy 拒绝策略有什么风险**
>
>最典型的问题是阻塞主线程。比如在 Web 请求中，如果任务提交者是主线程或处理 HTTP 请求的线程，当线程池压力过大时，请求线程会被强制执行后台任务，导致处理变慢，甚至请求堆积，引发系统响应变慢、吞吐下降，进而影响整体可用性。
>
>解决这个问题的关键在于风险可控和任务隔离。常见的做法包括：
>
>第一，合理设置线程池的核心线程数、最大线程数和任务队列长度，确保在正常负载下不会轻易触发拒绝策略。
>
>第二，对于核心任务，尽量使用限流、降级、熔断等机制提前兜底，避免所有请求都压进线程池。
>
>第三，可以为重要线程池设置更严格的容量限制，并使用监控告警及时发现线程池拥堵。
>
>第四，如果业务允许，也可以考虑自定义拒绝策略，比如记录日志、异步入队重试、或发送报警通知。

第三种是 DiscardPolicy，顾名思义，就是直接丢弃新提交的任务，不处理也不抛异常。它的优点是简单粗暴，但缺点也很明显，任务可能悄无声息地被丢掉，适合那些可以容忍部分任务失败的场景，比如日志采集或监控上报。

第四种是 DiscardOldestPolicy，它会丢弃任务队列中最早的那个任务，然后尝试把当前任务放进去。适用于那些老任务可能已经没什么意义，而新任务更重要的业务，比如某些实时推送场景。

总体来看，AbortPolicy强调任务不能丢；CallerRunsPolicy强调保护线程池，通过牺牲调用方速度来降压；DiscardPolicy牺牲任务可靠性换取线程池稳定性；而 DiscardOldestPolicy则是一种保新弃旧的权衡策略。

选择哪种拒绝策略，取决于业务是否允许任务丢失、能否接受延迟处理，或者是否需要快速失败提示。在高并发系统中，合理设置拒绝策略是保障系统稳定运行的重要一环。

## 阻塞队列

在 Java 的线程池中，**阻塞队列（BlockingQueue）**用于保存等待执行的任务。

**第一，ArrayBlockingQueue**
 这是一个**有界的、基于数组的队列**，在创建时必须指定容量。它按先进先出（FIFO）顺序存储任务。
 由于队列容量固定，可以防止任务无限堆积，常用于生产环境中限制系统负载，是最推荐的一种阻塞队列。

**第二，LinkedBlockingQueue**
 这是一个**基于链表的队列**，可以选择有界也可以无界。`Executors.newFixedThreadPool()` 默认使用的就是它。
 它的特点是队列默认容量非常大（`Integer.MAX_VALUE`），如果不设上限，任务可能会在高并发下不断堆积，最终导致内存溢出。实际使用时应避免无界，建议手动设定合理上限。

**第三，SynchronousQueue**
 这是一个**不存储元素的队列**，每一个 put 操作必须等待一个 take，任务不会进入队列，而是**直接交给线程执行**。
 这种队列通常与 `maximumPoolSize` 搭配使用，适合任务非常短、非常频繁、线程创建成本较低的场景。`Executors.newCachedThreadPool()` 就使用了它。

**第四，PriorityBlockingQueue**
 这是一个支持**任务优先级排序**的队列，元素需要实现 `Comparable` 接口或提供自定义 `Comparator`。
 线程池根据任务优先级调度执行，适合对任务有强优先级要求的场景，比如调度系统、限速队列等。
 但要注意，它是**无界的**，也可能导致内存溢出，需谨慎使用。

- **ArrayBlockingQueue**：常用、有界、安全，推荐；
- **LinkedBlockingQueue**：默认无界，使用时应设上限；
- **SynchronousQueue**：无队列，适合高并发短任务；
- **PriorityBlockingQueue**：支持优先级，适合调度型场景。

# 关键字等

[Java基础面试题   volatile和sychronized如何实现单例模式 | 小林coding](https://xiaolincoding.com/interview/java.html#volatile和sychronized如何实现单例模式)

## volatile

`volatile` 是 Java 中一种轻量级的内存同步机制，用于修饰变量，确保变量的**可见性**和**禁止指令重排序**。然而，它并不保证操作的**原子性**。

在 Java 中，每个线程都有自己的工作内存，当线程操作一个变量时，首先会从主内存拷贝该变量的副本到工作内存，线程只会操作工作内存中的副本，最后在合适的时候将结果刷新回主内存。如果没有适当的同步机制，可能导致多个线程读取到的变量值不同，从而出现可见性问题。`volatile` 通过确保线程写入变量时，会立刻将其更新到主内存，并且线程每次读取时，都会从主内存中获取最新的值，从而解决了**可见性**问题。

为了提高性能，计算机可能对程序指令进行重排序，而 `volatile` 可以禁止对带有 `volatile` 变量的写操作和后续读操作的**重排序**，确保这些操作按顺序执行。当一个变量被声明为 `volatile` 时，Java 编译器和 CPU 会在它的读写操作前后插入特定的内存屏障。

然而，`volatile` 并不保证**原子性操作**。比如对 `volatile` 变量的递增操作（`++`）可能仍然会出现竞态条件，因为它涉及多个步骤：读取、修改和写入。因此，仍然需要 `synchronized` 或其他机制来保证原子性。

`volatile` 的底层实现依赖于 Java 内存模型（JMM），通过内存屏障来确保变量的可见性和禁止指令重排序。

## synchronized

`synchronized` 是 Java 中最基本的线程同步机制，用于**保证多线程环境下对共享资源的互斥访问**。它可以修饰方法或代码块，达到加锁的效果，从而避免线程安全问题。

`synchronized` 主要有三种**用法**：

1. 修饰实例方法：锁的是当前对象（`this`），保证同一实例的同步。
2. 修饰静态方法：锁的是类对象（`Class`），适用于类级别的同步。
3. 修饰代码块：可以指定任意对象作为锁，更加灵活，适合控制粒度。

```text
构造方法不能使用 synchronized 关键字修饰。不过，可以在构造方法内部使用 synchronized 代码块。
另外，构造方法本身是线程安全的，但如果在构造方法中涉及到共享资源的操作，就需要采取适当的同步措施来保证整个构造过程的线程安全。
```

### **底层原理**

`synchronized` 是 Java 提供的内置锁机制，它的底层原理主要依赖于 JVM 的实现，特别是在 HotSpot 虚拟机中，锁是通过**对象头中的 Monitor（监视器）**来实现的。

首先，从编译层面来看，当我们使用 `synchronized` 修饰代码块或方法时，Java 编译器会在字节码中生成两条指令：`monitorenter` 和 `monitorexit`，分别对应加锁和释放锁的操作。JVM 在运行时会通过这两个指令来管理锁的获取和释放。

从运行时角度来看，每个对象在内存中都有一个对象头，其中包含了一块叫做 Mark Word 的区域，它记录了对象的哈希码、GC信息以及锁标志位。当线程尝试进入同步代码块时，会先查看这个对象头的锁状态，并尝试通过 CAS 操作去获取锁。如果获取失败，根据当前锁的状态，可能会进入自旋或者阻塞等待。

为了提升锁的性能，HotSpot JVM 在 JDK 1.6 开始引入了**锁优化机制**，将锁分为四种状态：

1. **无锁**：初始状态，无任何线程竞争；
2. **偏向锁**：当只有一个线程访问同步块时，会将锁偏向该线程，之后这个线程进入同步块时不再进行 CAS 操作；
3. **轻量级锁**：当多个线程尝试竞争偏向锁时，偏向锁会升级为轻量级锁，线程通过自旋方式尝试获取锁，避免了线程挂起和恢复的开销；
4. **重量级锁**：当自旋失败，竞争激烈时，锁会升级为重量级锁，其他线程会被挂起，等待唤醒。

这些锁的状态是根据竞争情况**自动升级**的，从偏向锁到轻量级锁再到重量级锁，但不会降级。这种策略是为了提高获得锁和释放锁的效率。

最后，在内存语义方面，`synchronized` 也保证了**可见性和有序性**。进入同步代码块之前，线程会将工作内存中的共享变量值清空，从主内存中重新读取；退出同步块时会将修改后的值刷新回主内存，从而保证了线程之间数据的可见性。

### 偏向锁废弃

偏向锁最早是在 **JDK 1.6** 引入的，目的是**优化无竞争场景下的加锁性能**。它会将锁“偏向”于第一个获得锁的线程，以后这个线程再次进入同步块时就不需要执行 CAS 操作，从而提高性能。

不过，在**JDK 15** 中，**偏向锁被默认关闭**（通过 JVM 参数 `UseBiasedLocking=false`），因为随着硬件和 JVM 其他优化手段（如轻量级锁、自旋锁）的提升，偏向锁的收益变小了。

最终在 **JDK 18 中，偏向锁被彻底移除**，JVM 不再支持这个机制。

### 和 volatile 有什么区别

`synchronized` 关键字和 `volatile` 关键字是两个互补的存在，而不是对立的存在！

- `volatile` 关键字是线程同步的轻量级实现，所以 `volatile`性能肯定比`synchronized`关键字要好 。但是 `volatile` 关键字只能用于变量而 `synchronized` 关键字可以修饰方法以及代码块 。
- `volatile` 关键字能保证数据的可见性，但不能保证数据的原子性。`synchronized` 关键字两者都能保证。
- `volatile`关键字主要用于解决变量在多个线程之间的可见性，而 `synchronized` 关键字解决的是多个线程之间访问资源的同步性

## ReentrantLock

`ReentrantLock` 是 Java 中 `java.util.concurrent.locks` 包下的一个**可重入独占锁**，它提供了比 `synchronized` 更加灵活和强大的线程同步机制。

首先，`ReentrantLock` 和 `synchronized` 的核心功能类似，都是用来实现**线程间的互斥访问**，但它提供了更多高级特性，包括：

1. **可重入性**：同一个线程可以重复获取同一把锁，不会死锁。
2. **可中断锁获取**：可以调用 `lockInterruptibly()` 来实现响应中断，避免死等。
3. **限时尝试加锁**：通过 `tryLock()` 设置超时时间，控制等待时间。
4. **公平锁与非公平锁**：构造函数可以传入 `true` 创建公平锁，先来先得，默认是非公平锁，性能更好。
5. **结合 Condition 使用**：可以创建多个条件队列（`newCondition()`），实现类似 `Object.wait/notify` 的机制，但更灵活。

从底层实现来看，`ReentrantLock` 基于 **AQS（AbstractQueuedSynchronizer）**，通过一个**FIFO 等待队列**管理线程的排队和唤醒，内部依赖 **CAS + 自旋 + 阻塞机制** 实现高效的线程调度。

相比 `synchronized`，`ReentrantLock` 更适合高并发或复杂线程控制场景，例如需要超时控制、公平策略或多个条件队列的情况。但要注意，它**必须手动释放锁**，一般建议用 `try-finally` 块包裹，防止死锁。

### 和synchronized有什么区别

在 Java 中，`synchronized` 和 `ReentrantLock` 都是用来实现线程同步的工具，但它们在实现机制、功能特性以及使用灵活性上有明显的区别。

首先，从实现层面来说，`synchronized` 是 Java 的一个关键字，由 JVM 层面直接支持。它的加锁和释放锁操作是由编译器和虚拟机自动控制的，使用起来比较简单。我们只需要加在方法或者代码块上，就能实现互斥访问。而 `ReentrantLock` 是一个显示锁，属于 `java.util.concurrent.locks` 包，它是基于 AQS（AbstractQueuedSynchronizer）框架实现的，锁的获取和释放都需要我们手动操作。

其次，在功能方面，`ReentrantLock` 提供了比 `synchronized` 更丰富的控制能力。例如，它支持**可中断锁获取**，也就是说线程在等待锁的过程中可以响应中断；还支持**限时尝试加锁**，通过 `tryLock()` 方法可以设置超时时间，这在一些高并发场景中非常有用。此外，它还支持**公平锁机制**，我们可以通过构造函数指定锁是公平的还是非公平的。而 `synchronized` 是非公平的，线程获取锁的顺序无法控制。

再者，在等待通知机制上，`ReentrantLock` 提供了一个 `Condition` 类，可以创建多个条件变量，用于更细粒度的线程控制。而 `synchronized` 只能依赖对象的 `wait()` 和 `notify()` 方法，且每个对象只能有一个条件队列，控制能力比较弱。

最后，从性能角度看，早期的 `synchronized` 性能较差，但自从 JDK 1.6 引入了偏向锁、轻量级锁等优化后，它的性能已经大幅提升。在低竞争或短时间加锁的场景下，`synchronized` 的性能和 `ReentrantLock` 是相当的。而在复杂并发场景中，`ReentrantLock` 通常更有优势，因为它支持非阻塞的锁获取方式，可以减少线程切换和上下文开销。

总结来说，`synchronized` 更适合结构简单、对性能要求不高的场景，使用方便、易于维护；而 `ReentrantLock` 则适用于并发更复杂、需要更强控制力的场合，比如可中断、限时、公平锁或多个等待条件等需求。

## ReentrantReadWriteLock

`ReentrantReadWriteLock` 是 Java 并发包中提供的一种**读写分离锁**，它实现了 `ReadWriteLock` 接口，内部包含一把**读锁（共享锁）和一把写锁（独占锁）**，用于提升多线程读操作时的并发性能。

它的核心思想是：**读操作可以并发执行，写操作必须独占**。也就是说，多个线程可以同时获取读锁，只要没有线程持有写锁；而写锁一旦被持有，其他线程无论是读还是写，都会被阻塞。

举个简单的例子，如果系统中读远远多于写，比如缓存读取场景，就可以使用 `ReentrantReadWriteLock` 来让多个线程并发读，提高吞吐量；而当写操作发生时，它会自动阻塞其他读写线程，直到写操作完成。

这个锁的**特点**包括：

1. **可重入性**：读锁和写锁都支持可重入。写线程可以再次获取写锁，也可以在持有写锁的情况下获取读锁（锁降级）；但读锁不能升级为写锁，避免死锁。
2. **支持公平和非公平模式**：默认是非公平锁，也可以通过构造函数创建公平锁，保证线程获取锁的顺序。
3. **锁降级支持**：写锁可以降级为读锁，即线程在持有写锁的同时获取读锁，再释放写锁，这对缓存更新等场景非常有用。
4. **基于 AQS 实现**：它内部使用两个 `Sync` 子类分别管理读和写的状态，读锁是共享模式，写锁是独占模式。

>**读锁和写锁**
>
>在线程持有读锁的情况下，该线程不能取得写锁(因为获取写锁的时候，如果发现当前的读锁被占用，就马上获取失败，不管读锁是不是被当前线程持有)。
>
>在线程持有写锁的情况下，该线程可以继续获取读锁（获取读锁时如果发现写锁被占用，只有写锁没有被当前线程占用的情况才会获取失败）。
>
>写锁可以降级为读锁，但是读锁却不能升级为写锁。这是因为读锁升级为写锁会引起线程的争夺，毕竟写锁属于是独占锁，这样的话，会影响性能。
>
>另外，还可能会有死锁问题发生。举个例子：假设两个线程的读锁都想升级写锁，则需要对方都释放自己锁，而双方都不释放，就会产生死锁。

## StampedLock

不重要

`StampedLock` 是 Java 8 中引入的一种新的锁机制。它是为了解决传统读写锁在高并发读场景下性能不够理想的问题，提供了**更高吞吐量的读写控制机制**。

和 `ReentrantReadWriteLock` 类似，`StampedLock` 也提供**读锁、写锁**，但它的核心机制不同：**每次加锁都会返回一个 stamp（戳），这个戳是一个 long 值，用于后续解锁或验证操作**。

### 三种模式：

1. **写锁（write lock）**：是独占的，获取方式是 `lockWrite()`，释放用 `unlockWrite(stamp)`，类似于传统的写锁。
2. **悲观读锁（read lock）**：是共享的，通过 `lockRead()` 获取，适用于读操作频繁、对数据一致性要求高的场景。
3. **乐观读锁（optimistic read）**：最大的特点。使用 `tryOptimisticRead()` 获取一个 stamp，不加锁，读取后用 `validate(stamp)` 检查期间数据是否被写线程修改。如果验证通过，说明读取的数据有效；否则需要回退到悲观读锁重新读取。

这种**乐观读**机制非常适合**读多写少**的高并发环境，能极大减少读写冲突，提高系统并发性。

### 与 ReentrantReadWriteLock 的区别：

- `StampedLock` 支持**乐观读**，能在无锁条件下完成读取，提高性能；
- `StampedLock` **不可重入**，即线程不能重复获取相同类型的锁；
- 解锁必须依赖加锁返回的 `stamp` 值，**不支持 `Condition` 条件变量**；
- **使用更复杂**，需要手动控制 `stamp` 的获取与验证，但灵活性和性能更高。

## ThreadLocal

`ThreadLocal` 是 Java 提供的一种线程本地变量工具，它的作用是**为每个线程提供一份独立的变量副本**，从而避免多线程访问共享变量时产生的线程安全问题。

简单来说，通过 `ThreadLocal`，每个线程访问的变量都是它自己私有的，互不干扰。它非常适合用于**线程范围内共享但线程之间隔离的场景**，比如用户会话信息、数据库连接、事务管理等。

### 实现原理

它的底层原理并不是把数据放在 `ThreadLocal` 对象里，而是将数据**存储在线程内部**。具体来说，每个线程内部都有一个专门的结构，叫做 `ThreadLocalMap`，这是一个专门用于存储当前线程的本地变量副本的特殊哈希表。这个表的键是 `ThreadLocal` 实例本身，值就是线程自己对应的数据。

当我们调用 `ThreadLocal.set()` 方法时，其实就是把数据存进了当前线程自己的那张表里；而调用 `get()` 方法时，系统就会从这张表中查找与当前 `ThreadLocal` 实例对应的值。也就是说，虽然所有线程共享同一个 `ThreadLocal` 对象，但它们访问的是自己线程内部的数据，因此互不影响。

这个设计的最大特点是**隔离性**：每个线程只访问自己的变量副本，没有共享，不需要加锁，从根本上避免了线程安全问题。

不过，`ThreadLocalMap` 有一个值得注意的点：它的键是一个弱引用，也就是说，如果某个 `ThreadLocal` 对象没有被外部强引用持有，那么它的键会被垃圾回收，而它对应的值还会残留在线程内部，导致内存泄漏。这个问题在使用线程池时尤其明显，因为线程会被复用，如果变量没被清理，可能影响后续线程的执行。因此在使用 `ThreadLocal` 后，建议手动调用 `remove()` 方法，及时清理变量。

此外，Java 还提供了 `InheritableThreadLocal`，它允许子线程继承父线程的变量副本，适合用于线程间传递一些上下文信息，比如用户身份、请求 ID 等。

### 内存泄漏

`ThreadLocal` 可能导致**内存泄露**，主要是因为它底层使用的 `ThreadLocalMap` 中，**key 是弱引用，value 是强引用**，而且这个 map 是保存在线程对象内部的。

具体来说，当我们创建一个 `ThreadLocal` 变量并使用后，如果外部代码没有强引用再指向这个变量，那么 JVM 会在下一次垃圾回收时**回收掉这个弱引用的 key**，但是由于 `ThreadLocalMap` 中的 value 是强引用，它不会被自动回收，就会变成一个“key 为 null，value 还存在”的残留对象。

更关键的是：这个 `ThreadLocalMap` 是存在线程对象里的，而**线程对象本身不会被回收，尤其在线程池中会被长时间复用**，这就导致那些 key 为 null 的 value 长期留在内存里，形成内存泄露。

**正确做法：**

在使用 `ThreadLocal` 时，务必在使用完毕后手动调用 `remove()` 方法，清除当前线程中的变量，释放引用，防止内存泄漏。

### 跨线程传递ThreadLocal 的值

普通 `ThreadLocal` 无法跨线程传递。因为它是为线程隔离设计的，每个线程内部维护自己独立的变量副本，默认线程之间是互不可见的。

在实际开发中，我们有时候确实需要把某些线程上下文信息，比如用户身份、请求 ID、事务信息等，从一个线程**传递给另一个线程**。这就涉及了 **“ThreadLocal 跨线程传递”**的问题。

---

**1. InheritableThreadLocal：用于父子线程传递**

Java 标准库提供了一个子类叫 `InheritableThreadLocal`，它的作用是在**子线程创建时**，把父线程中对应的 ThreadLocal 值**复制一份**到子线程里。

原理是在 `Thread` 类中，创建子线程时会检查父线程是否有 `inheritableThreadLocals`，如果有，就将其内容拷贝到子线程。

这个机制可以实现在子线程中读取父线程设置的变量值，但也有两个局限：

- **只在创建子线程那一刻生效**，后续父线程对变量的修改，子线程无法感知；
- **在线程池中无效**，因为线程池中的线程是复用的，不会重新触发拷贝操作。

------

**2. TransmittableThreadLocal：解决线程池场景下的变量传递**

为了支持在线程池中也能传递上下文变量，阿里开源了一个增强版工具类叫 **`TransmittableThreadLocal`（TTL）**。

TTL 的核心原理是：在任务提交给线程池时，它会把当前线程中的所有 TTL 变量**复制到任务中**，再由框架在任务执行前注入到目标线程，执行完后再恢复现场。通过这种**包装 Runnable 或 Callable 的方式**，实现了跨线程、跨线程池上下文的“显式传递”。

简单来说，TTL 是通过 **任务封装 + ThreadLocalMap 拷贝 + 执行前注入 + 执行后清理** 实现变量在异步线程之间的“可控传播”。

这解决了 `InheritableThreadLocal` 在线程池中无效的问题，是在日志链路追踪、分布式调用等场景下非常实用的方案。

# 其他

## Future

`Future` 是 Java 5 引入的一个接口，用于表示一个异步计算的结果。它通常与 `ExecutorService` 搭配使用，用来提交任务并获取结果。调用 `submit()` 方法后，主线程可以继续执行其他操作，稍后通过 `Future` 获取任务的执行结果。

`Future` 的核心方法包括：

- `get()`：阻塞当前线程，直到任务执行完毕并返回结果；
- `get(long, TimeUnit)`：指定最大等待时间，防止无限阻塞；
- `isDone()`：判断任务是否已经完成；
- `isCancelled()` 和 `cancel()`：用于任务的取消控制。

虽然 `Future` 支持异步获取结果，但它本身是**阻塞式的**。也就是说，如果你调用 `get()` 方法，主线程仍然会被阻塞直到结果返回，因此并不是真正意义上的“非阻塞异步”。

此外，`Future` 不支持任务之间的组合、链式调用，也不具备异常回调等机制，编程模型较为原始。在复杂并发场景下，使用起来相对繁琐，缺乏灵活性。

正因为这些局限，Java 8 后引入了更强大的 `CompletableFuture`，它是对 `Future` 的增强，解决了结果阻塞、组合困难、缺乏回调等问题。

## CompletableFuture

`CompletableFuture` 是 Java 8 引入的一个强大的异步编程工具，用于表示一个可能在未来某个时间点完成的计算结果。它不仅可以实现类似 `Future` 的异步任务提交与获取，还大大增强了任务之间的组合、异常处理、以及非阻塞回调等能力。

与传统的 `Future` 相比，`CompletableFuture` 最大的优势有三点：

第一，它支持任务之间的链式组合，比如可以在任务执行完成后自动触发下一个任务（如 `thenApply`、`thenAccept`、`thenCompose`），从而实现流式异步逻辑，而不需要手动阻塞或轮询。

第二，它提供了丰富的并发编排方法。可以通过 `thenCombine`、`allOf`、`anyOf` 等方法将多个异步任务组合起来，控制它们的并发执行和聚合结果，非常适合构建复杂的异步流程。

第三，它支持异常处理和任务回退机制，比如 `exceptionally`、`handle`、`whenComplete` 等，可以在任务失败时优雅地处理异常，避免主流程崩溃。

此外，`CompletableFuture` 还支持异步任务的执行线程控制。默认会使用公共线程池（ForkJoinPool），也可以通过 `supplyAsync` 或 `runAsync` 指定自定义线程池，便于在不同业务中做资源隔离。

总的来说，`CompletableFuture` 让 Java 的异步编程变得更加灵活、优雅、非阻塞，并且非常适合在高并发、响应式、微服务等场景中使用。

### [一个任务需要依赖另外两个任务执行完之后再执行，怎么设计？](https://javaguide.cn/java/concurrent/java-concurrent-questions-03.html#⭐️一个任务需要依赖另外两个任务执行完之后再执行-怎么设计)

### [使用 CompletableFuture，有一个任务失败，如何处理异常？](https://javaguide.cn/java/concurrent/java-concurrent-questions-03.html#⭐️使用-completablefuture-有一个任务失败-如何处理异常)

### [在使用 CompletableFuture 的时候为什么要自定义线程池？](https://javaguide.cn/java/concurrent/java-concurrent-questions-03.html#⭐️在使用-completablefuture-的时候为什么要自定义线程池)

## AQS

AQS，全称是 **AbstractQueuedSynchronizer**，是 Java 并发包 `java.util.concurrent.locks` 下的一个抽象类。它是构建**锁和同步器的核心基础框架**，底层支撑了 ReentrantLock、Semaphore、CountDownLatch、ReadWriteLock 等多种并发工具。

AQS 的核心思想是：**将同步状态的管理与线程排队逻辑分离**，并通过一个 **FIFO 双向队列**来管理获取锁失败的线程。

它内部维护了一个 `int` 类型的变量，叫做**同步状态（state）**，用于表示资源的占用情况。比如：独占锁会将 state 为 0 表示未被占用，1 表示占用；共享锁可能用大于 0 的值来表示剩余许可。

线程在尝试获取锁时，如果资源可用，AQS 会通过 `CAS` 操作尝试修改 state 值；如果失败，则会将当前线程封装成一个节点加入**等待队列（CLH 队列）**，然后阻塞挂起。

一旦资源释放，AQS 会从队列中唤醒下一个等待线程，重新尝试获取锁，从而实现公平或非公平的线程调度。

AQS 提供了两种模式：**独占模式（Exclusive）** 和 **共享模式（Shared）**。独占模式下，同一时刻只能有一个线程持有资源，比如 ReentrantLock；共享模式下，允许多个线程共享资源，比如 Semaphore 和 ReadWriteLock 的读锁。

### 原理

AQS 的核心原理可以总结为三点：**同步状态管理、CLH 队列维护、线程阻塞与唤醒机制**。

首先，AQS 通过一个 `volatile int state` 变量来表示共享资源的状态。线程要想获取锁，必须先尝试修改这个 state。修改通常是通过 **CAS（Compare-And-Swap）原子操作**完成的，确保在并发场景下能安全地竞争资源。

如果线程获取 state 成功，就说明资源可用，它可以继续执行；如果失败，说明资源当前不可用，线程就会被封装成一个 `Node` 节点，加入到 AQS 内部维护的一个 **双向 FIFO 队列**中，这个队列本质上是一个变种的 CLH 队列（即链式等待队列）。

排队的线程并不会自旋消耗 CPU，而是通过调用 `LockSupport.park()` 方法被**挂起阻塞**，直到前驱节点释放资源并显式调用 `unpark()` 唤醒它。

当锁释放时，线程会调用 `release()` 方法，AQS 会将 state 设置为可用状态，并从等待队列中唤醒下一个节点所代表的线程。唤醒后，它再重新尝试获取锁，直到成功为止。

AQS 支持两种资源获取模式：

- **独占模式（Exclusive）**：同一时刻只有一个线程能获取资源，典型代表是 `ReentrantLock`。
- **共享模式（Shared）**：多个线程可以同时获取资源，如 `Semaphore` 和读写锁中的读锁。

这两种模式下，AQS 会调用不同的模板方法来处理，比如 `tryAcquire`/`tryRelease` 用于独占模式，`tryAcquireShared`/`tryReleaseShared` 用于共享模式。开发者只需要继承 AQS，并实现这些关键方法，就能构建出各种自定义同步工具。

总结一下，AQS 的原理是：
 通过一个原子变量控制同步状态，失败则排队等待；队列基于 CLH 实现，线程通过 park 阻塞、unpark 唤醒；并提供独占与共享两种访问控制模式，支撑了大多数 JUC 锁与同步器的实现。

### [AQS](https://javaguide.cn/java/concurrent/java-concurrent-questions-03.html#aqs)

## [线程池最佳实践](https://javaguide.cn/java/concurrent/java-thread-pool-best-practices.html)

## [常见并发容器总结](https://javaguide.cn/java/concurrent/java-concurrent-collections.html)

## Atomic 原子类

[Atomic 原子类总结 | JavaGuide](https://javaguide.cn/java/concurrent/atomic-classes.html)

## 虚拟线程

[虚拟线程常见问题总结 | JavaGuide](https://javaguide.cn/java/concurrent/virtual-thread.html)















