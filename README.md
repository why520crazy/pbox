pbox
====

jquery 弹框的一个插件


<pre>

调用方式
$(".pbox").pBox({content:'<div class="pbox-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>我是头部</h3></div><div class="pbox-body">content<p>我是内容！！</p><p>我是内容！！</p></div>'})

参数列表
{
        remoteUrl: null,
        content   : "",
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
