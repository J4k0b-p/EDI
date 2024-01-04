let data;
let rawData;
const apiUrl = 'https://my.api.mockaroo.com/edi_project.json?key=655ef660';

$.ajax({
  url: apiUrl,
  method: 'GET',
  dataType: 'json',
  success: function (response) {
    renderContent(response);
    data = response;
    rawData = response;
  },
  error: function (status, error) {
    console.log('Error:', status, error);
  },
});

let slide = 0;
brands = ['Apple', 'Huawei', 'Motorola', 'Samsung', 'Xiaomi'];
let counter = 0;

function renderContent(data) {
  for (let x = 0; x < 100; x++) {
    if (data[x].Brand == brands[slide]) {
      $('#data').append('<tr class="tr-' + counter + '"></tr>');
      $('.tr-' + counter).append(
        '<td>' +
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
          '</td>'
      );
      counter++;
    }
  }
}

function sortRecords() {
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

// Nie dziala mi wyswietlenie za pierwszym razem, chlopaki spojrzcie pls
function sortPhonesMpx(data) {
  let amount12Mpix= 0;
  let amount24Mpix= 0;
  let amount48Mpix= 0;
  let amount108Mpix= 0;
  for (let x = 0; x < 100; x++) {
    if (data[x].Brand == brands[slide]) {
      if(data[x].Camera == "12Mpix"){
        amount12Mpix += 1;
      }
      if(data[x].Camera == "24Mpix"){
        amount24Mpix += 1;
      }
      if(data[x].Camera == "48Mpix"){
        amount48Mpix += 1;
      }
      if(data[x].Camera == "108Mpix"){
        amount108Mpix += 1;
      }
      counter++;
    }
  }
  return [amount12Mpix, amount24Mpix, amount48Mpix, amount108Mpix]
}

const myChart1Data = {
  labels: ['12Mpx', '24Mpx', '48Mpx', '108Mpx'],
  datasets: [
    {
      label: "Mpx",
      data: [0,0,0,0],
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

const myChart2data = {
  labels: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023],
  datasets: [{
    label: 'Ilość wodoodpornych smartfonów',
    data: [65, 59, 80, 81, 56, 55,40,40,11,10,11,23,24],
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
      'rgba(255, 0, 0, 0.2)'
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
      'rgba(255, 128, 128, 0.2)'
    ],
    borderWidth: 1,
    
  }]};

let myChart1 = new Chart('chart_1', {
  type: 'doughnut',
  data: myChart1Data,
});

 let myChart2 = new Chart('chart_2', {
  type: 'bar',
  data: myChart2data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
});

function updateCharts(){
  myChart1.data.datasets[0].data = sortPhonesMpx(rawData);
  myChart1.update()
  //do zrobienia update drugiego
}

$('#carouselExample').on('slid.bs.carousel', function () {
  slide = $('div.active').index();
  $('#data').empty();
  sortRecords();
  updateCharts();
});
