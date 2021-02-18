function showTempGraph() {
  {
    $.get("../data_json.php",
      function (data) {
        console.log(data);
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        var temps = [];
        var timetable = [];
        
        var pls = JSON.parse(data);

        $.each(pls, function(k, v) {
          temps.push(v.Temp);
          timetable.push(v.TimeAt);
        }); 
        
        document.getElementById("current_t").innerHTML = temps[0].toString();

        var ctx = document.getElementById("myTempChart");
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
              data: temps.reverse(),
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

function showIntensityGraph() {
  {
    $.get("../data_json.php",
      function (data) {
        console.log(data);
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';

        var intensities = [];
        var timetable = [];
        
        var pls = JSON.parse(data);

        $.each(pls, function(k, v) {
          intensities.push(v.Intensity);
          timetable.push(v.TimeAt);
        }); 

        var current_intensity = [intensities[0], 100 - intensities[0]];

        change_gauge(chart, "Gauge", current_intensity); 

        var ctx = document.getElementById("myIntensityChart");
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
              data: intensities.reverse(),
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
var ctx = document.getElementsByClassName("chartjs-gauge");
var chart = new Chart(ctx, {
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
							  return 'rgb(26, 175, 0)';
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
function change_gauge(chart, label, data){
  chart.data.datasets.forEach((dataset) => {
    if(dataset.label == label){
      dataset.data = data;
    }  
  });
  chart.update();
}

