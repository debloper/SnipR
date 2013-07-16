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

	renderUrl: function(host, ip) {
		return "http://code.debs.io/snipr/marksman.htm?"+host+"#"+ip;
	},

	splitIp: function(aRecord) {
		var IPs = new Array();
		while (aRecord && aRecord.hasMore()) { IPs.push(aRecord.getNextAddrAsString()); }
		return IPs[0];
	},

	label: {
		onLookupComplete : function(aRequest, aRecord, aStatus) {
			if (aRecord) {
				var ip = snipr.splitIp(aRecord);
				snipr.crosshair.value = ip;
			}	else snipr.crosshair.value = "No Network";
		}
	},

	trigger: {
		onLookupComplete : function(aRequest, aRecord, aStatus) {
			if (aRecord) {
				var host = snipr.host, ip = snipr.splitIp(aRecord);
				if (snipr.firefox) {
					gBrowser.selectedTab = gBrowser.addTab(
											snipr.renderUrl(host, ip), {
											referrerURI:gBrowser.currentURI,
											owner:gBrowser.selectedTab
										});
				} else Browser.selectedTab = Browser.addTab(snipr.renderUrl(host, ip));
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
