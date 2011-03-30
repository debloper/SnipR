window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  onLoad: function(event) {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("snipr-overlay");
  },
  
  FxTrigger: function() {
	var host = gBrowser.contentWindow.location.hostname;
	var ips = new Array();
	var DNS = Components.classes['@mozilla.org/network/dns-service;1']
				.getService(Components.interfaces.nsIDNSService)
					.resolve(host, true);
	while (DNS && DNS.hasMore()) { ips.push(DNS.getNextAddrAsString()); }
	ip = ips[0];
	ownerTab = gBrowser.selectedTab;
	sniprTab = gBrowser.addTab("chrome://snipr/content/snipr.xul?"+host+"#"+ip, {referrerURI:gBrowser.currentURI, owner:ownerTab});
	gBrowser.selectedTab = sniprTab;
	},
	
  FnTrigger: function() {
	var host = getBrowser().currentURI.host;
	var ips = new Array();
	var DNS = Components.classes['@mozilla.org/network/dns-service;1']
				.getService(Components.interfaces.nsIDNSService)
					.resolve(host, true);
	while (DNS && DNS.hasMore()) { ips.push(DNS.getNextAddrAsString()); }
	ip = ips[0];
	ownerTab = Browser.selectedTab;
	sniprTab = Browser.addTab("chrome://snipr/content/snipr.xul?"+host+"#"+ip);
	Browser.selectedTab = sniprTab;
	}
};