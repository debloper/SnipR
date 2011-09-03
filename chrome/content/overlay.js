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

  resolveIP: function(host) {
	var ips = new Array();
	var DNS = Components.classes['@mozilla.org/network/dns-service;1']
				.getService(Components.interfaces.nsIDNSService)
					.resolve(host, true);
	while (DNS && DNS.hasMore()) { ips.push(DNS.getNextAddrAsString()); }
	var ip = ips[0];
	return ip;
  },

  updateLabel: function() {
	var label = document.getElementById("snipr-crosshair");
	if (label.value == "SnipR") {
		try { label.value = snipr.resolveIP(snipr.resolveHost()); }
		catch (e) { label.value = "No Connection or Local Page!" }
	} else { label.value = "SnipR"; }
  }
};
