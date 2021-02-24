Ext.ns("mail");




mail.init = function(){
    var emailList;

    var emailStore;
    var PersonModel;
    var PersonPic;
    
    Ext.regModel('mailList', {
        fields: ['subject']
    });     

    emailStore = new Ext.data.Store({
        model :'mailList',              
        data:[
                // 공백
        ],
    });     
    
    emailList = new Ext.List({
        id:'emailList',
        title:'내 메일목록',
        store:emailStore,                       
        onItemDisclosure: {
            handler: function(record, btn, index) {
                //MainPanel.layout.setActiveItem(detail.panel_detail); 
                //detail.panel_detail.setUserId(record.get('user_id'));
                //detail.panel_detail.getUserInfo();
                alert('직접 응용해 보세요')                
            }
        },
        itemTpl:'<div><font size="2"><strong>{subject}</strong></font></div>',
    });        

    function setEmailList(Jv_data) {
        emailStore = new Ext.data.Store({
            model :'mailList',
            data:Jv_data,
        });
        Ext.getCmp('emailList').bindStore(emailStore);  
    };


                
    mail.panel_mail = new Ext.Panel({
        useCurrentLocation: true,               
        scroll:'vertical',
        cardSwitchAnimation:"slide",


        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        scroll: 'vertical',
        
        getMailList:function()
        {
            Ext.Ajax.request({
                url: './jsp/mail.jsp',
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    console.log(JsonData);
                    if(JsonData.data.err == "")
                    {
                        setEmailList(JsonData.data.email_list);
                    }
                    else
                    {
                        alert(JsonData.data.err);
                    }
                    
                }
            });         
        },
        //listeners:FormListener,                               
        items:
        [{
            xtype: 'fieldset',
            instructions: 'Email List입니다. ',
            defaults: {
                
                labelAlign: 'left' }
            ,
            items:emailList
        }]
    });
}       