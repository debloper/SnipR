window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  firefox: false,
  crosshair: {},
  host: "",

  onLoad: function(event) {
	this.initialized = true;
	this.strings = document.getElementById("snipr-overlay");
	if ( gBrowser ) {
		snipr.firefox = true;
		snipr.crosshair = document.getElementById("snipr-crosshair");
		gBrowser.tabContainer.addEventListener("TabSelect",
			function(event) { snipr.crosshair.value = "SnipR"; }, false);
	}
  },

  resolveHost: function() {
	  if (snipr.firefox) {
		  return gBrowser.contentWindow.location.hostname;
	  } else return getBrowser().currentURI.host;
  },

  renderUrl: function(host,ip,browser) {
	  return "http://debloper.github.com/SnipR/"+browser+".htm?"+host+"#"+ip;
  },

  splitIp: function(a) {
	var IPs = new Array();
	while (a && a.hasMore()) { IPs.push(a.getNextAddrAsString()); }
	return IPs[0];
  },

  label: {
	onLookupComplete : function(a,b,c) {
		if (b) {
			var ip = snipr.splitIp(b);
			snipr.crosshair.value = ip;
		}	else snipr.crosshair.value = "No Network";
	}
  },

  trigger: {
	onLookupComplete : function(a,b,c) {
		if (b) {
			var host = snipr.host, ip = snipr.splitIp(b);
			if (snipr.firefox) {
				gBrowser.selectedTab = gBrowser.addTab(snipr.renderUrl(host,ip,"firefox"),
				{referrerURI:gBrowser.currentURI, owner:gBrowser.selectedTab});
			} else { Browser.selectedTab = Browser.addTab(snipr.renderUrl(host,ip,"fennec")); }
		}
	}
  },

  fire: function(target) {
	snipr.host = snipr.resolveHost();
	var callBack = snipr[target];
	var Cc = Components.classes, Ci = Components.interfaces;
	var theThread = Cc["@mozilla.org/thread-manager;1"]
		.getService(Ci.nsIThreadManager).currentThread;
	try {
		Cc['@mozilla.org/network/dns-service;1'].getService(Ci.nsIDNSService)
		.asyncResolve(snipr.host, true, callBack, theThread);
	} catch (e) { snipr.crosshair.value = "Local Page"; }
  }
};
