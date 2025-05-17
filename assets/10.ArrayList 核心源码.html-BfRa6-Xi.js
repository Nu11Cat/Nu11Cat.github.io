import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-2wafLgZ6.js";const l={};function p(d,n){return e(),a("div",null,n[0]||(n[0]=[i(`<p>ArrayList核心源码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class ArrayList&lt;E&gt; extends AbstractList&lt;E&gt;</span></span>
<span class="line"><span>        implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable {</span></span>
<span class="line"><span>    private static final long serialVersionUID = 8683452581122892189L;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 默认初始容量大小</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private static final int DEFAULT_CAPACITY = 10;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 空数组（用于空实例）。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private static final Object[] EMPTY_ELEMENTDATA = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //用于默认大小空实例的共享空数组实例。</span></span>
<span class="line"><span>    //我们把它从EMPTY_ELEMENTDATA数组中区分出来，以知道在添加第一个元素时容量需要增加多少。</span></span>
<span class="line"><span>    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 保存ArrayList数据的数组</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    transient Object[] elementData; // non-private to simplify nested class access</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * ArrayList 所包含的元素个数</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private int size;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 带初始容量参数的构造函数（用户可以在创建ArrayList对象时自己指定集合的初始大小）</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public ArrayList(int initialCapacity) {</span></span>
<span class="line"><span>        if (initialCapacity &gt; 0) {</span></span>
<span class="line"><span>            //如果传入的参数大于0，创建initialCapacity大小的数组</span></span>
<span class="line"><span>            this.elementData = new Object[initialCapacity];</span></span>
<span class="line"><span>        } else if (initialCapacity == 0) {</span></span>
<span class="line"><span>            //如果传入的参数等于0，创建空数组</span></span>
<span class="line"><span>            this.elementData = EMPTY_ELEMENTDATA;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            //其他情况，抛出异常</span></span>
<span class="line"><span>            throw new IllegalArgumentException(&quot;Illegal Capacity: &quot; +</span></span>
<span class="line"><span>                    initialCapacity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 默认无参构造函数</span></span>
<span class="line"><span>     * DEFAULTCAPACITY_EMPTY_ELEMENTDATA 为0.初始化为10，也就是说初始其实是空数组 当添加第一个元素的时候数组容量才变成10</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public ArrayList() {</span></span>
<span class="line"><span>        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 构造一个包含指定集合的元素的列表，按照它们由集合的迭代器返回的顺序。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public ArrayList(Collection&lt;? extends E&gt; c) {</span></span>
<span class="line"><span>        //将指定集合转换为数组</span></span>
<span class="line"><span>        elementData = c.toArray();</span></span>
<span class="line"><span>        //如果elementData数组的长度不为0</span></span>
<span class="line"><span>        if ((size = elementData.length) != 0) {</span></span>
<span class="line"><span>            // 如果elementData不是Object类型数据（c.toArray可能返回的不是Object类型的数组所以加上下面的语句用于判断）</span></span>
<span class="line"><span>            if (elementData.getClass() != Object[].class)</span></span>
<span class="line"><span>                //将原来不是Object类型的elementData数组的内容，赋值给新的Object类型的elementData数组</span></span>
<span class="line"><span>                elementData = Arrays.copyOf(elementData, size, Object[].class);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            // 其他情况，用空数组代替</span></span>
<span class="line"><span>            this.elementData = EMPTY_ELEMENTDATA;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 修改这个ArrayList实例的容量是列表的当前大小。 应用程序可以使用此操作来最小化ArrayList实例的存储。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public void trimToSize() {</span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span>        if (size &lt; elementData.length) {</span></span>
<span class="line"><span>            elementData = (size == 0)</span></span>
<span class="line"><span>                    ? EMPTY_ELEMENTDATA</span></span>
<span class="line"><span>                    : Arrays.copyOf(elementData, size);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>//下面是ArrayList的扩容机制</span></span>
<span class="line"><span>//ArrayList的扩容机制提高了性能，如果每次只扩充一个，</span></span>
<span class="line"><span>//那么频繁的插入会导致频繁的拷贝，降低性能，而ArrayList的扩容机制避免了这种情况。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 如有必要，增加此ArrayList实例的容量，以确保它至少能容纳元素的数量</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param minCapacity 所需的最小容量</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public void ensureCapacity(int minCapacity) {</span></span>
<span class="line"><span>        // 如果不是默认空数组，则minExpand的值为0；</span></span>
<span class="line"><span>        // 如果是默认空数组，则minExpand的值为10</span></span>
<span class="line"><span>        int minExpand = (elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA)</span></span>
<span class="line"><span>                // 如果不是默认元素表，则可以使用任意大小</span></span>
<span class="line"><span>                ? 0</span></span>
<span class="line"><span>                // 如果是默认空数组，它应该已经是默认大小</span></span>
<span class="line"><span>                : DEFAULT_CAPACITY;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 如果最小容量大于已有的最大容量</span></span>
<span class="line"><span>        if (minCapacity &gt; minExpand) {</span></span>
<span class="line"><span>            // 根据需要的最小容量，确保容量足够</span></span>
<span class="line"><span>            ensureExplicitCapacity(minCapacity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据给定的最小容量和当前数组元素来计算所需容量。</span></span>
<span class="line"><span>    private static int calculateCapacity(Object[] elementData, int minCapacity) {</span></span>
<span class="line"><span>        // 如果当前数组元素为空数组（初始情况），返回默认容量和最小容量中的较大值作为所需容量</span></span>
<span class="line"><span>        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {</span></span>
<span class="line"><span>            return Math.max(DEFAULT_CAPACITY, minCapacity);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 否则直接返回最小容量</span></span>
<span class="line"><span>        return minCapacity;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 确保内部容量达到指定的最小容量。</span></span>
<span class="line"><span>    private void ensureCapacityInternal(int minCapacity) {</span></span>
<span class="line"><span>        ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //判断是否需要扩容</span></span>
<span class="line"><span>    private void ensureExplicitCapacity(int minCapacity) {</span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span>        // overflow-conscious code</span></span>
<span class="line"><span>        if (minCapacity - elementData.length &gt; 0)</span></span>
<span class="line"><span>            //调用grow方法进行扩容，调用此方法代表已经开始扩容了</span></span>
<span class="line"><span>            grow(minCapacity);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 要分配的最大数组大小</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * ArrayList扩容的核心方法。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private void grow(int minCapacity) {</span></span>
<span class="line"><span>        // oldCapacity为旧容量，newCapacity为新容量</span></span>
<span class="line"><span>        int oldCapacity = elementData.length;</span></span>
<span class="line"><span>        //将oldCapacity 右移一位，其效果相当于oldCapacity /2，</span></span>
<span class="line"><span>        //我们知道位运算的速度远远快于整除运算，整句运算式的结果就是将新容量更新为旧容量的1.5倍，</span></span>
<span class="line"><span>        int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1);</span></span>
<span class="line"><span>        //然后检查新容量是否大于最小需要容量，若还是小于最小需要容量，那么就把最小需要容量当作数组的新容量，</span></span>
<span class="line"><span>        if (newCapacity - minCapacity &lt; 0)</span></span>
<span class="line"><span>            newCapacity = minCapacity;</span></span>
<span class="line"><span>        //再检查新容量是否超出了ArrayList所定义的最大容量，</span></span>
<span class="line"><span>        //若超出了，则调用hugeCapacity()来比较minCapacity和 MAX_ARRAY_SIZE，</span></span>
<span class="line"><span>        //如果minCapacity大于MAX_ARRAY_SIZE，则新容量则为Integer.MAX_VALUE，否则，新容量大小则为 MAX_ARRAY_SIZE。</span></span>
<span class="line"><span>        if (newCapacity - MAX_ARRAY_SIZE &gt; 0)</span></span>
<span class="line"><span>            newCapacity = hugeCapacity(minCapacity);</span></span>
<span class="line"><span>        // minCapacity is usually close to size, so this is a win:</span></span>
<span class="line"><span>        elementData = Arrays.copyOf(elementData, newCapacity);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //比较minCapacity和 MAX_ARRAY_SIZE</span></span>
<span class="line"><span>    private static int hugeCapacity(int minCapacity) {</span></span>
<span class="line"><span>        if (minCapacity &lt; 0) // overflow</span></span>
<span class="line"><span>            throw new OutOfMemoryError();</span></span>
<span class="line"><span>        return (minCapacity &gt; MAX_ARRAY_SIZE) ?</span></span>
<span class="line"><span>                Integer.MAX_VALUE :</span></span>
<span class="line"><span>                MAX_ARRAY_SIZE;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回此列表中的元素数。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public int size() {</span></span>
<span class="line"><span>        return size;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 如果此列表不包含元素，则返回 true 。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean isEmpty() {</span></span>
<span class="line"><span>        //注意=和==的区别</span></span>
<span class="line"><span>        return size == 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 如果此列表包含指定的元素，则返回true 。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean contains(Object o) {</span></span>
<span class="line"><span>        //indexOf()方法：返回此列表中指定元素的首次出现的索引，如果此列表不包含此元素，则为-1</span></span>
<span class="line"><span>        return indexOf(o) &gt;= 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回此列表中指定元素的首次出现的索引，如果此列表不包含此元素，则为-1</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public int indexOf(Object o) {</span></span>
<span class="line"><span>        if (o == null) {</span></span>
<span class="line"><span>            for (int i = 0; i &lt; size; i++)</span></span>
<span class="line"><span>                if (elementData[i] == null)</span></span>
<span class="line"><span>                    return i;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            for (int i = 0; i &lt; size; i++)</span></span>
<span class="line"><span>                //equals()方法比较</span></span>
<span class="line"><span>                if (o.equals(elementData[i]))</span></span>
<span class="line"><span>                    return i;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回此列表中指定元素的最后一次出现的索引，如果此列表不包含元素，则返回-1。.</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public int lastIndexOf(Object o) {</span></span>
<span class="line"><span>        if (o == null) {</span></span>
<span class="line"><span>            for (int i = size - 1; i &gt;= 0; i--)</span></span>
<span class="line"><span>                if (elementData[i] == null)</span></span>
<span class="line"><span>                    return i;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            for (int i = size - 1; i &gt;= 0; i--)</span></span>
<span class="line"><span>                if (o.equals(elementData[i]))</span></span>
<span class="line"><span>                    return i;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return -1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回此ArrayList实例的浅拷贝。 （元素本身不被复制。）</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public Object clone() {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            ArrayList&lt;?&gt; v = (ArrayList&lt;?&gt;) super.clone();</span></span>
<span class="line"><span>            //Arrays.copyOf功能是实现数组的复制，返回复制后的数组。参数是被复制的数组和复制的长度</span></span>
<span class="line"><span>            v.elementData = Arrays.copyOf(elementData, size);</span></span>
<span class="line"><span>            v.modCount = 0;</span></span>
<span class="line"><span>            return v;</span></span>
<span class="line"><span>        } catch (CloneNotSupportedException e) {</span></span>
<span class="line"><span>            // 这不应该发生，因为我们是可以克隆的</span></span>
<span class="line"><span>            throw new InternalError(e);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 以正确的顺序（从第一个到最后一个元素）返回一个包含此列表中所有元素的数组。</span></span>
<span class="line"><span>     * 返回的数组将是“安全的”，因为该列表不保留对它的引用。</span></span>
<span class="line"><span>     * （换句话说，这个方法必须分配一个新的数组）。</span></span>
<span class="line"><span>     * 因此，调用者可以自由地修改返回的数组结构。</span></span>
<span class="line"><span>     * 注意：如果元素是引用类型，修改元素的内容会影响到原列表中的对象。</span></span>
<span class="line"><span>     * 此方法充当基于数组和基于集合的API之间的桥梁。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public Object[] toArray() {</span></span>
<span class="line"><span>        return Arrays.copyOf(elementData, size);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 以正确的顺序返回一个包含此列表中所有元素的数组（从第一个到最后一个元素）;</span></span>
<span class="line"><span>     * 返回的数组的运行时类型是指定数组的运行时类型。 如果列表适合指定的数组，则返回其中。</span></span>
<span class="line"><span>     * 否则，将为指定数组的运行时类型和此列表的大小分配一个新数组。</span></span>
<span class="line"><span>     * 如果列表适用于指定的数组，其余空间（即数组的列表数量多于此元素），则紧跟在集合结束后的数组中的元素设置为null 。</span></span>
<span class="line"><span>     * （这仅在调用者知道列表不包含任何空元素的情况下才能确定列表的长度。）</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @SuppressWarnings(&quot;unchecked&quot;)</span></span>
<span class="line"><span>    public &lt;T&gt; T[] toArray(T[] a) {</span></span>
<span class="line"><span>        if (a.length &lt; size)</span></span>
<span class="line"><span>            // 新建一个运行时类型的数组，但是ArrayList数组的内容</span></span>
<span class="line"><span>            return (T[]) Arrays.copyOf(elementData, size, a.getClass());</span></span>
<span class="line"><span>        //调用System提供的arraycopy()方法实现数组之间的复制</span></span>
<span class="line"><span>        System.arraycopy(elementData, 0, a, 0, size);</span></span>
<span class="line"><span>        if (a.length &gt; size)</span></span>
<span class="line"><span>            a[size] = null;</span></span>
<span class="line"><span>        return a;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Positional Access Operations</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @SuppressWarnings(&quot;unchecked&quot;)</span></span>
<span class="line"><span>    E elementData(int index) {</span></span>
<span class="line"><span>        return (E) elementData[index];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回此列表中指定位置的元素。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public E get(int index) {</span></span>
<span class="line"><span>        rangeCheck(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return elementData(index);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 用指定的元素替换此列表中指定位置的元素。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public E set(int index, E element) {</span></span>
<span class="line"><span>        //对index进行界限检查</span></span>
<span class="line"><span>        rangeCheck(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        E oldValue = elementData(index);</span></span>
<span class="line"><span>        elementData[index] = element;</span></span>
<span class="line"><span>        //返回原来在这个位置的元素</span></span>
<span class="line"><span>        return oldValue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 将指定的元素追加到此列表的末尾。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean add(E e) {</span></span>
<span class="line"><span>        ensureCapacityInternal(size + 1);  // Increments modCount!!</span></span>
<span class="line"><span>        //这里看到ArrayList添加元素的实质就相当于为数组赋值</span></span>
<span class="line"><span>        elementData[size++] = e;</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 在此列表中的指定位置插入指定的元素。</span></span>
<span class="line"><span>     * 先调用 rangeCheckForAdd 对index进行界限检查；然后调用 ensureCapacityInternal 方法保证capacity足够大；</span></span>
<span class="line"><span>     * 再将从index开始之后的所有成员后移一个位置；将element插入index位置；最后size加1。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public void add(int index, E element) {</span></span>
<span class="line"><span>        rangeCheckForAdd(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ensureCapacityInternal(size + 1);  // Increments modCount!!</span></span>
<span class="line"><span>        //arraycopy()这个实现数组之间复制的方法一定要看一下，下面就用到了arraycopy()方法实现数组自己复制自己</span></span>
<span class="line"><span>        System.arraycopy(elementData, index, elementData, index + 1,</span></span>
<span class="line"><span>                size - index);</span></span>
<span class="line"><span>        elementData[index] = element;</span></span>
<span class="line"><span>        size++;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 删除该列表中指定位置的元素。 将任何后续元素移动到左侧（从其索引中减去一个元素）。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public E remove(int index) {</span></span>
<span class="line"><span>        rangeCheck(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span>        E oldValue = elementData(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        int numMoved = size - index - 1;</span></span>
<span class="line"><span>        if (numMoved &gt; 0)</span></span>
<span class="line"><span>            System.arraycopy(elementData, index + 1, elementData, index,</span></span>
<span class="line"><span>                    numMoved);</span></span>
<span class="line"><span>        elementData[--size] = null; // clear to let GC do its work</span></span>
<span class="line"><span>        //从列表中删除的元素</span></span>
<span class="line"><span>        return oldValue;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 从列表中删除指定元素的第一个出现（如果存在）。 如果列表不包含该元素，则它不会更改。</span></span>
<span class="line"><span>     * 返回true，如果此列表包含指定的元素</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean remove(Object o) {</span></span>
<span class="line"><span>        if (o == null) {</span></span>
<span class="line"><span>            for (int index = 0; index &lt; size; index++)</span></span>
<span class="line"><span>                if (elementData[index] == null) {</span></span>
<span class="line"><span>                    fastRemove(index);</span></span>
<span class="line"><span>                    return true;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            for (int index = 0; index &lt; size; index++)</span></span>
<span class="line"><span>                if (o.equals(elementData[index])) {</span></span>
<span class="line"><span>                    fastRemove(index);</span></span>
<span class="line"><span>                    return true;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /*</span></span>
<span class="line"><span>     * 该方法为私有的移除方法，跳过了边界检查，并且不返回被移除的值。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private void fastRemove(int index) {</span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span>        int numMoved = size - index - 1;</span></span>
<span class="line"><span>        if (numMoved &gt; 0)</span></span>
<span class="line"><span>            System.arraycopy(elementData, index + 1, elementData, index,</span></span>
<span class="line"><span>                    numMoved);</span></span>
<span class="line"><span>        elementData[--size] = null; // 在移除元素后，将该位置的元素设为 null，以便垃圾回收器（GC）能够回收该元素。</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 从列表中删除所有元素。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public void clear() {</span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 把数组中所有的元素的值设为null</span></span>
<span class="line"><span>        for (int i = 0; i &lt; size; i++)</span></span>
<span class="line"><span>            elementData[i] = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        size = 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 按指定集合的Iterator返回的顺序将指定集合中的所有元素追加到此列表的末尾。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean addAll(Collection&lt;? extends E&gt; c) {</span></span>
<span class="line"><span>        Object[] a = c.toArray();</span></span>
<span class="line"><span>        int numNew = a.length;</span></span>
<span class="line"><span>        ensureCapacityInternal(size + numNew);  // Increments modCount</span></span>
<span class="line"><span>        System.arraycopy(a, 0, elementData, size, numNew);</span></span>
<span class="line"><span>        size += numNew;</span></span>
<span class="line"><span>        return numNew != 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 将指定集合中的所有元素插入到此列表中，从指定的位置开始。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean addAll(int index, Collection&lt;? extends E&gt; c) {</span></span>
<span class="line"><span>        rangeCheckForAdd(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Object[] a = c.toArray();</span></span>
<span class="line"><span>        int numNew = a.length;</span></span>
<span class="line"><span>        ensureCapacityInternal(size + numNew);  // Increments modCount</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        int numMoved = size - index;</span></span>
<span class="line"><span>        if (numMoved &gt; 0)</span></span>
<span class="line"><span>            System.arraycopy(elementData, index, elementData, index + numNew,</span></span>
<span class="line"><span>                    numMoved);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        System.arraycopy(a, 0, elementData, index, numNew);</span></span>
<span class="line"><span>        size += numNew;</span></span>
<span class="line"><span>        return numNew != 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 从此列表中删除所有索引为fromIndex （含）和toIndex之间的元素。</span></span>
<span class="line"><span>     * 将任何后续元素移动到左侧（减少其索引）。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    protected void removeRange(int fromIndex, int toIndex) {</span></span>
<span class="line"><span>        modCount++;</span></span>
<span class="line"><span>        int numMoved = size - toIndex;</span></span>
<span class="line"><span>        System.arraycopy(elementData, toIndex, elementData, fromIndex,</span></span>
<span class="line"><span>                numMoved);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // clear to let GC do its work</span></span>
<span class="line"><span>        int newSize = size - (toIndex - fromIndex);</span></span>
<span class="line"><span>        for (int i = newSize; i &lt; size; i++) {</span></span>
<span class="line"><span>            elementData[i] = null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        size = newSize;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 检查给定的索引是否在范围内。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private void rangeCheck(int index) {</span></span>
<span class="line"><span>        if (index &gt;= size)</span></span>
<span class="line"><span>            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * add和addAll使用的rangeCheck的一个版本</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private void rangeCheckForAdd(int index) {</span></span>
<span class="line"><span>        if (index &gt; size || index &lt; 0)</span></span>
<span class="line"><span>            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回IndexOutOfBoundsException细节信息</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    private String outOfBoundsMsg(int index) {</span></span>
<span class="line"><span>        return &quot;Index: &quot; + index + &quot;, Size: &quot; + size;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 从此列表中删除指定集合中包含的所有元素。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean removeAll(Collection&lt;?&gt; c) {</span></span>
<span class="line"><span>        Objects.requireNonNull(c);</span></span>
<span class="line"><span>        //如果此列表被修改则返回true</span></span>
<span class="line"><span>        return batchRemove(c, false);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 仅保留此列表中包含在指定集合中的元素。</span></span>
<span class="line"><span>     * 换句话说，从此列表中删除其中不包含在指定集合中的所有元素。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public boolean retainAll(Collection&lt;?&gt; c) {</span></span>
<span class="line"><span>        Objects.requireNonNull(c);</span></span>
<span class="line"><span>        return batchRemove(c, true);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 从列表中的指定位置开始，返回列表中的元素（按正确顺序）的列表迭代器。</span></span>
<span class="line"><span>     * 指定的索引表示初始调用将返回的第一个元素为next 。 初始调用previous将返回指定索引减1的元素。</span></span>
<span class="line"><span>     * 返回的列表迭代器是fail-fast 。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public ListIterator&lt;E&gt; listIterator(int index) {</span></span>
<span class="line"><span>        if (index &lt; 0 || index &gt; size)</span></span>
<span class="line"><span>            throw new IndexOutOfBoundsException(&quot;Index: &quot; + index);</span></span>
<span class="line"><span>        return new ListItr(index);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 返回列表中的列表迭代器（按适当的顺序）。</span></span>
<span class="line"><span>     * 返回的列表迭代器是fail-fast 。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public ListIterator&lt;E&gt; listIterator() {</span></span>
<span class="line"><span>        return new ListItr(0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 以正确的顺序返回该列表中的元素的迭代器。</span></span>
<span class="line"><span>     * 返回的迭代器是fail-fast 。</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public Iterator&lt;E&gt; iterator() {</span></span>
<span class="line"><span>        return new Itr();</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第一阶段-arraylist-源码学习的地图" tabindex="-1"><a class="header-anchor" href="#第一阶段-arraylist-源码学习的地图"><span>第一阶段：ArrayList 源码学习的地图</span></a></h2><p>可以理解为 4 个层次：</p><ol><li><strong>结构搭建</strong>（类定义、字段、继承结构）</li><li><strong>对象构造过程</strong>（三种构造函数）</li><li><strong>核心方法实现</strong>（增删改查、扩容）</li><li><strong>设计理念和性能优化点</strong>（比如：懒加载、fail-fast、空间换时间）</li></ol><hr><h2 id="第一步-结构搭建-——-arraylist-是个什么东西" tabindex="-1"><a class="header-anchor" href="#第一步-结构搭建-——-arraylist-是个什么东西"><span>第一步：结构搭建 —— ArrayList 是个什么东西？</span></a></h2><p>来看这一行：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class ArrayList&lt;E&gt; extends AbstractList&lt;E&gt;</span></span>
<span class="line"><span>        implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable {</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>这其实就是给这个类打了一堆“标签”和“血统”：</p><ul><li><strong><code>ArrayList&lt;E&gt;</code></strong>：这是一个<strong>泛型类</strong>，能存任何类型的对象。</li><li><strong><code>extends AbstractList&lt;E&gt;</code></strong>：继承了 <code>AbstractList</code>，也就是说 <code>ArrayList</code> 不需要从零造轮子，而是重写/扩展部分功能。</li><li><strong><code>implements List&lt;E&gt;</code></strong>：这是实现了最常用的接口：<code>List</code>。你熟悉的 <code>.add()</code>、<code>.get()</code>、<code>.remove()</code> 都是 <code>List</code> 的标准操作。</li><li><strong><code>RandomAccess</code></strong>：这个接口其实是个“标记接口”，告诉别人：“我支持快速随机访问”，比如 <code>.get(index)</code> 是常数时间。</li><li><strong><code>Cloneable</code> / <code>Serializable</code></strong>：让 <code>ArrayList</code> 支持克隆和序列化。</li></ul><blockquote><p>小结：ArrayList 是个封装了数组的、有序、可变、快速访问的集合类。</p></blockquote><hr><h2 id="第二步-构造函数-——-arraylist-是怎么创建的" tabindex="-1"><a class="header-anchor" href="#第二步-构造函数-——-arraylist-是怎么创建的"><span>第二步：构造函数 —— ArrayList 是怎么创建的？</span></a></h2><p>你看到了三种构造方法：</p><h3 id="_1-默认构造器-延迟初始化" tabindex="-1"><a class="header-anchor" href="#_1-默认构造器-延迟初始化"><span>1. 默认构造器（延迟初始化）：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public ArrayList() {</span></span>
<span class="line"><span>    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p><strong>注意点：</strong></p><ul><li>它并不会一开始就创建容量为 10 的数组，而是空的。</li><li>真正添加元素时，它才创建容量为 10 的数组。这个策略是为了<strong>节省内存</strong>，如果你没加元素，就不分配内存。</li></ul><h3 id="_2-指定容量的构造器" tabindex="-1"><a class="header-anchor" href="#_2-指定容量的构造器"><span>2. 指定容量的构造器：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public ArrayList(int initialCapacity) {</span></span>
<span class="line"><span>    if (initialCapacity &gt; 0) {</span></span>
<span class="line"><span>        this.elementData = new Object[initialCapacity];</span></span>
<span class="line"><span>    } else if (initialCapacity == 0) {</span></span>
<span class="line"><span>        this.elementData = EMPTY_ELEMENTDATA;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        throw new IllegalArgumentException(&quot;Illegal Capacity: &quot; + initialCapacity);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p><strong>关键点：</strong></p><ul><li>可以通过 <code>new ArrayList&lt;&gt;(100)</code> 提前分配空间，避免后期扩容。</li><li>容量不能为负，防止恶意传参。</li></ul><h3 id="_3-collection-构造器" tabindex="-1"><a class="header-anchor" href="#_3-collection-构造器"><span>3. Collection 构造器：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public ArrayList(Collection&lt;? extends E&gt; c) {</span></span>
<span class="line"><span>    elementData = c.toArray();</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p><strong>用途：</strong></p><ul><li>把现成的集合快速转成 ArrayList，例如 <code>new ArrayList&lt;&gt;(List.of(1, 2, 3))</code>。</li></ul><hr><h2 id="第三步-arraylist-如何增删查改" tabindex="-1"><a class="header-anchor" href="#第三步-arraylist-如何增删查改"><span>第三步：ArrayList 如何增删查改？</span></a></h2><h3 id="add-e-e-添加一个元素" tabindex="-1"><a class="header-anchor" href="#add-e-e-添加一个元素"><span><code>add(E e)</code>：添加一个元素</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public boolean add(E e) {</span></span>
<span class="line"><span>    ensureCapacityInternal(size + 1);</span></span>
<span class="line"><span>    elementData[size++] = e;</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>重点是 <code>ensureCapacityInternal(size + 1)</code>：它会在数组不够时调用 <code>grow()</code> 来扩容。</p><h3 id="扩容逻辑-grow" tabindex="-1"><a class="header-anchor" href="#扩容逻辑-grow"><span>扩容逻辑 <code>grow()</code>：</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1); // oldCapacity * 1.5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p><strong>扩容逻辑是 1.5 倍增长，避免频繁复制数组，提升性能。</strong></p><h3 id="remove-int-index-删除指定索引的元素" tabindex="-1"><a class="header-anchor" href="#remove-int-index-删除指定索引的元素"><span><code>remove(int index)</code>：删除指定索引的元素</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>System.arraycopy(elementData, index + 1, elementData, index, size - index - 1);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>关键是 <code>System.arraycopy</code>，效率高！直接原地挪动数组数据，删除元素后，<code>size--</code>，并清空尾部引用。</p><hr><h2 id="第四步-arraylist-的细节设计有哪些巧妙点" tabindex="-1"><a class="header-anchor" href="#第四步-arraylist-的细节设计有哪些巧妙点"><span>第四步：ArrayList 的细节设计有哪些巧妙点？</span></a></h2><h3 id="懒加载策略" tabindex="-1"><a class="header-anchor" href="#懒加载策略"><span>懒加载策略</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>默认构造函数并不立刻分配 10 个空间，而是等到第一次添加元素时才分配，<strong>节省空间开销</strong>。</p><hr><h3 id="fail-fast-机制" tabindex="-1"><a class="header-anchor" href="#fail-fast-机制"><span>fail-fast 机制</span></a></h3><p>所有涉及到结构变动的地方都会增加 <code>modCount</code>：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>modCount++;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>它在迭代器中用来检测并发修改，比如你遍历时用了 <code>for-each</code> 然后又 <code>remove()</code>，就会抛出 <code>ConcurrentModificationException</code>。</p><hr><h3 id="clone-是浅拷贝" tabindex="-1"><a class="header-anchor" href="#clone-是浅拷贝"><span>clone 是浅拷贝</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>v.elementData = Arrays.copyOf(elementData, size);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" alt="点击并拖拽以移动"></p><p>克隆的是数组本身，<strong>但元素是引用拷贝</strong>，如果元素是对象，改一个地方，另一个也会改。</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2><h3 id="补充-为什么-fail-fast-机制不能保证线程安全" tabindex="-1"><a class="header-anchor" href="#补充-为什么-fail-fast-机制不能保证线程安全"><span>补充： <strong>为什么 fail-fast 机制不能保证线程安全？</strong></span></a></h3><p><code>fail-fast</code> 机制的目的是<strong>尽早发现并发修改</strong>（例如，修改集合时抛出异常），但是它<strong>并不能保证线程安全</strong>。原因如下：</p><ul><li><strong>fail-fast 机制仅限于单线程中的“错误检测”</strong>：<code>fail-fast</code> 只会在你遍历集合时发现集合结构的修改，假设你遍历集合（比如使用迭代器）时，<strong>如果其他线程修改了集合结构</strong>（比如增删元素），那么当前线程会抛出 <code>ConcurrentModificationException</code> 异常。它的目的不是处理并发问题，而是 <strong>在集合发生不一致时尽早报警</strong>。</li><li><strong>线程安全问题仍然存在</strong>：即使 <code>fail-fast</code> 机制可以在你修改集合时报警，但它并没有同步机制来确保多个线程访问集合时不会发生冲突。比如，如果有多个线程同时修改同一个集合，即使 <code>fail-fast</code> 可以在某个线程抛出异常，<strong>其他线程仍然可能会遇到不一致的状态</strong>，并且没有办法确保线程之间的操作不会相互干扰。</li></ul><p>为了保证线程安全，你需要使用同步机制，比如 <code>synchronized</code> 关键字，或者使用像 <code>CopyOnWriteArrayList</code> 这样的线程安全集合。</p><p><strong>总结</strong>：</p><ul><li><code>fail-fast</code> 机制在并发修改时抛出异常，提醒你代码出错了。</li><li>但它并不提供同步或线程安全的保证，如果要确保多线程访问集合时的线程安全，需要显式地加锁或使用专门的线程安全集合类。</li></ul>`,69)]))}const v=s(l,[["render",p]]),t=JSON.parse('{"path":"/1.%E5%AD%A6%E4%B9%A0%E7%AF%87/1.Java%E5%9F%BA%E7%A1%80%E4%B8%8E%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5/10.ArrayList%20%E6%A0%B8%E5%BF%83%E6%BA%90%E7%A0%81.html","title":"10.ArrayList核心源码","lang":"en-US","frontmatter":{"title":"10.ArrayList核心源码"},"git":{"createdTime":1747451581000,"updatedTime":1747451581000,"contributors":[{"name":"Nu11Cat","username":"Nu11Cat","email":"2111867383@qq.com","commits":1,"url":"https://github.com/Nu11Cat"}]},"readingTime":{"minutes":14.8,"words":4440},"filePathRelative":"1.学习篇/1.Java基础与核心概念/10.ArrayList 核心源码.md"}');export{v as comp,t as data};
