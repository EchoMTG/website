/*! jQuery UI - v1.9.2 - 2021-05-12
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.position.js, jquery.ui.tooltip.js */
!function(u,a){var e,t,i=0,n=/^ui-id-\d+$/;function s(t,e){var i,n,s=t.nodeName.toLowerCase();return"area"===s?(n=(i=t.parentNode).name,!(!t.href||!n||"map"!==i.nodeName.toLowerCase())&&(!!(n=u("img[usemap=#"+n+"]")[0])&&r(n))):(/input|select|textarea|button|object/.test(s)?!t.disabled:"a"===s&&t.href||e)&&r(t)}function r(t){return u.expr.filters.visible(t)&&!u(t).parents().andSelf().filter(function(){return"hidden"===u.css(this,"visibility")}).length}u.ui=u.ui||{},u.ui.version||(u.extend(u.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),u.fn.extend({_focus:u.fn.focus,focus:function(e,i){return"number"==typeof e?this.each(function(){var t=this;setTimeout(function(){u(t).focus(),i&&i.call(t)},e)}):this._focus.apply(this,arguments)},scrollParent:function(){var t=(u.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(u.css(this,"position"))&&/(auto|scroll)/.test(u.css(this,"overflow")+u.css(this,"overflow-y")+u.css(this,"overflow-x"))}):this.parents().filter(function(){return/(auto|scroll)/.test(u.css(this,"overflow")+u.css(this,"overflow-y")+u.css(this,"overflow-x"))})).eq(0);return/fixed/.test(this.css("position"))||!t.length?u(document):t},zIndex:function(t){if(t!==a)return this.css("zIndex",t);if(this.length)for(var e,i,n=u(this[0]);n.length&&n[0]!==document;){if(("absolute"===(e=n.css("position"))||"relative"===e||"fixed"===e)&&(i=parseInt(n.css("zIndex"),10),!isNaN(i)&&0!==i))return i;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++i)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&u(this).removeAttr("id")})}}),u.extend(u.expr[":"],{data:u.expr.createPseudo?u.expr.createPseudo(function(e){return function(t){return!!u.data(t,e)}}):function(t,e,i){return!!u.data(t,i[3])},focusable:function(t){return s(t,!isNaN(u.attr(t,"tabindex")))},tabbable:function(t){var e=u.attr(t,"tabindex"),i=isNaN(e);return(i||0<=e)&&s(t,!i)}}),u(function(){var t=document.body,e=t.appendChild(document.createElement("div"));e.offsetHeight,u.extend(e.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),u.support.minHeight=100===e.offsetHeight,u.support.selectstart="onselectstart"in e,t.removeChild(e).style.display="none"}),u("<a>").outerWidth(1).jquery||u.each(["Width","Height"],function(t,i){var s="Width"===i?["Left","Right"]:["Top","Bottom"],n=i.toLowerCase(),r={innerWidth:u.fn.innerWidth,innerHeight:u.fn.innerHeight,outerWidth:u.fn.outerWidth,outerHeight:u.fn.outerHeight};function o(t,e,i,n){return u.each(s,function(){e-=parseFloat(u.css(t,"padding"+this))||0,i&&(e-=parseFloat(u.css(t,"border"+this+"Width"))||0),n&&(e-=parseFloat(u.css(t,"margin"+this))||0)}),e}u.fn["inner"+i]=function(t){return t===a?r["inner"+i].call(this):this.each(function(){u(this).css(n,o(this,t)+"px")})},u.fn["outer"+i]=function(t,e){return"number"!=typeof t?r["outer"+i].call(this,t):this.each(function(){u(this).css(n,o(this,t,!0,e)+"px")})}}),u("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(u.fn.removeData=(e=u.fn.removeData,function(t){return arguments.length?e.call(this,u.camelCase(t)):e.call(this)})),t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[],u.ui.ie=!!t.length,u.ui.ie6=6===parseFloat(t[1],10),u.fn.extend({disableSelection:function(){return this.bind((u.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),u.extend(u.ui,{plugin:{add:function(t,e,i){var n,s=u.ui[t].prototype;for(n in i)s.plugins[n]=s.plugins[n]||[],s.plugins[n].push([e,i[n]])},call:function(t,e,i){var n,s=t.plugins[e];if(s&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(n=0;n<s.length;n++)t.options[s[n][0]]&&s[n][1].apply(t.element,i)}},contains:u.contains,hasScroll:function(t,e){if("hidden"===u(t).css("overflow"))return!1;var i=e&&"left"===e?"scrollLeft":"scrollTop",e=!1;return 0<t[i]||(t[i]=1,e=0<t[i],t[i]=0,e)},isOverAxis:function(t,e,i){return e<t&&t<e+i},isOver:function(t,e,i,n,s,r){return u.ui.isOverAxis(t,i,s)&&u.ui.isOverAxis(e,n,r)}}))}(jQuery);!function(u,r){var i=0,d=Array.prototype.slice,n=u.cleanData;u.cleanData=function(t){for(var e,i=0;null!=(e=t[i]);i++)try{u(e).triggerHandler("remove")}catch(t){}n(t)},u.widget=function(t,i,a){var e,n,s,o,r=t.split(".")[0];t=t.split(".")[1],e=r+"-"+t,a||(a=i,i=u.Widget),u.expr[":"][e.toLowerCase()]=function(t){return!!u.data(t,e)},u[r]=u[r]||{},n=u[r][t],s=u[r][t]=function(t,e){if(!this._createWidget)return new s(t,e);arguments.length&&this._createWidget(t,e)},u.extend(s,n,{version:a.version,_proto:u.extend({},a),_childConstructors:[]}),(o=new i).options=u.widget.extend({},o.options),u.each(a,function(e,n){function s(){return i.prototype[e].apply(this,arguments)}function o(t){return i.prototype[e].apply(this,t)}u.isFunction(n)&&(a[e]=function(){var t,e=this._super,i=this._superApply;return this._super=s,this._superApply=o,t=n.apply(this,arguments),this._super=e,this._superApply=i,t})}),s.prototype=u.widget.extend(o,{widgetEventPrefix:n?o.widgetEventPrefix:t},a,{constructor:s,namespace:r,widgetName:t,widgetBaseClass:e,widgetFullName:e}),n?(u.each(n._childConstructors,function(t,e){var i=e.prototype;u.widget(i.namespace+"."+i.widgetName,s,e._proto)}),delete n._childConstructors):i._childConstructors.push(s),u.widget.bridge(t,s)},u.widget.extend=function(t){for(var e,i,n=d.call(arguments,1),s=0,o=n.length;s<o;s++)for(e in n[s])i=n[s][e],n[s].hasOwnProperty(e)&&i!==r&&(u.isPlainObject(i)?t[e]=u.isPlainObject(t[e])?u.widget.extend({},t[e],i):u.widget.extend({},i):t[e]=i);return t},u.widget.bridge=function(o,e){var a=e.prototype.widgetFullName||o;u.fn[o]=function(i){var t="string"==typeof i,n=d.call(arguments,1),s=this;return i=!t&&n.length?u.widget.extend.apply(null,[i].concat(n)):i,t?this.each(function(){var t,e=u.data(this,a);return e?u.isFunction(e[i])&&"_"!==i.charAt(0)?(t=e[i].apply(e,n))!==e&&t!==r?(s=t&&t.jquery?s.pushStack(t.get()):t,!1):void 0:u.error("no such method '"+i+"' for "+o+" widget instance"):u.error("cannot call methods on "+o+" prior to initialization; attempted to call method '"+i+"'")}):this.each(function(){var t=u.data(this,a);t?t.option(i||{})._init():u.data(this,a,new e(i,this))}),s}},u.Widget=function(){},u.Widget._childConstructors=[],u.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,e){e=u(e||this.defaultElement||this)[0],this.element=u(e),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=u.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=u(),this.hoverable=u(),this.focusable=u(),e!==this&&(u.data(e,this.widgetName,this),u.data(e,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===e&&this.destroy()}}),this.document=u(e.style?e.ownerDocument:e.document||e),this.window=u(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:u.noop,_getCreateEventData:u.noop,_create:u.noop,_init:u.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(u.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:u.noop,widget:function(){return this.element},option:function(t,e){var i,n,s,o=t;if(0===arguments.length)return u.widget.extend({},this.options);if("string"==typeof t)if(o={},t=(i=t.split(".")).shift(),i.length){for(n=o[t]=u.widget.extend({},this.options[t]),s=0;s<i.length-1;s++)n[i[s]]=n[i[s]]||{},n=n[i[s]];if(t=i.pop(),e===r)return n[t]===r?null:n[t];n[t]=e}else{if(e===r)return this.options[t]===r?null:this.options[t];o[t]=e}return this._setOptions(o),this},_setOptions:function(t){for(var e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(s,o,t){var a,r=this;"boolean"!=typeof s&&(t=o,o=s,s=!1),t?(o=a=u(o),this.bindings=this.bindings.add(o)):(t=o,o=this.element,a=this.widget()),u.each(t,function(t,e){function i(){if(s||!0!==r.options.disabled&&!u(this).hasClass("ui-state-disabled"))return("string"==typeof e?r[e]:e).apply(r,arguments)}"string"!=typeof e&&(i.guid=e.guid=e.guid||i.guid||u.guid++);var n=t.match(/^(\w+)\s*(.*)$/),t=n[1]+r.eventNamespace,n=n[2];n?a.delegate(n,t,i):o.bind(t,i)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){var i=this;return setTimeout(function(){return("string"==typeof t?i[t]:t).apply(i,arguments)},e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){u(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){u(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){u(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){u(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,e,i){var n,s,o=this.options[t];if(i=i||{},(e=u.Event(e)).type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],s=e.originalEvent)for(n in s)n in e||(e[n]=s[n]);return this.element.trigger(e,i),!(u.isFunction(o)&&!1===o.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},u.each({show:"fadeIn",hide:"fadeOut"},function(o,a){u.Widget.prototype["_"+o]=function(e,t,i){"string"==typeof t&&(t={effect:t});var n,s=t?!0!==t&&"number"!=typeof t&&t.effect||a:o;"number"==typeof(t=t||{})&&(t={duration:t}),n=!u.isEmptyObject(t),t.complete=i,t.delay&&e.delay(t.delay),n&&u.effects&&(u.effects.effect[s]||!1!==u.uiBackCompat&&u.effects[s])?e[o](t):s!==o&&e[s]?e[s](t.duration,t.easing,i):e.queue(function(t){u(this)[o](),i&&i.call(e[0]),t()})}}),!1!==u.uiBackCompat&&(u.Widget.prototype._getCreateOptions=function(){return u.metadata&&u.metadata.get(this.element[0])[this.widgetName]})}(jQuery);!function(x,o){x.ui=x.ui||{};var n,l,s,H=Math.max,T=Math.abs,L=Math.round,f=/left|center|right/,r=/top|center|bottom/,h=/[\+\-]\d+%?/,p=/^\w+/,c=/%$/,i=x.fn.position;function I(t,i,e){return[parseInt(t[0],10)*(c.test(t[0])?i/100:1),parseInt(t[1],10)*(c.test(t[1])?e/100:1)]}function P(t,i){return parseInt(x.css(t,i),10)||0}x.position={scrollbarWidth:function(){if(n!==o)return n;var t,i=x("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),e=i.children()[0];return x("body").append(i),t=e.offsetWidth,i.css("overflow","scroll"),t===(e=e.offsetWidth)&&(e=i[0].clientWidth),i.remove(),n=t-e},getScrollInfo:function(t){var i=t.isWindow?"":t.element.css("overflow-x"),e=t.isWindow?"":t.element.css("overflow-y"),i="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,t="scroll"===e||"auto"===e&&t.height<t.element[0].scrollHeight;return{width:i?x.position.scrollbarWidth():0,height:t?x.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=x(t||window),t=x.isWindow(i[0]);return{element:i,isWindow:t,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:t?i.width():i.outerWidth(),height:t?i.height():i.outerHeight()}}},x.fn.position=function(c){if(!c||!c.of)return i.apply(this,arguments);c=x.extend({},c);var a,d,g,m=x(c.of),u=x.position.getWithinInfo(c.within),w=x.position.getScrollInfo(u),t=m[0],W=(c.collision||"flip").split(" "),v={},y=9===t.nodeType?(d=m.width(),g=m.height(),{top:0,left:0}):x.isWindow(t)?(d=m.width(),g=m.height(),{top:m.scrollTop(),left:m.scrollLeft()}):t.preventDefault?(c.at="left top",d=g=0,{top:t.pageY,left:t.pageX}):(d=m.outerWidth(),g=m.outerHeight(),m.offset()),b=x.extend({},y);return x.each(["my","at"],function(){var t,i,e=(c[this]||"").split(" ");1===e.length&&(e=f.test(e[0])?e.concat(["center"]):r.test(e[0])?["center"].concat(e):["center","center"]),e[0]=f.test(e[0])?e[0]:"center",e[1]=r.test(e[1])?e[1]:"center",t=h.exec(e[0]),i=h.exec(e[1]),v[this]=[t?t[0]:0,i?i[0]:0],c[this]=[p.exec(e[0])[0],p.exec(e[1])[0]]}),1===W.length&&(W[1]=W[0]),"right"===c.at[0]?b.left+=d:"center"===c.at[0]&&(b.left+=d/2),"bottom"===c.at[1]?b.top+=g:"center"===c.at[1]&&(b.top+=g/2),a=I(v.at,d,g),b.left+=a[0],b.top+=a[1],this.each(function(){var e,t,s=x(this),f=s.outerWidth(),r=s.outerHeight(),i=P(this,"marginLeft"),o=P(this,"marginTop"),n=f+i+P(this,"marginRight")+w.width,l=r+o+P(this,"marginBottom")+w.height,h=x.extend({},b),p=I(v.my,s.outerWidth(),s.outerHeight());"right"===c.my[0]?h.left-=f:"center"===c.my[0]&&(h.left-=f/2),"bottom"===c.my[1]?h.top-=r:"center"===c.my[1]&&(h.top-=r/2),h.left+=p[0],h.top+=p[1],x.support.offsetFractions||(h.left=L(h.left),h.top=L(h.top)),e={marginLeft:i,marginTop:o},x.each(["left","top"],function(t,i){x.ui.position[W[t]]&&x.ui.position[W[t]][i](h,{targetWidth:d,targetHeight:g,elemWidth:f,elemHeight:r,collisionPosition:e,collisionWidth:n,collisionHeight:l,offset:[a[0]+p[0],a[1]+p[1]],my:c.my,at:c.at,within:u,elem:s})}),x.fn.bgiframe&&s.bgiframe(),c.using&&(t=function(t){var i=y.left-h.left,e=i+d-f,o=y.top-h.top,n=o+g-r,l={target:{element:m,left:y.left,top:y.top,width:d,height:g},element:{element:s,left:h.left,top:h.top,width:f,height:r},horizontal:e<0?"left":0<i?"right":"center",vertical:n<0?"top":0<o?"bottom":"middle"};d<f&&T(i+e)<d&&(l.horizontal="center"),g<r&&T(o+n)<g&&(l.vertical="middle"),H(T(i),T(e))>H(T(o),T(n))?l.important="horizontal":l.important="vertical",c.using.call(this,t,l)}),s.offset(x.extend(h,{using:t}))})},x.ui.position={fit:{left:function(t,i){var e=i.within,o=e.isWindow?e.scrollLeft:e.offset.left,n=e.width,l=t.left-i.collisionPosition.marginLeft,s=o-l,f=l+i.collisionWidth-n-o;i.collisionWidth>n?0<s&&f<=0?(e=t.left+s+i.collisionWidth-n-o,t.left+=s-e):t.left=!(0<f&&s<=0)&&f<s?o+n-i.collisionWidth:o:0<s?t.left+=s:0<f?t.left-=f:t.left=H(t.left-l,t.left)},top:function(t,i){var e=i.within,o=e.isWindow?e.scrollTop:e.offset.top,n=i.within.height,l=t.top-i.collisionPosition.marginTop,s=o-l,f=l+i.collisionHeight-n-o;i.collisionHeight>n?0<s&&f<=0?(e=t.top+s+i.collisionHeight-n-o,t.top+=s-e):t.top=!(0<f&&s<=0)&&f<s?o+n-i.collisionHeight:o:0<s?t.top+=s:0<f?t.top-=f:t.top=H(t.top-l,t.top)}},flip:{left:function(t,i){var e=i.within,o=e.offset.left+e.scrollLeft,n=e.width,l=e.isWindow?e.scrollLeft:e.offset.left,s=t.left-i.collisionPosition.marginLeft,f=s-l,r=s+i.collisionWidth-n-l,h="left"===i.my[0]?-i.elemWidth:"right"===i.my[0]?i.elemWidth:0,e="left"===i.at[0]?i.targetWidth:"right"===i.at[0]?-i.targetWidth:0,s=-2*i.offset[0];f<0?((o=t.left+h+e+s+i.collisionWidth-n-o)<0||o<T(f))&&(t.left+=h+e+s):0<r&&(0<(l=t.left-i.collisionPosition.marginLeft+h+e+s-l)||T(l)<r)&&(t.left+=h+e+s)},top:function(t,i){var e=i.within,o=e.offset.top+e.scrollTop,n=e.height,l=e.isWindow?e.scrollTop:e.offset.top,s=t.top-i.collisionPosition.marginTop,f=s-l,r=s+i.collisionHeight-n-l,h="top"===i.my[1]?-i.elemHeight:"bottom"===i.my[1]?i.elemHeight:0,e="top"===i.at[1]?i.targetHeight:"bottom"===i.at[1]?-i.targetHeight:0,s=-2*i.offset[1];f<0?(o=t.top+h+e+s+i.collisionHeight-n-o,t.top+h+e+s>f&&(o<0||o<T(f))&&(t.top+=h+e+s)):0<r&&(l=t.top-i.collisionPosition.marginTop+h+e+s-l,t.top+h+e+s>r&&(0<l||T(l)<r)&&(t.top+=h+e+s))}},flipfit:{left:function(){x.ui.position.flip.left.apply(this,arguments),x.ui.position.fit.left.apply(this,arguments)},top:function(){x.ui.position.flip.top.apply(this,arguments),x.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i=document.getElementsByTagName("body")[0],e=document.createElement("div"),o=document.createElement(i?"div":"body"),n={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(t in i&&x.extend(n,{position:"absolute",left:"-1000px",top:"-1000px"}),n)o.style[t]=n[t];o.appendChild(e),(i=i||document.documentElement).insertBefore(o,i.firstChild),e.style.cssText="position: absolute; left: 10.7432222px;",e=x(e).offset().left,x.support.offsetFractions=10<e&&e<11,o.innerHTML="",i.removeChild(o)}(),!1!==x.uiBackCompat&&(l=jQuery,s=l.fn.position,l.fn.position=function(t){if(!t||!t.offset)return s.call(this,t);var i=t.offset.split(" "),e=t.at.split(" ");return 1===i.length&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),1===e.length&&(/left|center|right/.test(e[0])?e[1]="center":(e[1]=e[0],e[0]="center")),s.call(this,l.extend(t,{at:e[0]+i[0]+" "+e[1]+i[1],offset:o}))})}(jQuery);!function(u){var o=0;u.widget("ui.tooltip",{version:"1.9.2",options:{content:function(){return u(this).attr("title")},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(t,i){var e=this;if("disabled"===t)return this[i?"_disable":"_enable"](),void(this.options[t]=i);this._super(t,i),"content"===t&&u.each(this.tooltips,function(t,i){e._updateContent(i)})},_disable:function(){var o=this;u.each(this.tooltips,function(t,i){var e=u.Event("blur");e.target=e.currentTarget=i[0],o.close(e,!0)}),this.element.find(this.options.items).andSelf().each(function(){var t=u(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).andSelf().each(function(){var t=u(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var e=this,i=u(t?t.target:this.element).closest(this.options.items);i.length&&!i.data("ui-tooltip-id")&&(i.attr("title")&&i.data("ui-tooltip-title",i.attr("title")),i.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&i.parents().each(function(){var t,i=u(this);i.data("ui-tooltip-open")&&((t=u.Event("blur")).target=t.currentTarget=this,e.close(t,!0)),i.attr("title")&&(i.uniqueId(),e.parents[this.id]={element:this,title:i.attr("title")},i.attr("title",""))}),this._updateContent(i,t))},_updateContent:function(i,e){var t=this.options.content,o=this,n=e?e.type:null;if("string"==typeof t)return this._open(e,i,t);(t=t.call(i[0],function(t){i.data("ui-tooltip-open")&&o._delay(function(){e&&(e.type=n),this._open(e,i,t)})}))&&this._open(e,i,t)},_open:function(t,i,e){var o,n,s,l,a,r=u.extend({},this.options.position);function p(t){r.of=t,a.is(":hidden")||a.position(r)}e&&((a=this._find(i)).length?a.find(".ui-tooltip-content").html(e):(i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),n=i,s=a.attr("id"),(l=(n.attr("aria-describedby")||"").split(/\s+/)).push(s),n.data("ui-tooltip-id",s).attr("aria-describedby",u.trim(l.join(" "))),a.find(".ui-tooltip-content").html(e),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:p}),p(t)):a.position(u.extend({of:i},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.show&&this.options.show.delay&&(o=setInterval(function(){a.is(":visible")&&(p(r.of),clearInterval(o))},u.fx.interval)),this._trigger("open",t,{tooltip:a}),e={keyup:function(t){t.keyCode===u.ui.keyCode.ESCAPE&&((t=u.Event(t)).currentTarget=i[0],this.close(t,!0))},remove:function(){this._removeTooltip(a)}},t&&"mouseover"!==t.type||(e.mouseleave="close"),t&&"focusin"!==t.type||(e.focusout="close"),this._on(!0,i,e)))},close:function(t){var i,e,o,n=this,s=u(t?t.currentTarget:this.element),l=this._find(s);this.closing||(s.data("ui-tooltip-title")&&s.attr("title",s.data("ui-tooltip-title")),e=(i=s).data("ui-tooltip-id"),o=(i.attr("aria-describedby")||"").split(/\s+/),-1!==(e=u.inArray(e,o))&&o.splice(e,1),i.removeData("ui-tooltip-id"),(o=u.trim(o.join(" ")))?i.attr("aria-describedby",o):i.removeAttr("aria-describedby"),l.stop(!0),this._hide(l,this.options.hide,function(){n._removeTooltip(u(this))}),s.removeData("ui-tooltip-open"),this._off(s,"mouseleave focusout keyup"),s[0]!==this.element[0]&&this._off(s,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&u.each(this.parents,function(t,i){u(i.element).attr("title",i.title),delete n.parents[t]}),this.closing=!0,this._trigger("close",t,{tooltip:l}),this.closing=!1)},_tooltip:function(t){var i="ui-tooltip-"+o++,e=u("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return u("<div>").addClass("ui-tooltip-content").appendTo(e),e.appendTo(this.document[0].body),u.fn.bgiframe&&e.bgiframe(),this.tooltips[i]=t,e},_find:function(t){t=t.data("ui-tooltip-id");return t?u("#"+t):u()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var o=this;u.each(this.tooltips,function(t,i){var e=u.Event("blur");e.target=e.currentTarget=i[0],o.close(e,!0),u("#"+t).remove(),i.data("ui-tooltip-title")&&(i.attr("title",i.data("ui-tooltip-title")),i.removeData("ui-tooltip-title"))})}})}(jQuery);