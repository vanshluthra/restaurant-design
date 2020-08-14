L.mapquest.key = 'YOUR CONSUMER KEY';

// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
  center: [40.7128, -74.0060],
  layers: L.mapquest.tileLayer('map'),
  zoom: 13
});