function isValidInputNumbers(requestSequence) {
  for (i = 0; i < requestSequence.length; ++i) 
    if (requestSequence[i] > 199 || requestSequence[i] < 0) 
      return false;
    

  return true;
}

// ---------- Main Algorithm ---------------
// ---------- Time Complexity O (length) ----------

function fcfs_man(requestSequenceFcfs) {
  // array with starting element headFcfs
  requestFinalOrderFcfs = [];
  for (i = 0; i < requestSequenceFcfs.length; ++i) {
    requestFinalOrderFcfs.push(requestSequenceFcfs[i]);
  }
  let totalSeekCountFcfs = Math.abs(requestSequenceFcfs[0]);
  for (i = 1; i < requestSequenceFcfs.length; ++i) {
    totalSeekCountFcfs += Math.abs(
      requestSequenceFcfs[i] - requestSequenceFcfs[i - 1]
    );
  }
  // returns an array with two elements (int, array)
  return [totalSeekCountFcfs, requestFinalOrderFcfs];
}

// Reset to empty and none
function resetFcfsResult() {
  let ele = document.getElementById('fcfs_totalSeekCount');
  ele.innerText = '';
  ele = document.getElementById('fcfs_finalOrder');
  ele.innerText = '';

  ele = document.getElementById('chartContainer');
  ele.style.display = 'none';
}

function fcfs_click() {
  // initialise the inputs
  let requestSequenceFcfs = document.getElementById("Sequence").value;
  requestSequenceFcfs = requestSequenceFcfs
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });
  if (requestSequenceFcfs.length === 0) {
    alert("Entrada inválida!!!");
    return;
  }

  for (i = 0; i < requestSequenceFcfs.length; ++i) {
    if (!Number.isInteger(+requestSequenceFcfs[i])) {
      alert("Entrada inválida!!! Solo números enteros");
      return;
    }
  }


  requestSequenceFcfs = requestSequenceFcfs.toString()
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    }).map(function (a) { return +a; });

  if (!isValidInputNumbers(requestSequenceFcfs)) {
    alert(
      "Entrada inválida!!! El valor x debe estar entre 0<=x<=199"
    );
    return;
  }

  // get result from sequence (array)
  const result = fcfs_man(requestSequenceFcfs);

  let ele = document.getElementById('fcfs_totalSeekCount');
  ele.innerText = result[0];
  
  ele = document.getElementById('fcfs_finalOrder');
  ele.innerText = '';
  for (h = 0; h < result[1].length; ++h) {
    if (h % 6 === 0 && h !== result[1].length - 1) {
      ele.innerText += "\n";
    }
    if (h !== result[1].length - 1) {
      ele.innerText += result[1][h] + ", ";
      continue;
    }
    
    ele.innerText += result[1][h];
  }


  
  ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

  const ary = [];

  result[1].forEach(function (p, index) {
    ary.push({ y: index, x: p });
  });

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    animationDuration: 300 * (ary.length - 1),
    theme: "light2",
    zoomEnabled: true,
    title: {
      text: ""
    },
    axisX: {
      title: "Número de Discos",
      titleFontColor: "rgb(0,0,0)",
      minimum: 0,
      interval: 2
    },
    axisY: {
      title: "Secuencia de Peticiones",
      titleFontColor: "rgb(0,0,0)"

    },
    data: [{
      type: "line",
      indexLabelFontSize: 16,
      dataPoints:  ary
    }]
  });
  chart.render();

  let modal = document.getElementById("myModal");

  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  }
}