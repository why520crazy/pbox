pbox
====

jquery 弹框的一个插件

调用方式
<pre>
$(".pbox").pBox({content:'XXXX'})
</pre>

参数列表
<pre>
{
        remoteUrl  : null,
        content    : "",
        placement  : "bottom",
        animation  : false,
        delay      : 0,
        openClass  : 'pbox-open',
        closeClass : 'pbox-close',
        autoClose  : true,
        offset     : 4,
        align      : null,
        drag       : true,
        destroy    : true
}

</pre>

content内容模板：
<pre>
&lt;div class="pbox-header"&gt;
        &lt;button type="button" class="close" data-dismiss="modal" aria-hidden="true"&gt;×&lt;/button&gt;
        &lt;h3>我是头部&lt;/h3&gt;
&lt;/div&gt;
&lt;div class="pbox-body"&gt;
        content&lt;p>我是内容！！&lt;/p&gt;&lt;p>我是内容！！&lt;/p&gt;
&lt;/div&gt;
&lt;div class="pbox-footer"&gt;
        &lt;button class="btn"&gt;保存&lt;/button&gt;
&lt;/div&gt;
</pre>

实例演示:
http://why520crazy.github.io/pbox/simple/
