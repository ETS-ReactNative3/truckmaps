'use strict';

export function getRandomLatLon() {
    var latitude = 41.881832;
    var longitude = -87.623177;
    var radius = 10000;
    var x0 = longitude;
    var y0 = latitude;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;
  
    var u = Math.random();
    var v = Math.random();
  
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
  
    var xp = x/Math.cos(y0);
  
    // Resulting point.
    return {
      latitude: y+y0,
      longitude: xp+x0,
    };
}
