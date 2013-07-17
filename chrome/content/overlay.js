window.addEventListener("load", function(event) {
	if (gBrowser) {
		snipr.desktop = true;
		snipr.crosshair = document.getElementById("snipr-crosshair");
		gBrowser.tabContainer.addEventListener("TabSelect", function(event) {
			snipr.crosshair.value = "SnipR";
		}, false);
	}
}, false);

window.addEventListener("load", function () {
	window.BrowserApp.deck.addEventListener("TabSelect", function () {
		window.NativeWindow.menu.remove(snipr.menu);
		snipr.menu = window.NativeWindow.menu.add("SnipR", null, function () {
			snipr.host = window.BrowserApp.selectedTab.window.location.hostname;
			if (snipr.host) {
				window.NativeWindow.toast.show(snipr.host, "long");
				window.BrowserApp.addTab(snipr.host);
			} else window.NativeWindow.toast.show("Local Page, Sorry!", "long");
		});
	}, false);
}, false);

var snipr = {
	desktop: false,
	crosshair: {},
	host: "",

	resolveHost: function() {
		if (snipr.desktop) {
			return gBrowser.contentWindow.location.hostname;
		} else return "Firefox Mobile";
	},

	renderUrl: function(host, ip) {
		return "http://code.debs.io/snipr/marksman.htm?"+host+"#"+ip;
	},

	splitIp: function(aRecord) {
		var IPs = new Array();
		while (aRecord && aRecord.hasMore())
			IPs.push(aRecord.getNextAddrAsString());
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
				if (snipr.desktop) {
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
		if (target == "label") {
			if (snipr.crosshair.value.split(".").length == 4) return;
			else if (snipr.crosshair.value == "Local Page") return;
			else snipr.crosshair.value = 'Fetching...';
		}

		var callBack = snipr[target]
		,	Cc = Components.classes
		,	Ci = Components.interfaces
		,	theThread = Cc["@mozilla.org/thread-manager;1"]
						.getService(Ci.nsIThreadManager).currentThread;

		snipr.host = snipr.resolveHost();

		try {
			Cc['@mozilla.org/network/dns-service;1'].getService(Ci.nsIDNSService)
			.asyncResolve(snipr.host, true, callBack, theThread);
		} catch (error) { snipr.crosshair.value = "Local Page"; }
	}
};
