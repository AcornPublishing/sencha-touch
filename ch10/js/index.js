Ext.ns("main");

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
    main.panel = new Ext.Panel({
        fullscreen: true,
        scroll: 'Agetical',
        layout:'card',
        resultLogOutMsg:function(btn,text)
        {
            if(btn=='yes')
            {
                userId = common.users.removeUserId();
                userName= common.users.removeUserName();       
                Ext.getCmp('main.login').show();
                Ext.getCmp('main.logout').hide();
                main.panel.layout.setActiveItem(login.panel);
            }
        },
        dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                text: '로그인',
                id:'main.login',
                handler: function()
                {
                    main.panel.layout.setActiveItem(login.panel);
                    login.panel.doLayout();   
                }
            },
            {
                text: '로그아웃',
                id:'main.logout',
                handler: function()
                {
                    Ext.Msg.confirm('확인','로그아웃 하시겠습니까?',
                    main.panel.resultLogOutMsg);
                            
                }
            },                
            {
                text: 'Talk',
                handler: function()
                {
                    talking.init();
                    main.panel.layout.setActiveItem(talking.panel);
                    talking.panel.refreshAll(); 
                    talking.panel.doLayout();   
                }                   
            },
            {
                text: '가입하기',
                handler: function()
                {  
                    join.init();                     
                    main.panel.layout.setActiveItem(join.panel);  
                }
            }]
        }
        ],
    });
    main.panel.layout.setActiveItem(init.panel);      
    var userId="";
    var userName="";
    if(common.users.getUserId() != undefined)
    {
        userId = common.users.getUserId();
        userName= common.users.getUserName();
        Ext.Msg.alert('자동로그인', userName + "님 반갑습니다.");
        Ext.getCmp('main.login').hide();
        Ext.getCmp('main.logout').show();
    }
    else
    {
        Ext.getCmp('main.login').show();
        Ext.getCmp('main.logout').hide();
    }
    
    }
});