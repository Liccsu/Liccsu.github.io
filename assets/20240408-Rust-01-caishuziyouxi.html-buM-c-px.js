import{_ as n,o as s,c as a,e}from"./app-C4bsKav7.js";const t={},p=e(`<h1 id="猜数字游戏" tabindex="-1"><a class="header-anchor" href="#猜数字游戏" aria-hidden="true">#</a> 猜数字游戏</h1><div class="language-rust line-numbers-mode" data-ext="rs"><pre class="language-rust"><code><span class="token keyword">use</span> <span class="token namespace">rand<span class="token punctuation">::</span></span><span class="token class-name">Rng</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>cmp<span class="token punctuation">::</span></span><span class="token class-name">Ordering</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>io<span class="token punctuation">;</span>

<span class="token comment">/**
 * The main function of the program.
 * It starts the game by printing a welcome message, generating a secret number, and then entering a loop where it prompts the user to guess the number.
 * It continues to loop until the user guesses the correct number.
 */</span>
<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Guess the number!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * Generates a secret number between 1 and 100 (inclusive) using the \`rand::thread_rng().gen_range(1..101)\` function.
     * This number will be the target that the user will try to guess.
     */</span>
    <span class="token keyword">let</span> secret_number <span class="token operator">=</span> <span class="token namespace">rand<span class="token punctuation">::</span></span><span class="token function">thread_rng</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gen_range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * The main game loop. It will continue to run until the user guesses the correct number.
     */</span>
    <span class="token keyword">loop</span> <span class="token punctuation">{</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Enter your guess: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/**
         * Reads a line of input from the user.
         * If the input cannot be read, the program will panic with the message &quot;Failed to read line&quot;.
         */</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> guess <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token namespace">io<span class="token punctuation">::</span></span><span class="token function">stdin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">read_line</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> guess<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to read line&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/**
         * Parses the user&#39;s input into a u32 integer.
         * If the input cannot be parsed, the program will skip the current iteration of the loop and continue to the next one.
         */</span>
        <span class="token keyword">let</span> guess<span class="token punctuation">:</span> <span class="token keyword">u32</span> <span class="token operator">=</span> <span class="token keyword">match</span> guess<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Ok</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> num<span class="token punctuation">,</span>
            <span class="token class-name">Err</span><span class="token punctuation">(</span>_<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">continue</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;You guessed: {}&quot;</span><span class="token punctuation">,</span> guess<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/**
         * Compares the user&#39;s guess with the secret number.
         * If the guess is less than the secret number, it prints &quot;Too small!&quot;.
         * If the guess is greater than the secret number, it prints &quot;Too big!&quot;.
         * If the guess is equal to the secret number, it prints &quot;You got it!&quot; and breaks out of the loop.
         */</span>
        <span class="token keyword">match</span> guess<span class="token punctuation">.</span><span class="token function">cmp</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>secret_number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Ordering</span><span class="token punctuation">::</span><span class="token class-name">Less</span> <span class="token operator">=&gt;</span> <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Too small!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token class-name">Ordering</span><span class="token punctuation">::</span><span class="token class-name">Greater</span> <span class="token operator">=&gt;</span> <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Too big!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token class-name">Ordering</span><span class="token punctuation">::</span><span class="token class-name">Equal</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;You got it!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(i,u){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","20240408-Rust-01-caishuziyouxi.html.vue"]]);export{r as default};
