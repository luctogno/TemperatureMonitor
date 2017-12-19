sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		dateFormatBackend: "yyyy-MM-dd'T'hh:mm:ss.SSS'Z'",
		dateFormatDisplay: "dd-MM-yyyy hh:mm:ss"

	};

});