window.addEventListener("load", function(event) { snipr.onLoad(event) }, false);

var snipr = {
  onLoad: function(event) {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("snipr-overlay");
	ipmib = document.getElementById("identity-popup-more-info-button");
	ipmiHbox = ipmib.parentNode;
	ipmiSibling = document.createElement("button");
	ipmiSiblingNode = ipmiHbox.insertBefore(ipmiSibling, ipmib);
	ipmiSiblingNode.setAttribute("id","identity-popup-snipr-info-button");
	ipmiSiblingNode.setAttribute("label","SnipR Information");
	ipmiSiblingNode.setAttribute("oncommand","snipr.onTrigger();");
  },
  
  onTrigger: function() {
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
	}
};