sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",

], (Controller,JSONModel,Filter,FilterOperator) => {
    "use strict";
    var ServUrl = '/sap/opu/odata/sap/ZSD_MASTER_AYON_SRV';
    var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
    return Controller.extend("com.cpg.master.masterdetails.controller.View1", {
        onInit() {
            var that = this;
            oModel.read("/MasterSet?$top=10",null, null, true,
                function(oData){
         debugger;
         var oModel = new JSONModel(oData.results);
         that.getView().setModel(oModel,'MasterModel');
                },)
                oModel.read("/VendorSet?$top=10",null, null, true,
                    function(oData){
             debugger;
             var oModel = new JSONModel(oData.results);
             that.getView().setModel(oModel,'VendorModel');
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
                    var ebeln = oEvnt.oSource.mProperties.title;
                    oModel.read("/HeaderSet(EBELN='"+ebeln+"')?$expand=HeadertoItemNP",null, null, true, 
                        function(oData){
                 debugger;
                 var oModel = new JSONModel(oData);
                 that.getView().setModel(oModel,'FormModel');
                    
            
                    },)
                },
    });
});