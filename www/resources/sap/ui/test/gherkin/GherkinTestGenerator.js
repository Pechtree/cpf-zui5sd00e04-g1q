/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/test/gherkin/dataTableUtils","sap/ui/test/gherkin/simpleGherkinParser"],function($,U,d,s){"use strict";var G=U.extend("sap.ui.test.gherkin.GherkinTestGenerator",{constructor:function(f,S,a){U.apply(this,arguments);if($.type(f)==="string"){f=s.parseFile(f);}else if(($.type(f)!=="object")||!f.scenarios){throw new Error("GherkinTestGenerator constructor: parameter 'vFeature' must be a valid String or a valid Feature object");}if(($.type(S)!=="function")||!((new S())._generateTestStep)){throw new Error("GherkinTestGenerator constructor: parameter 'fnStepDefsConstructor' must be a valid StepDefinitions constructor");}if(a&&$.type(a)!=="function"){throw new Error("GherkinTestGenerator constructor: if specified, parameter 'fnAlternateTestStepGenerator' must be a valid Function");}this._oFeature=f;this._fnStepDefsConstructor=S;this._oStepDefs=null;this._fnAlternateTestStepGenerator=a||null;},setUp:function(){this._oStepDefs=new this._fnStepDefsConstructor();},tearDown:function(){if(this._oStepDefs&&this._oStepDefs._needsTearDown){this._oStepDefs.closeApplication();}this._oStepDefs=null;},generate:function(){if(!this._oStepDefs){this.setUp();}return this._generateFeatureTest();},execute:function(t){if(!this._oStepDefs){throw new Error("Run 'generate' before calling 'execute'");}if(!t||(!t.skip&&(($.type(t.func)!=="function")||($.type(t.parameters)!=="array")))){throw new Error("Input parameter 'oTestStep' is not a valid TestStep object.");}if(!t.skip){t.func.apply(this._oStepDefs,t.parameters);this._oStepDefs._needsTearDown=true;}return(!t.skip);},_generateFeatureTest:function(){var e=[];this._oFeature.scenarios.forEach(function(o){e=e.concat(this._expandScenarioOutline(o));},this);var t=e.map(function(o){return this._generateTestScenario(o,this._oFeature.background);},this);var f=($.inArray("@wip",this._oFeature.tags)!==-1);var a=t.every(function(T){return T.testSteps.every(function(o){return o.skip;});});var S=f||a;return{name:((f)?"(WIP) ":"")+"Feature: "+this._oFeature.name,skip:S,wip:f,testScenarios:t};},_expandScenarioOutline:function(S){if(!S.examples){return[S];}var e=this._convertScenarioExamplesToListOfObjects(S.examples);var c=e.map(function(E,i){var o=$.extend(true,{},S);o.name+=" #"+(i+1);$.each(E,function(v,V){o.steps.forEach(function(a){var b=$.sap.escapeRegExp(v);a.text=a.text.replace(new RegExp("<"+b+">","g"),V);});});return o;},this);return c;},_generateTestScenario:function(S,b){var w=$.inArray("@wip",S.tags)!==-1;var i=!!S.examples;var a=(i)?"Scenario Outline: ":"Scenario: ";var c=(w?"(WIP) ":"")+a+S.name;var t=[];var e=false;if(b){t=this._generateTestSteps(w,b,false);e=t.some(function(T){return!T.isMatch;});}t=t.concat(this._generateTestSteps(w,S,e));return{name:c,wip:w,testSteps:t};},_generateTestSteps:function(I,S,b){var t=[];for(var i=0;i<S.steps.length;++i){var o=S.steps[i];var T=this._oStepDefs._generateTestStep(o);if(!T.isMatch&&this._fnAlternateTestStepGenerator){T=this._fnAlternateTestStepGenerator(o);}if(!T.isMatch){b=true;}T.skip=b||I;if(T.isMatch&&T.skip){T.text="(SKIPPED) "+T.text;}t.push(T);}return t;},_convertScenarioExamplesToListOfObjects:function(e){e=e.map(function(i){return $.type(i)==="string"?[i]:i;});return d.toTable(e);}});return G;},true);