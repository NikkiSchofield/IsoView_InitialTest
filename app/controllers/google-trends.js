import Ember from 'ember';

export default Ember.Controller.extend({


    timespanGoogleTrends: [
      {name: "2004 - Present", value: ""},
      {name: "2015",    value: "1%2F2015%2012m"},
      {name: "2014",    value: "1%2F2014%2012m"},
      {name: "2013",    value: "1%2F2013%2012m"},
      {name: "2012",    value: "1%2F2012%2012m"},
      {name: "2011",    value: "1%2F2011%2012m"},

      {name: "Past 12 Months",    value: "today%2012-m"},
      {name: "Past 90 Days",    value: "today%203-m"},
      {name: "Past 30 Days",    value: "today%201-m"},
      {name: "Past 7 Days",    value: "now%207-d"},
      {name: "Past Day",    value: "now%201-d"},

      {name: "Past 4 Hours",    value: "now%204-H"},
      {name: "Past Hour",    value: "now%201-H"}
    ],


    currentTimeSpan: {
      value: ""
    },
    googleTrendsCBTimespan: {
      value: ""
    },

    googleTrendsCBTimespan2: {
      value: ""
    },

    googleTrendsCBTerm1: {
      value:""
    },
    googleTrendsCBTerm2: {
      value:""
    },



    skySportsChartbeatTopPages: Ember.computed('model', 'term1CB', 'term2CB', 'term3CB', 'term4CB', 'term5CB', 'googleTrendsCBTimespan.value', function() {
      var data = this.get('model'),
          timeSpan = this.get('googleTrendsCBTimespan.value');

      for(var i = 1; i <= 5; i ++){
        if(this.get('term'+i+'CB') === undefined){
          this.set('term'+i+'CB', getWords(data[i-1].title));
        }
      }

      var term1 = this.get('term'+1+'CB');
      var term2 = this.get('term'+2+'CB');
      var term3 = this.get('term'+3+'CB');
      var term4 = this.get('term'+4+'CB');
      var term5 = this.get('term'+5+'CB');
      return 'http://www.google.com/trends/fetchComponent?hl=en-GB&q='+term1+',+'+term2+',+'+term3+',+'+term4+',+'+term5+'&date='+timeSpan+'&cmpt=q&tz=Etc/GMT-1&tz=Etc/GMT-1&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330';

    }),


    skySportsGoogleTrendsURL: Ember.computed('term1', 'term2', 'currentTimeSpan.value', function() {
      var term1 = this.get('term1'),
          term2 = this.get('term2'),
          timeSpan = this.get('currentTimeSpan.value');
      if(term1 == null)
        term1 = "";
      if(term2 == null)
        term2 = "";

      term1.replace(" ", "+");
      term2.replace(" ", "+");
      return 'http://www.google.com/trends/fetchComponent?hl=en-GB&q='+term1+',+'+term2+'&date='+timeSpan+'&cmpt=q&tz=Etc/GMT-1&tz=Etc/GMT-1&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330';
    }),




    skySportsChartbeatTopPagesDropDown: Ember.computed('model', 'googleTrendsCBTerm1.value', 'googleTrendsCBTerm2.value', 'googleTrendsCBTimespan2.value', function() {
      var data = this.get('model'),
          term1 = this.get('googleTrendsCBTerm1.value'),
          term2 = this.get('googleTrendsCBTerm2.value'),
          timeSpan = this.get('googleTrendsCBTimespan2.value');

          console.log(term1);


          return 'http://www.google.com/trends/fetchComponent?hl=en-GB&q='+term1+',+'+term2+'&date='+timeSpan+'&cmpt=q&tz=Etc/GMT-1&tz=Etc/GMT-1&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330';
    })

});

function getWords(str) {
    var searchTerm = str.split(/\s+/).slice(0,2).join(" ");
    var searchTermWithoutCommas = searchTerm.replace(/,+$/, "");
    return searchTermWithoutCommas;
};
