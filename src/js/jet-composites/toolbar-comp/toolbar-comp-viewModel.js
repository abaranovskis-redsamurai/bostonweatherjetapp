/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/toolbar-comp-strings', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojlabel'], 
    function (ko, $, componentStrings) {
    
    function ExampleComponentModel(context) {
        var self = this;
        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        self.properties = context.properties;
        self.res = componentStrings['toolbar-comp'];

        self.typeValue = ko.observable(2009);

        if (context.properties.currentyear) {
          self.typeValue(context.properties.currentyear);
        }

        /* toggle buttons*/
        self.typeOptions = [
          {id: '2008', label: '2008', value: 2008},
          {id: '2009', label: '2009', value: 2009},
          {id: '2010', label: '2010', value: 2010},
          {id: '2011', label: '2011', value: 2011},
          {id: '2012', label: '2012', value: 2012},
          {id: '2013', label: '2013', value: 2013},
          {id: '2014', label: '2014', value: 2014},
          {id: '2015', label: '2015', value: 2015},
          {id: '2016', label: '2016', value: 2016},
          {id: '2017', label: '2017', value: 2017},
          {id: '2018', label: '2018', value: 2018}
        ];

        self.typeValue.subscribe(function () {
          var year = self.typeValue();
          context.properties.currentyear = year;

          var params = {
            'bubbles': true,
            'detail': {'value': year}
          }
          self.composite.dispatchEvent(new CustomEvent('handleYear', params));
        });

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});