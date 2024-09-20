import{_ as c,r as t,o,c as l,a as n,b as s,d as e,e as i}from"./app-C4bsKav7.js";const r={},d=i('<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">声明</p><p>本博客仅以学习为目的进行记录，请支持正版，并将本博客提及相关文件于24h内删除。</p></div><h2 id="_1-安装原版typora" tabindex="-1"><a class="header-anchor" href="#_1-安装原版typora" aria-hidden="true">#</a> 1.安装原版Typora</h2><p><strong>安装过程略过</strong></p><h2 id="_2-克隆相关仓库" tabindex="-1"><a class="header-anchor" href="#_2-克隆相关仓库" aria-hidden="true">#</a> 2.克隆相关仓库</h2><h3 id="方式一" tabindex="-1"><a class="header-anchor" href="#方式一" aria-hidden="true">#</a> 方式一</h3>',5),p={href:"https://github.com/hazukieq/Yporaject",target:"_blank",rel:"noopener noreferrer"},u=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 可以直接克隆本项目的仓库, depth=1 表示仅克隆最新版本,以减少等待时间</span>
<span class="token function">git</span> clone https://github.com/hazukieq/Yporaject.git <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方式二" tabindex="-1"><a class="header-anchor" href="#方式二" aria-hidden="true">#</a> 方式二</h3><p>克隆原项目仓库，好处是保持最新版，坏处是稍微麻烦一点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 原项目仓库, depth=1 表示仅克隆最新版本,以减少等待时间</span>
<span class="token function">git</span> clone https://github.com/DiamondHunters/NodeInject <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> 

<span class="token function">git</span> clone https://github.com/DiamondHunters/NodeInject_Hook_example <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 建立 Yproraject 文件夹</span>
<span class="token function">mkdir</span> Yporaject

<span class="token comment"># 将两个项目资源合并</span>
<span class="token comment"># 将 NodeInject 项目代码复制到 Yproraject 文件夹</span>
<span class="token function">cp</span> NodeInject/* Yporaject <span class="token parameter variable">-r</span>

<span class="token comment"># 将 NodeInject_Hook_example/hook.js 复制到 Yporaject/src 文件夹</span>
<span class="token function">cp</span> NodeInject_Hook_example/hook.js Yporaject/src

<span class="token comment"># 将 NodeInject_Hook_example/license_gen 文件夹复制到 Yporaject 文件夹</span>
<span class="token function">cp</span> NodeInject_Hook_example/license_gen Yporaject <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-配置-rust-编译环境" tabindex="-1"><a class="header-anchor" href="#_3-配置-rust-编译环境" aria-hidden="true">#</a> 3.配置 Rust 编译环境</h2><p>由于编译项目需要 <strong>Rust</strong> 的支持，所以我们需要配置相关环境(若已有，则可跳过该步骤)</p><p>参考步骤：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用官方脚本安装</span>
<span class="token function">curl</span> <span class="token parameter variable">--proto</span> <span class="token string">&#39;=https&#39;</span> <span class="token parameter variable">--tlsv1.2</span> <span class="token parameter variable">-sSf</span> https://sh.rustup.rs <span class="token operator">|</span> <span class="token function">sh</span>

<span class="token comment"># 检查 cargo，若看到如下版本信息，则说明配置成功</span>
<span class="token function">cargo</span> <span class="token parameter variable">-v</span>
<span class="token function">cargo</span> <span class="token number">1.70</span>.0 <span class="token punctuation">(</span>ec8a8a0ca <span class="token number">2023</span>-04-25<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：若安装过程中出现其他问题，请自行网上搜索相关安装教程，关键字 <code>你的系统</code> <code>cargo</code> <code>rust</code> <code>install</code></p><h2 id="_4-编译-yporaject-项目" tabindex="-1"><a class="header-anchor" href="#_4-编译-yporaject-项目" aria-hidden="true">#</a> 4.编译 Yporaject 项目</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 Yporaject 项目</span>
<span class="token builtin class-name">cd</span> Yporaject
<span class="token comment"># 运行编译命令</span>
<span class="token function">cargo</span> build
<span class="token comment"># 查看二进制是否生成,程序名称为 node_inject</span>
<span class="token function">ls</span> target/debug
<span class="token comment"># 尝试运行该二进制程序</span>
<span class="token function">cargo</span> run
<span class="token comment"># 输出如下: </span>
no node_modules.asar found
move me to the root of your typora installation<span class="token punctuation">(</span>the same directory as executable of electron<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请务必确认当前项目目录 <strong>target/debug 下</strong> 是否生成了 <strong>node_inject 二进制程序</strong></p><h2 id="_5-复制二进制程序到安装目录下" tabindex="-1"><a class="header-anchor" href="#_5-复制二进制程序到安装目录下" aria-hidden="true">#</a> 5.复制二进制程序到安装目录下</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 记录当前目录路径，待会返回需要用到</span>
<span class="token assign-left variable">cur</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>

<span class="token comment"># 复制二进制程序到相关目录下</span>
<span class="token function">sudo</span> <span class="token function">cp</span> target/debug/node_inject /usr/share/typora
<span class="token comment"># 进入相关目录</span>
<span class="token builtin class-name">cd</span> /usr/share/typora
<span class="token comment"># 给予二进制程序执行权限</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> +x node_inject

<span class="token comment"># 运行二进制程序</span>
<span class="token comment"># (请注意程序运行输出信息，观察是否运行成功！！)</span>
<span class="token comment"># 若无读写权限,建议使用 sudo ./node_inject</span>
<span class="token function">sudo</span> ./node_inject
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-获取许可证激活码" tabindex="-1"><a class="header-anchor" href="#_6-获取许可证激活码" aria-hidden="true">#</a> 6.获取许可证激活码</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 返回项目</span>
<span class="token builtin class-name">cd</span> <span class="token variable">$cur</span>
<span class="token comment"># 进入 license-gen 文件夹</span>
<span class="token builtin class-name">cd</span> license-gen
<span class="token comment"># 编译代码</span>
<span class="token function">cargo</span> build
<span class="token comment"># 运行二进制程序</span>
<span class="token function">cargo</span> run
<span class="token comment"># 你将会得到以下输出</span>
    Finished dev <span class="token punctuation">[</span>unoptimized + debuginfo<span class="token punctuation">]</span> target<span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token number">0</span>.00s
     Running <span class="token variable"><span class="token variable">\`</span>target/debug/license-gen<span class="token variable">\`</span></span>
License <span class="token keyword">for</span> you: xxxxxx-xxxxxx-xxxxxx-xxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-激活" tabindex="-1"><a class="header-anchor" href="#_7-激活" aria-hidden="true">#</a> 7.激活</h2><p><strong>具体过程略过</strong></p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,19),m={href:"https://github.com/hazukieq/Yporaject/blob/master/README.md",target:"_blank",rel:"noopener noreferrer"};function v(b,h){const a=t("ExternalLinkIcon");return o(),l("div",null,[d,n("p",null,[s("直接克隆"),n("a",p,[s("Yporaject"),e(a)]),s(" (此项目对原两个项目进行了合并)，好处是一键编译即可，坏处是此项目并未和原项目代码同步。")]),u,n("p",null,[n("a",m,[s("TYpora 最新版激发教程"),e(a)])])])}const g=c(r,[["render",v],["__file","20240326-Typorajihuojiaocheng.html.vue"]]);export{g as default};
