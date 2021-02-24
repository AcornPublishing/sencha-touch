Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        Ext.regModel('company', {
            fields: ['company_grade', 'company_class', 'name']
        });
		var company_list = new Ext.List({
	
			fullscreen:true,
			itemTpl: '<div>직급:{company_grade} 부서:{company_class} 이름: <B>{name}</B> </div>',
            onItemDisclosure: {
                handler: function(record, btn, index) {
                    alert('직급:' + record.get('company_grade') + ' 부서:' + record.get('company_class') + ' 이름:'  + record.get('name') + "분이 승진하셨습니다.. , index:" + index);
                }
            },

            store: new Ext.data.Store({
                model: 'company',
                sorters: 'company_class',
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
