import{_ as n,o as s,c as a,e}from"./app-C4bsKav7.js";const t={},p=e(`<h1 id="变量与可变性" tabindex="-1"><a class="header-anchor" href="#变量与可变性" aria-hidden="true">#</a> 变量与可变性</h1><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token attribute attr-name">#![allow(unused)]</span>
<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 变量默认是不可变的，如要声明可变变量，应使用mut关键字</span>
    <span class="token comment">// let x = 5;</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
    x <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6</span>

    <span class="token comment">// 常量，命名约定是全部字母大写，并以下划线分隔单词</span>
    <span class="token comment">// 在声明的作用域内，常量在程序运行的整个过程中都有效</span>
    <span class="token keyword">const</span> <span class="token constant">THREE_HOURS_IN_SECONDS</span><span class="token punctuation">:</span> <span class="token keyword">u32</span> <span class="token operator">=</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">;</span>

    <span class="token comment">// 遮蔽(shadow)，可以通过使用相同的变量名并重复使用 let 关键字来遮蔽之前的变量</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">let</span> x <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x in the inner scope is: {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 12</span>
    <span class="token punctuation">}</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;The value of x is: {}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6</span>

    <span class="token comment">// 遮蔽也可以改变变量的类型</span>
    <span class="token keyword">let</span> spaces <span class="token operator">=</span> <span class="token string">&quot;   &quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> spaces <span class="token operator">=</span> spaces<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 而 mut 不行</span>
    <span class="token comment">// let mut spaces = &quot;   &quot;;</span>
    <span class="token comment">// spaces = spaces.len();</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","20240409-Rust-02-bianliangyukebianxing.html.vue"]]);export{r as default};
