Ext.setup({
      onReady: function() {
        var drawComp = new Ext.draw.Component({
          items: [{
            type: 'circle',
            stroke: 'blue',
            radius: 50,
            x: 100,
            y: 50
          },{
            type: 'rect',
            fill: 'red',
            width: 100,
            height:100,
            x: 200,
            y: 0
          },{
            type: 'path',
            path :"M 100 150 L 200 150 L 150 250 z",
            stroke:"blue" ,
            fill: 'green'
          },{
            type: 'path',
            path :"M50,200 C50,100 250,50 250,200 S300,200 300,200",
            stroke:"blue" ,
          },{
            type: 'text',
            text:'draw something',            
            fill: 'blue',

            x: 100,
            y: 300
          }]
        });
        new Ext.chart.Panel({
          fullscreen: true,
          items: drawComp          
        });
        
        drawComp.surface.renderFrame();             
      }
    });