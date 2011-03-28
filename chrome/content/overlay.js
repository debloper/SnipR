window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  onLoad: function(event) {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("snipr-overlay");
	var isMobile = navigator.userAgent.indexOf('Fennec');
	if(isMobile == -1) {
		ipmib = document.getElementById("identity-popup-more-info-button");
		ipmiHbox = ipmib.parentNode;
		ipmiHbox.setAttribute("id","identity-popup-more-info");
		ipmiSibling = document.createElement("button");
		ipmiSiblingNode = ipmiHbox.insertBefore(ipmiSibling, ipmib);
		ipmiSiblingNode.setAttribute("id","identity-popup-snipr-info-button");
		ipmiSiblingNode.setAttribute("label","SnipR Information");
		ipmiSiblingNode.setAttribute("oncommand","snipr.firefoxTrigger();");
	}
  },
  
  firefoxTrigger: function() {
	var host = gBrowser.contentWindow.location.hostname;
	var ips = new Array();
	var DNS = Components.classes['@mozilla.org/network/dns-service;1']
				.getService(Components.interfaces.nsIDNSService)
					.resolve(host, true);
	while (DNS && DNS.hasMore()) { ips.push(DNS.getNextAddrAsString()); }
	ip = ips[0];
	ownerTab = gBrowser.selectedTab;
	//XULBrowserWindow.inContentWhitelist.push("chrome://snipr/content/snipr.xul");
	sniprTab = gBrowser.addTab("chrome://snipr/content/snipr.xul?"+host+"#"+ip, {referrerURI:gBrowser.currentURI, owner:ownerTab});
	gBrowser.selectedTab = sniprTab;
	},
  
  fennecTrigger: function() {
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