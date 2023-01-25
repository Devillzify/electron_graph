const { ipcRenderer } = require('electron');
const { Chart } = require("chart.js/auto");
ipcRenderer.send("canvas", "Ready")


ipcRenderer.on('canvas2', (e, args) => {
  const ctx = document.getElementById('myChart');




  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [args[0].linea, args[1].linea, args[2].linea, args[3].linea, args[4].linea, args[5].linea, args[6].linea, args[7].linea],
      datasets: [{
        label: '# of Votes',
        data: [args[0].Code, args[1].Code, args[2].Code, args[3].Code, args[4].Code, args[5].Code, args[6].Code, args[7].Code],
        borderWidth: 3
      }],

    },

  });
});


ipcRenderer.on('canvas3', (e, args) => {
  const ctx = document.getElementById('myChart2');


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [args[0].linea, args[1].linea, args[2].linea, args[3].linea, args[4].linea, args[5].linea, args[6].linea, args[7].linea],
      datasets: [{
        label: '# of Votes',
        data: [args[0].Code, args[1].Code, args[2].Code, args[3].Code, args[4].Code, args[5].Code, args[6].Code, args[7].Code],
        borderWidth: 3
      }]
    },

  });


}

);


ipcRenderer.on('canvas3', (e, args) => {
  const ctx = document.getElementById('myChart3');



  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [args[0].linea, args[1].linea, args[2].linea, args[3].linea, args[4].linea, args[5].linea, args[6].linea, args[7].linea],
      datasets: [{
        label: '# of Votes',
        data: [args[0].Code, args[1].Code, args[2].Code, args[3].Code, args[4].Code, args[5].Code, args[6].Code, args[7].Code],
        borderWidth: 3
      }],

    },

  });
});


function recibirvalor() {
  var opcion = document.getElementById('lang');
  console.log(opcion.value)
  ipcRenderer.send("newquery", opcion.value);
}





