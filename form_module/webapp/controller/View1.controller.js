sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
], (Controller , JSONModel) => {
    "use strict";
    var Array = [];
    var obj ;
    return Controller.extend("com.cpg.form.controller.View1", {
        onInit() {
        //    this.BuildData();
        },
        OnAdd: function(){
var that = this;
        
        // BuildData: function()
        // {
        // debugger;
        // var that = this;
        // var object = {
        //   Name : 'Neha Ji',
        //   Age  : '24',
        //   Gender : 'Male',
        //   Country : 'India',
        //   Phone: '4343433434',
        //   Email : 'ABc@gmail.com'
        // };
        var ServUrl = '/sap/opu/odata/sap/Z4758_ODATA_AYON_SRV';
        var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
        var Ebeln = that.getView().byId('POID').getValue(); 
        oModel.read("/HeaderSet(kunnr='',ebeln='"+Ebeln+"')?$expand=HeadertoItemNP,HeadertoItemNP1",null, null, true, 
            function(oData){
     debugger;
     var oModel = new JSONModel(oData);
     that.getView().setModel(oModel,'FormModel');
        
    //   var oModel = sap.ui.oModel.JSON.JSONModel()
    // var oModel = new JSONModel(oData);
    // that.getView().setModel(oModel,'FormModel');
        },)
    },
        OnAdd1: function()
        {
         debugger;
         var that = this;
         obj= that.getView().getModel('FormModel').oData;
         Array.push(obj);
         var oModelT = new JSONModel(Array);
         that.getView().setModel(oModelT,'FormModelT');
         
        }
    });
});