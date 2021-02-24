Ext.ns("upload_user");

upload_user.init = function()
{
	document.getElementById("pt_user_id").value = common.users.getUserId();
}

upload_user.panel = new Ext.form.FormPanel({
    useCurrentLocation: true,               
    scroll:'vertical',
    cardSwitchAnimation:"cube",
    fullscreen:true,
	fileupload:function()
	{
		alert('사진을 Upload합니다.');
        		
		document.portUpload.action="./jsp/sns_user_upload.jsp";
		document.portUpload.target = "uploadRsult";
		document.portUpload.submit();
	},
    styleHtmlContent: true,
   
    contentEl: 'portUploadDiv',
    cls: 'htmlcontent'
}); 


