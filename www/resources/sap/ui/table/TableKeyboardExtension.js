/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TableExtension','sap/ui/core/delegate/ItemNavigation','./TableUtils','./TableKeyboardDelegate2','sap/ui/Device'],function(q,T,I,a,b,D){"use strict";var c=false;function d(o){if(D.browser.msie){if(!c){q('head').append('<style type="text/css">'+'/* Avoid focus outline problems in tables */\n'+'.sapUiTableStatic[data-sap-ui-table-focus]{}'+'</style>');c=true;}var C=a.getCellInfo(o)||{};if(C.type){C.cell.attr("data-sap-ui-table-focus",Date.now());}}}var e={_forward:function(t,o){var i=t._getItemNavigation();if(i!=null&&!t._getKeyboardExtension()._isItemNavigationSuspended()&&!o.isMarked("sapUiTableSkipItemNavigation")&&!a.isBusyIndicatorVisible(t)){i["on"+o.type](o);}},onfocusin:function(o){e._forward(this,o);d(o.target);},onsapfocusleave:function(o){e._forward(this,o);},onmousedown:function(o){e._forward(this,o);},onsapnext:function(o){e._forward(this,o);},onsapnextmodifiers:function(o){e._forward(this,o);},onsapprevious:function(o){e._forward(this,o);},onsappreviousmodifiers:function(o){e._forward(this,o);},onsappageup:function(o){e._forward(this,o);},onsappagedown:function(o){e._forward(this,o);},onsaphome:function(o){e._forward(this,o);},onsaphomemodifiers:function(o){e._forward(this,o);},onsapend:function(o){e._forward(this,o);},onsapendmodifiers:function(o){e._forward(this,o);},onsapkeyup:function(o){e._forward(this,o);}};var E={onfocusin:function(o){var h=this._getKeyboardExtension();if(!h._bIgnoreFocusIn){h.initItemNavigation();if(f.isItemNavigationInvalid(this)){o.setMarked("sapUiTableInitItemNavigation");}}else{o.setMarked("sapUiTableIgnoreFocusIn");}if(o.target&&o.target.id===this.getId()+"-rsz"){o.preventDefault();o.setMarked("sapUiTableSkipItemNavigation");}}};var f={_initItemNavigation:function(o){var t=o.getTable();if(a.isBusyIndicatorVisible(t)){return;}var $=t.$();var C=a.getVisibleColumnCount(t);var h=C;var H=a.hasRowHeader(t);var j=a.hasRowActions(t);var k=a.hasFixedColumns(t);var l=[],r,R,m,n,p;if(k){m=$.find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixed:not(.sapUiTableCHT)');n=$.find('.sapUiTableCtrlFixed.sapUiTableCtrlRowScroll:not(.sapUiTableCHT)');p=$.find('.sapUiTableCtrlFixed.sapUiTableCtrlRowFixedBottom:not(.sapUiTableCHT)');}var s=$.find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixed:not(.sapUiTableCHT)');var u=$.find('.sapUiTableCtrlScroll.sapUiTableCtrlRowScroll:not(.sapUiTableCHT)');var v=$.find('.sapUiTableCtrlScroll.sapUiTableCtrlRowFixedBottom:not(.sapUiTableCHT)');if(H){r=$.find(".sapUiTableRowHdr").get();h++;}if(j){R=$.find(".sapUiTableRowAction").get();h++;}for(var i=0;i<t.getVisibleRowCount();i++){if(H){l.push(r[i]);}if(k){l=l.concat(m.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());}l=l.concat(s.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());if(k){l=l.concat(n.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());}l=l.concat(u.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());if(k){l=l.concat(p.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());}l=l.concat(v.find('tr[data-sap-ui-rowindex="'+i+'"]').find('td[tabindex]').get());if(j){l.push(R[i]);}}if(t.getColumnHeaderVisible()){var w=[];var F=$.find(".sapUiTableCHT.sapUiTableCtrlFixed>tbody>tr");var S=$.find(".sapUiTableCHT.sapUiTableCtrlScroll>tbody>tr");for(var i=0;i<a.getHeaderRowCount(t);i++){if(H){w.push(t.getDomRef("selall"));}if(F.length){w=w.concat(q(F.get(i)).find(".sapUiTableCol").get());}if(S.length){w=w.concat(q(S.get(i)).find(".sapUiTableCol").get());}if(j){w.push($.find(".sapUiTableRowActionHeader").get(0));}}l=w.concat(l);}if(!o._itemNavigation){o._itemNavigation=new I();o._itemNavigation.setTableMode(true);o._itemNavigation.attachEvent(I.Events.AfterFocus,function(x){var y=a.getFocusedItemInfo(t);y.header=a.getHeaderRowCount(t);y.domRef=null;if(y.row>=y.header){o._oLastFocusedCellInfo=y;}},t);}o._itemNavigation.setColumns(h);o._itemNavigation.setRootDomRef($.find(".sapUiTableCnt").get(0));o._itemNavigation.setItemDomRefs(l);o._itemNavigation.setFocusedIndex(f.getInitialItemNavigationIndex(o));o._itemNavigationInvalidated=false;},getInitialItemNavigationIndex:function(o){return a.hasRowHeader(o.getTable())?1:0;},isItemNavigationInvalid:function(o){return!o._itemNavigation||o._itemNavigationInvalidated;}};var g=T.extend("sap.ui.table.TableKeyboardExtension",{_init:function(t,s,S){this._itemNavigation=null;this._itemNavigationInvalidated=false;this._itemNavigationSuspended=false;this._type=s;this._delegate=new b(s);this._actionMode=false;t.addEventDelegate(E,t);t.addEventDelegate(this._delegate,t);t.addEventDelegate(e,t);t._getItemNavigation=function(){return this._itemNavigation;}.bind(this);return"KeyboardExtension";},_debug:function(){this._ExtensionHelper=f;this._ItemNavigationDelegate=e;this._ExtensionDelegate=E;},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(E);t.removeEventDelegate(this._delegate);t.removeEventDelegate(e);}if(this._itemNavigation){this._itemNavigation.destroy();this._itemNavigation=null;}if(this._delegate){this._delegate.destroy();this._delegate=null;}T.prototype.destroy.apply(this,arguments);}});g.prototype.initItemNavigation=function(){if(f.isItemNavigationInvalid(this)){f._initItemNavigation(this);}};g.prototype.invalidateItemNavigation=function(){this._itemNavigationInvalidated=true;};g.prototype.setActionMode=function(h){if(h===true&&!this._actionMode&&this._delegate.enterActionMode){this._actionMode=this._delegate.enterActionMode.apply(this.getTable(),Array.prototype.slice.call(arguments,1))===true;}else if(h===false&&this._actionMode&&this._delegate.leaveActionMode){this._actionMode=false;this._delegate.leaveActionMode.apply(this.getTable(),Array.prototype.slice.call(arguments,1));}};g.prototype.isInActionMode=function(){return this._actionMode;};g.prototype.updateNoDataAndOverlayFocus=function(p){var t=this.getTable();if(!t||!t.getDomRef()){return;}if(t.getShowOverlay()){if(q.sap.containsOrEquals(t.getDomRef(),p)){t.$("overlay").focus();}}else if(a.isNoDataVisible(t)){if(q.sap.containsOrEquals(t.getDomRef("sapUiTableCnt"),p)){t.$("noDataCnt").focus();}}else if(q.sap.containsOrEquals(t.getDomRef("noDataCnt"),p)||q.sap.containsOrEquals(t.getDomRef("overlay"),p)){a.focusItem(t,f.getInitialItemNavigationIndex(this));}};g.prototype._suspendItemNavigation=function(){this._itemNavigationSuspended=true;};g.prototype._resumeItemNavigation=function(){this._itemNavigationSuspended=false;};g.prototype._isItemNavigationSuspended=function(){return this._itemNavigationSuspended;};g.prototype._getLastFocusedCellInfo=function(){var h=a.getHeaderRowCount(this.getTable());if(!this._oLastFocusedCellInfo||this._oLastFocusedCellInfo.header!=h){var i=a.getFocusedItemInfo(this.getTable());var j=f.getInitialItemNavigationIndex(this);return{cellInRow:j,row:h,header:h,cellCount:i.cellCount,columnCount:i.columnCount,cell:i.columnCount*h+j};}return this._oLastFocusedCellInfo;};g.prototype._setSilentFocus=function(o){this._bIgnoreFocusIn=true;this._setFocus(o);this._bIgnoreFocusIn=false;};g.prototype._setFocus=function(o){if(!o){return;}var t=this.getTable();var C=a.getCellInfo(o)||{};if(C.type&&t){var $=q(o);if($.attr("tabindex")!="0"){var h=t._getItemNavigation();if(h&&h.aItemDomRefs){for(var i=0;i<h.aItemDomRefs.length;i++){if(h.aItemDomRefs[i]){h.aItemDomRefs[i].setAttribute("tabindex","-1");}}}$.attr("tabindex","0");}}o.focus();};g.prototype._getTableType=function(){return this._type;};return g;},true);
