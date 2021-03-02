/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var R=C.extend("sap.ui.commons.RadioButton",{metadata:{library:"sap.ui.commons",properties:{text:{type:"string",group:"Data",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},selected:{type:"boolean",group:"Data",defaultValue:false},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},groupName:{type:"string",group:"Behavior",defaultValue:'sapUiRbDefaultGroup'},key:{type:"string",group:"Data",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{}}}});R.prototype.init=function(){this._changeGroupName(this.getGroupName());};R.prototype.exit=function(){var g=this.getGroupName(),G=this._groupNames[g];G.splice(G.indexOf(this),1);};R.prototype.onclick=function(e){if(this.getEnabled()&&e.target.id==(this.getId()+"-RB")){this.focus();}if(!!sap.ui.Device.browser.internet_explorer&&(!this.getEnabled())){this.$().attr("tabindex",0).toggleClass("sapUiRbFoc");}this.userSelect(e);};R.prototype._groupNames={};R.prototype.onsapspace=function(e){if(this.getEnabled()&&e.target.id==(this.getId()+"-RB")){this.focus();}this.userSelect(e);};R.prototype.onsaptabnext=function(e){if(!!sap.ui.Device.browser.internet_explorer){this.bTabPressed=true;var t=this;window.setTimeout(function(){t.bTabPressed=false;},100);}};R.prototype.onfocusin=function(e){if(this.getEnabled()&&e.target.id==(this.getId()+"-RB")){if(this.bTabPressed){var f=q(":sapFocusable"),F=false;for(var i=0;i<f.length;i++){if(F&&f[i].parentNode!=e.target&&f[i].tabIndex!="-1"){f[i].focus();e.preventDefault();break;}if(e.target==f[i]){F=true;}}}else{this.focus();}}};R.prototype.onfocusout=function(e){if(!!sap.ui.Device.browser.internet_explorer&&(!this.getEnabled())){this.$().attr("tabindex",-1).toggleClass("sapUiRbFoc");}};R.prototype.userSelect=function(e){if(this.getEnabled()&&this.getEditable()){var s=this.getSelected();if(!s){this.setSelected(true);this.fireSelect({});}}else{e.preventDefault();}};R.prototype.setSelected=function(s){var c,S=this.getSelected(),g=this.getGroupName(),a=this._groupNames[g],L=a&&a.length;this.setProperty("selected",s,true);if(s&&g&&g!==""){for(var i=0;i<L;i++){c=a[i];if(c instanceof R&&c!==this&&c.getSelected()){c.setSelected(false);}}}if((S!=s)&&this.getDomRef()&&this.getRenderer().setSelected){this.getRenderer().setSelected(this,s);}return this;};R.prototype.setGroupName=function(g){g=this.validateProperty("groupName",g);this._changeGroupName(g,this.getGroupName());return this.setProperty("groupName",g,false);};R.prototype.getTooltipDomRefs=function(){return this.getDomRef().children;};R.prototype._changeGroupName=function(n,o){var N=this._groupNames[n],O=this._groupNames[o];if(!N){N=this._groupNames[n]=[];}if(N.indexOf(this)===-1){N.push(this);}if(O&&O.indexOf(this)!==-1){O.splice(O.indexOf(this),1);}};return R;},true);
