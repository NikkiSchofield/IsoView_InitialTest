import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('charts', {});
  this.route('googleTrends', {});
});

export default Router;
