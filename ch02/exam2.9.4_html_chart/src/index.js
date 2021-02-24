Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var context;
        var mycanvas;
        var panel = new Ext.Panel({
            fullscreen: true,
            html: '<center><BR>판매량추이<BR><canvas id="MyCanvas" width="400" height="400"></canvas><br><br>판매량',
            drawRect:function(){  
                mycanvas = document.getElementById('MyCanvas');  
                context = mycanvas.getContext('2d');  
              
                var img= new Image();  
                img.src='./img/back.png';  
                context.drawImage(img,0,0,400,400);  
                  
                context.strokeRect(0,0,400,400);  
                context.lineWidth=5;  
                context.moveTo(0,400);  
                context.lineTo(10,450);  
                context.lineTo(20,300);  
                context.lineTo(30,310);  
                context.lineTo(40,290);  
                context.lineTo(50,240);  
                context.lineTo(60,220);  
                context.lineTo(70,200);  
                context.lineTo(80,210);  
                context.lineTo(90,240);  
                context.lineTo(100,220);  
                context.lineTo(110,250);  
                context.lineTo(120,260);  
                context.lineTo(130,280);  
                context.lineTo(140,290);  
                context.lineTo(150,295);  
                context.lineTo(160,300);  
                context.lineTo(170,310);  
                context.lineTo(180,320);  
                context.lineTo(190,350);  
                context.lineTo(200,380);  
                context.lineTo(210,350);  
                context.lineTo(220,330);  
                context.lineTo(230,320);  
                context.lineTo(240,325);  
                context.lineTo(250,328);  
                context.lineTo(260,310);  
                context.lineTo(270,320);  
                context.lineTo(280,300);  
                context.lineTo(290,290);  
                context.lineTo(300,285);  
                context.lineTo(310,270);  
                context.lineTo(320,250);  
                context.lineTo(330,240);  
                context.lineTo(340,200);  
                context.lineTo(350,180);  
                context.lineTo(360,177);  
                context.lineTo(370,175);  
                context.lineTo(380,150);  
                context.lineTo(390,140);  
                context.lineTo(400,110);  
                context.stroke(); 
            },              
            dockedItems: [
                {
                    dock : 'top',
                    xtype: 'toolbar',
                    title: 'HTML',
                    
                    items: [
                        {                           
                            text: '수익율조회',
                            handler:function()
                            {
                                //panel.update(htmlPage);
                                panel.drawRect();
                                //panel.doLayout();
             
                            }
                        }                   
                    ]
                }
            ]
        });    
    }
});
