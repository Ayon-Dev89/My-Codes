/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comcpgmaster/master_details/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
