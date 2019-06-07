/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'text!../viewModels/data/boston_weather_clean.json', 'ojs/ojchart', 'ojs/ojlegend', 'toolbar-comp/loader'],
 function(oj, ko, $, bostonData) {
  
    function CustomerViewModel() {
      var self = this;

      self.currentyearattr = ko.observable();

      var colorHandler = new oj.ColorAttributeGroupHandler();
      colorHandler.addMatchRule("high", '#ed6647');
      colorHandler.addMatchRule("low", '#267db3');

      var hiTemps = [];
      var lowTemps = [];

      var data = JSON.parse(bostonData);
      $.each(data, function(i, item) {
        var year = item['Year'];
        if (year === 2017) {
          hiTemps.push(item['High Temp (F)']);
          lowTemps.push(item['Low Temp (F)']);
        }
      });

      // Function to create the histogram data
      var createHistogramData = function (values, numBuckets, minValue, maxValue) {
          var items = [];
          var ratio = (maxValue - minValue)/numBuckets;
          for (var i = 0; i < numBuckets; i++) {
              items.push(0);
          }
          
          for (var j = 0; j < values.length; j++) {
              items[Math.floor(values[j]/ratio)] ++;
          }
        return items;
      };
      
      // Data for the bar chart
      var barHighsSeries = [{name: "Highs Frequency", items: createHistogramData(hiTemps, 20, 0, 100), color: colorHandler.getValue("high")}];
      var barLowsSeries = [{name: "Lows Frequency", items: createHistogramData(lowTemps, 20, 0, 100), color: colorHandler.getValue("low")}];
      var barGroups = [];
      for (var i = 0; i < 20; i++) {
          barGroups.push((i*5+1) + "-" + (i+1)*5);
      }

      self.barHighsSeriesValue = ko.observableArray(barHighsSeries);
      self.barLowsSeriesValue = ko.observableArray(barLowsSeries);
      self.barGroupsValue = ko.observableArray(barGroups);
      
      var lineSeries = [{name: "High", items: hiTemps, color: colorHandler.getValue("high")}, 
                        {name: "Low", items: lowTemps, color: colorHandler.getValue("low")}];
      var lineGroups = [];
      for (var i = 0; i<365; i++) {
          // https://codechi.com/dev-tools/date-to-millisecond-calculators/
          lineGroups.push(new Date(1483246800000 + 86400000*i).toISOString());
      }
      self.lineSeriesValue = ko.observableArray(lineSeries);
      self.lineGroupsValue = ko.observableArray(lineGroups);
      
      /* create legend */
      self.legendSections = [{items: [{color: colorHandler.getValue("high"), text: "High", id: "high"}, 
                  {color: colorHandler.getValue("low"), text: "Low", id: "low"}]}];
      
      self.handleYearSelection = function(event) {
        var yearSelected = event.detail.value;

        hiTemps = [];
        lowTemps = [];

        var data = JSON.parse(bostonData);
        $.each(data, function(i, item) {
          var year = item['Year'];
          if (year === yearSelected) {
            hiTemps.push(item['High Temp (F)']);
            lowTemps.push(item['Low Temp (F)']);
          }
        });

        // Data for the bar chart
        var barHighsSeries = [{name: "Highs Frequency", items: createHistogramData(hiTemps, 20, 0, 100), color: colorHandler.getValue("high")}];
        var barLowsSeries = [{name: "Lows Frequency", items: createHistogramData(lowTemps, 20, 0, 100), color: colorHandler.getValue("low")}];
        var barGroups = [];
        for (var i = 0; i < 20; i++) {
            barGroups.push((i*5+1) + "-" + (i+1)*5);
        }

        self.barHighsSeriesValue(barHighsSeries);
        self.barLowsSeriesValue(barLowsSeries);
        self.barGroupsValue(barGroups);

        var lineSeries = [{name: "High", items: hiTemps, color: colorHandler.getValue("high")}, 
                        {name: "Low", items: lowTemps, color: colorHandler.getValue("low")}];
        var lineGroups = [];

        var millisYear = 1199163600000;
        var numDays = 366;
        if (yearSelected === 2008) {
          millisYear = 1199163600000;
          numDays = 366;
        } else if (yearSelected === 2009) {
          millisYear = 1230786000000;
          numDays = 365;
        } else if (yearSelected === 2010) {
          millisYear = 1262322000000;
          numDays = 365;
        } else if (yearSelected === 2011) {
          millisYear = 1293858000000;
          numDays = 366;
        } else if (yearSelected === 2012) {
          millisYear = 1325394000000;
          numDays = 366;
        } else if (yearSelected === 2013) {
          millisYear = 1357016400000;
          numDays = 366;
        } else if (yearSelected === 2014) {
          millisYear = 1388552400000;
          numDays = 366;
        } else if (yearSelected === 2015) {
          millisYear = 1420088400000;
          numDays = 366;
        } else if (yearSelected === 2016) {
          millisYear = 1451624400000;
          numDays = 366;
        } else if (yearSelected === 2017) {
          millisYear = 1483246800000;
          numDays = 366;
        } else if (yearSelected === 2018) {
          millisYear = 1514782800000;
          numDays = 366;
        }
        for (var i = 0; i<numDays; i++) {
            // https://codechi.com/dev-tools/date-to-millisecond-calculators/

            lineGroups.push(new Date(millisYear + 86400000*i).toISOString());
        }

        self.lineSeriesValue(lineSeries);
        self.lineGroupsValue(lineGroups);
      }


      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
