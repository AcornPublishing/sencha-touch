Ext.ns("scrollList");

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        Ext.regModel('friend', {
            fields: ['write_time', 'friend_class', 'name', 'write']
        });
        
        var orgData= [{write_time: '09/20 11:11:11', name: '이병옥', write:'안녕하세요 오늘은 날씨가 덥네요' },
                      {write_time: '09/20 11:12:11', name: '최성민', write:'비가 온다네요'},
                      {write_time: '09/20 11:13:22', name: '이병옥', write:'날씨가 좋았으면 좋겠네'},
                      {write_time: '09/20 11:14:33', name: '최성민', write:'낼모래 워크샵 가는데....ㅎㅎ'},
                      {write_time: '09/20 11:15:11', name: '김나래', write:'나도 데려가요...'},
                      {write_time: '09/20 11:17:05', name: '최성민', write:'휴~~ 오늘도 야근인데..'}];
		// 추가할 데이타 서버와의 통신시 Ajax로 계속 받아올 데이타를 임시로 만듬.                   
        var addData= [{write_time: '09/20 11:21:55', name: '김나래', write:'방금 도착했어요..'},
                      {write_time: '09/20 11:22:43', name: '이병옥', write:'12시까지 모이기로 했잖아!!'},
                      {write_time: '09/20 11:23:56', name: '이병옥', write:'늦은애들 회비 추가!!'},
                      {write_time: '09/20 11:24:00', name: '김나래', write:'그러게 어디 있어요..'}];
        
        var store =   new Ext.data.Store({
                model: 'friend',
                sorters: 'wirte_time',                
                data: orgData,
                autoLoad:true,
               
            });             

	
	   var friend_list = new Ext.List({
			name:'friend_list',
			blockRefresh:true,
			height:400,
			
			itemTpl: '<div><table><tr><td><img src="./img/{name}.png" width="35", height="50">&nbsp;&nbsp;</td><td>{write}<BR><font size="2"> {write_time} 이름: {name}</font></td></tr></table> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('등급:' + record.get('write_time') + ' 구분:' + record.get('friend_class') + ' 이름:'  + record.get('name') + "에게 전화합니다. , index:" + index);
                }
            },			
            store:store,

    	});
		    	
        scrollList.panel = new Ext.Panel({
            fullscreen: true,
            html:'<BR><font size="2">리스트를 아래로 드래그 하면 데이타를 추가합니다.',
			
			dockedItems :[{
	            dock: 'top',
	            xtype: 'toolbar',
	            title:'트위터 만들기',
	            items: [{
	                text: '맨위로',
	                handler: function(btn,event){
	                    friend_list.scroller.scrollTo({x:0,y:0});
	                }
	            }]
	        }],
            items: 	friend_list,
            addScrollList:function(a,b)
            {
            	console.log(a);
            	console.log(b);
            	if(b.offset <= 0)
            		store.add(addData);
            }
        });   
     	friend_list.scroller.on('bouncestart', scrollList.panel.addScrollList, this);     	
	}
});
