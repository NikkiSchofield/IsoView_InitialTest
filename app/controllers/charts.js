import Ember from 'ember';
var nikkiChart;
var concurrentCBChart;
var seriesConcurrentUsers = [];

export default Ember.Controller.extend({

    init: function() {
        seriesConcurrentUsers = Array.apply(null, new Array(20)).map(Number.prototype.valueOf,0);

        Ember.run.scheduleOnce('afterRender', this, function(){
            console.log("ready");
            this.createChart();
        });
    },

    minYAxis: 0,
    maxYAxis: 30000,

    concurrentUsers: Ember.computed('model', function() {
        var data = this.get('model');
        seriesConcurrentUsers.push(data);
        seriesConcurrentUsers.shift();

        this.createCBConcurrentChart(seriesConcurrentUsers);
        return "";
    }),

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
            series: [{data:seriesConcurrentUsers,name: 'Users'}]
        },
        options);
    },

    numberData: Ember.computed('model', function(){
        return{
            labels: [100,200,300,400,100,200,300,400,100,200,100,200,300,400,100,200,300,400,100,200],
            datasets: [{
                label: "Number screencasts",
                data: seriesConcurrentUsers
            }],
            options: {scaleStartValue: 15000}
        };
    }),


    barOptions:{
        barValueSpacing: 2
    }


});
/*
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
});*/
