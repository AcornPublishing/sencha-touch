Ext.setup({
icon: 'icon.png',
glossOnIcon: false,
tabletStartupScreen: 'tablet_startup.png',
phoneStartupScreen: 'phone_startup.png',
onReady: function() {
    
    var overlayToolbar = new Ext.Toolbar({
       dock: 'top'
    });
    
    var overlay = new Ext.Panel({
        floating: true,
        modal: true,
        centered: false,
        width: 400,
        height: 400,
        styleHtmlContent: true,
        dockedItems: overlayToolbar,
        scroll: 'vertical',
        contentEl: 'map',
        cls: 'htmlcontent'
    });

    var dockedItems = [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            text: 'DAUM 지도 ',
            handler: function(btn,event){
                mMap.init();
            }
        }]
    }];
    
    new Ext.Panel({
        fullscreen: true,
        dockedItems: dockedItems,
        html: "<div id='map'></div>	"
    });
    
    var mMap = {
        pos_y:37.537900,
        pos_x:127.00500,
        info:'Sencha Touch',
        init:function() {
            map = new daum.maps.Map(document.getElementById('map'), {
                center: new daum.maps.LatLng(Number(this.pos_y), Number(this.pos_x))
            });
            var zoomControl = new daum.maps.ZoomControl();
            map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
            var mapTypeControl = new daum.maps.MapTypeControl();
            map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
    
            //원 그리기
            var circle = new daum.maps.Circle({
                center : new daum.maps.LatLng(this.pos_y, this.pos_x),
                radius : 200,
                strokeWeight : 4,
                strokeColor : "#ff0000"
            });
            circle.setMap(map);
            marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(this.pos_y , this.pos_x )
            });
            infowindow  = new daum.maps.InfoWindow({
                content: this.info ,
                removable : true
            });
            console.log(infowindow );
            infowindow.open(map, marker );

            daum.maps.event.addListener(marker , "click", function( ) {

                infowindow.open(map, marker );
            });
            marker.setMap(map);     
        }       
    }           
}
});