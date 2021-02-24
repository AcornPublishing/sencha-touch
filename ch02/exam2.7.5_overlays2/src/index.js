Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        
        var overlayToolbar = new Ext.Toolbar({
           dock: 'top'
        });

		Ext.regModel('school', {
            fields: ['schoolgrade', 'shoolclass', 'name']
        });
        
		var schoollist = new Ext.List({
			width:380,
			height:340,
			//fullscreen:true,
			itemTpl: '<div>{schoolgrade}학년{shoolclass}반 이름: <B>{name}</B> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert(record.get('schoolgrade') + '학년' +  record.get('shoolclass') + '반 '  + record.get('name') + " 학생이 선택되었습니다. , index:" + index);
                }
            },

            store: new Ext.data.Store({
                model: 'school',
                sorters: 'schoolgrade',
                data: [
                    {schoolgrade: '1', shoolclass: '1', name: '홍길동'},
                    {schoolgrade: '1', shoolclass: '2', name: '임꺽정'},
                    {schoolgrade: '1', shoolclass: '3', name: '이순신'},
                    {schoolgrade: '1', shoolclass: '4', name: '둘리'},
                    {schoolgrade: '1', shoolclass: '5', name: '손오공'},
                    {schoolgrade: '2', shoolclass: '1', name: '원더우먼'},
                    {schoolgrade: '2', shoolclass: '2', name: '슈퍼맨'},
                    {schoolgrade: '2', shoolclass: '3', name: '배트맨'},
                    {schoolgrade: '3', shoolclass: '1', name: '장화'},
                    {schoolgrade: '3', shoolclass: '2', name: '홍련'},
                ]
            })
    	});
    	        
		var overlay = new Ext.Panel({
		
            floating: true,
            modal: true,
            centered: false,
            width: 400,
            height: 400,
            dockedItems: overlayToolbar,
			items:schoollist
    	});


        var dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                text: '학생리스트 보여주기',
                handler: function(btn,event){
		            overlay.setCentered(false);
		            overlayToolbar.setTitle('학생리스트');
		            overlay.showBy(btn);                	
                }
            }, 
            {xtype: 'spacer'}, 
            {
                text: '학생리스트 보여주기',
                handler: function(btn,event){
		            overlay.setCentered(true);
		            overlayToolbar.setTitle('학생리스트');
		            overlay.show();                	
                }
            }, 
            ]
        }];
        
        new Ext.Panel({
            fullscreen: true,
            dockedItems: dockedItems,
            html: "Overlay를 보여주는 예제입니다."
        });
    }
});