Number.prototype.toRad = function()
{
  return this * Math.PI / 180;
}

function GPSLocation(name, id, distance, coordinates)
{
  this.name = name;
  this.id = id;
  this.distance = distance;
  this.coordinates = coordinates;
}

function LocationHandler(gpsLocations, callback)
{
  var locations = gpsLocations;

  var lastCoords = new Object();
  lastCoords.latitude = 0;
  lastCoords.longitude = 0;
  var lastLocation = null;
  var lastTime = new Date().getTime();
  
  this.start = function()
  {
    if(navigator.geolocation)
    {
      // timeout at 10000 milliseconds (10 seconds)
      var options = {timeout:10000};
      navigator.geolocation.watchPosition(onPositionReceived, onPositionError, options);
    }
  }
  
  this.distanceTo = function(gpsLocation)
  {
    var minDist = haversineDistance(gpsLocation.coordinates[0], lastCoords);

    for(var i = 1; i < gpsLocation.coordinates.length; ++i)
    {
      var dist = haversineDistance(gpsLocation.coordinates[i], lastCoords);
      if(dist < minDist)
      {
        minDist = dist;
      }
    }

    return minDist;
  }
  
  var onPositionReceived = function(position)
  {
    // Keep track of the player's speed
    var movementDist = haversineDistance(position.coords, lastCoords);
    var now = new Date().getTime();
    var timeDiffSecs = (now - lastTime) / 100;
    var speed = movementDist / timeDiffSecs;
    lastCoords = position.coords;
    lastTime = now;
    
    // Find where the player is
    for(var i = 0; i < locations.length; ++i)
    {
      for(var j = 0; j < locations[i].coordinates.length; ++j)
      {
        var distToLocation = haversineDistance(position.coords, locations[i].coordinates[j]);
        //output('Distance to ' + locations[i].name + ': ' + distToLocation);
        if(distToLocation <= locations[i].distance)
        {
          lastLocation = locations[i];
          callback(locations[i].id);
          return;
        }
      }
    }
    
    // If we've been to some location, don't count us leaving it until we're
    // at least 10m outside of it's original bounds
    if(lastLocation)
    {
      for(var j = 0; j < lastLocation.coordinates.length; ++j)
      {
        var distToLocation = haversineDistance(position.coords, locations[i].coordinates[j]);
        if(distToLocation <= (lastLocation.distance + 10))
        {
          callback(lastLocation.id);
          return;
        }
      }
    }
    
    // If the player is not at any specific location, do not pass an argument
    lastLocation = null;
    callback();
  }
  
  var onPositionError = function(error)
  {
    switch(error.code)
    {
      case error.TIMEOUT:
        // Timeout
        alert('Location timed out');
        break;
      case error.POSITION_UNAVAILABLE:
        // Position unavailable
        alert('Position unavailable');
        break;
      case error.PERMISSION_DENIED:
        // Permission denied
        alert('Location permission denied');
        break;
      case error.UNKNOWN_ERROR:
        // Unknown error
        alert('Location error');
        break;
      default:
        break;
    }
  }
  
  var haversineDistance = function(coords1, coords2)
  {
    var R = 6371; // km
    var x1 = coords2.latitude - coords1.latitude;
    var dLat = x1.toRad();
    var x2 = coords2.longitude - coords1.longitude;
    var dLon = x2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(coords1.latitude.toRad()) * Math.cos(coords2.latitude.toRad()) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 1000; // km->m
    return d;
  }
}