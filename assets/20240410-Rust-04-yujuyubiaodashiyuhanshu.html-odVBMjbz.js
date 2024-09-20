import{_ as i,r as t,o,c,a as n,b as s,d as p,e as a}from"./app-C4bsKav7.js";const l={},u=a(`<h1 id="语句与表达式与函数" tabindex="-1"><a class="header-anchor" href="#语句与表达式与函数" aria-hidden="true">#</a> 语句与表达式与函数</h1><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><p><code>main</code>函数是程序入口，<code>fn</code>是用来声明新函数的关键字。</p><p>Rust代码中的函数和变量名都使用下划线命名法（<em>snake case</em>，直译为蛇形命名法）规范风格。此命名法中，所有字母都是小写并使用下划线分隔单词。</p><p>与C/C++不同的是，Rust 不关心函数定义于何处，只要定义了就行。</p><p>形参必须标注类型。</p><blockquote><p>在函数签名中，<strong>必须</strong>声明每个参数的类型。这是一个 Rust 设计中经过慎重考虑的决定：要求在函数定义中提供类型标注，意味着编译器几乎从不需要你在代码的其他地方注明类型来指出你的意图。</p></blockquote><p>示例：</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">print_labeled_measurement</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token char">&#39;h&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">print_labeled_measurement</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">,</span> unit_label<span class="token punctuation">:</span> <span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The measurement is: {}{}&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">,</span> unit_label<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="语句和表达式" tabindex="-1"><a class="header-anchor" href="#语句和表达式" aria-hidden="true">#</a> 语句和表达式</h2><p>函数体由一系列语句组成，也可选地以表达式结尾。目前为止，我们介绍的函数还没有包含结尾表达式，不过你已经看到了表达式作为语句的一部分。因为 Rust 是一门基于表达式（expression-based）的语言，所以这是一个需要理解的重要区别。其他语言没有这样的区别，所以让我们看看语句和表达式分别是什么，以及它们的区别如何影响函数体。</p><p><strong>语句</strong>（<em>statement</em>）是执行一些操作但不返回值的指令。表达式（<em>expression</em>）计算并产生一个值。让我们看一些例子：</p><p>实际上，我们已经使用过语句和表达式。使用 <code>let</code> 关键字创建变量并绑定一个值是一个语句。在列表 3-1 中，<code>let y = 6;</code> 是一个语句。</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>列表 3-1：包含一个语句的 <code>main</code> 函数定义</p><p>函数定义也是语句，上面整个例子本身就是一个语句。</p><p>语句不返回值。因此，不能把 <code>let</code> 语句赋值给另一个变量，就像下面的代码尝试做的那样，会产生一个错误：</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当运行这个程序时，会得到如下错误：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
error: expected expression, found statement (\`let\`)
 --&gt; src/main.rs:2:14
  |
2 |     let x = (let y = 6);
  |              ^^^^^^^^^
  |
  = note: variable declaration using \`let\` is a statement

error[E0658]: \`let\` expressions in this position are experimental
 --&gt; src/main.rs:2:14
  |
2 |     let x = (let y = 6);
  |              ^^^^^^^^^
  |
  = note: see issue #53667 &lt;https://github.com/rust-lang/rust/issues/53667&gt; for more information
  = help: you can write \`matches!(&lt;expr&gt;, &lt;pattern&gt;)\` instead of \`let &lt;pattern&gt; = &lt;expr&gt;\`

warning: unnecessary parentheses around assigned value
 --&gt; src/main.rs:2:13
  |
2 |     let x = (let y = 6);
  |             ^         ^
  |
  = note: \`#[warn(unused_parens)]\` on by default
help: remove these parentheses
  |
2 -     let x = (let y = 6);
2 +     let x = let y = 6;
  | 

For more information about this error, try \`rustc --explain E0658\`.
warning: \`functions\` (bin &quot;functions&quot;) generated 1 warning
error: could not compile \`functions\` due to 2 previous errors; 1 warning emitted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>let y = 6</code> 语句并不返回值，所以没有可以绑定到 <code>x</code> 上的值。这与其他语言不同，例如 C 和 Ruby，它们的赋值语句会返回所赋的值。在这些语言中，可以这么写 <code>x = y = 6</code>，这样 <code>x</code> 和 <code>y</code> 的值都是 <code>6</code>；Rust 中不能这样写。</p><p>表达式会计算出一个值，并且你接下来要用 Rust 编写的大部分代码都由表达式组成。考虑一个数学运算，比如 <code>5 + 6</code>，这是一个表达式并计算出值 <code>11</code>。表达式可以是语句的一部分：在示例 3-1 中，语句 <code>let y = 6;</code> 中的 <code>6</code> 是一个表达式，它计算出的值是 <code>6</code>。函数调用是一个表达式。宏调用是一个表达式。我们用来创建新作用域的大括号（代码块） <code>{}</code> 也是一个表达式，例如：</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        x <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of y is: {}&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个表达式：</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    x <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是一个代码块，在这个例子中计算结果是 <code>4</code>。这个值作为 <code>let</code> 语句的一部分被绑定到 <code>y</code> 上。注意，<code>x + 1</code> 行的末尾没有分号，这与你目前见过的大部分代码行不同。表达式的结尾没有分号。如果在表达式的末尾加上分号，那么它就转换为语句，而语句不会返回值。在接下来探讨函数返回值和表达式时，请记住这一点。</p>`,29),d={id:"带有返回值的函数",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#带有返回值的函数","aria-hidden":"true"},"#",-1),v={href:"https://www.rustwiki.org.cn/zh-CN/book/ch03-03-how-functions-work.html#%E5%B8%A6%E6%9C%89%E8%BF%94%E5%9B%9E%E5%80%BC%E7%9A%84%E5%87%BD%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},m=a(`<p>函数可以向调用它的代码返回值。我们并不对返回值命名，但要在箭头（<code>-&gt;</code>）后声明它的类型。在 Rust 中，函数的返回值等同于函数体最后一个表达式的值。使用 <code>return</code> 关键字和指定值，可从函数中提前返回；但大部分函数隐式的返回最后的表达式。这是一个有返回值的函数的例子：</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">five</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span>
    <span class="token number">5</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token function">five</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is: {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>five</code> 函数中没有函数调用、宏，甚至没有 <code>let</code> 语句——只有数字 <code>5</code> 本身。这在 Rust 中是一个完全有效的函数。注意，函数返回值的类型也被指定好，即 <code>-&gt; i32</code>。尝试运行代码；输出应如下所示：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
    Finished dev [unoptimized + debuginfo] target(s) in 0.30s
     Running \`target/debug/functions\`
The value of x is: 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>five</code> 函数的返回值是 <code>5</code>，所以返回值类型是 <code>i32</code>。让我们仔细检查一下这段代码。有两个重要的部分：首先，<code>let x = five();</code> 这一行表明我们使用函数的返回值初始化一个变量。因为 <code>five</code> 函数返回 <code>5</code>，这一行与如下代码相同：</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其次，<code>five</code> 函数没有参数并定义了返回值类型，不过函数体只有单单一个 <code>5</code> 也没有分号，因为这是一个表达式，正是我们想要返回的值。</p><p>让我们看看另一个例子：</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token function">plus_one</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is: {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">plus_one</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span>
    x <span class="token operator">+</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码会打印出 <code>The value of x is: 6</code>。但如果在包含 <code>x + 1</code> 的行尾加上一个分号，把它从表达式变成语句，我们将得到一个错误。</p><p>文件名: src/main.rs</p><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token function">plus_one</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is: {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">fn</span> <span class="token function-definition function">plus_one</span><span class="token punctuation">(</span>x<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span>
    x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码会产生一个错误，如下：</p><div class="language-console line-numbers-mode" data-ext="console"><pre class="language-console"><code>$ cargo run
   Compiling functions v0.1.0 (file:///projects/functions)
error[E0308]: mismatched types
 --&gt; src/main.rs:7:24
  |
7 | fn plus_one(x: i32) -&gt; i32 {
  |    --------            ^^^ expected \`i32\`, found \`()\`
  |    |
  |    implicitly returns \`()\` as its body has no tail or \`return\` expression
8 |     x + 1;
  |          - help: consider removing this semicolon

For more information about this error, try \`rustc --explain E0308\`.
error: could not compile \`functions\` due to previous error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要的错误信息 “mismatched types”（类型不匹配）揭示了这段代码的核心问题。函数 <code>plus_one</code> 的定义说明它要返回一个 <code>i32</code> 类型的值，不过语句并不会返回值，此值由单位类型 <code>()</code> 表示，表示不返回值。因为不返回值与函数定义相矛盾，从而出现一个错误。在输出中，Rust 提供了一条信息，可能有助于纠正这个错误：它建议删除分号，这将修复错误。</p>`,17);function k(b,f){const e=t("ExternalLinkIcon");return o(),c("div",null,[u,n("h3",d,[r,s(),n("a",v,[s("带有返回值的函数"),p(e)])]),m])}const h=i(l,[["render",k],["__file","20240410-Rust-04-yujuyubiaodashiyuhanshu.html.vue"]]);export{h as default};
