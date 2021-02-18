function showGraph() {
  {
    $.get("../data_json.php",
      function (data) {
        console.log(data);
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        var moistures = [];
        var timetable = [];
        
        var pls = JSON.parse(data);     

        $.each(pls, function(k, v) {
          console.log(v.Moisture);
          moistures.push(v.Moisture);
          timetable.push(v.TimeAt);
        }); 

        var current_moisture = [moistures[0], 100 - moistures[0]];

        change_gauge_moist(moist_chart, "Gauge", current_moisture); 

        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: timetable.reverse(),
            datasets: [{
              label: "Time",
              lineTension: 0.3,
              backgroundColor: "rgba(2,117,216,0.2)",
              borderColor: "rgba(2,117,216,1)",
              pointRadius: 5,
              pointBackgroundColor: "rgba(2,117,216,1)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(2,117,216,1)",
              pointHitRadius: 50,
              pointBorderWidth: 2,
              data: moistures.reverse(),
            }],
          },
          options: {
            scales: {
              xAxes: [{
                time: {
                  unit: 'date'
                },
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 7
                }
              }],
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 100,
                  maxTicksLimit: 5
                },
                gridLines: {
                  color: "rgba(0, 0, 0, .125)",
                }
              }],
            },
            legend: {
              display: false
            }
          }
        });
      });
  }
}


// Create chart
var ctx = document.getElementsByClassName("moist-gauge");
var moist_chart = new Chart(ctx, {
    type:"doughnut",
    data: {
        labels : ["Red","Blue"],
        datasets: [{
            label: "Gauge",
            data : [40, 60],
            backgroundColor: [
                "rgb(155, 5, 3)",
                "rgb(155, 5, 68)",
                "rgb(255, 205, 86)"
            ]
        }]
    },
    options: {
        circumference: Math.PI,
        rotation : Math.PI,
        cutoutPercentage : 80, // precent
        plugins: {
					  datalabels: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
						  borderColor: '#ffffff',
              color: function(context) {
							  return context.dataset.backgroundColor;
						  },
						  font: function(context) {
                var w = context.chart.width;
                return {
                  size: w < 512 ? 18 : 20
                }
              },
              align: 'start',
              anchor: 'start',
              offset: 10,
						  borderRadius: 4,
						  borderWidth: 1,
              formatter: function(value, context) {
							  var i = context.dataIndex;
                var len = context.dataset.data.length - 1;
                if(i == len){
                  return null;
                }
							  return value +' mph';
						  }
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    }
});

// DEMO Code: not relevant to example
function change_gauge_moist(chart, label, data){
  chart.data.datasets.forEach((dataset) => {
    if(dataset.label == label){
      dataset.data = data;
    }  
  });
  chart.update();
}

