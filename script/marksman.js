var snipr = {
	target: {},

	getIP: function(target) {
		var IP = target.hash.replace("#","")
		,	HOST = target.search.replace("?","");

		return {
			"IP" : IP,
			"HOST" : HOST
		}
	},

	processResponse:  function(info) {
		DOM.createNodes(snipr.target, info);
		DOM.initMap(info.Latitude, info.Longitude);
		DOM.initWhois("show");
	}
};

var DOM = {
	createNodes: function(arg1, arg2) {
		DOM.pushHostName(arg1);
		DOM.pushLocation(arg2);
		DOM.pushTimezone(arg2);
	},

	pushHostName: function(arg) {
		var whois = 'Expand <span id="showWhoIs">whois</span> ' +
					'data (or, <a href="http://whoiz.herokuapp.com/lookup?url=' +
					arg.HOST + '" target="_blank">open in a new tab</a>)';
		document.getElementById("whois").innerHTML = whois;
		document.getElementById("hostip").innerHTML = arg.IP;
		document.getElementById("hosturl").innerHTML = arg.HOST;
	},

	pushLocation: function(arg) {
		document.getElementById("location").innerHTML = arg.City + ", " + arg.RegionName;
		document.getElementById("country").innerHTML = arg.CountryName + " [" + arg.CountryCode + "]";
	},

	pushTimezone: function(arg) {
		var offset = Math.abs(arg.Gmtoffset)
		,	Min = Math.floor(offset/60)
		,	Hr = Math.floor(Min/60);

		Min = (Min - (Hr * 60));
		if ( Hr < 10 ) { Hr = "0" + Hr; }
		if ( arg.Gmtoffset < 0 ) { Hr = "-" + Hr; }
		if ( Min < 10 ) { Min = "0" + Min }

		document.getElementById("timezone").innerHTML = arg.TimezoneName + " [" + Hr + ":" + Min + "]";
	},

	initMap: function(lat, lng) {
		var latlng = new google.maps.LatLng(lat, lng)
		,	myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		new google.maps.Map(document.getElementById("Gmap"), myOptions);
	},

	initWhois: function(option) {
		var trigger = document.getElementById("showWhoIs");
		if ( option == "show" ) {
			trigger.removeEventListener("click", DOM.hideWhois);
			trigger.addEventListener("click", DOM.showWhois);
		} else if ( option == "hide" ) {
			trigger.removeEventListener("click", DOM.showWhois);
			trigger.addEventListener("click", DOM.hideWhois);
		}
	},

	showWhois: function() {
		var container = document.getElementById("iam");
		if (!container.innerHTML) {
			var xhr = new XMLHttpRequest()
			,	url = "http://whoiz.herokuapp.com/lookup.json?url=" + snipr.target.HOST;
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200)
					container.innerHTML = JSON.parse(xhr.responseText);
			};
			xhr.open('GET', url);
			xhr.send();
		}
		container.style.display = "block";
		DOM.initWhois("hide");
	},

	hideWhois: function() {
		document.getElementById("iam").style.display = "none";
		DOM.initWhois("show");
	}
};

(function() {
	snipr.target = snipr.getIP(window.parent.location);

	var ipApi = "http://api.ipinfodb.com/v2/ip_query.php"
	,	ipKey = "?key=4446346aef4454ce2826b0121ae23e1d29dabfe57cc8d97b678136769ab9a270"
	,	ipQuery = "&output=json&timezone=true&callback=snipr.processResponse&ip=";

	var jsonp = document.createElement('script');
	jsonp.src = ipApi + ipKey + ipQuery + snipr.target["IP"] +"&rand="+ Math.random();
	document.getElementsByTagName('head')[0].appendChild(jsonp);
})();
