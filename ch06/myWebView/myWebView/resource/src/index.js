Ext.ns("game");

Ext.setup({
          
          icon: 'icon.png',
          tabletStartupScreen: 'tablet_startup.png',
          phoneStartupScreen: 'phone_startup.png',
          glossOnIcon: false,
          
          onReady: function() {   
          game.panel = new Ext.Panel({
                                     fullscreen: true,
                                     timeCount:0,
                                     timeScore:0,
                                     
                                     dockedItems: [
                                                   {
                                                   xtype: 'toolbar',
                                                   dock : 'top',
                                                   title: 'º˝¿⁄√£±‚',
                                                   },    
                                                   {
                                                   dock : 'top',
                                                   id:'gameToolbar',
                                                   xtype: 'toolbar',
                                                   ui:'light',
                                                   items:[
                                                          {
                                                          xtype:'button',
                                                          text:'START',                   
                                                          handler:function()
                                                          {
                                                          game.panel.readyCard();
                                                          }
                                                          },
                                                          {
                                                          xtype:'button',
                                                          text:'RANKING',
                                                          align:'right',
                                                          handler:function()
                                                          {
                                                          game.panel.getList();
                                                          }
                                                          }]                  
                                                   },
                                                   {
                                                   dock : 'bottom',
                                                   xtype: 'toolbar',
                                                   id:    'timePanel',
                                                   title:'0 √ ',                  
                                                   }],
                                     width:'80%',
                                     align: 'center',
                                     layout: {
                                     align: 'center'
                                     },
                                     defaults: {
                                     required: true,
                                     height:80,
                                     labelAlign: 'center',
                                     labelWidth: '80%' },            
                                     items:[  
                                            {
                                            xtype:'spacer',
                                            height:'10%',
                                            },              
                                            {
                                            layout: {
                                            align: 'center',
                                            type: 'hbox',
                                            pack: 'center'},  
                                            //flex: 2, style: 'margin: .5em;',
                                            items:[
                                                   {                   
                                                   id : 'b1',
                                                   gm_id: 1,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }                       
                                                   },
                                                   {
                                                   id : 'b2',
                                                   gm_id: 2,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   
                                                   },
                                                   {
                                                   id : 'b3',
                                                   gm_id: 3,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   
                                                   }]
                                            },
                                            {
                                            layout: {
                                            align: 'center',
                                            type: 'hbox',
                                            pack: 'center'},  
                                            //flex: 2, style: 'margin: .5em;',
                                            
                                            items:[
                                                   {
                                                   id : 'b4',
                                                   gm_id: 4,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }       
                                                   },
                                                   {
                                                   id : 'b5',
                                                   gm_id: 5,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   },
                                                   {
                                                   id : 'b6',
                                                   gm_id: 6,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   }]
                                            },
                                            {
                                            layout: {
                                            align: 'center',
                                            type: 'hbox',
                                            pack: 'center'},  
                                            //flex: 2, style: 'margin: .5em;',
                                            
                                            items:[
                                                   {
                                                   id : 'b7',
                                                   gm_id: 7,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   },
                                                   {
                                                   id : 'b8',
                                                   gm_id: 8,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   },
                                                   {
                                                   id : 'b9',
                                                   gm_id: 9,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   }]
                                            },
                                            {
                                            layout: {
                                            align: 'center',
                                            type: 'hbox',
                                            pack: 'center'},  
                                            items:[
                                                   {
                                                   id : 'b10',
                                                   gm_id: 10,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   },
                                                   {
                                                   id : 'b11',
                                                   gm_id: 11,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   },
                                                   {
                                                   id : 'b12',
                                                   gm_id: 12,
                                                   width:'30%',
                                                   height:'99%',
                                                   xtype:'gmButton',
                                                   mytextid:'test',
                                                   eventChange:function(idnum,state,picnumber)
                                                   {
                                                   setTimeout('game.panel.openCard(' + idnum + ',' + state + ',' + picnumber + ');', 1000);
                                                   }
                                                   }]
                                            }],
                                     
                                     // Ω√¿€ - √ ±‚»≠ 
                                     readyCard:function()
                                     {
                                     this.timeCount = 0;
                                     this.timeScore = 0;
                                     var temp_i= new Array(12);
                                     for(i=0; i<12;i++)
                                     {
                                     temp_i[i] = Math.random();
                                     }
                                     var tempNum = new Array(12);  
                                     for(i=0; i< 6;i++)
                                     {
                                     tempNum[i] = i;
                                     tempNum[i+6] = i;
                                     }       
                                     for(i=0; i<12;i++)
                                     {
                                     for(j=i+1;j<11;j++)             
                                     {
                                     if(temp_i[j] < temp_i[i])
                                     {
                                     var tempValue = temp_i[i];
                                     temp_i[i] = temp_i[j];
                                     temp_i[j] = tempValue;
                                     var tempNumValue = tempNum[i];
                                     tempNum[i] = tempNum[j];
                                     tempNum[j] = tempNumValue;                      
                                     }   
                                     }
                                     }
                                     for(i=0; i<12;i++)
                                     {
                                     Ext.getCmp('b' + (i+1)).gm_picnumber = tempNum[i] + 1;
                                     Ext.getCmp('b' + (i+1)).gm_state = '0';
                                     Ext.getCmp('b' + (i+1)).show();
                                     }    
                                     },
                                     openCard:function(idnum,state,picnumber)
                                     {
                                     var a,b;
                                     var cnt = 0;
                                     var num = 0;
                                     for(i =1; i<=12; i++)
                                     {
                                     if(i != idnum)
                                     {
                                     if(Ext.getCmp('b' + i).gm_state == '1')
                                     {
                                     cnt++;
                                     num = i;
                                     break;
                                     }
                                     }
                                     }
                                     // µŒπ¯¬∞ ƒ´µÂ∏¶ √£¿Ω
                                     if(cnt > 0)
                                     {
                                     if(Ext.getCmp('b'+ num).gm_picnumber == picnumber)
                                     {
                                     Ext.getCmp('b' + num).findit();
                                     Ext.getCmp('b' + idnum).findit();
                                     }
                                     else
                                     {
                                     Ext.getCmp('b' + num).close();
                                     Ext.getCmp('b' + idnum).close();                    
                                     }
                                     
                                     cnt=0;
                                     for(i =1; i<=12; i++)
                                     {
                                     
                                     if(Ext.getCmp('b' + i).gm_state == '2')
                                     {
                                     cnt++;
                                     }
                                     
                                     }
                                     if(cnt == 12)
                                     {
                                     this.timeScore = this.timeCount;
                                     Ext.Msg.alert('º∫∞¯','º∫∞¯«œø¥Ω¿¥œ¥Ÿ.' + this.timeScore + '√  ', 
                                                   game.panel.checkSeconds);
                                     }       
                                     }
                                     },
                                     runTimer:function()
                                     {
                                     Ext.getCmp("timePanel").setTitle(this.timeCount+ ' √ ');
                                     this.timeCount++;
                                     setTimeout('game.panel.runTimer()', 1000);
                                     },
                                     checkSeconds:function(btn,text)
                                     {
                                     if(btn == 'ok')
                                     {        	
                                     Ext.Ajax.request({
                                                      url: common_url + '/jsp/getmin.jsp',
                                                      success: function(response, opts) {
                                                      var JsonData = JSON.parse(response.responseText);
                                                      if(JsonData.data.err != "")
                                                      {
                                                      Ext.Msg.alert('ø¿∑˘πﬂª˝:' + JsonData.data.err);
                                                      return;
                                                      }
                                                      var seconds = JsonData.data.seconds;
                                                      
                                                      if(game.panel.timeScore < Number(seconds))
                                                      {
                                                      Ext.Msg.prompt('TOP 10 ¡¯¿‘','¿Ã∏ß¿ª ¿‘∑¬«œººø‰.', 
                                                                     game.panel.regListAsk);         
                                                      }
                                                      }
                                                      });
                                     }
                                     },
                                     regListAsk:function(btn,text)
                                     {
                                     if(btn == 'ok')
                                     {
                                     game.panel.regList(text);
                                     }
                                     },  
                                     regList:function(textName)
                                     {
                                     Ext.Ajax.request({
                                                      url: common_url + '/jsp/game_reg.jsp?name=' + textName + "&seconds=" + this.timeScore,
                                                      success: function(response, opts) {
                                                      var JsonData = JSON.parse(response.responseText);
                                                      if(JsonData.data.err != "")
                                                      {
                                                      Ext.Msg.alert('ø¿∑˘πﬂª˝', JsonData.data.err);
                                                      return;
                                                      }
                                                      else
                                                      {
                                                      Ext.Msg.alert("»Æ¿Œ", "¿˙¿Â«œø¥Ω¿¥œ¥Ÿ." ,game.panel.regListResult);
                                                      
                                                      }
                                                      }
                                                      });                                 
                                     },
                                     regListResult:function(btn,text)
                                     {
                                     game.panel.getList();
                                     },          
                                     getList:function()
                                     {
                                     var listdata;
                                     Ext.Ajax.request({
                                                      url: common_url + '/jsp/game_list.jsp',
                                                      success: function(response, opts) {
                                                      var JsonData = JSON.parse(response.responseText);
                                                      listdata= JsonData.data.top_list;
                                                      Ext.regModel('toplist', {
                                                                   fields: ['name', 'seconds']
                                                                   });
                                                      var gameList = new Ext.List({
                                                                                  width:270,
                                                                                  height:310,
                                                                                  itemTpl: '<div><table><tr><td width="30%">{seconds}</td><td>{name}</td></tr></table></div>',
                                                                                  store: new Ext.data.Store({
                                                                                                            model: 'toplist',
                                                                                                            data: listdata,
                                                                                                            })
                                                                                  });
                                                      var panelList = new Ext.Panel({
                                                                                    
                                                                                    floating: true,
                                                                                    modal: true,
                                                                                    centered: false,
                                                                                    width: 284,
                                                                                    height: 360,
                                                                                    
                                                                                    items:[
                                                                                           
                                                                                           gameList,
                                                                                           {
                                                                                           xtype:'button',
                                                                                           text:'¥›±‚',
                                                                                           handler:function()
                                                                                           {
                                                                                           panelList.hide();
                                                                                           }
                                                                                           },
                                                                                           ]
                                                                                    }); 
                                                      panelList.setCentered(true);
                                                      panelList.show();   
                                                      },
                                                      failure:function()
                                                      {
                                                      alert("µ•¿Ã≈Õ ¡∂»∏ Ω«∆–");
                                                      return;
                                                      }
                                                      });                                    
                                     }               
                                     });  
          game.panel.readyCard();  
          game.panel.runTimer();
          
          }
          });
