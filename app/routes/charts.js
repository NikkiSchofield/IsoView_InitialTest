import Ember from 'ember';


export default Ember.Route.extend({
  model: function() {
    var interval = 3000;
    Ember.run.later(this, function() {
      this.model().then(function(json) {
        this.controller.set('model', json);
      }.bind(this));
    }, interval);

    return Ember.$.getJSON('http://api.chartbeat.com/live/quickstats/v4/?[APIKEY]&host=skysports.com').then(function(data) {
    //  updateChartArray(data.data.stats);

      return data.data.stats.people;
    });
  }

});
