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
