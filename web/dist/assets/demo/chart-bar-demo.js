document.addEventListener("DOMContentLoaded", function(event) { 
  showTempGraph();
  showIntensityGraph();
  showMoistGraph();
});

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
          temps.push(v.tempC);
          timetable.push(v.time);
        }); 
        
        document.getElementById("current_t").innerHTML = "Current temperature: " + temps[0].toString() + "°";

        var ctx = document.getElementById("myTempChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: timetable.reverse(),
            datasets: [{
              label: "Temperature",
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
                  max: 50,
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
          var num;
          if(v.intenz > 255) {
            num = 255;
          } else {
            num = v.intenz;
          }
          intensities.push((num / 255 * 100).toFixed(2));
          timetable.push(v.time);
        }); 

        var current_intensity = [intensities[0], 100 - intensities[0]];

        change_gauge(chart, "Gauge", current_intensity); 
        document.getElementById("current_i").innerHTML = "Intensity: " + intensities[0].toString() + "%";

        var ctx = document.getElementById("myIntensityChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: timetable.reverse(),
            datasets: [{
              label: "Intensity",
              lineTension: 0.3,
              backgroundColor: "rgba(2, 163, 0, 0.2)",
              borderColor: "rgba(2, 163, 0.8)",
              pointRadius: 5,
              pointBackgroundColor: "rgba(2, 163, 0, 0.8)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(2, 163, 0)",
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

function showMoistGraph() {
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
          console.log(v.moist);
          moistures.push(v.moist);
          timetable.push(v.time);
        }); 

        var current_moisture = [moistures[0], 100 - moistures[0]];

        change_gauge_moist(moist_chart, "Gauge", current_moisture);
        document.getElementById("current_m").innerHTML = "Moisture: " + moistures[0].toString() + "%";

        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: timetable.reverse(),
            datasets: [{
              label: "Moisture",
              lineTension: 0.3,
              backgroundColor: "rgba(196, 0, 0, 0.2)",
              borderColor: "rgba(196, 0, 0. 0.8)",
              pointRadius: 5,
              pointBackgroundColor: "rgb(196, 0, 0)",
              pointBorderColor: "rgba(255,255,255,0.8)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(196, 0, 0, 1)",
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
                  color: "rgba(255, 255, 255, .3)",
                }
              }],
            },
            legend: {
              display: false
            }
          }
        });

        if(moistures[9] <= 10) {
          document.getElementById('class_changer').classList.remove('center');
          document.getElementById('class_changer').classList.add('center_warning');
          document.getElementById('warning').innerHTML = "Water me pleaseee!"
        } 
        else 
        {
          document.getElementById('class_changer').classList.add('center');
          document.getElementById('class_changer').classList.remove('center_warning');
          document.getElementById('warning').innerHTML = "I'm feeling good :)"
        }
      });
  }
}

// Gauge za intensity

var ctx = document.getElementsByClassName("chartjs-gauge");
var chart = new Chart(ctx, {
    type:"doughnut",
    data: {
        labels : ["Red","Blue"],
        datasets: [{
            label: "Gauge",
            data : [40, 60],
            backgroundColor: [
              "rgb(2, 163, 0)",
              "rgb(224, 224, 224)",
              "rgb(2, 163, 0)"
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
						  borderColor: 'rgba(0, 0, 0, 0.7)',
              color: function(context) {
							  return 'rgba(0, 0, 0, 0.7)';
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
						  borderRadius: 0,
						  borderWidth: 0,
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

// Gauge za moist


var ctx = document.getElementsByClassName("moist-gauge");
var moist_chart = new Chart(ctx, {
    type:"doughnut",
    data: {
        labels : ["Red","Blue"],
        datasets: [{
            label: "Gauge",
            data : [40, 60],
            backgroundColor: [
                "rgb(196, 0, 0)",
                "rgb(224, 224, 224)",
                "rgb(196, 0, 0)"
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
						  borderColor: 'rgb(196, 0, 0)',
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
							  return value + '°';
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


