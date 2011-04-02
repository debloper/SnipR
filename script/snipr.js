function tabInit() {
	hostKey = getIP(window.parent.location);
	ipApi = "http://api.ipinfodb.com/v2/ip_query.php";
	ipKey = "?key=555040b100942b17a9d199d9759b3b46afa36fa05d6e72408c51cfeaf70d7344";
	ipQuery = "&output=json&timezone=true&callback=sniprJsonpData&ip=";
	queryUrl = ipApi + ipKey + ipQuery + hostKey["IP"] +"&rand="+ Math.random();
	var sniprJsonp = document.createElement('script');
	sniprJsonp.type = "text/javascript";
	sniprJsonp.src = queryUrl;
	document.getElementsByTagName('head')[0].appendChild(sniprJsonp);
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

function sniprJsonpData(info) {
	pushDOM.createNodes(hostKey,info);
	pushDOM.mapInitialize(info.Latitude, info.Longitude);
}

var pushDOM = {
  createNodes: function(arg1, arg2) {
	  pushDOM.pushHostData(arg1);
	  pushDOM.pushLocationData(arg2);
	  pushDOM.pushTimezoneData(arg2);
  },
  
  pushHostData: function(arg) {
		  document.getElementById("hostip").innerHTML = arg.IP;
		  document.getElementById("hosturl").innerHTML = arg.HOST;
  },
  
  pushLocationData: function(args) {
	  document.getElementById("location").innerHTML = args.City + ", " + args.RegionName;
	  document.getElementById("country").innerHTML = args.CountryName + " [" + args.CountryCode + "]";
  },
  
  pushTimezoneData: function(args) {
	  offset = args.Gmtoffset;
	  if(offset<0){ offset *= (-1); }
	  Min = ((offset)-(offset%60))/60;
	  Hr = (Min-(Min%60))/60;
	  Min = Min - Hr*60;
	  if(Hr<10) {Hr = "0"+Hr};
	  if(Min<10) {Min = "0"+Min}
	  HrMin =  Hr + ":" + Min;
	  if(args.Gmtoffset<0) {HrMin = "-" + HrMin}
	  document.getElementById("timezone").innerHTML = args.TimezoneName + " [" + HrMin + "]";
  },
  
  mapInitialize: function(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 10,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }
}