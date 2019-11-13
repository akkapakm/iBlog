"use strict";var pageCount,home_loading_timeout=2e3,isLoading=!1,timeout=1e3,contentTimeout=1500,begin=new Date,contentBegin=new Date,tooltip_timeout=1500;function requestData(){$.ajax({url:$("#filterForm")[0].action,type:$("#filterForm")[0].method,data:$("#filterForm").serialize(),success:function(t){var e=new Date,a=t.posts;(pageCount=t.pageCount,timeout<e-begin)?addPage($("#PageIndex").val(),a):setTimeout(function(){addPage($("#PageIndex").val(),a)},timeout-(e-begin))}})}function appendContent(t){$(".sk-cube-grid").hide(),$(".post-content div").html(t.Content);var e=JSON.parse(t.Labels);$.each(e,function(t,e){$("#label-foot").append('<span title="'+e.text+'" class="post-label">'+e.text+"</span>")}),$(".post-modal .modal-body").mCustomScrollbar("scrollTo","top",{scrollInertia:0}),$(".post-content div").fadeIn()}function closeModal(){$(".post-modal").css("right","-1200px"),$(".post-cover").fadeOut(),$("body").removeClass("modal-open"),resetModal()}function resetModal(){$(".post-modal .modal-header h4").empty(),$(".post-content div").empty(),$("#label-foot").empty()}function searchPost(){$(".list-wrap ol").html(""),$("[data-toggle='tooltip']").tooltip("hide"),$("#page-nav").html(""),$("#btn-load").remove(),$("#no-more").remove(),begin=new Date,$("#load-list").show(),$("#PageIndex").val(1),requestData()}function addPage(o,t){if($("#load-list").hide(),0<t.length){$(".list-wrap ol").append('<li id="page'+o+'"></li>'),$.each(t,function(t,e){var a;a="1"==e.Source?'<div uid="'+e.Alias+'" class="blog-item '+(0<$(".home-loading").length?"":"animated fadeIn")+'">    <h4>        <a title="'+e.Title+'" target="_blank" href="'+e.Url+'"><i class="fa fa-link"></i> '+e.Title+'        </a>    </h4>    <span title="文章分类">        <i class="fa fa-tasks">        </i>        <a href="/blog/category/'+e.CategoryAlias+'" target="_blank">'+e.CateName+'</a>    </span>    <span title="发布时间" class="margin-left-20">        <i class="fa fa-clock-o">        </i>        '+e.PublishDate+'    </span>    <a title="'+e.Host+'" target="_blank" href="'+e.Url.substring(0,e.Url.indexOf("://")+3)+e.Host+'" class="pull-right margin-left-20 hidden-xs">        <i class="fa fa-globe-americas"></i> '+e.Host+'    </a>    <div class="clearfix">    </div>    <p>        '+encodeHtml(e.Summary)+'    </p></div><div class="hr-line-dashed"></div>':'<div class="blog-item '+(0<$(".home-loading").length?"":"animated fadeIn")+'" uid="'+e.Alias+'"><a class="preview-link"></a><h4><a href="/blog/'+e.CategoryAlias+"/"+e.Alias+'" target="_blank" title="'+e.Title+'">'+e.Title+'</a></h4><span title="文章分类"><i class="fa fa-tasks"></i> <a href="/blog/'+e.CategoryAlias+'" target="_blank">'+e.CateName+'</a></span> <span class="margin-left-20" title="发布时间"><i class="fa fa-clock-o"></i> '+e.PublishDate+'</span><span class="pull-right margin-left-20 hidden-xs" title="评论人数"><i class="fa fa-comments-o"></i> <span id = "sourceId::'+e.UniqueId+'" class = "cy_cmt_count" ></span></span><span class="pull-right hidden-xs" title="浏览次数"><i class="fa fa-eye"></i> '+e.ViewCount+'</span><div class="clearfix"></div><p>'+encodeHtml(e.Summary)+'</p></div><div class="hr-line-dashed"></div>',$("#page"+o).append(a)}),$("body").append('<script id="cy_cmt_num" src="https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=cyrUoGjWj"><\/script>');var e=$('<li><a href="javascript:void(0)" page="'+o+'" data-toggle="tooltip" data-placement="right" title="第'+o+'页"></a></li>');e.appendTo($("#page-nav"));var a=100/o;$("#page-nav li").css("height",a+"%"),$("[data-toggle='tooltip']:visible").tooltip({container:"body"}),e.find("a").tooltip("show"),setTimeout(function(){e.find("a").tooltip("hide")},tooltip_timeout),$("#PageIndex").val()==pageCount?1!=pageCount&&$(".list-wrap").append('<div id="no-more" class="text-muted text-center">没有更多数据</div>'):$(".list-wrap").append('<button id="btn-load" class="btn btn-white btn-block">下一页</button>')}else $(".list-wrap ol").append('<li id="page'+o+'"></li>'),$("#page"+o).append('<div class="text-center text-muted">暂无数据</div>');if(isLoading=!1,0<$(".home-loading").length){var n=new Date;if($("[data-toggle='tooltip']").tooltip("hide"),n-home_loading_begin>home_loading_timeout)$(".home-loading").remove(),document.body.style.overflow="auto";else{var i=home_loading_timeout-(n-home_loading_begin);setTimeout(function(){$(".home-loading").remove(),document.body.style.overflow="auto"},i)}}}function encodeHtml(t){return"string"!=typeof t?t:t.replace(/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,function(t){var e=t.charCodeAt(0),a=["&#"];return e=32==e?160:e,a.push(e),a.push(";"),a.join("")})}$(function(){$(".my-nav-pills li:eq(0)").addClass("active").siblings().removeClass("active"),$("#load-list").show(),$("#PageIndex").val(1),requestData(),$(".category-list").mCustomScrollbar({axis:"y",theme:"dark-3"}),$(window).scroll(function(){$("[data-toggle='tooltip']").tooltip("hide")}),$("[data-toggle='tooltip']").tooltip({container:"body"}),$(document).on({click:function(){$(this).remove(),begin=new Date,$("#load-list").show(),isLoading=!0,$("#PageIndex").val(parseInt($("#PageIndex").val())+1),requestData()}},"#btn-load"),$(document).on({click:function(){var t=$(this).attr("page"),e=$("#page"+t);$("html,body").animate({scrollTop:$(e).offset().top-90},1e3)}},"#page-nav a"),$(document).on({click:function(){$(".bd_weixin_popup").hide(),$(".bd_weixin_popup_bg").hide(),$(".post-cover").fadeIn(),$("body").addClass("modal-open");var t=$(this).siblings("h4").children("a").html(),e=$(this).parent().attr("uid");$(".post-modal .modal-header h4").html(t),$("#btnFullMode").attr("href","/"+e),$(".sk-cube-grid").show(),$(".post-content div").hide();var a=$(this).parent().find(".cy_cmt_count").text();$("#modal-comments").text(a),$(".post-modal").css("right",0),contentBegin=new Date,$.ajax({url:"/blog/getPreviewContent",type:"Post",data:{alias:e},success:function(t){var e=new Date;contentTimeout<e-contentBegin?appendContent(t):setTimeout(function(){appendContent(t)},contentTimeout-(e-contentBegin))}})}},".preview-link"),$(".post-modal .modal-body").mCustomScrollbar({theme:"dark-3",scrollButtons:{enable:!0}}),$(".post-cover").on("click",function(){closeModal()}),$("#btnCloseModal").on("click",function(){closeModal()}),$("#btnFullMode").on("click",function(){setTimeout(closeModal,800)}),$(".list-top-left a").on("click",function(){$(this).hasClass("current")||($(this).addClass("current").siblings().removeClass("current"),$(".list-wrap ol").html(""),$("[data-toggle='tooltip']").tooltip("hide"),$("#page-nav").html(""),$("#btn-load").remove(),$("#no-more").remove(),begin=new Date,$("#load-list").show(),$("#SortBy").val($(this).attr("sort")),$("#PageIndex").val(1),requestData())}),$("#Keyword").on("keypress",function(t){13!=t.which&&10!=t.which||searchPost()}),$("#btnFilter").on("click",function(){searchPost()}),$(".selectlist").on("changed.fu.selectlist",function(t,e){$(this).find("li").removeClass("active"),$(this).find("li[data-value="+e.value+"]").addClass("active")})}),$(function(){$(window).scroll(function(){0<$(window).scrollTop()?($("#scrollTop").show(),$(".qrcontain").css("top","-57px"),$(".qrcontain .arrow").css("top","52%")):($("#scrollTop").hide(),$(".qrcontain").css("top","-107px"),$(".qrcontain .arrow").css("top","86%"))}),$("#qrBtn").on("click",function(){$("#ss_toggle").hasClass("close")&&($("#share-menu").css("transition","none"),$("#ss_toggle").click()),$(".qrcontain").is(":hidden")?($(".qrcontain").removeClass("fadeOutLeft").addClass("fadeInLeft"),$(".qrcontain").show(),$("#qrBtn").addClass("opened")):($(".qrcontain").removeClass("fadeInLeft").addClass("fadeOutLeft"),$(".qrcontain").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(".qrcontain").hide()}),$("#qrBtn").removeClass("opened")),$("#share-menu").css("transition","all 1s ease 0s")}),$("#scrollTop a").on("click",function(){$("html,body").animate({scrollTop:0},1e3)});var e,a=$("#ss_toggle"),o=$("#share-menu");$("#ss_toggle").on("click",function(t){$(".qrcontain").is(":hidden")||($(".qrcontain").hide(),$("#qrBtn").removeClass("opened")),(e=parseInt($(this).data("rot"))-180)/180%2==0?(o.css("transform","rotate("+e+"deg)"),o.css("webkitTransform","rotate("+e+"deg)"),a.parent().addClass("ss_active"),a.addClass("close")):(o.css("transform","rotate("+parseInt(e-30)+"deg)"),o.css("webkitTransform","rotate("+parseInt(e-30)+"deg)"),a.parent().removeClass("ss_active"),a.removeClass("close")),$(this).data("rot",e)}),o.on("transitionend webkitTransitionEnd oTransitionEnd",function(){e/180%2==0?$("#share-menu i.fa").addClass("bounce"):$("#share-menu i.fa").removeClass("bounce")});var t=document.createElement("img");t.src=logoPath,t.onload=function(){$("#qrcode").qrcode({text:window.location.href,size:"100",ecLevel:"H",minVersion:4,mode:4,image:t,mSize:.3})}});