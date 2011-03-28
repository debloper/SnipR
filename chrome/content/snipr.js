var pushDOM = {
  createNodes: function(arg1, arg2) {
	  pushDOM.pushHostData(arg1, arg2);
	  pushDOM.pushLocationData(arg2);
	  pushDOM.pushTimezoneData(arg2);
  },
  
  mapInitialize: function(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 4,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	// I don't quite like the marker, may put it if users demand.
  },
  
  pushHostData: function(arg1, arg2) {
	  if(arg1["IP"]!=""){
		  document.getElementById("hostip").innerHTML = arg1["IP"];
		  document.getElementById("hosturl").innerHTML = arg1["HOST"];
	  } else {
		  document.getElementById("hostip").innerHTML = arg2["Ip"];
		  document.getElementById("hosturl").innerHTML = "Your Location Data";
	  }
  },
  
  pushLocationData: function(args) {
	  document.getElementById("location").innerHTML = args["City"] + ", " + args["RegionName"];
	  document.getElementById("country").innerHTML = args["CountryName"] + " [" + args["CountryCode"] + "]";
  },
  
  pushTimezoneData: function(args) {
	  offset = args["Gmtoffset"];
	  if(offset<0){ offset *= (-1); }
	  Min = ((offset)-(offset%60))/60;
	  Hr = (Min-(Min%60))/60;
	  Min = Min - Hr*60;
	  if(Hr<10) {Hr = "0"+Hr};
	  if(Min<10) {Min = "0"+Min}
	  HrMin =  Hr + ":" + Min;
	  if(args["Gmtoffset"]<0) {HrMin = "-" + HrMin}
	  document.getElementById("timezone").innerHTML = args["TimezoneName"] + " [" + HrMin + "]";
  }
}

function getIP(host) {
	hashedIP = host.hash;
	IP = hashedIP.replace("#","");
	queryHOST = host.search;
	HOST = queryHOST.replace("?","");
	
	host_details = {
		"IP" : IP,
		"HOST" : HOST
	}
	return host_details;
}

function getGeoData(ip) {
	ipApi = "http://api.ipinfodb.com/v2/ip_query.php";
	ipQuery = "?key=555040b100942b17a9d199d9759b3b46afa36fa05d6e72408c51cfeaf70d7344&output=json&timezone=true&ip=";
	queryUrl = ipApi + ipQuery + ip +"&"+ Math.random();
	var XHreq = new XMLHttpRequest();
	XHreq.open("GET", queryUrl, false);
	XHreq.send(null);
	XHreqData = JSON.parse(XHreq.responseText);
	return XHreqData;
}

function tabInit() {
	hostKey = getIP(window.parent.location);
	hostGeoData = getGeoData(hostKey["IP"]);
	pushDOM.mapInitialize(hostGeoData["Latitude"], hostGeoData["Longitude"]);
	pushDOM.createNodes(hostKey,hostGeoData);
}