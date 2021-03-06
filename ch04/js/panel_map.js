﻿Ext.ns("map");



map.init = function(){
    // The following is accomplished with the Google Map API
    var position = new google.maps.LatLng(37.56648,126.9779849),  //Sencha HQ

        //Tracking Marker Image
        image = new google.maps.MarkerImage(
            './img/point.png',
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
		height:'100%',
        mapOptions : {
            center : new google.maps.LatLng(37.381592, -122.135672),  //시청근처
            zoom : 17,
            mapTypeId : google.maps.MapTypeId.SATELLITE,
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

    map.panel_map = new Ext.Panel({
        fullscreen: true,            
        items: [mapdemo] //, mapMenu]
    });

}
