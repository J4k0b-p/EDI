let data;
const apiUrl = 'https://my.api.mockaroo.com/edi_project.json?key=655ef660';

$.ajax({
  url: apiUrl,
  method: 'GET',
  dataType: 'json',
  success: function (response) {
    renderContent(response);
    data = response;
  },
  error: function (status, error) {
    console.log('Error:', status, error);
  },
});

const xyValues = [
  { x: 50, y: 7 },
  { x: 60, y: 8 },
  { x: 70, y: 8 },
  { x: 80, y: 9 },
  { x: 90, y: 9 },
  { x: 100, y: 9 },
  { x: 110, y: 10 },
  { x: 120, y: 11 },
  { x: 130, y: 14 },
  { x: 140, y: 14 },
  { x: 150, y: 15 },
];

const data2 = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

new Chart('chart_1', {
  type: 'doughnut',
  data: data2,
});

new Chart('chart_2', {
  type: 'scatter',
  data: {
    datasets: [
      {
        pointRadius: 4,
        pointBackgroundColor: 'rgb(255,255,255)',
        data: xyValues,
      },
    ],
  },
  options: {},
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

$('#carouselExample').on('slid.bs.carousel', function () {
  slide = $('div.active').index();
  $('#data').empty();
  sortRecords();
});
