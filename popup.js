const api_url = "https://codeforces.com/api/contest.list?gym=false";

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "00:";
    var mDisplay = m > 0 ? m + ":" : "00:";
    var sDisplay = s > 0 ? s  : "00";
    return hDisplay + mDisplay + sDisplay; 
}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  if(d > 1){
  	return `${d} days left`;
  }
  else if(d == 1){
  	return `1 day left`;
  }
  return [pad(h), pad(m)].join(':');
}

async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();

    let tab = "";

    if(data["status"] == 'OK'){
    	for (let i = 0; i < data["result"].length; i++) {
	    	let val = data["result"][i];
	    	let duration = secondsToHms(val["durationSeconds"]);
	    	let startTime = new Date(val["startTimeSeconds"] * 1000);
	    	let timeLeft = dhm(-val["relativeTimeSeconds"] * 1000);
	    	if(val["phase"] == "BEFORE"){
	    		tab = `<td>${val["name"]}</td><td>${startTime.toString()}</td><td>${duration}</td><td>${timeLeft}</td></tr>` + tab;
	    	}
	    }
    }
    else{
    	console.log('Error');
    }

    let head = `<table class="table"><thead><tr><th scope="col">Name</th><th scope="col">Start</th><th scope="col">Length</th><th scope="col">Before Start</th></tr></thead><tbody>${tab}</tbody></table>`;
    
    document.getElementById("display_zone").innerHTML = head;
}
// Calling that async function
getapi(api_url);

