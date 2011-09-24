window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);
gBrowser.tabContainer.addEventListener("TabSelect", function(event) { snipr.crosshair.value = "SnipR"; }, false);

var snipr = {
  browser: "",
  crosshair: {},
  host: "",

  onLoad: function(event) {
	this.initialized = true;
	this.strings = document.getElementById("snipr-overlay");
	if ( gBrowser ) {
		snipr.browser = "firefox";
		snipr.crosshair = document.getElementById("snipr-crosshair");
	} else { snipr.browser = "fennec"; }
  },

  resolveHost: function() {
	  if (snipr.browser == "firefox") {
		  return gBrowser.contentWindow.location.hostname;
	  } else return getBrowser().currentURI.host;
  },

  renderUrl: function(host,ip) {
	  return "http://debloper.github.com/SnipR/"+snipr.browser+".htm?"+host+"#"+ip;
  },

  FxTrigger: function() {
	var host = snipr.resolveHost();
	var ip = snipr.resolveIP(host);
	ownerTab = gBrowser.selectedTab;
	sniprTab = gBrowser.addTab(snipr.renderUrl(host,ip), {referrerURI:gBrowser.currentURI, owner:ownerTab});
	gBrowser.selectedTab = sniprTab;
  },

  FnTrigger: function() {
	var host = snipr.resolveHost();
	var ip = snipr.resolveIP(host);
	ownerTab = Browser.selectedTab;
	sniprTab = Browser.addTab(snipr.renderUrl(host,ip));
	Browser.selectedTab = sniprTab;
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
			var ownerTab = gBrowser.selectedTab;
			var sniprTab = gBrowser.addTab(snipr.renderUrl(host,ip), {referrerURI:gBrowser.currentURI, owner:ownerTab});
			gBrowser.selectedTab = sniprTab;
		}	else snipr.crosshair.value = "No Network";
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
