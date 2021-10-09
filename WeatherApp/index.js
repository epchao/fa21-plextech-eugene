const url = "http://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0"
const indicies = {
    start: 0,
    end: 6,
    get getStart() {
      return this.start;
    },
    get getEnd() {
      return this.end;
    },
    set setStart(start) {
      this.start = start;
    },
    set setEnd(end) {
      this.end = end;
    }
}

const btns = ["prev-btn", "next-btn"]

fetch(url)
  .then(res => res.json())
  .then(data => {
    // do something with data
    console.log(data)
    appendWeatherData(data, indicies.getStart, indicies.getEnd)

    document.getElementById("prev-btn").onclick = function(){crementIndicies(data, -1, 6, btns[0])}

    document.getElementById("next-btn").onclick = function(){crementIndicies(data, 1, data.dataseries.length, btns[1])}
  })
  .catch(err => {
    // error catching
    console.log(err)
  })

function appendWeatherData(data, start, end) {
  var table = document.getElementById('data-table')
  table.innerHTML = ""
  for(let i = start; i < end; i++) {
    var row = `<tr>
              <td>${data.dataseries[i].timepoint}</td>
              <td>${data.dataseries[i].cloudcover}</td>
              <td>${data.dataseries[i].seeing}</td>
              <td>${data.dataseries[i].transparency}</td>
              <td>${data.dataseries[i].temp2m}</td>
              </tr>`
        
    table.innerHTML += row
  }
}

function crementIndicies(data, operation, reset, btnid) {
  i = 5 * operation
  indicies.setStart = indicies.getStart + i
  indicies.setEnd = indicies.getEnd + i

  btns.forEach(element => {
    document.getElementById(element).disabled = false
  });

  if(i == 5 && indicies.getEnd > reset){
    document.getElementById(btnid).disabled = true
  }
  else if(i == -5 && indicies.getStart < reset) { 
    document.getElementById(btnid).disabled = true
  }

  appendWeatherData(data, indicies.getStart, indicies.getEnd)
}