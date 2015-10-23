import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {


    return Ember.$.getJSON('http://api.chartbeat.com/live/toppages/v3/?[apikey]&host=skysports.com&limit=5').then(function(data) {
    //  updateChartArray(data.data.stats.people);
      return data.pages
    });
  }
});
