import Ember from 'ember';
var nikkiChart;
var concurrentCBChart;
var seriesConcurrentUsers = [];
var chart, toolTip;

export default Ember.Controller.extend({


  init: function() {

    seriesConcurrentUsers = Array.apply(null, Array(20)).map(Number.prototype.valueOf,0);

    Ember.run.scheduleOnce('afterRender', this, function(){
      console.log("ready");
        this.createChart();
        chart = $('.ct-chart');

        toolTip = $('.ct-chart').append('<div class="tooltip"></div>')
          .find('.tooltip')
          .hide();


    });
  },

  minYAxis: 0,
  maxYAxis: 30000,

  createChart: function() {
      nikkiChart = new Chartist.Bar('#testChart', {
        labels: [100,200,300,400],
        series: [[10, 2, 8, 3]]
      });
  },

  createCBConcurrentChart: function(seriesConcurrentUsers) {
    var options = {
      axisX: {
          showLabel: false
      },
      high: this.get('maxYAxis'),
      low: this.get('minYAxis'),
    };

    concurrentCBChart = new Chartist.Line('#concurrentCBChart', {

        labels: [100,200,300,400,100,200,300,400,100,200,100,200,300,400,100,200,300,400,100,200],
        series: [{data:seriesConcurrentUsers,
                  name: 'Users'
        }]

      }, options);
  },

  concurrentUsers: Ember.computed('model', function() {
    var data = this.get('model');
    seriesConcurrentUsers.push(data);
    seriesConcurrentUsers.shift();

    this.createCBConcurrentChart(seriesConcurrentUsers);
    return "";
  })
});

$( ".grid-stack-item" ).on( "resize", function( event, ui ) {
  console.log("test");
  concurrentCBChart.update();
});

$('.grid-stack-item').on('resizestop', function (event, ui) {
  console.log("test§");
  concurrentCBChart.update();
});

$( ".grid-stack" ).on( "resizeStop", function( event, ui ) {
  console.log("testtt");
  concurrentCBChart.update();
});

$('.ct-chart').on('mouseenter', '.ct-point', function() {
  var point = $(this),
    value = point.attr('ct:value'),
    seriesName = point.parent().attr('ct:series-name');
  toolTip.html(seriesName + '<br>' + value).show();
});

$('.ct-chart').on('mouseleave', '.ct-point', function() {
  toolTip.hide();
});

$('.ct-chart').on('mousemove', function(event) {
  toolTip.css({
    left: (event.offsetX || event.originalEvent.layerX) - toolTip.width() / 2 - 10,
    top: (event.offsetY || event.originalEvent.layerY) - toolTip.height() - 40
  });
});
