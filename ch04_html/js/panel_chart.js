Ext.ns("chart");

chart.init = function(){
	
   /*	
    try
    {
        chart.panel_chart.destroy();        
    }
    catch(e)
    {
        console.log(e);
    }
    */
    

    var chartValue = new Array();
    var maxY = 0;
    var maxX = 0;
              
    chart.panel_chart = new Ext.Panel({
    useCurrentLocation: true,               
    scroll:'vertical',

    getChartList:function()
    {
        chart.panel_chart.html = '';
        Ext.Ajax.request({
            url: './jsp/chart_list.jsp',
            success: function(response, opts) {
                console.log(response.responseText);
                var JsonData = JSON.parse(response.responseText);
                console.log(JsonData);
                if(JsonData.data.err == "")
                {
                    var chartHtml = "<CENTER><BR><B>수익차트</B><BR><BR>" + 
                         "<canvas  id='MyCanvas' width='300' height='210'></canvas><BR>" + 
                         "<table width='90%' bgcolor='white' border=1>";
                    for(i=0; i< JsonData.data.chart_list.length;i++)
                    {
                        chartHtml = chartHtml + "<tr><td><center>" + 
                            JsonData.data.chart_list[i].year + "</td>" + 
                            "<td><div align='right'>" + 
                            JsonData.data.chart_list[i].income + "</div></td>" + 
                            "</tr>";
                        chartValue[i] = JsonData.data.chart_list[i].income;
                        
                        if( maxY < Number(chartValue[i]))
                        {
                            maxY = chartValue[i];
                        }
                        maxX = i;
                    }
                    chartHtml= chartHtml + "</table>";
                    chart.panel_chart.update(chartHtml);
                    chart.panel_chart.chartInit();
                }
                else
                {
                    alert(JsonData.data.err);
                }
            }
        }); 
               
    },
    chartInit:function()
    {
        mycanvas = document.getElementById('MyCanvas');
        context = mycanvas.getContext('2d');

        var chart_width= 300;
        var chart_height= 200;

        context.strokeRect(0,0,300,200);
        context.lineWidth=3;
        for(i =  0 ; i < chartValue.length;i++)
        {
            if(i==0)
                context.moveTo(0,chart_height - (chartValue[i]/maxY * chart_height));
            else
                context.lineTo((chart_width * i)/maxX ,chart_height - (chartValue[i]/maxY * chart_height));
        }
        context.stroke();
    }          
    });
    
  
}       