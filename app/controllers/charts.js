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

  skySportsGoogleTrendsURL: Ember.computed('term1', 'term2', function() {
    var term1 = this.get('term1'),
        term2 = this.get('term2');
    if(term1 == null)
      term1 = "";
    if(term2 == null)
      term2 = "";


    term1.replace(" ", "+");
    term2.replace(" ", "+");
    return 'http://www.google.com/trends/fetchComponent?hl=en-GB&q='+term1+',+'+term2+'&date=1/2015+12m&gprop=froogle&cmpt=q&tz=Etc/GMT-1&tz=Etc/GMT-1&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330';
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
