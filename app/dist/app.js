!function(e){"use strict";var o="socialshare",t="Socialshare",i=["facebook","facebook-messenger","twitter","linkedin","google","pinterest","tumblr","reddit","stumbleupon","buffer","digg","delicious","vk","pocket","wordpress","flipboard","xing","hackernews","evernote","whatsapp","telegram","viber","skype","email","ok"],a=function(){var o=[{provider:"email",conf:{subject:"",body:"",to:"",cc:"",bcc:"",trigger:"click"}},{provider:"facebook",conf:{url:"",text:"",media:"",type:"",via:"",to:"",from:"",ref:"",display:"",source:"",caption:"",redirectUri:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"facebook-messenger",conf:{url:""}},{provider:"twitter",conf:{url:"",text:"",via:"",hashtags:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"linkedin",conf:{url:"",text:"",description:"",source:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"reddit",conf:{url:"",text:"",subreddit:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"vk",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"ok",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"digg",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"delicious",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"stumbleupon",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"pinterest",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"google",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"tumblr",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"buffer",conf:{url:"",text:"",via:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"pocket",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"flipboard",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"hackernews",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"wordpress",conf:{url:"",text:"",media:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"xing",conf:{url:"",text:"",media:"",follow:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"evernote",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"whatsapp",conf:{url:"",text:""}},{provider:"telegram",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}},{provider:"viber",conf:{url:"",text:""}},{provider:"skype",conf:{url:"",text:"",trigger:"click",popupHeight:600,popupWidth:500}}];return{configure:function(t){var a,r,s,n,l=0,c=0,h=e.injector(["ng"]).get("$log");if(t&&t.length>0)for(;l<t.length;l+=1)if(t[l].provider&&i.indexOf(t[l].provider)>-1){for(;c<o.length;c+=1)if(n=o[c],n&&n.provider&&t[l].provider===n.provider){for(a=Object.keys(n.conf),r=0;r<a.length;r+=1)s=a[r],s&&t[l].conf[s]&&(n.conf[s]=t[l].conf[s]);c=0;break}}else h.warn("Invalid provider at element "+l+" with name:"+t[l].provider)},$get:function(){return o}}},r=function(e,o){var t;o.socialshareType&&"feed"===o.socialshareType?(t="https://www.facebook.com/dialog/feed?",o.socialshareVia&&(t+="&app_id="+encodeURIComponent(o.socialshareVia)),o.socialshareRedirectUri&&(t+="&redirect_uri="+encodeURIComponent(o.socialshareRedirectUri)),o.socialshareUrl&&(t+="&link="+encodeURIComponent(o.socialshareUrl)),o.socialshareTo&&(t+="&to="+encodeURIComponent(o.socialshareTo)),o.socialshareDisplay&&(t+="&display="+encodeURIComponent(o.socialshareDisplay)),o.socialshareRef&&(t+="&ref="+encodeURIComponent(o.socialshareRef)),o.socialshareFrom&&(t+="&from="+encodeURIComponent(o.socialshareFrom)),o.socialshareDescription&&(t+="&description="+encodeURIComponent(o.socialshareDescription)),o.socialshareText&&(t+="&name="+encodeURIComponent(o.socialshareText)),o.socialshareCaption&&(t+="&caption="+encodeURIComponent(o.socialshareCaption)),o.socialshareMedia&&(t+="&picture="+encodeURIComponent(o.socialshareMedia)),o.socialshareSource&&(t+="&source="+encodeURIComponent(o.socialshareSource)),e.open(t,"Facebook","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)):o.socialshareType&&"send"===o.socialshareType?(t="https://www.facebook.com/dialog/send?",o.socialshareVia&&(t+="&app_id="+encodeURIComponent(o.socialshareVia)),o.socialshareRedirectUri&&(t+="&redirect_uri="+encodeURIComponent(o.socialshareRedirectUri)),o.socialshareUrl&&(t+="&link="+encodeURIComponent(o.socialshareUrl)),o.socialshareTo&&(t+="&to="+encodeURIComponent(o.socialshareTo)),o.socialshareDisplay&&(t+="&display="+encodeURIComponent(o.socialshareDisplay)),o.socialshareRef&&(t+="&ref="+encodeURIComponent(o.socialshareRef)),e.open(t,"Facebook","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)):e.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(o.socialshareUrl||e.location.href),"Facebook","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},s=function(e,o){var t="mailto:";o.socialshareTo&&(t+=encodeURIComponent(o.socialshareTo)),t+="?",o.socialshareBody&&(t+="body="+o.socialshareBody),o.socialshareSubject&&(t+="&subject="+encodeURIComponent(o.socialshareSubject)),o.socialshareCc&&(t+="&cc="+encodeURIComponent(o.socialshareCc)),o.socialshareBcc&&(t+="&bcc="+encodeURIComponent(o.socialshareBcc)),e.open(t,"_self")},n=function(e,o,t){var i="fb-messenger://share?link="+encodeURIComponent(o.socialshareUrl||e.location.href);t.attr("href",i)},l=function(e,o){var t="https://www.twitter.com/intent/tweet?";o.socialshareText&&(t+="text="+encodeURIComponent(o.socialshareText)),o.socialshareVia&&(t+="&via="+encodeURIComponent(o.socialshareVia)),o.socialshareHashtags&&(t+="&hashtags="+encodeURIComponent(o.socialshareHashtags)),t+="&url="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Twitter","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},c=function(e,o){e.open("https://plus.google.com/share?url="+encodeURIComponent(o.socialshareUrl||e.location.href),"Google+","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},h=function(e,o){var t="https://www.reddit.com/";t+=o.socialshareSubreddit?"r/"+o.socialshareSubreddit+"/submit?url=":"submit?url=",o.socialsharePopupWidth<900&&(o.socialsharePopupWidth=900),o.socialsharePopupHeight<650&&(o.socialsharePopupHeight=650),e.open(t+encodeURIComponent(o.socialshareUrl||e.location.href)+"&title="+encodeURIComponent(o.socialshareText),"Reddit","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},p=function(e,o){e.open("https://www.stumbleupon.com/submit?url="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&title="+encodeURIComponent(o.socialshareText),"StumbleUpon","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},d=function(e,o){var t="https://www.linkedin.com/shareArticle?mini=true";t+="&url="+encodeURIComponent(o.socialshareUrl||e.location.href),o.socialshareText&&(t+="&title="+encodeURIComponent(o.socialshareText)),o.socialshareDescription&&(t+="&summary="+encodeURIComponent(o.socialshareDescription)),o.socialshareSource&&(t+="&source="+encodeURIComponent(o.socialshareSource)),e.open(t,"Linkedin","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},u=function(e,o){e.open("https://www.pinterest.com/pin/create/button/?url="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&media="+encodeURIComponent(o.socialshareMedia)+"&description="+encodeURIComponent(o.socialshareText),"Pinterest","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},f=function(e,o){e.open("https://www.digg.com/submit?url="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&title="+encodeURIComponent(o.socialshareText),"Digg","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},g=function(e,o){if(o.socialshareMedia){var t="https://www.tumblr.com/share/photo?source="+encodeURIComponent(o.socialshareMedia);o.socialshareText&&(t+="&caption="+encodeURIComponent(o.socialshareText)),e.open(t,"Tumblr","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)}else e.open("https://www.tumblr.com/share/link?url="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&description="+encodeURIComponent(o.socialshareText),"Tumblr","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},m=function(e,o){var t="https://www.vk.com/share.php?url="+encodeURIComponent(o.socialshareUrl||e.location.href);o.socialshareText&&(t+="&title="+encodeURIComponent(o.socialshareText)),o.socialshareMedia&&(t+="&image="+encodeURIComponent(o.socialshareMedia)),o.socialshareDescription&&(t+="&description="+encodeURIComponent(o.socialshareDescription)),e.open(t,"Vk","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},y=function(e,o){e.open("http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&st.comments="+encodeURIComponent(o.socialshareText),"Ok","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},v=function(e,o){e.open("https://www.delicious.com/save?v=5&noui&jump=close&url="+encodeURIComponent(o.socialshareUrl||e.location.href)+"&title="+encodeURIComponent(o.socialshareText),"Delicious","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},b=function(e,o){var t="https://bufferapp.com/add?";o.socialshareText&&(t+="text="+encodeURIComponent(o.socialshareText)),o.socialshareVia&&(t+="&via="+encodeURIComponent(o.socialshareVia)),t+="&url="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Buffer","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},w=function(e,o){var t="https://news.ycombinator.com/submitlink?";o.socialshareText&&(t+="t="+encodeURIComponent(o.socialshareText)+"&"),t+="u="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Hackernews","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},P=function(e,o){var t="https://share.flipboard.com/bookmarklet/popout?v=2&";o.socialshareText&&(t+="title="+encodeURIComponent(o.socialshareText)+"&"),t+="url="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Flipboard","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},U=function(e,o){var t="https://getpocket.com/save?";o.socialshareText&&(t+="text="+encodeURIComponent(o.socialshareText)+"&"),t+="url="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Pocket","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},k=function(e,o){var t="http://wordpress.com/press-this.php?";o.socialshareText&&(t+="t="+encodeURIComponent(o.socialshareText)+"&"),o.socialshareMedia&&(t+="i="+encodeURIComponent(o.socialshareMedia)+"&"),t+="u="+encodeURIComponent(o.socialshareUrl||e.location.href),e.open(t,"Wordpress","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},C=function(e,o){var t="";o.socialshareFollow&&(t="&follow_url="+encodeURIComponent(o.socialshareFollow)),e.open("https://www.xing.com/spi/shares/new?url="+encodeURIComponent(o.socialshareUrl||e.location.href)+t,"Xing","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},H=function(e,o){var t="http://www.evernote.com/clip.action?url="+encodeURIComponent(o.socialshareUrl||e.location.href);o.socialshareText&&(t+="&title="+encodeURIComponent(o.socialshareText)),e.open(t,"Evernote","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},I=function(e,o,t){var i="whatsapp://send?text="+encodeURIComponent(o.socialshareText+" ")+encodeURIComponent(o.socialshareUrl||e.location.href);t.attr("href",i)},W=function(e,o,t){var i="viber://forward?text="+encodeURIComponent(o.socialshareText+" ")+encodeURIComponent(o.socialshareUrl||e.location.href);t.attr("href",i)},T=function(e,o){var t="https://telegram.me/share/url?url="+encodeURIComponent(o.socialshareUrl||e.location.href);o.socialshareText&&(t+="&text="+encodeURIComponent(o.socialshareText)),e.open(t,"Telegram","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},R=function(e,o){var t="https://web.skype.com/share?source=button&url="+encodeURIComponent(o.socialshareUrl||e.location.href);o.socialshareText&&(t+="&text="+encodeURIComponent(o.socialshareText)),e.open(t,"Skype","toolbar=0,status=0,resizable=yes,width="+o.socialsharePopupWidth+",height="+o.socialsharePopupHeight+",top="+(e.innerHeight-o.socialsharePopupHeight)/2+",left="+(e.innerWidth-o.socialsharePopupWidth)/2)},S=["$window",function(e){this.emailShare=s,this.facebookShare=r,this.twitterShare=l,this.stumbleuponShare=p,this.pinterestShare=u,this.googleShare=c,this.bufferShare=b,this.hackernewsShare=w,this.okShare=y,this.deliciousShare=v,this.pocketShare=U,this.vkShare=m,this.flipboardShare=P,this.xingShare=C,this.diggShare=f,this.linkedinShare=d,this.wordpressShare=k,this.telegramShare=T,this.redditShare=h,this.evernoteShare=H,this.tumblrShare=g,this.skypeShare=R,this.share=function(o){switch(o.provider){case"email":this.emailShare(e,o.attrs);break;case"facebook":this.facebookShare(e,o.attrs);break;case"twitter":this.twitterShare(e,o.attrs);break;case"pinterest":this.pinterestShare(e,o.attrs);break;case"ok":this.okShare(e,o.attrs);break;case"vk":this.vkShare(e,o.attrs);break;case"delicious":this.deliciousShare(e,o.attrs);break;case"digg":this.diggShare(e,o.attrs);break;case"google+":this.googleShare(e,o.attrs);break;case"reddit":this.redditShare(e,o.attrs);break;case"hackernews":this.hackernewsShare(e,o.attrs);break;case"skype":this.skypeShare(e,o.attrs);break;case"evernote":this.evernoteShare(e,o.attrs);break;case"pocket":this.pocketShare(e,o.attrs);break;case"tumblr":this.tumblrShare(e,o.attrs);break;case"telegram":this.telegramShare(e,o.attrs);break;case"xing":this.xingShare(e,o.attrs);break;case"buffer":this.bufferShare(e,o.attrs);break;case"stumbleupon":this.stumbleuponShare(e,o.attrs);break;case"linkedin":this.linkedinShare(e,o.attrs);break;case"wordpress":this.wordpressShare(e,o.attrs);break;case"flipboard":this.flipboardShare(e,o.attrs);break;default:return}}}],x=["$window","socialshareConf","Socialshare","$log",function(e,o,t){var a=function(a,r,s){for(var n,l=0,c=(function(){return!(s.socialshareProvider in $)||void $[s.socialshareProvider](e,s,r)});l<o.length;l+=1)if(o[l].provider===s.socialshareProvider){n=o[l];break}i.indexOf(n.provider)===-1&&t.warn("Invalid Provider Name : "+s.socialshareProvider),s.socialshareUrl=s.socialshareUrl||n.conf.url,s.socialshareText=s.socialshareText||n.conf.text,s.socialshareMedia=s.socialshareMedia||n.conf.media,s.socialshareType=s.socialshareType||n.conf.type,s.socialshareVia=s.socialshareVia||n.conf.via,s.socialshareTo=s.socialshareTo||n.conf.to,s.socialshareFrom=s.socialshareFrom||n.conf.from,s.socialshareRef=s.socialshareRef||n.conf.ref,s.socialshareDislay=s.socialshareDislay||n.conf.display,s.socialshareSource=s.socialshareSource||n.conf.source,s.socialshareCaption=s.socialshareCaption||n.conf.caption,s.socialshareRedirectUri=s.socialshareRedirectUri||n.conf.redirectUri,s.socialshareTrigger=s.socialshareTrigger||n.conf.trigger,s.socialsharePopupHeight=s.socialsharePopupHeight||n.conf.popupHeight,s.socialsharePopupWidth=s.socialsharePopupWidth||n.conf.popupWidth,s.socialshareSubreddit=s.socialshareSubreddit||n.conf.subreddit,s.socialshareDescription=s.socialshareDescription||n.conf.description,s.socialshareFollow=s.socialshareFollow||n.conf.follow,s.socialshareHashtags=s.socialshareHashtags||n.conf.hashtags,s.socialshareBody=s.socialshareBody||n.conf.body,s.socialshareSubject=s.socialshareSubject||n.conf.subject,s.socialshareCc=s.socialshareCc||n.conf.cc,s.socialshareBcc=s.socialshareBcc||n.conf.bcc,s.socialshareTrigger?r.bind(s.socialshareTrigger,c):c()};return{restrict:"A",link:a}}],$={email:s,facebook:r,"facebook-messenger":n,twitter:l,google:c,reddit:h,stumbleupon:p,linkedin:d,pinterest:u,digg:f,tumblr:g,vk:m,ok:y,delicious:v,buffer:b,hackernews:w,flipboard:P,pocket:U,wordpress:k,xing:C,evernote:H,whatsapp:I,telegram:T,viber:W,skype:R};e.module("720kb.socialshare",[]).provider(o+"Conf",a).service(t,S).directive(o,x)}(angular),angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(e,o){function t(e,o){return e.indexOf(o)>-1}function i(){o.$apply(function(){a.ready=!0})}var a={},r=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,s=/t=(\d+)[ms]?(\d+)?s?/;return a.getIdFromURL=function(e){var o=e.replace(r,"$1");if(t(o,";")){var i=o.split(";");if(t(i[1],"%")){var a=decodeURIComponent(i[1]);o=("http://youtube.com"+a).replace(r,"$1")}else o=i[0]}else t(o,"#")&&(o=o.split("#")[0]);return o},a.getTimeFromURL=function(e){e=e||"";var o=e.match(s);if(!o)return 0;var i=o[0],a=o[1],r=o[2];return"undefined"!=typeof r?(r=parseInt(r,10),a=parseInt(a,10)):t(i,"m")?(a=parseInt(a,10),r=0):(r=parseInt(a,10),a=0),r+60*a},a.ready=!1,"undefined"==typeof YT?e.onYouTubeIframeAPIReady=i:YT.loaded?a.ready=!0:YT.ready(i),a}]).directive("youtubeVideo",["$window","youtubeEmbedUtils",function(e,o){var t=1,i={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},a="youtube.player.";return e.YTConfig={host:"https://www.youtube.com"},{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(e,r,s){function n(){var o=Array.prototype.slice.call(arguments);e.$apply(function(){e.$emit.apply(e,o)})}function l(o){var t=i[o.data];"undefined"!=typeof t&&n(a+t,e.player,o),e.$apply(function(){e.player.currentState=t})}function c(o){n(a+"ready",e.player,o)}function h(o){n(a+"error",e.player,o)}function p(){var o=angular.copy(e.playerVars);o.start=o.start||e.urlStartTime;var t=new YT.Player(u,{height:e.playerHeight,width:e.playerWidth,videoId:e.videoId,playerVars:o,events:{onReady:c,onStateChange:l,onError:h}});return t.id=u,t}function d(){(e.videoId||e.playerVars.list)&&(e.player&&"function"==typeof e.player.destroy&&e.player.destroy(),e.player=p())}e.utils=o;var u=s.playerId||r[0].id||"unique-youtube-embed-id-"+t++;r[0].id=u,e.playerHeight=e.playerHeight||390,e.playerWidth=e.playerWidth||640,e.playerVars=e.playerVars||{};var f=e.$watch(function(){return e.utils.ready&&("undefined"!=typeof e.videoUrl||"undefined"!=typeof e.videoId||"undefined"!=typeof e.playerVars.list)},function(o){o&&(f(),"undefined"!=typeof e.videoUrl?e.$watch("videoUrl",function(o){e.videoId=e.utils.getIdFromURL(o),e.urlStartTime=e.utils.getTimeFromURL(o),d()}):"undefined"!=typeof e.videoId?e.$watch("videoId",function(){e.urlStartTime=null,d()}):e.$watch("playerVars.list",function(){e.urlStartTime=null,d()}))});e.$watchCollection(["playerHeight","playerWidth"],function(){e.player&&e.player.setSize(e.playerWidth,e.playerHeight)}),e.$on("$destroy",function(){e.player&&e.player.destroy()})}}}]),angular.module("wnh",["firebase","youtube-embed","720kb.socialshare","ngMaterial","ngMessages","ngRoute","wnh.filters","wnh.controllers","wnh.components","wnh.main","wnh.post"]).config(["$locationProvider","$routeProvider","$mdThemingProvider","$compileProvider",function(e,o,t,i){var a={"default":"400","hue-1":"50","hue-2":"200","hue-3":"A100"};t.definePalette("primary",{50:"#abb9d5",100:"#798fbb",200:"#5570a7",300:"#3d5078",400:"#324363",500:"#28354f",600:"#1e273b",700:"#131a26",800:"#090c12",900:"#000000",A100:"#abb9d5",A200:"#798fbb",A400:"#324363",A700:"#131a26",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),t.definePalette("accent",{50:"#ffffff",100:"#c1ddf0",200:"#94c5e6",300:"#5aa5d8",400:"#4298d2",500:"#2f89c6",600:"#2978ad",700:"#236794",800:"#1d567c",900:"#184563",A100:"#ffffff",A200:"#c1ddf0",A400:"#4298d2",A700:"#236794",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),t.definePalette("warn",{50:"#ffffff",100:"#fde5c9",200:"#fbcb92",300:"#f9a94d",400:"#f89b30",500:"#f78d12",600:"#e37d08",700:"#c56d07",800:"#a85d06",900:"#8a4c05",A100:"#ffffff",A200:"#fde5c9",A400:"#f89b30",A700:"#c56d07",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),t.theme("default").primaryPalette("primary",a).accentPalette("accent",a).warnPalette("warn",a).backgroundPalette("grey",{"default":"50","hue-1":"100","hue-2":"200","hue-3":"A100"}),e.html5Mode(!0),o.otherwise({redirectTo:"/"}),i.debugInfoEnabled(!1);var r={apiKey:"AIzaSyA9mff-Z4l_jkT4rJrvwf2YyozlBxU6gRk",authDomain:"world-needs-heroes.firebaseapp.com",databaseURL:"https://world-needs-heroes.firebaseio.com",storageBucket:"world-needs-heroes.appspot.com"};firebase.initializeApp(r)}]),angular.module("wnh.components",["wnh.services"]).component("wnhPost",{templateUrl:"views/components/post.html",controller:["$rootScope","$scope","Database","Auth","Dialogs","YoutubePlayers","Utils",function(e,o,t,i,a,r,s){var n=function(){t.hasVote(o.playof.key).then(function(e){e.val()&&(o.hasVote=!0)})};o.playof=this.playof,o.dialogs=a,o.voteIsHover=!1,o.hasVote=!1,o.author=null,o.currentUser=i.getUser(),o.shareProviders=[{id:"twitter",name:"Twitter"}],o.shareData={text:"Check this amazing Play of the game with "+s.heroesList[o.playof.hero].name,url:"https://worldneedsheroes.com/post/"+o.playof.key,hashtags:"WorldNeedsHeroes,Overwatch"},o.openMenu=function(e,o){e(o)},o.vote=function(){i.getUser()?t.vote(o.playof.key,o.hasVote).then(function(){o.hasVote=!o.hasVote,o.hasVote?(o.playof.votesCount++,ga("send","event","playof","add_vote")):(o.playof.votesCount--,ga("send","event","playof","remove_vote"))})["catch"](function(e){}):a.showLoginDialog()},this.$onInit=function(){i.getUser()&&t.hasVote(o.playof.key).then(function(e){e.val()&&(o.hasVote=!0)}),t.getProfile(o.playof.userId).then(function(e){e.val()&&(o.author=e.val())})},o.$on("youtube.player.ready",function(e,o){r.registerPlayer(o)}),o.$on("youtube.player.playing",function(e,o){r.pauseAllPlayers(o)}),e.$on("authChanged",function(e,t){o.currentUser=t,t?n():o.hasVote=!1})}],bindings:{playof:"="}}),angular.module("wnh.controllers",["wnh.services"]).controller("ToolbarCtrl",["$rootScope","$scope","Auth","Database","Utils","Dialogs","DataFilters",function(e,o,t,i,a,r,s){o.auth=t,o.dialogs=r,o.dataFilters=s,o.currentUser=null,o.timeframes=a.timeframesList,o.heroes=a.heroesList,o.currentTimeframe=s.getTimeframe(),o.currentHero=s.getHero(),o.openMenu=function(e,o){e(o)},o.getTimeframeInfo=function(e,t){for(var i=0;i<o.timeframes.length;i++)if(e===o.timeframes[i].filter)return o.timeframes[i][t]},e.$on("authChanged",function(e,t){o.currentUser=t}),e.$on("dataFiltersTimeframeChanged",function(e,t){o.currentTimeframe=t}),e.$on("dataFiltersHeroChanged",function(e,t){o.currentHero=t})}]).controller("PostBtnCtrl",["$scope","Dialogs",function(e,o){e.dialogs=o}]),angular.module("wnh.filters",["wnh.services"]).filter("heroName",["Utils",function(e){return function(o){return e.heroesList[o]&&e.heroesList[o].name}}]),angular.module("wnh.services",[]).factory("Utils",["$mdToast",function(e){return{heroesList:{genji:{id:"genji",name:"Genji"},mccree:{id:"mccree",name:"Mccree"},pharah:{id:"pharah",name:"Pharah"},reaper:{id:"reaper",name:"Reaper"},soldier76:{id:"soldier76",name:"Soldier: 76"},tracer:{id:"tracer",name:"Tracer"},bastion:{id:"bastion",name:"Bastion"},hanzo:{id:"hanzo",name:"Hanzo"},junkrat:{id:"junkrat",name:"Junkrat"},mei:{id:"mei",name:"Mei"},torbjorn:{id:"torbjorn",name:"Torbjörn"},widowmaker:{id:"widowmaker",name:"Widowmaker"},dva:{id:"dva",name:"D.VA"},reinhardt:{id:"reinhardt",name:"Reinhardt"},roadhog:{id:"roadhog",name:"Roadhog"},winston:{id:"winston",name:"Winston"},zarya:{id:"zarya",name:"Zarya"},lucio:{id:"lucio",name:"Lúcio"},mercy:{id:"mercy",name:"Mercy"},symmetra:{id:"symmetra",name:"Symmetra"},zenyatta:{id:"zenyatta",name:"Zenyatta"}},timeframesList:[{filter:"week",title:"7 days",icon:"view_week"},{filter:"day",title:"Last day",icon:"view_day"},{filter:"all",title:"Overall",icon:"history"}],itemsPerPage:5,overallLimit:300,showToast:function(o){e.show(e.simple().textContent(o).hideDelay(4e3))}}}]).factory("Header",["$window",function(e){return{setTitle:function(o){e.document.title=o},setMeta:function(o,t){e.document.querySelector('meta[name="'+o+'"]').setAttribute("content",t)}}}]).factory("DataFilters",["$rootScope",function(e){var o="week",t="";return{getTimeframe:function(){return o},getHero:function(){return t},setTimeframe:function(t){o=t,e.$broadcast("dataFiltersTimeframeChanged",t)},setHero:function(o){t=o,e.$broadcast("dataFiltersHeroChanged",o)}}}]).factory("YoutubePlayers",[function(){var e=[];return{registerPlayer:function(o){e.push(o)},pauseAllPlayers:function(o){e.forEach(function(e){e.id!==o.id&&1===e.getPlayerState()&&e.pauseVideo()})}}}]).factory("Youtube",["$http",function(e){var o="AIzaSyAyY4cymf3FIT7lOGltKv1WthHZlR7npkI",t="https://www.googleapis.com/youtube/v3/";return{getVideoInfo:function(i){return e({method:"GET",url:t+"videos?id="+i+"&key="+o+"&fields=items(id,snippet(title,thumbnails))&part=snippet"})}}}]).factory("Auth",["$rootScope","$firebaseAuth",function(e,o){var t=o(),i=null;return t.$onAuthStateChanged(function(o){i=o,e.$broadcast("authChanged",o)}),{logout:function(){return t.$signOut()},getUser:function(){return i},providerLogin:function(e){var o=new firebase.auth[e+"AuthProvider"];return"Facebook"===e?t.$signInWithRedirect(o):t.$signInWithPopup(o)}}}]).factory("Dialogs",["$mdDialog","$q","Auth","Database",function(e,o,t,i){return{showLoginDialog:function(){var o=this;e.show({controller:["$scope","$mdDialog","Auth","Database",function(e,t,i,a){e.hide=function(){t.hide()},e.login=function(e){i.providerLogin(e).then(function(e){ga("send","event","user","register"),t.hide(),a.getProfile(e.user.uid).then(function(e){var t=e.val();(!t||t&&!t.onboarding)&&o.showProfileDialog(!0)})})["catch"](function(e){})}}],templateUrl:"./views/dialogs/loginDialog.html",parent:angular.element(document.body),targetEvent:event,clickOutsideToClose:!0}).then(function(e){},function(){})},showProfileDialog:function(a){var r=!0,s=[];a?r=!1:s.push(i.getProfile(t.getUser().uid)),o.all(s).then(function(o){e.show({controller:["$scope","$mdDialog","Database",function(e,i,r){o.length&&(e.profile={displayName:o[0].val().name||"",battleTag:o[0].val().battletag||""}),a?e.title="Complete your profile":e.title="Edit your profile",e.save=function(){r.saveProfile({name:e.profile.displayName,battletag:e.profile.battleTag,picture:t.getUser().photoURL,onboarding:!0},function(){ga("send","event","user","onboarding")}),i.hide()}}],templateUrl:"./views/dialogs/profileDialog.html",parent:angular.element(document.body),targetEvent:event,clickOutsideToClose:r}).then(function(e){},function(){})})},showPostDialog:function(o,i){t.getUser()?e.show({controller:["$scope","$mdDialog","$location","Utils","Youtube","Database",function(e,t,a,r,s,n){e.edit=o,e.heroesList=r.heroesList,e.invalidId=!1,e.post={videoLink:"",hero:i&&i.hero||"",description:i&&i.description||""},e.videoLinkChange=function(){e.invalidId=!1},e.save=function(){if(e.post.hero){var o={hero:e.post.hero};e.post.description&&(o.description=e.post.description),n.updatePost(i.key,o).then(function(){i.hero=o.hero,i.description=o.description||"",ga("send","event","playof","edit_post"),t.hide(),r.showToast("Modifications saved")})["catch"](function(e){r.showToast("Error, please try again later")})}},e.newPost=function(){if(e.post.videoLink&&e.post.hero){var o=e.post.videoLink.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i),i=null;i=o&&11===o[1].length?o[1]:e.post.videoLink,i&&11===i.length?s.getVideoInfo(i).then(function(o){if(o.data.items.length){var s={youtubeId:i,hero:e.post.hero};e.post.description&&(s.description=e.post.description);var l=n.newPost(s);l?(ga("send","event","playof","post"),a.path("/post/"+l),r.showToast("Your play of the game has been posted")):r.showToast("Error, please try again later"),t.hide()}else e.invalidId=!0},function(e){r.showToast("Error, please try again later")}):e.invalidId=!0}},e.hide=function(){t.hide()}}],templateUrl:"./views/dialogs/postDialog.html",parent:angular.element(document.body),targetEvent:event,clickOutsideToClose:!0}).then(function(e){},function(){}):this.showLoginDialog()}}}]).factory("Database",["Auth","Utils",function(e,o){var t=firebase.database();return{getProfile:function(e){return t.ref("profile/"+e).once("value")},saveProfile:function(o,i){e.getUser()&&t.ref("profile/"+e.getUser().uid).update(o,i)},newPost:function(o){if(e.getUser()){o.userId=e.getUser().uid,o.votesCount=0,o.postedAt=firebase.database.ServerValue.TIMESTAMP;var i=t.ref("posts").push();return i.set(o).then(function(o){t.ref("profile/"+e.getUser().uid+"/posts/"+i.key).set(!0)}),i.key}},updatePost:function(o,i){if(e.getUser())return t.ref("posts/"+o).update(i)},vote:function(o,i){if(e.getUser())return t.ref("posts/"+o+"/votesCount").once("value").then(function(a){
var r={};return i?(r["posts/"+o+"/votesCount"]=a.val()-1,r["votes/"+o+"/"+e.getUser().uid]=null):(r["posts/"+o+"/votesCount"]=a.val()+1,r["votes/"+o+"/"+e.getUser().uid]=firebase.database.ServerValue.TIMESTAMP),t.ref().update(r)})},hasVote:function(o){if(e.getUser())return t.ref("votes/"+o+"/"+e.getUser().uid).once("value")},getPlayofList:function(e){var i=t.ref("posts"),a=0,r=moment().valueOf();return"all"===e?i.orderByChild("votesCount").limitToLast(o.overallLimit):("day"===e?a=moment().subtract(1,"days").valueOf():"week"===e&&(a=moment().subtract(7,"days").valueOf()),i.orderByChild("postedAt").startAt(a).endAt(r))},getPlayof:function(e){return t.ref("posts/"+e).once("value")}}}]),angular.module("wnh.main",["ngRoute","wnh.services"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"../../views/main.html",controller:"MainCtrl"})}]).controller("MainCtrl",["$rootScope","$scope","Auth","Database","Utils","DataFilters","Header",function(e,o,t,i,a,r,s){var n=function(){o.page=1,o.limit=o.page*a.itemsPerPage},l=function(e,t){n(),s.setTitle("Vote for the best play of the game - World Needs Heroes"),s.setMeta("description","Check the latest Overwatch play of the game and vote for the best one on World Needs Heroes"),o.playofList=[],i.getPlayofList(t).on("child_added",function(e){var t=e.val();t.key=e.key,o.$apply(function(){o.playofList.push(t)})})};o.playofList=[],o.currentHero=r.getHero(),o.showMore=function(){o.page++,o.limit=o.page*a.itemsPerPage},n(),l(),e.$on("dataFiltersTimeframeChanged",l),e.$on("dataFiltersHeroChanged",function(e,t){n(),o.currentHero=t})}]),angular.module("wnh.post",["ngRoute","wnh.services"]).config(["$routeProvider",function(e){e.when("/post/:postId",{templateUrl:"../../views/post.html",controller:"PostCtrl"})}]).controller("PostCtrl",["$rootScope","$scope","$routeParams","Auth","Database","Utils","Youtube","Header",function(e,o,t,i,a,r,s,n){var l=t.postId;o.inProgress=!0,o.playof=null,a.getPlayof(l).then(function(e){o.$apply(function(){if(e.val()){o.playof=e.val(),o.playof.key=e.key,o.inProgress=!1;var t=r.heroesList[e.hero]&&r.heroesList[e.hero].name;n.setTitle("Play of the game with "+t+" - World Needs Heroes"),n.setMeta("description","Discover and vote for this amazing Overwatch play of the game with "+t+" on World Needs Heroes")}else o.inProgress=!1,o.playof=null})})["catch"](function(e){o.$apply(function(){o.inProgress=!1,o.playof=null})})}]),function(e,o,t,i,a,r,s){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,r=o.createElement(t),s=o.getElementsByTagName(t)[0],r.async=1,r.src=i,s.parentNode.insertBefore(r,s)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-7759211-12","auto"),ga("send","pageview");