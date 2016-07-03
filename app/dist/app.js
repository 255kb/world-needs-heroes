angular.module("youtube-embed",["ng"]).service("youtubeEmbedUtils",["$window","$rootScope",function(e,t){function n(e,t){return e.indexOf(t)>-1}function o(){t.$apply(function(){a.ready=!0})}var a={},r=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,i=/t=(\d+)[ms]?(\d+)?s?/;return a.getIdFromURL=function(e){var t=e.replace(r,"$1");if(n(t,";")){var o=t.split(";");if(n(o[1],"%")){var a=decodeURIComponent(o[1]);t=("http://youtube.com"+a).replace(r,"$1")}else t=o[0]}else n(t,"#")&&(t=t.split("#")[0]);return t},a.getTimeFromURL=function(e){e=e||"";var t=e.match(i);if(!t)return 0;var o=t[0],a=t[1],r=t[2];return"undefined"!=typeof r?(r=parseInt(r,10),a=parseInt(a,10)):n(o,"m")?(a=parseInt(a,10),r=0):(r=parseInt(a,10),a=0),r+60*a},a.ready=!1,"undefined"==typeof YT?e.onYouTubeIframeAPIReady=o:YT.loaded?a.ready=!0:YT.ready(o),a}]).directive("youtubeVideo",["$window","youtubeEmbedUtils",function(e,t){var n=1,o={"-1":"unstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"queued"},a="youtube.player.";return e.YTConfig={host:"https://www.youtube.com"},{restrict:"EA",scope:{videoId:"=?",videoUrl:"=?",player:"=?",playerVars:"=?",playerHeight:"=?",playerWidth:"=?"},link:function(e,r,i){function u(){var t=Array.prototype.slice.call(arguments);e.$apply(function(){e.$emit.apply(e,t)})}function l(t){var n=o[t.data];"undefined"!=typeof n&&u(a+n,e.player,t),e.$apply(function(){e.player.currentState=n})}function s(t){u(a+"ready",e.player,t)}function d(t){u(a+"error",e.player,t)}function c(){var t=angular.copy(e.playerVars);t.start=t.start||e.urlStartTime;var n=new YT.Player(h,{height:e.playerHeight,width:e.playerWidth,videoId:e.videoId,playerVars:t,events:{onReady:s,onStateChange:l,onError:d}});return n.id=h,n}function f(){(e.videoId||e.playerVars.list)&&(e.player&&"function"==typeof e.player.destroy&&e.player.destroy(),e.player=c())}e.utils=t;var h=i.playerId||r[0].id||"unique-youtube-embed-id-"+n++;r[0].id=h,e.playerHeight=e.playerHeight||390,e.playerWidth=e.playerWidth||640,e.playerVars=e.playerVars||{};var p=e.$watch(function(){return e.utils.ready&&("undefined"!=typeof e.videoUrl||"undefined"!=typeof e.videoId||"undefined"!=typeof e.playerVars.list)},function(t){t&&(p(),"undefined"!=typeof e.videoUrl?e.$watch("videoUrl",function(t){e.videoId=e.utils.getIdFromURL(t),e.urlStartTime=e.utils.getTimeFromURL(t),f()}):"undefined"!=typeof e.videoId?e.$watch("videoId",function(){e.urlStartTime=null,f()}):e.$watch("playerVars.list",function(){e.urlStartTime=null,f()}))});e.$watchCollection(["playerHeight","playerWidth"],function(){e.player&&e.player.setSize(e.playerWidth,e.playerHeight)}),e.$on("$destroy",function(){e.player&&e.player.destroy()})}}}]),angular.module("wnh",["firebase","youtube-embed","ngMaterial","ngMessages","ngRoute","wnh.main","wnh.components","wnh.filters"]).config(["$locationProvider","$routeProvider","$mdThemingProvider","$compileProvider",function(e,t,n,o){var a={"default":"400","hue-1":"50","hue-2":"200","hue-3":"A100"};n.definePalette("primary",{50:"#abb9d5",100:"#798fbb",200:"#5570a7",300:"#3d5078",400:"#324363",500:"#28354f",600:"#1e273b",700:"#131a26",800:"#090c12",900:"#000000",A100:"#abb9d5",A200:"#798fbb",A400:"#324363",A700:"#131a26",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),n.definePalette("accent",{50:"#ffffff",100:"#c1ddf0",200:"#94c5e6",300:"#5aa5d8",400:"#4298d2",500:"#2f89c6",600:"#2978ad",700:"#236794",800:"#1d567c",900:"#184563",A100:"#ffffff",A200:"#c1ddf0",A400:"#4298d2",A700:"#236794",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),n.definePalette("warn",{50:"#ffffff",100:"#fde5c9",200:"#fbcb92",300:"#f9a94d",400:"#f89b30",500:"#f78d12",600:"#e37d08",700:"#c56d07",800:"#a85d06",900:"#8a4c05",A100:"#ffffff",A200:"#fde5c9",A400:"#f89b30",A700:"#c56d07",contrastDefaultColor:"light",contrastDarkColors:"50 A100"}),n.theme("default").primaryPalette("primary",a).accentPalette("accent",a).warnPalette("warn",a).backgroundPalette("grey",{"default":"50","hue-1":"100","hue-2":"200","hue-3":"A100"}),e.html5Mode(!0),t.otherwise({redirectTo:"/"}),o.debugInfoEnabled(!1);var r={apiKey:"AIzaSyA9mff-Z4l_jkT4rJrvwf2YyozlBxU6gRk",authDomain:"world-needs-heroes.firebaseapp.com",databaseURL:"https://world-needs-heroes.firebaseio.com",storageBucket:"world-needs-heroes.appspot.com"};firebase.initializeApp(r)}]),angular.module("wnh.components",["wnh.services"]).component("wnhPost",{templateUrl:"views/components/post.html",controller:["$rootScope","$scope","Database","Auth","Dialogs","YoutubePlayers",function(e,t,n,o,a,r){var i=function(){n.hasVote(t.playof.key).then(function(e){e.val()&&(t.hasVote=!0)})};t.playof=this.playof,t.voteIsHover=!1,t.hasVote=!1,t.author=null,t.currentUser=o.getUser(),t.voteHover=function(e){t.voteIsHover=e},t.vote=function(){o.getUser()?n.vote(t.playof.key,t.hasVote).then(function(){t.hasVote=!t.hasVote,t.hasVote?t.playof.votesCount++:t.playof.votesCount--})["catch"](function(e){}):a.showLoginDialog()},this.$onInit=function(){o.getUser()&&n.hasVote(t.playof.key).then(function(e){e.val()&&(t.hasVote=!0)}),n.getProfile(t.playof.userId).then(function(e){e.val()&&(t.author=e.val())})},t.$on("youtube.player.ready",function(e,t){r.registerPlayer(t)}),t.$on("youtube.player.playing",function(e,t){r.pauseAllPlayers(t)}),e.$on("authChanged",function(e,n){t.currentUser=n,n?i():t.hasVote=!1})}],bindings:{playof:"="}}),angular.module("wnh.filters",["wnh.services"]).filter("heroName",["Utils",function(e){return function(t){return e.heroesList[t]&&e.heroesList[t].name}}]),angular.module("wnh.services",[]).factory("Utils",[function(){return{heroesList:{multi:{id:"multi",name:"Multiple heroes"},genji:{id:"genji",name:"Genji"},mccree:{id:"mccree",name:"Mccree"},pharah:{id:"pharah",name:"Pharah"},reaper:{id:"reaper",name:"Reaper"},soldier76:{id:"soldier76",name:"Soldier: 76"},tracer:{id:"tracer",name:"Tracer"},bastion:{id:"bastion",name:"Bastion"},hanzo:{id:"hanzo",name:"Hanzo"},junkrat:{id:"junkrat",name:"Junkrat"},mei:{id:"mei",name:"Mei"},torbjorn:{id:"torbjorn",name:"Torbjörn"},widowmaker:{id:"widowmaker",name:"Widowmaker"},dva:{id:"dva",name:"D.VA"},reinhardt:{id:"reinhardt",name:"Reinhardt"},roadhog:{id:"roadhog",name:"Roadhog"},winston:{id:"winston",name:"Winston"},zarya:{id:"zarya",name:"Zarya"},lucio:{id:"lucio",name:"Lúcio"},mercy:{id:"mercy",name:"Mercy"},symmetra:{id:"symmetra",name:"Symmetra"},zenyatta:{id:"zenyatta",name:"Zenyatta"}},itemsPerPage:5,overallLimit:300}}]).factory("YoutubePlayers",[function(){var e=[];return{registerPlayer:function(t){e.push(t)},pauseAllPlayers:function(t){e.forEach(function(e){e.id!==t.id&&1===e.getPlayerState()&&e.pauseVideo()})}}}]).factory("Youtube",["$http",function(e){var t="AIzaSyAyY4cymf3FIT7lOGltKv1WthHZlR7npkI",n="https://www.googleapis.com/youtube/v3/";return{getVideoInfo:function(o){return e({method:"GET",url:n+"videos?id="+o+"&key="+t+"&fields=items(id,snippet(title,thumbnails))&part=snippet"})}}}]).factory("Auth",["$rootScope","$firebaseAuth",function(e,t){var n=t(),o=null;return n.$onAuthStateChanged(function(t){o=t,e.$broadcast("authChanged",t)}),{logout:function(){return n.$signOut()},getUser:function(){return o},providerLogin:function(e){var t=new firebase.auth[e+"AuthProvider"];return"Facebook"===e?n.$signInWithRedirect(t):n.$signInWithPopup(t)}}}]).factory("Dialogs",["$mdDialog","Auth",function(e,t){return{showLoginDialog:function(t){var n=this;e.show({controller:["$scope","$mdDialog","Auth","Database",function(e,t,o,a){e.hide=function(){t.hide()},e.login=function(e){o.providerLogin(e).then(function(e){t.hide(),a.getProfile(e.user.uid).then(function(e){var t=e.val();(!t||t&&!t.onboarding)&&n.showOnboardingDialog()})})["catch"](function(e){})}}],templateUrl:"./views/dialogs/loginDialog.html",parent:angular.element(document.body),targetEvent:t,clickOutsideToClose:!0}).then(function(e){},function(){})},showOnboardingDialog:function(n){e.show({controller:["$scope","$mdDialog","Database",function(e,n,o){e.onboard=function(){o.saveProfile({name:e.onboarding.displayName,battletag:e.onboarding.battleTag,picture:t.getUser().photoURL,onboarding:!0}),n.hide()}}],templateUrl:"./views/dialogs/onboardingDialog.html",parent:angular.element(document.body),targetEvent:n,clickOutsideToClose:!1}).then(function(e){},function(){})},showPostDialog:function(n){t.getUser()?e.show({controller:["$scope","$mdDialog","Utils","Youtube","$mdToast","Database",function(e,t,n,o,a,r){e.heroesList=n.heroesList,e.invalidId=!1,e.newPost={videoLink:"",hero:""},e.videoLinkChange=function(){e.invalidId=!1},e.post=function(){if(e.newPost.videoLink&&e.newPost.hero){var n=e.newPost.videoLink.match(/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/i),i=null;i=n&&11===n[1].length?n[1]:e.newPost.videoLink,i&&11===i.length?o.getVideoInfo(i).then(function(n){if(n.data.items.length){var o={youtubeId:i,hero:e.newPost.hero};e.newPost.description&&(o.description=e.newPost.description),r.newPost(o),t.hide()}else e.invalidId=!0},function(e){a.show(a.simple().textContent("Error, please try again later").hideDelay(3e3))}):e.invalidId=!0}},e.hide=function(){t.hide()}}],templateUrl:"./views/dialogs/postDialog.html",parent:angular.element(document.body),targetEvent:n,clickOutsideToClose:!0}).then(function(e){},function(){}):this.showLoginDialog()}}}]).factory("Database",["Auth","Utils",function(e,t){var n=firebase.database();return{getProfile:function(e){return n.ref("profile/"+e).once("value")},saveProfile:function(t){e.getUser()&&n.ref("profile/"+e.getUser().uid).update(t)},newPost:function(t){if(e.getUser()){t.userId=e.getUser().uid,t.votesCount=0,t.postedAt=firebase.database.ServerValue.TIMESTAMP;var o=n.ref("posts").push();o.set(t).then(function(t){n.ref("profile/"+e.getUser().uid+"/posts/"+o.key).set(!0)})}},vote:function(t,o){if(e.getUser())return n.ref("posts/"+t+"/votesCount").once("value").then(function(a){var r={};return o?(r["posts/"+t+"/votesCount"]=a.val()-1,r["votes/"+t+"/"+e.getUser().uid]=null):(r["posts/"+t+"/votesCount"]=a.val()+1,r["votes/"+t+"/"+e.getUser().uid]=firebase.database.ServerValue.TIMESTAMP),n.ref().update(r)})},hasVote:function(t){if(e.getUser())return n.ref("votes/"+t+"/"+e.getUser().uid).once("value")},getPlayof:function(e){var o=n.ref("posts"),a=0,r=moment().valueOf();return"all"===e?o.orderByChild("votesCount").limitToLast(t.overallLimit):("day"===e?a=moment().subtract(1,"days").valueOf():"week"===e&&(a=moment().subtract(7,"days").valueOf()),o.orderByChild("postedAt").startAt(a).endAt(r))}}}]),angular.module("wnh.main",["ngRoute","wnh.services"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"../../views/main.html",controller:"MainCtrl"})}]).controller("MainCtrl",["$rootScope","$scope","Auth","Database","Utils","Dialogs",function(e,t,n,o,a,r){var i=function(e){for(var n=0;n<t.timeframes.length;n++)if(t.timeframes[n].filter===e)return t.timeframes[n].title},u=function(){t.page++,t.limit=t.page*a.itemsPerPage},l=function(){t.page=1,t.limit=t.page*a.itemsPerPage};l(),t.dialogs=r,t.currentUser=null,t.playofList=[],t.timeframes=[{filter:"week",title:"Last 7 days"},{filter:"day",title:"Last day"},{filter:"all",title:"Overall"}],t.heroes=a.heroesList,t.currentTimeframe="week",t.currentHero="",t.currentTimeframeName="Last 7 days",t.logout=function(){n.logout()},t.openMenu=function(e,t){e(t)},t.timeframeFilter=function(e){t.currentTimeframe=e,t.currentTimeframeName=i(e)},t.heroFilter=function(e){t.currentHero=e},t.showMore=function(){u()},t.$watch("currentTimeframe",function(e,n){l(),t.playofList=[],o.getPlayof(t.currentTimeframe).on("child_added",function(e){var n=e.val();n.key=e.key,t.$apply(function(){t.playofList.push(n)})})}),e.$on("authChanged",function(e,n){t.currentUser=n})}]),function(e,t,n,o,a,r,i){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,r=t.createElement(n),i=t.getElementsByTagName(n)[0],r.async=1,r.src=o,i.parentNode.insertBefore(r,i)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-7759211-12","auto"),ga("send","pageview");