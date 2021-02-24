Ext.ns("pie");

pie.init = function() {
    window.store1 = new Ext.data.JsonStore({
        fields: ['이름', '국어', '영어', '수학'],

        data:[{ '이름':'영희', '국어':60,  '영어':60,  '수학':80  },
              { '이름':'철수', '국어':50,  '영어':90,  '수학':70  },
              { '이름':'수현', '국어':100, '영어':100, '수학':90  },
              { '이름':'소희', '국어':100, '영어':90,  '수학':100 }]
    });

    pie.panel = new Ext.chart.Panel({
        fullscreen: true,
        title: 'PIE Chart',

        items: {
            cls: 'pie1',
            theme: 'Demo',
            store: store1,
            animate: true,
            legend: {
                position: {
                    portrait: 'bottom',
                    landscape: 'right'
                },
                labelFont: '20px Arial'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['국어', '영어', '수학'],
                title: 'Number of Hits',
                minimum: 0,
                maxinum:100,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['이름'],
                title: '성적표'
            }],
            series: [{
                type: 'pie',
                field: '국어',
                highlight: false,
                donut:25,
                showInLegend: true,
                label:{
                    field:'이름'
                }
            }]
        }
    });
}
