<template><div><hr>
<p><strong>问：Java 中有哪些基本数据类型？</strong></p>
<p>答：Java 提供了 8 种基本数据类型，分为四类：</p>
<ul>
<li><strong>整数类型</strong>：<code v-pre>byte</code>（1 字节，范围：-128 到 127）、<code v-pre>short</code>（2 字节，范围：-32,768 到 32,767）、<code v-pre>int</code>（4 字节，范围：-2^31 到 2^31-1）、<code v-pre>long</code>（8 字节，范围：-2^63 到 2^63-1）。</li>
<li><strong>浮点类型</strong>：<code v-pre>float</code>（4 字节，单精度，约 6~7 位有效数字）、<code v-pre>double</code>（8 字节，双精度，约 15 位有效数字）。</li>
<li><strong>字符类型</strong>：<code v-pre>char</code>（2 字节，采用 Unicode 编码，范围：'\u0000' 到 '\uffff'）。</li>
<li><strong>布尔类型</strong>：<code v-pre>boolean</code>（理论上占用 1 位，实际存储可能为 1 字节，取值为 <code v-pre>true</code> 或 <code v-pre>false</code>）。</li>
</ul>
<p>这些基本数据类型在内存中的大小和默认值是面试中常考的基础知识。</p>
<hr>
<p><strong>问：基本类型与包装类型的区别是什么？</strong></p>
<p>答：基本类型是 Java 的内置类型，存储在栈内存中，效率较高。包装类型是基本类型的对象表示，存储在堆内存中，提供了更多的方法和功能。</p>
<p>例如，<code v-pre>int</code> 对应的包装类型是 <code v-pre>Integer</code>，<code v-pre>char</code> 对应的是 <code v-pre>Character</code>。包装类型允许在集合中使用基本类型的值，并提供了如 <code v-pre>null</code> 值的支持。</p>
<hr>
<p><strong>问：自动装箱与拆箱的原理是什么？</strong></p>
<p>答：自动装箱是指 Java 编译器自动将基本类型转换为对应的包装类型，自动拆箱则是将包装类型转换为基本类型。</p>
<p>例如：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 自动装箱</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     // 自动拆箱</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，频繁的装箱和拆箱可能会影响性能，尤其是在循环或大量数据处理时。</p>
<hr>
<p><strong>问：为什么浮点数运算可能会有精度丢失？</strong></p>
<p>答：浮点数在计算机中采用二进制表示，某些十进制小数无法精确表示，导致精度丢失。</p>
<p>例如，0.1 在二进制中是一个无限循环小数，无法精确表示。</p>
<p>因此，在涉及精确计算（如财务计算）时，建议使用 <code v-pre>BigDecimal</code> 类。</p>
<hr>
<p><strong>问：<code v-pre>String</code> 是基本数据类型吗？为什么？</strong></p>
<p>答：<code v-pre>String</code> 不是基本数据类型，而是一个引用类型的类。</p>
<p>它是 Java 中非常常用的类，具有不可变性（immutable），即一旦创建，其值不能更改。这种设计有助于提高性能和安全性，特别是在多线程环境下。</p>
<hr>
<p><strong>问：面向对象的三大特征是什么？</strong></p>
<p>答：面向对象编程的三大特征是封装、继承和多态。</p>
<ul>
<li><strong>封装（Encapsulation）</strong>：将数据和操作数据的方法封装在一起，隐藏内部实现细节，只暴露必要的接口。</li>
<li><strong>继承（Inheritance）</strong>：子类可以继承父类的属性和方法，实现代码重用。</li>
<li><strong>多态（Polymorphism）</strong>：同一个方法在不同对象上表现出不同的行为，主要通过方法重载和方法重写实现。</li>
</ul>
<p>这些特性是面向对象编程的核心，有助于提高代码的可维护性和扩展性。</p>
<hr>
<p><strong>问：抽象类和接口的区别是什么？</strong></p>
<p>答：抽象类和接口都是用于定义类的规范，但有以下区别：</p>
<ul>
<li><strong>抽象类</strong>：
<ul>
<li>可以包含成员变量、构造方法和非抽象方法。</li>
<li>使用 <code v-pre>abstract</code> 关键字定义。</li>
<li>适用于具有共性的类。</li>
</ul>
</li>
<li><strong>接口</strong>：
<ul>
<li>只能包含常量和抽象方法（Java 8 以后可以包含默认方法和静态方法）。</li>
<li>使用 <code v-pre>interface</code> 关键字定义。</li>
<li>适用于定义行为规范。</li>
</ul>
</li>
</ul>
<p>选择使用抽象类还是接口，取决于具体需求。</p>
<hr>
<p><strong>问：方法重载（Overload）与方法重写（Override）的区别是什么？</strong></p>
<p>答：方法重载和方法重写都是实现多态的方式，但有以下区别：</p>
<ul>
<li><strong>方法重载</strong>：
<ul>
<li>发生在同一个类中。</li>
<li>方法名相同，参数列表不同。</li>
<li>与返回类型无关。</li>
</ul>
</li>
<li><strong>方法重写</strong>：
<ul>
<li>发生在子类与父类之间。</li>
<li>方法名、参数列表和返回类型必须相同。</li>
<li>访问修饰符不能比父类更严格。</li>
</ul>
</li>
</ul>
<p>理解这两个概念有助于掌握多态性。</p>
<hr>
<p><strong>问：Java 中的访问修饰符有哪些？各自的访问范围是什么？</strong></p>
<p>答：Java 中的访问修饰符有四种：</p>
<ul>
<li><strong>private</strong>：仅在同一个类中可见。</li>
<li><strong>default（无修饰符）</strong>：在同一个包中可见。</li>
<li><strong>protected</strong>：在同一个包中以及子类中可见。</li>
<li><strong>public</strong>：在所有地方可见。</li>
</ul>
<p>合理使用访问修饰符有助于实现封装性。</p>
<hr>
<p><strong>问：Java 中的多态是如何实现的？</strong></p>
<p>答：Java 的多态主要通过方法重写和接口实现来实现。</p>
<p>当父类引用指向子类对象时，调用的方法是子类中重写的方法，而不是父类的方法。这使得程序具有更好的扩展性和可维护性。</p>
<hr>
</div></template>


