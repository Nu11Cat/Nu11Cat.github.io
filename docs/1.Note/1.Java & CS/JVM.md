---
title : JVM
order: 5
---

HotSpot 虚拟机：

JVM是 java 虚拟机，主要工作是解释自己的指令集（即字节码）并映射到本地的CPU指令集和OS的系统调用。

# 运行时内存

在 Java 程序运行过程中，JVM 会将内存划分为若干个区域，用于管理类的加载、对象的创建与销毁、线程执行等行为，这些区域统称为 **运行时内存区域**，或者叫 **JVM 内存模型**。

## 程序计数器

表示当前线程正在执行的字节码行号指示器。它记录了线程执行位置，是线程切换后能恢复到正确执行位置的关键。

为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器，各线程之间计数器互不影响，独立存储，是线程私有的。

程序计数器是唯一一个不会出现 `OutOfMemoryError` 的内存区域，它的生命周期随着线程的创建而创建，随着线程的结束而死亡。

## 虚拟机栈

用于存储每个线程执行方法时所需的局部变量、操作数栈、动态链接信息等。

Java 虚拟机栈（后文简称栈）也是线程私有的，它的生命周期和线程相同，随着线程的创建而创建，随着线程的死亡而死亡。

除了一些 Native 方法调用是通过本地方法栈实现的，其他所有的 Java 方法调用都是通过栈来实现的（也需要和其他运行时数据区域比如程序计数器配合）。

**栈帧随着方法调用而创建，随着方法结束而销毁。无论方法正常完成还是异常完成都算作方法结束。**

每个方法在执行时会创建一个栈帧（Stack Frame）；栈帧中包括局部变量表、操作数栈、方法返回地址等；如果线程请求栈的深度超过限制（如陷入无限循环），会抛出 `StackOverflowError`；当虚拟机在动态扩展栈时无法申请到足够的内存空间，则抛出`OutOfMemoryError`异常。

>**局部变量表** 主要存放了编译期可知的各种数据类型（boolean、byte、char、short、int、float、long、double）、对象引用（reference 类型，它不同于对象本身，可能是一个指向对象起始地址的引用指针，也可能是指向一个代表对象的句柄或其他与此对象相关的位置）
>
>**操作数栈** 主要作为方法调用的中转站使用，用于存放方法执行过程中产生的中间计算结果。另外，计算过程中产生的临时变量也会放在操作数栈中。
>
>**动态链接** 主要服务一个方法需要调用其他方法的场景。Class 文件的常量池里保存有大量的符号引用比如方法引用的符号引用。当一个方法要调用其他方法，需要将常量池中指向方法的符号引用转化为其在内存地址中的直接引用。动态链接的作用就是为了将符号引用转换为调用方法的直接引用，这个过程也被称为 **动态连接** 。

## 本地方法栈

与虚拟机栈类似，只不过它是为本地方法（如 C/C++ 编写的 native 方法）服务的。

 在 HotSpot 虚拟机中本地方法栈和 Java 虚拟机栈是合二为一的。

本地方法被执行的时候，在本地方法栈也会创建一个栈帧，用于存放该本地方法的局部变量表、操作数栈、动态链接、出口信息。

方法执行完毕后相应的栈帧也会出栈并释放内存空间，也会出现 `StackOverFlowError` 和 `OutOfMemoryError` 两种错误

## 堆

是所有线程共享的一块内存区域，用于存放对象实例，是垃圾回收器管理的重点区域。生命周期和 JVM 一致。

从垃圾回收的角度，由于现在收集器基本都采用分代垃圾收集算法，所以 Java 堆还可以细分为：新生代和老年代；再细致一点有：Eden、Survivor、Old 等空间。进一步划分的目的是更好地回收内存，或者更快地分配内存。

如果方法区空间不足，会抛出 `OutOfMemoryError`。

**在 JDK 7 版本及 JDK 7 版本之前**

堆内存被通常分为下面三部分：

1. 新生代内存(Young Generation)
2. 老生代(Old Generation)
3. 永久代(Permanent Generation)

**JDK 8 版本之后**

PermGen(永久代) 已被 Metaspace(元空间) 取代，元空间使用的是本地内存。

大部分情况，对象都会首先在 Eden 区域分配，在一次新生代垃圾回收后，如果对象还存活，则会进入 S0 或者 S1，并且对象的年龄还会加 1(Eden 区->Survivor 区后对象的初始年龄变为 1)，当它的年龄增加到一定程度（默认为 15 岁），就会被晋升到老年代中。对象晋升到老年代的年龄阈值，可以通过参数 `-XX:MaxTenuringThreshold` 来设置。

**为什么年龄只能是 0-15?**

因为记录年龄的区域在对象头中，这个区域的大小通常是 4 位。这 4 位可以表示的最大二进制数字是 1111，即十进制的 15。因此，对象的年龄被限制为 0 到 15。

## 方法区

也是线程共享的，主要存放已被虚拟机加载的类信息、常量、静态变量、JIT 编译后的代码等。

**方法区和永久代以及元空间是什么关系呢？为什么要将永久代 (PermGen) 替换为元空间 (MetaSpace) 呢?**

在 HotSpot 虚拟机中，早期是通过“永久代”（PermGen）来实现方法区的。也就是说，在 Java 8 之前，方法区的实现依赖于 JVM 内部的一块固定大小的内存区域，即永久代。类的元数据、运行时常量池、静态变量等信息都会存放在永久代中。但由于永久代的容量固定，且难以调优，容易出现内存溢出（比如类加载过多时抛出 OutOfMemoryError: PermGen space），所以这种实现方式在实践中存在一些问题。

从 Java 8 开始，HotSpot 虚拟机移除了永久代，引入了新的实现方式叫做“元空间”（Metaspace）。元空间与永久代最大的不同是，它并不再使用 JVM 的内存，而是使用本地内存（也就是堆外内存）。这种设计提升了灵活性，也降低了内存溢出的风险。元空间的大小可以通过参数进行配置，比如 `-XX:MetaspaceSize` 和 `-XX:MaxMetaspaceSize`。此外，元空间对类元数据的回收更友好，有助于避免类加载器造成的内存泄漏问题。

**方法区常用参数有哪些？**

JDK 1.8 之前

```java
-XX:PermSize=N //方法区 (永久代) 初始大小
-XX:MaxPermSize=N //方法区 (永久代) 最大大小,超过这个值将会抛出 OutOfMemoryError 异常:java.lang.OutOfMemoryError: PermGen
```

JDK 1.8 的时候

```java
-XX:MetaspaceSize=N //设置 Metaspace 的初始（和最小大小）
-XX:MaxMetaspaceSize=N //设置 Metaspace 的最大大小
```

## 运行时常量池

用于存放编译期生成的各种字面量和符号引用，在类加载后被存入此区域。

字面量是源代码中的固定值的表示法，即通过字面我们就能知道其值的含义。字面量包括整数、浮点数和字符串字面量。常见的符号引用包括类符号引用、字段符号引用、方法符号引用、接口方法符号。

运行时常量池是方法区的一部分，自然受到方法区内存的限制，当常量池无法再申请到内存时会抛出 `OutOfMemoryError` 错误。

## 字符串常量池

字符串常量池是 JVM 为了优化内存而设计的一块特殊区域，用于存放字符串字面量。当我们使用双引号创建字符串时，JVM 会先在常量池中查找，若存在相同内容，则复用已有对象，避免重复创建，提升性能。

这个机制依赖于字符串的不可变性，确保共享是安全的。如果通过 `new` 关键字创建字符串，不会自动进入常量池，除非显式调用 `intern()` 方法。

在实现上，JDK 1.6 及之前，字符串常量池位于方法区的永久代中；从 JDK 1.7 起移至堆中；JDK 1.8 起随着元空间引入，完全脱离永久代，由堆中的 `StringTable` 管理。`StringTable` 本质上是一个固定大小的哈希表，保存字符串内容与其对象引用的映射关系。

这个机制常用于提高字符串重复使用场景下的内存利用率，但也要注意池容量有限，避免滥用 `intern()` 导致性能问题或内存泄漏。

# 对象和类

## 对象

### 对象的创建过程

#### 类加载检查

虚拟机遇到一条 new 指令时，首先将去检查这个指令的参数是否能在常量池中定位到这个类的符号引用，并且检查这个符号引用代表的类是否已被加载过、解析和初始化过。如果没有，那必须先执行相应的类加载过程。

#### 分配内存

在**类加载检查**通过后，接下来虚拟机将为新生对象**分配内存**。对象所需的内存大小在类加载完成后便可确定，为对象分配空间的任务等同于把一块确定大小的内存从 Java 堆中划分出来。**分配方式**有 **“指针碰撞”** 和 **“空闲列表”** 两种，**选择哪种分配方式由 Java 堆是否规整决定，而 Java 堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定**。

**内存分配的两种方式** （补充内容，需要掌握）：

- 指针碰撞： 
  - 适用场合：堆内存规整（即没有内存碎片）的情况下。
  - 原理：用过的内存全部整合到一边，没有用过的内存放在另一边，中间有一个分界指针，只需要向着没用过的内存方向将该指针移动对象内存大小位置即可。
  - 使用该分配方式的 GC 收集器：Serial, ParNew
- 空闲列表： 
  - 适用场合：堆内存不规整的情况下。
  - 原理：虚拟机会维护一个列表，该列表中会记录哪些内存块是可用的，在分配的时候，找一块儿足够大的内存块儿来划分给对象实例，最后更新列表记录。
  - 使用该分配方式的 GC 收集器：CMS

选择以上两种方式中的哪一种，取决于 Java 堆内存是否规整。而 Java 堆内存是否规整，取决于 GC 收集器的算法是"标记-清除"，还是"标记-整理"（也称作"标记-压缩"），值得注意的是，复制算法内存也是规整的。

**内存分配并发问题（补充内容，需要掌握）**

在创建对象的时候有一个很重要的问题，就是线程安全，因为在实际开发过程中，创建对象是很频繁的事情，作为虚拟机来说，必须要保证线程是安全的，通常来讲，虚拟机采用两种方式来保证线程安全：

- **CAS+失败重试：** CAS 是乐观锁的一种实现方式。所谓乐观锁就是，每次不加锁而是假设没有冲突而去完成某项操作，如果因为冲突失败就重试，直到成功为止。**虚拟机采用 CAS 配上失败重试的方式保证更新操作的原子性。**
- **TLAB：** 为每一个线程预先在 Eden 区分配一块儿内存，JVM 在给线程中的对象分配内存时，首先在 TLAB 分配，当对象大于 TLAB 中的剩余内存或 TLAB 的内存已用尽时，再采用上述的 CAS 进行内存分配

#### 初始化零值

内存分配完成后，虚拟机需要将分配到的内存空间都初始化为零值（不包括对象头），这一步操作保证了对象的实例字段在 Java 代码中可以不赋初始值就直接使用，程序能访问到这些字段的数据类型所对应的零值。

#### 设置对象头

初始化零值完成之后，**虚拟机要对对象进行必要的设置**，例如这个对象是哪个类的实例、如何才能找到类的元数据信息、对象的哈希码、对象的 GC 分代年龄等信息。 **这些信息存放在对象头中。** 另外，根据虚拟机当前运行状态的不同，如是否启用偏向锁等，对象头会有不同的设置方式。

#### 执行 init 方法

在上面工作都完成之后，从虚拟机的视角来看，一个新的对象已经产生了，但从 Java 程序的视角来看，对象创建才刚开始，`<init>` 方法还没有执行，所有的字段都还为零。所以一般来说，执行 new 指令之后会接着执行 `<init>` 方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完全产生出来。

### 对象在内存中的布局

对象在内存中的布局可以分为 3 块区域：**对象头（Header）**、**实例数据（Instance Data）\**和\**对齐填充（Padding）**。

对象头包括两部分信息：

1. 标记字段（Mark Word）：用于存储对象自身的运行时数据， 如哈希码（HashCode）、GC 分代年龄、锁状态标志、线程持有的锁、偏向线程 ID、偏向时间戳等等。
2. 类型指针（Klass pointer）：对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例。

**实例数据部分是对象真正存储的有效信息**，也是在程序中所定义的各种类型的字段内容。

**对齐填充部分不是必然存在的，也没有什么特别的含义，仅仅起占位作用。** 因为 Hotspot 虚拟机的自动内存管理系统要求对象起始地址必须是 8 字节的整数倍，换句话说就是对象的大小必须是 8 字节的整数倍。而对象头部分正好是 8 字节的倍数（1 倍或 2 倍），因此，当对象实例数据部分没有对齐时，就需要通过对齐填充来补全。

### 对象的访问定位

对象的访问方式由虚拟机实现而定，目前主流的访问方式有：**使用句柄**、**直接指针**。

首先是**句柄访问方式**。在这种方式下，JVM 会为每个对象分配一个**句柄池区域**，每个对象的引用指向句柄，而句柄中保存着对象实例数据和对象类型元数据的地址。这样，对象的访问是“引用 → 句柄 → 对象”。它的好处是，当对象在内存中移动时，只需要更新句柄中的地址，不需要修改所有引用，适合频繁移动对象的 GC 策略。

另一种是**直接指针访问方式**。在这种方式下，引用中直接保存的是对象在堆内的地址，对象头中则保存了类元数据的指针。这种方式访问速度更快，因为省略了中间的句柄查找，但缺点是对象一旦移动，需要更新所有指向它的引用。

------

HotSpot 虚拟机默认采用的是**直接指针方式**，因为它在现代 CPU 上性能更优。而句柄方式在某些 JVM 或自定义场景中仍有使用，尤其是在对象频繁移动的系统中。

## 类

### 类的生命周期

类从被加载到虚拟机内存中开始到卸载出内存为止，它的整个生命周期可以简单概括为 7 个阶段：加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）和卸载（Unloading）。其中，验证、准备和解析这三个阶段可以统称为连接（Linking）。

### 类加载过程

类加载过程是类生命周期的前 5 个阶段。

类加载过程是指 JVM 将 .class 文件加载到内存、并完成必要准备以供程序使用的完整流程。

类加载过程包括 **加载、验证、准备、解析、初始化** 五个阶段，其中加载从磁盘转为内存结构，验证确保字节码安全，准备分配静态变量，解析转化引用，初始化执行静态逻辑

**加载**：JVM 会通过**类加载器**将 `.class` 文件读入内存，转换为 `Class` 对象，存储在方法区。

- 可以从文件、网络、jar 包等来源加载。
- 加载的同时还会为该类创建一个 `java.lang.Class` 对象，供程序访问类的元信息。
- **双亲委派模型** 在这个阶段生效：由启动类加载器开始，逐级向下委托加载。

**验证**：这一阶段保证加载的字节码是**符合 JVM 规范且安全可执行的**

包括四种验证：

- **文件格式验证**：检查魔数（`0xCAFEBABE`）、版本号等。
- **元数据验证**：确认类结构的合理性，如是否有父类、是否正确实现接口。
- **字节码验证**：验证方法字节码是否合法，变量类型是否匹配等。
- **符号引用验证**：检查常量池中的类名、字段、方法是否存在。

验证不通过会抛出 `VerifyError` 异常。

**准备**：JVM 开始为**类变量（static字段）分配内存**并设置**默认初始值**（不会执行代码中的赋值逻辑）。在准备阶段，只分配并设置为默认值 `0`，不会赋值为 `10`。赋值将在初始化阶段完成。

**解析**：JVM 会将常量池中的**符号引用**（如类名、字段名、方法名）解析为**直接引用**（内存地址）。

这一步允许延迟执行（lazy resolution），如方法的解析可以在首次调用时进行。

**初始化**：是真正执行类初始化逻辑的地方。

JVM 会执行该类的 `<clinit>()` 方法，它由以下两部分组成：

- 所有 static 变量的**显示赋值或静态代码块**；
- 它只会执行一次，由 JVM 保证线程安全。

初始化会在以下几种情况之一时触发（主动使用）：

- 实例化类对象（`new`）
- 调用类的静态方法或访问静态变量
- 通过反射访问类
- 初始化子类前，先初始化父类

### 类卸载

在 JVM 中，**类的卸载是指某个类对应的 `Class` 对象和其相关元数据被从方法区中移除**。这通常发生在类长时间不再被使用，或者动态加载的类需要被替换时。

卸载类需要满足 3 个要求:

1. 该类的所有的实例对象都已被 GC，也就是说堆不存在该类的实例对象。
2. 该类没有在其他任何地方被引用
3. 该类的类加载器的实例已被 GC

## 类加载器

类加载器（ClassLoader）是负责将类的字节码文件（.class）加载到 JVM 中的组件。它将类文件转化为 JVM 能识别的 `Class` 对象。

**主要的类加载器有以下几种：**

1. **启动类加载器（Bootstrap ClassLoader）**
   - 由 C++ 实现，不是 Java 类的实例。
   - 加载 **JDK 核心类库**（如 `java.lang.*`、`java.util.*`）；
   - 类路径为 JVM 启动时指定的 `lib` 目录下的类。
2. **扩展类加载器（Extension ClassLoader）**
   - 加载 JDK 扩展目录（`jre/lib/ext`）下的类；
   - 是 Java 实现的类加载器，父加载器是 Bootstrap。
3. **应用类加载器（AppClassLoader）**
   - 加载我们自己写的代码，即类路径（classpath）中的类；
   - 也是最常见的加载器，默认情况下执行 `main()` 方法的类由它加载。
4. **自定义类加载器**
   - 开发者可继承 `ClassLoader` 自定义逻辑；
   - 用于热部署、模块隔离、加密类加载、插件化等高级场景。

### 双亲委派模型

双亲委派模型是 Java 类加载机制的核心设计之一。它规定：**类加载器在尝试加载一个类时，会先把这个请求交给自己的“父加载器”去处理，只有当父加载器找不到时，才由自己来加载。**

这个模型形成了一种 **自顶向下的逐级委托关系**，防止类的重复加载，确保核心类库的安全与一致性。

**加载流程**：

以应用类加载器加载一个类为例，它的执行顺序是：

1. 应用类加载器接到请求，先将请求交给 **扩展类加载器**；
2. 扩展类加载器再将请求交给 **启动类加载器**；
3. 启动类加载器尝试加载，比如加载 `java.lang.String`；
   - 如果找到了，**加载结束**；
   - 如果没找到，依次向下返回，由下层加载器尝试加载；
4. 最终如果父加载器都无法加载，**才由当前类加载器自己尝试加载类字节码。**

**设计目的与好处**：

1. **避免重复加载**：
    类加载器只会加载一次相同类名的字节码，统一由父类加载，提升性能。
2. **保证核心类的安全性**：
    比如程序中自定义一个 `java.lang.String` 类，双亲委派机制会确保加载的是 JDK 自带的 `String`，而不是你自定义的类，避免篡改核心类。
3. **类隔离**：
    每个类加载器拥有自己的命名空间（类名 + 加载器实例），可实现模块隔离。

**打破双亲委派的场景**：

尽管 JVM 默认使用双亲委派，但有时为了满足业务需要，**开发者可以设计“非双亲委派模型”**，例如：

- **JSP 引擎**：JSP 文件每次更新都要重新加载，不能使用父加载器缓存；
- **热部署框架（如 Tomcat、Spring Boot Devtools）**：动态更新类，需打破委派链；
- **插件系统**：每个插件有自己的类加载器，允许加载不同版本的同名类。

这些场景通常通过**自定义类加载器**实现类的重复加载或隔离加载。

## 字节码文件(类文件)

### 解释过程

JVM解释执行字节码的时候，首先通过类加载器classloader把.class文件加载到内存，生成对应的class对象，然后JVM将方法中的字节码逐条读取解析，经过JVM内部的解释器逐条解释字节码指令，每条字节码通过查表得到对应的本地机器指令，然后执行操作。在这个过程中JVM通过计数器判断是否为热点代码，被JIT编译成本地代码，加快后续执行。

需要强调的是:**JVM 具备跨平台能力，但其实现是平台相关的**。字节码的跨平台性源于规范统一，而将其解释/编译成哪种机器码，取决于你所安装的 JDK/JVM 的平台版本（如 Windows/Linux/ARM 等）。

>JVM 是跨平台的，靠的是统一的字节码规范；JVM的实现不是跨平台的，解释和编译成什么机器码取决于所用的 JDK 平台版本。

### 文件结构

Java 编译生成的 `.class` 文件是 **JVM 可以识别的字节码格式**，它有严格的结构规范，由一组 **按顺序排列的结构组成**。主要包括以下几部分：

1. **魔数（Magic Number）**
   - 固定为 `0xCAFEBABE`，用于标识这是一个合法的 Java 类文件。
2. **版本号（Version）**
   - 包括主版本号和次版本号，比如 JDK 8 是 52.0。
3. **常量池（Constant Pool）**
   - 类文件中最复杂、最核心的部分，保存类名、方法名、字符串字面量等各种常量。
   - 类似一个“符号表”，供后续结构引用。
4. **访问标志（Access Flags）**
   - 表示类或接口的修饰信息，如是否是 public、abstract、final 等。
5. **类索引、父类索引、接口索引**
   - 索引常量池，表示当前类、父类、实现的接口集合。
6. **字段表（Fields）**
   - 描述类中定义的所有字段（成员变量）的名称、类型、访问修饰符等。
7. **方法表（Methods）**
   - 描述类中所有方法，包括方法名、返回值、参数、字节码指令等。
8. **属性表（Attributes）**
   - 包含类、字段、方法相关的附加信息，如 `Code`（方法体）、`LineNumberTable`（调试信息）、`SourceFile` 等。



# 垃圾回收

## 内存分配

大多数情况下，对象在新生代中 Eden 区分配。当 Eden 区没有足够空间进行分配时，虚拟机将发起一次 Minor GC。

新创建的大多数普通对象，默认会**首先分配在新生代的 Eden 区**。这是 HotSpot 虚拟机基于“绝大多数对象生命周期短暂”的假设做出的设计，配合 Minor GC 可以快速清理。

所谓“大对象”通常是指需要占用**大量连续内存空间**的对象，比如大数组或大字符串。为了避免在新生代频繁复制、移动带来的性能开销，**虚拟机会将大对象直接分配到老年代**。

在新生代经过多次 Minor GC 后，如果某个对象仍然存活，并且其“年龄”达到一定阈值（默认是 15，可以通过 `-XX:MaxTenuringThreshold` 设置），那么 JVM 会认为它是长期存活对象，**将其晋升到老年代**。此外，如果 Survivor 区空间不足，JVM 也可能提前将部分对象晋升。

>**为什么年龄只能是 0-15?**
>
>因为记录年龄的区域在对象头中，这个区域的大小通常是 4 位。这 4 位可以表示的最大二进制数字是 1111，即十进制的 15。因此，对象的年龄被限制为 0 到 15。

## 分类

针对 HotSpot VM 的实现，它里面的 GC 其实准确分类只有两大种：

部分收集 (Partial GC)：

- 新生代收集（Minor GC / Young GC）：只对新生代进行垃圾收集；
- 老年代收集（Major GC / Old GC）：只对老年代进行垃圾收集。需要注意的是 Major GC 在有的语境中也用于指代整堆收集；
- 混合收集（Mixed GC）：对整个新生代和部分老年代进行垃圾收集。

整堆收集 (Full GC)：收集整个 Java 堆和方法区。

## 空间分配担保

空间分配担保是为了确保在 Minor GC 之前老年代本身还有容纳新生代所有对象的剩余空间。

在 Java 的分代垃圾回收中，当新生代（尤其是 Eden 区）满了之后，会触发 Minor GC。此时，新生代中仍存活的对象会被转移到 Survivor 区或老年代。但如果 Survivor 区空间不足，或者对象年龄较高、直接晋升老年代的对象较多，就需要确保老年代有足够的空间接收这些对象。

**空间分配担保的核心作用**就是：**在 Minor GC 前，JVM 会检查老年代是否有足够的空间容纳所有新生代中可能晋升的对象**。如果空间不足，JVM 会提前触发一次 Full GC 来尝试回收老年代空间，避免后续 Minor GC 时出现“无法晋升”的风险。

------

这个机制是为了**担保 Minor GC 的安全性**，确保存活对象总有地方可去，从而避免 `OutOfMemoryError` 或 GC 崩溃。

## 判断对象死亡

### 引用计数法

引用计数法是一种简单的垃圾回收判定策略，它的核心思想是：**给每个对象维护一个引用计数器，每当有一个地方引用它时，计数加一；引用失效时，计数减一；当计数为零时，说明对象已经不再被使用，可以被回收。**

这种方法实现简单，效率较高，但存在一个致命缺陷：**无法处理循环引用**。例如两个对象相互引用，即使它们都无法被外部访问，计数器也不会为零，导致内存泄漏。

正因为这个问题，**Java 的 HotSpot 虚拟机并没有采用引用计数法**来判断对象是否可回收，而是使用**可达性分析算法（GC Root Tracing）**，通过一系列“GC 根对象”作为起点，从根出发可达的对象视为“存活”，不可达的对象才会被判定为死亡。

### 可达性分析算法

核心思想是**从一组被称为 GC Roots 的对象出发，沿着对象引用链进行搜索**，凡是能从 GC Roots 直接或间接到达的对象，都是“可达”的，表示还在使用中，不可回收；而无法被访问到的对象，则被判定为“不可达”，可以被回收。

**哪些对象可以作为 GC Roots 呢？**

- 虚拟机栈(栈帧中的局部变量表)中引用的对象
- 本地方法栈(Native 方法)中引用的对象
- 方法区中类静态属性引用的对象
- 方法区中常量引用的对象
- 所有被同步锁持有的对象
- JNI（Java Native Interface）引用的对象

**被认定为不可达的对象，并不一定立刻死亡**

在 Java 中，即使一个对象通过可达性分析被判断为“不可达”，它也**不一定立即被回收**，因为 JVM 会给予它一次“**自我拯救的机会**”。

如果一个对象覆盖了它的 `finalize()` 方法，那么在第一次标记为不可达之后，JVM 会将其放入一个“F-Queue”中，并在稍后单独执行它的 `finalize()` 方法。这个方法中如果让该对象重新与 GC Roots 建立关联（例如将自己赋值给某个静态变量），那么它会**被“复活”**，不会被回收。

这种机制称为**“对象的第二次标记确认”**。如果执行 `finalize()` 后对象仍不可达，或者根本没有重写该方法，那么在第二次标记中它就会被真正判定为死亡，从而进入回收流程。

不过需要注意的是，`finalize()` 方法的执行具有不确定性、可能导致性能问题或资源泄漏，因此从 Java 9 开始它已被标记为过时，不推荐使用。

## 判断常量废弃

在 Java 的运行时常量池中，所谓的**废弃常量**是指：**不再被任何对象引用的常量项**

判断一个常量是否是废弃常量，主要依据是可达性分析。如果一个运行时常量池中的常量（如字符串常量）不再被任何对象引用，也就是从 GC Roots 无法访问到它，那么它就会被视为不可达，属于“废弃常量”。

## 判断类无用

VM 在判断一个类是否无用、可以卸载时，主要满足以下三个条件：

**第一，类的所有实例都已经被回收。**
 也就是说，堆中已经不存在任何这个类的对象实例。如果还有对象在使用这个类，类就必须保留。

**第二，类对应的 `Class` 对象本身也不可达。**
 也就是这个 `java.lang.Class` 对象没有被任何地方引用，包括反射等场景中不能有强引用指向它。

**第三，加载这个类的类加载器也已经被回收。**
 只有当类加载器本身不可达时，它加载的所有类才可能被卸载。因为 JVM 是以“类加载器为单位”来回收类的。

只有当这三个条件**同时满足**时，JVM 才会认定该类是无用类，并在合适的时机将其卸载，释放方法区中的元数据和相关资源。

## 垃圾收集算法

### 标记-清除算法

标记-清除（Mark-Sweep）算法是最早期、也是最基础的垃圾收集算法之一，后续的算法都是对其不足进行改进得到。它的核心思想是将垃圾回收分为两个阶段：**标记** 和 **清除**。

首先，在**标记阶段**，GC 从 GC Roots（如栈帧中的局部变量、静态引用等）出发，沿着对象引用链进行遍历，**把所有能访问到的对象标记为“存活”**。这个过程通常通过可达性分析实现。

接下来是**清除阶段**，JVM 扫描整个堆，把**那些没有被标记的对象（即不可达对象）进行回收**，释放它们占用的内存空间。

这个算法的优点是实现简单，适合对象存活率较高的场景，而且不需要移动对象，回收过程直观。但它的缺点也很明显：

第一，**容易产生大量的内存碎片**。因为清除阶段只是单纯地将“死对象”移除，而不会整理堆中存活对象的位置，导致空闲内存是非连续的，后续如果需要分配大对象时，可能会因为没有足够的连续空间而触发 Full GC。

第二，**回收效率不高**。标记和清除都需要遍历整个堆，时间开销较大，且不能并发，容易造成应用停顿（Stop The World）。

第三，它也**不适合新生代回收**，因为新生代中对象大多生命周期短暂，频繁创建销毁，复制算法更高效。标记-清除更适用于老年代，但在现代 JVM 中也被更先进的标记-整理或增量式、并发式 GC 所取代。

### 复制算法

复制（Copying）算法是一种经典的垃圾回收策略，主要用于**新生代垃圾回收**。它的核心思想是：**将内存划分为两个大小相等的区域，每次只使用其中一块，当这块用满时，将存活对象复制到另一块空间，然后一次性清理整块内存。**

具体来说，在 Java 的新生代中，通常将 Eden 区和两个 Survivor 区组成复制结构。大部分对象先在 Eden 区分配，当发生 Minor GC 时，**JVM 会将 Eden 和其中一个 Survivor 区中仍然存活的对象复制到另一个 Survivor 区中**，清空 Eden 和原来的 Survivor 区。对象经过多次复制后，如果仍然存活，并达到一定“年龄”，会晋升到老年代。

复制算法相比于标记-清除的主要优点有两个：

1. **回收效率高**：每次只处理少量存活对象，且只遍历活的对象，适合“朝生夕死”的新生代特性。
2. **不会产生内存碎片**：因为是整体复制到连续空间，分配新对象时只需指针递增（Bump-the-pointer），速度非常快。

但它的缺点也很明显：**浪费内存**。因为总是只用一半空间，另一半是空闲的，等着接收复制过来的对象，导致内存利用率低。

### 标记-整理算法

标记-整理（Mark-Compact）算法是在标记-清除算法的基础上优化而来的，它的目标是**解决内存碎片问题**。

这个算法同样分为两个主要阶段：**标记**和**整理**。

首先是标记阶段，JVM 从 GC Roots 出发，遍历对象引用链，**标记所有存活的对象**。这个过程与标记-清除算法相同。

但在整理阶段，不再是简单地清除死亡对象，而是**将所有存活的对象向内存的一端压缩移动**，然后直接清理边界以外的内存空间。这样可以让堆内的可用空间保持**连续**，从而避免了内存碎片，提高后续对象分配的效率。

标记-整理算法的优点在于：

1. **不会产生碎片**，对象整理后连续存放；
2. **适合老年代**，因为老年代中对象存活率较高，用复制算法会浪费大量复制成本；
3. **可支持大对象分配**，因为不会出现“有足够空间但不连续”的问题。

它的缺点是：整理时需要移动对象，还要更新所有引用位置，**开销较大，且需要 Stop The World**，所以在延迟敏感的场景中可能会引发性能抖动。

### 分代收集算法

当前虚拟机的垃圾收集都采用分代收集算法

分代收集算法（Generational Collection）是 Java 垃圾回收机制的核心思想之一，它基于一个重要观察：**绝大多数对象“朝生夕死”，少数对象生命周期较长**。因此，JVM 将堆内存划分为不同的“代”，针对每一代对象的特点，采用不同的垃圾回收策略，从而**提升回收效率，降低系统停顿时间**。

通常，堆被划分为以下三部分：

1. **新生代（Young Generation）**：用于存放新创建的对象。这里对象存活率低，适合采用**复制算法**进行高效回收，通常在 Minor GC 时触发。
2. **老年代（Old Generation）**：用于存放经过多次 GC 仍然存活的“长期对象”。这里对象存活率高，适合使用**标记-清除或标记-整理算法**，回收效率相对低，通常在 Full GC 或 Major GC 时触发。
3. **元空间（Metaspace）或方法区**：用于存放类的元信息，不属于堆内存（从 JDK 8 起移至本地内存）。

回收过程按代进行：

- 新生代频繁回收，速度快，停顿短；
- 老年代不频繁回收，但每次回收耗时更长；
- 对象在新生代中经过多次 GC 后晋升到老年代。

>**HotSpot 为什么要分为新生代和老年代**
>
>HotSpot 虚拟机将堆划分为新生代和老年代，核心原因是不同生命周期的对象具有不同的存活特性，统一使用一种回收算法效率低下。分代后，JVM 可以针对不同区域采用最合适的回收策略，从而提升整体 GC 性能，减少停顿时间。

## 垃圾收集器

.垃圾收集器（Garbage Collector，简称 GC）是 JVM 中专门负责**自动内存管理**的组件，它的作用是：**在程序运行期间，自动回收不再使用的对象所占用的内存，避免内存泄漏和 OutOfMemoryError。**

### Serial 收集器

Serial 收集器是最简单、最基础的垃圾收集器，**特点是单线程、会 Stop The World**。

它在执行垃圾回收时，**无论是新生代还是老年代，都会暂停所有用户线程**，并且只使用一个 GC 线程来完成工作。因此，它的回收过程简单、稳定，但**回收期间会有较长的停顿**。

适用场景是：**单核处理器、小堆内存、对停顿不敏感的客户端应用**。

### ParNew 收集器

ParNew 是 **Serial 收集器的多线程版本**，用于新生代垃圾回收，仍然采用**复制算法**。

它的最大特点是：**可以使用多个 GC 线程并行进行回收**，相比 Serial 提高了新生代回收的效率。但回收期间仍会发生 **Stop-The-World**，用户线程会被暂停。

ParNew 常用于与 **CMS（Concurrent Mark Sweep）老年代收集器**搭配使用，因为 CMS 不支持和 Parallel Scavenge 组合。

### Parallel Scavenge 收集器

**Parallel Scavenge** 是一种面向吞吐量的新生代垃圾收集器，采用**多线程 + 复制算法**，和 ParNew 类似，但设计目标不同。

它的核心特点是：**关注系统吞吐量**，即让 CPU 把更多时间用于执行应用程序，而不是垃圾回收。例如，它适合在**后台任务、批处理、大数据计算等对响应时间不敏感但要求高吞吐的场景**中使用。

它支持 **GC 自适应调参（-XX:+UseAdaptiveSizePolicy）**，JVM 会根据运行情况自动调整堆大小、Survivor 区比例等，以达到设定的吞吐目标。

### CMS收集器

**CMS（Concurrent Mark Sweep）** 是一种以**低延迟**为目标的老年代垃圾收集器，专为**响应速度敏感的应用**设计，如 Web 服务等。

它的最大特点是：**垃圾回收大部分阶段可以与应用线程并发执行**，从而减少 Stop-The-World（STW）时间。采用的是**标记-清除算法**，避免了老年代对象频繁复制带来的开销。

CMS 回收过程分为四个阶段：

1. **初始标记（STW）**：标记与 GC Roots 直接关联的对象；
2. **并发标记**：并发扫描整个对象图，标记可达对象；
3. **重新标记（STW）**：修正并发期间发生变更的对象引用；
4. **并发清除**：并发清理不可达对象，释放空间。

**缺点**：

- **内存碎片**：使用标记-清除算法，清除后不会压缩内存；
- **并发失败**：回收未完成就分配失败，会触发一次 Full GC；
- **CPU 资源敏感**：并发阶段可能与业务线程争抢 CPU。

### G1 收集器

**G1（Garbage First）** 是一种面向服务端、追求**高吞吐 + 可预测低停顿**的垃圾收集器，是 **JDK 9 之后的默认 GC**，用于替代 CMS。

它具备以下**特点**：

- **并行与并发**：G1 能充分利用 CPU、多核环境下的硬件优势，使用多个 CPU（CPU 或者 CPU 核心）来缩短 Stop-The-World 停顿时间。部分其他收集器原本需要停顿 Java 线程执行的 GC 动作，G1 收集器仍然可以通过并发的方式让 java 程序继续执行。
- **分代收集**：虽然 G1 可以不需要其他收集器配合就能独立管理整个 GC 堆，但是还是保留了分代的概念。
- **空间整合**：与 CMS 的“标记-清除”算法不同，G1 从整体来看是基于“标记-整理”算法实现的收集器；从局部上来看是基于“标记-复制”算法实现的。
- **可预测的停顿**：这是 G1 相对于 CMS 的另一个大优势，降低停顿时间是 G1 和 CMS 共同的关注点，但 G1 除了追求低停顿外，还能建立可预测的停顿时间模型，能让使用者明确指定在一个长度为 M 毫秒的时间片段内，消耗在垃圾收集上的时间不得超过 N 毫秒。

G1 收集器的运作大致分为以下几个**步骤**：

- **初始标记**： 短暂停顿（Stop-The-World，STW），标记从 GC Roots 可直接引用的对象，即标记所有直接可达的活跃对象
- **并发标记**：与应用并发运行，标记所有可达对象。 这一阶段可能持续较长时间，取决于堆的大小和对象的数量。
- **最终标记**： 短暂停顿（STW），处理并发标记阶段结束后残留的少量未处理的引用变更。
- **筛选回收**：根据标记结果，选择回收价值高的区域，复制存活对象到新区域，回收旧区域内存。这一阶段包含一个或多个停顿（STW），具体取决于回收的复杂度。

### ZGC收集器

**ZGC（Z Garbage Collector）** 是一种面向超大内存、极低延迟的垃圾收集器，由 Oracle 从 JDK 11 开始引入。它的设计目标是：最大停顿时间不超过 10 毫秒，且支持 TB 级堆内存。

**核心特点**：

1. **超低延迟（Low Pause GC）**
    ZGC 的所有 GC 工作（包括标记、重定位、整理）几乎**全部并发执行**，应用线程只在极短时间内暂停几个“起始点”，每次 STW 停顿时间都控制在几毫秒以内，**即使在超大堆（数百 GB ~ TB）下也能保持低延迟。**
2. **Region + 并发标记 + 并发压缩**
    类似 G1，ZGC 也将堆划分为多个 Region，但 ZGC 会在回收过程中**同时完成标记、清除、压缩等操作，并且全部并发执行**。
3. **染色指针（Colored Pointer）技术**
    ZGC 利用 64 位对象地址中的高位位段嵌入对象元信息（比如标记状态、是否正在移动等），无需额外内存结构加锁，提升并发效率。
4. **不会产生内存碎片**
    ZGC 是**支持并发压缩整理的收集器**，能有效避免老年代碎片问题。
5. **限制和前提**
   - 仅支持 64 位系统；
   - 要求 JDK 11 及以上版本；
   - 内存使用较大，初始堆不能太小；
   - 在 JDK 15 之后已是稳定特性。

# JVM参数

## 堆相关

### 设置堆内存大小 (-Xms 和 -Xmx)

根据应用程序的实际需求设置初始和最大堆内存大小，是性能调优中最常见的实践之一。**推荐显式设置这两个参数，并且通常建议将它们设置为相同的值**，以避免运行时堆内存的动态调整带来的性能开销。

```java
-Xms<heap size>[unit]  # 设置 JVM 初始堆大小
-Xmx<heap size>[unit]  # 设置 JVM 最大堆大小
```

- `<heap size>`: 指定内存的具体数值。
- `[unit]`: 指定内存的单位，如 g (GB)、m (MB)、k (KB)。

### 设置新生代内存大小 (Young Generation)

在堆总可用内存配置完成之后，第二大影响因素是为 `Young Generation` 在堆内存所占的比例。默认情况下，YG 的最小大小为 **1310 MB**，最大大小为 **无限制**。

### 设置永久代/元空间大小 (PermGen/Metaspace)

从 Java 8 开始，如果我们没有指定 Metaspace 的大小，随着更多类的创建，虚拟机会耗尽所有可用的系统内存（永久代并不会出现这种情况）。

## 垃圾收集相关

### 选择垃圾回收器

JVM 提供了多种 GC 实现，适用于不同的场景：

- **Serial GC (串行垃圾收集器):** 单线程执行 GC，适用于客户端模式或单核 CPU 环境。参数：`-XX:+UseSerialGC`。
- **Parallel GC (并行垃圾收集器):** 多线程执行新生代 GC (Minor GC)，以及可选的多线程执行老年代 GC (Full GC，通过 `-XX:+UseParallelOldGC`)。关注吞吐量，是 JDK 8 的默认 GC。参数：`-XX:+UseParallelGC`。
- **CMS GC (Concurrent Mark Sweep 并发标记清除收集器):** 以获取最短回收停顿时间为目标，大部分 GC 阶段可与用户线程并发执行。适用于对响应时间要求高的应用。在 JDK 9 中被标记为弃用，JDK 14 中被移除。参数：`-XX:+UseConcMarkSweepGC`。
- **G1 GC (Garbage-First Garbage Collector):** JDK 9 及之后版本的默认 GC。将堆划分为多个 Region，兼顾吞吐量和停顿时间，试图在可预测的停顿时间内完成 GC。参数：`-XX:+UseG1GC`。
- **ZGC:** 更新的低延迟 GC，目标是将 GC 停顿时间控制在几毫秒甚至亚毫秒级别，需要较新版本的 JDK 支持。参数（具体参数可能随版本变化）：`-XX:+UseZGC`、`-XX:+UseShenandoahGC`。

### GC日志

在生产环境或进行 GC 问题排查时，**务必开启 GC 日志记录**。

```java
# --- 推荐的基础配置 ---
# 打印详细 GC 信息
-XX:+PrintGCDetails
# 打印 GC 发生的时间戳 (相对于 JVM 启动时间)
# -XX:+PrintGCTimeStamps
# 打印 GC 发生的日期和时间 (更常用)
-XX:+PrintGCDateStamps
# 指定 GC 日志文件的输出路径，%t 可以输出日期时间戳
-Xloggc:/path/to/gc-%t.log

# --- 推荐的进阶配置 ---
# 打印对象年龄分布 (有助于判断对象晋升老年代的情况)
-XX:+PrintTenuringDistribution
# 在 GC 前后打印堆信息
-XX:+PrintHeapAtGC
# 打印各种类型引用 (强/软/弱/虚) 的处理信息
-XX:+PrintReferenceGC
# 打印应用暂停时间 (Stop-The-World, STW)
-XX:+PrintGCApplicationStoppedTime

# --- GC 日志文件滚动配置 ---
# 启用 GC 日志文件滚动
-XX:+UseGCLogFileRotation
# 设置滚动日志文件的数量 (例如，保留最近 14 个)
-XX:NumberOfGCLogFiles=14
# 设置每个日志文件的最大大小 (例如，50MB)
-XX:GCLogFileSize=50M

# --- 可选的辅助诊断配置 ---
# 打印安全点 (Safepoint) 统计信息 (有助于分析 STW 原因)
# -XX:+PrintSafepointStatistics
# -XX:PrintSafepointStatisticsCount=1
```

## 处理OOM

 JVM 提供了一些参数，这些参数将堆内存转储到一个物理文件中，以后可以用来查找泄漏:

```java
# 在发生 OOM 时生成堆转储文件
-XX:+HeapDumpOnOutOfMemoryError

# 指定堆转储文件的输出路径。<pid> 会被替换为进程 ID
-XX:HeapDumpPath=/path/to/heapdump/java_pid<pid>.hprof
# 示例：-XX:HeapDumpPath=/data/dumps/

# (可选) 在发生 OOM 时执行指定的命令或脚本
# 例如，发送告警通知或尝试重启服务（需谨慎使用）
# -XX:OnOutOfMemoryError="<command> <args>"
# 示例：-XX:OnOutOfMemoryError="sh /path/to/notify.sh"

# (可选) 启用 GC 开销限制检查
# 如果 GC 时间占总时间比例过高（默认 98%）且回收效果甚微（默认小于 2% 堆内存），
# 会提前抛出 OOM，防止应用长时间卡死在 GC 中。
-XX:+UseGCOverheadLimit
```

## 其他

`-server`: 明确启用 Server 模式的 HotSpot VM。（在 64 位 JVM 上通常是默认值）。

`-XX:+UseStringDeduplication`: (JDK 8u20+) 尝试识别并共享底层 `char[]` 数组相同的 String 对象，以减少内存占用。适用于存在大量重复字符串的场景。

`-XX:SurvivorRatio=<ratio>`: 设置 Eden 区与单个 Survivor 区的大小比例。例如 `-XX:SurvivorRatio=8` 表示 Eden:Survivor = 8:1。

`-XX:MaxTenuringThreshold=<threshold>`: 设置对象从新生代晋升到老年代的最大年龄阈值（对象每经历一次 Minor GC 且存活，年龄加 1）。默认值通常是 15。

`-XX:+DisableExplicitGC`: 禁止代码中显式调用 `System.gc()`。推荐开启，避免人为触发不必要的 Full GC。

`-XX:+UseLargePages`: (需要操作系统支持) 尝试使用大内存页（如 2MB 而非 4KB），可能提升内存密集型应用的性能，但需谨慎测试。

-`XX:MinHeapFreeRatio=<percent> / -XX:MaxHeapFreeRatio=<percent>`: 控制 GC 后堆内存保持空闲的最小/最大百分比，用于动态调整堆大小（如果 `-Xms` 和 `-Xmx` 不相等）。通常建议将 `-Xms` 和 `-Xmx` 设为一致，避免调整开销。

# JVM监控与调优

[JDK监控和故障处理工具总结 | JavaGuide](https://javaguide.cn/java/jvm/jdk-monitoring-and-troubleshooting-tools.html)

[JVM线上问题排查和性能调优案例 | JavaGuide](https://javaguide.cn/java/jvm/jvm-in-action.html)

# 其他

## 直接内存

直接内存是 JVM 之外的一块内存区域，由操作系统分配，**不属于 Java 堆或方法区**，但可以被 Java 程序访问。它常用于高性能 I/O 操作，是 NIO（New I/O）中的一个重要概念。

通过 `ByteBuffer.allocateDirect()` 创建的直接缓冲区，其底层内存不是在堆上分配，而是使用本地内存，由 JVM 通过 `Unsafe` 或 JNI 调用系统函数分配。这种方式减少了 Java 堆与内核 I/O 缓冲区之间的数据拷贝，提高了性能，尤其适用于频繁读写的大数据量场景。

直接内存的大小不受堆空间限制，但默认总量受 `-XX:MaxDirectMemorySize` 控制。如果未显式设置，该值通常与最大堆大小相等。由于这部分内存不受 GC 管控，如果使用不当，容易导致 `OutOfMemoryError: Direct buffer memory`。

## 引用类型

JDK1.2 之前，Java 中引用的定义很传统：如果 reference 类型的数据存储的数值代表的是另一块内存的起始地址，就称这块内存代表一个引用。

JDK1.2 以后，Java 对引用的概念进行了扩充，将引用分为强引用、软引用、弱引用、虚引用四种（引用强度逐渐减弱），强引用就是 Java 中普通的对象，而软引用、弱引用、虚引用在 JDK 中定义的类分别是 `SoftReference`、`WeakReference`、`PhantomReference`。

首先是**强引用**，它是最常见的引用类型，比如 `Object obj = new Object()`。只要强引用还存在，GC 永远不会回收对应的对象，哪怕内存紧张也不会。

其次是**软引用（SoftReference）**。当一个对象只有软引用指向它时，在内存充足时不会被回收；但当 JVM 判断内存不足时，会尽可能回收这些对象，用于缓存等场景比较合适。

第三是**弱引用（WeakReference）**。它比软引用更弱，一旦发生 GC，不管内存是否充足，只要对象只被弱引用关联，就会被立即回收，常用于 ThreadLocal 的 key、ThreadSafe caches 等。

最后是**虚引用（PhantomReference）**。它本身无法通过 `get()` 方法获取对象引用，唯一作用是配合 `ReferenceQueue` 追踪对象被 GC 回收的时机，用于底层资源释放或监控。对象一旦只被虚引用关联，下一次 GC 就会被回收。

---

**虚引用主要用来跟踪对象被垃圾回收的活动**。

**虚引用与软引用和弱引用的一个区别在于：** 虚引用必须和引用队列（ReferenceQueue）联合使用。当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。程序如果发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。

特别注意，在程序设计中一般很少使用弱引用与虚引用，使用软引用的情况较多，这是因为**软引用可以加速 JVM 对垃圾内存的回收速度，可以维护系统的运行安全，防止内存溢出（OutOfMemory）等问题的产生











