Ext.ns("gesipan");
Ext.ns("gesipan.panel_gesipan");

gesipan.init = function(){
    try
    {
        gesipan.panel_gesipan.destroy();        
    }
    catch(e)
    {
        console.log(e);
    } 
                
    gesipan.panel_gesipan = new Ext.Panel({
        useCurrentLocation: true,               
        getgesipanList:function()
        {
            Ext.Ajax.request({
                url: './jsp/gesipan_list.jsp',
                success: function(response, opts) {
                gesipan.panel_gesipan.update(response.responseText);
                }
            });         
        },
        showgesipanDetail: function(subject, content, writer) {
                overlay_gesipan.setCentered(true);
                gesipanOverlayToolbar.setTitle('게시판상세정보');
                overlay_gesipan.show();   
                overlay_gesipan.update("제목:" + subject + "<BR><hr>내용:" + content + "<BR><hr>작성자:" +writer);
        }          
    });
    var gesipanOverlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    var overlay_gesipan = new Ext.Panel({
    
        floating: true,
        modal: true,
        centered: true,
        width: 310,
        height: 300,
        dockedItems: gesipanOverlayToolbar,
        html:'상세정보'
    });    
}       