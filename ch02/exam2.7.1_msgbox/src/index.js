Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        panel = new Ext.Panel({
        
            fullscreen:true,
            layout: {
                type: 'vbox',
                pack: 'center',         
            },
            items:[
            { 
                xtype:'spacer'
            },{
                xtype:'button',
                width:200,
                text:'경고창',
                handler:function(){
                    Ext.Msg.alert('경고','경고창입니다.', 
                    panel.resultMsg);
                }
            },{ 
                xtype:'spacer'
            },{
                xtype:'button',
                width:200,
                text:'프롬프트',                
                handler:function(){
                    Ext.Msg.prompt('질문','전화번호를 입력하세요?', 
                    panel.resultMsg);
                }
            },{ 
                xtype:'spacer'
            },{
                xtype:'button',
                width:200,
                text:'확인창',
                handler:function(){
                    Ext.Msg.confirm('확인','대학교 등록금이 내려야 한다고 생각합니까?', 
                        panel.resultMsg);
                }
            },{ 
                xtype:'spacer'
            }],
            resultMsg:function(btn,text)
            {
                alert(btn + ":" + text);
            }           
        });   
    }
});
