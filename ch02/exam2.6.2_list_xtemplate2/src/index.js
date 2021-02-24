Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        Ext.regModel('company', {
            fields: ['pic', 'companygrade', 'companyclass', 'name', 'history']
        });

        Ext.regModel('history', {
            fields: ['degree']
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '<div><table border="1" width="100%" ><tr><td rowspan="2" width="25%">({#})<img src="{pic}" height=70></td><td> {[this.getDegree("파랑")]} 직급:{companygrade}</td><td>부서:{companyclass}</td></tr><td colspan="2">이름: <B>{name}</B>',
                '<tpl for="history">',
                    '<small> {[xindex]}/{[xcount]} </small>',
                '</tpl>',                
                '</td></tr></table> </div>',            
            '</tpl>',
            {
                getDegree:function(input)
                {
                    if(input=="파랑")
                        return '<font color="blue">';
                    else 
                        return '';
                }           
            }        
        ); 
        
        
        company_list = new Ext.List({
            fullscreen:true,
            itemTpl: itemTemplate,

            store: new Ext.data.Store({
                model: 'company',
                sorters: 'companygrade',
             
                data: [
                    {pic:'./img/psn1.png', companygrade: '사원', companyclass: '영업1부', name: '홍길동', history:[{degree:'사원'}]},
                    {pic:'./img/psn2.png', companygrade: '대리', companyclass: '영업2부', name: '임꺽정',history:[{degree:'계장'},{degree:'대리'}]},
                    {pic:'./img/psn3.png', companygrade: '과장', companyclass: '인사부', name: '이순신',history:[{degree:'계장'},{degree:'대리'}, ,{degree:'과장'}]},
                    {pic:'./img/psn4.png', companygrade: '차장', companyclass: '총무부', name: '둘리' ,history:[{degree:'계장'},{degree:'대리'}, ,{degree:'과장'}]}
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
