/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'text!../viewModels/data/boston_weather_clean.json', 'ojs/ojchart',
        'ojs/ojlabel', 'ojs/ojvalidation-number', 'ojs/ojpictochart', 'ojs/ojlegend', 'toolbar-comp/loader'],
 function(oj, ko, $, bostonData) {
  
    function DashboardViewModel() {
      var self = this;

      self.currentyearattr = ko.observable();

      var rangeSeries = [{name: 'High/Low °F', type: 'area', items: [], color: 'rgba(237, 102, 71, 0.8)',displayInLegend: 'on', location: 'back', shortDesc: ''}];
      var rangeGroups = [];
      var avgRefObj = [{text:'Average °F', items: [], color: 'rgba(133, 97, 200,0.5)',displayInLegend: 'on', lineWidth: 2, location: 'front', shortDesc: ''}];
      var janData = [];
      var febData = [];
      var marData = [];
      var aprData = [];
      var mayData = [];
      var junData = [];
      var julData = [];
      var augData = [];
      var sepData = [];
      var octData = [];
      var novData = [];
      var decData = [];

      var dataDays = {
        "January" :  janData,
        "February" :  febData,
        "March": marData,
        "April": aprData,
        "May": mayData,
        "June": junData,
        "July": julData,
        "August": augData,
        "September": sepData,
        "October": octData,
        "November": novData,
        "December": decData};

      var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

      var converterFactory = oj.Validation.converterFactory('number');
      self.tempConverter = converterFactory.createConverter({pattern: '#°F'});

      var data = JSON.parse(bostonData);
      $.each(data, function(i, item) {
        var year = item['Year'];
        if (year === 2009) {
          var month = months[item['Month'] - 1];
          rangeSeries[0].items.push({low: item['Low Temp (F)'], high: item['High Temp (F)']});
          rangeGroups.push(item['Day'] + '-' + month);
          avgRefObj[0].items.push(item['Avg Temp (F)']);

          if (item['Month'] === 1) {
            janData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 2) {
            febData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 3) {
            marData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 4) {
            aprData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 5) {
            mayData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 6) {
            junData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 7) {
            julData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 8) {
            augData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 9) {
            sepData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 10) {
            octData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 11) {
            novData.push(item['Avg Temp (F)']);
          }
          if (item['Month'] === 12) {
            decData.push(item['Avg Temp (F)']);
          }
        }
      });

      self.rangeSeriesValue = ko.observableArray(rangeSeries);
      self.rangeGroupsValue = ko.observableArray(rangeGroups);
      self.refObjs = ko.observableArray(avgRefObj);

      self.handleYearSelection = function(event) {
        var yearSelected = event.detail.value;

        rangeSeries[0].items = [];
        rangeGroups = [];
        avgRefObj[0].items = [];
        janData = [];
        febData = [];
        marData = [];
        aprData = [];
        mayData = [];
        junData = [];
        julData = [];
        augData = [];
        sepData = [];
        octData = [];
        novData = [];
        decData = [];
        
        $.each(data, function(i, item) {
          var year = item['Year'];
          if (year === yearSelected) {
            var month = months[item['Month'] - 1];
            rangeSeries[0].items.push({low: item['Low Temp (F)'], high: item['High Temp (F)']});
            rangeGroups.push(item['Day'] + '-' + month);
            avgRefObj[0].items.push(item['Avg Temp (F)']);

            if (item['Month'] === 1) {
              janData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 2) {
              febData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 3) {
              marData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 4) {
              aprData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 5) {
              mayData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 6) {
              junData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 7) {
              julData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 8) {
              augData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 9) {
              sepData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 10) {
              octData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 11) {
              novData.push(item['Avg Temp (F)']);
            }

            if (item['Month'] === 12) {
              decData.push(item['Avg Temp (F)']);
            }
          }
        });

        dataDays['January'] = janData;
        dataDays['February'] = febData;
        dataDays['March'] = marData;
        dataDays['April'] = aprData;
        dataDays['May'] = mayData;
        dataDays['June'] = junData;
        dataDays['July'] = julData;
        dataDays['August'] = augData;
        dataDays['September'] = sepData;
        dataDays['October'] = octData;
        dataDays['November'] = novData;
        dataDays['December'] = decData;

        self.rangeSeriesValue(rangeSeries);
        self.rangeGroupsValue(rangeGroups);
        self.refObjs(avgRefObj);

        self.janItems(getPictoItems(yearSelected, 'January', 0));
        self.febItems(getPictoItems(yearSelected, 'February', 1));
        self.marItems(getPictoItems(yearSelected, 'March', 2));
        self.aprilItems(getPictoItems(yearSelected, 'April', 3));
        self.mayItems(getPictoItems(yearSelected, 'May', 4));
        self.juneItems(getPictoItems(yearSelected, 'June', 5));
        self.julyItems(getPictoItems(yearSelected, 'July', 6));
        self.augustItems(getPictoItems(yearSelected, 'August', 7));
        self.septemberItems(getPictoItems(yearSelected, 'September', 8));
        self.octoberItems(getPictoItems(yearSelected, 'October', 9));
        self.novemberItems(getPictoItems(yearSelected, 'November', 10));
        self.decemberItems(getPictoItems(yearSelected, 'December', 11));
      }

      var legendItems = [];
      var temp = ["5-20°F","20-30°F","30-40°F","40-50°F","50-60°F","60-70°F","70-100°F"];
      var colors = ["267db3", "47bdef", "6ddbdb", "a2bf39", "fad55c", "ffb54d", "ed6647", "ed6647"];

      var getPictoItems = function (year, month, monthIndex){
        var pictoItems = [];
        var values = dataDays[month];
        var firstDay = (new Date(year, monthIndex, 1)).getDay();
        var pointer = 0;
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if(pointer < firstDay){
            pictoItems.push({name: '', color: 'rgba(0,0,0,0)'});
            pointer++;
            i--;
          }
          else {
            var colorIndex = Math.floor(val/10)-1;
            if (colorIndex < 0) {
              colorIndex = 0;
            }
            if (colorIndex > 7) {
              colorIndex = 7;
            }
            pictoItems.push({name: month+' '+(i+1)+" ("+val+"°F)", color: "#"+colors[colorIndex]});
          }
        }
        return pictoItems;
      }

      for (var i = 0; i < temp.length; i++) {
        legendItems.push({text: temp[i] , color: "#"+colors[i]});
      };

      self.janItems = ko.observableArray(getPictoItems(2019, 'January', 0));
      self.febItems = ko.observableArray(getPictoItems(2019, 'February', 1));
      self.marItems = ko.observableArray(getPictoItems(2019, 'March', 2));
      self.aprilItems = ko.observableArray(getPictoItems(2019, 'April', 3));
      self.mayItems = ko.observableArray(getPictoItems(2019, 'May', 4));
      self.juneItems = ko.observableArray(getPictoItems(2019, 'June', 5));
      self.julyItems = ko.observableArray(getPictoItems(2019, 'July', 6));
      self.augustItems = ko.observableArray(getPictoItems(2019, 'August', 7));
      self.septemberItems = ko.observableArray(getPictoItems(2019, 'September', 8));
      self.octoberItems = ko.observableArray(getPictoItems(2019, 'October', 9));
      self.novemberItems = ko.observableArray(getPictoItems(2019, 'November', 10));
      self.decemberItems = ko.observableArray(getPictoItems(2019, 'December', 11));
      self.legendSections = ko.observableArray([{items: legendItems}]);

      this.tooltipFunction = function (dataContext) {
        return {'insert':dataContext.name};
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
    return new DashboardViewModel();
  }
);
