Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

    var position = new google.maps.LatLng(37.44885,-122.158592),  

        //Tracking Marker Image
        image = new google.maps.MarkerImage(
            'point.png',
            new google.maps.Size(32, 31),
            new google.maps.Point(0,0),
            new google.maps.Point(16, 31)
          ),

        trackingButton = Ext.create({
           xtype   : 'button',
           iconMask: true,
           iconCls : 'locate'
        } ),

    mapdemo = new Ext.Map({
		height:'75%',
        mapOptions : {
            center : new google.maps.LatLng(37.381592, -122.135672),  
            zoom : 15,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            navigationControl: true,
            navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
        },
		
        listeners : {
            maprender : function(comp, map){
                var marker = new google.maps.Marker({
                     position: position,
                     title : '목적지',
                     map: map
                });
                google.maps.event.addListener(marker, 'click', function() {
                     infowindow.open(map, marker);
                });
                setTimeout( function(){ map.panTo (position); } , 500);
            }

        }
    });
   	mapMenu = new Ext.Panel({
        //fullscreen: true,
        width:'100%',
        height:'20%',
        items: [
        {
        	xtype:'textfield',
        	label:'위도',
        	id:'latitude',
        	value:'37.56648',
        },
        {
        	xtype:'textfield',
        	label:'경도',
        	id:'longitude',
        	value:'126.9779849',
        },
        {
        	xtype:'button',
        	text:'위도,경도로 찾기',
        	handler:function(){
        		console.log(mapdemo);
        		var position = new google.maps.LatLng(
        			Number(Ext.getCmp("latitude").getValue()), 
        			Number(Ext.getCmp("longitude").getValue()));
                var marker = new google.maps.Marker({
                                 position: position,
                                 title : '서울시청',
                                 map: mapdemo.map
                            });            		
        		mapdemo.map.panTo (position); 
        	}
        }]
    });
    new Ext.Panel({
        fullscreen: true,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            title: 'Google Map 사용하기',
        }],            
        items: [mapdemo, mapMenu]
    });

    }
});