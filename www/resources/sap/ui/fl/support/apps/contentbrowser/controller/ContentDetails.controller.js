/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/Dialog","sap/m/Text","sap/m/Button","sap/ui/fl/support/apps/contentbrowser/lrepConnector/LRepConnector","sap/ui/fl/support/apps/contentbrowser/utils/HtmlEscapeUtils","sap/ui/fl/support/apps/contentbrowser/utils/DataUtils"],function(C,D,T,B,L,H,a){"use strict";return C.extend("sap.ui.fl.support.apps.contentbrowser.controller.ContentDetails",{oSelectedContentModel:undefined,oDataUtils:a,onInit:function(){this._initAndBindSelectedContentModel();var r=sap.ui.core.UIComponent.getRouterFor(this);r.getRoute("ContentDetails").attachMatched(this._onRouteMatched,this);r.getRoute("ContentDetailsFlip").attachMatched(this._onRouteMatched,this);},_initAndBindSelectedContentModel:function(){this.oSelectedContentModel=new sap.ui.model.json.JSONModel();this.getView().setModel(this.oSelectedContentModel,"selectedContent");},_onRouteMatched:function(r){var t=this;var R=r.getParameter("arguments");var m={};m.layer=R.layer;m.namespace=H.unescapeSlashes(R.namespace);m.fileName=R.fileName;m.fileType=R.fileType;if(m.namespace[m.namespace.length-1]!=="/"){m.namespace+="/";}var c=m.namespace+m.fileName+"."+m.fileType;var p=t.getView().getContent()[0];p.setBusy(true);return L.getContent(m.layer,c,null,null,true).then(t._onContentReceived.bind(t,m,p,c),function(){p.setBusy(false);});},_onContentReceived:function(m,p,c,d){var t=this;m.data=a.formatData(d,m.fileType);if(m.fileType){return L.getContent(m.layer,c,true).then(t._onContentMetadataReceived.bind(t,m,p),function(){p.setBusy(false);});}else{return Promise().resolve();}},_onContentMetadataReceived:function(m,p,M){m.metadata=M;this.oSelectedContentModel.setData(m);var c=sap.ui.getCore();var i=this.getView().createId("contentDetailsIconTabBar");var I=c.getElementById(i);if(I){var f=I.getItems()[0];if(I.getSelectedKey()!==f.getId()){I.setSelectedItem(f);}}p.setBusy(false);}});});