(function(e,t){"use strict";var n=e.Widget.prototype;e.widget("rs.carousel",{version:"1.0.2",options:{mask:"> div",runner:"> ul",items:"> li",itemsPerTransition:"auto",orientation:"horizontal",loop:!1,whitespace:!1,nextPrevActions:!0,insertPrevAction:function(){return e('<a href="#" class="rs-carousel-action rs-carousel-action-prev">Prev</a>').appendTo(this)},insertNextAction:function(){return e('<a href="#" class="rs-carousel-action rs-carousel-action-next">Next</a>').appendTo(this)},pagination:!0,insertPagination:function(t){return e(t).insertAfter(e(this).find(".rs-carousel-mask"))},speed:"normal",easing:"swing",fx:"slide",translate3d:!1,create:null,before:null,after:null},_create:function(){this.widgetFullName=this.widgetFullName||this.widgetBaseClass,this.eventNamespace=this.eventNamespace||"."+this.widgetName,this.index=0,this._elements(),this._setIsHorizontal(),this._addMask(),this._addNextPrevActions(),this.refresh(!1);return},_elements:function(){var e=this.elements={},t=this.widgetFullName;this.element.addClass(t),e.mask=this.element.find(this.options.mask).addClass(t+"-mask"),e.runner=(e.mask.length?e.mask:this.element).find(this.options.runner).addClass(t+"-runner"),e.items=e.runner.find(this.options.items).addClass(t+"-item");return},_setIsHorizontal:function(){var e=this.elements,t=this.widgetFullName;this.element.removeClass(t+"-horizontal").removeClass(t+"-vertical"),this.options.orientation==="horizontal"?(this.isHorizontal=!0,this.element.addClass(t+"-horizontal"),e.runner.css("top","")):(this.isHorizontal=!1,this.element.addClass(t+"-vertical"),e.runner.css("left",""));return},_addMask:function(){var e=this.elements;if(e.mask.length)return;e.mask=e.runner.wrap('<div class="'+this.widgetFullName+'-mask" />').parent(),this.maskAdded=!0;return},_addNextPrevActions:function(){if(!this.options.nextPrevActions)return;var e=this,t=this.elements,n=this.options,r=this.eventNamespace;this._removeNextPrevActions(),t.prevAction=n.insertPrevAction.apply(this.element[0]).bind("click"+r,function(t){t.preventDefault(),e.prev()}),t.nextAction=n.insertNextAction.apply(this.element[0]).bind("click"+r,function(t){t.preventDefault(),e.next()});return},_removeNextPrevActions:function(){var e=this.elements;e.nextAction&&(e.nextAction.remove(),e.nextAction=t),e.prevAction&&(e.prevAction.remove(),e.prevAction=t);return},refresh:function(e){e!==!1&&this._recacheItems(),this._setPages(),this._addPagination(),this._setRunnerWidth(),this.index=this._makeValid(this.index),this.goToPage(this.index,!1,t,!0),this._checkDisabled();return},_recacheItems:function(){this.elements.items=this.elements.runner.find(this.options.items).addClass(this.widgetFullName+"-item");return},_setPages:function(){var e=this,n=0,r=isNaN(this.options.itemsPerTransition)?t:this._getLastItemIndex(),i;this.pages=[];while(n<this.getNoOfItems())if(isNaN(this.options.itemsPerTransition))this.pages.push(e._getVisibleItems(n)),n+=this.pages[this.pages.length-1].length;else{if(n>=r){this.pages.push(this.elements.items.slice(n));break}i=n,n+=parseInt(this.options.itemsPerTransition,10),this.pages.push(this.elements.items.slice(i,n))}return},_getLastItemIndex:function(){if(this.options.whitespace)return;return this.elements.items.index(this._getVisibleItems(0,!0).last())},_getVisibleItems:function(t,n){var r=this,i=[],s=n?[].reverse.apply(e(this.elements.items)).slice(t):this.elements.items.slice(t),o=this._getMaskDim(),u=0;return s.each(function(){u+=r.isHorizontal?e(this).outerWidth(!0):e(this).outerHeight(!0);if(u>o)return i.length===0&&i.push(this),!1;i.push(this)}),e(i)},_getMaskDim:function(){return this.elements.mask[this.isHorizontal?"width":"height"]()},getNoOfItems:function(){return this.elements.items.length},_addPagination:function(){if(!this.options.pagination)return;var t=this,n=this.widgetFullName,r=e('<ol class="'+n+'-pagination" />'),i=[],s=this.getNoOfPages(),o;this._removePagination();for(o=0;o<s;o++)i[o]='<li class="'+n+'-pagination-link"><a href="#page-'+o+'">'+(o+1)+"</a></li>";r.append(i.join("")).delegate("a","click"+this.eventNamespace,function(e){e.preventDefault(),t.goToPage(parseInt(this.hash.split("-")[1],10))}),this.elements.pagination=this.options.insertPagination.call(this.element[0],r);return},_removePagination:function(){this.elements.pagination&&(this.elements.pagination.remove(),this.elements.pagination=t);return},getNoOfPages:function(){return this.pages.length},_checkDisabled:function(){this.getNoOfPages()<=1?(this.disable(),this._disabled=!0):this._disabled&&(this.enable(),this._disabled=!1);return},_setRunnerWidth:function(){var t=this.elements,n=0;t.runner.width("");if(!this.isHorizontal)return;t.runner.width(function(){return t.items.each(function(){n+=e(this).outerWidth(!0)}),n});return},next:function(e){var t=this.index+1;this.options.loop&&t>=this.getNoOfPages()&&(t=0),this.goToPage(t,e,"carousel:next");return},prev:function(e){var t=this.index-1;this.options.loop&&t<0&&(t=this.getNoOfPages()-1),this.goToPage(t,e,"carousel:prev");return},goToPage:function(t,n,r,i){n=n===!1?!1:!0,!this.options.disabled&&this._isValid(t)&&(this.prevIndex=this.index,this.index=t,this["_"+this.options.fx](e.Event(r?r:"carousel:gotopage",{animate:n,speed:n?this.options.speed:0}),i)),this._updateUi();return},goToItem:function(t,n){var r,i,s,o;isNaN(t)||(t=this.elements.items.eq(t)),t.jquery&&(t=t[0]);e:for(r=0,i=this.getNoOfPages();r<i;r++)for(s=0,o=this.getPage(r).length;s<o;s++)if(this.getPage(r)[s]===t)break e;return this.goToPage(r,n),e(t)},_isValid:function(e){return e<this.getNoOfPages()&&e>=0?!0:!1},_makeValid:function(e){return e<0?e=0:e>=this.getNoOfPages()&&(e=this.getNoOfPages()-1),e},_slide:function(e,t){var n=this,r={},i=this._getAbsoluteLastPos(),s=this.getPage(),o=s.first().position()[this.isHorizontal?"left":"top"],u=this.eventNamespace,a=this.widgetFullName,f;if(!t&&!this._trigger("before",e,this._getEventData())){this.index=this.prevIndex;return}o>i&&(o=i),this.options.translate3d?(f=["transitionend"+u,"webkitTransitionEnd"+u,"oTransitionEnd"+u],e.animate&&this.element.addClass(a+"-transition"),this.elements.runner.unbind(f.join(" ")).on(f.join(" "),function(){n.element.removeClass(a+"-transition"),t||n._trigger("after",e,n._getEventData())}).css("transform","translate3d("+(this.isHorizontal?-Math.round(o)+"px, 0, 0":"0, "+-Math.round(o)+"px, 0")+")"),e.animate||(this.element.removeClass(a+"-transition"),t||this._trigger("after",e,this._getEventData()))):(r[this.isHorizontal?"left":"top"]=-o,this.elements.runner.stop().animate(r,e.speed,this.options.easing,function(){t||n._trigger("after",e,n._getEventData())}));return},_getAbsoluteLastPos:function(){if(this.options.whitespace)return;var e,n=this.elements.items.eq(this.getNoOfItems()-1),r=n.position()[this.isHorizontal?"left":"top"],i=n[this.isHorizontal?"outerWidth":"outerHeight"](!0);return e=r+i-this._getMaskDim(),e<0?t:e},getPage:function(t){return this.pages[typeof t!="undefined"?t:this.index]||e([])},getPages:function(){return this.pages},_getEventData:function(){return{page:this.getPage(),prevPage:this.getPage(this.prevIndex),elements:this.elements}},_getCreateEventData:function(){return this._getEventData()},_updateUi:function(){this._updateActiveItems(),this.options.pagination&&this._updatePagination(),this.options.nextPrevActions&&this._updateNextPrevActions();return},_updateActiveItems:function(){var e=this.widgetFullName,t=e+"-item-active";this.elements.items.removeClass(t),this.getPage().addClass(t);return},_updatePagination:function(){var e=this.widgetFullName,t=e+"-pagination-link-active",n=e+"-pagination-disabled",r=this.elements.pagination.removeClass(n);this.options.disabled&&r.addClass(n),r.children("."+e+"-pagination-link").removeClass(t).eq(this.index).addClass(t);return},_updateNextPrevActions:function(){var e=this.elements,t=e.nextAction.add(e.prevAction),n=this.index,r=this.widgetFullName,i=r+"-action-active",s=r+"-action-disabled";t.addClass(i).removeClass(s),this.options.disabled&&t.addClass(s),this.options.loop||(n===this.getNoOfPages()-1&&e.nextAction.removeClass(i),n===0&&e.prevAction.removeClass(i));return},_setOption:function(e,t){n._setOption.apply(this,arguments);switch(e){case"orientation":this._setIsHorizontal(),this.refresh();break;case"pagination":t?(this._addPagination(),this._updateUi()):this._removePagination();break;case"nextPrevActions":t?(this._addNextPrevActions(),this._updateUi()):this._removeNextPrevActions();break;case"loop":case"disabled":this._updateUi();break;case"itemsPerTransition":case"whitespace":this.refresh()}return},add:function(e){this.elements.runner.append(e),this.refresh();return},remove:function(e){this.getNoOfItems()>0&&(this.elements.items.filter(e).remove(),this.refresh());return},getIndex:function(){return this.index},getPrevIndex:function(){return this.prevIndex},destroy:function(){var e=this.elements,t=this.widgetFullName,r={};this.element.removeClass(t).removeClass(t+"-horizontal").removeClass(t+"-vertical"),e.mask.removeClass(t+"-mask"),e.runner.removeClass(t+"-runner"),e.items.removeClass(t+"-item"),this.maskAdded&&e.runner.unwrap(),r[this.isHorizontal?"left":"top"]="",r[this.isHorizontal?"width":"height"]="",r.transform="",e.runner.css(r),this._removePagination(),this._removeNextPrevActions(),e.runner.unbind(this.eventNamespace),n.destroy.apply(this,arguments);return}})})(jQuery);