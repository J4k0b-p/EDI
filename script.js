let carouselData, chartsData, sortedChart2Data;
let myChart1, myChart1Data, myChart2, myChart2data;
const apiUrl = 'https://my.api.mockaroo.com/edi_project.json?key=655ef660';

$.ajax({
  url: apiUrl,
  method: 'GET',
  dataType: 'json',
  success: function (response) {
    carouselData = response;
    chartsData = response;
    renderContent(response);
  },
  error: function (status, error) {
    console.log('Error:', status, error);
  },
});

let slide = 0;
let brands = ['Apple', 'Huawei', 'Motorola', 'Samsung', 'Xiaomi'];
let counter = 0;

function renderContent(data) {
  generateRecords(data);
  setUpCharts(data);
  updateCharts(sortPhonesMpx());
}

function generateRecords(data) {
  for (let x = 0; x < 100; x++) {
    if (data[x].Brand == brands[slide]) {
      $('#data').append(
        '<tr><td>' +
          x +
          '</td>' +
          '<td>' +
          data[x].Brand +
          '</td>' +
          '<td>' +
          data[x].Premiere +
          '</td>' +
          '<td>' +
          data[x].Price +
          '</td>' +
          '<td>' +
          data[x].Color +
          '</td>' +
          '<td>' +
          data[x].Screen_size +
          '</td>' +
          '<td>' +
          data[x].Ram +
          '</td>' +
          '<td>' +
          data[x].Storage +
          '</td>' +
          '<td>' +
          data[x].Battery +
          '</td>' +
          '<td>' +
          data[x].Camera +
          '</td>' +
          '<td>' +
          data[x].Waterproof +
          '</td></tr>'
      );
    }
  }
}

function sortPhonesMpx() {
  let amount12Mpix = 0;
  let amount24Mpix = 0;
  let amount48Mpix = 0;
  let amount108Mpix = 0;
  for (let x = 0; x < 100; x++) {
    if (chartsData[x].Brand == brands[slide]) {
      if (chartsData[x].Camera == '12Mpix') {
        amount12Mpix += 1;
      }
      if (chartsData[x].Camera == '24Mpix') {
        amount24Mpix += 1;
      }
      if (chartsData[x].Camera == '48Mpix') {
        amount48Mpix += 1;
      }
      if (chartsData[x].Camera == '108Mpix') {
        amount108Mpix += 1;
      }
      counter++;
    }
  }
  return [amount12Mpix, amount24Mpix, amount48Mpix, amount108Mpix];
}

function sortWaterproofPhones() {
  let countsByYear = {};

  for (let x = 0; x < 100; x++) {
    const year = chartsData[x].Premiere;
    if (chartsData[x].Waterproof) {
      countsByYear[year] = (countsByYear[year] || 0) + 1;
    }
  }
  return countsByYear;
}

function setUpCharts() {
  sortedChart2Data = sortWaterproofPhones();

  myChart1Data = {
    labels: ['12Mpx', '24Mpx', '48Mpx', '108Mpx'],
    datasets: [
      {
        label: 'Mpx',
        data: [0, 0, 0, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(160, 121, 176)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  myChart2data = {
    labels: Object.keys(sortedChart2Data),
    datasets: [
      {
        label: 'Ilość wodoodpornych smartfonów',
        data: Object.values(sortedChart2Data),
        backgroundColor: [
          'rgba(255, 0, 0, 0.2)',
          'rgba(255, 127, 0, 0.2)',
          'rgba(255, 255, 0, 0.2)',
          'rgba(127, 255, 0, 0.2)',
          'rgba(0, 255, 0, 0.2)',
          'rgba(0, 255, 127, 0.2)',
          'rgba(0, 255, 255, 0.2)',
          'rgba(0, 127, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(127, 0, 255, 0.2)',
          'rgba(255, 0, 255, 0.2)',
          'rgba(255, 0, 127, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgba(255, 128, 128, 0.2)',
          'rgba(255, 191, 128, 0.2)',
          'rgba(255, 255, 128, 0.2)',
          'rgba(191, 255, 128, 0.2)',
          'rgba(128, 255, 128, 0.2)',
          'rgba(128, 255, 191, 0.2)',
          'rgba(128, 255, 255, 0.2)',
          'rgba(128, 191, 255, 0.2)',
          'rgba(128, 128, 255, 0.2)',
          'rgba(191, 128, 255, 0.2)',
          'rgba(255, 128, 255, 0.2)',
          'rgba(255, 128, 191, 0.2)',
          'rgba(255, 128, 128, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  myChart1 = new Chart('chart_1', {
    type: 'doughnut',
    data: myChart1Data,
    options: {
      scales: {
        y: {
            beginAtZero: true
          }
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 14
            }
          }
        }
      },
    },
  });

  myChart2 = new Chart('chart_2', {
    type: 'bar',
    data: myChart2data,
    options: {
      scales: {
        y: {
          ticks: {
            color: "white",
            font: {
              size: 18,
            },
            stepSize: 1,
            beginAtZero: true
          }
        },
        x: {
          ticks: {
            color: "white",
            font: {
              size: 14
            },
            stepSize: 1,
            beginAtZero: true
          }
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 14
            }
          }
        }
      },
    },
  });
}

function updateCharts(data) {
  myChart1.data.datasets[0].data = data;
  myChart1.update();
}

$('#carouselExample').on('slid.bs.carousel', function () {
  slide = $('div.active').index();
  $('#data').empty();
  generateRecords(carouselData);
  updateCharts(sortPhonesMpx());
});