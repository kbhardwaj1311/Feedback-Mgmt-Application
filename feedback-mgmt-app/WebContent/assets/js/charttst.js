$(function (){ 
	getchart();
	
	window.odometerOptions = {
		format: '(,ddd)' 
	};
	//setTimeout(getodo(),1000);
});

var ctx= document.getElementById("myChart").getContext('2d');
function getchart(){
//btime=gettime(new Date());
//document.getElementById("btime").innerHTML = 'Start Time - '+btime;

const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;

var tbl1 = '<table class="table" style="font-size:8px">'+
								'<thead>'+
									'<tr class="thead-clr">'+
										'<th></th>'+
										'<th></th>'+
										'<th></th>'+
										'<th></th>'+
									'</tr>'+
								'</thead>'+
								'<tbody>';
 			tbl1+='<tr>'+'<td>'+'__'+'</td>'+'<td>'+'Thick'+'</td>'+'<td>'+''+'</td>'+'</tr>'
  		tbl1+='<tr>'+'<td>'+'__'+'</td>'+'<td>'+'Nom'+'</td>'+'<td>'+prev2+'</td>'+'</tr>'
  		tbl1+='<tr>'+'<td>'+'__'+'</td>'+'<td>'+'USL'+'</td>'+'<td>'+'0.23'+'</td>'+'</tr>'
  		tbl1+='<tr>'+'<td>'+'__'+'</td>'+'<td>'+'LSL'+'</td>'+'<td>'+'0.18'+'</td>'+'</tr>'
  		
						tbl1 += '</tbody></table>';
						$("#plcinfo").html(tbl1);

var tbl = '<table class="table">'+
								'<thead>'+
									'<tr class="thead-clr">'+
										'<th>Location Code</th>'+
										'<th>Production Lines</th>'+
										'<th>Linear Footage</th>'+
										'<th>Thickness</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody>';
					
for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  sleep(100);
  data.push({x: i, y: prev.toFixed(4)});
  data2.push({x: i, y: prev2.toFixed(4)});
  			tbl+='<tr>'+'<td>'+i+'</td>'+'<td>'+i+'</td>'+'<td>'+i+'</td>'+'<td>'+prev.toFixed(4)+'</td>'+'</tr>'
setTimeout(function(){
    odometer.innerHTML = i;
}, 10000);}
//var c=new CountUp("#countup",0,1500);
//c.start();


				tbl += '</tbody></table>';
						$("#gtable").html(tbl);
					
const totalDuration = 1000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1];
//.getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};
var lbl=[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]
//var btime="#btime";
//document.getElementById("etime").innerHTML = 'End Time - '+gettime(new Date());
//var etime="#etime";
//document.getElementById("ttltime").innerHTML ='Total Time - '+ getttltime(etime, btime);

return new Chart(ctx, {
  type: 'line',
  labels: lbl,
  data: {
    datasets: [{
    label:'Thickness '+prev.toFixed(4),
      borderColor: "skyblue",
      borderWidth: 1,
      radius: 0,
      data: data,
    },{
    label:'Nom -'+prev2,
      borderColor: "#ff00ff",
      borderWidth: 1,
      radius: 0,
      data: data2,
    },
    {
    label:'USL -'+prev2/2,
      borderColor: "#ff0000",
      borderWidth: 1,
      radius: 0,
    },
    {
    label:'LSL -'+prev2/4,
      borderColor: "#fff00f",
      borderWidth: 1,
      radius: 0,
    }]
  },
  options: {
    animation,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: {
                display: true,
                position:'right',
                 labels: {
                display: true,
                    color: 'darkGrey',
                 },
                 border:'1px'
            }
    },
    scales: {
      x: {
      
        type: 'linear'
      },
      y:{beginAtZero: true}
    }
  }
})};
//$('.odometer').html(0422);
//function getodo(){$('.odometer-digit').html(12000);}
//function gettime(d){return (d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());}
//function getttltime(ed,bd){const durations = [ed,bd];
//const totalDurations = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev),moment.duration(durations[0]));
//return (moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss"));}
