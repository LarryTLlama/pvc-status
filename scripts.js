function timer(callback, delay) {
    var id, started, remaining = delay, running

    timer.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    timer.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    timer.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    timer.getStateRunning = function() {
        return running
    }

    timer.start()
}

async function getData() {
	function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
	}

	//Get Bedrock JSON
	$.getJSON( "https://api.mcstatus.io/v1/status/bedrock/bedrock.peacefulvanilla.club", function( data ) {
		console.log('Bedrock');
		console.log(data)
		if(data.online) {
			document.getElementById('bedrock').innerHTML = `<br>
			<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Bedrock is online!</h2>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>Player count: ${data.response.online_players}/${data.response.max_players}</p>
			<p>Version: ${data.response.version}</p>
			<p>IP: bedrock.peacefulvanilla.club Port: 19132</p>
			</div>`
		} else if(data.online === false) {
			document.getElementById('bedrock').innerHTML = `<br>
			<h2 style="color: red;">Bedrock is offline!</h2>
			<p>Here's some cake for now <img src="cake.png" style="height: 30px;"></img>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>${data.response}</p>
			<p>IP: bedrock.peacefulvanilla.club Port: 19132</p>
			</div>`
		}
	});

	await delay(2000)
	
	//Get Java JSON
	$.getJSON( "https://api.mcstatus.io/v1/status/java/mc.peacefulvanilla.club", function( data ) {
		console.log('Java');
		console.log(data);
		
		if(data.online) {
			document.getElementById('java').innerHTML = `<br>
			<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Java is online!</h2>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>Player count: ${data.response.players.online}/${data.response.players.max}</p>
			<p>MOTD: ${data.response.motd.html}</p>
			</div>`
			document.getElementById('playerCount').innerHTML = data.response.players.online;
		} else if(data.online === false) {
			document.getElementById('java').innerHTML = `<br>
			<h2 style="color: red;"><i class="fa fa-times-circle" aria-hidden="true"></i> Java is offline!</h2>
			<p>Have a cookie for now <img src="cookie.png" style="height: 30px;"></img>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>${data.response}</p>
			</div>`
			document.getElementById('playerCount').innerHTML = 0;
		}
	});
	
	await delay(2000)
	
	//Dynmap Status
	 $.ajax({url: "https://web.peacefulvanilla.club/maps/", success: function(result){
    console.log(result);
  }});
}

function refresh() {

	timer(function() {
		refresh();
	}, 60000);
	
	setInterval(function() {
		document.getElementById('timerLeft').innerHTML = `${timer.getTimeLeft() / 1000}.`.split(".")[0]
	}, 1000);
	
	getData();
}

window.onload = function() {
	//Start refresh timer
	
	timer(function() {
		refresh();
	}, 60000);
	
	setInterval(function() {
		document.getElementById('timerLeft').innerHTML = `${timer.getTimeLeft() / 1000}.`.split(".")[0]
	}, 1000);
	//Refresh the thingy
	
	getData();
}