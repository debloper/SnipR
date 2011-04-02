window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  onLoad: function(event) {
    this.initialized = true;
    this.strings = document.getElementById("snipr-overlay");
  },
  
  FxTrigger: function() {
	var host = gBrowser.contentWindow.location.hostname;
	var ip = snipr.resolveIP(host);
	ownerTab = gBrowser.selectedTab;
	sniprTab = gBrowser.addTab("http://debloper.github.com/SnipR/firefox.htm?"+host+"#"+ip, {referrerURI:gBrowser.currentURI, owner:ownerTab});
	gBrowser.selectedTab = sniprTab;
  },
  
  FnTrigger: function() {
	var host = getBrowser().currentURI.host;
	var ip = snipr.resolveIP(host);
	ownerTab = Browser.selectedTab;
	sniprTab = Browser.addTab("http://debloper.github.com/SnipR/fennec.htm?"+host+"#"+ip);
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
  }
};