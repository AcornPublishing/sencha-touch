Ext.setup({
    glossOnIcon: true,    
    fullscreen:true,
    onReady: function()
    {       
        var data = {
            text: 'ÃáÇâÀü',
            items: [
            {
                text: '³²¿ø¿¡¼­´Â...',
                items: [
                {
                    text: 'º¯»ç¶ÇÆÄ',
                    items: [
                    {
                        text: 'ÀÌ¹æ <img src="./img/ÀÌ¹æ.png" height="50"> ',

                    },
                    {
                        text: 'Æ÷Á¹ <img src="./img/Æ÷Á¹.png" height="50"> ',

                    }]
                },{
                    text: 'ÃáÇâÀÌÆÄ',
                    items: [
                    {
                        text: '¿ù¸Å <img src="./img/¿ù¸Å.png" height="50"> ',

                    },
                    {
                        text: 'ÃáÇâ <img src="./img/ÃáÇâ.png" height="50"> ',

                    }]
                }]
            },
            {
                text: 'ÇÑ¾ç¿¡¼­´Â...',
                items: [
                {
                    text: '¸ù·æ <img src="./img/¸ù·æ.png" height="50"> ',

                }]
            }]
        };
   

        Ext.regModel('menuList', {
            fields: [{name: 'text', type: 'string'}]
        });

        var store = new Ext.data.TreeStore({
            model: 'menuList',
            root: data,

            proxy: {
            	//url:'temp.html',
                type: 'ajax',
                reader: {
                    type: 'tree',
                    root: 'items'
                }
            }

            
        });

        var nestedList = new Ext.NestedList({      
            fullscreen: true,  
            title:"ÃáÇâÀü",
            displayField: 'text',
            store: store,

        });
 
         nestedList.on('leafitemtap', function(subList, subIdx, el, e, detailCard) {
			alert('´ë·ÉÀÌ¿À...');	
			/*
			console.log(subList);
			console.log(subIdx);
			console.log(el);
			console.log( e);
			console.log( detailCard);
			*/
			
        });    
        new Ext.Panel({
            fullscreen: true,  
            items:nestedList
           
        });
        
    	function resultMsg(btn,text)
    	{
    		
    	}        
    }
   
   
});