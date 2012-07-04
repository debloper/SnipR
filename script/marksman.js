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
	}
};

var DOM = {
	createNodes: function(arg1, arg2) {
		DOM.pushHostName(arg1);
		DOM.pushLocation(arg2);
		DOM.pushTimezone(arg2);
	},

	pushHostName: function(arg) {
		document.getElementById("hostip").innerHTML = arg.IP;
		document.getElementById("hosturl").innerHTML = arg.HOST;
	},

	pushLocation: function(args) {
		document.getElementById("location").innerHTML = args.City + ", " + args.RegionName;
		document.getElementById("country").innerHTML = args.CountryName + " [" + args.CountryCode + "]";
	},

	pushTimezone: function(args) {
		var offset = Math.abs(args.Gmtoffset)
		,	Min = Math.floor(offset/60)
		,	Hr = Math.floor(Min/60);

		Min = (Min - (Hr * 60));
		if ( Hr < 10 ) { Hr = "0" + Hr; }
		if ( args.Gmtoffset < 0 ) { Hr = "-" + Hr; }
		if ( Min < 10 ) { Min = "0" + Min }

		document.getElementById("timezone").innerHTML = args.TimezoneName + " [" + Hr + ":" + Min + "]";
	},

	initMap: function(lat, lng) {
		var latlng = new google.maps.LatLng(lat, lng)
		,	myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		new google.maps.Map(document.getElementById("Gmap"), myOptions);
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
