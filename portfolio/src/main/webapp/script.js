// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random text to the page.
 */
function addRandomFact() {
  const facts =
      ['I\'ve only travelled out of my country once (for college)', 
       'I speak two langueges', 'My name means "My Joy has arrived" in Yoruba', 
       'I was born and raised in Nigeria', 'I\'m a good singer', 
       'I have two siblings'];

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

function getUserComments() {
    fetch('/data').then(response => response.json()).then((jsonComments) => {
        
        console.log(jsonComments);

        const historyEl = document.getElementById('history');
        historyEl.innerHTML = "";
        for(var i = 0; i < jsonComments.length; i++){
            historyEl.appendChild(createListElement(jsonComments[i])); 
        }
    })
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

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