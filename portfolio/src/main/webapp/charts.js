// amCharts javascript code
AmCharts.makeChart("chartdiv",
    {
        "type": "pie",
        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        "labelRadiusField": "category",
		"alphaField": "column-1",
		"descriptionField": "category",
		"titleField": "category",
		"valueField": "column-1",
		"theme": "light",
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": true,
			"align": "center",
			"markerType": "circle"
		},
		"titles": [],
		"dataProvider": [
			{
				"category": "Computer Geek",
				"column-1": "40"
			},
			{
				"category": "Gamer",
				"column-1": "20"
			},
			{
				"category": "Music Lover",
				"column-1": "20"
			},
			{
				"category": "Loner",
				"column-1": "10"
			},
			{
				"category": "Cinephile",
				"column-1": "10"
			}
		]
	}
);
