Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.regModel('Sex', {
            fields: [
                {name: 'sex',     type: 'string'},
                {name: 'title',    type: 'string'}
            ]
        });
        var sexStore = new Ext.data.JsonStore({
           data : [
                { sex : '1', title : '남'},
                { sex : '2', title : '여'}
           ],
           model : 'Sex',
           autoLoad : true,
           autoDestroy : true
        });
        var form = new Ext.form.FormPanel({
            fullscreen:true,        
            scroll: 'vertical',
            standardSubmit : false,
            items: [{
                    xtype: 'fieldset',
                    title: '입사지원서',
                    instructions: '각 항목을 적어서 인사부에 제출하세요.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '150'
                    },
                    items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        label: '이름',
                        useClearIcon: true,
                        autoCapitalize : true
                    }, {
                        xtype: 'datepickerfield',
                        name : 'birthday',
                        label: '생년월일',
                        useClearIcon: false
                    },{
                        xtype: 'checkboxfield',
                        name : 'cool',
                        label: '군필여부',
                        value: true
                    }, {
                        xtype: 'spinnerfield',
                        name : 'spinner',
                        label: '경력'
                    }, {
                        layout:
                        {
                            type:'hbox',                    
                        },
                        width:'100%',
                        items:[
                        {
                            xtype: 'selectfield',
                            name : 'sex',
                            width: '60%',
                            labelWidth:150,
                            label: '성별',
                            valueField : 'sex',
                            displayField : 'title',                       
                            store : sexStore
                        }, {
                            xtype: 'numberfield',
                            name: 'number',
                            labelWidth:'50%',
                            label: '나이',
                            width: '40%',
                            value:20,
                            maxValue : 20,
                            minValue : 2
                        }]
                    }, {
                        xtype: 'emailfield',
                        name : 'email',
                        label: 'E-메일',
                        placeHolder: 'hong_kil_dong@google.com',
                        useClearIcon: true
                    }, {
                        xtype: 'urlfield',
                        name : 'url',
                        label: '홈페이지',
                        placeHolder: 'http://www.hong_kil_dong.com',
                        useClearIcon: true
                    }, {
                        xtype: 'sliderfield',
                        name : 'height',
                        value:5000,
                        maxValue: 10000,
                        minValue: 2000,
                        label: '희망연봉'
                    }, {
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                        
                        },                      
                        items:[{
                            xtype: 'button',
                            name: 'number',
                            width:100,
                            bgcolor:'red',
                            align:'center',
                            text: '등록',
                            handler:function()
                            {
                                alert("등록합니다.");
                            }
                        },
                        { 
                        	xtype:'spacer',width:'10%'
                        }, 
                        {
                            xtype: 'button',
                           
                            name: 'number',
                            width:100,
                            text: '취소',
                            handler:function()
                            {
                                alert("취소합니다.");
                            }
                        }]
                    }]
            }]
        });
    }
});