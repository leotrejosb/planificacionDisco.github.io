function isValidInputNumbers(requestSequence) {
    for (i = 0; i < requestSequence.length; ++i)
        if (requestSequence[i] > 199 || requestSequence[i] < 0)
            return false;


    return true;
}

function resetResult() {
    let ele = document.getElementById('totalSeekCount');
    ele.innerText = '';
    ele = document.getElementById('chartContainer');
    ele.style.display = 'none';
    ele = document.getElementById("compareBtn");
    ele.style.display = "none";
}

//FCFS

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
//SSTF
function sstf_man(requestSequenceSstf) {
    const len = requestSequenceSstf.length;
  
    // initialize final sequence
    requestFinalOrderSstf = [requestSequenceSstf[0]];
    requestSequenceSstf.shift(0);
    console.log(requestSequenceSstf[0]);
    // initialize total seek time
    totalSeekCountSstf = 0;
  
    for (i = 0; i < len-1; ++i) {
  
      // array of difference of sequence nummbers
      let tmp = [];
      for (j = 0; j < requestSequenceSstf.length; ++j)
        tmp.push(Math.abs( requestFinalOrderSstf[requestFinalOrderSstf.length - 1] - requestSequenceSstf[j]));
  
  
      // gets the mininum value from tmp[]
      var minIndex = tmp.indexOf(Math.min.apply(null, tmp));
      //requestFinalOrderSstf.shift();
      // add minimum value -> final sequence
      totalSeekCountSstf += tmp[minIndex];
      requestFinalOrderSstf.push(requestSequenceSstf[minIndex]);
      
      // delete the value pushed to final sequence from request sequence
      requestSequenceSstf.splice(minIndex, 1);
    }
    
    // returns an array with two elements (int, array)
    return [totalSeekCountSstf, requestFinalOrderSstf];
  }

function comparison_click_from_algo() {
    let requestSequenceComparison = document.getElementById("Sequence").value;

    let direction = document.getElementById("Direction").value;
    requestSequenceComparison = requestSequenceComparison
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        });

    if (requestSequenceComparison.length === 0) {
        alert("invalid input!!!");
        return;
    }

    for (i = 0; i < requestSequenceComparison.length; ++i) {
        if (!Number.isInteger(+requestSequenceComparison[i]) || !(+requestSequenceComparison[i] >= 0)) {
            alert("invalid input!!! Only integer values are valid");
            return;
        }
    }

    requestSequenceComparison = requestSequenceComparison
        .toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        })
        .map(function (a) {
            return +a;
        });
    if (!isValidInputNumbers(requestSequenceComparison)) {
        alert("invalid input!!! Integral value(x) should be in the range 0<=x<=199");
        return;
    }

    ary = [];
    bry = [[]];
    cry = [];

    requestSequenceFcfs = requestSequenceComparison.slice();
    requestSequenceSstf = requestSequenceComparison.slice();


    resultFcfs = fcfs_man(requestSequenceFcfs);
    resultSstf = sstf_man(requestSequenceSstf);



    let ele1 = document.getElementById("fcfs_totalSeekCount");
    ele1.innerText = resultFcfs[0];
    let ele2 = document.getElementById("sstf_totalSeekCount");
    ele2.innerText = resultSstf[0];


    min_ary = []
    min_ary.push(resultFcfs[0]);
    min_ary.push(resultSstf[0]);

    let minimum = min_ary[0];
    for (let i = 1; i < min_ary.length; ++i){
        if(min_ary[i] < minimum){
            minimum = min_ary[i];
        }
    }

    let ele7 = document.getElementById("minimum_SeekCount");
    ele7.innerText = minimum;

    ele = document.getElementById("chartContainer");
    ele.style.display = "block";

    ary.push(resultFcfs[1]);
    ary.push(resultSstf[1]);

  
    i = 0;
    ary.forEach(function (p)
    {
        p.forEach(function (q) 
        {
            bry[i].push({ y: q });
        });
        if (i !== 6) {
            bry.push([]);
            ++i;
        }
    });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 5000,
        theme: "light2",
        zoomEnabled: true,
        title: {
            text: "Comparison Chart",
        },
        axisY: {
            title: "Disk Numbers",
            titleFontColor: "rgb(0,0,0)",
        },
        axisX: {
            title: "Request sequence",
            titleFontColor: "rgb(0,0,0)",
            minimum: 0,
            interval: 1
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: function (e) {
                if (
                    typeof e.dataSeries.visible === "undefined" ||
                    e.dataSeries.visible
                ) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            },
            //itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true,
        },
        data: [
            {
                type: "line",
                lineColor: "#85ff6e",
                indexLabelFontSize: 16,
                name: "FCFS",
                showInLegend: true,
                dataPoints: bry[0],
            },
            {
                type: "line",
                lineColor: "#0b3bfc",
                indexLabelFontSize: 16,
                name: "SSTF",
                showInLegend: true,
                dataPoints: bry[1],
            },

        ],
    });
    chart.render();
    document.getElementById("chartContainer2").style.display = "block";
    document.getElementById("title").innerText = title;
    document.getElementById("title").style.display = "block";
    document.getElementById("answers").innerText = ans;
    document.getElementById("answers").style.display = "block";
}
