Ext.ns("talking");

talking.init = function() {
        
    var snsList;
    var snsStore;
    var snsProxy;
    
    Ext.regModel('snss', {
        fields: ['num', 'content', 'user_name','user_img','reg_kind','talking_img','reg_date']
    });            

    snsStore = new Ext.data.Store({
        autoLoad:true,
        model:'snss',
        data:[
        ],
    });
 
    var itemTemplate = new Ext.XTemplate(
        
        '<tpl for=".">',            
            '<tpl if="reg_kind==\'1\'">',
            '<div><small><table width="100%"><tr><td rowspan="2" width="20%"><img src=' + "./user_img/{user_img}" + ' width="45"><BR><font size="2">{user_name}</font></td><td><div align="left"><font size="2">{content}</font></div></td></tr><tr><td><div align="right"> <font size="2"> {reg_date}</font></div></td></tr></table></div>',            
            '</tpl>',
            '<tpl if="reg_kind==\'2\'">',
            '<div><small><table width="100%"><tr><td rowspan="2"  width="20%"><img src="./user_img/{user_img}" width="45" ><BR><font size="2">{user_name}</font></td><td><div align="left"><font size="2">{content}</font></div><br><center><img src="./talking_img/{talking_img}" height="60"></center></td></tr><tr><td><div align="right"><font size="2">{reg_date}</font></div></td></tr></table></div>',            
            '</tpl>',            
        '</tpl>'
    );
    
    snsList = new Ext.List({
        height:'400',
        scroll:'vertical',
        store:snsStore,
        blockRefresh:true,
        onItemDisclosure: false,
        itemTpl:itemTemplate,
    });

    talking.panel = new Ext.Panel({
        layout: 'auto',         
        getRankingList:function(snss) {
            
            snsStore = new Ext.data.Store({
                model:'snss',
                data:snss
            });
            
            console.log(snsStore);
            snsList.bindStore(snsStore);  
  
        },
        
        refreshAll:function() {
            common.talking.setNum(0);
            console.log(":::" +  common.talking.getNum());
            Ext.Ajax.request({
                
                url: './jsp/sns_talking_list.jsp?num=' + common.talking.getNum(),
                success: function(response, opts) {
                    console.log(response.responseText);
                    var JsonData = JSON.parse(response.responseText);
                    max_num =0;
                    for( i=0; i< JsonData.data.snss.length; i++)
                    {
                        snsStore.add(JsonData.data.snss[i]);

                        if(max_num < JsonData.data.snss[i].num)
                        {
                            max_num = JsonData.data.snss[i].num;
                        }
                    }
                    if(max_num > common.talking.getNum())
                    {
                        common.talking.setNum(max_num);
                    }
                    talking.panel.getRankingList(JsonData.data.snss);
                }
            });  
            setTimeout("talking.panel.refreshAll()", 30000)            
        },  
        /*      
        refreshList:function() {
            console.log(common.talking.getNum());
            Ext.Ajax.request({
                url: './jsp/sns_talking_list.jsp?num=' + common.talking.getNum(),
                success: function(response, opts) {
                    //console.log(response.responseText)
                    var JsonData = JSON.parse(response.responseText);
                    if(JsonData.data.err=="")
                    {                    
                        max_num =0;
                        for( i=0; i< JsonData.data.snss.length; i++)
                        {
                            snsStore.add(JsonData.data.snss[i]);
                            if(common.talking.getNum() < JsonData.data.snss[i].num)
                            {
                                common.talking.setNum(JsonData.data.snss[i].num);
                            }
                        }
                        if(max_num > common.talking.getNum())
                        {
                            common.talking.setNum(max_num);
                        }
                        talking.panel.getRankingList(JsonData.data.snss);
                    }
                }
            });  
            setTimeout("talking.panel.refreshList()", 30000)
        },
        */
        insertData:function(snss) {
            snsStore.insert(0,JsonData.data.snss);
        },       
        items:
        [
        {
            
            xtype:'fieldset',
            items:[
            {
                xtype:'spacer',
                height:15,
            },
            snsList,
            {
                xtype:'spacer',
                height:15,
            }
            ]
        }],

        dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',     
            //id:'main.talking_toolbar',    

            layout: {
                type: 'hbox',
                pack: 'center',                
            },  
            items:[{
                xtype:'button',
                text:'글등록',
                handler:function()
                {
                    main.panel.layout.setActiveItem(reg_talking.panel);
                }
            },{ 
                   xtype:'spacer',width:'10%'
            },{
                xtype:'button',
                text:'사진등록',
                handler:function()
                {
                    upload_talking.init();
                    main.panel.layout.setActiveItem(upload_talking.panel);
                }
            }]                

        }]        
    });
}