/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comcpgform/form_module/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
