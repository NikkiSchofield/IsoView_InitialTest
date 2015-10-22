import Ember from 'ember';
var nikkiChart;
var seriesConcurrentUsers = [];

export default Ember.Controller.extend({


  init: function() {

    seriesConcurrentUsers = Array.apply(null, Array(20)).map(Number.prototype.valueOf,0);
    console.log(seriesConcurrentUsers);


    Ember.run.scheduleOnce('afterRender', this, function(){
      console.log("ready");
        this.createChart();
    });
  },

  concurrentUsers: 20,

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

  skySportsGoogleTrendsURL: Ember.computed('term1', 'term2', 'currentTimeSpan.value', function() {
    console.log("here");
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

  createChart: function() {
      nikkiChart = new Chartist.Bar('#testChart', {
        labels: [1, 2, 3, 4],
        series: [[10, 2, 8, 3]]
      });
  },

  updateChartArray: function(newData) {
    seriesConcurrentUsers.push(newData.people);
    console.log(seriesConcurrentUsers);
  }


});
