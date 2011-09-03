window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  browser: "",

  onLoad: function(event) {
	this.initialized = true;
	this.strings = document.getElementById("snipr-overlay");
	if ( gBrowser ) { snipr.browser = "firefox"; }
	else { snipr.browser = "fennec"; }
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

  dnsListener: {
	onLookupComplete : function(a,b,c) {
		var ips = new Array();
		while (b && b.hasMore()) { ips.push(b.getNextAddrAsString()); }
		var ip = ips[0];
		snipr.updateLabel(ip);
	}
  },

  resolveIP: function(host) {
	var Cc = Components.classes, Ci = Components.interfaces;
	var theThread = Cc["@mozilla.org/thread-manager;1"]
		.getService(Ci.nsIThreadManager).currentThread;
	Cc['@mozilla.org/network/dns-service;1'].getService(Ci.nsIDNSService)
		.asyncResolve(host, true, snipr.dnsListener, theThread);
  },

  updateLabel: function(ip) {
	var label = document.getElementById("snipr-crosshair");
	if (label.value == "SnipR") {
		try { label.value = ip; }
		catch (e) { label.value = "No Connection or Local Page!" }
	} else { label.value = "SnipR"; }
  }
};
