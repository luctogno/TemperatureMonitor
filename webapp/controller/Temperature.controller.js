sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessagePopover',
	'sap/m/MessagePopoverItem'
], function(jQuery, Controller, JSONModel, MessagePopover, MessagePopoverItem) {
	"use strict";
	return Controller.extend("TemperatureMonitor.controller.Temperature", {
		/**
		 *@memberOf TemperatureMonitor.controller.Temperature
		 */
		 
		 //https://hanaallp1942503320trial.hanatrial.ondemand.com/HanaAll/deviceslist
		onInit: function() {
			var that = this;
			var oModel = new JSONModel({}) ;
			that.getView().setModel(oModel);

			jQuery.getJSON("https://hanaallp1942503320trial.hanatrial.ondemand.com/HanaAll/deviceslist", function(data) {
				oModel.setProperty("/devices", data.devices);
			});
			
			var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
			var oMessageManager = sap.ui.getCore().getMessageManager();

			oMessageManager.registerMessageProcessor(oMessageProcessor);

			oMessageManager.addMessages(
				new sap.ui.core.message.Message({
					message: "Something wrong happened",
					type: sap.ui.core.MessageType.Error,
					processor: oMessageProcessor
				})
			);
		},
		
		
		onPress: function(oEvent) {
			var that = this;
			var oModel = that.getView().getModel();
			console.log("ciao");
			var url = "https://hanaallp1942503320trial.hanatrial.ondemand.com/HanaAll/devices?named=" + oEvent.getSource().getId();
			jQuery.getJSON(url, function(data) {
				oModel.setProperty("/messages", data.messages);
			});
			
			sap.m.MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
		},
		onSemanticButtonPress: function(oEvent) {

			var sAction = oEvent.getSource().getMetadata().getName();
			sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

			sap.m.MessageToast.show("Pressed: " + sAction);
		},
		onSemanticSelectChange: function(oEvent, oData) {
			var sAction = oEvent.getSource().getMetadata().getName();
			sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

			var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
			sap.m.MessageToast.show("Selected: " + sStatusText);
		},
		onPositionChange: function(oEvent) {
			sap.m.MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
		},
		onMessagesButtonPress: function(oEvent) {

			var oMessagesButton = oEvent.getSource();
			if (!this._messagePopover) {
				this._messagePopover = new MessagePopover({
					items: {
						path: "message>/",
						template: new MessagePopoverItem({
							description: "{message>description}",
							type: "{message>type}",
							title: "{message>message}"
						})
					}
				});
				oMessagesButton.addDependent(this._messagePopover);
			}
			this._messagePopover.toggle(oMessagesButton);
		},
		onSemanticButtonPressSeeChart: function(oEvent) {
			
		}
	});
});