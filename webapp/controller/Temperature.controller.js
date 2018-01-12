sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessagePopover',
	'sap/m/MessagePopoverItem',
	'sap/m/MessageToast'
], function(jQuery, Controller, JSONModel, MessagePopover, MessagePopoverItem, MessageToast) {
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

			jQuery.getJSON("https://hanaallp1942503320trial.hanatrial.ondemand.com/HanaAll/deviceslist/", function(data) {
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
			var url = "https://hanaallp1942503320trial.hanatrial.ondemand.com/HanaAll/devices?named=" + oEvent.getSource().getBindingContext().getObject().device;
			jQuery.getJSON(url, function(data) {
				oModel.setProperty("/messages", data.messages);
			});
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
			
		},
		
		_getDialog : function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("TemperatureMonitor.view.Dialog", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		handleOpenDialog: function () {
			this._getDialog().open();
		},
		
		handleConfirm: function (oEvent) {
			//var oText = this.byId("DTP1");
			//sap.m.MessageToast.show(oText.toString());
			/*var oDTP = oEvent.oSource;
			
			var sValue = oEvent.getParameter("value");
			var bValid = oEvent.getParameter("valid");*/
			//id="DTP1"
			//var oDTP = oEvent.oSource;
			var oView = this.getView();
			var oDialog = oView.byId("DialogDate");
			var Data = oDialog.byId("DTP1");
			sap.m.MessageToast.show(Data.toLocaleString());
			//sap.m.MessageToast.show(this._getDialog().);
			//sap.ui.fragment("DialogDate", "DTP1"); 
			//sap.m.MessageToast.show(this.getView().byId("DTP1").toString());
			this._getDialog().close();
		}
	});
});