Ext.ns("upload_talking");

upload_talking.init = function()
{
    try
    {
        upload_talking.destory();
    }
    catch(e){}
    
    upload_talking.panel = new Ext.form.FormPanel({
    
    id: 'upload_talking_panel',
    standardSubmit: true,
    html:'<iframe name="hiddenFrame" width="0" height="0" style="visibility:hidden"></iframe>',
    items: [
    {
            xtype: 'fieldset',
            title: '사진올리기',
            instructions: '내용을 입력후 사진을 올리세요.',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '150'
            },  
            items:
            [{
                xtype:'hiddenfield',
                name:'reg_kind',
                value:'2',
            },
                    {
                xtype:'hiddenfield',
                name:'inpUrl',
                value:'http://127.0.0.1:8080/book/ch10_rest/response.html',
            },          
            {
                xtype:'textfield',
                name:'user_id',
                label:'유저ID',
                value:common.users.getUserId(),
            },  
            {
                xtype:'textfield',
                name:'content',
                label:'내용',
            },          
            {
                xtype: 'urlfield',
                id: 'fileAttach',
                name: 'talking_img',
                label: 'Upload File',
                inputType: 'file'
            },
            {
                xtype:'button',
                text:'글올리기',
                handler:function()
                {
                    Ext.getDom('upload_talking_panel').enctype='multipart/form-data';                   
                    Ext.getDom('upload_talking_panel').target='hiddenFrame';    
                    var form = Ext.getCmp('upload_talking_panel');
                    form.target = 'uploadTalkingRsult';
                    form.submit({
                        url: "/RestService/jersey/twit/create",
                        waitMsg: 'waiting..',
                                     success: function(result, request) {
                                        console.log("성공");
                        },
                        failure:function(result, request) {
                                        console.log("실패");
                        }                   
                    });                 
                }
            }]
        }]
    }); 
}