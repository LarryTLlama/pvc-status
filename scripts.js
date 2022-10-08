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

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
	}

async function getData() {
	$.getJSON( "https://larrytllama.cyclic.app/mojang", function( res ) {
		console.log(res)
		if(res.Status === "OK") {
			document.getElementById('mojang').innerHTML = `<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Auth Servers are online!</h2>`
		} else {
			document.getElementById('mojang').innerHTML = `<h2 style="color: orange;"><i class="fa fa-question-circle-o" aria-hidden="true"></i> No response from Auth Servers</h2>`
		}
	})
	
	await delay(1000)
	
	var bedrock;
	//Get Bedrock JSON
	$.getJSON( "https://larrytllama.cyclic.app/pvc/bedrock", function( data ) {
		console.log('Bedrock');
		console.log(data)
		if(data.online) {
			document.getElementById('bedrock').innerHTML = `<br>
			<h2 id="actualStatus" style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Bedrock is online!</h2>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>Player count: ${data.response.online_players}/${data.response.max_players}</p>
			<p>Version: ${data.response.version}</p>
			<p id="maybe">IP: bedrock.peacefulvanilla.club Port: 19132</p>
			</div>`
			bedrock = true
		} else if(data.online === false) {
			document.getElementById('bedrock').innerHTML = `<br>
			<h2 id="actualStatus" style="color: red;">Bedrock is offline!</h2>
			<p>Here's some cake for now <img src="cake.png" style="height: 30px;"></img>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>${data.response}</p>
			<p>IP: bedrock.peacefulvanilla.club Port: 19132</p>
			</div>`
			bedrock = false
		}
	});

	await delay(1000)
	var java;
	//Get Java JSON
	$.getJSON( "https://larrytllama.cyclic.app/pvc/java", function( res ) {
		console.log('Java');
		//console.log(data);
		let data = res.result
		console.log(data);
		if(res.online === false) {
			document.getElementById('java').innerHTML = `<br>
			<h2 style="color: red;"><i class="fa fa-times-circle" aria-hidden="true"></i> Java is offline!</h2>
			<p>Have a cookie for now <img src="cookie.png" style="height: 30px;"></img>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>${data}</p>
			</div>`
			java = false
		} else if(data.version) {
			document.getElementById('java').innerHTML = `<br>
			<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Java is online!</h2>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p id="maybe2">Player count: ${data.players.online}/${data.players.max}</p>
			<p>MOTD: ${data.motd.html}</p>
			</div>`
			java = true
			
			if(data.players.online === 0) {
			document.getElementById('java').innerHTML = `<br>
			<h2 style="color: orange;"><i class="fa fa-question-circle-o" aria-hidden="true"></i> Java might be online</h2>
			<br>
			<div style="padding-left: 16px; text-align: left;">
			<p>Response:</p>
			<p>Players:<a style="color: orange;"> There aren't any players online! This is probably because players couldn't connect to PVC.</a></p>
			<p>MOTD: ${data.motd.html}</p>
			</div>`
			}
		}
		
		console.log(java);
		if(java === false) {
		console.log('java false')
		if (bedrock === true) {
			console.log('bedrock true')
		const maybe = document.getElementById("maybe")
		if(maybe) {
			maybe.setAttribute('style', 'color: orange;')
			maybe.innerHTML = `Bedrock is stating it is online, whereas the main server is not. This may be incorrect!`
			document.getElementById('actualStatus').innerHTML = `<i class="fa fa-question-circle-o" aria-hidden="true"></i> Bedrock might be online`
			document.getElementById('actualStatus').setAttribute('style', 'color: orange;')
		}
	}
	}
	
	});
	await delay(1000)

players();
	
	
	//await delay(2000)
	
	async function checkServerStatus()
	{
    var img = document.getElementById("pingit");
	//img.setAttribute('style', 'height: 0; width: 0;')
	console.log(img);
	await delay(1000)
    img.onload = function()
    {
		console.log(document.getElementById('website'))
        
    };
    img.onerror = function()
    {
       
    };
    img.src = "https://maps.peacefulvanilla.club/";
}


}


function refresh() {

	timer(function() {
		refresh();
	}, 60000);
	
	getData();
}

window.onload = function() {
	//Start refresh timer
	
	setInterval(function() {
		getData();
	}, 60000);
	
	//Refresh the thingy
	
	getData();
	
	
}

function closePlayerList() {
	document.getElementById('playerList').style.display = 'none';
	document.getElementById('navBarButton').setAttribute('style', 'background-color: green; color: white; float: right; margin: 5px;')
	document.getElementById('navBarButton').setAttribute('onclick', "javascript:openPlayerList()")
	document.getElementById('navBarButton').innerHTML = `<h3>Open Player List</h3>`
}

function openPlayerList() {
	document.getElementById('playerList').style.display = 'block';
	document.getElementById('navBarButton').setAttribute('style', 'background-color: red; color: white; float: right; margin: 5px;')
	document.getElementById('navBarButton').setAttribute('onclick', "javascript:closePlayerList()")
	document.getElementById('navBarButton').innerHTML = `<h3>Close Player List</h3>`
}

function players() {
$.getJSON( "https://larrytllama.cyclic.app/pvc", function( data ) {
	if(data.max) {
	document.getElementById('website').innerHTML = '<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Map is online!</h2>'
	document.getElementById('lePlayers').innerHTML = '<h1 style="padding-left: 16px;">Player List</h1>'
	console.log(data);
	data.players.forEach(function(item, index) {
	document.getElementById('lePlayers').innerHTML += `<button class="playerButton" onclick="javascript:updateSidebar('${item.name}', '${item.uuid}', '${item.x}', '${item.z}', '${item.world}' )">
<img style="float: left;" src="${'https://crafatar.com/renders/head/' + item.uuid}"></img>

<h3>${item.name}</h3>
<p>${item.x}, ${item.z}</p>
<p>${item.world}</p>
</button>`
	})
	} else {
	document.getElementById('website').innerHTML = '<h2 style="color: green;"><i class="fa fa-check-square" aria-hidden="true"></i> Map is online!</h2>'
	document.getElementById('lePlayers').innerHTML = '<h1 style="padding-left: 16px;">The map is currently offline</h1><br><p>Please try again later!</p>'
	}
})
}



function updateSidebar(name, uuid, xcoord, zcoord, world) {
document.getElementById('playerInfo').innerHTML = `
<div id="playerName"><p><strong>${name}</strong></p></div>
<div id="playerSkin"><img src="https://crafatar.com/renders/body/${uuid}"></img></div>
<div id="playerCoords"><img class="image" src="https://minecraft-api.com/api/achivements/map/Coordinates/${xcoord + '..' + zcoord}"></img></div>
<div id="playerWorld"><img class="image" src="https://minecraft-api.com/api/achivements/grass/Dimension/${world}"></img></div>
<div id="playerMap"><a href="https://web.peacefulvanilla.club/maps/#${world};flat;${xcoord},64,${zcoord};3"><button>Open in Pl3xMap</button></a></div>
`
}
