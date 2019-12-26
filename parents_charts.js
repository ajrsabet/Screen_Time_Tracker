
 



var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12/12', '12/13', '12/14', '12/15', '12/16', '12/17', '12/18',],
        datasets: [{
            label: kidArr[0].Name,
            data: [kidArr[0].MoneyHist],
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
			borderWidth: 1,
			maintainAspectRatio: true,
			
        },
        {
            label: 'Allowence Paid',
            data: [19, 3, 5, 2, 3, 3, 5,],
            backgroundColor:'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
			borderWidth: 1,
			maintainAspectRatio: true,
			
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
var ctx = document.getElementById('myChart2');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12/12', '12/13', '12/14', '12/15', '12/16', '12/17', '12/18',],
        datasets: [{
            label: 'Allowence Paid',
            data: [19, 3, 5, 2, 3, 3, 5,],
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
			borderWidth: 1,
			maintainAspectRatio: true,
			
        },
        {
            label: 'Allowence Paid',
            data: [19, 3, 5, 2, 3, 3, 5,],
            backgroundColor:'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
			borderWidth: 1,
			maintainAspectRatio: true,
			
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

kidRefresh();