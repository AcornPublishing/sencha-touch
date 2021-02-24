Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        Ext.regModel('company', {
            fields: ['company_grade', 'company_class', 'name']
        });

		var itemTemplate = new Ext.XTemplate(
	        '<tpl for=".">',
	        	'<tpl if="company_grade==\'차장\'">',
	            '<div><table border="1" width="100%"bgcolor="yellow"><tr><td>직급:{company_grade}</td><td>부서:{company_class}</td></tr><td colspan="2">이름: <B>{name}</B></td></tr></table> </div>',            
	            '</tpl>',
	        	'<tpl else if="company_grade==\'과장\'">',
	            '<div><table border="1" width="100%"bgcolor="white"><tr><td>직급:{company_grade}</td><td>부서:{company_class}</td></tr><td colspan="2">이름: <B>{name}</B></td></tr></table> </div>',            
	            '</tpl>',
	        	'<tpl else if="company_grade==\'대리\'">',
	            '<div><table border="1" width="100%"bgcolor="lightgreen"><tr><td>직급:{company_grade}</td><td>부서:{company_class}</td></tr><td colspan="2">이름: <B>{name}</B></td></tr></table> </div>',            
	            '</tpl>',
	        	'<tpl else if="company_grade==\'사원\'">',
	            '<div><table border="1" width="100%"bgcolor="lightblue"><tr><td>직급:{company_grade}</td><td>부서:{company_class}</td></tr><td colspan="2">이름: <B>{name}</B></td></tr></table> </div>',            
	            '</tpl>',            
	        '</tpl>'
	    );        
		var company_list = new Ext.List({
	
			fullscreen:true,
            grouped: true,
            indexBar: true,
			onItemDisclosure: false,
			itemTpl:itemTemplate,

            store: new Ext.data.Store({
                model: 'company',
                sorters: 'company_class',
                getGroupString : function(record) {
                    return record.get('company_class')[0] + " 부서별 묶음 ";
                },                
                data: [
                    {company_grade: '차장', company_class: '영업부', name: '홍길동'},
                    {company_grade: '차장', company_class: '총무부', name: '임꺽정'},
                    {company_grade: '과장', company_class: '영업부', name: '이순신'},
                    {company_grade: '과장', company_class: '총무부', name: '주몽'},
                    {company_grade: '대리', company_class: '영업부', name: '손오공'},
                    {company_grade: '대리', company_class: '총무부', name: '자팔계'},
                    {company_grade: '사원', company_class: '영업부', name: '사오정'},
                    {company_grade: '사원', company_class: '영업부', name: '김분필'},
                    {company_grade: '사원', company_class: '총무부', name: '장화'},
                    {company_grade: '사원', company_class: '총무부', name: '홍련'},
                ]
            })
    	});
        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
		        pack: 'center',

            },
            items: company_list
        });    	
	}
});



