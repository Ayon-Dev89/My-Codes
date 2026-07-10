
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/TextArea",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/MessageBox"

], (Controller,JSONModel,Filter,FilterOperator,TextArea,Dialog,Button,MessageBox) => {
    "use strict";
    var ServUrl = '/sap/opu/odata/sap/ZSD_MASTER_AYON1_SRV/';
    var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
    var ebeln;
    return Controller.extend("com.cpg.master.master.controller.View1", {
        onInit() {
            var that = this;
            oModel.read("/MasterSet?$top=10",null, null, true,
                function(oData){
         debugger;
         var oModel = new JSONModel(oData.results);
         that.getView().setModel(oModel,'MasterModel');
                },)
        },


            onSearch: function (oEvent) {
                // add filter for search
                debugger;
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("EBELN", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // // update list binding
                var oList = this.byId("Master");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "MasterModel");
            },




        onMasterPress: function(oEvnt){
            var that = this;
                    debugger;
            
                    // var ServUrl = '/sap/opu/odata/sap/ZSD_MASTER_AYON_SRV';
                    // var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
                    // var ebeln = that.getView().byId('EBELN').getValue(); 
                    ebeln = oEvnt.oSource.mProperties.title;
                    oModel.read("/HeaderSet(EBELN='"+ebeln+"')?$expand=HeadertoItemNP",null, null, true, 
                        function(oData){
                 debugger;
                 var oModel = new JSONModel(oData);
                 that.getView().setModel(oModel,'FormModel');
                    
            
                    },)
                },


                OnApprove: function()
                {
                    var that = this;
                 
                    if (!that.oApproveDialog) {
                        that.oApproveDialog = new Dialog({
                            title: "Approval Comment",
                            // type: DialogType.Message,
                            content: [
                                new TextArea({
                                    width: "100%",
                                    id:'TEXTID',
                                    value: "",
                                    placeholder: "Approval Comment"
                                })
                            ],
                            beginButton: new Button({
                                // type: ButtonType.Emphasized,
                                text: "OK",
                                press: function () {
                                    debugger;
                                    that.oApproveDialog.close();
                                    var MESSAGE = new sap.ui.getCore().byId('TEXTID').mProperties.value;
                                    
                                    debugger;
                                    // MESSAGE = sap.ui.getCore().getModel("FormModel").oData.MESSAGE;
                                    if (MESSAGE == "") {
                                        MessageBox.error("Please Enter Comments !!");
                                        return;
                                        
                                    }
                                    // sap.ui.getCore().getModel("Eheader").oData.Email = Email; //SKUNDU 19Sep23
                                    that.AutoFarward(MESSAGE);
                                    sap.ui.getCore().byId('TEXTID').setValue('');
                                    // that.oApproveDialog.close();
                                }.bind(that)
                            }),
                            endButton: new Button({
                                text: "Cancel",
                                press: function () {
                                    that.oApproveDialog.close();
                                    sap.ui.getCore().byId('TEXTID').setValue('');
                                }.bind(that)
                            })
                        });
                }
                that.oApproveDialog.open();
                },
                 
                  AutoFarward: function(e)
                {
                      var that = this;
                    debugger;
                    var Array = [];
                    // var ID1 =this.getView().byId("id").mProperties.value;
                   var obj = {
                       EBELN: ebeln,
                       FLAG: 'C',
                       MESSAGE: e
                   }
                   Array.push(obj);
                   var Payload = {
                       HeadertoItemNP: Array
                   }
                   var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
                   oModel.create("/HeaderSet", Payload, {
                       method: "POST",
                       success: function (data) {
                           alert("success");
                       },
                       error: function (e) {
                           alert("error");
                       },
                       
                   });
                       
                 
                 
                 
                },


                OnReject: function()
                {
                    var that = this;
                 
                    if (!that.oApproveDialog) {
                        that.oApproveDialog = new Dialog({
                            title: "Approval Comment",
                            // type: DialogType.Message,
                            content: [
                                new TextArea({
                                    width: "100%",
                                    id:'TEXTID',
                                    value: "",
                                    placeholder: "Approval Comment"
                                })
                            ],
                            beginButton: new Button({
                                // type: ButtonType.Emphasized,
                                text: "OK",
                                press: function () {
                                    debugger;
                                    that.oApproveDialog.close();
                                    var MESSAGE = new sap.ui.getCore().byId('TEXTID').mProperties.value;
                                    
                                    debugger;
                                    // MESSAGE = sap.ui.getCore().getModel("FormModel").oData.MESSAGE;
                                    if (MESSAGE == "") {
                                        MessageBox.error("Please Enter Comments !!");
                                        return;
                                        
                                    }
                                    // sap.ui.getCore().getModel("Eheader").oData.Email = Email; //SKUNDU 19Sep23
                                    that.AutoFarward(MESSAGE);
                                    sap.ui.getCore().byId('TEXTID').setValue('');
                                    // that.oApproveDialog.close();
                                }.bind(that)
                            }),
                            endButton: new Button({
                                text: "Cancel",
                                press: function () {
                                    that.oApproveDialog.close();
                                    sap.ui.getCore().byId('TEXTID').setValue('');
                                }.bind(that)
                            })
                        });
                }
                that.oApproveDialog.open();
                },
                 
                  AutoFarward: function(e)
                {
                      var that = this;
                    debugger;
                    var Array = [];
                    // var ID1 =this.getView().byId("id").mProperties.value;
                    var obj = {
                        EBELN: ebeln,
                        FLAG: 'C',
                        MESSAGE: e
                    }
                   Array.push(obj);
                   var Payload = {
                       HeadertoItemNP: Array
                   }
                   var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
                   oModel.create("/HeaderSet", Payload, {
                       method: "POST",
                       success: function (data) {
                           alert("success");
                       },
                       error: function (e) {
                           alert("error");
                       },
                       
                   });
                       
                 
                 
                 
                },


    });
});